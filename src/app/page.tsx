'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/ui/HeroSection';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/ui/Preloader';
import { getRecommendedContent } from '@/lib/profiling';

const Marquee = dynamic(() => import('@/components/ui/Marquee'), { ssr: false });
const TrainHistorySection = dynamic(() => import('@/components/sections/TrainHistorySection'));
const RouteExperience = dynamic(() => import('@/components/sections/RouteExperience'));
const JournalSection = dynamic(() => import('@/components/sections/JournalSection'));
const SuitesSection = dynamic(() => import('@/components/sections/SuitesSection'));
const DiningSection = dynamic(() => import('@/components/sections/DiningSection'));

export default function Home() {
  const [topInterest, setTopInterest] = React.useState<string>('');

  React.useEffect(() => {
    setTopInterest(getRecommendedContent());
  }, []);

  const getHeroContent = () => {
    switch (topInterest) {
      case 'gastronomy':
        return {
          video: "https://cdn.coverr.co/videos/coverr-pouring-wine-in-restaurant-5362/1080p.mp4",
          subtitle: "Taste the Extraordinary"
        };
      default:
        return {
          video: "https://cdn.coverr.co/videos/coverr-train-in-the-snow-4626/1080p.mp4", // Restored original video as it was distinct
          subtitle: "Beyond the Golden Age"
        };
    }
  };

  const content = getHeroContent();

  return (
    <main className="relative w-full bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
      <Preloader />

      {/* 1. The Dream: Hero Section */}
      <HeroSection
      // Cinematic Fast-Forward Train Journey
      // videoSrc={content.video} // Note: HeroSection handles its own video internally now, simplified prop usage.
      />

      {/* 2. The Legend: History & Context */}
      <TrainHistorySection />

      {/* 3. The Journey: Map + Destinations (Unified) */}
      <RouteExperience />

      {/* 4. The Experience: Suites (Sanctuaries) */}
      <SuitesSection />

      {/* 5. The Experience: Dining (Gastronomy) */}
      <DiningSection />

      {/* 6. Social Proof: Partners & Brands */}
      <Marquee />

      {/* 7. The Narrative: Journal */}
      <JournalSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
