'use client';

import { use } from 'react';


import HeroSection from '@/components/ui/HeroSection';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useTranslation();

    const data = t.legalData[slug as keyof typeof t.legalData] || {
        title: t.legalPage.notFoundTitle,
        lastUpdated: '',
        intro: t.legalPage.notFoundDesc,
        sections: [] as { heading: string; body: string }[]
    };

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue">
            
            <HeroSection
                title={data.title}
                subtitle={t.legalPage.subtitle}
                backgroundImage="/images/vsoe/vsoe-exterior-night.jpg"
            />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-vsoe-blue prose-p:text-vsoe-blue/80 font-sans">
                    {data.lastUpdated && (
                        <p className="text-sm text-vsoe-blue/50 !mt-0">{data.lastUpdated}</p>
                    )}
                    <p className="lead">{data.intro}</p>
                    {data.sections?.map((section: { heading: string; body: string }) => (
                        <div key={section.heading}>
                            <h3>{section.heading}</h3>
                            <p>{section.body}</p>
                        </div>
                    ))}
                </div>
            </div>
            
        </main>
    );
}
