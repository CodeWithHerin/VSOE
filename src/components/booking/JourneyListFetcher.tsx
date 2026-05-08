import React from 'react';
import JourneyGrid from '@/components/booking/JourneyGrid';
import { getAvailableJourneys } from '@/app/[lang]/book/actions';

export default async function JourneyListFetcher() {
    // This await is what was blocking the whole page.
    // Now it only blocks this component.
    const journeys = await getAvailableJourneys();

    return <JourneyGrid journeys={journeys} />;
}
