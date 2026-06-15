'use client';

import { useActionState } from 'react';
import { register } from './actions';
import type { RegisterState } from './actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';

// ─── Field error ──────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-red-400 text-[11px] mt-1.5 font-sans">{message}</p>;
}

// ─── Password strength indicator ─────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
    if (!password) return null;

    const checks = [
        { label: '8+ characters', pass: password.length >= 8 },
        { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
        { label: 'Number', pass: /[0-9]/.test(password) },
    ];

    const passed = checks.filter(c => c.pass).length;
    const colour = passed === 3 ? 'bg-green-500' : passed === 2 ? 'bg-vsoe-gold' : 'bg-red-500/70';

    return (
        <div className="mt-3 space-y-2">
            <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ${i < passed ? colour : 'bg-white/10'}`}
                    />
                ))}
            </div>
            <div className="flex gap-4 flex-wrap">
                {checks.map(({ label, pass }) => (
                    <span key={label} className={`text-[10px] transition-colors duration-300 ${pass ? 'text-white/60' : 'text-white/20'}`}>
                        {pass ? '✓' : '○'} {label}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const initialState: RegisterState = {};

export default function SignupPage() {
    const [state, dispatch, isPending] = useActionState(register, initialState);
    const [passwordValue, setPasswordValue] = [
        typeof window !== 'undefined'
            ? (document.querySelector('input[name="password"]') as HTMLInputElement)?.value ?? ''
            : '',
        () => {}
    ];

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
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:pt-32 lg:pb-20 overflow-y-auto">
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="w-10 h-[2px] bg-vsoe-gold mb-8" />
                    <h1 className="text-4xl md:text-5xl font-serif text-vsoe-cream mb-3">
                        Create Account
                    </h1>
                    <p className="text-white/40 text-sm mb-12 leading-relaxed">
                        Join Project Vitesse to manage your journeys.
                    </p>

                    {state.errors?.general && (
                        <div className="mb-8 p-4 border border-red-500/30 bg-red-500/10">
                            <p className="text-red-400 text-xs">{state.errors.general}</p>
                        </div>
                    )}

                    <form action={dispatch} className="space-y-8">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className={`w-full bg-transparent border-b py-3 text-white text-lg outline-none transition-colors ${
                                    state.errors?.name ? 'border-red-400' : 'border-white/20 focus:border-vsoe-gold'
                                }`}
                                placeholder="John Doe"
                            />
                            <FieldError message={state.errors?.name} />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className={`w-full bg-transparent border-b py-3 text-white text-lg outline-none transition-colors ${
                                    state.errors?.email ? 'border-red-400' : 'border-white/20 focus:border-vsoe-gold'
                                }`}
                                placeholder="you@example.com"
                            />
                            <FieldError message={state.errors?.email} />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                className={`w-full bg-transparent border-b py-3 text-white text-lg outline-none transition-colors ${
                                    state.errors?.password ? 'border-red-400' : 'border-white/20 focus:border-vsoe-gold'
                                }`}
                                placeholder="••••••••"
                            />
                            <FieldError message={state.errors?.password} />
                            <p className="text-[10px] text-white/30 mt-2">
                                Min. 8 characters · One uppercase letter · One number
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                                Confirm Password
                            </label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                autoComplete="new-password"
                                className={`w-full bg-transparent border-b py-3 text-white text-lg outline-none transition-colors ${
                                    state.errors?.confirmPassword ? 'border-red-400' : 'border-white/20 focus:border-vsoe-gold'
                                }`}
                                placeholder="••••••••"
                            />
                            <FieldError message={state.errors?.confirmPassword} />
                        </div>

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
