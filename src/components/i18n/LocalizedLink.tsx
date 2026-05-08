'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n/dictionaries';

interface LocalizedLinkProps extends React.ComponentProps<typeof Link> {
    href: string;
    lang?: string;
}

export function LocalizedLink({ href, lang, children, ...props }: LocalizedLinkProps) {
    const params = useParams();
    const currentLang = (lang || params?.lang || 'en') as Locale;

    // Don't localize external links or anchors
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return (
            <Link href={href} {...props}>
                {children}
            </Link>
        );
    }

    // Clean href and ensure it starts with /
    const cleanHref = href.startsWith('/') ? href : `/${href}`;
    
    // Check if href already has a locale prefix
    const hasLocalePrefix = locales.some(l => cleanHref.startsWith(`/${l}/`) || cleanHref === `/${l}`);
    
    const localizedHref = hasLocalePrefix ? cleanHref : `/${currentLang}${cleanHref === '/' ? '' : cleanHref}`;

    return (
        <Link href={localizedHref} {...props}>
            {children}
        </Link>
    );
}
