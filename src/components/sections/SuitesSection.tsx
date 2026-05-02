'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTrackInterest } from '@/lib/profiling';
import ParallaxImage from '@/components/ui/ParallaxImage';
import TextReveal from '@/components/ui/TextReveal';

export default function SuitesSection() {
    useTrackInterest('wellness');
    const grandSuiteImage = "/images/vsoe/vsoe-grand-suite.jpg";

    return (
        <section id="track-wellness" className="relative w-full min-h-screen py-20 md:py-32 bg-vsoe-blue flex items-center">
            <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                {/* Text Content */}
                <div className="relative z-10">
                    <TextReveal>
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6 font-sans">
                            Accommodations
                        </span>
                    </TextReveal>

                    <TextReveal delay={0.1}>
                        <h2 className="text-5xl md:text-7xl text-vsoe-cream mb-8 leading-[1.1] font-serif">
                            Grand Suites
                        </h2>
                    </TextReveal>

                    <TextReveal delay={0.2}>
                        <p className="text-vsoe-cream/70 text-lg font-light leading-relaxed mb-10 font-sans">
                            New heights of luxury. Private bathrooms with showers, double beds, and a living area with underfloor heating.
                            Free-flowing champagne and private dining in your suite.
                        </p>
                    </TextReveal>

                    <TextReveal delay={0.3}>
                        <Link href="/suites" className="inline-flex items-center gap-4 text-vsoe-gold text-xs tracking-[0.2em] uppercase hover:gap-6 transition-all group font-sans">
                            Discover Suites <ArrowRight className="w-4 h-4" />
                        </Link>
                    </TextReveal>
                </div>

                {/* Image Content */}
                <div className="relative group interactive-area overflow-hidden rounded-sm">
                    <div className="aspect-[4/5] relative">
                        <ParallaxImage
                            src={grandSuiteImage}
                            alt="Grand Suite Interior"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
