'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const STORIES = [
    {
        id: 1,
        category: 'Style',
        title: 'The Art of Dress Code',
        excerpt: 'Why black tie remains the gold standard for dinner on board.',
        image: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 2,
        category: 'Heritage',
        title: 'Secrets of the Blue Train',
        excerpt: 'Uncovering the mysteries hidden within the marquetry of Car 3674.',
        image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: 3,
        category: 'Destinations',
        title: 'Venice: A Love Letter',
        excerpt: 'The perfect itinerary for 24 hours in the Floating City.',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2566&auto=format&fit=crop'
    }
];

export default function JournalSection() {
    return (
        <section className="py-32 bg-vsoe-cream text-vsoe-blue">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">The Journal</span>
                        <h2 className="text-4xl md:text-5xl font-serif">Stories from the Rails</h2>
                    </div>
                    <Link href="/stories" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest border-b border-vsoe-blue/30 pb-1 hover:border-vsoe-blue transition-colors">
                        View All Stories <ArrowRight size={14} />
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
