'use client';

import { motion } from 'framer-motion';

interface DestinationHeroProps {
    title: string;
    subtitle: string;
    videoSrc: string;
    imageSrc: string;
}

export default function DestinationHero({ title, subtitle, videoSrc, imageSrc }: DestinationHeroProps) {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-vsoe-midnight flex items-center justify-center">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={imageSrc}
                    className="h-full w-full object-cover opacity-50 scale-105"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="block text-vsoe-gold text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-6"
                >
                    {subtitle}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-serif text-white mb-8"
                >
                    {title}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-[1px] h-24 bg-vsoe-gold mx-auto origin-top"
                />
            </div>
        </section>
    );
}
