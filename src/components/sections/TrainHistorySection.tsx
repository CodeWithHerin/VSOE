'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
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

    // Amplified parallax
    const y1 = useTransform(scrollYProgress, [0, 1], [160, -160]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-160, 160]);

    // Rotation starts at 40% scroll progress — subtle, delayed
    const rotate1 = useTransform(scrollYProgress, [0.4, 1], [-2, 2]);
    const rotate2 = useTransform(scrollYProgress, [0.4, 1], [2, -2]);

    // Stagger config for text children
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            }
        }
    };

    const lineVariants: Variants = {
        hidden: { scaleX: 0, originX: 0 },
        visible: {
            scaleX: 1,
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 32 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
        }
    };

    const statVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
        }
    };

    return (
        <section ref={containerRef} className="relative py-24 bg-vsoe-midnight text-vsoe-cream overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
            </div>

            <div id="track-heritage" className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Content — staggered whileInView entrance */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="space-y-8 relative z-10"
                >
                    {/* Gold line draws first */}
                    <motion.div
                        variants={lineVariants}
                        className="h-[1px] bg-vsoe-gold w-full"
                    />

                    {/* Label */}
                    <motion.span
                        variants={itemVariants}
                        className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block"
                    >
                        {t.history.legend}
                    </motion.span>

                    {/* Headline */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-5xl md:text-6xl font-serif leading-tight"
                    >
                        {t.history.title1} <br />
                        <span className="text-vsoe-gold">{t.history.title2}</span>
                    </motion.h2>

                    {/* Body */}
                    <motion.p
                        variants={itemVariants}
                        className="text-white/70 leading-relaxed font-sans text-lg"
                    >
                        {t.history.desc}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10"
                    >
                        <motion.div variants={statVariants}>
                            <span className="block text-3xl font-serif text-vsoe-gold mb-2">
                                {t.history.restored}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-white/60">
                                {t.history.restoredSub}
                            </span>
                        </motion.div>
                        <motion.div variants={statVariants}>
                            <span className="block text-3xl font-serif text-vsoe-gold mb-2">
                                {t.history.era}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-white/60">
                                {t.history.eraSub}
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Visuals — scroll-driven parallax + delayed rotation */}
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
