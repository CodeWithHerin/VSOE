'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Marquee() {
    return (
        <div className="bg-vsoe-gold py-4 border-y border-vsoe-blue relative z-20 overflow-hidden">
            <motion.div
                className="flex whitespace-nowrap text-vsoe-blue font-display text-xs font-bold tracking-[0.2em]"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="mx-8 flex items-center gap-8">
                        VENICE SIMPLON-ORIENT-EXPRESS
                        <Star className="w-3 h-3 fill-current" />
                        LONDON • PARIS • VENICE • ISTANBUL
                        <Star className="w-3 h-3 fill-current" />
                        THE ART OF BELMOND
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
