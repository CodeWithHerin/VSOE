'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { dining } from '@/data/dining';
import Image from 'next/image';
import { X } from 'lucide-react';
import { updateInterest } from '@/lib/profiling';
import { useTranslation } from '@/lib/i18n/useTranslation';

// ─── Sample Menu Modal ────────────────────────────────────────────────────────

const SAMPLE_MENUS: Record<string, { courses: { course: string; dish: string }[] }> = {
    'etoile-du-nord': {
        courses: [
            { course: 'Amuse-Bouche', dish: 'Brittany oyster, cucumber gelée, caviar' },
            { course: 'Entrée', dish: 'Foie gras terrine, Sauternes jelly, brioche toast' },
            { course: 'Fish', dish: 'Dover sole meunière, capers, brown butter, samphire' },
            { course: 'Main', dish: 'Salt marsh lamb, rosemary jus, dauphinoise, haricots verts' },
            { course: 'Cheese', dish: 'Selection of French and Alpine cheeses, walnut bread' },
            { course: 'Dessert', dish: 'Tarte Tatin, crème fraîche, Calvados caramel' },
            { course: 'Mignardises', dish: 'Petit fours with coffee or tisane' },
        ],
    },
    'cote-dazur': {
        courses: [
            { course: 'Amuse-Bouche', dish: 'Gazpacho shot, basil oil, crouton' },
            { course: 'Entrée', dish: 'Niçoise salad, seared tuna, quail egg, anchovy dressing' },
            { course: 'Fish', dish: 'Grilled sea bass, ratatouille millefeuille, sauce vierge' },
            { course: 'Main', dish: 'Rack of Provençal lamb, tapenade crust, flageolet beans' },
            { course: 'Cheese', dish: 'Chèvre, Comté, Roquefort — regional selection' },
            { course: 'Dessert', dish: 'Lavender crème brûlée, almond tuile, raspberry coulis' },
            { course: 'Mignardises', dish: 'Calisson d\'Aix, chocolates, herbal tea' },
        ],
    },
    'oriental': {
        courses: [
            { course: 'Amuse-Bouche', dish: 'Bosphorus mussel, saffron cream, dill' },
            { course: 'Entrée', dish: 'Meze selection — hummus, baba ghanoush, stuffed vine leaves' },
            { course: 'Fish', dish: 'Hamsi (Black Sea anchovy), walnut tarator, cucumber' },
            { course: 'Main', dish: 'Ottoman-spiced lamb shoulder, pomegranate jus, freekeh pilaf' },
            { course: 'Cheese', dish: 'Aged kaşar, beyaz peynir, fig preserve, flatbread' },
            { course: 'Dessert', dish: 'Baklava millefeuille, pistachio cream, rose water' },
            { course: 'Mignardises', dish: 'Turkish delight, cardamom coffee' },
        ],
    },
    'bar-3674': {
        courses: [
            { course: 'Signature Cocktail', dish: 'Orient Express — cognac, Cointreau, rose, champagne float' },
            { course: 'Classic', dish: 'Negroni, Old Fashioned, Dry Martini — stirred, never shaken' },
            { course: 'Champagne', dish: 'Laurent-Perrier Blanc de Blancs, Krug Grande Cuvée, Dom Pérignon' },
            { course: 'Single Malts', dish: 'Dalmore 18, Glenfarclas 21, Laphroaig Quarter Cask' },
            { course: 'Bar Snacks', dish: 'Smoked almonds, cheese gougères, smoked salmon blinis' },
            { course: 'Late Night', dish: 'Charcuterie board, cornichons, sourdough — served from midnight' },
        ],
    },
};

interface MenuModalProps {
    venueId: string;
    venueName: string;
    onClose: () => void;
}

