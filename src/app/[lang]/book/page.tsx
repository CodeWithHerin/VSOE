'use client';

import React, { useEffect, useState, Suspense } from 'react';
import JourneyGrid from '@/components/booking/JourneyGrid';
import BookPageClient from './BookPageClient';
import { useSearchParams } from 'next/navigation';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';

export interface Journey {
    id: string;
    name: string;
    departureDate: string;
    price: number;
    image: string;
    description: string;
    availableCabins: number;
    options?: {
        historic?: { id: string; price: number; cabinId: string; cabin: { type: string } };
        suite?: { id: string; price: number; cabinId: string; cabin: { type: string } };
        grand_suite?: { id: string; price: number; cabinId: string; cabin: { type: string } };
    };
}

function BookingPageContent() {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const routeParam = searchParams?.get('route');

    useEffect(() => {
        fetch('/api/journeys')
            .then(r => r.json())
            .then(data => {
                setJourneys(data.journeys ?? []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch journeys:', err);
                setError('Could not load journeys. Please try again.');
                setLoading(false);
            });
    }, []);

    const filteredJourneys = journeys.filter(j => {
        if (!routeParam) return true;
        if (routeParam === 'classic') return j.name === 'Paris to Venice';
        if (routeParam === 'gateway') return j.name === 'London to Venice';
        if (routeParam === 'italian') return j.name === 'Paris to Istanbul';
        return true;
    });

    const getRouteName = (param: string) => {
        if (param === 'classic') return 'The Classic Route (Paris to Venice)';
        if (param === 'gateway') return 'The Gateway (London to Venice)';
        if (param === 'italian') return 'The Italian Voyage (Paris to Istanbul)';
        return param;
    };

    const showFilterHeader = routeParam && ['classic', 'gateway', 'italian'].includes(routeParam);

    const journeyListContent = (
        <div className="space-y-8">
            {showFilterHeader && !loading && !error && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
                    <p className="text-sm text-vsoe-cream/80">
                        Showing <strong className="text-vsoe-gold">{filteredJourneys.length}</strong> {filteredJourneys.length === 1 ? 'journey' : 'journeys'} for <span className="italic font-serif text-white">{getRouteName(routeParam)}</span>
                    </p>
                    <Link href="/book" className="text-xs uppercase tracking-widest text-vsoe-gold hover:text-white transition-colors self-start sm:self-auto">
                        View all journeys
                    </Link>
                </div>
            )}
            <JourneyGrid journeys={filteredJourneys} loading={loading} error={error} />
        </div>
    );

    return (
        <BookPageClient
            journeyList={journeyListContent}
            calendar={null}
            skeleton={null}
        />
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={
            <BookPageClient
                journeyList={<JourneyGrid journeys={[]} loading={true} error={null} />}
                calendar={null}
                skeleton={null}
            />
        }>
            <BookingPageContent />
        </Suspense>
    );
}
