'use client';


import HeroSection from '@/components/ui/HeroSection';
import { journeys } from '@/data/journeys';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function DestinationsPage() {
    const { t } = useTranslation();
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">

            <HeroSection
                title={t.destinations.title}
                subtitle={t.destinations.subtitle}
                backgroundImage="/images/vsoe/vsoe-venice-night.jpg"
            />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {journeys.map((journey, index) => {
                        const journeyT = t.journeysData[journey.id as keyof typeof t.journeysData];
                        return (
                            <motion.div
                            key={journey.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-vsoe-blue/20 border border-vsoe-gold/20 overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={journey.image}
                                    alt={journey.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                                <div className="absolute top-4 right-4 bg-vsoe-midnight/90 px-3 py-1 border border-vsoe-gold/50">
                                    <span className="text-xs tracking-widest uppercase text-vsoe-gold">{journeyT.duration}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-vsoe-cream mb-2">{journeyT.name}</h3>
                                <div className="flex flex-wrap gap-2 mb-4 text-xs text-vsoe-cream/60 uppercase tracking-wider">
                                    {journeyT.stops.join(' • ')}
                                </div>
                                <p className="text-vsoe-cream/80 font-light leading-relaxed mb-8 line-clamp-3">
                                    {journeyT.description}
                                </p>

                                <Link
                                    href={`/journeys/${journey.id}`}
                                    className="inline-block w-full text-center py-3 border border-vsoe-gold text-vsoe-gold hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors duration-300 uppercase tracking-widest text-xs font-bold"
                                >
                                    {t.destinations.viewJourney}
                                </Link>
                            </div>
                        </motion.div>
                        );
                    })}
                </div>
            </div>

        </main>
    );
}
