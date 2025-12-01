'use client';

import { motion } from 'framer-motion';
import { Wine, Utensils } from 'lucide-react';

export default function DiningSection() {
    return (
        <section id="dining" className="relative w-full min-h-screen py-32 bg-vsoe-blue flex items-center">
            <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                {/* Image Content (Left on Desktop) */}
                <motion.div
                    className="order-2 md:order-1 relative group interactive-area"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-vsoe-gold translate-x-full transition-transform duration-700 group-hover:translate-x-0 z-0" />
                    <div className="aspect-[4/5] overflow-hidden relative z-10 border border-vsoe-gold/30 p-2">
                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            alt="Dining"
                        />
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className="order-1 md:order-2">
                    <motion.span
                        className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6 font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Gastronomy
                    </motion.span>
                    <motion.h2
                        className="text-5xl md:text-7xl text-vsoe-cream mb-8 leading-[1.1] font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Haute Cuisine
                    </motion.h2>
                    <motion.p
                        className="text-vsoe-cream/70 text-lg font-light leading-relaxed mb-10 max-w-md font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Local, seasonal produce is taken on board at stops along the route. From Brittany lobsters to salt marsh lamb, every meal is an event in itself.
                    </motion.p>
                    <motion.div
                        className="flex gap-4 text-vsoe-gold text-xs tracking-[0.2em] uppercase mb-8 font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="flex items-center gap-2"><Wine className="w-4 h-4" /> Sommelier Service</span>
                        <span className="flex items-center gap-2"><Utensils className="w-4 h-4" /> Michelin Chefs</span>
                    </motion.div>
                    <motion.button
                        className="px-8 py-4 border border-vsoe-cream/30 text-vsoe-cream text-xs tracking-[0.2em] uppercase hover:bg-vsoe-cream hover:text-vsoe-blue transition-all interactive-area font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        View Menus
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
