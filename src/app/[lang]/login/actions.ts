'use server';

import { signIn } from '@/auth';

export async function authenticate(formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialSignin';
        }
        throw error; // Rethrow to allow redirect
    }
}
