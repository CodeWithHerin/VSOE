'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeavyModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const heavyLuxurySpring = {
    type: "spring",
    mass: 1.5,      // Heavier than default (1) -> feels solid
    stiffness: 100, // Lower than default -> slower acceleration
    damping: 20     // Higher damping -> no "wobble" or overshoot
} as const;

export default function HeavyModal({ isOpen, onClose, children, title }: HeavyModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={heavyLuxurySpring}
                            className="w-full max-w-lg bg-vsoe-midnight border border-vsoe-gold/30 p-8 shadow-2xl pointer-events-auto"
                        >
                            {title && (
                                <h2 className="font-serif text-3xl text-vsoe-gold mb-6 text-center">
                                    {title}
                                </h2>
                            )}
                            <div className="text-vsoe-steam font-sans">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
