'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';
import Link from 'next/link';

export default function PackagesPage() {
    return (
        <StandardPageLayout
            title="Packages & Tours"
            subtitle="Curated Itineraries"
            heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop"
        >
            <h3>Expertly Curated Journeys</h3>
            <p>
                Beyond the rail journey itself, we offer comprehensive packages that include stays at our partner hotels, private transfers, and unique cultural experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="border border-vsoe-gold/20 p-8 hover:bg-white/5 transition-colors">
                    <h4 className="text-xl font-serif text-vsoe-gold mb-2">The Venetian Celebration</h4>
                    <p className="text-sm text-vsoe-cream/60 mb-4">Paris to Venice + 2 Nights at Hotel Cipriani</p>
                    <p className="mb-6">Includes transfers by private launch, a guided tour of the Doge's Palace, and a sunset dinner at Oro.</p>
                    <Link href="/book" className="text-xs font-bold uppercase tracking-widest border-b border-vsoe-gold pb-1">View Details</Link>
                </div>

                <div className="border border-vsoe-gold/20 p-8 hover:bg-white/5 transition-colors">
                    <h4 className="text-xl font-serif text-vsoe-gold mb-2">London Estate</h4>
                    <p className="text-sm text-vsoe-cream/60 mb-4">London to Venice + 1 Night at The Cadogan</p>
                    <p className="mb-6">Begin your journey in Chelsea with a private shopping experience before boarding the British Pullman.</p>
                    <Link href="/book" className="text-xs font-bold uppercase tracking-widest border-b border-vsoe-gold pb-1">View Details</Link>
                </div>
            </div>

            <p>
                For bespoke itinerary planning, please contact our Reservations team.
            </p>
        </StandardPageLayout>
    );
}
