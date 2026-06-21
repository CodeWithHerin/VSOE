'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/ui/HeroSection';
import Preloader from '@/components/ui/Preloader';
import { getRecommendedContent } from '@/lib/profiling';
import { useTranslation } from '@/lib/i18n/useTranslation';
import ChapterTransition from '@/components/ui/ChapterTransition';

const Marquee = dynamic(() => import('@/components/ui/Marquee'), { ssr: false });
const TrainHistorySection = dynamic(() => import('@/components/sections/TrainHistorySection'));
const RouteExperience = dynamic(() => import('@/components/sections/RouteExperience'));
const JournalSection = dynamic(() => import('@/components/sections/JournalSection'));
const GrandSuitesExperience = dynamic(() => import('@/components/sections/GrandSuitesExperience'));
const DiningSection = dynamic(() => import('@/components/sections/DiningSection'));
const JourneyWindows = dynamic(() => import('@/components/sections/JourneyWindows'));

export default function Home() {
  const { t } = useTranslation();
  const [topInterest, setTopInterest] = React.useState<string>('');

  React.useEffect(() => {
    setTopInterest(getRecommendedContent());
  }, []);

  const getHeroContent = () => {
    switch (topInterest) {
      case 'gastronomy':
        return {
          video: "https://videos.pexels.com/video-files/3205626/3205626-hd_1920_1080_25fps.mp4",
          subtitle: t.hero.subtitleGastronomy
        };
      default:
        return {
          video: "https://videos.pexels.com/video-files/3205626/3205626-hd_1920_1080_25fps.mp4",
          subtitle: t.hero.subtitleDefault
        };
    }
  };

  const content = getHeroContent();

  return (
    <main className="relative w-full bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">

      {/* PROLOGUE — The Station */}
      <HeroSection
        backgroundImage="/images/vsoe/vsoe-countryside-window.jpg"
        title={t.hero.title}
        subtitle={content.subtitle}
      />

      {/* CHAPTER I — The Legend */}
      <ChapterTransition chapter="I" location="The Legend" />
      <TrainHistorySection />

      {/* BOARDING — The Train */}
      <Marquee />

      {/* CHAPTER II — The Route */}
      <ChapterTransition chapter="II" location="The Simplon Route" />
      <RouteExperience />

      {/* CHAPTER III — On Board */}
      <ChapterTransition chapter="III" location="On Board" />
      <GrandSuitesExperience />

      {/* CHAPTER IV — The Journey */}
      <ChapterTransition chapter="IV" location="The Journey" />
      <JourneyWindows />

      {/* CHAPTER V — At Table */}
      <ChapterTransition chapter="V" location="At Table" />
      <DiningSection />

      {/* CHAPTER VI — Stories */}
      <ChapterTransition chapter="VI" location="Stories" />
      <JournalSection />

      {/* Second Marquee removed — redundant after chapter structure added */}

    </main>
  );
}
