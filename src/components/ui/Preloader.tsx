'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate asset loading / minimum display time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
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
