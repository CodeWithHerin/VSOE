import React, { Suspense } from 'react';

// Force server-render on every request — DB data must never be statically cached
export const dynamic = 'force-dynamic';

import AvailabilityCalendar from '@/components/ui/AvailabilityCalendar';
import JourneyListFetcher from '@/components/booking/JourneyListFetcher';
import { getAvailableJourneys } from '@/app/[lang]/book/actions';

import BookPageClient from './BookPageClient';

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
        <BookPageClient 
            journeyList={<JourneyListFetcher />} 
            calendar={<CalendarWrapper />} 
            skeleton={<GridSkeleton />} 
        />
    );
}
