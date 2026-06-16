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
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
                Sign In
            </Link>
        );
    }

    const firstName = session.user.name?.split(' ')[0] ?? 'Account';

    return (
        <Link
            href="/profile"
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-vsoe-gold hover:text-white transition-colors duration-300 whitespace-nowrap"
        >
            <User size={11} />
            {firstName}
        </Link>
    );
}
