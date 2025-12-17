'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
    isPlaying: boolean;
    toggleAudio: () => void;
    playTrack: (track: string) => void;
    setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudio must be used within an AudioProvider');
    return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio();
            audioRef.current.loop = true;
            audioRef.current.volume = 0; // Start silent for fade in
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (fadeInterval.current) clearInterval(fadeInterval.current);
        };
    }, []);

    const fadeAudio = (targetVolume: number, duration: number = 1000) => {
        if (!audioRef.current) return;

        const startVolume = audioRef.current.volume;
        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = (targetVolume - startVolume) / steps;
        let currentStep = 0;

        if (fadeInterval.current) clearInterval(fadeInterval.current);

        fadeInterval.current = setInterval(() => {
            if (!audioRef.current) return;

            currentStep++;
            const newVolume = Math.min(Math.max(startVolume + (volumeStep * currentStep), 0), 1);
            audioRef.current.volume = newVolume;

            if (currentStep >= steps) {
                if (fadeInterval.current) clearInterval(fadeInterval.current);
            }
        }, stepTime);
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            fadeAudio(0);
            setTimeout(() => {
                if (audioRef.current) audioRef.current.pause();
            }, 1000);
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            fadeAudio(0.5);
        }
        setIsPlaying(!isPlaying);
    };

    const playTrack = (track: string) => {
        if (!audioRef.current) return;

        if (audioRef.current.src === track) return;

        // Fade out old track
        fadeAudio(0, 500);

        setTimeout(() => {
            if (!audioRef.current) return;
            audioRef.current.src = track;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                fadeAudio(0.5, 500);
            }
        }, 500);
    };

    const setVolume = (volume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, toggleAudio, playTrack, setVolume }}>
            {children}
        </AudioContext.Provider>
    );
};
