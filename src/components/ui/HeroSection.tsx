'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useUIStore } from '@/store/useUIStore';

// Define props
interface HeroProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    videoSrc?: string;
}

export default function HeroSection({
    title,
    subtitle,
    backgroundImage,
    videoSrc
}: HeroProps) {
    const [hasError, setHasError] = React.useState(false);
    const setLoaded = useUIStore((state) => state.setHeroVideoLoaded);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current && videoSrc && !hasError) {
            videoRef.current.play().catch(e => console.error("AutoPlay failed:", e));
        }
    }, [videoSrc, hasError]);

    const scrollToHistory = () => {
        const historySection = document.getElementById('track-heritage');
        if (historySection) {
            historySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-vsoe-midnight">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Prioritize Video if available and no error */}
                {videoSrc && !hasError ? (
                    <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onCanPlay={() => setLoaded(true)}
                        onError={(e) => {
                            const error = e.currentTarget.error;
                            console.error("Video Error Details:", {
                                code: error?.code,
                                message: error?.message,
                                src: videoSrc
                            });
                            setHasError(true);
                            setLoaded(true);
                        }}
                    />
                ) : (
                    backgroundImage && (
                        <div className="relative h-full w-full">
                            <Image
                                src={backgroundImage}
                                alt={title || "Hero Background"}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )
                )}

                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col items-center"
                >
                    {subtitle && (
                        <span className="mb-6 block font-sans text-sm font-medium tracking-[0.2em] uppercase text-white/90">
                            {subtitle}
                        </span>
                    )}
                    {title && (
                        <h1 className="font-serif text-5xl font-light tracking-wide md:text-7xl lg:text-8xl">
                            {title}
                        </h1>
                    )}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.button
                    onClick={scrollToHistory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em]">Discover</span>
                    <div className="h-10 w-[1px] bg-white/50" />
                </motion.button>
            </div>
        </section>
    );
}