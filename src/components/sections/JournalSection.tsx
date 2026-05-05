'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';



export default function JournalSection() {
    const { t } = useTranslation();
    
    const STORIES = [
        {
            id: 1,
            category: 'Style',
            title: t.journal.article1,
            excerpt: 'Why black tie remains the gold standard for dinner on board.',
            image: '/images/vsoe/vsoe-exterior-night.jpg'
        },
        {
            id: 2,
            category: 'Heritage',
            title: t.journal.article2,
            excerpt: 'Uncovering the mysteries hidden within the marquetry of Car 3674.',
            image: '/images/vsoe/vsoe-bar-car.jpg'
        },
        {
            id: 3,
            category: 'Destinations',
            title: t.journal.article3,
            excerpt: 'The perfect itinerary for 24 hours in the Floating City.',
            image: '/images/vsoe/vsoe-countryside-window.jpg'
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-vsoe-cream text-vsoe-blue">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6 md:gap-0">
                    <div>
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.journal.fromJournal}</span>
                        <h2 className="text-4xl md:text-5xl font-serif">{t.journal.narrative}</h2>
                    </div>
                    <Link href="/stories" className="flex items-center gap-2 text-xs uppercase tracking-widest border-b border-vsoe-blue/30 pb-1 hover:border-vsoe-blue transition-colors">
                        {t.journal.read} <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {STORIES.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-vsoe-gold mb-2 block">{story.category}</span>
                            <h3 className="text-2xl font-serif mb-3 group-hover:text-vsoe-gold transition-colors">{story.title}</h3>
                            <p className="text-vsoe-blue/60 font-sans text-sm leading-relaxed">{story.excerpt}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
