'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTrackInterest } from '@/lib/profiling';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function TrainHistorySection() {
    const { t } = useTranslation();
    useTrackInterest('heritage');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section ref={containerRef} className="relative py-24 bg-vsoe-midnight text-vsoe-cream overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
            </div>

            <div id="track-heritage" className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 relative z-10"
                >
                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block">{t.history.legend}</span>
                    <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                        {t.history.title1} <br /> <span className="text-vsoe-gold">{t.history.title2}</span>
                    </h2>
                    <p className="text-white/70 leading-relaxed font-sans text-lg">
                        {t.history.desc}
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                        <div>
                            <span className="block text-3xl font-serif text-vsoe-gold mb-2">{t.history.restored}</span>
                            <span className="text-xs uppercase tracking-widest text-white/60">{t.history.restoredSub}</span>
                        </div>
                        <div>
                            <span className="block text-3xl font-serif text-vsoe-gold mb-2">{t.history.era}</span>
                            <span className="text-xs uppercase tracking-widest text-white/60">{t.history.eraSub}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Visuals */}
                <div className="relative h-[600px] grid grid-cols-2 gap-8">
                    {/* Image 1: Detail (Parallax Up) */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative h-[80%] mt-auto self-end group"
                    >
                        <div className="absolute -inset-4 border border-vsoe-gold/30 z-0 transition-transform duration-500 group-hover:scale-105" />
                        <div className="relative h-full w-full overflow-hidden">
                            <Image
                                src="/images/vsoe/vsoe-historic-cabin.jpg"
                                alt="Art Deco Detail"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-vsoe-gold/10 mix-blend-overlay" />
                        </div>
                    </motion.div>

                    {/* Image 2: Interior (Parallax Down) */}
                    <motion.div
                        style={{ y: y2 }}
                        className="relative h-[80%] group"
                    >
                        <div className="absolute -inset-4 border border-vsoe-gold/30 z-0 transition-transform duration-500 group-hover:scale-105 delay-75" />
                        <div className="relative h-full w-full overflow-hidden">
                            <Image
                                src="/images/vsoe/vsoe-bar-car.jpg"
                                alt="Interior"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-vsoe-gold/10 mix-blend-overlay" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
