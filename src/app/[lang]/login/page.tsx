'use client';

import { useActionState } from 'react';
import { authenticate } from './actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';

export default function LoginPage() {
    const { t } = useTranslation();
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex items-center justify-center">
            <div className="w-full max-w-md bg-white/5 p-12 border border-white/10 backdrop-blur-md">
                <h1 className="text-3xl font-serif text-vsoe-cream mb-8 text-center">
                    {t.forms.passengerLogin}
                </h1>

                <form action={dispatch} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">
                            {t.forms.email}
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors"
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
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors"
                            placeholder="••••••••"
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
                                {isPending ? 'Signing in...' : t.forms.signIn}
                            </button>
                        </MagneticButton>
                    </div>

                    <p className="text-center text-xs text-white/40 mt-4">
                        Demo access: <span className="text-white/80">john@example.com</span> / <span className="text-white/80">password123</span>
                    </p>

                    <p className="text-center text-xs text-white/40 mt-2">
                        New here?{' '}
                        <Link href="/signup" className="text-vsoe-gold hover:text-white transition-colors">
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}
