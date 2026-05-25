'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function AboutPage() {
    const { t } = useTranslation();
    return (
        <StandardPageLayout
            title={t.aboutPage.title}
            subtitle={t.aboutPage.subtitle}
            heroImage="/images/vsoe/vsoe-grand-suite.jpg"
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
