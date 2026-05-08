'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function InteractiveMap() {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const { t } = useTranslation();

    const LOCATIONS = [
        {
            id: 'london',
            name: 'London',
            x: 20, // %
            y: 30, // %
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
            description: t.map.londonDesc
        },
        {
            id: 'paris',
            name: 'Paris',
            x: 35,
            y: 45,
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop',
            description: t.map.parisDesc
        },
        {
            id: 'venice',
            name: 'Venice',
            x: 55,
            y: 65,
            image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2670&auto=format&fit=crop',
            description: t.map.veniceDesc
        },
        {
            id: 'istanbul',
            name: 'Istanbul',
            x: 85,
            y: 70,
            image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop',
            description: t.map.istanbulDesc
        }
    ];

    return (
        <div className="relative w-full aspect-[16/9] bg-vsoe-midnight rounded-sm overflow-hidden border border-white/10 group">
            {/* Background Map Texture (Abstract) */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale mix-blend-overlay" />

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M 20% 30% L 35% 45% L 55% 65% L 85% 70%"
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
            </svg>

            {/* Locations */}
            {LOCATIONS.map((loc) => (
                <div
                    key={loc.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    onMouseEnter={() => setActiveLocation(loc.id)}
                    onMouseLeave={() => setActiveLocation(null)}
                >
                    <motion.div
                        className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${activeLocation === loc.id ? 'bg-vsoe-gold border-vsoe-gold' : 'bg-vsoe-midnight border-vsoe-gold'}`}
                        whileHover={{ scale: 1.5 }}
                    >
                        {activeLocation === loc.id && (
                            <motion.div
                                className="absolute inset-0 bg-vsoe-gold rounded-full animate-ping opacity-75"
                            />
                        )}
                    </motion.div>

                    {/* Label */}
                    <div className={`absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${activeLocation === loc.id ? 'text-vsoe-gold' : 'text-white/50'}`}>
                        {loc.name}
                    </div>
                </div>
            ))}

            {/* Tooltip / Card */}
            <AnimatePresence>
                {activeLocation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-72 bg-vsoe-midnight/95 backdrop-blur-md border border-vsoe-gold/30 p-4 rounded-sm shadow-2xl z-20"
                    >
                        {LOCATIONS.map(loc => {
                            if (loc.id !== activeLocation) return null;
                            return (
                                <div key={loc.id}>
                                    <div className="aspect-video w-full overflow-hidden mb-4 rounded-sm">
                                        <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-xl font-serif text-vsoe-gold mb-2">{loc.name}</h3>
                                    <p className="text-xs text-vsoe-cream/80 leading-relaxed mb-4">{loc.description}</p>
                                    <Link href={`/book?destination=${loc.id}`} className="block w-full text-center py-2 border border-vsoe-gold/50 text-vsoe-gold text-[10px] uppercase tracking-widest hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors">
                                        {t.map.discover}
                                    </Link>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
