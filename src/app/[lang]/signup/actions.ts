'use server';

import { prisma } from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

export async function register(
    prevState: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        return 'All fields are required.';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters.';
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return 'An account with this email already exists.';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return 'Something went wrong. Please try again.';
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: '/profile',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Account created but sign-in failed. Please log in manually.';
        }
        throw error;
    }
}
