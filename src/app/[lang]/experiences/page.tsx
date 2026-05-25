'use client';



import HeroSection from '@/components/ui/HeroSection';
import { experiences } from '@/data/experiences';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function ExperiencesPage() {
    const { t } = useTranslation();
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            
            <HeroSection
                title={t.experiencesPage.title}
                subtitle={t.experiencesPage.subtitle}
                backgroundImage="/images/vsoe/vsoe-bar-car.jpg"
            />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-24 space-y-32">
                {experiences.map((exp, index) => {
                    const expT = t.experiencesData[exp.id as keyof typeof t.experiencesData];
                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image */}
                            <div className="flex-1 w-full relative aspect-[4/3] overflow-hidden group">
                                <div className="absolute inset-0 border border-vsoe-gold/20 z-10 m-4 transition-all duration-700 group-hover:m-0" />
                                <Image
                                    src={exp.image}
                                    alt={expT.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block">
                                    {expT.category}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-serif text-white">
                                    {expT.title}
                                </h2>
                                <p className="text-white/70 leading-relaxed font-sans text-lg max-w-xl mx-auto lg:mx-0">
                                    {expT.description}
                                </p>
                                <div className="pt-8">
                                    <button className="px-8 py-3 border border-vsoe-gold text-vsoe-gold hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                                        {t.experiencesPage.discover}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            
        </main>
    );
}
