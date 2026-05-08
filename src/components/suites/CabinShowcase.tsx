'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cabins } from '@/data/cabins';
import { Sun, Moon, Check, ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function CabinShowcase() {
    const { t } = useTranslation();
    const [activeCabinIndex, setActiveCabinIndex] = useState(0);
    const [isNightMode, setIsNightMode] = useState(false);

    const activeCabin = cabins[activeCabinIndex];

    return (
        <section className="relative w-full min-h-screen bg-vsoe-midnight py-24 flex flex-col items-center">

            {/* 1. Cabin Selector (Tabs) */}
            <div className="relative z-20 flex flex-wrap justify-center gap-4 mb-16 px-6">
                {cabins.map((cabin, index) => {
                    const cabinT = t.cabinsData[cabin.id as keyof typeof t.cabinsData];
                    return (
                        <button
                            key={cabin.id}
                            onClick={() => setActiveCabinIndex(index)}
                            className={`px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-vsoe-gold ${activeCabinIndex === index
                                ? 'bg-vsoe-gold text-vsoe-midnight'
                                : 'bg-transparent text-vsoe-gold hover:bg-vsoe-gold/10'
                                }`}
                        >
                            {cabinT.name}
                        </button>
                    );
                })}
            </div>

            {/* 2. Main Display Area */}
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Visuals (Left/Top) */}
                <div className="lg:col-span-8 relative">
                    {/* Day/Night Toggle */}
                    <div className="absolute top-6 right-6 z-20 flex bg-black/50 backdrop-blur rounded-full p-1 border border-white/10">
                        <button
                            onClick={() => setIsNightMode(false)}
                            className={`p-2 rounded-full transition-colors ${!isNightMode ? 'bg-white text-vsoe-midnight' : 'text-white/50 hover:text-white'}`}
                        >
                            <Sun size={20} />
                        </button>
                        <button
                            onClick={() => setIsNightMode(true)}
                            className={`p-2 rounded-full transition-colors ${isNightMode ? 'bg-vsoe-blue text-vsoe-cream' : 'text-white/50 hover:text-white'}`}
                        >
                            <Moon size={20} />
                        </button>
                    </div>

                    {/* Image Frame */}
                    <div className="aspect-[16/9] w-full relative overflow-hidden border border-vsoe-gold/20 bg-black">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeCabin.id}-${isNightMode ? 'night' : 'day'}`}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={activeCabin.image}
                                    alt={`${activeCabin.name} - ${isNightMode ? 'Night Mode' : 'Day Mode'}`}
                                    fill
                                    className={`object-cover transition-all duration-1000 ${isNightMode ? 'brightness-[0.4] saturate-[0.7] hue-rotate-[10deg]' : 'brightness-100 saturate-100'}`}
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Overlay Gradient */}
                        <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${isNightMode ? 'bg-gradient-to-t from-vsoe-midnight/60 via-blue-950/30 to-vsoe-midnight/40' : 'bg-transparent'}`} />
                    </div>
                </div>

                {/* Details (Right/Bottom) */}
                <div className="lg:col-span-4 text-left">
                    <motion.div
                        key={activeCabin.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="block text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
                            {t.cabinsData[activeCabin.id as keyof typeof t.cabinsData].tagline}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-vsoe-cream mb-6">
                            {t.cabinsData[activeCabin.id as keyof typeof t.cabinsData].name}
                        </h2>
                        <p className="text-vsoe-cream/70 font-light leading-relaxed mb-8 text-lg">
                            {t.cabinsData[activeCabin.id as keyof typeof t.cabinsData].description}
                        </p>

                        <ul className="space-y-4 mb-10">
                            {t.cabinsData[activeCabin.id as keyof typeof t.cabinsData].features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-vsoe-cream/80">
                                    <div className="w-5 h-5 rounded-full border border-vsoe-gold/50 flex items-center justify-center text-vsoe-gold">
                                        <Check size={10} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-8 border-t border-white/10">
                            <span className="block text-2xl font-serif text-vsoe-gold mb-6">
                                {t.cabinsData[activeCabin.id as keyof typeof t.cabinsData].price}
                            </span>
                            <Link
                                href="/book"
                                className="inline-flex items-center gap-4 bg-vsoe-gold text-vsoe-midnight px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-colors"
                            >
                                {t.journeyClientCanvas.checkAvailability} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
