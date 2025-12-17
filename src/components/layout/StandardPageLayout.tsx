'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';

interface StandardPageLayoutProps {
    title: string;
    subtitle?: string;
    heroImage: string;
    children: React.ReactNode;
}

export default function StandardPageLayout({ title, subtitle, heroImage, children }: StandardPageLayoutProps) {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />
            
            <HeroSection
                title={title}
                subtitle={subtitle}
                backgroundImage={heroImage}
            />

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto px-6 md:px-12 py-24"
            >
                <div className="prose prose-invert prose-lg md:prose-xl font-sans font-light text-vsoe-cream/80 leading-relaxed max-w-none">
                    {children}
                </div>
            </motion.div>

            <Footer />
        </main>
    );
}
