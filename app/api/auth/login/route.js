import connectDB from '@/app/config/database';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { matchesEnvAdmin, ensureEnvAdminUser } from '@/app/utils/envAdmin';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export async function POST(req) {
    await connectDB();

    try {
        const { email, password } = await req.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Please provide email and password' },
                { status: 400 }
            );
        }

        // Env-defined admin (ADMIN_EMAIL / ADMIN_PASSWORD): create or promote on a matching login
        if (matchesEnvAdmin(email, password)) {
            const envUser = await ensureEnvAdminUser();
            return NextResponse.json(
                {
                    success: true,
                    message: 'Login successful',
                    data: {
                        user: {
                            id: envUser._id,
                            name: envUser.name,
                            email: envUser.email,
                            role: envUser.role,
                        },
                        token: generateToken(envUser._id),
                    },
                },
                { status: 200 }
            );
        }

        // Check if user exists (include password for comparison)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check if password matches
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json(
                { success: false, message: 'Account is deactivated. Please contact support.' },
                { status: 403 }
            );
        }

        // Generate token
        const token = generateToken(user._id);

        return NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json(
            { success: false, message: 'Error during login', error: error.message },
            { status: 500 }
        );
    }
}
