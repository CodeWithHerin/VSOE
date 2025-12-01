'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GrandTourSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-80%"]);

    return (
        <section ref={targetRef} id="grand-tour" className="relative h-[300vh] bg-vsoe-cream text-vsoe-blue">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {/* Section Header */}
                <div className="absolute top-12 left-6 md:left-20 z-10">
                    <span className="text-vsoe-blue/50 text-xs font-bold tracking-[0.3em] uppercase block mb-2 font-sans">The Journey</span>
                    <h2 className="text-4xl md:text-5xl text-vsoe-blue font-serif">Europe Unfolded</h2>
                    <p className="text-[10px] uppercase tracking-widest mt-2 animate-pulse text-vsoe-gold font-sans">Scroll to Travel</p>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div style={{ x }} className="flex items-center gap-32 pl-[20vw] h-full">
                    {/* Location 1: London */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0 relative group interactive-area">
                        <div className="aspect-[16/10] overflow-hidden mb-8 relative">
                            <img
                                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                alt="London"
                            />
                            <div className="absolute bottom-0 left-0 bg-vsoe-blue text-vsoe-cream px-6 py-4">
                                <span className="font-display text-xl">01</span>
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-6xl mb-2 font-serif">London</h3>
                    </div>

                    {/* Location 2: Paris */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0 relative group interactive-area">
                        <div className="aspect-[16/10] overflow-hidden mb-8 relative">
                            <img
                                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                alt="Paris"
                            />
                            <div className="absolute bottom-0 left-0 bg-vsoe-blue text-vsoe-cream px-6 py-4">
                                <span className="font-display text-xl">02</span>
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-6xl mb-2 font-serif">Paris</h3>
                    </div>

                    {/* Location 3: Venice */}
                    <div className="w-[80vw] md:w-[40vw] flex-shrink-0 relative group interactive-area">
                        <div className="aspect-[16/10] overflow-hidden mb-8 relative">
                            <img
                                src="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2670&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                alt="Venice"
                            />
                            <div className="absolute bottom-0 left-0 bg-vsoe-blue text-vsoe-cream px-6 py-4">
                                <span className="font-display text-xl">03</span>
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-6xl mb-2 font-serif">Venice</h3>
                    </div>
                </motion.div>

                {/* Progress Bar */}
                <div className="absolute bottom-20 left-0 w-full h-[1px] bg-vsoe-blue/10">
                    <motion.div
                        className="h-[2px] bg-vsoe-blue absolute top-0 left-0"
                        style={{ scaleX: scrollYProgress, originX: 0 }}
                    />
                </div>
            </div>
        </section>
    );
}
