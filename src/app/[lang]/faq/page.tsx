'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '@/components/ui/HeroSection';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQ_SECTIONS = [
    {
        heading: 'Before You Travel',
        items: [
            {
                q: 'What is the dress code?',
                a: 'Evenings on board are formal occasions. Guests are requested to wear black tie (tuxedo or dinner jacket) or an elegant evening gown for dinner in the restaurant cars. Smart casual attire is welcome during the day. This is a portfolio demonstration — dress code policies may differ on the actual service.'
            },
            {
                q: 'What luggage is permitted?',
                a: 'Due to the historic nature of the carriages, storage space is limited. Guests are requested to bring no more than one medium-sized suitcase per person, plus a small cabin bag. Oversized luggage cannot be accommodated. This is a portfolio demonstration — specific restrictions may differ on the actual service.'
            },
            {
                q: 'How do I reach the departure station?',
                a: 'Guests travelling from London depart from London Victoria Station. Continental departures originate from Paris Gare de l\'Est. Our travel consultants can arrange private transfers, hotel recommendations, and pre-departure experiences at each city. This is a portfolio demonstration — contact details are for display purposes only.'
            }
        ]
    },
    {
        heading: 'On Board',
        items: [
            {
                q: 'Can dietary requirements be accommodated?',
                a: 'Our culinary team is delighted to accommodate dietary requirements including vegetarian, vegan, gluten-free, and most allergies. Please notify us at least 7 days prior to departure. This is a portfolio demonstration — actual accommodation may differ on the real service.'
            },
            {
                q: 'Is Wi-Fi available on board?',
                a: 'By design, the Venice Simplon-Orient-Express is a Wi-Fi free environment. We believe the journey itself — the passing landscapes, the conversation, the unhurried pace — is best experienced without distraction. Many guests describe the digital detox as an unexpected highlight of their trip.'
            },
            {
                q: 'Are children permitted on board?',
                a: 'The Venice Simplon-Orient-Express is designed for adult travellers seeking a refined and tranquil experience. Guests must be 12 years or older to travel. This is a portfolio demonstration — age policies may differ on the actual service.'
            }
        ]
    },
    {
        heading: 'Bookings & Practical',
        items: [
            {
                q: 'How do I amend or cancel a booking?',
                a: 'This is a portfolio demonstration. No real bookings are made through this site, and there is nothing to cancel or amend. On the real service, amendments and cancellations would be handled by the reservations team. The cancellation policy on the actual service requires notice of at least 60 days for a deposit refund.'
            },
            {
                q: 'Is travel insurance recommended?',
                a: 'Comprehensive travel insurance is strongly recommended for any journey of this nature, covering cancellation, delay, medical expenses, and personal liability. We suggest ensuring your policy covers the full journey value. This advice applies equally to portfolio demonstrations and real travel.'
            }
        ]
    }
];

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={open}
            >
                <span className="text-sm font-serif text-vsoe-cream/90 group-hover:text-vsoe-gold transition-colors duration-300 pr-8 leading-relaxed">
                    {q}
                </span>
                <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-vsoe-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}
            >
                <p className="text-sm text-vsoe-cream/60 font-sans leading-relaxed pr-8">
                    {a}
                </p>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            <HeroSection
                title="Frequently Asked Questions"
                subtitle="Everything You Need to Know"
                backgroundImage="/images/vsoe/vsoe-london-station.jpg"
            />

            <div className="max-w-3xl mx-auto px-6 md:px-8 py-20 md:py-28">

                {/* Intro */}
                <p className="text-sm text-vsoe-cream/60 font-sans leading-relaxed mb-16 max-w-xl">
                    Planning your journey with us? Below you will find answers to the questions
                    our guests ask most often. For anything not covered here, our travel
                    consultants are delighted to assist.
                </p>

                {/* Sections */}
                <div className="space-y-16">
                    {FAQ_SECTIONS.map((section) => (
                        <div key={section.heading}>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-vsoe-gold font-bold mb-1">
                                {section.heading}
                            </h2>
                            <div className="w-8 h-[1px] bg-vsoe-gold/40 mb-6" />
                            <div>
                                {section.items.map((item) => (
                                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 pt-12 border-t border-white/10 text-center">
                    <p className="text-sm text-vsoe-cream/50 font-sans mb-6">
                        Didn't find your answer?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block text-[11px] uppercase tracking-[0.2em] font-bold border border-vsoe-gold text-vsoe-gold px-8 py-3 hover:bg-vsoe-gold hover:text-vsoe-midnight transition-colors duration-300"
                    >
                        Contact Our Team
                    </Link>
                </div>

            </div>
        </main>
    );
}
