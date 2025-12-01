'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
    id?: string;
    title?: React.ReactNode;
    subtitle?: string;
    backgroundImage?: string;
    videoSrc?: string;
    alignment?: 'center' | 'left' | 'right';
    children?: React.ReactNode;
    className?: string;
}

export default function HeroSection({
    id,
    backgroundImage,
    videoSrc,
    className
}: HeroSectionProps) {
    const [videoError, setVideoError] = React.useState(false);

    return (
        <section
            id={id}
            className={cn(
                "relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden",
                className
            )}
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {videoSrc && !videoError ? (
                    <div className="w-full h-full">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 filter contrast-125 saturate-50"
                            onError={() => setVideoError(true)}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    </div>
                ) : (
                    <motion.div
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full"
                    >
                        <img
                            src={backgroundImage || "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2784&auto=format&fit=crop"}
                            alt="Hero Background"
                            className="w-full h-full object-cover opacity-60 filter contrast-125 saturate-50"
                        />
                    </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/20 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
                {/* Vertical Line */}
                <motion.div
                    className="w-[1px] h-20 bg-vsoe-gold mx-auto mb-8 shadow-[0_0_15px_#c5a059]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: "circOut", delay: 4 }} // Delay for preloader
                    style={{ originY: 0 }}
                />

                {/* Split Text Title */}
                <div className="overflow-hidden mb-2">
                    <motion.h1
                        className="text-[12vw] leading-[0.85] text-vsoe-cream mix-blend-overlay font-serif"
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 4.5 }}
                    >
                        LEGENDARY
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        className="text-[12vw] leading-[0.85] text-vsoe-gold italic font-serif"
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 5.2 }}
                    >
                        JOURNEYS
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    className="mt-8 text-vsoe-cream/80 text-xs md:text-sm tracking-[0.3em] uppercase font-sans"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 6 }}
                >
                    Est. 1982 • The Golden Age of Travel
                </motion.p>
            </div>

            {/* Explore Button */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 interactive-area group cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 7 }}
            >
                <span className="text-[10px] tracking-[0.3em] text-vsoe-cream/70 uppercase group-hover:text-vsoe-gold transition-colors font-sans">Explore</span>
                <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-vsoe-gold"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
