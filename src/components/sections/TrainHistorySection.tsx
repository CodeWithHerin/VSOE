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
        offset: ['start end', 'end start']
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [160, -160]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-160, 160]);
    const rotate1 = useTransform(scrollYProgress, [0.4, 1], [-0.4, 0.4]);
    const rotate2 = useTransform(scrollYProgress, [0.4, 1], [0.4, -0.4]);

    const vp = { once: true, margin: '-60px' };
    const ease = [0.25, 1, 0.5, 1] as const;

    return (
        <section ref={containerRef} className="relative pt-10 pb-24 bg-vsoe-midnight text-vsoe-cream overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
            </div>

            <div id="track-heritage" className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Content — each element animates independently */}
                <div className="space-y-8 relative z-10">



                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.8, ease, delay: 0.25 }}
                        className="text-5xl md:text-6xl font-serif leading-tight"
                    >
                        {t.history.title1} <br />
                        <span className="text-vsoe-gold">{t.history.title2}</span>
                    </motion.h2>

                    {/* Body */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.7, ease, delay: 0.38 }}
                        className="text-white/70 leading-relaxed font-sans text-lg"
                    >
                        {t.history.desc}
                    </motion.p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={vp}
                            transition={{ duration: 0.6, ease, delay: 0.5 }}
                        >
                            <span className="block text-3xl font-serif text-vsoe-gold mb-2">
                                {t.history.restored}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-white/60">
                                {t.history.restoredSub}
                            </span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={vp}
                            transition={{ duration: 0.6, ease, delay: 0.6 }}
                        >
                            <span className="block text-3xl font-serif text-vsoe-gold mb-2">
                                {t.history.era}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-white/60">
                                {t.history.eraSub}
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Visuals */}
                <div className="relative h-[600px] grid grid-cols-2 gap-8">
                    <motion.div
                        style={{ y: y1, rotate: rotate1 }}
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

                    <motion.div
                        style={{ y: y2, rotate: rotate2 }}
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
