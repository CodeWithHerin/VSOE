import React, { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AvailabilityCalendar from '@/components/ui/AvailabilityCalendar';
import JourneyListFetcher from '@/components/booking/JourneyListFetcher';
import { getAvailableJourneys } from '@/app/book/actions';

// Skeleton Loader for the Grid
function GridSkeleton() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-white/5 rounded-sm animate-pulse flex flex-col items-center justify-center border border-white/10">
                    <span className="text-vsoe-gold/20 text-4xl font-serif">VSOE</span>
                </div>
            ))}
        </div>
    );
}

// Helper to fetch for calendar independently
async function CalendarWrapper() {
    const journeys = await getAvailableJourneys();
    return <AvailabilityCalendar journeys={journeys} />;
}

export default async function BookingPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif text-vsoe-gold mb-6">Select Your Journey</h1>
                    <p className="text-vsoe-cream/60 tracking-[0.2em] uppercase text-sm">Begin your story</p>
                </div>

                {/* Suspense Boundary for Instant Navigation */}
                <Suspense fallback={<GridSkeleton />}>
                    <JourneyListFetcher />
                </Suspense>
            </div>

            {/* Availability Calendar Section - Suspended to prevent blocking */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase">Plan Your Journey</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-vsoe-cream">View Availability</h2>
                        <p className="text-white/70 text-lg leading-relaxed max-w-md">
                            Our journeys are intimate and exclusive, with limited capacity. Browse our calendar to find the perfect date for your grand tour.
                        </p>
                        <div className="flex gap-8 text-sm text-vsoe-gold/80 font-serif italic">
                            <span>* High demand for Summer 2025</span>
                            <span>* Private charters available</span>
                        </div>
                    </div>
                    <div>
                        <Suspense fallback={<div className="h-64 bg-white/5 animate-pulse rounded-sm" />}>
                            <CalendarWrapper />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Concierge Service */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-vsoe-midnight text-vsoe-cream p-12 rounded-sm border border-vsoe-gold/30 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4">
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase">White Glove Service</span>
                        <h2 className="text-3xl font-serif">Prefer a Guided Experience?</h2>
                        <p className="text-white/70 max-w-xl">
                            Our travel consultants can assist with complex itineraries, private transfers, and special requests.
                            Schedule a private consultation or chat with us securely.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-white text-vsoe-midnight px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-vsoe-gold transition-colors">
                            Schedule Call
                        </button>
                        <button className="border border-white/30 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-vsoe-midnight transition-colors">
                            WhatsApp Us
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main >
    );
}
