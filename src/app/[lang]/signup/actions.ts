'use server';

import { prisma } from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

// ─── Validation helpers ───────────────────────────────────────────────────────

function validateEmail(email: string): string | null {
    if (!email) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address.';
    return null;
}

function validateName(name: string): string | null {
    if (!name) return 'Full name is required.';
    if (name.length < 2) return 'Name must be at least 2 characters.';
    if (name.length > 100) return 'Name must be under 100 characters.';
    if (!/^[a-zA-ZÀ-ÿ\s'\-]+$/.test(name)) return 'Name may only contain letters, spaces, hyphens, and apostrophes.';
    return null;
}

function validatePassword(password: string): string | null {
    if (!password) return 'Password is required.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password.length > 128) return 'Password must be under 128 characters.';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
    return null;
}

// ─── Return type ──────────────────────────────────────────────────────────────

export interface RegisterState {
    errors?: {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        general?: string;
    };
    success?: boolean;
}

// ─── Action ───────────────────────────────────────────────────────────────────

export async function register(
    prevState: RegisterState | undefined,
    formData: FormData
): Promise<RegisterState> {
    const name = (formData.get('name') as string)?.trim() ?? '';
    const email = (formData.get('email') as string)?.trim().toLowerCase() ?? '';
    const password = (formData.get('password') as string) ?? '';
    const confirmPassword = (formData.get('confirmPassword') as string) ?? '';

    // Field-level validation
    const errors: RegisterState['errors'] = {};

    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // DB checks
    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return { errors: { email: 'An account with this email already exists.' } };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return { errors: { general: 'Something went wrong. Please try again.' } };
    }

    // Auto sign-in after registration
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/profile',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return { errors: { general: 'Account created but sign-in failed. Please log in manually.' } };
        }
        throw error;
    }

    return { success: true };
}
