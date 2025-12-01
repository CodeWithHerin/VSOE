'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={cn(
                "fixed top-0 w-full z-50 px-6 flex justify-between items-center transition-all duration-500",
                isScrolled ? "py-4 bg-vsoe-blue/80 backdrop-blur-md" : "py-6 md:py-8"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }} // Delay to match preloader
        >
            {/* Logo */}
            <div className="group cursor-pointer interactive-area">
                <div className="font-display text-xl md:text-2xl font-bold text-vsoe-cream">Venice Simplon</div>
                <div className="font-display text-[10px] md:text-xs text-vsoe-gold tracking-[0.4em] italic mt-1">Orient-Express</div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-12">
                <div className="flex gap-8 text-[11px] tracking-[0.2em] uppercase font-medium text-vsoe-cream font-sans">
                    <Link href="#grand-tour" className="interactive-area hover:text-vsoe-gold transition-colors">The Route</Link>
                    <Link href="#suites" className="interactive-area hover:text-vsoe-gold transition-colors">Suites</Link>
                    <Link href="#dining" className="interactive-area hover:text-vsoe-gold transition-colors">Dining</Link>
                </div>
                <button className="px-8 py-3 border border-vsoe-cream/30 text-vsoe-cream text-[10px] tracking-[0.25em] uppercase hover:bg-vsoe-gold hover:text-vsoe-blue hover:border-vsoe-gold transition-all duration-300 interactive-area font-sans">
                    Book Passage
                </button>
            </div>

            {/* Mobile Menu */}
            <button className="md:hidden text-vsoe-cream interactive-area">
                <Menu className="w-6 h-6" />
            </button>
        </motion.nav>
    );
}
