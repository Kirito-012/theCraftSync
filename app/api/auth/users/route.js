import connectDB from '@/app/config/database';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';
import { isAuthenticated, isAdmin } from '@/app/utils/auth';

export async function GET(req) {
    await connectDB();

    try {
        const user = await isAuthenticated(req);

        if (!user || !isAdmin(user)) {
            return NextResponse.json(
                { success: false, message: 'Access denied! Admin privileges required.' },
                { status: 403 }
            );
        }

        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                count: users.length,
                data: {
                    users: users.map((u) => ({
                        id: u._id,
                        name: u.name,
                        email: u.email,
                        role: u.role,
                        isActive: u.isActive,
                        createdAt: u.createdAt,
                        updatedAt: u.updatedAt,
                    })),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Error fetching users', error: error.message },
            { status: 500 }
        );
    }
}
