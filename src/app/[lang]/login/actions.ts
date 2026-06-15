'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// Returns null on success with no callbackUrl (redirect to profile)
// Returns a URL string on success with callbackUrl (redirect there)
// Returns an error string on failure
export async function authenticate(
    prevState: string | null | undefined,
    formData: FormData
): Promise<string | null> {
    const callbackUrl = formData.get('callbackUrl') as string | null;

    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        // null signals success; page reads callbackUrl from form to redirect
        return callbackUrl ? `__redirect__:${callbackUrl}` : null;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid email or password.';
                default:
                    return 'Something went wrong. Please try again.';
            }
        }
        throw error;
    }
}
