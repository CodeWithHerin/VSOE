'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import { MapPin, Gauge, Mountain, ArrowRight } from 'lucide-react';
import RainShader from '@/components/effects/RainShader';
import { useAudio } from '@/components/audio/AudioContext';
import { useEffect } from 'react';

const STOPS = [
    {
        id: 'London',
        title: 'London',
        subtitle: 'The Departure',
        description: 'Victoria Station. Steam fills the air. The adventure begins.',
        image: '/images/vsoe/vsoe-london-station.jpg',
        weather: 'rain',
        stats: { speed: 0, distance: 0, elevation: 15 },
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3' // Rain
    },
    {
        id: 'Paris',
        title: 'Paris',
        subtitle: 'City of Light',
        description: 'Twilight over the Seine. A gourmet dinner awaits.',
        image: '/images/vsoe/vsoe-paris-departure.jpg',
        weather: 'clear',
        stats: { speed: 110, distance: 450, elevation: 35 },
        audio: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3' // City ambience
    },
    {
        id: 'Alps',
        title: 'The Alps',
        subtitle: 'The Ascent',
        description: 'Snow-capped peaks glisten in the morning sun.',
        image: '/images/vsoe/vsoe-countryside-window.jpg',
        weather: 'snow',
        stats: { speed: 85, distance: 920, elevation: 1200 },
        audio: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_17937c56b7.mp3' // Wind
    },
    {
        id: 'Venice',
        title: 'Venice',
        subtitle: 'The Arrival',
        description: 'La Serenissima. The floating city welcomes you.',
        image: '/images/vsoe/vsoe-venice-night.jpg',
        weather: 'sunset',
        stats: { speed: 60, distance: 1400, elevation: 0 },
        audio: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_6583f36368.mp3' // Water
    }
];