function MenuModal({ venueId, venueName, onClose }: MenuModalProps) {
    const menu = SAMPLE_MENUS[venueId];
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-vsoe-midnight text-vsoe-cream max-w-lg w-full p-10 md:p-14 max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gold corner accents */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-vsoe-gold/60" />
                <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-vsoe-gold/60" />
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-vsoe-gold/60" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-vsoe-gold/60" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    aria-label="Close menu"
                >
                    <X size={20} />
                </button>

                <p className="text-vsoe-gold text-[10px] uppercase tracking-[0.3em] mb-2">Sample Menu</p>
                <h3 className="text-2xl font-serif mb-8">{venueName}</h3>

                <div className="overflow-y-auto flex-1 space-y-4 pr-1" style={{ scrollbarWidth: 'thin' }}>
                    {menu.courses.map((item, i) => (
                        <div key={i} className="flex gap-6 items-baseline border-b border-white/8 pb-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-vsoe-gold/70 w-28 shrink-0">
                                {item.course}
                            </span>
                            <span className="text-sm text-white/80 font-sans leading-relaxed">
                                {item.dish}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-[10px] text-white/30 uppercase tracking-[0.15em]">
                    Sample menu — dishes vary by season and route
                </p>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// ─── Dress Code Section ───────────────────────────────────────────────────────

function DressCodeSection() {
    return (
        <div className="bg-vsoe-blue/5 border-t border-b border-vsoe-blue/10 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="text-vsoe-gold text-[10px] font-bold tracking-[0.3em] uppercase block mb-6">On Board</span>
                <h2 className="text-3xl md:text-4xl font-serif text-vsoe-blue mb-8">Dress Code</h2>
                <div className="grid md:grid-cols-2 gap-12 text-left mt-12">
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif text-vsoe-blue">Evening</h3>
                        <div className="w-8 h-[1px] bg-vsoe-gold" />
                        <p className="text-vsoe-blue/70 leading-relaxed font-sans">
                            Dinner in the restaurant cars is a formal occasion. Gentlemen are requested to wear black tie — a dinner jacket or tuxedo with black bow tie. Ladies are invited to wear an elegant evening gown or cocktail dress.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif text-vsoe-blue">Daytime</h3>
                        <div className="w-8 h-[1px] bg-vsoe-gold" />
                        <p className="text-vsoe-blue/70 leading-relaxed font-sans">
                            Smart casual attire is welcome throughout the day — in the cabins, observation car, and for lunch service. We ask guests to avoid sportswear, trainers, or beachwear in all public areas of the train.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiningPage() {
    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState<{ id: string; name: string } | null>(null);

    React.useEffect(() => {
        updateInterest('gastronomy', 2);
    }, []);

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue selection:bg-vsoe-gold selection:text-vsoe-blue">

            {/* Hero */}
            <div className="relative h-[70vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/vsoe/vsoe-dining-car.jpg"
                        alt="Dining aboard the Venice Simplon-Orient-Express"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-vsoe-gold text-[10px] font-bold tracking-[0.35em] uppercase block mb-5"
                    >
                        {t.diningPage.gastronomy}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                        className="text-5xl md:text-7xl font-serif"
                    >
                        {t.diningPage.title}
                    </motion.h1>
                </div>
            </div>

            {/* Intro quote */}
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-vsoe-blue/80 italic mb-10">
                    {t.diningPage.quote}
                </p>
                <div className="w-16 h-[1px] bg-vsoe-gold mx-auto" />
            </div>

            {/* Venue cards — alternating layout */}
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
                {dining.map((venue, index) => (
                    <motion.div
                        key={venue.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col lg:flex-row gap-12 xl:gap-20 items-center ${
                            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                        }`}
                    >
                        {/* Image */}
                        <div className="flex-1 w-full relative aspect-[4/3] overflow-hidden shadow-2xl">
                            <Image
                                src={venue.image}
                                alt={venue.name}
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Inset gold frame */}
                            <div className="absolute inset-[10px] border border-vsoe-gold/25 pointer-events-none" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6 lg:max-w-md">
                            <span className="text-vsoe-gold text-[10px] font-bold tracking-[0.3em] uppercase">
                                {venue.badge}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-vsoe-blue leading-tight">
                                {venue.name}
                            </h2>
                            <p className="text-vsoe-blue/70 leading-relaxed font-sans text-[15px]">
                                {venue.description}
                            </p>
                            <p className="text-vsoe-blue/40 text-[12px] uppercase tracking-[0.15em] font-sans border-l-2 border-vsoe-gold/40 pl-4">
                                {venue.detail}
                            </p>
                            <div className="pt-4">
                                <button
                                    onClick={() => setOpenMenu({ id: venue.id, name: venue.name })}
                                    className="text-[11px] uppercase tracking-[0.25em] border-b border-vsoe-blue/30 pb-1 hover:border-vsoe-blue transition-colors font-sans"
                                >
                                    {t.diningPage.viewMenu}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Dress Code */}
            <DressCodeSection />

            {/* Chef Section */}
            <div className="bg-vsoe-midnight text-vsoe-cream py-28">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-vsoe-gold text-[10px] font-bold tracking-[0.3em] uppercase block">The Kitchen</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-vsoe-gold leading-tight">
                            {t.diningPage.chefTitle}
                        </h2>
                        <p className="text-white/70 leading-relaxed font-sans text-[15px]">
                            {t.diningPage.chefDesc}
                        </p>
                        <p className="text-white/40 text-[12px] leading-relaxed font-sans">
                            Every dish is prepared to order in our historic galley cars — no shortcuts, no reheating. The constraints of rail cooking are part of what makes each meal remarkable.
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
                        <Image
                            src="/images/vsoe/vsoe-dining-interior.jpg"
                            alt="The dining car interior"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-[10px] border border-vsoe-gold/25 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Menu Modal */}
            <AnimatePresence>
                {openMenu && (
                    <MenuModal
                        venueId={openMenu.id}
                        venueName={openMenu.name}
                        onClose={() => setOpenMenu(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
