import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CookieConsent from '@/components/ui/CookieConsent';
import BookTheScene from '@/components/ui/BookTheScene';
import AIConcierge from '@/components/ui/AIConcierge';
import { AudioProvider } from '@/components/audio/AudioContext';
import FloatingBackButton from '@/components/ui/FloatingBackButton';
import GlobalProgressBar from "@/components/ui/GlobalProgressBar";
import PortfolioBanner from '@/components/ui/PortfolioBanner';

const SUPPORTED_LANGUAGES = ['en', 'fr', 'it', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const metadataMap: Record<string, any> = {
    en: {
      title: 'Project Vitesse | Venice Simplon-Orient-Express',
      description: 'A next-generation journey through the golden age of travel.',
    },
    fr: {
      title: 'Projet Vitesse | Venice Simplon-Orient-Express',
      description: 'Un voyage de nouvelle génération à travers l\'âge d\'or des voyages.',
    },
    it: {
      title: 'Progetto Vitesse | Venice Simplon-Orient-Express',
      description: 'Un viaggio di nuova generazione attraverso l\'età dell\'oro dei viaggi.',
    },
    de: {
      title: 'Projekt Vitesse | Venice Simplon-Orient-Express',
      description: 'Eine Reise der nächsten Generation durch das goldene Zeitalter des Reisens.',
    },
  };

  const baseUrl = 'https://project-vitesse-one.vercel.app';
  const currentMetadata = metadataMap[lang] || metadataMap.en;

  return {
    ...currentMetadata,
    alternates: {
      languages: SUPPORTED_LANGUAGES.reduce((acc, l) => {
        acc[l] = `${baseUrl}/${l}`;
        return acc;
      }, {} as Record<string, string>),
    },
  };
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    notFound();
  }

  return (
    <AudioProvider>
      <GlobalProgressBar />
      <Preloader />
      <SmoothScroll />
      <CookieConsent />
      <BookTheScene />
      <AIConcierge />
      <CustomCursor />
      <PortfolioBanner />
      <Navbar />
      {children}
      <Footer />
      <FloatingBackButton />
    </AudioProvider>
  );
}
