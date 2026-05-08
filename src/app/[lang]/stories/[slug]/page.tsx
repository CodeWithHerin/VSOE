'use client';

import React, { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import ShoppableCard from '@/components/ui/ShoppableCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useTranslation();

    // In a real app, this would fetch from a CMS. For now, we use our dictionary data.
    // Map existing slug to available dictionary keys if necessary, or fallback.
    const storyKey = slug === 'a-love-letter-to-paris' ? 'restoring-a-legend' : (slug as keyof typeof t.storiesData);
    const story = t.storiesData[storyKey] || t.storiesData['restoring-a-legend'];

    return (
        <main className="min-h-screen bg-white text-vsoe-midnight selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[80vh] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1542259681-d4cd71a2a895?q=80&w=2670&auto=format&fit=crop"
                    alt="Art Deco Detail"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                    <span className="bg-vsoe-gold text-vsoe-midnight px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold mb-6">
                        {t.storyDetail.heritage}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 max-w-4xl">{story.title}</h1>
                    <p className="text-lg md:text-xl font-sans text-white/80 max-w-2xl leading-relaxed">
                        {story.subtitle}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-24 relative">
                <Link href="/stories" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vsoe-midnight/40 hover:text-vsoe-gold mb-12 transition-colors">
                    <ArrowLeft size={14} /> {t.storyDetail.back}
                </Link>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-vsoe-midnight prose-p:text-vsoe-midnight/70 prose-p:font-sans prose-p:leading-loose">
                    <p className="lead text-2xl font-serif text-vsoe-midnight mb-8">
                        {story.lead}
                    </p>

                    <p>
                        {story.p1}
                    </p>

                    {/* Shoppable Widget Injection */}
                    <ShoppableCard
                        title={story.card1Title}
                        price="€3,530"
                        image="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop"
                        link="/book"
                    />

                    <h2 className="text-4xl mt-16 mb-8">{story.h1}</h2>
                    <p>
                        {story.p2}
                    </p>

                    <p>
                        {story.p3}
                    </p>

                    <div className="my-16 relative aspect-video rounded-sm overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
                            alt="Dining Car"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <h2 className="text-4xl mt-16 mb-8">{story.h2}</h2>
                    <p>
                        {story.p4}
                    </p>

                    {/* Shoppable Widget Injection */}
                    <ShoppableCard
                        title={story.card2Title}
                        price={t.storyDetail.included}
                        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
                        link="/dining"
                    />

                    <p>
                        {story.p5}
                    </p>
                </div>

                {/* Design My Trip CTA */}
                <div className="mt-24 bg-vsoe-midnight text-vsoe-cream p-12 text-center rounded-sm border border-vsoe-gold/30">
                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Belmond Concierge</span>
                    <h3 className="text-3xl font-serif mb-6">{t.storyDetail.inspired}</h3>
                    <p className="text-white/70 mb-8 max-w-md mx-auto">
                        {t.storyDetail.bespoke}
                    </p>
                    <Link
                        href="/book"
                        className="inline-block bg-vsoe-gold text-vsoe-midnight px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                    >
                        {t.storyDetail.designTrip}
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
