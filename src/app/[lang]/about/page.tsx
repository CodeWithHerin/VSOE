'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function AboutPage() {
    const { t } = useTranslation();
    return (
        <StandardPageLayout
            title={t.aboutPage.title}
            subtitle={t.aboutPage.subtitle}
            heroImage="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop"
        >
            <h3>{t.aboutPage.goldenTitle}</h3>
            <p>
                {t.aboutPage.goldenDesc1}
            </p>
            <p>
                {t.aboutPage.goldenDesc2}
            </p>
            
            <h3>{t.aboutPage.craftTitle}</h3>
            <p>
                {t.aboutPage.craftDesc}
            </p>

            <blockquote>
                {t.aboutPage.quote}
            </blockquote>

            <h3>{t.aboutPage.expTitle}</h3>
            <p>
                {t.aboutPage.expDesc}
            </p>
        </StandardPageLayout>
    );
}
