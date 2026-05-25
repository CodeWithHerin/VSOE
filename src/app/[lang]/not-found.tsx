'use client';



import HeroSection from '@/components/ui/HeroSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            
            <HeroSection
                title="Page Not Found"
                subtitle="404 Error"
                backgroundImage="/images/vsoe/vsoe-exterior-night.jpg"
            />
            <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                <p className="text-xl text-white/70 mb-12 font-sans leading-relaxed">
                    The page you are looking for seems to have departed without you.
                    Please return to the station to continue your journey.
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
