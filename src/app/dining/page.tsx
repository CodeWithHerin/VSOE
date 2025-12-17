'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { dining } from '@/data/dining';
import Image from 'next/image';
import { updateInterest } from '@/lib/profiling';

export default function DiningPage() {
    React.useEffect(() => {
        updateInterest('gastronomy', 2);
    }, []);

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image 
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" 
                        alt="Dining Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative z-10 text-center text-white">
                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Gastronomy</span>
                    <h1 className="text-5xl md:text-7xl font-serif">Culinary Excellence</h1>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="text-2xl font-serif leading-relaxed mb-8">
                    "Dining on the Venice Simplon-Orient-Express is an event in itself. 
                    Our chefs create exquisite dishes that reflect the seasonal delicacies of the regions we pass through."
                </p>
                <div className="w-24 h-[1px] bg-vsoe-blue/20 mx-auto" />
            </div>

            {/* Restaurant Cars */}
            <div className="max-w-7xl mx-auto px-6 pb-20 space-y-32">
                {dining.map((venue, index) => (
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
                                alt={venue.name}
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </div>
                        <div className="flex-1 space-y-6">
                            <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase">Restaurant Car</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-vsoe-blue">{venue.name}</h2>
                            <p className="text-vsoe-blue/70 leading-relaxed font-sans text-lg">
                                {venue.description}
                            </p>
                            <div className="pt-6">
                                <button className="text-xs uppercase tracking-widest border-b border-vsoe-blue/30 pb-1 hover:border-vsoe-blue transition-colors">
                                    View Sample Menu
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chef Section */}
            <div className="bg-vsoe-midnight text-vsoe-cream py-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-serif text-vsoe-gold">Executive Chef Jean Imbert</h2>
                        <p className="text-white/70 leading-relaxed">
                            Renowned for his passion for seasonal produce and classical French techniques, 
                            Jean Imbert brings a fresh vision to the train's culinary heritage. 
                            Every meal is prepared on board in our compact yet capable galleys.
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-full border-4 border-vsoe-gold/20">
                         <Image 
                            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2577&auto=format&fit=crop" 
                            alt="Chef"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
