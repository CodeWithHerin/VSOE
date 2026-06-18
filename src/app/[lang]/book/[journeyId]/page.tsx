import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getJourney } from '@/lib/data/journeys';
import { getJourneyImage } from '@/lib/journeyImages';
import Image from 'next/image';

// Force server-render on every request — cabin availability must be live
export const dynamic = 'force-dynamic';

import BookingWizard from '@/components/booking/BookingWizard';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default async function JourneyPage({ params }: { params: Promise<{ journeyId: string; lang: string }> }) {
    const { journeyId, lang } = await params;
    const session = await auth();
    if (!session?.user) {
        redirect(`/${lang}/login?callbackUrl=/${lang}/book/${journeyId}`);
    }

    const journey = await getJourney(journeyId);

    if (!journey) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            

            {/* Header */}
            <div className="relative h-[50vh] flex items-end pb-20 px-6">
                <div className="absolute inset-0">
                    <Image
                        src={getJourneyImage(journey.name)}
                        alt={journey.name}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">The Journey</span>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-6">{journey.name}</h1>
                            <div className="flex gap-8 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-vsoe-gold" />
                                    <span>{new Date(journey.departure).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-vsoe-gold" />
                                    <span>{new Date(journey.departure).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Wizard Section */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 -mt-10 md:-mt-20">
                <div className="bg-vsoe-midnight border border-white/10 p-8 md:p-16 rounded-sm shadow-2xl">
                    <BookingWizard journey={journey} />
                </div>
            </div>

            {/* Itinerary Preview (Static for now) */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <h3 className="text-2xl font-serif text-vsoe-gold mb-8 text-center">Your Itinerary</h3>
                <div className="space-y-12">
                    <div className="flex gap-4 sm:gap-8 group">
                        <div className="w-14 sm:w-24 text-right pt-2 text-sm text-vsoe-gold font-bold">Day 1</div>
                        <div className="relative border-l border-white/20 pl-4 sm:pl-8 pb-12">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-vsoe-gold" />
                            <h4 className="text-xl font-serif text-white mb-2">Departure</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Board the blue and gold carriages. Your steward will welcome you to your cabin with a glass of sparkling wine.
                                Prepare for a 4-course dinner in one of our restaurant cars.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 sm:gap-8 group">
                        <div className="w-14 sm:w-24 text-right pt-2 text-sm text-vsoe-gold font-bold">Day 2</div>
                        <div className="relative border-l border-white/20 pl-4 sm:pl-8">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-vsoe-gold" />
                            <h4 className="text-xl font-serif text-white mb-2">Arrival</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Awake to the stunning scenery of the Alps. Enjoy a continental breakfast in your cabin
                                before we arrive at our destination.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            
        </main>
    );
}
