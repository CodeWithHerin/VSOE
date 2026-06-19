'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { ArrowRight, Users, Star, Wine } from 'lucide-react';

// ─── Stats ───────────────────────────────────────────────────────────────────

const STATS = [
    { label: 'Guests', value: 'Up to 12', icon: Users },
    { label: 'Carriage', value: '1932 Pullman', icon: Star },
    { label: 'Exclusive hire from', value: '£15,000', icon: Wine },
];

// ─── Details ─────────────────────────────────────────────────────────────────

const DETAILS = [
    {
        heading: 'The Carriage',
        body: 'Celia is an original 1932 Pullman carriage — one of the finest surviving examples of British railway craftsmanship. Fully restored and reimagined, it operates aboard the British Pullman as an entirely self-contained private space, with its own cocktail bar, lounge, dining area, and theatrical stage.'
    },
    {
        heading: 'The Design',
        body: 'The interior was conceived by filmmaker Baz Luhrmann and Oscar-winning costume and production designer Catherine Martin — the creative partnership behind Moulin Rouge! and The Great Gatsby. Their vision: red velvet, cascading British florals, and the feeling of stepping inside a Midsummer Night\'s Dream. Japanese illustrator Yukiko Noritake interpreted their designs in a series of otherworldly illustrations that line the carriage walls.'
    },
    {
        heading: 'The Experience',
        body: 'Celia is available for exclusive hire only — no shared journeys, no strangers. Your party of up to 12 has the carriage entirely to themselves: a dedicated team of stewards, a private chef designing menus from seasonal British produce, and a cocktail list created by Monica Berg, co-founder of London\'s Tayer + Elementary. Live performances, DJ sets, and bespoke entertainment can be arranged in advance.'
    },
    {
        heading: 'The Journey',
        body: 'Departing from London Victoria aboard the British Pullman — the VSOE\'s sister train — Celia travels to destinations including Oxford, Bath, Blenheim Palace, and the Cotswolds. Day journeys only; the experience is measured in hours, not miles. Bespoke itineraries are available for sporting events, private celebrations, and corporate occasions.'
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CeliaPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream overflow-x-hidden">

            {/* ── Full-screen Hero ─────────────────────────────────────── */}
            <div ref={containerRef} className="relative h-screen min-h-[600px] flex items-end overflow-hidden">

                {/* Parallax background */}
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 scale-110"
                >
                    <Image
                        src="/images/vsoe/vsoe-dining-car.jpg"
                        alt="Celia — Private Dining Carriage"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/40 to-black/20" />
                </motion.div>

                {/* Hero content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-16 pb-16 md:pb-24"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-4"
                    >
                        The British Pullman · Private Dining Carriage
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="font-serif text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] text-vsoe-cream leading-none tracking-tight mb-6"
                    >
                        Celia
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-sm md:text-base text-vsoe-cream/70 font-sans max-w-md leading-relaxed mb-10"
                    >
                        A private carriage for life's celebrations. Designed by Baz Luhrmann
                        and Catherine Martin. Launching summer 2026.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-vsoe-gold text-vsoe-midnight px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
                        >
                            Enquire About Celia <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 z-10"
                >
                    <div className="w-[1px] h-12 bg-vsoe-gold/30 relative overflow-hidden">
                        <motion.div
                            animate={{ y: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-x-0 h-1/2 bg-vsoe-gold"
                        />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-vsoe-cream/40 rotate-90 origin-center mt-2">Scroll</span>
                </motion.div>
            </div>

            {/* ── Stats bar ────────────────────────────────────────────── */}
            <div className="border-y border-white/10 bg-vsoe-midnight/80 backdrop-blur-sm">
                <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-8">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:divide-x md:divide-white/10">
                        {STATS.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="flex items-center gap-4 md:px-12 first:pl-0 last:pr-0">
                                    <Icon size={20} className="text-vsoe-gold flex-shrink-0" />
                                    <div>
                                        <p className="font-serif text-xl text-vsoe-cream">{stat.value}</p>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-vsoe-cream/40 font-sans">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Opening statement ────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 md:px-16 py-28 md:py-40">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-vsoe-cream/90 leading-relaxed">
                    "Stepping inside the carriage is like being transported into another world —
                    a magical mystery tour filled with food, music, wine, laughter, and performance,
                    unfolding as you drift through the countryside."
                </p>
                <p className="mt-8 text-sm text-vsoe-cream/40 font-sans uppercase tracking-widest">
                    — Baz Luhrmann
                </p>
            </div>

            {/* ── Detail sections — alternating layout ─────────────────── */}
            <div className="border-t border-white/10">
                {DETAILS.map((detail, i) => (
                    <div
                        key={detail.heading}
                        className={`border-b border-white/10 ${i % 2 === 0 ? 'bg-vsoe-midnight' : 'bg-white/[0.02]'}`}
                    >
                        <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-20 md:py-28">
                            <div className={`grid md:grid-cols-2 gap-12 md:gap-24 items-start ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
                                <div className={i % 2 !== 0 ? 'md:[direction:ltr]' : ''}>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-vsoe-gold font-bold mb-3">
                                        0{i + 1}
                                    </p>
                                    <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-6" />
                                    <h2 className="font-serif text-3xl md:text-4xl text-vsoe-cream mb-8">
                                        {detail.heading}
                                    </h2>
                                    <p className="text-sm text-vsoe-cream/60 font-sans leading-[1.9] max-w-lg">
                                        {detail.body}
                                    </p>
                                </div>
                                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                                    <Image
                                        src={[
                                            '/images/vsoe/vsoe-dining-car.jpg',
                                            '/images/vsoe/vsoe-grand-suite.jpg',
                                            '/images/vsoe/vsoe-champagne-detail.jpg',
                                            '/images/vsoe/vsoe-exterior-night.jpg',
                                        ][i]}
                                        alt={detail.heading}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-vsoe-midnight/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── The name ─────────────────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-6 md:px-16 py-28 md:py-40 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-6">The Name</p>
                <div className="w-8 h-[1px] bg-vsoe-gold/40 mx-auto mb-10" />
                <p className="font-serif text-xl md:text-2xl text-vsoe-cream/80 leading-relaxed">
                    Celia is named for a fictional muse — a character Luhrmann invented as
                    the spirit of celebration, joy, and the art of living well. She has no
                    fixed biography, only a sensibility: that every gathering deserves to
                    feel like the best night of your life.
                </p>
            </div>

            {/* ── Portfolio notice ─────────────────────────────────────── */}
            <div className="border-t border-white/10 bg-white/[0.02]">
                <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-vsoe-cream/25 text-center font-sans">
                        Portfolio demonstration — Celia is a real carriage launching summer 2026 aboard the British Pullman, a Belmond Train.
                        This page is an independent portfolio recreation and is not affiliated with Belmond or the British Pullman.
                    </p>
                </div>
            </div>

            {/* ── Final CTA ────────────────────────────────────────────── */}
            <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-28 md:py-40">
                <div className="border border-vsoe-gold/20 p-12 md:p-20 text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-4">Exclusive Hire</p>
                    <h2 className="font-serif text-4xl md:text-6xl text-vsoe-cream mb-6">Reserve Celia</h2>
                    <p className="text-sm text-vsoe-cream/50 font-sans max-w-lg mx-auto leading-relaxed mb-12">
                        Celia is available for exclusive hire from £15,000. Bespoke itineraries,
                        private chefs, and custom entertainment can be arranged. Contact our
                        reservations team to begin planning your journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-vsoe-gold text-vsoe-midnight px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
                        >
                            Make an Enquiry <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="/departure-info"
                            className="inline-flex items-center justify-center gap-3 border border-white/20 text-vsoe-cream/70 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-vsoe-gold hover:text-vsoe-gold transition-colors duration-300"
                        >
                            Before You Travel
                        </Link>
                    </div>
                </div>
            </div>

        </main>
    );
}
