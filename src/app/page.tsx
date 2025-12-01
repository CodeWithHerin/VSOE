'use client';

import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import Marquee from '@/components/ui/Marquee';
import SuitesSection from '@/components/sections/SuitesSection';
import GrandTourSection from '@/components/sections/GrandTourSection';
import DiningSection from '@/components/sections/DiningSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative w-full bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
      {/* Section 1: Hero (Legendary Journeys) */}
      <HeroSection
        id="hero"
        // Cinematic Fast-Forward Train Journey
        videoSrc="https://videos.pexels.com/video-files/3252733/3252733-uhd_2560_1440_25fps.mp4"
        backgroundImage="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2784&auto=format&fit=crop"
      />

      {/* Section 2: Marquee */}
      <Marquee />

      {/* Section 3: Suites (Split Layout) */}
      <SuitesSection />

      {/* Section 4: The Grand Tour (Horizontal Scroll) */}
      <GrandTourSection />

      {/* Section 5: Dining (Gastronomy) */}
      <DiningSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
