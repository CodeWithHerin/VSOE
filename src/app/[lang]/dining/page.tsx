'use client';

import React from 'react';
import { motion } from 'framer-motion';


import { dining } from '@/data/dining';
import Image from 'next/image';
import { updateInterest } from '@/lib/profiling';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function DiningPage() {
    const { t } = useTranslation();

    React.useEffect(() => {
        updateInterest('gastronomy', 2);
    }, []);

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue selection:bg-vsoe-gold selection:text-vsoe-blue">
            

            {/* Hero */}
            <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image 
                        src="/images/vsoe/vsoe-dining-car.jpg" 
                        alt="Dining Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative z-10 text-center text-white">
                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.diningPage.gastronomy}</span>
                    <h1 className="text-5xl md:text-7xl font-serif">{t.diningPage.title}</h1>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="text-2xl font-serif leading-relaxed mb-8">
                    {t.diningPage.quote}
                </p>
                <div className="w-24 h-[1px] bg-vsoe-blue/20 mx-auto" />
            </div>

            {/* Restaurant Cars */}
            <div className="max-w-7xl mx-auto px-6 pb-20 space-y-32">
                {dining.map((venue, index) => {
                    const venueT = t.diningData[venue.id as keyof typeof t.diningData];
                    return (
                        <motion.div 
                            key={venue.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                                <Image 
                                    src={venue.image} 
                                    alt={venueT.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 space-y-6">
                                <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase">{t.diningPage.restCar}</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-vsoe-blue">{venueT.name}</h2>
                                <p className="text-vsoe-blue/70 leading-relaxed font-sans text-lg">
                                    {venueT.description}
                                </p>
                                <div className="pt-6">
                                    <button className="text-xs uppercase tracking-widest border-b border-vsoe-blue/30 pb-1 hover:border-vsoe-blue transition-colors">
                                        {t.diningPage.viewMenu}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Chef Section */}
            <div className="bg-vsoe-midnight text-vsoe-cream py-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-serif text-vsoe-gold">{t.diningPage.chefTitle}</h2>
                        <p className="text-white/70 leading-relaxed">
                            {t.diningPage.chefDesc}
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-full border-4 border-vsoe-gold/20">
                         <Image 
                            src="/images/vsoe/vsoe-champagne-detail.jpg" 
                            alt="Chef"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>

            
        </main>
    );
}
