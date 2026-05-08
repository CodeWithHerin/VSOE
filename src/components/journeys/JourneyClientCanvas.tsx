'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'framer-motion';
import { MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface TimelineItem {
    time: string;
    day: string;
    title: string;
    location: string;
    description: string;
    image: string;
    video?: string;
}

interface JourneyClientCanvasProps {
    journey: {
        id: string;
        name: string;
        duration: string;
        description: string;
        heroVideo?: string;
        heroImage?: string;
        stops: string[];
        timeline: TimelineItem[];
    };
}

export default function JourneyClientCanvas({ journey }: JourneyClientCanvasProps) {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // State for background ambiance
    const [activeSegment, setActiveSegment] = useState(0); // Index of timeline item

    // Listen to scroll to update active segment index
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Calculate which timeline item is in focus based on scroll %
        // Simple mapping: break timeline into equal chunks + hero logic
        const totalItems = journey.timeline.length + 1; // +1 for hero buffering
        const step = 1 / totalItems;
        const index = Math.floor((latest - 0.1) / step); // -0.1 to account for Hero
        
        const clampedIndex = Math.max(0, Math.min(index, journey.timeline.length - 1));
        setActiveSegment(clampedIndex);
    });

    // Determine current background image
    const currentBg = journey.timeline[activeSegment]?.image || journey.heroImage;
    const journeyT = t.journeysData[journey.id as keyof typeof t.journeysData];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-vsoe-midnight">
            <Navbar />

            {/* --- FIXED BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                 <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentBg}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                        
                        {/* Dynamic Vignette based on time of day (simulated by index) */}
                        <div className={`absolute inset-0 z-10 mix-blend-multiply transition-colors duration-1000
                            ${activeSegment === 0 ? 'bg-vsoe-blue/10' : // Morning
                              activeSegment === Math.floor(journey.timeline.length / 2) ? 'bg-orange-900/20' : // Sunset/Golden
                              'bg-vsoe-midnight/60' // Night
                            }`} 
                        />

                        <img 
                            src={currentBg} 
                            alt="Atmosphere" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                 </AnimatePresence>
            </div>

            {/* --- SCROLLABLE CONTENT LAYER --- */}
            <div className="relative z-10">
                {/* Hero */}
                <HeroSection
                    title={journeyT.name}
                    subtitle={journeyT.duration}
                    videoSrc={journey.heroVideo} // Video plays at top
                    backgroundImage={journey.heroImage}
                />

                <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                    <div className="grid lg:grid-cols-12 gap-12">
                        
                        {/* Left: Sticky Context Info */}
                        <div className="hidden lg:block lg:col-span-4 relative">
                            <div className="sticky top-32 space-y-8 bg-vsoe-midnight/80 backdrop-blur-md p-8 border border-white/10 rounded-sm">
                                <h2 className="text-3xl font-serif text-vsoe-gold">{t.journeyClientCanvas.journeyTitle}</h2>
                                <p className="text-white/70 font-light leading-relaxed">
                                    {journeyT.description}
                                </p>
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-white/60">
                                        <Clock size={16} className="text-vsoe-gold" />
                                        <span className="text-sm uppercase tracking-widest">{journeyT.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/60">
                                        <MapPin size={16} className="text-vsoe-gold" />
                                        <span className="text-sm uppercase tracking-widest">{journeyT.stops.join(' — ')}</span>
                                    </div>
                                </div>
                                <Link href="/book" className="block w-full">
                                    <button className="w-full bg-vsoe-gold text-vsoe-midnight py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                                        {t.journeyClientCanvas.checkAvailability}
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Timeline */}
                        <div className="lg:col-span-8 space-y-32"> 
                            {journey.timeline.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-20% 0px -20% 0px" }}
                                    transition={{ duration: 0.8 }}
                                    className={`relative p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-sm transition-colors duration-500
                                        ${activeSegment === index ? 'bg-white/10 shadow-2xl border-vsoe-gold/30' : 'bg-black/40'}
                                    `}
                                >
                                    {/* Connector Line */}
                                    {index !== journey.timeline.length - 1 && (
                                        <div className="absolute left-8 bottom-[-128px] w-[1px] h-32 bg-gradient-to-b from-vsoe-gold/50 to-transparent hidden md:block" />
                                    )}

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="inline-block px-3 py-1 bg-vsoe-gold/20 text-vsoe-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            {journeyT.timeline?.[index]?.day || item.day} — {item.time}
                                        </span>
                                        <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
                                            <MapPin size={12} /> {item.location}
                                        </div>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">{journeyT.timeline?.[index]?.title || item.title}</h3>
                                    
                                    <p className="text-lg text-white/80 font-light leading-relaxed mb-8">
                                        {journeyT.timeline?.[index]?.description || item.description}
                                    </p>

                                    {/* Media Card inside timeline if video exists, otherwise purely atmospheric */}
                                    {item.video && (
                                        <div className="rounded-sm overflow-hidden border border-white/10 relative group aspect-video">
                                             <video
                                                src={item.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                    <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Mobile CTA at bottom */}
                            <div className="lg:hidden block pt-12">
                                <Link href="/book" className="block w-full">
                                    <button className="w-full bg-vsoe-gold text-vsoe-midnight py-4 text-xs font-bold uppercase tracking-[0.2em]">
                                        {t.journeyClientCanvas.startJourney}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
