'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import ShoppableCard from '@/components/ui/ShoppableCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StoryDetail() {
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
                        Heritage
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 max-w-4xl">The Return of the Art Deco Icon</h1>
                    <p className="text-lg md:text-xl font-sans text-white/80 max-w-2xl leading-relaxed">
                        A journey into the restoration of the world's most famous train, where every panel tells a story of 1920s glamour.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-24 relative">
                <Link href="/stories" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vsoe-midnight/40 hover:text-vsoe-gold mb-12 transition-colors">
                    <ArrowLeft size={14} /> Back to Stories
                </Link>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-vsoe-midnight prose-p:text-vsoe-midnight/70 prose-p:font-sans prose-p:leading-loose">
                    <p className="lead text-2xl font-serif text-vsoe-midnight mb-8">
                        When the Venice Simplon-Orient-Express glides into the station, it is not merely a train that arrives, but an era.
                        The polished navy-blue carriages, adorned with the golden crest, are a portal to the Golden Age of Travel.
                    </p>

                    <p>
                        Inside, the restoration tells a meticulous tale of craftsmanship. Original marquetry panels by René Prou
                        have been gently coaxed back to brilliance by expert artisans. The Lalique glass panels in the dining cars
                        shimmer with the same ethereal light that captivated travelers a century ago.
                    </p>

                    {/* Shoppable Widget Injection */}
                    <ShoppableCard
                        title="Historic Cabin"
                        price="€3,530"
                        image="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop"
                        link="/book"
                    />

                    <h2 className="text-4xl mt-16 mb-8">A Symphony of Wood and Glass</h2>
                    <p>
                        Each cabin is a sanctuary of style. The 'Historic Cabins' retain their original 1920s layout,
                        a marvel of compact luxury where a plush banquette transforms into comfortable berths.
                        For those seeking more space, the new Grand Suites offer private bathrooms and double beds,
                        seamlessly integrating modern comfort with vintage aesthetics.
                    </p>

                    <p>
                        But it is in the details that the magic lies. The weight of the crystal glassware,
                        the crispness of the linens, the soft glow of the Art Deco lamps—every element is curated
                        to transport you.
                    </p>

                    <div className="my-16 relative aspect-video rounded-sm overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
                            alt="Dining Car"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <h2 className="text-4xl mt-16 mb-8">The Culinary Theatre</h2>
                    <p>
                        Dining on board is theatre. In <em>L'Étoile du Nord</em>, the woodwork features intricate floral patterns.
                        Here, Executive Chef Jean Imbert presents a menu that honors the route's history while embracing
                        local, seasonal ingredients.
                    </p>

                    {/* Shoppable Widget Injection */}
                    <ShoppableCard
                        title="L'Étoile du Nord"
                        price="Included"
                        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
                        link="/dining"
                    />

                    <p>
                        As the landscape shifts from the rolling hills of France to the soaring peaks of the Alps,
                        so too does the atmosphere on board. It is a journey not just across a continent,
                        but through time itself.
                    </p>
                </div>

                {/* Design My Trip CTA */}
                <div className="mt-24 bg-vsoe-midnight text-vsoe-cream p-12 text-center rounded-sm border border-vsoe-gold/30">
                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Belmond Concierge</span>
                    <h3 className="text-3xl font-serif mb-6">Inspired by this journey?</h3>
                    <p className="text-white/70 mb-8 max-w-md mx-auto">
                        Let our travel experts craft a bespoke itinerary featuring the Historic Cabins and a private dining experience.
                    </p>
                    <Link
                        href="/book"
                        className="inline-block bg-vsoe-gold text-vsoe-midnight px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                    >
                        Design My Trip
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
