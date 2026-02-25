import connectDB from '@/app/config/database';
import Category from '@/app/models/Category';
import { NextResponse } from 'next/server';
import { isAuthenticated, isAdmin } from '@/app/utils/auth';

export async function GET(req, { params }) {
    await connectDB();
    const { id } = await params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { success: false, message: 'Category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: category },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get category error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch category' },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    await connectDB();

    try {
        const user = await isAuthenticated(req);

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { success: false, message: 'Access denied! Admin privileges required.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const { name, description, color, isActive } = await req.json();

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { success: false, message: 'Category not found' },
                { status: 404 }
            );
        }

        // Check if new name conflicts with existing category
        if (name && name.trim() !== category.name) {
            const existingCategory = await Category.findOne({ name: name.trim() });
            if (existingCategory) {
                return NextResponse.json(
                    { success: false, message: 'Category with this name already exists' },
                    { status: 400 }
                );
            }
        }

        // Update fields
        if (name) category.name = name.trim();
        if (description !== undefined) category.description = description.trim();
        if (color) category.color = color;
        if (isActive !== undefined) category.isActive = isActive;

        await category.save();

        return NextResponse.json(
            { success: true, message: 'Category updated successfully', data: category },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update category error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update category' },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    await connectDB();

    try {
        const user = await isAuthenticated(req);

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { success: false, message: 'Access denied! Admin privileges required.' },
                { status: 403 }
            );
        }

        const { id } = await params;
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { success: false, message: 'Category not found' },
                { status: 404 }
            );
        }

        await Category.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Category deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete category error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete category' },
            { status: 500 }
        );
    }
}
