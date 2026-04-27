'use client';

import { useActionState, useEffect } from 'react';
import { authenticate } from '@/app/login/actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    // Using useActionState (new hook in React 19/Next 15, or useFormState in older versions) 
    // Since we are in an experimental/bleeding edge setup, let's use a simpler wrapper if hooks are unstable.
    // For now, let's assume standard client-side submission calling a server action for simplicity in this demo.

    // Actually, create a server action for login? Or just use `signIn` from `next-auth/react`?
    // Using server actions with NextAuth v5 is checking compatibility.
    // Let's stick to a simple form calling a server action that calls `signIn`.

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex items-center justify-center">
            <div className="w-full max-w-md bg-white/5 p-12 border border-white/10 backdrop-blur-md">
                <h1 className="text-3xl font-serif text-vsoe-cream mb-8 text-center">Passenger Login</h1>

                <form action={async (formData: FormData) => {
                    await authenticate(formData);
                }} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Email Address</label>
                        <input name="email" type="email" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Password</label>
                        <input name="password" type="password" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" placeholder="••••••••" />
                    </div>

                    <div className="pt-8">
                        <MagneticButton className="w-full bg-vsoe-gold text-vsoe-midnight py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex justify-center">
                            <button className="w-full h-full">Sign In</button>
                        </MagneticButton>
                    </div>

                    <p className="text-center text-xs text-white/40 mt-4">
                        For demo access use: <br />
                        <span className="text-white/80">john@example.com</span> / <span className="text-white/80">password123</span>
                    </p>
                </form>
            </div>
        </main>
    );
}
