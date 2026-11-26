import crypto from 'crypto';
import User from '@/app/models/User';

// Env-defined admin account (for local / bootstrap use).
//   ADMIN_EMAIL=you@example.com
//   ADMIN_PASSWORD=a-strong-password   (min 6 chars)
//   ADMIN_NAME=Admin                   (optional)
// Disabled in production unless ALLOW_ENV_ADMIN=true is set explicitly.

export function getEnvAdmin() {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password || password.length < 6) return null;

    const enabled =
        process.env.NODE_ENV !== 'production' || process.env.ALLOW_ENV_ADMIN === 'true';
    if (!enabled) return null;

    return { email, password, name: (process.env.ADMIN_NAME || 'Admin').slice(0, 50) };
}

const digest = (s) => crypto.createHash('sha256').update(String(s)).digest();

// Constant-time comparison of the submitted credentials against the env ones
export function matchesEnvAdmin(email, password) {
    const admin = getEnvAdmin();
    if (!admin || typeof email !== 'string' || typeof password !== 'string') return false;
    const emailOk = crypto.timingSafeEqual(digest(email.trim().toLowerCase()), digest(admin.email));
    const passOk = crypto.timingSafeEqual(digest(password), digest(admin.password));
    return emailOk && passOk;
}

// Make sure a DB user exists for the env admin with role=admin and the env password.
// Returns the user document (with password selected).
export async function ensureEnvAdminUser() {
    const admin = getEnvAdmin();
    let user = await User.findOne({ email: admin.email }).select('+password');

    if (!user) {
        user = await User.create({
            name: admin.name,
            email: admin.email,
            password: admin.password, // hashed by the model's pre-save hook
            role: 'admin',
        });
        return User.findById(user._id).select('+password');
    }

    let changed = false;
    if (user.role !== 'admin') {
        user.role = 'admin';
        changed = true;
    }
    if (!user.isActive) {
        user.isActive = true;
        changed = true;
    }
    if (!(await user.comparePassword(admin.password))) {
        user.password = admin.password; // env is the source of truth for this account
        changed = true;
    }
    if (changed) await user.save();
    return user;
}
