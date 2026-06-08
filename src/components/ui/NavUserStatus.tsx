'use client';

import { useSession } from 'next-auth/react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { User } from 'lucide-react';

export default function NavUserStatus() {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;

    if (!session?.user) {
        return (
            <Link
                href="/login"
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-vsoe-midnight bg-vsoe-cream/90 hover:bg-white px-5 py-2.5 transition-colors duration-300 whitespace-nowrap"
            >
                Sign In
            </Link>
        );
    }

    const firstName = session.user.name?.split(' ')[0] ?? 'Account';

    return (
        <Link
            href="/profile"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-vsoe-midnight bg-vsoe-gold hover:bg-white px-5 py-2.5 transition-colors duration-300 whitespace-nowrap"
        >
            <User size={11} />
            {firstName}
        </Link>
    );
}
