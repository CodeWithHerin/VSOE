'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioAmbience() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element
        const audio = new Audio('https://cdn.pixabay.com/audio/2022/10/28/audio_2f6d2a8336.mp3'); // Subtle train ambience
        audio.loop = true;
        audio.volume = 0.2; // Start very low
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            // Fade out
            const fadeOut = setInterval(() => {
                if (audioRef.current && audioRef.current.volume > 0.01) {
                    audioRef.current.volume -= 0.01;
                } else {
                    audioRef.current?.pause();
                    clearInterval(fadeOut);
                }
            }, 50);
            setIsPlaying(false);
        } else {
            // Start playing and fade in
            audioRef.current.volume = 0;
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            const fadeIn = setInterval(() => {
                if (audioRef.current && audioRef.current.volume < 0.2) {
                    audioRef.current.volume += 0.01;
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);
            setIsPlaying(true);
            setHasInteracted(true);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {!hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute left-14 top-1/2 -translate-y-1/2 bg-vsoe-gold text-vsoe-midnight text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm whitespace-nowrap pointer-events-none"
                    >
                        Enable Sound
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-vsoe-gold rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleAudio}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${isPlaying
                        ? 'bg-vsoe-gold text-vsoe-midnight border-vsoe-gold shadow-[0_0_15px_rgba(184,134,11,0.4)]'
                        : 'bg-vsoe-midnight/80 text-white/40 border-white/10 hover:border-vsoe-gold hover:text-vsoe-gold'
                    }`}
            >
                {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
        </div>
    );
}
