'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

const NAV_ITEMS = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Packages & Tours', href: '/packages' },
    { label: 'Signature Suites', href: '/suites' },
    { label: 'Occasions', href: '/occasions' },
    { label: 'Offers', href: '/offers' },
    { label: 'Membership', href: '/membership' },
    { label: 'Stories', href: '/stories' },
    { label: 'My Bookings', href: '/profile' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const { scrollY } = useScroll();
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // New state
    const [currentLang, setCurrentLang] = useState('EN');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleMouseEnter = (menu: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 300); // 300ms delay
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", // Liquid ease
                    isScrolled
                        ? "bg-vsoe-midnight/95 backdrop-blur-md text-vsoe-cream shadow-2xl py-2 border-b border-white/5" // Scrolled: Reverted to Midnight (Dark)
                        : "bg-gradient-to-b from-black/80 to-transparent text-white py-6" // Initial: Transparent
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                {/* Top Grid: Logo & Actions - Smooth Collapse with max-height */}
                <div className={cn(
                    "max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-3 items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isScrolled ? "lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:my-0" : "lg:max-h-[200px] lg:opacity-100 lg:my-0"
                )}>

                    {/* Left: Mobile Menu */}
                    <div className="flex items-center gap-6 justify-start">
                        <button
                            className={cn(
                                "lg:hidden transition-colors hover:text-vsoe-gold",
                                isScrolled ? "text-vsoe-midnight" : "text-white"
                            )}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Center: Logo - Hides when scrolled per user request */}
                    <Link href="/" className={cn(
                        "flex flex-col items-center justify-center text-center group transition-all duration-500",
                        isScrolled ? "opacity-0 pointer-events-none translate-y-[-20px] blur-sm" : "opacity-100 translate-y-0 blur-0"
                    )}>
                        <div className="font-display text-lg md:text-2xl font-bold text-white tracking-wider group-hover:text-vsoe-gold transition-colors duration-500 whitespace-nowrap">
                            BELMOND
                        </div>
                        <div className="hidden md:block text-[10px] text-vsoe-gold tracking-[0.4em] uppercase mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            Venice Simplon-Orient-Express
                        </div>
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-8 justify-end">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={cn(
                                "hidden lg:flex items-center gap-2 text-xs uppercase tracking-widest transition-all duration-500 hover:text-vsoe-gold",
                                isScrolled ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 translate-y-0 text-white/80"
                            )}
                        >
                            <Search size={14} />
                            <span>{isSearchOpen ? 'Close' : 'Search'}</span>
                        </button>

                        <div className="relative hidden lg:block">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={cn(
                                    "flex items-center gap-2 text-xs uppercase tracking-widest transition-all duration-500 z-50 relative hover:text-vsoe-gold",
                                    isScrolled ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 translate-y-0 text-white/80"
                                )}
                            >
                                <Globe size={14} />
                                <span>{currentLang}</span>
                                <ChevronDown size={10} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-4 w-32 bg-vsoe-midnight border border-white/10 py-2 rounded-sm shadow-xl z-[100]"
                                    >
                                        {[
                                            { code: 'EN', label: 'English' },
                                            { code: 'FR', label: 'Français' },
                                            { code: 'IT', label: 'Italiano' },
                                            { code: 'DE', label: 'Deutsch' }
                                        ].map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setCurrentLang(lang.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-widest transition-colors ${currentLang === lang.code ? 'text-vsoe-gold' : 'text-white/60 hover:text-vsoe-gold hover:bg-white/5'
                                                    }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/book" className={cn("transition-all duration-500", isScrolled ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 translate-y-0")}>
                            <MagneticButton className="bg-vsoe-gold text-vsoe-midnight px-4 md:px-8 py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 inline-block">
                                <span className="hidden md:inline">Book a Journey</span>
                                <span className="md:hidden">Book</span>
                            </MagneticButton>
                        </Link>
                    </div>
                </div>

                {/* Desktop Mega Menu */}
                <div className="hidden lg:flex justify-center gap-8 mt-2 pb-1" onMouseLeave={handleMouseLeave}>
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative py-2" onMouseEnter={() => handleMouseEnter(item.label)}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "text-xs uppercase tracking-[0.15em] hover:text-vsoe-gold transition-colors relative group py-1 font-medium",
                                    activeMenu === item.label
                                        ? "text-vsoe-gold"
                                        : "text-white/80" // Always light text: Midnight bg (scrolled) & Transparent bg (top)
                                )}
                            >
                                {item.label}
                                < span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-[1px] bg-vsoe-gold transition-all duration-300",
                                    activeMenu === item.label ? "w-full" : "group-hover:w-full"
                                )} />
                            </Link>
                        </div>
                    ))}
                </div>
                {/* Mega Menu Panel */}
                <AnimatePresence>
                    {activeMenu && (activeMenu === 'Destinations' || activeMenu === 'Experiences') && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-full left-0 w-full bg-vsoe-midnight border-t border-white/10 shadow-2xl z-40"
                            onMouseEnter={() => handleMouseEnter(activeMenu)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="max-w-[1920px] mx-auto px-12 py-12 grid grid-cols-4 gap-8">
                                {activeMenu === 'Destinations' && (
                                    <>
                                        <div className="space-y-4">
                                            <h4 className="text-vsoe-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">Popular Routes</h4>
                                            <ul className="space-y-2 text-sm text-white/70">
                                                <li><Link href="/destinations/paris-venice" className="hover:text-white transition-colors">Paris to Venice</Link></li>
                                                <li><Link href="/destinations/london-venice" className="hover:text-white transition-colors">London to Venice</Link></li>
                                                <li><Link href="/destinations/paris-istanbul" className="hover:text-white transition-colors">Paris to Istanbul</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-span-3 grid grid-cols-3 gap-4">
                                            <div className="relative aspect-video group cursor-pointer overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop" alt="Paris" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                                <span className="absolute bottom-4 left-4 text-white font-serif text-xl">Paris</span>
                                            </div>
                                            <div className="relative aspect-video group cursor-pointer overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2670&auto=format&fit=crop" alt="Venice" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                                <span className="absolute bottom-4 left-4 text-white font-serif text-xl">Venice</span>
                                            </div>
                                            <div className="relative aspect-video group cursor-pointer overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop" alt="Istanbul" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                                <span className="absolute bottom-4 left-4 text-white font-serif text-xl">Istanbul</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {activeMenu === 'Experiences' && (
                                    <>
                                        <div className="space-y-4">
                                            <h4 className="text-vsoe-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">On Board</h4>
                                            <ul className="space-y-2 text-sm text-white/70">
                                                <li><Link href="/dining" className="hover:text-white transition-colors">Dining</Link></li>
                                                <li><Link href="/suites" className="hover:text-white transition-colors">Suites</Link></li>
                                                <li><Link href="/bar-car" className="hover:text-white transition-colors">Bar Car '3674'</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-span-3 grid grid-cols-2 gap-4">
                                            <div className="relative aspect-[21/9] group cursor-pointer overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" alt="Dining" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                                <span className="absolute bottom-4 left-4 text-white font-serif text-xl">Gastronomy</span>
                                            </div>
                                            <div className="relative aspect-[21/9] group cursor-pointer overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop" alt="Suites" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                                <span className="absolute bottom-4 left-4 text-white font-serif text-xl">Accommodations</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="fixed inset-0 z-[100] bg-vsoe-midnight text-white p-8"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="font-display text-2xl">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-8 px-4">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-serif text-white/90 hover:text-vsoe-gold transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}
