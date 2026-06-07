'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton({ lang }: { lang: string }) {
    return (
        <button
            onClick={() => signOut({ callbackUrl: `/${lang}/login` })}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-vsoe-gold transition-colors duration-300 pl-4 border-l border-white/15 ml-1"
            title="Sign out"
        >
            <LogOut size={11} />
            Sign Out
        </button>
    );
}
