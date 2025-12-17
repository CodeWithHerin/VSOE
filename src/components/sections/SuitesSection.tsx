'use client';

import { motion } from 'framer-motion';

export default function SuitesSection() {
    return (
        <section id="suites" className="relative w-full min-h-screen py-32 bg-vsoe-blue flex items-center">
            <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                {/* Text Content */}
                <div className="relative z-10">
                    <motion.span
                        className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6 font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The Accommodation
                    </motion.span>
                    <motion.h2
                        className="text-5xl md:text-7xl text-vsoe-cream mb-8 leading-[1.1] font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Sanctuaries of Style
                    </motion.h2>
                    <motion.p
                        className="text-vsoe-cream/70 text-lg font-light leading-relaxed mb-10 max-w-md font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Restored 1920s cabins that blend history with modern comfort.
                        From the intimate Historic Cabins to the opulent Grand Suites, every detail tells a story.
                    </motion.p>
                    <motion.button
                        className="px-8 py-4 border border-vsoe-cream/30 text-vsoe-cream text-xs tracking-[0.2em] uppercase hover:bg-vsoe-cream hover:text-vsoe-blue transition-all interactive-area font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        View Floorplans
                    </motion.button>
                </div>

                {/* Image Content */}
                <motion.div
                    className="relative group interactive-area"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute -inset-4 border border-vsoe-gold/20 transition-all duration-700 group-hover:inset-0 group-hover:border-vsoe-gold" />
                    <div className="aspect-[4/5] overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2774&auto=format&fit=crop"
                            alt="Grand Suite"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
