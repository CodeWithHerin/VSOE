'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface ShoppableCardProps {
    title: string;
    price: string;
    image: string;
    link: string;
}

export default function ShoppableCard({ title, price, image, link }: ShoppableCardProps) {
    const { t } = useTranslation();
    
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-4 shadow-2xl border border-vsoe-gold/20 max-w-xs ml-auto my-8 md:-mr-12 relative z-10 rounded-sm"
        >
            <div className="absolute -top-3 -left-3 bg-vsoe-midnight text-vsoe-gold px-3 py-1 text-[10px] uppercase tracking-widest font-bold shadow-lg">
                {t.common.curated}
            </div>

            <div className="relative aspect-video overflow-hidden mb-4 rounded-sm">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>

            <h4 className="font-serif text-lg text-vsoe-midnight mb-1">{title}</h4>
            <div className="flex items-center gap-1 text-vsoe-gold text-xs mb-3">
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
            </div>

            <div className="flex items-end justify-between border-t border-vsoe-midnight/10 pt-3">
                <div>
                    <span className="block text-[10px] uppercase tracking-widest text-vsoe-midnight/40">{t.common.from}</span>
                    <span className="font-serif text-vsoe-midnight">{price}</span>
                </div>
                <Link
                    href={link}
                    className="bg-vsoe-gold text-vsoe-midnight px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-vsoe-midnight hover:text-vsoe-gold transition-colors flex items-center gap-2"
                >
                    {t.common.reserve} <ArrowRight size={10} />
                </Link>
            </div>
        </motion.div>
    );
}
