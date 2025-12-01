'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500); // 3.5s as per reference

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-vsoe-midnight flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, pointerEvents: 'none' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="text-center w-full max-w-md px-8">
                        {/* Line Animation */}
                        <motion.div
                            className="h-[1px] bg-vsoe-gold mx-auto mb-8"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />

                        {/* Title Reveal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl md:text-6xl text-vsoe-cream uppercase tracking-widest font-serif">
                                Belmond
                            </h1>
                            <div className="flex justify-between mt-4 text-vsoe-gold text-[10px] tracking-[0.4em] uppercase font-sans">
                                <span>London</span>
                                <span>Venice</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
