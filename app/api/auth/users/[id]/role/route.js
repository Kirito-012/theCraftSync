import connectDB from '@/app/config/database';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';
import { isAuthenticated, isAdmin } from '@/app/utils/auth';

export async function PATCH(req, { params }) {
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
        const { role } = await req.json();

        // Validation
        if (!role || !['user', 'admin'].includes(role)) {
            return NextResponse.json(
                { success: false, message: 'Please provide a valid role (user or admin)' },
                { status: 400 }
            );
        }

        // Check if user exists
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Update role
        targetUser.role = role;
        await targetUser.save();

        return NextResponse.json(
            {
                success: true,
                message: 'User role updated successfully',
                data: {
                    user: {
                        id: targetUser._id,
                        name: targetUser.name,
                        email: targetUser.email,
                        role: targetUser.role,
                    },
                },
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Error updating user role', error: error.message },
            { status: 500 }
        );
    }
}
