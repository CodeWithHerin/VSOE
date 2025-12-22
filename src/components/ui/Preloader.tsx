'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

export default function Preloader() {
    const isHeroVideoLoaded = useUIStore((state) => state.isHeroVideoLoaded);
    const isPreloaderComplete = useUIStore((state) => state.isPreloaderComplete);
    const setPreloaderComplete = useUIStore((state) => state.setPreloaderComplete);
    
    // If preloader is already complete (from persistence), start with exit state
    const [shouldExit, setShouldExit] = useState(isPreloaderComplete);
    
    // Correction: If persisted state is true, we should never show it, so we can return null to avoid flash
    // However, to allow "exit" animation if it was JUST completed, we handle it carefully.
    // For simple persistence "don't show again":
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (shouldExit && !isPreloaderComplete) {
             setPreloaderComplete(true);
        }
    }, [shouldExit, isPreloaderComplete, setPreloaderComplete]);

    useEffect(() => {
        // If critical asset (video) is ready, we exit.
        // We keep a small safety timeout (e.g. 500ms) to ensure it doesn't flash too fast if cached.
        if (isHeroVideoLoaded && !isPreloaderComplete) {
            const timer = setTimeout(() => {
                setShouldExit(true);
            }, 2500); // Aesthetic minimum
            return () => clearTimeout(timer);
        }

        // Fallback: If video takes too long (>4s), force exit.
        if (!isPreloaderComplete) {
             const safetyTimer = setTimeout(() => {
                setShouldExit(true);
            }, 6000);
            return () => clearTimeout(safetyTimer);
        }
       
    }, [isHeroVideoLoaded, isPreloaderComplete]);

    // If not mounted yet, or if preloader is already complete from start, don't render anything
    if (!isMounted || isPreloaderComplete) return null;

    return (
        <AnimatePresence mode="wait">
            {!shouldExit && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-vsoe-midnight"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                >
                    {/* Split Curtain Effect */}
                    <motion.div
                        className="absolute inset-0 bg-vsoe-midnight z-10"
                        initial={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        style={{ originY: 0 }}
                    />

                    {/* Logo Animation */}
                    <motion.div
                        className="relative z-20 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="text-vsoe-gold text-6xl md:text-8xl font-serif tracking-tighter mb-4">
                            V.S.O.E.
                        </div>
                        <motion.div
                            className="h-[1px] bg-vsoe-gold/50"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        />
                        <motion.p
                            className="text-vsoe-cream/60 text-xs uppercase tracking-[0.4em] mt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            Venice Simplon-Orient-Express
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
