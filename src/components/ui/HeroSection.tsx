'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useUIStore } from '@/store/useUIStore';
import { useTranslation } from '@/lib/i18n/useTranslation';

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
    const { t } = useTranslation();
    const [hasError, setHasError] = React.useState(false);
    const setLoaded = useUIStore((state) => state.setHeroVideoLoaded);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });

    // Each word exits at a different speed — depth illusion
    const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '-120%']);
    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const word1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
    const word1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const word2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const word2Opacity = useTransform(scrollYProgress, [0.1, 0.6], [1, 0]);

    const word3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const word3Opacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);

    const word4Y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
    const word4Opacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);

    // Scroll indicator fades out quickly
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // Video slow zoom on scroll
    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    React.useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasError && videoSrc) {
                        const playPromise = videoElement.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {});
                        }
                    } else {
                        videoElement.pause();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(videoElement);
        return () => observer.disconnect();
    }, [videoSrc, hasError]);

    const scrollToHistory = () => {
        const historySection = document.getElementById('track-heritage');
        if (historySection) {
            historySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Split title into words for individual animation
    const words = title ? title.split(' ') : [];

    const wordTransforms = [
        { y: word1Y, opacity: word1Opacity },
        { y: word2Y, opacity: word2Opacity },
        { y: word3Y, opacity: word3Opacity },
        { y: word4Y, opacity: word4Opacity },
    ];

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-vsoe-midnight">
            {/* Video Background with scroll-driven zoom */}
            <div className="absolute inset-0 z-0">
                {videoSrc && !hasError ? (
                    <motion.div
                        style={{ scale: videoScale }}
                        className="absolute inset-0 origin-center"
                    >
                        <video
                            ref={videoRef}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={videoSrc}
                            preload="auto"
                            autoPlay
                            loop
                            muted
                            playsInline
                            onCanPlay={() => setLoaded(true)}
                            onError={(e) => {
                                const error = e.currentTarget.error;
                                console.error("Video Error:", { code: error?.code, message: error?.message });
                                setHasError(true);
                                setLoaded(true);
                            }}
                        />
                    </motion.div>
                ) : (
                    backgroundImage && (
                        <div className="relative h-full w-full">
                            <Image
                                src={backgroundImage}
                                alt={title || "Hero Background"}
                                fill
                                priority
                                className="object-cover"
                                onLoad={() => setLoaded(true)}
                            />
                        </div>
                    )
                )}

                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight/90 via-transparent to-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">

                {/* Subtitle */}
                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <motion.span
                            style={{ y: subtitleY, opacity: subtitleOpacity }}
                            className="mb-6 block font-sans text-sm md:text-base font-medium tracking-[0.2em] uppercase text-vsoe-gold drop-shadow-md"
                        >
                            {subtitle}
                        </motion.span>
                    </motion.div>
                )}

                {/* Title — each word exits at a different speed */}
                {words.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 overflow-hidden">
                        {words.map((word, i) => {
                            const transform = wordTransforms[Math.min(i, wordTransforms.length - 1)];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 + i * 0.15 }}
                                    className="inline-block"
                                >
                                    <motion.span
                                        style={{ y: transform.y, opacity: transform.opacity }}
                                        className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-vsoe-cream drop-shadow-lg inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Scroll Indicator */}
                <motion.button
                    onClick={scrollToHistory}
                    style={{ opacity: indicatorOpacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em]">{t.hero.discover}</span>
                    <div className="h-10 w-[1px] bg-white/50" />
                </motion.button>
            </div>
        </section>
    );
}