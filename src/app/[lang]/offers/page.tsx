'use client';



import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function OffersPage() {
    const { t } = useTranslation();

    const OFFERS = [
        {
            title: t.offersPage.offer1Title,
            description: t.offersPage.offer1Desc,
            image: "/images/vsoe/vsoe-grand-suite.jpg",
            code: "GRAND25"
        },
        {
            title: t.offersPage.offer2Title,
            description: t.offersPage.offer2Desc,
            image: "/images/vsoe/vsoe-exterior-night.jpg",
            code: "ADVANCE"
        },
        {
            title: t.offersPage.offer3Title,
            description: t.offersPage.offer3Desc,
            image: "/images/vsoe/vsoe-venice-night.jpg",
            code: "CIPRIANI"
        }
    ];

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            
            <HeroSection
                title={t.offersPage.title}
                subtitle={t.offersPage.subtitle}
                backgroundImage="/images/vsoe/vsoe-champagne-detail.jpg"
            />

            <section className="py-24 px-6 md:px-12 bg-[#f4f1ea]">
                <div className="max-w-7xl mx-auto space-y-16">
                    {OFFERS.map((offer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-xl"
                        >
                            <div className="relative h-64 lg:h-auto min-h-[300px]">
                                <Image
                                    src={offer.image}
                                    alt={offer.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-12 flex flex-col justify-center">
                                <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">{t.offersPage.limited}</span>
                                <h2 className="text-3xl font-serif text-vsoe-midnight mb-6">{offer.title}</h2>
                                <p className="text-vsoe-midnight/70 mb-8 leading-relaxed">{offer.description}</p>
                                <div className="flex flex-col sm:flex-row gap-6 items-center">
                                    <Link href="/book" className="px-8 py-3 bg-vsoe-midnight text-white hover:bg-vsoe-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                                        {t.offersPage.bookNow}
                                    </Link>
                                    <span className="text-xs text-vsoe-midnight/40 tracking-widest font-mono">
                                        {t.offersPage.quote} {offer.code}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            
        </main>
    );
}
