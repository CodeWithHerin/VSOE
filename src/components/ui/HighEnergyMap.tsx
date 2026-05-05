'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/useTranslation';



export default function HighEnergyMap() {
    const { t } = useTranslation();
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const LOCATIONS = [
        {
            id: 'london',
            name: 'London',
            x: 28, y: 38,
            href: '/destinations',
            video: 'https://videos.pexels.com/video-files/3205626/3205626-hd_1920_1080_25fps.mp4', // Westminster / Big Ben
            description: t.map?.londonDesc || 'The Departure'
        },
        {
            id: 'paris',
            name: 'Paris',
            x: 36, y: 50,
            href: '/destinations/paris-venice',
            video: 'https://videos.pexels.com/video-files/2034909/2034909-hd_1920_1080_30fps.mp4', // Eiffel Tower
            description: t.map?.parisDesc || 'City of Light'
        },
        {
            id: 'venice',
            name: 'Venice',
            x: 50, y: 65,
            href: '/destinations/paris-venice',
            video: 'https://videos.pexels.com/video-files/4456997/4456997-hd_1920_1080_25fps.mp4', // Venice Canal
            description: t.map?.veniceDesc || 'The Arrival'
        },
        {
            id: 'istanbul',
            name: 'Istanbul',
            x: 82, y: 75,
            href: '/destinations/paris-istanbul',
            video: 'https://videos.pexels.com/video-files/4204944/4204944-hd_1920_1080_30fps.mp4', // Istanbul
            description: t.map?.istanbulDesc || 'The Gateway'
        }
    ];



    // Removed 3D Tilt Logic per user request ("remove flexing")

    // Smooth physics (kept for potential future parallax if needed, but unused for tilt now)

    // Simplified mouse handler for just tracking active state if needed, or largely static
    const handleMouseLeave = () => {
        setActiveLocation(null);
    };

    return (
        <section className="py-0 md:py-24 bg-vsoe-midnight relative z-10 w-full flex justify-center overflow-hidden">

            {/* Art Deco Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-vsoe-gold via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            {/* Main Map Container - Static, no 3D Tilt */}
            <motion.div
                ref={containerRef}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] bg-[#0a0f1c] shadow-2xl group overflow-hidden select-none"
            >
                {/* --- Art Deco Frame (The "Extra Ordinary" Design) --- */}
                <div className="absolute inset-0 z-50 pointer-events-none border-[12px] border-vsoe-midnight">
                    {/* Inner Gold Border */}
                    <div className="absolute inset-0 border border-vsoe-gold/30 w-full h-full" />
                    <div className="absolute inset-2 border border-vsoe-gold/10 w-[calc(100%-16px)] h-[calc(100%-16px)]" />

                    {/* Ornamental Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-vsoe-gold" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-vsoe-gold" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-vsoe-gold" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-vsoe-gold" />

                    {/* Mid-point Accents */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-vsoe-gold" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-vsoe-gold" />
                </div>
                {/* --- 1. Background Layers --- */}

                {/* Dynamic Video Background Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        {activeLocation && (
                            <motion.div
                                key={activeLocation}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }} // Subtle video
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0"
                            >
                                <video
                                    className="w-full h-full object-cover opacity-50"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src={LOCATIONS.find(l => l.id === activeLocation)?.video}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Minimalist 'Official' Style Background - Dark Navy + Subtle Vector Outline */}
                {/* Replaces the 'Relief Map' which was too scientific/colorful */}
                <div className="absolute inset-0 bg-[#050B14]" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-[center_top_30%] invert filter brightness-200" />

                {/* Tech Grid - Keeping for subtle texture but making it more 'Art Deco' gold */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:translateZ(-50px)]" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 20%, #0a0f1c 90%) pointer-events-none z-10" />
                {/* --- 2. The Path (Neon) --- */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none [transform:translateZ(20px)] opacity-50">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <motion.path
                        d="M 28% 38% C 32% 44%, 34% 48%, 36% 50% S 44% 60%, 50% 65% S 66% 72%, 82% 75%"
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth="1" // Thinner, more elegant
                        strokeOpacity="0.8"
                        // filter="url(#glow)" // Removed for performance
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    {/* Traveling Dot (Gold) */}
                    <motion.circle r="3" fill="#C5A059">
                        <animateMotion
                            dur="8s"
                            repeatCount="indefinite"
                            path="M 28% 38% C 32% 44%, 34% 48%, 36% 50% S 44% 60%, 50% 65% S 66% 72%, 82% 75%"
                        />
                    </motion.circle>
                </svg>
                {/* --- 3. Interactive Nodes --- */}
                {LOCATIONS.map((loc) => (
                    <Link
                        href={loc.href}
                        key={loc.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-[60] group/node" // Boost z-index above overlay (z-40)
                        style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translateZ(50px)' }}
                    >
                        {/* Hit Area & Diamond Marker */}
                        <div
                            className="w-16 h-16 flex items-center justify-center cursor-pointer relative"
                            onMouseEnter={() => setActiveLocation(loc.id)}
                        >
                            {/* Outer Ring */}
                            <motion.div
                                className={`absolute inset-0 rounded-full border border-vsoe-gold/20 transition-all duration-500
                                    ${activeLocation === loc.id ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                            />

                            {/* Diamond Node */}
                            <motion.div
                                className={`w-3 h-3 rotate-45 transition-all duration-500 shadow-lg
                                    ${activeLocation === loc.id
                                        ? 'bg-vsoe-gold scale-125 shadow-[0_0_15px_#C5A059]'
                                        : 'bg-vsoe-midnight border-2 border-vsoe-gold group-hover/node:bg-vsoe-gold'}`}
                            />

                            {/* City Label (Added per user request for clarity) */}
                            <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 text-white font-serif tracking-widest text-xs uppercase
                                transition-all duration-500 whitespace-nowrap
                                ${activeLocation === loc.id ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-[-5px] group-hover/node:opacity-100'}`}>
                                {loc.name}
                            </div>
                        </div>
                    </Link>
                ))}
                {/* --- 4. Elegant Overlay (Art Deco Style) --- */}
                <div className="absolute inset-0 z-40 pointer-events-none p-8 md:p-16 flex flex-col justify-between">

                    {/* Top: Compass / Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="text-xs font-serif text-vsoe-gold tracking-[0.2em] uppercase mb-1">
                                {t.map?.grandTour || 'European Grand Tour'}
                            </span>
                            <div className="h-[1px] w-12 bg-vsoe-gold/50" />
                        </div>
                        {/* Compass Rose Decoration */}
                        <div className="opacity-50">
                            <span className="text-xl font-serif text-vsoe-gold/30">N</span>
                        </div>
                    </div>

                    {/* Center: Dynamic Title */}
                    <div className="absolute bottom-12 left-12 w-full max-w-lg text-left pointer-events-none z-50">
                        <AnimatePresence mode="wait">
                            {activeLocation ? (
                                <motion.div
                                    key="loc-title"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-6xl md:text-8xl font-serif text-white drop-shadow-lg leading-none">
                                        {LOCATIONS.find(l => l.id === activeLocation)?.name.toUpperCase()}
                                    </h2>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100px" }}
                                        className="h-[2px] bg-vsoe-gold my-4"
                                    />
                                    <p className="text-vsoe-gold text-sm md:text-lg font-sans tracking-[0.3em] uppercase drop-shadow-md">
                                        {LOCATIONS.find(l => l.id === activeLocation)?.description}
                                    </p>

                                    <div className="mt-8 pointer-events-auto">
                                        <span className="inline-block border border-vsoe-gold/50 px-6 py-2 text-xs uppercase tracking-widest text-white hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors cursor-pointer backdrop-blur-md">
                                            {t.map?.discover || 'Discover Journey'}
                                        </span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default-title"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-4xl md:text-6xl font-serif text-white/20 leading-none tracking-[0.1em]">
                                        {t.map?.selectRoute || 'SELECT A ROUTE'}
                                    </h2>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom: Coordinates / instruction */}
                    <div className="flex justify-between items-end">
                        <p className="text-[10px] text-vsoe-gold/60 font-sans tracking-widest uppercase">
                            {t.map?.network || 'Venice Simplon-Orient-Express Network'}
                        </p>
                        <p className="text-[10px] text-white/30 font-serif italic">
                            Est. 1982
                        </p>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
