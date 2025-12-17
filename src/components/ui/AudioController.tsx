'use client';

import { useEffect, useRef, useState } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioController() {
    const [isMuted, setIsMuted] = useState(true); // Default to muted for autoplay policy
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isTraveling = useBookingStore((state) => state.isTraveling);

    // Audio Sources
    const AMBIENCE_URL = 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_07833d733e.mp3?filename=train-interior-19793.mp3'; // Placeholder train ambience
    const DEPART_SFX = 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=steam-release-25867.mp3'; // Placeholder steam

    useEffect(() => {
        // Initialize Audio
        audioRef.current = new Audio(AMBIENCE_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.2;
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (!isMuted) {
                audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMuted]);

    // Effect: Play SFX on Travel
    useEffect(() => {
        if (isTraveling && !isMuted) {
            const sfx = new Audio(DEPART_SFX);
            sfx.volume = 0.5;
            sfx.play().catch(e => console.log("SFX blocked", e));
        }
    }, [isTraveling, isMuted]);

    return (
        <button
            onClick={() => setIsMuted(!isMuted)}
            className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-vsoe-midnight/80 border border-vsoe-gold/30 text-vsoe-gold hover:bg-vsoe-gold hover:text-vsoe-midnight transition-all duration-300 backdrop-blur-md"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    );
}
