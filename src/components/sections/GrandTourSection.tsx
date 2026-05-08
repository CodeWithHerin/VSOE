'use client';

import { motion } from 'framer-motion';
import { Train, Clock, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';



import { useTrackInterest } from '@/lib/profiling';

export default function GrandTourSection() {
    const { t } = useTranslation();
    useTrackInterest('adventure');
    
    const JOURNEYS = [
        {
            id: 'paris-venice',
            title: t.routes.journey1Title,
            route: t.routes.journey1Route,
            duration: t.routes.journey1Duration,
            image: "/images/vsoe/vsoe-paris-departure.jpg",
            description: t.routes.journey1Desc,
            price: t.routes.journey1Price,
            dates: t.routes.journey1Dates
        },
        {
            id: 'paris-istanbul',
            title: t.routes.journey2Title,
            route: t.routes.journey2Route,
            duration: t.routes.journey2Duration,
            image: "/images/vsoe/vsoe-dining-car.jpg",
            description: t.routes.journey2Desc,
            price: t.routes.journey2Price,
            dates: t.routes.journey2Dates
        },
        {
            id: 'venice-paris',
            title: t.routes.journey3Title,
            route: t.routes.journey3Route,
            duration: t.routes.journey3Duration,
            image: "/images/vsoe/vsoe-venice-night.jpg",
            description: t.routes.journey3Desc,
            price: t.routes.journey3Price,
            dates: t.routes.journey3Dates
        }
    ];

    return (
        <section id="track-adventure" className="w-full bg-vsoe-midnight py-12 relative z-20">
            <div className="container mx-auto px-6 md:px-12">

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {JOURNEYS.map((journey, index) => (
                        <motion.div
                            key={journey.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-[#0a0f1c] border border-vsoe-gold/20 hover:border-vsoe-gold/60 transition-colors duration-500 overflow-hidden"
                        >
                            {/* Image with Hover Effect */}
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    src={journey.image}
                                    alt={journey.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent" />

                                {/* Route Badge */}
                                <div className="absolute top-4 left-4 bg-vsoe-midnight/90 backdrop-blur border border-vsoe-gold/50 px-3 py-1 text-[10px] uppercase tracking-widest text-vsoe-gold flex items-center gap-2">
                                    <Train size={12} /> {journey.route}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-vsoe-cream mb-2 group-hover:text-vsoe-gold transition-colors">{journey.title}</h3>
                                <p className="text-white/60 text-sm font-sans mb-6 leading-relaxed border-b border-white/5 pb-6">
                                    {journey.description}
                                </p>

                                {/* Meta details */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={10} /> {t.routes.duration}</span>
                                        <span className="text-sm text-vsoe-cream">{journey.duration}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={10} /> {t.routes.dates}</span>
                                        <span className="text-sm text-vsoe-cream">{journey.dates}</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="flex items-center justify-between">
                                    <span className="text-vsoe-gold font-serif text-lg">{journey.price}</span>
                                    <Link href={`/book?journey=${journey.id}`} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-white hover:text-vsoe-gold transition-colors">
                                        {t.routes.reserve} <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
