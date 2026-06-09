'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Search } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';
import { useLanguageStore } from '@/lib/store/useLanguageStore';
import { useTranslation } from '@/lib/i18n/useTranslation';
import NavUserStatus from '@/components/ui/NavUserStatus';

// ─── Types ───────────────────────────────────────────────────────────────────

interface MegaMenuLink {
    label: string;
    href: string;
    desc: string;
}

interface MegaMenuColumn {
    heading: string;
    links: MegaMenuLink[];
}

interface MegaMenuImage {
    src: string;
    label: string;
    href: string;
}

interface MegaMenuData {
    columns: MegaMenuColumn[];
    images: MegaMenuImage[];
}

interface NavItem {
    label: string;
    href: string;
    megaMenu?: MegaMenuData;
}

// ─── Suggested Searches ──────────────────────────────────────────────────────

const SUGGESTED_SEARCHES = [
    { label: 'Paris to Venice', href: '/destinations/paris-venice' },
    { label: 'Grand Suite', href: '/suites' },
    { label: 'Dining Experience', href: '/dining' },
    { label: 'Private Charter', href: '/packages' },
];

// ─── NAV_ITEMS ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
    {
        label: 'Destinations',
        href: '/destinations',
        megaMenu: {
            columns: [
                {
                    heading: 'Popular Routes',
                    links: [
                        { label: 'Paris to Venice', href: '/destinations/paris-venice', desc: '2 nights \u00B7 From \u20AC4,500' },
                        { label: 'London to Venice', href: '/destinations/london-venice', desc: '2 nights \u00B7 From \u20AC3,800' },
                        { label: 'Paris to Istanbul', href: '/destinations/paris-istanbul', desc: '3 nights \u00B7 From \u20AC6,200' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-paris-departure.jpg', label: 'Paris', href: '/destinations/paris-venice' },
                { src: '/images/vsoe/vsoe-venice-night.jpg', label: 'Venice', href: '/destinations/paris-venice' },
                { src: '/images/vsoe/vsoe-exterior-night.jpg', label: 'Istanbul', href: '/destinations/paris-istanbul' },
            ]
        }
    },
    {
        label: 'Experiences',
        href: '/experiences',
        megaMenu: {
            columns: [
                {
                    heading: 'On Board',
                    links: [
                        { label: 'Fine Dining', href: '/dining', desc: 'Multi-course cuisine by candlelight' },
                        { label: 'Signature Suites', href: '/suites', desc: 'Your private sanctuary on rails' },
                        { label: 'Bar Car 3674', href: '/bar-car', desc: 'Cocktails and conversation' },
                        { label: 'Celia', href: '/celia', desc: 'Private dining by Baz Luhrmann' },
                        { label: "L'Observatoire", href: '/observatoire', desc: 'A carriage designed by artist JR' },
                    ]
                },
                {
                    heading: 'Before You Travel',
                    links: [
                        { label: 'Departure Information', href: '/departure-info', desc: 'What to expect on the day' },
                        { label: 'FAQ', href: '/faq', desc: 'Your questions answered' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-dining-car.jpg', label: 'Dining', href: '/dining' },
                { src: '/images/vsoe/vsoe-bar-car.jpg', label: 'Bar Car', href: '/bar-car' },
                { src: '/images/vsoe/vsoe-historic-cabin.jpg', label: 'Suites', href: '/suites' },
            ]
        }
    },
    {
        label: 'Packages & Tours',
        href: '/packages',
        megaMenu: {
            columns: [
                {
                    heading: 'Curated Journeys',
                    links: [
                        { label: 'Honeymoon Collection', href: '/packages', desc: 'Romance across Europe' },
                        { label: 'Grand Tour', href: '/packages', desc: 'The ultimate rail odyssey' },
                        { label: 'Festive Journeys', href: '/packages', desc: 'Christmas and New Year departures' },
                        { label: 'Private Charters', href: '/packages', desc: 'The entire train, exclusively yours' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-grand-suite.jpg', label: 'Grand Tour', href: '/packages' },
                { src: '/images/vsoe/vsoe-london-station.jpg', label: 'Departures', href: '/packages' },
            ]
        }
    },
    {
        label: 'Signature Suites',
        href: '/suites',
        megaMenu: {
            columns: [
                {
                    heading: 'Accommodation',
                    links: [
                        { label: 'Historic Cabins', href: '/suites', desc: 'Original 1920s carriages' },
                        { label: 'Luxury Suites', href: '/suites', desc: 'Refined elegance, reimagined' },
                        { label: 'Grand Suites', href: '/suites', desc: 'The pinnacle of rail travel' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-historic-cabin.jpg', label: 'Historic', href: '/suites' },
                { src: '/images/vsoe/vsoe-grand-suite.jpg', label: 'Grand Suite', href: '/suites' },
            ]
        }
    },
    {
        label: 'Occasions',
        href: '/occasions',
        megaMenu: {
            columns: [
                {
                    heading: 'Celebrate in Style',
                    links: [
                        { label: 'Honeymoons', href: '/occasions', desc: 'Begin forever in motion' },
                        { label: 'Anniversaries', href: '/occasions', desc: 'Milestone moments on rails' },
                        { label: 'Corporate Events', href: '/occasions', desc: 'Impress beyond the boardroom' },
                        { label: 'Private Dining', href: '/occasions', desc: 'Exclusive carriage hire' },
                        { label: 'Groups & Charters', href: '/groups', desc: 'The entire train, exclusively yours' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-champagne-detail.jpg', label: 'Occasions', href: '/occasions' },
            ]
        }
    },
    {
        label: 'Offers',
        href: '/offers',
        megaMenu: {
            columns: [
                {
                    heading: 'Special Rates',
                    links: [
                        { label: 'Early Booking', href: '/offers', desc: 'Save up to 20% on advance reservations' },
                        { label: 'Last Minute', href: '/offers', desc: 'Spontaneous luxury departures' },
                        { label: 'Seasonal Offers', href: '/offers', desc: 'Winter and spring specials' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-countryside-window.jpg', label: 'Offers', href: '/offers' },
            ]
        }
    },
    {
        label: 'Membership',
        href: '/membership',
        megaMenu: {
            columns: [
                {
                    heading: 'The Inner Circle',
                    links: [
                        { label: 'About Membership', href: '/membership', desc: 'Privileges for the discerning traveller' },
                        { label: 'Exclusive Benefits', href: '/membership', desc: 'Priority booking and suite upgrades' },
                        { label: 'Gift Membership', href: '/membership', desc: 'The most extraordinary gift' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-venice-night.jpg', label: 'Membership', href: '/membership' },
            ]
        }
    },
    {
        label: 'Stories',
        href: '/stories',
        megaMenu: {
            columns: [
                {
                    heading: 'From The Journal',
                    links: [
                        { label: 'Travel Tales', href: '/stories', desc: 'Dispatches from the golden rails' },
                        { label: 'Gastronomy', href: '/stories', desc: 'The art of dining at speed' },
                        { label: 'History', href: '/stories', desc: 'A century of extraordinary journeys' },
                        { label: 'The Gallery', href: '/gallery', desc: 'Portraits of the journey' },
                    ]
                }
            ],
            images: [
                { src: '/images/vsoe/vsoe-paris-departure.jpg', label: 'Stories', href: '/stories' },
                { src: '/images/vsoe/vsoe-london-station.jpg', label: 'Heritage', href: '/stories' },
            ]
        }
    },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const { scrollY } = useScroll();
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Search & Language state
    const { language: storeLang, setLanguage: setStoreLang } = useLanguageStore();
    const { t } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Sync store with URL params if available
    useEffect(() => {
        if (params?.lang) {
            setStoreLang(params.lang.toString().toUpperCase() as any);
        }
    }, [params?.lang, setStoreLang]);

    const handleLanguageChange = (newLang: string) => {
        const langLower = newLang.toLowerCase();
        setStoreLang(newLang as any);
        setIsLangOpen(false);

        // Redirect to the same path but with a different language prefix
        const currentPath = pathname || '/';
        const pathSegments = currentPath.split('/').filter(Boolean);
        
        // If the first segment is a locale, replace it
        const possibleLocales = ['en', 'fr', 'it', 'de'];
        if (possibleLocales.includes(pathSegments[0])) {
            pathSegments[0] = langLower;
        } else {
            pathSegments.unshift(langLower);
        }
        
        router.push(`/${pathSegments.join('/')}`);
    };

    const translatedNavItems = NAV_ITEMS.map(item => {
        let label = item.label;
        switch (item.label) {
            case 'Destinations': label = t.nav.destinations; break;
            case 'Experiences': label = t.nav.experiences; break;
            case 'Packages & Tours': label = t.nav.packages; break;
            case 'Signature Suites': label = t.nav.suites; break;
            case 'Occasions': label = t.nav.occasions; break;
            case 'Offers': label = t.nav.offers; break;
            case 'Membership': label = t.nav.membership; break;
            case 'Stories': label = t.nav.stories; break;
        }
        return { ...item, label, originalLabel: item.label };
    });

    const handleMouseEnter = (menu: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }
        openTimeoutRef.current = setTimeout(() => {
            setActiveMenu(menu);
        }, 175);
    };

    const handleMouseLeave = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 500);
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Close search on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };
        if (isSearchOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen]);

    // Find the active nav item's mega menu data
    const activeMegaMenu = translatedNavItems.find(item => item.label === activeMenu || item.originalLabel === activeMenu)?.megaMenu;

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 w-full z-[60] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", // Liquid ease
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
                            PROJECT VITESSE
                        </div>
                        <div className="hidden md:block text-[10px] text-vsoe-gold tracking-[0.4em] uppercase mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            An Independent Portfolio Recreation
                        </div>
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-8 justify-end">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={cn(
                                "hidden lg:flex items-center gap-2 text-xs uppercase tracking-widest transition-all duration-500 hover:text-vsoe-gold",
                                isScrolled ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 translate-y-0 text-white/80"
                            )}
                        >
                            <Search size={14} />
                            <span>{t.nav.search}</span>
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
                                <span>{storeLang}</span>
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
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-widest transition-colors ${storeLang === lang.code ? 'text-vsoe-gold' : 'text-white/60 hover:text-vsoe-gold hover:bg-white/5'
                                                    }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className={cn("hidden lg:flex items-center transition-all duration-500 whitespace-nowrap", isScrolled ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 translate-y-0")}>
                            <NavUserStatus />
                        </div>

                        <Link href="/book" className={cn("transition-all duration-500 whitespace-nowrap", isScrolled ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 translate-y-0")}>
                            <MagneticButton className="bg-vsoe-gold text-vsoe-midnight px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 inline-block whitespace-nowrap">
                                {t.nav.bookJourney}
                            </MagneticButton>
                        </Link>
                    </div>
                </div>

                {/* ─── Desktop Nav Links ─────────────────────────────────────────── */}
                <div className={cn("hidden lg:flex mt-2 pb-1 items-center", isScrolled ? "justify-between px-6 md:px-12" : "justify-center gap-8")} onMouseLeave={handleMouseLeave}>
                    {translatedNavItems.map((item) => (
                        <div key={item.label} className="relative py-2 px-2" onMouseEnter={() => handleMouseEnter(item.label)}>
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
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-[1px] bg-vsoe-gold transition-all duration-300",
                                    activeMenu === item.label ? "w-full" : "group-hover:w-full"
                                )} />
                            </Link>
                        </div>
                    ))}
                    {isScrolled && (
                        <div className="flex items-center gap-5 flex-shrink-0 pl-8 border-l border-white/10">
                            <NavUserStatus />
                            <Link href="/book" className="whitespace-nowrap">
                                <MagneticButton className="border border-vsoe-gold/70 text-vsoe-gold bg-transparent px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-vsoe-gold hover:text-vsoe-midnight transition-all duration-300 inline-block whitespace-nowrap">
                                    {t.nav.bookJourney}
                                </MagneticButton>
                            </Link>
                        </div>
                    )}
                </div>

                {/* ─── Dynamic Mega Menu Panel ──────────────────────────────────── */}
                <AnimatePresence>
                    {activeMenu && activeMegaMenu && (
                        <>
                        <div
                            className="absolute left-0 w-full z-30"
                            style={{ top: 'calc(100% - 8px)', height: '16px' }}
                            onMouseEnter={() => handleMouseEnter(activeMenu)}
                            onMouseLeave={handleMouseLeave}
                        />
                        <motion.div
                            key={activeMenu}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                            className="absolute top-full left-4 right-4 bg-vsoe-midnight border border-white/10 shadow-2xl z-40 rounded-sm"
                            onMouseEnter={() => handleMouseEnter(activeMenu)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="max-w-[1920px] mx-auto px-12 py-10">
                                {activeMegaMenu.columns.length > 1 ? (
                                    /* ── Experiences: 2-col links + compact images ── */
                                    <div className="grid grid-cols-3 gap-8 items-start">
                                        {/* Links: 2 columns side by side */}
                                        <div className="col-span-1 space-y-8">
                                            {activeMegaMenu.columns.map((col) => (
                                                <div key={col.heading}>
                                                    <h4 className="text-vsoe-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">
                                                        {col.heading}
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                                        {col.links.map((link) => (
                                                            <Link key={link.label} href={link.href} className="group/link block">
                                                                <span className="text-sm text-white/90 group-hover/link:text-vsoe-gold transition-colors duration-300 relative">
                                                                    {link.label}
                                                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-vsoe-gold transition-all duration-300 group-hover/link:w-full" />
                                                                </span>
                                                                <span className="block text-[11px] text-vsoe-cream/50 mt-0.5 leading-relaxed">
                                                                    {link.desc}
                                                                </span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Images: 3 compact thumbnails */}
                                        <div className="col-span-2 grid grid-cols-3 gap-3">
                                            {activeMegaMenu.images.map((img) => (
                                                <Link key={img.label} href={img.href} className="relative aspect-[4/3] group/img cursor-pointer overflow-hidden rounded-sm">
                                                    <Image
                                                        src={img.src}
                                                        alt={img.label}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                        sizes="220px"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 group-hover/img:bg-black/10 transition-colors duration-500" />
                                                    <span className="absolute bottom-3 left-3 text-white font-serif text-base drop-shadow-lg">
                                                        {img.label}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* ── All other menus: original layout ── */
                                    <div className={cn(
                                        "grid gap-8",
                                        activeMegaMenu.images.length >= 3
                                            ? "grid-cols-4"
                                            : activeMegaMenu.images.length === 2
                                                ? "grid-cols-3"
                                                : "grid-cols-2"
                                    )}>
                                        <div className="space-y-6">
                                            {activeMegaMenu.columns.map((col) => (
                                                <div key={col.heading}>
                                                    <h4 className="text-vsoe-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">
                                                        {col.heading}
                                                    </h4>
                                                    <ul className="space-y-4">
                                                        {col.links.map((link) => (
                                                            <li key={link.label}>
                                                                <Link href={link.href} className="group/link block">
                                                                    <span className="text-sm text-white/90 group-hover/link:text-vsoe-gold transition-colors duration-300 relative">
                                                                        {link.label}
                                                                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-vsoe-gold transition-all duration-300 group-hover/link:w-full" />
                                                                    </span>
                                                                    <span className="block text-[11px] text-vsoe-cream/50 mt-0.5 leading-relaxed">
                                                                        {link.desc}
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={cn(
                                            "grid gap-4",
                                            activeMegaMenu.images.length >= 3
                                                ? "col-span-3 grid-cols-3"
                                                : activeMegaMenu.images.length === 2
                                                    ? "col-span-2 grid-cols-2"
                                                    : "col-span-1 grid-cols-1"
                                        )}>
                                            {activeMegaMenu.images.map((img) => (
                                                <Link key={img.label} href={img.href} className="relative aspect-video group/img cursor-pointer overflow-hidden">
                                                    <Image src={img.src} alt={img.label} fill
                                                        className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 group-hover/img:bg-black/10 transition-colors duration-500" />
                                                    <span className="absolute bottom-4 left-4 text-white font-serif text-xl drop-shadow-lg">
                                                        {img.label}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ─── Search Overlay ──────────────────────────────────────────────── */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="fixed inset-0 z-[200] bg-vsoe-midnight/95 backdrop-blur-sm flex items-center justify-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-8 right-8 text-white/60 hover:text-vsoe-gold transition-colors"
                        >
                            <X size={28} />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                            className="w-full max-w-2xl px-8"
                        >
                            {/* Search Input */}
                            <div className="mb-16">
                                <label className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6">
                                    {t.forms.searchLabel}
                                </label>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder={t.forms.searchPlaceholder}
                                    className="w-full bg-transparent border-b-2 border-vsoe-gold/60 focus:border-vsoe-gold pb-4 text-2xl md:text-3xl text-white font-serif outline-none transition-colors duration-300 placeholder:text-white/20"
                                />
                            </div>

                            {/* Suggested Searches */}
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold block mb-6">
                                    {t.forms.searchSuggested}
                                </span>
                                <div className="flex flex-wrap gap-3">
                                    {SUGGESTED_SEARCHES.map((suggestion) => (
                                        <Link
                                            key={suggestion.label}
                                            href={suggestion.href}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="px-5 py-2.5 border border-white/15 text-sm text-white/70 hover:text-vsoe-gold hover:border-vsoe-gold/50 transition-all duration-300 rounded-sm"
                                        >
                                            {suggestion.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Mobile Menu Overlay ─────────────────────────────────────────── */}
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
                                {translatedNavItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-serif text-white/90 hover:text-vsoe-gold transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="mt-4 pt-8 border-t border-white/10">
                                    <NavUserStatus />
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    );
}
