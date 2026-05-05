'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function Marquee() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const trainRef = useRef<HTMLDivElement>(null);

    // Physics state
    const x = useMotionValue(0);

    // Refs for animation loop
    const isHovering = useRef(false);
    const lastX = useRef(0);

    // Animation Loop
    useAnimationFrame((t, delta) => {
        // Infinite Wrap Logic
        if (containerRef.current && trainRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const trainWidth = trainRef.current.offsetWidth;

            // Wrap Check
            if (x.get() > containerWidth) x.set(-trainWidth);
            if (x.get() < -trainWidth) x.set(containerWidth);
        }

        if (!isHovering.current) {
            // Default "Little Slow" Movement (Leftwards) -> Increased speed "a lot" per user
            // Delta scaling ensures frame-rate independence
            const moveBy = -2.0 * (delta / 16);
            x.set(x.get() + moveBy);
        } else {
            // When hovering, we pause default movement.
            // Movement is strictly controlled by mouse delta (see handleMouseMove)
            // So we do nothing here! 
            // "hover on train and pause movement of cursor then train must stop" -> This is effectively implied.
            // If no mouse event fires, x doesn't change.
        }
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isHovering.current) return;

        // "hover left then it moves left"
        // e.movementX: Negative = Left, Positive = Right.
        // Direct 1:1 control might be too slow/fast. Let's add a multiplier.
        const sensitivity = 2.5;
        x.set(x.get() + e.movementX * sensitivity);
    };

    return (
        <div
            ref={containerRef}
            className="bg-vsoe-midnight py-12 border-y border-vsoe-gold/20 relative z-20 overflow-hidden min-h-[160px] flex items-center transform-gpu"
        >
            {/* Track/Rails */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30 -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 w-full h-4 border-y border-dashed border-white/25 -translate-y-1/2" />

            <motion.div
                ref={trainRef}
                style={{ x }}
                className="relative inline-flex items-center will-change-transform cursor-ew-resize group"
                onMouseEnter={() => isHovering.current = true}
                onMouseLeave={() => isHovering.current = false}
                onMouseMove={handleMouseMove}
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
                    <div className="relative z-10 flex items-center gap-12 text-vsoe-gold font-display text-xs font-bold tracking-[0.25em] uppercase bg-[#1a253a]/90 py-1 px-4 rounded-full border border-vsoe-gold/10 backdrop-blur-sm shadow-sm select-none">
                        <span>{t.marquee.vsoe}</span>
                        <Star className="w-3 h-3 fill-current animate-pulse" />
                        <span>{t.marquee.cities}</span>
                        <Star className="w-3 h-3 fill-current animate-pulse" />
                        <span>{t.marquee.art}</span>
                    </div>

                    {/* Wheels (Visual only) */}
                    <motion.div
                        style={{ rotate: useTransform(x, (latest) => latest * 2) }}
                        className="absolute -bottom-2 left-8 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full z-20"
                    />
                    <motion.div
                        style={{ rotate: useTransform(x, (latest) => latest * 2) }}
                        className="absolute -bottom-2 left-16 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full z-20"
                    />
                    <motion.div
                        style={{ rotate: useTransform(x, (latest) => latest * 2) }}
                        className="absolute -bottom-2 right-16 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full z-20"
                    />
                    <motion.div
                        style={{ rotate: useTransform(x, (latest) => latest * 2) }}
                        className="absolute -bottom-2 right-8 w-5 h-5 bg-[#0a0a0a] border-2 border-[#333] rounded-full z-20"
                    />
                </div>
            </motion.div>
        </div>
    );
}

