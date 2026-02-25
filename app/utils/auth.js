import jwt from 'jsonwebtoken';
import User from '@/app/models/User';
import connectDB from '@/app/config/database';
import { headers } from 'next/headers';

export const isAuthenticated = async (req) => {
    await connectDB();

    let token;

    // Check Authorization header (for API routes called from client)
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }

    // Check cookies (if you store token in cookies) - optional based on your implementation
    // if (!token) {
    //     const cookieStore = headers();
    //     token = cookieStore.get('token')?.value;
    // }

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        return null;
    }
};

export const isAdmin = (user) => {
    if (user && user.role === 'admin') {
        return true;
    }
    return false;
};
