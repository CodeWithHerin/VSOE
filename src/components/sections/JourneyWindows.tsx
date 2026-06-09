'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const scenes = [
    {
        image: '/images/vsoe/vsoe-paris-departure.jpg',
        city: 'Paris',
        time: '18:32',
        label: 'The Departure',
        desc: 'Platform 8, Gare de Lyon. The locomotive breathes steam into the evening air.',
    },
    {
        image: '/images/vsoe/vsoe-countryside-window.jpg',
        city: 'The Alps',
        time: '23:14',
        label: 'The Journey',
        desc: 'Moonlight over the Simplon Pass. The world outside moves at a different pace.',
    },
    {
        image: '/images/vsoe/vsoe-venice-night.jpg',
        city: 'Venice',
        time: '09:48',
        label: 'The Arrival',
        desc: 'Santa Lucia station. The lagoon glitters beyond the platform.',
    },
];

export default function JourneyWindows() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Scene transitions: 0→0.33→0.66→1
    const scene1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.28, 0.38], [1, 1, 1, 0]);
    const scene2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.6, 0.72], [0, 1, 1, 0]);
    const scene3Opacity = useTransform(scrollYProgress, [0.62, 0.72, 1, 1], [0, 1, 1, 1]);

    const scene1X = useTransform(scrollYProgress, [0.28, 0.42], [0, -120]);
    const scene2X = useTransform(scrollYProgress, [0.28, 0.42], [120, 0]);
    const scene2XOut = useTransform(scrollYProgress, [0.6, 0.74], [0, -120]);
    const scene3X = useTransform(scrollYProgress, [0.6, 0.74], [120, 0]);

    // Text entrance per scene
    const text1Opacity = useTransform(scrollYProgress, [0.05, 0.18, 0.28, 0.36], [0, 1, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.36, 0.46, 0.6, 0.7], [0, 1, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1, 1], [0, 1, 1, 1]);

    const text1Y = useTransform(scrollYProgress, [0.05, 0.18], [30, 0]);
    const text2Y = useTransform(scrollYProgress, [0.36, 0.46], [30, 0]);
    const text3Y = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);

    const opacities = [scene1Opacity, scene2Opacity, scene3Opacity];
    const xTransforms = [scene1X, scene2X, scene3X];
    const textOpacities = [text1Opacity, text2Opacity, text3Opacity];
    const textYs = [text1Y, text2Y, text3Y];

    return (
        /* Tall container gives scroll room — sticky child stays fixed */
        <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-vsoe-midnight flex items-center justify-center">

                {/* Background atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-b from-vsoe-midnight via-vsoe-midnight/95 to-vsoe-midnight" />

                {/* Section label */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20">
                    <div className="w-8 h-[1px] bg-vsoe-gold mx-auto mb-4" />
                    <span className="text-vsoe-gold text-[10px] font-bold uppercase tracking-[0.4em]">
                        The Journey
                    </span>
                </div>

                {/* Train window frame + scenes */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">

                    {/* Window frame — styled like a train window */}
                    <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '16/10' }}>

                        {/* Outer frame — train window border */}
                        <div className="absolute inset-0 rounded-[40px] border-4 border-vsoe-gold/40 z-20 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,0,0,0.6)]" />
                        {/* Inner frame detail */}
                        <div className="absolute inset-3 rounded-[32px] border border-vsoe-gold/20 z-20 pointer-events-none" />

                        {/* Scene images */}
                        {scenes.map((scene, i) => (
                            <motion.div
                                key={scene.city}
                                style={{
                                    opacity: opacities[i],
                                    x: i === 0 ? scene1X :
                                       i === 1 ? scene2X :
                                       scene3X,
                                }}
                                className="absolute inset-0 rounded-[36px] overflow-hidden"
                            >
                                <Image
                                    src={scene.image}
                                    alt={scene.label}
                                    fill
                                    className="object-cover scale-110"
                                    priority={i === 0}
                                />
                                {/* Dark vignette inside window */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                            </motion.div>
                        ))}

                        {/* Scene text overlays inside window */}
                        {scenes.map((scene, i) => (
                            <motion.div
                                key={`text-${scene.city}`}
                                style={{
                                    opacity: textOpacities[i],
                                    y: textYs[i],
                                }}
                                className="absolute bottom-8 left-8 right-8 z-30"
                            >
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="font-serif text-2xl text-white">{scene.city}</span>
                                    <span className="text-vsoe-gold text-xs tracking-widest font-mono">{scene.time}</span>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                                    {scene.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Scene label below window */}
                    {scenes.map((scene, i) => (
                        <motion.div
                            key={`label-${scene.city}`}
                            style={{ opacity: textOpacities[i] }}
                            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
                        >
                            <span className="text-[10px] uppercase tracking-[0.35em] text-vsoe-gold/60 font-bold">
                                {scene.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll progress dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {scenes.map((scene, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            style={{ opacity: textOpacities[i] }}
                            className="w-1 h-1 rounded-full bg-vsoe-gold"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
