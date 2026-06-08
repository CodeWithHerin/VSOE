'use client';

import { useActionState } from 'react';
import { register } from './actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';

export default function SignupPage() {
    const [errorMessage, dispatch, isPending] = useActionState(register, undefined);

    return (
        <main className="min-h-screen bg-vsoe-midnight flex overflow-hidden">
            {/* Left: Atmospheric image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/images/vsoe/vsoe-paris-departure.jpg"
                    alt="Paris departure aboard Project Vitesse"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-vsoe-midnight/70 via-vsoe-midnight/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight/80 via-transparent to-transparent" />
                <div className="absolute bottom-16 left-12 right-12">
                    <div className="w-8 h-[1px] bg-vsoe-gold mb-6" />
                    <p className="font-serif text-xl text-white/90 italic leading-relaxed mb-4">
                        &ldquo;Every great journey begins with a single step onto the platform.&rdquo;
                    </p>
                    <p className="text-vsoe-gold text-[10px] uppercase tracking-[0.3em]">Project Vitesse</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:py-20">
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="w-10 h-[2px] bg-vsoe-gold mb-8" />
                    <h1 className="text-4xl md:text-5xl font-serif text-vsoe-cream mb-3">
                        Create Account
                    </h1>
                    <p className="text-white/40 text-sm mb-12 leading-relaxed">
                        Join Project Vitesse to manage your journeys.
                    </p>

                    <form action={dispatch} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-colors"
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
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-colors"
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
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-400 text-xs py-2">
                                {errorMessage}
                            </p>
                        )}

                        <div className="pt-2">
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

                        <div className="border-t border-white/10 pt-8">
                            <p className="text-xs text-white/40">
                                Already have an account?{' '}
                                <Link href="/login" className="text-vsoe-gold hover:text-white transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
