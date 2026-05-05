'use client';

import { Wine, Utensils } from 'lucide-react';
import { useTrackInterest } from '@/lib/profiling';
import ParallaxImage from '@/components/ui/ParallaxImage';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function DiningSection() {
    const { t } = useTranslation();
    useTrackInterest('gastronomy');
    // Using a more consistent and high quality image for the dining section
    const diningImage = "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop";

    return (
        <section id="dining" className="relative w-full min-h-screen py-20 md:py-32 bg-vsoe-blue flex items-center">
            <div id="track-gastronomy" className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                {/* Image Content (Left on Desktop) */}
                <div className="order-2 md:order-1 relative group interactive-area overflow-hidden rounded-sm">
                    <div className="aspect-[4/5] relative z-10 border border-vsoe-gold/30 p-2">
                        <ParallaxImage
                            src={diningImage}
                            alt="Fine dining on the Orient Express"
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="order-1 md:order-2">
                    <TextReveal>
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6 font-sans">
                            {t.dining.gastronomy}
                        </span>
                    </TextReveal>

                    <TextReveal delay={0.1}>
                        <h2 className="text-5xl md:text-7xl text-vsoe-cream mb-8 leading-[1.1] font-serif">
                            {t.dining.haute}
                        </h2>
                    </TextReveal>

                    <TextReveal delay={0.2}>
                        <p className="text-vsoe-cream/70 text-lg font-light leading-relaxed mb-10 max-w-md font-sans">
                            {t.dining.desc}
                        </p>
                    </TextReveal>

                    <div className="flex gap-4 mb-8">
                        <TextReveal delay={0.3}>
                            <span className="flex items-center gap-2 text-vsoe-gold text-xs tracking-[0.2em] uppercase font-sans">
                                <Wine className="w-4 h-4" /> {t.dining.sommelier}
                            </span>
                        </TextReveal>
                        <TextReveal delay={0.4}>
                            <span className="flex items-center gap-2 text-vsoe-gold text-xs tracking-[0.2em] uppercase font-sans">
                                <Utensils className="w-4 h-4" /> {t.dining.michelin}
                            </span>
                        </TextReveal>
                    </div>


                    {/* ... inside component */}
                    <TextReveal delay={0.5}>
                        <MagneticButton className="px-8 py-4 border border-vsoe-cream/30 text-vsoe-cream text-xs tracking-[0.2em] uppercase hover:bg-vsoe-cream hover:text-vsoe-blue transition-all interactive-area font-sans">
                            {t.dining.view}
                        </MagneticButton>
                    </TextReveal>
                </div>
            </div>
        </section>
    );
}
