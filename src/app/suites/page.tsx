'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import CabinShowcase from '@/components/suites/CabinShowcase';
import { motion } from 'framer-motion';

export default function SuitesPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            {/* Hero */}
            <HeroSection
            // title="The Accommodation" // HeroSection might default these or we can pass empty to use its internal defaults if designed that way, 
            // but usually better to be explicit if the component supports it. 
            // Looking at HeroSection.tsx (Step 165), it doesn't take props for title/subtitle in that version, it hardcodes "TIMELESS ELEGANCE".
            // Wait, in Step 185 replace_file_content tried to add videoSrc and subtitle props to HeroSection in page.tsx.
            // Let's assume standard HeroSection usage or a specific DestinationHero if we want custom titles.
            // The current HeroSection (Step 165) seems to be the Home Page one.
            // I should probably use a simpler Hero or the DestinationHero for this page if I want custom text.
            // However, for now, let's use DestinationHero which is flexible.
            />
            {/* Actually, let's use the DestinationHero I built for Destinations, it's generic enough. */}
            <div className="relative">
                <div className="absolute inset-0 h-[80vh] overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-50"
                        poster="/images/vsoe/vsoe-grand-suite.jpg"
                    >
                        <source src="https://cdn.coverr.co/videos/coverr-luxury-hotel-room-tour-5367/1080p.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/50 to-transparent" />
                </div>

                <div className="relative z-10 h-[80vh] flex flex-col items-center justify-center text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-vsoe-gold text-sm font-bold tracking-[0.4em] uppercase mb-6"
                    >
                        The Accommodation
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-serif text-white mb-8"
                    >
                        Sanctuaries of Style
                    </motion.h1>
                </div>
            </div>


            {/* Intro Text */}
            <section className="py-24 px-6 md:px-12 text-center bg-vsoe-midnight relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="block text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">
                        The Art of Slumber
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-vsoe-cream mb-8">
                        Restored 1920s Elegance
                    </h2>
                    <p className="text-xl font-light text-vsoe-cream/70 leading-relaxed">
                        Every cabin has been lovingly restored by expert craftsmen.
                        During the day, they are comfortable lounges with sofa seating.
                        While you dine, your steward transforms your cabin into a cozy bedroom.
                    </p>
                </motion.div>
            </section>

            {/* Interactive Showcase */}
            <CabinShowcase />

            <Footer />
        </main>
    );
}
