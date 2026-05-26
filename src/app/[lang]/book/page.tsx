'use client';

import React, { useEffect, useState } from 'react';
import JourneyGrid from '@/components/booking/JourneyGrid';
import BookPageClient from './BookPageClient';

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

export default function BookingPage() {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <BookPageClient
            journeyList={<JourneyGrid journeys={journeys} loading={loading} error={error} />}
            calendar={null}
            skeleton={null}
        />
    );
}
