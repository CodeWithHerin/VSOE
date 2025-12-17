'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HighEnergyMap from '../ui/HighEnergyMap';
import GrandTourSection from './GrandTourSection';

export default function RouteExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative w-full bg-vsoe-midnight z-10 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-vsoe-gold via-transparent to-transparent pointer-events-none" />

            <div className="relative pt-20">
                {/* 1. The Interactive Map */}
                <HighEnergyMap />

                {/* 2. Visual Connector */}
                <div className="w-full flex justify-center -mt-12 mb-12 relative z-20">
                    <motion.div
                        style={{ opacity }}
                        className="w-[1px] h-32 bg-gradient-to-b from-vsoe-gold/0 via-vsoe-gold to-vsoe-gold/0"
                    />
                </div>

                {/* 3. The Details (Grand Tour) */}
                <div className="relative z-10 pb-20">
                    <GrandTourSection />
                </div>
            </div>
        </section>
    );
}
