'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Journey {
    id: string;
    name: string;
    date: Date;
    price: number;
    image: string;
    description: string;
    availableCabins: number;
}

export default function JourneyGrid({ journeys }: { journeys: Journey[] }) {
    const { t, language } = useTranslation();
    
    if (!journeys || journeys.length === 0) {
        return (
            <div className="text-center py-20 border border-white/10 rounded-sm">
                <p className="text-xl text-vsoe-cream/60 font-serif italic">{t.booking.noJourneys}</p>
                <p className="text-sm text-vsoe-gold mt-4 uppercase tracking-widest">{t.booking.checkBack}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeys.map((journey, index) => (
                <motion.div
                    key={journey.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group relative h-[600px] rounded-sm overflow-hidden cursor-pointer border border-white/5 hover:border-vsoe-gold/50 transition-colors duration-500"
                >
                    <Link href={`/book/${journey.id}`} className="block w-full h-full">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={journey.image}
                                alt={journey.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 text-vsoe-gold mb-2 text-xs tracking-[0.2em] uppercase font-bold">
                                    <Calendar size={12} />
                                    <span>{new Date(journey.date).toLocaleDateString(language, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>

                                <h2 className="text-3xl font-serif text-white mb-4 group-hover:text-vsoe-gold transition-colors duration-300">
                                    {journey.name}
                                </h2>

                                <p className="text-vsoe-cream/70 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                                    {journey.description}
                                </p>

                                {journey.availableCabins < 5 && (
                                    <p className="text-red-400 text-[10px] uppercase tracking-widest mb-4 animate-pulse">
                                        {t.booking.cabinsLeft.replace('{count}', journey.availableCabins.toString())}
                                    </p>
                                )}

                                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40">{t.booking.startingFrom}</span>
                                        <span className="text-xl font-serif text-vsoe-cream">€{journey.price.toLocaleString(language)}</span>
                                    </div>

                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-vsoe-gold group-hover:border-vsoe-gold group-hover:text-vsoe-midnight transition-all duration-300">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
