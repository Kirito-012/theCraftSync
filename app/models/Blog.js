import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
	{
		metaTitle: {
			type: String,
			required: [true, 'Meta title is required'],
			trim: true,
		},
		metaDescription: {
			type: String,
			required: [true, 'Meta description is required'],
			trim: true,
		},
		image: {
			type: String,
			required: [true, 'Image is required'],
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
		},
		content: {
			type: String,
			required: [true, 'Content is required'],
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'Category is required'],
		},
		author: {
			type: String,
			required: [true, 'Author is required'],
			trim: true,
		},
		date: {
			type: Date,
			required: [true, 'Date is required'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
)

// Generate slug from title before saving
blogSchema.pre('save', async function () {
	if (this.isModified('title')) {
		this.slug = this.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')

		// Ensure unique slug
		const existingBlog = await mongoose.models.Blog.findOne({
			slug: this.slug,
			_id: { $ne: this._id },
		})

		if (existingBlog) {
			this.slug = `${this.slug}-${Date.now()}`
		}
	}
})

// Check if model exists and if it has the stale 'category' field
// We are skipping deletion since category is no longer stale
// if (mongoose.models.Blog && mongoose.models.Blog.schema.paths.category) {
// 	delete mongoose.models.Blog
// }

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

export default Blog
