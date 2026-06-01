'use client';

import HeroSection from '@/components/ui/HeroSection';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import {
    Clock,
    MapPin,
    Luggage,
    Wine,
    ShieldCheck,
    Utensils,
    Star,
    ArrowRight
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const TIMELINE = [
    {
        time: '14:00',
        title: 'Arrive at the Station',
        desc: 'Arrive at London Victoria Station or Paris Gare de l\'Est. Look for the blue and gold VSOE check-in desk in the main concourse.'
    },
    {
        time: '14:30',
        title: 'Check-In & Welcome Champagne',
        desc: 'Our stewards will escort you to the platform. A glass of champagne awaits as you board and are shown to your cabin.'
    },
    {
        time: '15:00',
        title: 'Departure',
        desc: 'The train departs. Settle into your cabin, explore the carriages, and let the journey begin.'
    },
    {
        time: '19:30',
        title: 'First Seating for Dinner',
        desc: 'Your steward will advise on your allocated dining time. Evening dress is required in the restaurant cars from this point.'
    },
    {
        time: '23:00',
        title: 'Cabin Turndown',
        desc: 'While you dine, your steward will prepare your cabin for the night. Sleep as Europe passes quietly outside.'
    },
    {
        time: 'Morning',
        title: 'Arrival',
        desc: 'Wake to your destination city. Breakfast is served in your cabin or in the restaurant car before arrival.'
    }
];

const PACKING = [
    { icon: Wine, label: 'Black-tie attire', desc: 'Required for evening dining. Tuxedo or dinner jacket for gentlemen; evening gown or elegant dress for ladies.' },
    { icon: Luggage, label: 'Compact luggage only', desc: 'One medium suitcase per person maximum. Storage space in historic cabins is limited by design.' },
    { icon: ShieldCheck, label: 'Travel documents', desc: 'Valid passport and any required visas for all countries traversed. Check requirements for your specific route.' },
    { icon: Utensils, label: 'Dietary information', desc: 'Notify us of any requirements at least 7 days before departure. Our chefs accommodate most needs.' },
    { icon: Star, label: 'Smart casual for daytime', desc: 'Relaxed but elegant attire for exploring the carriages and viewing the passing landscapes.' },
    { icon: MapPin, label: 'Arrival arrangements', desc: 'Pre-book transfers, hotels, or excursions at your destination. Our concierge can assist.' }
];

const STATIONS = [
    {
        city: 'London',
        station: 'London Victoria Station',
        detail: 'Depart aboard the British Pullman from Platform 2. The blue carpet marks the start of your journey.',
        note: 'Eurostar connection from St. Pancras for guests arriving from continental Europe.'
    },
    {
        city: 'Paris',
        station: 'Paris Gare de l\'Est',
        detail: 'Board the Venice Simplon-Orient-Express at the historic eastern terminus of Paris.',
        note: 'Taxi and metro connections available from all major Paris stations and CDG airport.'
    }
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DepartureInfoPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            <HeroSection
                title="Before You Travel"
                subtitle="Everything You Need to Know"
                backgroundImage="/images/vsoe/vsoe-paris-departure.jpg"
            />

            {/* Demo notice */}
            <div className="bg-vsoe-gold/5 border-b border-vsoe-gold/20">
                <div className="max-w-5xl mx-auto px-6 md:px-8 py-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-vsoe-gold/70 text-center font-sans">
                        Portfolio Demonstration — Information shown is representative of the real service
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28 space-y-28">

                {/* ── Your Day of Departure ──────────────────────────────── */}
                <section>
                    <div className="mb-12">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-vsoe-gold font-bold mb-2">Your Journey Begins</p>
                        <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-4" />
                        <h2 className="font-serif text-3xl md:text-4xl text-vsoe-cream">The Day of Departure</h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[52px] top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />

                        <div className="space-y-0">
                            {TIMELINE.map((step, i) => (
                                <div key={i} className="flex gap-6 md:gap-10 group">
                                    {/* Time */}
                                    <div className="flex-shrink-0 w-[52px] text-right">
                                        <span className="text-[10px] uppercase tracking-widest text-vsoe-gold/60 font-bold leading-none block pt-5">
                                            {step.time}
                                        </span>
                                    </div>

                                    {/* Dot + content */}
                                    <div className="flex gap-6 pb-10 flex-1">
                                        <div className="flex-shrink-0 mt-5 hidden md:block">
                                            <div className="w-2 h-2 rounded-full bg-vsoe-gold/40 group-hover:bg-vsoe-gold transition-colors duration-300 relative z-10" />
                                        </div>
                                        <div className="pt-4">
                                            <h3 className="font-serif text-lg text-vsoe-cream mb-2 group-hover:text-vsoe-gold transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-vsoe-cream/55 font-sans leading-relaxed max-w-lg">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── What to Bring ─────────────────────────────────────── */}
                <section>
                    <div className="mb-12">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-vsoe-gold font-bold mb-2">Packing Guide</p>
                        <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-4" />
                        <h2 className="font-serif text-3xl md:text-4xl text-vsoe-cream">What to Bring</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PACKING.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className="flex gap-5 p-6 border border-white/8 hover:border-vsoe-gold/30 transition-colors duration-300 group"
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Icon size={18} className="text-vsoe-gold/60 group-hover:text-vsoe-gold transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-serif text-vsoe-cream mb-1">{item.label}</p>
                                        <p className="text-xs text-vsoe-cream/50 font-sans leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Departure Stations ────────────────────────────────── */}
                <section>
                    <div className="mb-12">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-vsoe-gold font-bold mb-2">Getting There</p>
                        <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-4" />
                        <h2 className="font-serif text-3xl md:text-4xl text-vsoe-cream">Departure Stations</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {STATIONS.map((s) => (
                            <div key={s.city} className="border border-white/10 p-8 hover:border-vsoe-gold/30 transition-colors duration-300">
                                <div className="flex items-start gap-3 mb-4">
                                    <MapPin size={16} className="text-vsoe-gold mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-vsoe-gold/60 font-bold mb-1">{s.city}</p>
                                        <h3 className="font-serif text-xl text-vsoe-cream">{s.station}</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-vsoe-cream/60 font-sans leading-relaxed mb-3">{s.detail}</p>
                                <p className="text-xs text-vsoe-cream/40 font-sans leading-relaxed border-t border-white/8 pt-3">{s.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────────── */}
                <section className="border-t border-white/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="font-serif text-2xl text-vsoe-cream mb-2">Ready to Board?</h3>
                        <p className="text-sm text-vsoe-cream/50 font-sans">Reserve your cabin and begin your journey.</p>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href="/book"
                            className="inline-flex items-center gap-2 bg-vsoe-gold text-vsoe-midnight px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
                        >
                            Reserve a Cabin <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-2 border border-white/20 text-vsoe-cream/70 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-vsoe-gold hover:text-vsoe-gold transition-colors duration-300"
                        >
                            Read the FAQ
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}
