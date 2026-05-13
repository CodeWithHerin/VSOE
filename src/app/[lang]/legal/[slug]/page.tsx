'use client';

import { use } from 'react';


import HeroSection from '@/components/ui/HeroSection';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useTranslation();

    const data = t.legalData[slug as keyof typeof t.legalData] || {
        title: t.legalPage.notFoundTitle,
        content: t.legalPage.notFoundDesc
    };

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue">
            
            <HeroSection
                title={data.title}
                subtitle={t.legalPage.subtitle}
                backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
            />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-vsoe-blue prose-p:text-vsoe-blue/80 font-sans">
                    <p>{data.content}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h3>{t.legalPage.introTitle}</h3>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            
        </main>
    );
}