// Hyperspace Particle Component
const SpeedLines = ({ intensity }: { intensity: number }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] bg-white/80 origin-center"
                        style={{
                            height: '50vh',
                            rotate: `${i * 30}deg`,
                            scaleY: intensity,
                            opacity: intensity * 0.8,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// HUD Component
interface StopStats {
    speed: number;
    distance: number;
    elevation: number;
}

const TravelHUD = ({ active, fromStats, toStats, progress }: { active: boolean, fromStats: StopStats, toStats: StopStats, progress: number }) => {
    if (!active) return null;

    // Interpolate stats
    const currentSpeed = Math.round(fromStats.speed + ((toStats.speed - fromStats.speed) * (progress / 100)));
    const currentDist = Math.round(fromStats.distance + ((toStats.distance - fromStats.distance) * (progress / 100)));
    const currentElev = Math.round(fromStats.elevation + ((toStats.elevation - fromStats.elevation) * (progress / 100)));

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex gap-12 text-vsoe-gold font-mono">
            <div className="flex flex-col items-center">
                <Gauge size={32} className="mb-2 animate-pulse" />
                <span className="text-4xl font-bold">{currentSpeed}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">km/h</span>
            </div>
            <div className="flex flex-col items-center">
                <ArrowRight size={32} className="mb-2 animate-pulse" />
                <span className="text-4xl font-bold">{currentDist}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">km</span>
            </div>
            <div className="flex flex-col items-center">
                <Mountain size={32} className="mb-2 animate-pulse" />
                <span className="text-4xl font-bold">{currentElev}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">m alt</span>
            </div>
        </div>
    );
};

export default function LivingWindowSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTraveling, setIsTraveling] = useState(false);
    const setGlobalIsTraveling = useBookingStore((state) => state.setIsTraveling);
    const { playTrack } = useAudio();

    const activeStop = STOPS[currentIndex];
    const nextStop = STOPS[Math.min(currentIndex + 1, STOPS.length - 1)];

    // Animation Values
    const shakeX = useMotionValue(0);
    const shakeY = useMotionValue(0);
    const scale = useSpring(1, { stiffness: 100, damping: 20 });

    useEffect(() => {
        if (activeStop.audio) {
            playTrack(activeStop.audio);
        }
    }, [activeStop, playTrack]);

    // Travel Logic
    const startJourney = () => {
        if (currentIndex >= STOPS.length - 1) return;

        setIsTraveling(true);
        setGlobalIsTraveling(true);

        // Trigger effects immediately
        shakeX.set((Math.random() - 0.5) * 5);
        shakeY.set((Math.random() - 0.5) * 5);
        scale.set(1.2);

        // Short travel duration for "Instant" feel
        setTimeout(() => {
            completeTravel();
        }, 1500);
    };

    const completeTravel = () => {
        // Flash Effect & Transition
        setCurrentIndex(prev => prev + 1);
        setIsTraveling(false);
        setGlobalIsTraveling(false);
        shakeX.set(0);
        shakeY.set(0);
        scale.set(1);
    };

    return (
        <section className="relative h-screen bg-vsoe-midnight overflow-hidden flex items-center justify-center">

            {/* 1. The View Outside (Scenery) */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ x: shakeX, y: shakeY, scale }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeStop.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: isTraveling ? 'blur(10px) brightness(1.5)' : 'blur(0px) brightness(1)'
                        }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-full h-full"
                    >
                        <img
                            src={activeStop.image}
                            alt={activeStop.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Weather Effects */}
            {activeStop.weather === 'rain' && <RainShader />}

            {/* Hyperspace Effect */}
            {isTraveling && <SpeedLines intensity={1} />}

            {/* HUD Overlay */}
            <TravelHUD
                active={isTraveling}
                fromStats={activeStop.stats}
                toStats={nextStop.stats}
                progress={isTraveling ? 100 : 0}
            />

            {/* 2. The Window Frame (Art Deco Overlay) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1920 1080">
                    <defs>
                        <pattern id="wood-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                            <rect width="100" height="100" fill="#2a1b0e" />
                        </pattern>
                    </defs>
                    <path d="M0 0 H1920 V150 H0 Z" fill="#1a1a1a" />
                    <path d="M0 930 H1920 V1080 H0 Z" fill="#1a1a1a" />
                    <path d="M0 0 H150 V1080 H0 Z" fill="#1a1a1a" />
                    <path d="M1770 0 H1920 V1080 H1770 Z" fill="#1a1a1a" />
                    <rect x="140" y="140" width="1640" height="10" fill="#C5A059" />
                    <rect x="140" y="930" width="1640" height="10" fill="#C5A059" />
                    <rect x="140" y="140" width="10" height="800" fill="#C5A059" />
                    <rect x="1770" y="140" width="10" height="800" fill="#C5A059" />
                </svg>
            </div>

            {/* 3. Interior UI (Controls & Info) */}
            <div className="absolute z-20 bottom-0 w-full h-[150px] bg-gradient-to-t from-black/90 to-transparent flex items-end pb-12 px-12 md:px-24 justify-between pointer-events-auto">

                {/* Left: Current Location Info */}
                <div className="text-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStop.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 text-vsoe-gold mb-2">
                                <MapPin size={16} />
                                <span className="text-xs uppercase tracking-[0.3em] font-bold">Current Location</span>
                            </div>
                            <h2 className="text-5xl font-serif mb-2">{activeStop.title}</h2>
                            <p className="text-white/60 font-sans max-w-md">{activeStop.description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right: Depart Button */}
                <div className="flex items-center gap-6">
                    {currentIndex < STOPS.length - 1 ? (
                        <button
                            onClick={startJourney}
                            disabled={isTraveling}
                            className="group relative px-8 py-4 bg-vsoe-gold text-vsoe-midnight font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <span className="relative z-10">{isTraveling ? 'Departing...' : 'Depart'}</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    ) : (
                        <button className="bg-white text-vsoe-midnight px-8 py-4 rounded-sm cursor-default">
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Journey Complete</span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
