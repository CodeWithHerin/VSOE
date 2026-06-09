import Image from 'next/image';
import Link from 'next/link';
import { LocalizedLink } from '@/components/i18n/LocalizedLink';
import { Users, Briefcase, Star, ChevronRight } from 'lucide-react';

export default function GroupsPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">

            {/* Hero */}
            <section className="relative h-[85vh] min-h-[600px] flex items-end pb-24">
                <Image
                    src="/images/vsoe/vsoe-exterior-night.jpg"
                    alt="Venice Simplon-Orient-Express by night"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/40 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <div className="w-12 h-[1px] bg-vsoe-gold mb-8" />
                    <p className="text-vsoe-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Exclusive Hire</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 max-w-3xl leading-tight">
                        The Entire Train.<br />Exclusively Yours.
                    </h1>
                    <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                        For those who demand the extraordinary — a private journey across Europe aboard one of the world&apos;s most legendary trains.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-vsoe-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">The Proposition</p>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">An Unforgettable<br />Group Experience</h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            Whether you are celebrating a milestone, rewarding your most valued clients, or seeking a venue unlike any other, the Venice Simplon-Orient-Express offers a private charter experience that is simply without comparison.
                        </p>
                        <p className="text-white/60 leading-relaxed">
                            From 100 to 200 guests, the entire train becomes your private estate on rails — moving through the landscapes of Europe while your guests dine, celebrate, and create memories that will last a lifetime.
                        </p>
                    </div>
                    <div className="relative h-[500px] rounded-sm overflow-hidden">
                        <Image
                            src="/images/vsoe/vsoe-dining-car.jpg"
                            alt="Private dining aboard the Orient Express"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-vsoe-midnight/20" />
                    </div>
                </div>
            </section>

            {/* Two Feature Sections */}
            <section className="border-t border-white/10">
                {/* Private Charter */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[480px] rounded-sm overflow-hidden order-2 md:order-1">
                            <Image
                                src="/images/vsoe/vsoe-champagne-detail.jpg"
                                alt="Champagne service on the Orient Express"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-vsoe-midnight/20" />
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="w-10 h-10 rounded-full bg-vsoe-gold/10 flex items-center justify-center text-vsoe-gold mb-8 border border-vsoe-gold/20">
                                <Users size={18} />
                            </div>
                            <p className="text-vsoe-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Private Charter</p>
                            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">Weddings, Anniversaries<br />&amp; Private Celebrations</h2>
                            <p className="text-white/60 leading-relaxed mb-8">
                                Imagine exchanging vows in a 1920s dining car as the Alps glide past the window. Or celebrating a milestone birthday as the train crosses the Simplon Pass at dusk. These are the moments only a private charter can create.
                            </p>
                            <ul className="space-y-3 mb-10">
                                {[
                                    'Exclusive use of all carriages',
                                    'Bespoke menus crafted by our Executive Chef',
                                    'Private entertainment and musicians',
                                    'Custom floral and décor arrangements',
                                    'Dedicated butler service for every guest',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                                        <Star size={12} className="text-vsoe-gold flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Corporate Events */}
                <div className="bg-white/[0.02] border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-10 h-10 rounded-full bg-vsoe-gold/10 flex items-center justify-center text-vsoe-gold mb-8 border border-vsoe-gold/20">
                                    <Briefcase size={18} />
                                </div>
                                <p className="text-vsoe-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Corporate Events</p>
                                <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">Beyond the<br />Boardroom</h2>
                                <p className="text-white/60 leading-relaxed mb-8">
                                    Reward your highest performers. Impress your most important clients. Launch your next product in a setting that signals ambition and refinement in equal measure. The Orient Express is the boardroom that moves.
                                </p>
                                <ul className="space-y-3 mb-10">
                                    {[
                                        'Product launches and brand activations',
                                        'Incentive travel for top performers',
                                        'Client entertainment and hospitality',
                                        'Bespoke onboard branding',
                                        'Conference facilities in dining carriages',
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                                            <Star size={12} className="text-vsoe-gold flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative h-[480px] rounded-sm overflow-hidden">
                                <Image
                                    src="/images/vsoe/vsoe-london-station.jpg"
                                    alt="London Victoria Station departure"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-vsoe-midnight/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-12 h-[1px] bg-vsoe-gold mx-auto mb-8" />
                        <p className="text-vsoe-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Get in Touch</p>
                        <h2 className="text-4xl font-serif mb-4">Begin the Conversation</h2>
                        <p className="text-white/50 text-sm">Our groups team will respond within 24 hours.</p>
                        <p className="text-white/30 text-xs mt-3">This is a portfolio demonstration. The form below is not functional.</p>
                    </div>

                    <div className="space-y-8 bg-white/5 border border-white/10 p-10 rounded-sm">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Full Name</label>
                                <input type="text" disabled placeholder="Your name" className="w-full bg-transparent border-b border-white/20 py-3 text-white/40 outline-none placeholder:text-white/20 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Company</label>
                                <input type="text" disabled placeholder="Organisation name" className="w-full bg-transparent border-b border-white/20 py-3 text-white/40 outline-none placeholder:text-white/20 cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Event Type</label>
                            <select disabled className="w-full bg-vsoe-midnight border-b border-white/20 py-3 text-white/40 outline-none cursor-not-allowed appearance-none">
                                <option>Wedding / Private Celebration</option>
                                <option>Corporate Incentive</option>
                                <option>Product Launch</option>
                                <option>Client Entertainment</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Approximate Guest Count</label>
                                <input type="text" disabled placeholder="e.g. 80–120 guests" className="w-full bg-transparent border-b border-white/20 py-3 text-white/40 outline-none placeholder:text-white/20 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Preferred Date</label>
                                <input type="text" disabled placeholder="e.g. September 2026" className="w-full bg-transparent border-b border-white/20 py-3 text-white/40 outline-none placeholder:text-white/20 cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Message</label>
                            <textarea disabled rows={4} placeholder="Tell us about your event..." className="w-full bg-transparent border-b border-white/20 py-3 text-white/40 outline-none placeholder:text-white/20 cursor-not-allowed resize-none" />
                        </div>
                        <div className="pt-4">
                            <button disabled className="w-full bg-vsoe-gold/50 text-vsoe-midnight py-4 text-[11px] font-bold uppercase tracking-[0.2em] cursor-not-allowed opacity-60">
                                Submit Enquiry — Demo Only
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <div className="border-t border-white/10 py-8 text-center">
                <p className="text-white/30 text-[10px] uppercase tracking-widest">Project Vitesse is an independent portfolio recreation and is not affiliated with, endorsed by, or connected to Belmond Management Limited or LVMH.</p>
            </div>

        </main>
    );
}
