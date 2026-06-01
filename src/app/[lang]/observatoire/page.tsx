'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { ArrowRight, Eye, BookOpen, Flame, Compass } from 'lucide-react';

// ─── Spaces ──────────────────────────────────────────────────────────────────

const SPACES = [
    {
        icon: Eye,
        name: 'The Bedroom',
        desc: 'A double bed set within a cocoon of hand-crafted marquetry. Curved corners and round windows — JR designed the room through shapes, creating small places to daydream.'
    },
    {
        icon: BookOpen,
        name: 'The Library',
        desc: 'A curated selection of books chosen by French publisher Gallimard, shelved within walls of inlaid wood. Every spine a discovery; every title a conversation starter.'
    },
    {
        icon: Flame,
        name: 'The Secret Tearoom',
        desc: 'Hidden behind the library — a fireplace, a kettle, and silence. The most private space on any train in the world. You must find it yourself.'
    },
    {
        icon: Compass,
        name: 'The Lounge',
        desc: 'A reclining day bed, a writing surface, and the passing landscape of Europe through round windows. The artist\'s studio, made mobile.'
    },
];

// ─── Craft details ────────────────────────────────────────────────────────────

const CRAFT = [
    { detail: 'Stained glass', provenance: 'Hand-painted by a 500-year-old German atelier' },
    { detail: 'Marble surfaces', provenance: 'Quarried from Carrara, Tuscany' },
    { detail: 'Marquetry', provenance: 'Inlaid wood spanning every wall and ceiling — artisans from across Europe' },
    { detail: 'Carriage', provenance: 'Sleeping Car 3553 — an original early-1900s VSOE carriage' },
    { detail: 'Team', provenance: 'Over 100 specialists to realise one artist\'s vision' },
];

