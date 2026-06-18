'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { ArrowRight } from 'lucide-react';

export default function MobileBookBar() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past most of the first viewport
            setIsVisible(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isExcludedPath = pathname?.includes('/book') || pathname?.includes('/invoice');
    if (isExcludedPath) return null;

    return (
        <div
            className={`lg:hidden fixed bottom-0 left-0 right-0 z-[90] transition-transform duration-500 ease-out ${
                isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
            <Link
                href="/book"
                className="flex items-center justify-center gap-3 w-full bg-vsoe-gold text-vsoe-midnight py-4 text-[11px] font-bold uppercase tracking-[0.25em] shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
            >
                {t.nav.bookJourney}
                <ArrowRight size={14} />
            </Link>
        </div>
    );
}
