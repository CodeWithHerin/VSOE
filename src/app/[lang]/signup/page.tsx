'use client';

import { useActionState } from 'react';
import { register } from './actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';

export default function SignupPage() {
    const [errorMessage, dispatch, isPending] = useActionState(register, undefined);

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex items-center justify-center">
            <div className="w-full max-w-md bg-white/5 p-12 border border-white/10 backdrop-blur-md">
                <h1 className="text-3xl font-serif text-vsoe-cream mb-2 text-center">
                    Create Account
                </h1>
                <p className="text-center text-white/40 text-xs mb-8">
                    Join Project Vitesse to manage your journeys
                </p>

                <form action={dispatch} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                            Full Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            minLength={8}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors"
                            placeholder="Min. 8 characters"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-400 text-xs text-center py-2">
                            {errorMessage}
                        </p>
                    )}

                    <div className="pt-8">
                        <MagneticButton className="w-full bg-vsoe-gold text-vsoe-midnight py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex justify-center">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-full disabled:opacity-60"
                            >
                                {isPending ? 'Creating account...' : 'Create Account'}
                            </button>
                        </MagneticButton>
                    </div>

                    <p className="text-center text-xs text-white/40 mt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="text-vsoe-gold hover:text-white transition-colors">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}
