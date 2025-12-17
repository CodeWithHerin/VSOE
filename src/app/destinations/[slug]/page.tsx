'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { journeys } from '@/data/journeys';
import { notFound } from 'next/navigation';
import DestinationHero from '@/components/destinations/DestinationHero';
import RouteTimeline from '@/components/destinations/RouteTimeline';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { use } from 'react';

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const journey = journeys.find(j => j.id === slug);

    if (!journey) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            {/* 1. Cinematic Hero */}
            <DestinationHero
                title={journey.name}
                subtitle="The Grand Tour"
                videoSrc={journey.heroVideo || ''}
                imageSrc={journey.heroImage || ''}
            />

            {/* 2. Introduction */}
            <section className="py-24 px-6 md:px-12 bg-vsoe-midnight text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="block text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase mb-8">
                        {journey.duration} • {journey.stops.join(' — ')}
                    </span>
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-vsoe-cream/90">
                        {journey.description}
                    </p>
                </div>
            </section>

            {/* 3. The Timeline */}
            {journey.timeline && <RouteTimeline events={journey.timeline} />}

            {/* 4. Booking CTA */}
            <section className="py-32 bg-[#0a0f1c] border-t border-vsoe-gold/10 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to Depart?</h2>
                    <p className="text-vsoe-cream/60 mb-12 max-w-lg mx-auto">
                        Secure your cabin on this historic route. Availability is limited for the upcoming season.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-2xl text-vsoe-gold font-serif block mb-4">{journey.price} <span className="text-sm font-sans text-white/40">per passenger</span></span>

                        <Link
                            href={`/book?journey=${journey.id}`}
                            className="group relative px-12 py-5 bg-vsoe-gold text-vsoe-midnight font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Reserve Cabin <ArrowRight size={16} />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
