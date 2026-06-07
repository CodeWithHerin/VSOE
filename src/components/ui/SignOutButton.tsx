'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton({ lang }: { lang: string }) {
    return (
        <button
            onClick={() => signOut({ callbackUrl: `/${lang}/login` })}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors border border-white/10 hover:border-red-400/30 px-3 py-2 rounded-sm"
            title="Sign out"
        >
            <LogOut size={11} />
            Sign Out
        </button>
    );
}
