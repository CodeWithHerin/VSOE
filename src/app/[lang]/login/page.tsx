'use client';

import { useActionState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from './actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';

function LoginPageInner() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') ?? '/profile';
    const [state, dispatch, isPending] = useActionState(authenticate, undefined);

    useEffect(() => {
        if (state === null) {
            window.location.href = callbackUrl;
        } else if (state?.startsWith('__redirect__:')) {
            window.location.href = state.replace('__redirect__:', '');
        }
    }, [state, callbackUrl]);

    const errorMessage = (state === null || state?.startsWith('__redirect__:')) ? undefined : state;

    return (
        <main className="min-h-screen bg-vsoe-midnight flex overflow-hidden">
            {/* Left: Atmospheric image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/images/vsoe/vsoe-grand-suite.jpg"
                    alt="Grand Suite aboard Project Vitesse"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-vsoe-midnight/70 via-vsoe-midnight/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight/80 via-transparent to-transparent" />
                <div className="absolute bottom-16 left-12 right-12">
                    <div className="w-8 h-[1px] bg-vsoe-gold mb-6" />
                    <p className="font-serif text-xl text-white/90 italic leading-relaxed mb-4">
                        &ldquo;The most civilised way to cross Europe, one golden evening at a time.&rdquo;
                    </p>
                    <p className="text-vsoe-gold text-[10px] uppercase tracking-[0.3em]">Project Vitesse</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:pt-32 lg:pb-20">
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="w-10 h-[2px] bg-vsoe-gold mb-8" />
                    <h1 className="text-4xl md:text-5xl font-serif text-vsoe-cream mb-3">
                        {t.forms.passengerLogin}
                    </h1>
                    <p className="text-white/40 text-sm mb-12 leading-relaxed">
                        Welcome back. Your journey continues.
                    </p>

                    <form action={dispatch} className="space-y-8">
                        <input type="hidden" name="callbackUrl" value={callbackUrl} />
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                {t.forms.email}
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                {t.forms.password}
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
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
                                    disabled={isPending || state === null || state?.startsWith('__redirect__:')}
                                    className="w-full h-full disabled:opacity-60"
                                >
                                    {isPending || state === null ? 'Signing in...' : t.forms.signIn}
                                </button>
                            </MagneticButton>
                        </div>

                        <div className="border-t border-white/10 pt-8 space-y-3">
                            <p className="text-xs text-white/30">
                                Demo access:{' '}
                                <span className="text-white/60">john@example.com</span>
                                {' / '}
                                <span className="text-white/60">password123</span>
                            </p>
                            <p className="text-xs text-white/40">
                                New here?{' '}
                                <Link href="/signup" className="text-vsoe-gold hover:text-white transition-colors">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageInner />
        </Suspense>
    );
}
