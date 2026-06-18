'use client';

import { useSession } from 'next-auth/react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { User } from 'lucide-react';

export default function NavUserStatus() {
    const { data: session, status } = useSession();

    if (status === 'loading') return (
        <div className="w-16 h-3 bg-white/10 rounded-full animate-pulse" />
    );

    if (!session?.user) {
        return (
            <Link
                href="/login"
                className="inline-flex items-center gap-1.5 border border-vsoe-gold/40 px-2 py-1 lg:border-0 lg:px-0 lg:py-0 text-[10px] font-bold uppercase tracking-[0.15em] text-vsoe-gold/90 lg:text-white/60 hover:text-white hover:border-vsoe-gold transition-all duration-300 whitespace-nowrap rounded-sm"
            >
                <User size={11} className="lg:hidden" />
                Sign In
            </Link>
        );
    }

    const firstName = session.user.name?.split(' ')[0] ?? 'Account';

    return (
        <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 border border-vsoe-gold/40 px-2 py-1 lg:border-0 lg:px-0 lg:py-0 text-[10px] font-bold uppercase tracking-[0.15em] text-vsoe-gold hover:text-white hover:border-vsoe-gold lg:hover:border-0 transition-all duration-300 whitespace-nowrap rounded-sm"
        >
            <User size={11} />
            {firstName}
        </Link>
    );
}
