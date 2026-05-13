'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Image from 'next/image';
import { ChevronRight, Star, Key, Calendar, GlassWater } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function MembershipPage() {
    const { t } = useTranslation();
    const [isApplying, setIsApplying] = useState(false);

    const BENEFITS = [
        {
            id: 1,
            icon: <Calendar size={24} />,
            title: t.membershipPage.ben1Title,
            desc: t.membershipPage.ben1Desc,
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop"
        },
        {
            id: 2,
            icon: <Key size={24} />,
            title: t.membershipPage.ben2Title,
            desc: t.membershipPage.ben2Desc,
            image: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 3,
            icon: <Star size={24} />,
            title: t.membershipPage.ben3Title,
            desc: t.membershipPage.ben3Desc,
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
        },
        {
            id: 4,
            icon: <GlassWater size={24} />,
            title: t.membershipPage.ben4Title,
            desc: t.membershipPage.ben4Desc,
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-midnight">
            
            {/* Cinematic Hero */}
            <section className="relative h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
                <Image 
                    src="https://images.unsplash.com/photo-1551632436-cbf8dd35477c?q=80&w=2671&auto=format&fit=crop" 
                    alt="The 1920 Club" 
                    fill 
                    className="object-cover scale-105" 
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-vsoe-midnight/60 via-vsoe-midnight/40 to-vsoe-midnight" />
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="relative z-10 text-center px-6 max-w-4xl mt-20"
                >
                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.4em] uppercase block mb-6">The Inner Circle</span>
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 drop-shadow-2xl">{t.membershipPage.title}</h1>
                    <p className="text-lg md:text-2xl font-light text-white/80 tracking-wide max-w-2xl mx-auto drop-shadow-md">
                        {t.membershipPage.subtitle}
                    </p>
                </motion.div>
            </section>

            {/* The Philosophy */}
            <section className="py-24 md:py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-vsoe-gold mb-10">{t.membershipPage.welcomeTitle}</h2>
                        <p 
                            className="text-lg md:text-xl font-sans font-light leading-relaxed text-white/80"
                            dangerouslySetInnerHTML={{ __html: t.membershipPage.welcomeDesc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-vsoe-cream font-medium">$1</strong>') }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Progressive Disclosure Benefits */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-xs font-bold tracking-[0.4em] text-white/40 uppercase mb-20">{t.membershipPage.benTitle}</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {BENEFITS.map((ben, i) => (
                            <motion.div
                                key={ben.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-vsoe-gold/20"
                            >
                                <Image src={ben.image} alt={ben.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-vsoe-midnight/80 group-hover:bg-vsoe-midnight/40 transition-colors duration-500" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="text-vsoe-gold mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                        {ben.icon}
                                    </div>
                                    <h3 className="text-xl font-serif text-vsoe-cream mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{ben.title}</h3>
                                    <p className="text-sm text-white/70 font-sans opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {ben.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Mechanism */}
            <section className="py-32 px-6 relative overflow-hidden mt-12">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 z-0" />
                <div className="max-w-3xl mx-auto relative z-10 text-center">
                    {!isApplying ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif text-vsoe-gold mb-8">{t.membershipPage.joinTitle}</h2>
                            <p className="text-white/70 mb-12 text-lg font-light">
                                {t.membershipPage.joinDesc}
                            </p>
                            <div onClick={() => setIsApplying(true)}>
                                <MagneticButton className="bg-vsoe-gold text-vsoe-midnight px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors cursor-pointer inline-block">
                                    Begin Application
                                </MagneticButton>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-vsoe-blue/40 border border-vsoe-gold/30 p-12 backdrop-blur-md rounded-sm text-left"
                        >
                            <h3 className="text-2xl font-serif text-vsoe-gold mb-8 border-b border-white/10 pb-4">Membership Application</h3>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application received. Our concierge will contact you shortly."); setIsApplying(false); }}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block">First Name</label>
                                        <input required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block">Last Name</label>
                                        <input required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block">Email Address</label>
                                    <input required type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block">Statement of Interest</label>
                                    <textarea required rows={3} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors resize-none placeholder:text-white/20" placeholder="Why would you like to join the 1920 Club?" />
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <button type="button" onClick={() => setIsApplying(false)} className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">Cancel</button>
                                    <button type="submit" className="bg-vsoe-gold text-vsoe-midnight px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center gap-2">
                                        Submit Request <ChevronRight size={14} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>
            </section>

        </main>
    );
}
