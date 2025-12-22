'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SuiteData {
    id: string;
    city: string;
    description: string;
    video: string; // Placeholder URL
    features: string[];
}

const suites: SuiteData[] = [
    {
        id: 'paris',
        city: 'Paris',
        description: 'Light and sophisticated, reflecting the city’s haute couture and gastronomic excellence.',
        video: 'https://videos.coverr.co/mp4/Coverr-paris-street-at-night-1563283259461.mp4', // Placeholder: Paris Night
        features: ['Private en-suite bathroom', '24-hour butler service', 'Free-flowing champagne']
    },
    {
        id: 'venice',
        city: 'Venice',
        description: 'Grandeur and romance, adorned with Venetian silk, woven fabrics and glass lamps.',
        video: 'https://videos.pexels.com/video-files/5838025/5838025-hd_1920_1080_30fps.mp4', // Placeholder: Venice Canal
        features: ['Murano glass details', 'Hand-crafted marquetry', 'Living area']
    },
    {
        id: 'istanbul',
        city: 'Istanbul',
        description: 'Exotic and opulent, inspired by the Grand Bazaar and Ottoman architecture.',
        video: 'https://videos.pexels.com/video-files/4204944/4204944-hd_1920_1080_30fps.mp4', // Placeholder: Mosaic/Pattern vibe
        features: ['Hand-carved timber', 'Embroidered pillows', 'Mosaic en-suite']
    }
];

export default function GrandSuitesExperience() {
    const [activeSuite, setActiveSuite] = useState<SuiteData>(suites[0]);
    const [prevSuite, setPrevSuite] = useState<SuiteData | null>(null);

    const handleSuiteChange = (suite: SuiteData) => {
        if (suite.id === activeSuite.id) return;
        setPrevSuite(activeSuite);
        setActiveSuite(suite);
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-vsoe-midnight text-vsoe-cream">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode='popLayout'>
                    <motion.div
                        key={activeSuite.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <video
                            className="h-full w-full object-cover opacity-60"
                            autoPlay
                            loop
                            muted
                            playsInline
                            key={activeSuite.video} // remount video element to force autoplay new source
                        >
                            <source src={activeSuite.video} type="video/mp4" />
                        </video>
                        {/* Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-transparent to-vsoe-midnight/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-vsoe-midnight via-transparent to-vsoe-midnight/50" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content Content - Split Layout */}
            <div className="relative z-10 flex h-full flex-col md:flex-row">

                {/* Left: Navigation / Selector */}
                <div className="flex h-1/3 w-full flex-col justify-center border-b border-vsoe-gold/20 px-8 backdrop-blur-sm md:h-full md:w-1/3 md:border-b-0 md:border-r">
                    <div className="mb-8">
                        <h2 className="font-serif text-3xl font-light text-vsoe-gold md:text-5xl">
                            The Grand Suites
                        </h2>
                        <p className="mt-4 font-sans text-xs tracking-[0.2em] uppercase text-white/60">
                            A World of Their Own
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {suites.map((suite) => (
                            <button
                                key={suite.id}
                                onClick={() => handleSuiteChange(suite)}
                                className={`group flex items-center justify-between border-b border-white/10 py-4 text-left transition-all hover:bg-white/5 ${activeSuite.id === suite.id ? 'pl-4 border-vsoe-gold/50' : 'pl-0'
                                    }`}
                            >
                                <span className={`font-serif text-xl transition-colors ${activeSuite.id === suite.id ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                                    }`}>
                                    {suite.city}
                                </span>
                                {activeSuite.id === suite.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="h-1 w-1 rounded-full bg-vsoe-gold"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="flex h-2/3 w-full flex-col justify-end p-8 md:h-full md:w-2/3 md:justify-center md:p-24">
                    <motion.div
                        key={activeSuite.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="mb-6 font-serif text-6xl text-white md:text-8xl">
                            {activeSuite.city}
                        </h3>
                        <p className="mb-8 max-w-xl font-sans text-lg font-light leading-relaxed text-vsoe-cream/90">
                            {activeSuite.description}
                        </p>

                        <div className="flex gap-8">
                            {activeSuite.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="h-[1px] w-4 bg-vsoe-gold" />
                                    <span className="font-sans text-xs uppercase tracking-widest text-vsoe-gold">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
