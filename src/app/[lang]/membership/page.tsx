'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function MembershipPage() {
    const { t } = useTranslation();
    return (
        <StandardPageLayout
            title={t.membershipPage.title}
            subtitle={t.membershipPage.subtitle}
            heroImage="https://images.unsplash.com/photo-1551632436-cbf8dd35477c?q=80&w=2671&auto=format&fit=crop"
        >
            <h3>{t.membershipPage.welcomeTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.membershipPage.welcomeDesc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

            <h3>{t.membershipPage.benTitle}</h3>
            <ul>
                <li><strong>{t.membershipPage.ben1Title}</strong>{t.membershipPage.ben1Desc}</li>
                <li><strong>{t.membershipPage.ben2Title}</strong>{t.membershipPage.ben2Desc}</li>
                <li><strong>{t.membershipPage.ben3Title}</strong>{t.membershipPage.ben3Desc}</li>
                <li><strong>{t.membershipPage.ben4Title}</strong>{t.membershipPage.ben4Desc}</li>
            </ul>

            <h3>{t.membershipPage.joinTitle}</h3>
            <p>
                {t.membershipPage.joinDesc}
            </p>
        </StandardPageLayout>
    );
}
