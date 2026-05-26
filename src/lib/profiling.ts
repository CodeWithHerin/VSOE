'use client';

import { useEffect, useRef } from 'react';

export interface UserProfile {
    interests: {
        gastronomy: number;
        heritage: number;
        wellness: number;
        adventure: number;
    };
    lastVisited: string;
    bookingIntent: 'low' | 'medium' | 'high';
}

const DEFAULT_PROFILE: UserProfile = {
    interests: {
        gastronomy: 0,
        heritage: 0,
        wellness: 0,
        adventure: 0
    },
    lastVisited: '',
    bookingIntent: 'low'
};

export const getProfile = (): UserProfile => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    const stored = localStorage.getItem('vsoe-profile');
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
};

export const updateInterest = (category: keyof UserProfile['interests'], weight: number = 1) => {
    if (typeof window === 'undefined') return;

    const profile = getProfile();
    // Decay old interests slightly to prioritize recent activity? 
    // For now, additive is safer for short sessions.
    profile.interests[category] = (profile.interests[category] || 0) + weight;
    profile.lastVisited = new Date().toISOString();

    // Intent scoring: >20 score = high (e.g. 2 clicks + 10s dwell)
    const totalScore = Object.values(profile.interests).reduce((a, b) => a + b, 0);
    if (totalScore > 20) profile.bookingIntent = 'high';
    else if (totalScore > 10) profile.bookingIntent = 'medium';

    localStorage.setItem('vsoe-profile', JSON.stringify(profile));
    if (process.env.NODE_ENV === 'development') {
        console.log('Updated Profile:', profile);
    }
};

export const getRecommendedContent = () => {
    const profile = getProfile();
    const sortedInterests = Object.entries(profile.interests).sort(([, a], [, b]) => b - a);
    return sortedInterests[0][0]; // Returns top interest category
};

// --- React Hook for Smart Tracking --- //

export const useTrackInterest = (category: keyof UserProfile['interests']) => {
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Enter: Start Timer
                        startTimeRef.current = Date.now();
                    } else {
                        // Exit: Calculate Duration
                        if (startTimeRef.current) {
                            const duration = (Date.now() - startTimeRef.current) / 1000; // seconds
                            if (duration > 2) { // Minimum 2s to count as interest
                                // Weight: 1 point per 5 seconds of dwell
                                const weight = Math.min(duration / 5, 5); // Cap at 5 points per session (25s)
                                updateInterest(category, parseFloat(weight.toFixed(1)));
                            }
                            startTimeRef.current = null;
                        }
                    }
                });
            },
            { threshold: 0.5 } // Must be 50% visible
        );

        const currentElement = document.getElementById(`track-${category}`);
        if (currentElement) observer.observe(currentElement);

        return () => {
            if (currentElement) observer.unobserve(currentElement);
            // Handle unmount with partial credit? Scrapped for simplicity.
        };
    }, [category]);
};
