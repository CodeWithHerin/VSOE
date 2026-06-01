'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSection from '@/components/ui/HeroSection';

// ─── Data ────────────────────────────────────────────────────────────────────

type Category = 'all' | 'train' | 'journey' | 'table';

interface GalleryImage {
    src: string;
    alt: string;
    caption: string;
    category: Exclude<Category, 'all'>;
    aspect: 'landscape' | 'portrait';
}

const IMAGES: GalleryImage[] = [
    {
        src: '/images/vsoe/vsoe-exterior-night.jpg',
        alt: 'The train at night',
        caption: 'The Venice Simplon-Orient-Express — a moving landmark of the golden age.',
        category: 'train',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-bar-car.jpg',
        alt: 'Bar Car 3674',
        caption: "Bar Car '3674' — where the night truly begins.",
        category: 'train',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-historic-cabin.jpg',
        alt: 'Historic cabin interior',
        caption: 'A Historic Cabin — original 1920s craftsmanship, lovingly restored.',
        category: 'train',
        aspect: 'portrait'
    },
    {
        src: '/images/vsoe/vsoe-grand-suite.jpg',
        alt: 'Grand Suite',
        caption: 'The Grand Suite — the pinnacle of rail travel.',
        category: 'train',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-london-station.jpg',
        alt: 'Departure from London Victoria',
        caption: 'London Victoria — the blue carpet marks the beginning of the journey.',
        category: 'train',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-paris-departure.jpg',
        alt: 'Paris departure',
        caption: 'Paris — departing into the golden hour.',
        category: 'journey',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-countryside-window.jpg',
        alt: 'Countryside through the window',
        caption: 'Europe drifts past — the unhurried pleasure of slow travel.',
        category: 'journey',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-venice-night.jpg',
        alt: 'Venice at night',
        caption: 'Venice — the floating city, revealed at dawn.',
        category: 'journey',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-istanbul-twilight.jpg',
        alt: 'Istanbul at twilight',
        caption: 'Istanbul — the gateway between worlds, at the end of the grand tour.',
        category: 'journey',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-dining-car.jpg',
        alt: 'The restaurant car',
        caption: 'The restaurant car — a stage for Michelin-level cuisine at 100km/h.',
        category: 'table',
        aspect: 'landscape'
    },
    {
        src: '/images/vsoe/vsoe-champagne-detail.jpg',
        alt: 'Champagne detail',
        caption: 'The details that define the experience.',
        category: 'table',
        aspect: 'portrait'
    },
];

const CATEGORIES: { key: Category; label: string }[] = [
    { key: 'all',     label: 'All'         },
    { key: 'train',   label: 'The Train'   },
    { key: 'journey', label: 'The Journey' },
    { key: 'table',   label: 'The Table'   },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
    images: GalleryImage[];
    index: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
    const image = images[index];

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, onNext, onPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Close"
            >
                <X size={28} />
            </button>

            {/* Prev */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Previous image"
            >
                <ChevronLeft size={36} />
            </button>

            {/* Image */}
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-5xl w-full max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-[60vh] md:h-[70vh]">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                    />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-white/60 font-sans leading-relaxed">
                        {image.caption}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans">
                        {index + 1} / {images.length}
                    </p>
                </div>
            </motion.div>

            {/* Next */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Next image"
            >
                <ChevronRight size={36} />
            </button>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = activeCategory === 'all'
        ? IMAGES
        : IMAGES.filter(img => img.category === activeCategory);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }, [lightboxIndex, filtered.length]);

    const prevImage = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }, [lightboxIndex, filtered.length]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [lightboxIndex]);

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            <HeroSection
                title="The Gallery"
                subtitle="Portraits of the Journey"
                backgroundImage="/images/vsoe/vsoe-exterior-night.jpg"
            />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 md:py-24">

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-16 border-b border-white/10 pb-8">
                    {CATEGORIES.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveCategory(key);
                                setLightboxIndex(null);
                            }}
                            className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 ${
                                activeCategory === key
                                    ? 'bg-vsoe-gold text-vsoe-midnight'
                                    : 'border border-white/20 text-white/50 hover:border-vsoe-gold/50 hover:text-vsoe-gold'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                    <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans self-center">
                        {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
                    </span>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((image, index) => (
                            <motion.div
                                key={image.src}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="break-inside-avoid mb-4 group relative overflow-hidden cursor-pointer"
                                onClick={() => openLightbox(index)}
                            >
                                <div className={`relative w-full overflow-hidden ${
                                    image.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                                }`}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-vsoe-midnight/0 group-hover:bg-vsoe-midnight/40 transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-xs text-white/90 font-sans leading-relaxed line-clamp-2">
                                            {image.caption}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={filtered}
                        index={lightboxIndex}
                        onClose={closeLightbox}
                        onNext={nextImage}
                        onPrev={prevImage}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
