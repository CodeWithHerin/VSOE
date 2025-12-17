'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const STORIES = [
    {
        id: 1,
        title: "The Art of Slow Travel",
        category: "Lifestyle",
        excerpt: "Why taking the long way round is the ultimate luxury in a fast-paced world.",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2684&auto=format&fit=crop",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Midnight in Venice",
        category: "Destinations",
        excerpt: "Our guide to the secret side of La Serenissima after the crowds have dispersed.",
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2600&auto=format&fit=crop",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "The Chef's Table",
        category: "Gastronomy",
        excerpt: "Executive Chef Jean Imbert reveals the challenges of cooking Michelin-star meals at 100km/h.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Restoring a Legend",
        category: "Heritage",
        excerpt: "The painstaking craftsmanship behind the restoration of the 1920s sleeping cars.",
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop",
        readTime: "10 min read"
    }
];

export default function StoriesPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            <HeroSection
            // title="The Journal"
            // subtitle="Stories from the Rails"
            // backgroundImage="https://images.unsplash.com/photo-1534053916961-07379d48b11a?q=80&w=2670&auto=format&fit=crop"
            />
            {/* Custom Hero Overlay since HeroSection might be video based */}
            <div className="absolute top-0 w-full h-[80vh] flex items-center justify-center pointer-events-none z-10">
                <div className="text-center">
                    <span className="text-vsoe-gold text-sm font-bold tracking-[0.4em] uppercase mb-6 block">The Journal</span>
                    <h1 className="text-6xl md:text-8xl font-serif text-white">Stories from the Rails</h1>
                </div>
            </div>


            {/* Featured Article (Top) */}
            <section className="py-24 px-6 md:px-12 bg-white text-vsoe-midnight">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="aspect-[4/3] overflow-hidden relative">
                        <Image
                            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop"
                            alt="Featured Story"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div>
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Editor's Pick</span>
                        <h2 className="text-5xl font-serif mb-6 leading-tigher">A Love Letter to Paris</h2>
                        <p className="text-vsoe-midnight/70 font-sans text-lg mb-8 leading-relaxed">
                            Discover the timeless allure of the French capital, from the hidden jazz bars of Montmartre to the early morning mist over the Seine.
                        </p>
                        <Link href="#" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-vsoe-midnight pb-1 hover:text-vsoe-gold transition-colors">
                            Read Article
                        </Link>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 px-6 md:px-12 bg-[#f4f1ea]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {STORIES.map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                                        {story.category}
                                    </div>
                                </div>
                                <div className="pr-4">
                                    <span className="text-black/40 text-[10px] uppercase tracking-widest mb-2 block">{story.readTime}</span>
                                    <h3 className="text-3xl font-serif mb-3 group-hover:text-vsoe-gold transition-colors">{story.title}</h3>
                                    <p className="text-black/60 font-sans text-sm leading-relaxed">{story.excerpt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-32 bg-vsoe-midnight text-center px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-serif text-vsoe-cream mb-6">Join the Society</h2>
                    <p className="text-vsoe-cream/60 mb-10">
                        Receive exclusive invitations, travel inspiration, and news from the rails directly to your inbox.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-vsoe-gold transition-colors"
                        />
                        <button className="bg-vsoe-gold text-vsoe-midnight px-10 py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
