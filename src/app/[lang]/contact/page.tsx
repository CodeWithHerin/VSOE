'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function ContactPage() {
    const { t } = useTranslation();

    return (
        <StandardPageLayout
            title={t.contactPage.title}
            subtitle={t.contactPage.subtitle}
            heroImage="/images/vsoe/vsoe-london-station.jpg"
        >
            <h3>{t.contactPage.resTitle}</h3>
            <p>
                {t.contactPage.resDesc}
            </p>
            <p>
                <strong>{t.contactPage.telUK}:</strong> +44 (0) 20 1234 5678<br />
                <strong>{t.contactPage.telUS}:</strong> +1 800 123 4567<br />
                <strong>{t.contactPage.email}:</strong> reservations@projectvitesse.com
            </p>

            <h3>{t.contactPage.officeTitle}</h3>
            <p>
                Project Vitesse<br />
                1 Heritage Lane<br />
                London, EC1A 1BB<br />
                United Kingdom
            </p>

            <h3>{t.contactPage.pressTitle}</h3>
            <p>
                {t.contactPage.pressDesc}
            </p>
        </StandardPageLayout>
    );
}
