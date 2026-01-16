'use client';

import { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import { journeys } from '@/data/journeys';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, MapPin, Play } from 'lucide-react';
import Link from 'next/link';
import JourneyClientCanvas from '@/components/journeys/JourneyClientCanvas';

export default function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const journey = journeys.find((j) => j.id === id);

    if (!journey) {
        notFound();
    }

    return <JourneyClientCanvas journey={journey} />;
}
