const Blog = require('../models/Blog')
const {
	uploadToCloudinary,
	deleteFromCloudinary,
	publicIdFromUrl,
} = require('../utils/cloudinaryHelper')

// Add new blog
exports.addBlog = async (ctx) => {
	try {
		const {
			metaTitle,
			metaDescription,
			image,
			title,
			content,
			category,
			author,
			date,
		} = ctx.request.body

		// Validate required fields
		if (
			!metaTitle ||
			!metaDescription ||
			!image ||
			!title ||
			!content ||
			!category ||
			!author ||
			!date
		) {
			ctx.status = 400
			ctx.body = {
				success: false,
				message: 'All fields are required',
			}
			return
		}

		// Check if category exists
		const Category = require('../models/Category')
		const existingCategory = await Category.findById(category)
		if (!existingCategory) {
			ctx.status = 400
			ctx.body = {
				success: false,
				message: 'Invalid category selected',
			}
			return
		}

		// Upload image to Cloudinary
		const uploadResult = await uploadToCloudinary(image, 'blogs')
		const imageUrl = uploadResult.url

		// Create blog
		const blog = await Blog.create({
			metaTitle: metaTitle.trim(),
			metaDescription: metaDescription.trim(),
			image: imageUrl,
			imagePublicId: uploadResult.publicId,
			title: title.trim(),
			content: content.trim(),
			category: category,
			author: author.trim(),
			date: new Date(date),
		})

		ctx.status = 201
		ctx.body = {
			success: true,
			message: 'Blog created successfully',
			data: blog,
		}
	} catch (error) {
		console.error('Error adding blog:', error)
		ctx.status = 500
		ctx.body = {
			success: false,
			message: error.message || 'Failed to create blog',
		}
	}
}

// Get all blogs
exports.getAllBlogs = async (ctx) => {
	try {
		const {category, search} = ctx.query

		const query = {}

		// Filter by category
		if (category) {
			query.category = category
		}

		// Search by metaTitle
		if (search) {
			query.metaTitle = {$regex: search, $options: 'i'}
		}

		const blogs = await Blog.find(query)
			.populate('category', 'name')
			.sort({date: -1})

		ctx.status = 200
		ctx.body = {
			success: true,
			data: blogs,
		}
	} catch (error) {
		console.error('Error fetching blogs:', error)
		ctx.status = 500
		ctx.body = {
			success: false,
			message: 'Failed to fetch blogs',
		}
	}
}

// Get single blog by ID
exports.getBlogById = async (ctx) => {
	try {
		const blog = await Blog.findById(ctx.params.id)

		if (!blog) {
			ctx.status = 404
			ctx.body = {
				success: false,
				message: 'Blog not found',
			}
			return
		}

		ctx.status = 200
		ctx.body = {
			success: true,
			data: blog,
		}
	} catch (error) {
		console.error('Error fetching blog:', error)
		ctx.status = 500
		ctx.body = {
			success: false,
			message: 'Failed to fetch blog',
		}
	}
}

// Update blog
exports.updateBlog = async (ctx) => {
	try {
		const {
			metaTitle,
			metaDescription,
			image,
			title,
			content,
			category,
			author,
			date,
		} = ctx.request.body

		const blog = await Blog.findById(ctx.params.id)

		if (!blog) {
			ctx.status = 404
			ctx.body = {
				success: false,
				message: 'Blog not found',
			}
			return
		}

		// Update image if new one is provided
		let imageUrl = blog.image
		let imagePublicId = blog.imagePublicId
		if (image && image !== blog.image) {
			const uploadResult = await uploadToCloudinary(image, 'blogs')
			imageUrl = uploadResult.url

			// Clean up the previous image on Cloudinary (best-effort)
			const oldPublicId = blog.imagePublicId || publicIdFromUrl(blog.image)
			if (oldPublicId) {
				await deleteFromCloudinary(oldPublicId)
			}
			imagePublicId = uploadResult.publicId
		}

		// Update fields
		blog.metaTitle = metaTitle !== undefined ? metaTitle.trim() : blog.metaTitle
		blog.metaDescription =
			metaDescription !== undefined
				? metaDescription.trim()
				: blog.metaDescription
		blog.image = imageUrl
		blog.imagePublicId = imagePublicId
		blog.title = title !== undefined ? title.trim() : blog.title
		blog.content = content !== undefined ? content.trim() : blog.content
		blog.category = category !== undefined ? category : blog.category
		blog.author = author !== undefined ? author.trim() : blog.author
		blog.date = date !== undefined ? new Date(date) : blog.date

		await blog.save()

		ctx.status = 200
		ctx.body = {
			success: true,
			message: 'Blog updated successfully',
			data: blog,
		}
	} catch (error) {
		console.error('Error updating blog:', error)
		ctx.status = 500
		ctx.body = {
			success: false,
			message: error.message || 'Failed to update blog',
		}
	}
}

// Delete blog
exports.deleteBlog = async (ctx) => {
	try {
		const blog = await Blog.findById(ctx.params.id)

		if (!blog) {
			ctx.status = 404
			ctx.body = {
				success: false,
				message: 'Blog not found',
			}
			return
		}

		// Remove the associated image from Cloudinary (best-effort)
		const publicId = blog.imagePublicId || publicIdFromUrl(blog.image)
		if (publicId) {
			await deleteFromCloudinary(publicId)
		}

		await Blog.findByIdAndDelete(ctx.params.id)

		ctx.status = 200
		ctx.body = {
			success: true,
			message: 'Blog deleted successfully',
		}
	} catch (error) {
		console.error('Error deleting blog:', error)
		ctx.status = 500
		ctx.body = {
			success: false,
			message: 'Failed to delete blog',
		}
	}
}
