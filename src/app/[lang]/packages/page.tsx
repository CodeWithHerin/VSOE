'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function PackagesPage() {
    const { t } = useTranslation();

    return (
        <StandardPageLayout
            title={t.packagesPage.title}
            subtitle={t.packagesPage.subtitle}
            heroImage="/images/vsoe/vsoe-exterior-night.jpg"
        >
            <h3>{t.packagesPage.expertTitle}</h3>
            <p>
                {t.packagesPage.expertDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="border border-vsoe-gold/20 p-8 hover:bg-white/5 transition-colors">
                    <h4 className="text-xl font-serif text-vsoe-gold mb-2">{t.packagesPage.pkg1Title}</h4>
                    <p className="text-sm text-vsoe-cream/60 mb-4">{t.packagesPage.pkg1Sub}</p>
                    <p className="mb-6">{t.packagesPage.pkg1Desc}</p>
                    <Link href="/book" className="text-xs font-bold uppercase tracking-widest border-b border-vsoe-gold pb-1">{t.packagesPage.viewDetails}</Link>
                </div>

                <div className="border border-vsoe-gold/20 p-8 hover:bg-white/5 transition-colors">
                    <h4 className="text-xl font-serif text-vsoe-gold mb-2">{t.packagesPage.pkg2Title}</h4>
                    <p className="text-sm text-vsoe-cream/60 mb-4">{t.packagesPage.pkg2Sub}</p>
                    <p className="mb-6">{t.packagesPage.pkg2Desc}</p>
                    <Link href="/book" className="text-xs font-bold uppercase tracking-widest border-b border-vsoe-gold pb-1">{t.packagesPage.viewDetails}</Link>
                </div>
            </div>

            <p>
                {t.packagesPage.bespoke}
            </p>
        </StandardPageLayout>
    );
}
