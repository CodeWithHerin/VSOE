'use client';

import { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import { journeys } from '@/data/journeys';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const journey = journeys.find((j) => j.id === id);

    if (!journey) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue">
            <Navbar />
            <HeroSection
                title={journey.name}
                subtitle={journey.duration}
                backgroundImage={journey.image}
            />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">The Journey</span>
                            <h2 className="text-4xl font-serif mb-6">Overview</h2>
                            <p className="text-lg leading-relaxed text-vsoe-blue/80 font-sans">
                                {journey.description}
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-vsoe-blue/80 font-sans">
                                Embark on a voyage through time and landscape. From the moment you step aboard,
                                you are transported to an era of elegance and charm. Watch the scenery unfold
                                from your private cabin or while enjoying exquisite cuisine in the dining cars.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif mb-6">Itinerary Highlights</h3>
                            <div className="space-y-8 border-l border-vsoe-blue/10 ml-3 pl-8 relative">
                                {journey.stops.map((stop, index) => (
                                    <div key={stop} className="relative">
                                        <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-vsoe-gold border-4 border-vsoe-cream" />
                                        <h4 className="text-xl font-serif mb-2">{stop}</h4>
                                        <p className="text-vsoe-blue/60 text-sm">
                                            {index === 0 ? 'Departure' : index === journey.stops.length - 1 ? 'Arrival' : 'Stopover'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 shadow-xl rounded-sm border border-vsoe-gold/10 sticky top-32">
                            <h3 className="text-2xl font-serif mb-6">Journey Details</h3>
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4 text-vsoe-blue/80">
                                    <Clock className="text-vsoe-gold" size={20} />
                                    <span>{journey.duration}</span>
                                </div>
                                <div className="flex items-center gap-4 text-vsoe-blue/80">
                                    <MapPin className="text-vsoe-gold" size={20} />
                                    <span>{journey.stops.length} Stops</span>
                                </div>
                                <div className="flex items-center gap-4 text-vsoe-blue/80">
                                    <Calendar className="text-vsoe-gold" size={20} />
                                    <span>Mar - Nov</span>
                                </div>
                            </div>
                            <Link
                                href="/book"
                                className="block w-full bg-vsoe-midnight text-vsoe-gold text-center py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-vsoe-blue transition-colors"
                            >
                                Check Availability
                            </Link>
                            <p className="text-center text-xs text-vsoe-blue/40 mt-4">
                                Prices vary by season and cabin type.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
