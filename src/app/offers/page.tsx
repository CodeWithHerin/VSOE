'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const OFFERS = [
    {
        title: "The Grand Suite Experience",
        description: "Complimentary transfers, free-flowing champagne, and a private caviar tasting when you book a Grand Suite for Spring 2025.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
        code: "GRAND25"
    },
    {
        title: "Advance Purchase",
        description: "Plan your journey early and enjoy preferred rates on select Historic Cabins for departures in late 2025.",
        image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2674&auto=format&fit=crop",
        code: "ADVANCE"
    },
    {
        title: "Venetian Extension",
        description: "Extend your stay with two nights at the Hotel Cipriani, creating the ultimate Venetian itinerary.",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2566&auto=format&fit=crop",
        code: "CIPRIANI"
    }
];

export default function OffersPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            <Navbar />
            <HeroSection
                title="Exclusive Offers"
                subtitle="Limited Invitations"
                backgroundImage="https://images.unsplash.com/photo-1565551224906-3482fd929940?q=80&w=2670&auto=format&fit=crop"
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
                                <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Limited Time</span>
                                <h2 className="text-3xl font-serif text-vsoe-midnight mb-6">{offer.title}</h2>
                                <p className="text-vsoe-midnight/70 mb-8 leading-relaxed">{offer.description}</p>
                                <div className="flex flex-col sm:flex-row gap-6 items-center">
                                    <Link href="/book" className="px-8 py-3 bg-vsoe-midnight text-white hover:bg-vsoe-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                                        Book Now
                                    </Link>
                                    <span className="text-xs text-vsoe-midnight/40 tracking-widest font-mono">
                                        QUOTE CODE: {offer.code}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
