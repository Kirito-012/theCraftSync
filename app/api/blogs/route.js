import connectDB from '@/app/config/database';
import Blog from '@/app/models/Blog';

import { NextResponse } from 'next/server';
import { uploadToS3 } from '@/app/utils/s3Helper';

export async function POST(req) {
    await connectDB();

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

        // Validate required fields
        if (
            !metaTitle ||
            !metaDescription ||
            !image ||
            !title ||
            !content ||
            !author ||
            !date ||
            !category
        ) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }



        // Upload image to S3
        const uploadResult = await uploadToS3(image, 'blogs');
        const imageUrl = uploadResult.url;

        // Create blog
        const blog = await Blog.create({
            metaTitle: metaTitle.trim(),
            metaDescription: metaDescription.trim(),
            image: imageUrl,
            title: title.trim(),
            content: content.trim(),
            author: author.trim(),
            category: category,
            date: new Date(date),
        });

        return NextResponse.json(
            { success: true, message: 'Blog created successfully', data: blog },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding blog:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to create blog' },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    try {
        const query = {};

        // Search by metaTitle
        if (search) {
            query.metaTitle = { $regex: search, $options: 'i' };
        }

        const blogs = await Blog.find(query)
            .populate('category', 'name')
            .sort({ date: -1 });

        return NextResponse.json(
            { success: true, data: blogs },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}
