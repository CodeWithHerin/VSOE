'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InteractiveMap from '@/components/ui/InteractiveMap';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function JourneysPage() {
    const { t } = useTranslation();
    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <span className="text-vsoe-blue/50 text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.journeysPage.route}</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-vsoe-blue mb-8">{t.journeysPage.title}</h1>
                    <p className="max-w-2xl mx-auto text-vsoe-blue/70 font-sans leading-relaxed">
                        {t.journeysPage.desc}
                    </p>
                </motion.div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-24 shadow-2xl"
                >
                    <InteractiveMap />
                </motion.div>

                {/* Itineraries Grid */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif text-vsoe-blue">{t.journeysPage.classicTitle}</h2>
                        <p className="text-vsoe-blue/70 text-sm leading-relaxed">
                            {t.journeysPage.classicDesc}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif text-vsoe-blue">{t.journeysPage.grandTitle}</h2>
                        <p className="text-vsoe-blue/70 text-sm leading-relaxed">
                            {t.journeysPage.grandDesc}
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