// ─── Fade-in variant ──────────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
    })
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ObservatoirePage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">

            {/* ── Full-screen hero ─────────────────────────────────────── */}
            <div className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
                <Image
                    src="/images/vsoe/vsoe-exterior-night.jpg"
                    alt="L'Observatoire — Venice Simplon-Orient-Express"
                    fill
                    className="object-cover scale-105"
                    priority
                    sizes="100vw"
                />
                {/* Deep gradient — darker than Celia, more mysterious */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-16 pb-16 md:pb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[10px] uppercase tracking-[0.5em] text-vsoe-gold font-bold mb-5"
                    >
                        Venice Simplon-Orient-Express · Sleeping Car 3553
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-vsoe-cream leading-none tracking-tight mb-2"
                    >
                        L'Observatoire
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="text-[11px] uppercase tracking-[0.35em] text-vsoe-gold/70 font-sans mb-8"
                    >
                        Designed by JR · First revealed at the 2024 Venice Art Biennale
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="text-sm text-vsoe-cream/60 font-sans max-w-sm leading-relaxed mb-10"
                    >
                        The first carriage on the Venice Simplon-Orient-Express
                        ever designed by an artist. Now operating.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 border border-vsoe-gold text-vsoe-gold px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors duration-300"
                        >
                            Reserve L'Observatoire <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* ── The story ────────────────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-6 md:px-16 py-28 md:py-40">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                    custom={0}
                >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-4">The Story</p>
                    <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-10" />
                </motion.div>

                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                    custom={1}
                    className="font-serif text-2xl md:text-3xl text-vsoe-cream/90 leading-relaxed mb-10"
                >
                    As a teenager in the Paris suburbs, JR tagged trains with a spray can.
                    He rode them into the city, watching his work move. He understood
                    something most artists never do: a train is not a wall. It is a canvas
                    that goes somewhere.
                </motion.p>

                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                    custom={2}
                    className="text-sm text-vsoe-cream/55 font-sans leading-[1.9] mb-8"
                >
                    Decades later, the Venice Simplon-Orient-Express commissioned that same
                    artist — now Oscar-nominated, internationally acclaimed — to design
                    Sleeping Car 3553 from the inside out. L'Observatoire is the result:
                    the first carriage in the train's history conceived entirely by an
                    artist's hand.
                </motion.p>

                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                    custom={3}
                    className="text-sm text-vsoe-cream/55 font-sans leading-[1.9]"
                >
                    It was revealed to the world not at a press conference, but floating
                    on a barge on the canals of Venice during the 2024 Art Biennale —
                    where visitors peered through eye-shaped portholes in the windows
                    to glimpse the interior, unable to enter, only to observe. The name
                    was always the instruction.
                </motion.p>
            </div>

            {/* ── The spaces ───────────────────────────────────────────── */}
            <div className="border-t border-white/8 bg-white/[0.015]">
                <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-20 md:py-28">
                    <div className="mb-16">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-4">Inside</p>
                        <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-4" />
                        <h2 className="font-serif text-3xl md:text-4xl text-vsoe-cream">The Spaces</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
                        {SPACES.map((space, i) => {
                            const Icon = space.icon;
                            return (
                                <motion.div
                                    key={space.name}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    variants={fadeUp}
                                    custom={i * 0.5}
                                    className="bg-vsoe-midnight p-10 md:p-14 group"
                                >
                                    <Icon
                                        size={20}
                                        className="text-vsoe-gold/50 mb-6 group-hover:text-vsoe-gold transition-colors duration-500"
                                    />
                                    <h3 className="font-serif text-xl text-vsoe-cream mb-4">
                                        {space.name}
                                    </h3>
                                    <p className="text-sm text-vsoe-cream/50 font-sans leading-relaxed">
                                        {space.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Split image + JR quote ────────────────────────────────── */}
            <div className="grid md:grid-cols-2 min-h-[60vh]">
                <div className="relative min-h-[400px]">
                    <Image
                        src="/images/vsoe/vsoe-grand-suite.jpg"
                        alt="L'Observatoire interior"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-vsoe-midnight/20" />
                </div>
                <div className="bg-black flex items-center px-10 md:px-16 py-16">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-8">JR, 2024</p>
                        <blockquote className="font-serif text-xl md:text-2xl text-vsoe-cream/85 leading-relaxed mb-8">
                            "I wanted to create so many hidden details and layers
                            that can help inspire that sense of wonder — so that
                            every time you come back, you discover something new."
                        </blockquote>
                        <p className="text-xs text-vsoe-cream/40 font-sans uppercase tracking-widest">
                            On designing L'Observatoire
                        </p>
                    </div>
                </div>
            </div>

            {/* ── The craft ────────────────────────────────────────────── */}
            <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-20 md:py-28">
                <div className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-4">Materials & Provenance</p>
                    <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-4" />
                    <h2 className="font-serif text-3xl md:text-4xl text-vsoe-cream">The Craft</h2>
                </div>

                <div className="divide-y divide-white/8">
                    {CRAFT.map((item, i) => (
                        <motion.div
                            key={item.detail}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            variants={fadeUp}
                            custom={i * 0.2}
                            className="grid md:grid-cols-2 gap-4 py-7 group"
                        >
                            <p className="text-sm font-serif text-vsoe-cream/80 group-hover:text-vsoe-gold transition-colors duration-300">
                                {item.detail}
                            </p>
                            <p className="text-sm text-vsoe-cream/40 font-sans">
                                {item.provenance}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Venice Biennale note ──────────────────────────────────── */}
            <div className="border-t border-white/8 bg-white/[0.015]">
                <div className="max-w-3xl mx-auto px-6 md:px-16 py-20 text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-6">The Reveal</p>
                    <div className="w-8 h-[1px] bg-vsoe-gold/40 mx-auto mb-10" />
                    <p className="font-serif text-xl md:text-2xl text-vsoe-cream/80 leading-relaxed">
                        In April 2024, L'Observatoire floated into Venice on a barge
                        during the 60th Art Biennale. The public could not enter.
                        They could only look — through eye-shaped portholes, at eye level,
                        at a world they could observe but not yet touch.
                        The carriage joined the train in 2025.
                    </p>
                </div>
            </div>

            {/* ── Portfolio disclaimer ──────────────────────────────────── */}
            <div className="border-t border-white/8">
                <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-vsoe-cream/20 text-center font-sans">
                        Portfolio demonstration — L'Observatoire is a real carriage operating on the Venice Simplon-Orient-Express, A Belmond Train.
                        This page is an independent portfolio recreation and is not affiliated with Belmond, JR, or the Venice Simplon-Orient-Express.
                    </p>
                </div>
            </div>

            {/* ── Final CTA ────────────────────────────────────────────── */}
            <div className="max-w-[1920px] mx-auto px-6 md:px-16 py-28 md:py-40">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-vsoe-gold font-bold mb-4">
                            Private Carriage · Exclusive Hire
                        </p>
                        <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-8" />
                        <h2 className="font-serif text-4xl md:text-5xl text-vsoe-cream mb-6 leading-tight">
                            Enter the Artist's World
                        </h2>
                        <p className="text-sm text-vsoe-cream/50 font-sans leading-relaxed mb-10 max-w-md">
                            L'Observatoire is available as a private suite for individual
                            travellers or as an exclusive hire for groups. Contact our
                            reservations team to arrange your journey.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 bg-vsoe-gold text-vsoe-midnight px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
                            >
                                Make an Enquiry <ArrowRight size={14} />
                            </Link>
                            <Link
                                href="/celia"
                                className="inline-flex items-center justify-center gap-3 border border-white/20 text-vsoe-cream/60 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-vsoe-gold hover:text-vsoe-gold transition-colors duration-300"
                            >
                                Also: Celia
                            </Link>
                        </div>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src="/images/vsoe/vsoe-historic-cabin.jpg"
                            alt="L'Observatoire — private suite"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-vsoe-midnight/20" />
                    </div>
                </div>
            </div>

        </main>
    );
}
