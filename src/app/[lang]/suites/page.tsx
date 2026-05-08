'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import CabinShowcase from '@/components/suites/CabinShowcase';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function SuitesPage() {
    const { t } = useTranslation();
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            {/* Hero */}
            <div className="relative">
                <div className="absolute inset-0 h-[80vh] overflow-hidden">
                    <Image
                        src="/images/vsoe/vsoe-grand-suite.jpg"
                        alt="Grand Suite Interior"
                        fill
                        className="object-cover opacity-50"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/50 to-transparent" />
                </div>

                <div className="relative z-10 h-[80vh] flex flex-col items-center justify-center text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-vsoe-gold text-sm font-bold tracking-[0.4em] uppercase mb-6"
                    >
                        {t.suitesPage.accom}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-serif text-white mb-8"
                    >
                        {t.suitesPage.title}
                    </motion.h1>
                </div>
            </div>


            {/* Intro Text */}
            <section className="py-24 px-6 md:px-12 text-center bg-vsoe-midnight relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="block text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">
                        {t.suitesPage.art}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-vsoe-cream mb-8">
                        {t.suitesPage.elegance}
                    </h2>
                    <p className="text-xl font-light text-vsoe-cream/70 leading-relaxed">
                        {t.suitesPage.desc}
                    </p>
                </motion.div>
            </section>

            {/* Interactive Showcase */}
            <CabinShowcase />

            <Footer />
        </main>
    );
}
