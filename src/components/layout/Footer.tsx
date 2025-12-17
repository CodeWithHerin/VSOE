import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-vsoe-midnight text-vsoe-cream border-t border-white/10 pt-20 pb-10">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">

                {/* Top Section: Newsletter & Socials */}
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h3 className="font-serif text-3xl md:text-4xl mb-6">Join our world</h3>
                        <p className="text-white/60 mb-8 max-w-md font-sans text-sm leading-relaxed">
                            Sign up for our newsletter to receive exclusive offers, travel inspiration, and the latest news from Belmond.
                        </p>
                        <form className="flex gap-4 max-w-md">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-transparent border-b border-white/30 py-3 text-white focus:outline-none focus:border-vsoe-gold transition-colors"
                            />
                            <button className="text-xs uppercase tracking-widest text-vsoe-gold hover:text-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="lg:text-right">
                        <h3 className="font-serif text-2xl mb-6">Follow us</h3>
                        <div className="flex gap-6 lg:justify-end text-white/60">
                            <a href="#" className="hover:text-vsoe-gold transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-vsoe-gold transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-vsoe-gold transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-vsoe-gold transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-16">
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">About Belmond</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/press" className="hover:text-white transition-colors">Press & Media</Link></li>
                            <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-white/60 font-sans">
                            <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/legal/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-vsoe-gold mb-4">Language</h4>
                        <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                            <Globe size={16} />
                            <span>English (UK)</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/40 font-sans">
                    <p>© 2025 Belmond Management Limited</p>
                    <div className="flex gap-8">
                        <span>LVMH Maisons</span>
                        <span>Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
