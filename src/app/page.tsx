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
const GrandSuitesExperience = dynamic(() => import('@/components/sections/GrandSuitesExperience'));
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
          // video: "https://cdn.coverr.co/videos/coverr-pouring-wine-in-restaurant-5362/1080p.mp4",
          // Override to Train video for consistency and reliability
          // video: "https://videos.pexels.com/video-files/2883395/2883395-hd_1920_1080_30fps.mp4",
          // Official VSOE Render (High Performance CDN)
          video: "https://videos.ctfassets.net/txhaodyqr481/6g7G1G8Xy8y84s8o4kO6yS/09c316715f36611585c531d0537d8051/belmond-vsoe-hero.mp4",
          subtitle: "Taste the Extraordinary"
        };
      default:
        return {
          // Standard Cinematic Train Video (Westminster/London vibe)
          video: "https://videos.pexels.com/video-files/3205626/3205626-hd_1920_1080_25fps.mp4",
          subtitle: "Beyond the Golden Age"
        };
    }
  };

  const content = getHeroContent();

  return (
    <main className="relative w-full bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
      {/* <Preloader /> */}

      {/* 1. The Dream: Hero Section */}
      <HeroSection
        // Cinematic Fast-Forward Train Journey: Westminster/Travel vibe matching the map
        videoSrc="https://videos.pexels.com/video-files/3205626/3205626-hd_1920_1080_25fps.mp4"
        backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
        title="Venice Simplon-Orient-Express"
        subtitle={content.subtitle}
      />

      {/* 2. The Legend: History & Context */}
      <TrainHistorySection />

      {/* 3. The Journey: Map + Destinations (Unified) */}
      <RouteExperience />

      {/* 4. The Experience: Suites (Sanctuaries) */}
      <GrandSuitesExperience />

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
