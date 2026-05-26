'use client';

import React, { Suspense } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface BookPageClientProps {
    journeyList: React.ReactNode;
    calendar: React.ReactNode;
    skeleton: React.ReactNode;
}

export default function BookPageClient({ journeyList, calendar, skeleton }: BookPageClientProps) {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif text-vsoe-gold mb-6">{t.bookPage.selectTitle}</h1>
                    <p className="text-vsoe-cream/60 tracking-[0.2em] uppercase text-sm">{t.bookPage.beginStory}</p>
                </div>

                {/* Instant Navigation - Suspense is handled by server */}
                {journeyList}
            </div>

            {/* Availability Calendar Section - Suspended to prevent blocking */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase">{t.bookPage.planTitle}</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-vsoe-cream">{t.bookPage.viewAvail}</h2>
                        <p className="text-white/70 text-lg leading-relaxed max-w-md">
                            {t.bookPage.availDesc}
                        </p>
                        <div className="flex gap-8 text-sm text-vsoe-gold/80 font-serif italic">
                            <span>{t.bookPage.availNote1}</span>
                            <span>{t.bookPage.availNote2}</span>
                        </div>
                    </div>
                    <div>
                        {calendar}
                    </div>
                </div>
            </div>

            {/* Concierge Service */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-vsoe-midnight text-vsoe-cream p-12 rounded-sm border border-vsoe-gold/30 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4">
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase">{t.bookPage.wgService}</span>
                        <h2 className="text-3xl font-serif">{t.bookPage.wgTitle}</h2>
                        <p className="text-white/70 max-w-xl">
                            {t.bookPage.wgDesc}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-white text-vsoe-midnight px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-vsoe-gold transition-colors">
                            {t.bookPage.schedCall}
                        </button>
                        <button className="border border-white/30 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-vsoe-midnight transition-colors">
                            {t.bookPage.waUs}
                        </button>
                    </div>
                </div>
            </div>

                    </main >
    );
}
