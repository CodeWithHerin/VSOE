'use client';



import HeroSection from '@/components/ui/HeroSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ComingSoonPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            
            <HeroSection
                title="Coming Soon"
                subtitle="Under Construction"
                backgroundImage="/images/vsoe/vsoe-exterior-night.jpg"
            />
            <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                <p className="text-xl text-white/70 mb-12 font-sans leading-relaxed">
                    We are currently crafting this experience. Please check back soon for updates on our latest offerings and journeys.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-vsoe-gold hover:text-white transition-colors border border-vsoe-gold px-8 py-4"
                >
                    <ArrowLeft size={14} /> Return Home
                </Link>
            </div>
            
        </main>
    );
}
