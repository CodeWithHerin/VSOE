'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-vsoe-midnight">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2784&auto=format&fit=crop"
                    className="h-full w-full object-cover opacity-60 scale-105"
                >
                    <source src="https://cdn.coverr.co/videos/coverr-train-in-the-snow-4626/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
            </div>

            {/* Editorial Layout */}
            <div className="relative z-10 h-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-12 items-center">

                {/* Left Column: Main Title */}
                <div className="col-span-12 md:col-span-8 pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="block text-vsoe-gold text-sm font-bold tracking-[0.4em] uppercase mb-6 pl-2 border-l-2 border-vsoe-gold">
                            The Venice Simplon-Orient-Express
                        </span>
                        <h1 className="text-7xl md:text-[9rem] leading-[0.9] font-serif text-vsoe-cream mix-blend-overlay">
                            TIMELESS
                            <br />
                            <span className="italic font-light ml-24">ELEGANCE</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Right Column: Floating Card & CTA */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-end h-full pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 border-l-4 border-l-vsoe-gold"
                    >
                        <p className="text-vsoe-cream/80 font-sans text-lg leading-relaxed mb-8">
                            A work of art in itself and a true Art Deco icon, the legendary train offers one of the most celebrated and romantic journeys in the world.
                        </p>
                        <button className="group flex items-center gap-4 text-vsoe-gold uppercase tracking-widest text-xs font-bold hover:text-white transition-colors">
                            <span>Discover the Legend</span>
                            <div className="w-12 h-[1px] bg-vsoe-gold group-hover:w-20 transition-all duration-300" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] text-vsoe-gold uppercase tracking-widest writing-vertical-rl rotate-180">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-vsoe-gold to-transparent" />
            </motion.div>
        </section>
    );
}
