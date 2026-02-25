import connectDB from '@/app/config/database';
import Category from '@/app/models/Category';
import { NextResponse } from 'next/server';
import { isAuthenticated, isAdmin } from '@/app/utils/auth';

export async function POST(req) {
    await connectDB();

    try {
        const user = await isAuthenticated(req);

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { success: false, message: 'Access denied! Admin privileges required.' },
                { status: 403 }
            );
        }

        const { name, description, color } = await req.json();

        // Validate required fields
        if (!name) {
            return NextResponse.json(
                { success: false, message: 'Please provide a category name' },
                { status: 400 }
            );
        }

        if (!color) {
            return NextResponse.json(
                { success: false, message: 'Please provide a color' },
                { status: 400 }
            );
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return NextResponse.json(
                { success: false, message: 'Category already exists' },
                { status: 400 }
            );
        }

        // Create category
        const category = await Category.create({
            name: name.trim(),
            description: description?.trim() || '',
            color: color,
        });

        return NextResponse.json(
            { success: true, message: 'Category added successfully', data: category },
            { status: 201 }
        );
    } catch (error) {
        console.error('Add category error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to add category' },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    await connectDB();

    try {
        const categories = await Category.find({ isActive: true }).sort({ name: 1 });

        return NextResponse.json(
            { success: true, data: categories },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get categories error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}
