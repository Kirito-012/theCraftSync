import connectDB from '@/app/config/database';
import mongoose from 'mongoose';
import Blog from '@/app/models/Blog';
import Category from '@/app/models/Category';
import { NextResponse } from 'next/server';
import { uploadToS3 } from '@/app/utils/s3Helper';

export async function GET(req, { params }) {
    await connectDB();
    const { id } = await params;

    try {
        // Find by _id if valid, otherwise find by slug
        let query = { slug: id };
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { $or: [{ _id: id }, { slug: id }] };
        }

        const blog = await Blog.findOne(query).populate('category', 'name');

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: blog },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const { id } = await params;

    try {
        const {
            metaTitle,
            metaDescription,
            image,
            title,
            content,
            author,
            date,
            category,
        } = await req.json();

        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            );
        }

        // Update image if new one is provided
        let imageUrl = blog.image;
        if (image && image !== blog.image && image.startsWith('data:image')) {
            // Only upload if it looks like a base64 string, otherwise assume it's already a URL
            const uploadResult = await uploadToS3(image, 'blogs');
            imageUrl = uploadResult.url;
        }

        // Update fields
        blog.metaTitle = metaTitle !== undefined ? metaTitle.trim() : blog.metaTitle;
        blog.metaDescription =
            metaDescription !== undefined
                ? metaDescription.trim()
                : blog.metaDescription;
        blog.image = imageUrl;
        blog.title = title !== undefined ? title.trim() : blog.title;
        blog.content = content !== undefined ? content.trim() : blog.content;
        blog.author = author !== undefined ? author.trim() : blog.author;
        blog.category = category !== undefined ? category : blog.category;
        blog.date = date !== undefined ? new Date(date) : blog.date;

        await blog.save();

        return NextResponse.json(
            { success: true, message: 'Blog updated successfully', data: blog },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update blog' },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    const { id } = await params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            );
        }

        await Blog.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Blog deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
