import connectDB from '@/app/config/database';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/utils/auth';

export async function GET(req) {
    await connectDB();

    try {
        const user = await isAuthenticated(req);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isActive: user.isActive,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Error fetching user profile' },
            { status: 500 }
        );
    }
}
