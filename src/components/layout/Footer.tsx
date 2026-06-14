'use client';

import React, { useState } from 'react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function Footer() {
    const { t } = useTranslation();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            // In a real app, send this to an API endpoint
        }
    };

    return (
        <footer className="bg-vsoe-midnight text-vsoe-cream border-t border-white/10 pt-20 pb-10">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">

                {/* Top Section: Newsletter & Socials */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">
                    <div>
                        <h3 className="font-serif text-3xl md:text-4xl mb-6">{t.footer.join}</h3>
                        <p className="text-white/60 mb-8 max-w-md font-sans text-sm leading-relaxed">
                            {t.footer.newsletter}
                        </p>
                        {isSubscribed ? (
                            <div className="bg-vsoe-gold/10 border border-vsoe-gold/30 px-6 py-4 rounded-sm">
                                <p className="text-vsoe-gold text-sm font-serif">Thank you for subscribing to the 1920 Club newsletter.</p>
                            </div>
                        ) : (
                            <form className="flex gap-4 max-w-md" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.forms.newsletterPlaceholder}
                                    className="flex-1 bg-transparent border-b border-white/30 py-3 text-white focus:outline-none focus:border-vsoe-gold transition-colors"
                                />
                                <button type="submit" className="text-xs uppercase tracking-widest text-vsoe-gold hover:text-white transition-colors">
                                    {t.footer.subscribe}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="lg:text-right">
                        <h3 className="font-serif text-2xl mb-6">{t.footer.follow}</h3>
                        <div className="flex gap-6 lg:justify-end text-white/60">
                            <a href="https://github.com/CodeWithHerin/VSOE" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-vsoe-gold transition-colors"><Instagram size={20} /></a>
                            <a href="https://github.com/CodeWithHerin" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-vsoe-gold transition-colors"><Facebook size={20} /></a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-vsoe-gold transition-colors"><Twitter size={20} /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-vsoe-gold transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-16">
                    {/* Column 1: Explore */}
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">Explore</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/journeys" className="hover:text-white transition-colors">Journeys</Link></li>
                            <li><Link href="/suites" className="hover:text-white transition-colors">Signature Suites</Link></li>
                            <li><Link href="/dining" className="hover:text-white transition-colors">Fine Dining</Link></li>
                            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                            <li><Link href="/bar-car" className="hover:text-white transition-colors">Bar Car 3674</Link></li>
                            <li><Link href="/celia" className="hover:text-white transition-colors">Celia</Link></li>
                            <li><Link href="/observatoire" className="hover:text-white transition-colors">L&apos;Observatoire</Link></li>
                            <li><Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
                        </ul>
                    </div>
                    {/* Column 2: About */}
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.about}</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/about" className="hover:text-white transition-colors">{t.footer.story}</Link></li>
                            <li><Link href="/sustainability" className="hover:text-white transition-colors">{t.footer.sustainability}</Link></li>
                            <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
                            <li><Link href="/groups" className="hover:text-white transition-colors">Groups &amp; Charters</Link></li>
                        </ul>
                    </div>
                    {/* Column 3: Support */}
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.support}</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/contact" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">{t.footer.faq}</Link></li>
                            <li><Link href="/departure-info" className="hover:text-white transition-colors">{t.footer.departureInfo}</Link></li>
                        </ul>
                    </div>
                    {/* Column 4: Legal */}
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.legal}</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/legal/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
                            <li><Link href="/legal/cookies" className="hover:text-white transition-colors">{t.footer.cookies}</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
                            <li><Link href="/legal/accessibility" className="hover:text-white transition-colors">{t.footer.accessibility}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Legal Disclaimer */}
                <div className="border-t border-white/10 pt-10 pb-6 text-center text-[10px] uppercase tracking-widest text-white/40 font-sans">
                    <p>{t.footer.disclaimer}</p>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/40 font-sans text-center md:text-left">
                    <p>{t.footer.copyright}</p>
                    <span>{t.footer.sitemap}</span>
                </div>
            </div>
        </footer>
    );
}
