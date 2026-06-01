'use client';

import { use } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useTranslation();

    const data = t.legalData[slug as keyof typeof t.legalData] || {
        title: t.legalPage.notFoundTitle,
        lastUpdated: '' as string,
        intro: t.legalPage.notFoundDesc,
        sections: [] as Array<{ heading: string; body: string }>
    };

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue">
            <HeroSection
                title={data.title}
                subtitle={t.legalPage.subtitle}
                backgroundImage="/images/vsoe/vsoe-exterior-night.jpg"
            />

            {/* Content */}
            <div className="max-w-2xl mx-auto px-6 md:px-8 py-20 md:py-28">

                {/* Demo callout */}
                <div className="border-l-2 border-vsoe-gold bg-vsoe-gold/5 pl-5 pr-4 py-4 mb-12">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-vsoe-gold font-bold mb-2">
                        Portfolio Demonstration
                    </p>
                    <p className="text-sm text-vsoe-blue/80 leading-relaxed font-sans">
                        {data.intro}
                    </p>
                </div>

                {/* Last updated */}
                {data.lastUpdated && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-vsoe-blue/40 text-right mb-10 font-sans">
                        {data.lastUpdated}
                    </p>
                )}

                {/* Sections */}
                <div className="space-y-10">
                    {data.sections?.map((section: { heading: string; body: string }) => (
                        <div key={section.heading} className="border-t border-vsoe-blue/10 pt-8">
                            <h3 className="font-serif text-lg text-vsoe-blue mb-3">
                                {section.heading}
                            </h3>
                            <p className="text-sm text-vsoe-blue/70 leading-relaxed font-sans">
                                {section.body}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
