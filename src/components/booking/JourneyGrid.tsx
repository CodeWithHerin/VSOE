'use client';

import React from 'react';
import Image from 'next/image';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Journey } from '@/app/[lang]/book/page';

interface JourneyGridProps {
    journeys: Journey[];
    loading: boolean;
    error: string | null;
}

function formatDate(isoString: string): string {
    try {
        return new Date(isoString).toLocaleDateString('en', {
            month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
        });
    } catch {
        return isoString;
    }
}

function formatPrice(price: number): string {
    try {
        return `€${Number(price).toLocaleString('en')}`;
    } catch {
        return `€${price}`;
    }
}

function Skeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-[600px] bg-white/5 rounded-sm animate-pulse flex items-center justify-center border border-white/10">
                    <span className="text-vsoe-gold/20 text-4xl font-serif">VSOE</span>
                </div>
            ))}
        </div>
    );
}

export default function JourneyGrid({ journeys, loading, error }: JourneyGridProps) {
    if (loading) return <Skeleton />;

    if (error) {
        return (
            <div className="text-center py-20 border border-white/10 rounded-sm">
                <p className="text-xl text-red-400 font-serif italic">{error}</p>
            </div>
        );
    }

    if (!journeys || journeys.length === 0) {
        return (
            <div className="text-center py-20 border border-white/10 rounded-sm">
                <p className="text-xl text-vsoe-cream/60 font-serif italic">No upcoming journeys scheduled at this time.</p>
                <p className="text-sm text-vsoe-gold mt-4 uppercase tracking-widest">Please check back later</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeys.map((journey) => (
                <div
                    key={journey.id}
                    className="group relative h-[600px] rounded-sm overflow-hidden cursor-pointer border border-white/5 hover:border-vsoe-gold/50 transition-colors duration-500"
                >
                    <Link href={`/book/${journey.id}`} className="block w-full h-full">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src={journey.image}
                                alt={journey.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 text-vsoe-gold mb-2 text-xs tracking-[0.2em] uppercase font-bold">
                                    <Calendar size={12} />
                                    <span>{formatDate(journey.departureDate)}</span>
                                </div>

                                <h2 className="text-3xl font-serif text-white mb-4 group-hover:text-vsoe-gold transition-colors duration-300">
                                    {journey.name}
                                </h2>

                                <p className="text-vsoe-cream/70 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                                    {journey.description}
                                </p>

                                {journey.availableCabins < 5 && (
                                    <p className="text-red-400 text-[10px] uppercase tracking-widest mb-4 animate-pulse">
                                        Only {journey.availableCabins} cabins left
                                    </p>
                                )}

                                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40">Starting from</span>
                                        <span className="text-xl font-serif text-vsoe-cream">{formatPrice(journey.price)}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-vsoe-gold group-hover:border-vsoe-gold group-hover:text-vsoe-midnight transition-all duration-300">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
