'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('vsoe-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('vsoe-consent', 'accepted');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
                >
                    <div className="bg-vsoe-midnight/95 backdrop-blur-md border border-vsoe-gold/20 p-6 shadow-2xl rounded-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-vsoe-gold text-xs font-bold uppercase tracking-[0.2em]">Privacy & Trust</h4>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed mb-6 font-sans">
                            We use cookies to curate a personalized experience that reflects your preferences.
                            Your privacy is our utmost priority.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-vsoe-gold text-vsoe-midnight py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="flex-1 border border-white/20 text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-vsoe-midnight transition-colors"
                            >
                                Preferences
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
