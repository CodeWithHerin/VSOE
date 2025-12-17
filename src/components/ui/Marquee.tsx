'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Marquee() {
    return (
        <div className="bg-vsoe-midnight py-12 border-y border-vsoe-gold/20 relative z-20 overflow-hidden">
            {/* Track/Rails */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 w-full h-4 border-y border-dashed border-white/5 -translate-y-1/2" />

            <motion.div
                className="relative inline-flex items-center"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
                {/* Train Carriage */}
                <div className="relative h-16 bg-[#1a253a] border-y-2 border-vsoe-gold/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center px-12 min-w-max mx-4 overflow-hidden">
                    {/* Metal Texture/Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                    {/* Windows (Solid now) */}
                    <div className="absolute inset-0 flex justify-between px-4 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-12 h-8 bg-[#050a10] border border-vsoe-gold/20 rounded-sm mt-4 shadow-inner" />
                        ))}
                    </div>

                    {/* Content Layer (On top of windows) */}
                    <div className="relative z-10 flex items-center gap-12 text-vsoe-gold font-display text-xs font-bold tracking-[0.25em] uppercase bg-[#1a253a]/90 py-1 px-4 rounded-full border border-vsoe-gold/10 backdrop-blur-sm shadow-sm">
                        <span>Venice Simplon-Orient-Express</span>
                        <Star className="w-3 h-3 fill-current animate-pulse" />
                        <span>London • Paris • Venice • Istanbul</span>
                        <Star className="w-3 h-3 fill-current animate-pulse" />
                        <span>The Art of Belmond</span>
                    </div>

                    {/* Wheels (Visual only) */}
                    <div className="absolute -bottom-2 left-8 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full animate-spin-slow z-20" />
                    <div className="absolute -bottom-2 left-16 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full animate-spin-slow z-20" />
                    <div className="absolute -bottom-2 right-16 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full animate-spin-slow z-20" />
                    <div className="absolute -bottom-2 right-8 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full animate-spin-slow z-20" />
                </div>
            </motion.div>
        </div>
    );
}

