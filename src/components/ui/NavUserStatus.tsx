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
                className="text-xs uppercase tracking-[0.15em] text-white/80 hover:text-vsoe-gold transition-colors font-medium py-1"
            >
                Sign In
            </Link>
        );
    }

    const firstName = session.user.name?.split(' ')[0] ?? 'Account';

    return (
        <Link
            href="/profile"
            className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-vsoe-gold hover:text-white transition-colors font-medium py-1"
        >
            <User size={12} />
            {firstName}
        </Link>
    );
}
