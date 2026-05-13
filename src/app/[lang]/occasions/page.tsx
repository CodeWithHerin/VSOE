'use client';



import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function OccasionsPage() {
    const { t } = useTranslation();
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            
            <HeroSection
                title={t.occasionsPage.title}
                subtitle={t.occasionsPage.subtitle}
                backgroundImage="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2670&auto=format&fit=crop"
            />

            <section className="py-24 px-6 md:px-12 bg-white text-vsoe-midnight">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block">{t.occasionsPage.suitedFor}</span>
                        <h2 className="text-5xl md:text-6xl font-serif">{t.occasionsPage.wedTitle}</h2>
                        <p className="text-vsoe-midnight/70 text-lg leading-relaxed font-light">
                            {t.occasionsPage.wedDesc}
                        </p>
                        <ul className="space-y-4 pt-4">
                            {[t.occasionsPage.wedFeat1, t.occasionsPage.wedFeat2, t.occasionsPage.wedFeat3, t.occasionsPage.wedFeat4].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-vsoe-midnight/80 font-serif italic text-lg">
                                    <div className="w-1.5 h-1.5 bg-vsoe-gold rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-8">
                            <Link href="/contact" className="inline-block px-8 py-4 bg-vsoe-midnight text-white hover:bg-vsoe-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                                {t.occasionsPage.inquire}
                            </Link>
                        </div>
                    </div>
                    <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1623056027376-79ba579b2827?q=80&w=2670&auto=format&fit=crop"
                            alt="Wedding Couple"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-[#f4f1ea]">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-serif text-vsoe-midnight mb-6">{t.occasionsPage.charterTitle}</h2>
                    <p className="max-w-2xl mx-auto text-vsoe-midnight/60">
                        {t.occasionsPage.charterDesc}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[
                        { title: t.occasionsPage.event1, image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop" },
                        { title: t.occasionsPage.event2, image: "https://images.unsplash.com/photo-1530103862676-de3c9ef59af2?q=80&w=2670&auto=format&fit=crop" },
                        { title: t.occasionsPage.event3, image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[4/5] cursor-pointer overflow-hidden"
                        >
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-3xl font-serif text-white text-center px-4">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            
        </main>
    );
}
