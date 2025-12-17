'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const LOCATIONS = [
    {
        id: 'london',
        name: 'London',
        x: 20, y: 30,
        href: '/destinations',
        video: 'https://cdn.coverr.co/videos/coverr-london-eye-time-lapse-4622/1080p.mp4',
        description: 'The Departure'
    },
    {
        id: 'paris',
        name: 'Paris',
        x: 35, y: 45,
        href: '/destinations/paris-venice',
        video: 'https://cdn.coverr.co/videos/coverr-eiffel-tower-at-night-4623/1080p.mp4',
        description: 'City of Light'
    },
    {
        id: 'venice',
        name: 'Venice',
        x: 55, y: 65,
        href: '/destinations/paris-venice',
        video: 'https://cdn.coverr.co/videos/coverr-venice-canals-4624/1080p.mp4',
        description: 'The Arrival'
    },
    {
        id: 'istanbul',
        name: 'Istanbul',
        x: 85, y: 70,
        href: '/destinations/paris-istanbul',
        video: 'https://cdn.coverr.co/videos/coverr-istanbul-bosphorus-4625/1080p.mp4',
        description: 'The Gateway'
    }
];

export default function HighEnergyMap() {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]); // Reduced tilt for better usability
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    // Smooth physics
    const springConfig = { damping: 25, stiffness: 120 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setActiveLocation(null);
    };

    return (
        <section className="py-0 md:py-12 bg-vsoe-midnight perspective-1000 overflow-hidden relative z-10 w-full flex justify-center">
            {/* Main Map Container */}
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-full max-w-[90vw] aspect-[16/10] md:aspect-[21/9] bg-[#0a0f1c] rounded-sm border border-vsoe-gold/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] group overflow-hidden cursor-crosshair"
            >
                {/* --- 1. Background Layers --- */}
                {/* Vintage Map Texture */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-[center_top_30%] grayscale mix-blend-overlay [transform:translateZ(-60px)]" />
                {/* Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [transform:translateZ(-50px)]" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, #0a0f1c 100%) pointer-events-none z-10" />


                {/* --- 2. The Path (Neon) --- */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none [transform:translateZ(20px)] opacity-50">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <motion.path
                        d="M 20% 30% C 25% 35%, 30% 40%, 35% 45% S 45% 55%, 55% 65% S 70% 68%, 85% 70%"
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    {/* Traveling Dot */}
                    <motion.circle r="2" fill="#fff" filter="url(#glow)">
                        <animateMotion
                            dur="6s"
                            repeatCount="indefinite"
                            path="M 20% 30% C 25% 35%, 30% 40%, 35% 45% S 45% 55%, 55% 65% S 70% 68%, 85% 70%"
                        />
                    </motion.circle>
                </svg>


                {/* --- 3. Interactive Nodes --- */}
                {LOCATIONS.map((loc) => (
                    <Link
                        href={loc.href}
                        key={loc.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/node"
                        style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translateZ(50px)' }}
                    >
                        {/* Hit Area */}
                        <div
                            className="w-12 h-12 flex items-center justify-center"
                            onMouseEnter={() => setActiveLocation(loc.id)}
                        >
                            <motion.div
                                className={`w-3 h-3 rotate-45 border transition-all duration-500
                                    ${activeLocation === loc.id
                                        ? 'bg-vsoe-gold border-vsoe-gold scale-150 shadow-[0_0_20px_#C5A059]'
                                        : 'bg-[#0a0f1c] border-vsoe-gold/50 group-hover/node:border-vsoe-gold'}`}
                            />
                        </div>
                    </Link>
                ))}


                {/* --- 4. Cinematic HUD Overlay (The "Better" Design) --- */}
                <div className="absolute inset-0 z-40 pointer-events-none p-6 md:p-12 flex flex-col justify-between">

                    {/* Top Bar: Title / Status */}
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] md:text-xs text-vsoe-gold/60 font-mono uppercase tracking-[0.2em] block mb-1">
                                System Status: Active
                            </span>
                            <span className="text-[10px] md:text-xs text-vsoe-gold/40 font-mono uppercase tracking-[0.2em]">
                                VSOE-NETWORK
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] md:text-xs text-vsoe-gold/60 font-mono uppercase tracking-[0.2em]">
                                    Live Navigation
                                </span>
                            </div>
                            <span className="text-[10px] text-vsoe-gold/30 font-mono">
                                48° 51' N / 2° 21' E
                            </span>
                        </div>
                    </div>

                    {/* Center: Dynamic Title */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <AnimatePresence mode="wait">
                            {activeLocation ? (
                                <motion.div
                                    key="loc-title"
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h2 className="text-[12vw] md:text-[8vw] font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent leading-none">
                                        {LOCATIONS.find(l => l.id === activeLocation)?.name.toUpperCase()}
                                    </h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-vsoe-gold text-sm md:text-xl font-sans tracking-[0.4em] uppercase mt-4"
                                    >
                                        {LOCATIONS.find(l => l.id === activeLocation)?.description}
                                    </motion.p>
                                    <div className="mt-8">
                                        <span className="inline-block border border-vsoe-gold/30 px-4 py-2 text-[10px] uppercase tracking-widest text-vsoe-gold/80 bg-black/50 backdrop-blur-sm">
                                            Click to Explore Route
                                        </span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default-title"
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-[6vw] font-serif text-white/10 leading-none tracking-widest blur-[2px]">
                                        THE GRAND TOUR
                                    </h2>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Bar: Instructions */}
                    <div className="flex justify-between items-end">
                        <div className="max-w-xs hidden md:block">
                            <p className="text-[10px] text-vsoe-cream/40 leading-relaxed font-mono">
                                EXPLORE THE RAIL NETWORK. <br />
                                HOVER OVER NODES TO IDENTIFY STOPS. <br />
                                SELECT A DESTINATION TO PROCEED.
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="w-24 h-[1px] bg-vsoe-gold/20 ml-auto mb-2" />
                            <span className="text-[10px] text-vsoe-gold/40 font-mono tracking-widest">
                                FIG. 24-B
                            </span>
                        </div>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}

