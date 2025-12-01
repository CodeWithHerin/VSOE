'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-vsoe-midnight text-vsoe-cream pt-32 pb-12 border-t border-vsoe-gold/20 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="mb-20">
                    <motion.span
                        className="block text-vsoe-gold text-xs tracking-[0.4em] uppercase mb-8 font-sans"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Your Carriage Awaits
                    </motion.span>
                    <motion.h2
                        className="text-5xl md:text-8xl mb-12 mix-blend-overlay opacity-90 font-serif"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        The journey of a <br /> <span className="italic text-vsoe-gold opacity-100">lifetime</span>.
                    </motion.h2>
                    <motion.button
                        className="px-16 py-6 bg-vsoe-cream text-vsoe-blue uppercase tracking-[0.25em] text-xs font-bold hover:bg-vsoe-gold transition-all duration-500 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] interactive-area font-sans"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Reserve Your Suite
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-vsoe-cream/10 pt-16">
                    <div>
                        <h4 className="font-display text-xl mb-4 text-vsoe-gold">Belmond</h4>
                        <p className="text-vsoe-cream/50 text-sm leading-relaxed font-sans">
                            The Venice Simplon-Orient-Express is a work of art in itself and a true Art Deco icon.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-vsoe-gold mb-6 font-bold font-sans">Contact</h4>
                        <ul className="space-y-3 text-sm text-vsoe-cream/70 font-sans">
                            <li>reservations@belmond.com</li>
                            <li>+44 (0) 20 3117 1300</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-vsoe-gold mb-6 font-bold font-sans">Follow</h4>
                        <div className="flex gap-6 text-sm text-vsoe-cream/70 font-sans">
                            <a href="#" className="hover:text-vsoe-gold transition-colors">Instagram</a>
                            <a href="#" className="hover:text-vsoe-gold transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-[10px] uppercase tracking-[0.2em] text-vsoe-cream/20 text-center font-sans">
                    © 2025 Belmond Management Limited. An LVMH Company.
                </div>
            </div>
        </footer>
    );
}
