'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { X, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface BookTheSceneProps {
    triggerId?: string;
    title?: string;
    price?: string;
    image?: string;
}

export default function BookTheScene({
    triggerId = "hero",
    title = "Venice to Paris",
    price = "€4,500",
    image = "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
}: BookTheSceneProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasClosed, setHasClosed] = useState(false);
    const { t } = useTranslation();

    React.useEffect(() => {
        const handleScroll = () => {
            if (hasClosed) return;
            const trigger = document.getElementById(triggerId);
            if (!trigger) return;

            const rect = trigger.getBoundingClientRect();
            // Show when trigger element is scrolled out of view
            if (rect.bottom < 0 && !isVisible) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggerId, isVisible, hasClosed]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed bottom-32 right-6 z-40 bg-white p-4 rounded-sm shadow-2xl max-w-xs border border-vsoe-gold/20"
                >
                    <button
                        onClick={() => { setIsVisible(false); setHasClosed(true); }}
                        className="absolute -top-2 -left-2 bg-vsoe-midnight text-white rounded-full p-1 hover:bg-vsoe-gold transition-colors"
                    >
                        <X size={12} />
                    </button>

                    <div className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-sm">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-vsoe-gold font-bold block mb-1">{t.bookTheScene.title}</span>
                            <h4 className="font-serif text-vsoe-midnight text-lg leading-none mb-1">{title}</h4>
                            <span className="text-xs text-vsoe-midnight/60">{price} {t.bookTheScene.perPerson}</span>
                        </div>
                    </div>

                    <Link
                        href="/book"
                        className="mt-4 flex items-center justify-between w-full bg-vsoe-midnight text-white px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors"
                    >
                        <span>{t.bookTheScene.reserve}</span>
                        <ArrowRight size={12} />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
