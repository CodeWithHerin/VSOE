'use client';

import React, { useState } from 'react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';
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
                            <a href="https://www.instagram.com/vsoetrain" target="_blank" rel="noopener noreferrer" className="hover:text-vsoe-gold transition-colors"><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/VSOEtrain" target="_blank" rel="noopener noreferrer" className="hover:text-vsoe-gold transition-colors"><Facebook size={20} /></a>
                            <a href="https://twitter.com/BelmondVSOE" target="_blank" rel="noopener noreferrer" className="hover:text-vsoe-gold transition-colors"><Twitter size={20} /></a>
                            <a href="https://www.youtube.com/belmond" target="_blank" rel="noopener noreferrer" className="hover:text-vsoe-gold transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-16">
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.about}</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/about" className="hover:text-white transition-colors">{t.footer.story}</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">{t.footer.careers}</Link></li>
                            <li><Link href="/press" className="hover:text-white transition-colors">{t.footer.press}</Link></li>
                            <li><Link href="/sustainability" className="hover:text-white transition-colors">{t.footer.sustainability}</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.support}</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/contact" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">{t.footer.faqs}</Link></li>
                            <li><Link href="/gift-cards" className="hover:text-white transition-colors">{t.footer.gifts}</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.legal}</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/legal/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
                            <li><Link href="/legal/cookies" className="hover:text-white transition-colors">{t.footer.cookies}</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
                            <li><Link href="/legal/accessibility" className="hover:text-white transition-colors">{t.footer.accessibility}</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">{t.footer.language}</h4>
                        <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                            <Globe size={16} />
                            <span>Language Selection in Navbar</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/40 font-sans text-center md:text-left">
                    <p>{t.footer.copyright}</p>
                    <div className="flex gap-8">
                        <span>{t.footer.lvmh}</span>
                        <span>{t.footer.sitemap}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
