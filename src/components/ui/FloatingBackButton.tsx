'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HOME_PATHS = ['/', '/en', '/fr', '/it', '/de', '/en/', '/fr/', '/it/', '/de/'];

export default function FloatingBackButton() {
    const router = useRouter();
    const pathname = usePathname();
    const [canGoBack, setCanGoBack] = useState(false);
    const prevPathRef = useRef<string | null>(null);

    useEffect(() => {
        const isHome = HOME_PATHS.includes(pathname);
        if (isHome) {
            setCanGoBack(false);
            prevPathRef.current = pathname;
            return;
        }

        if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
            setCanGoBack(true);
        } else {
            const fromSameSite =
                document.referrer.length > 0 &&
                document.referrer.includes(window.location.hostname) &&
                !document.referrer.endsWith(pathname);
            setCanGoBack(fromSameSite);
        }

        prevPathRef.current = pathname;
    }, [pathname]);

    if (!canGoBack) return null;

    return (
        <AnimatePresence>
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
                onClick={() => router.back()}
                className="hidden lg:flex fixed bottom-8 left-8 z-50 group items-center gap-3 bg-vsoe-midnight/90 backdrop-blur-md border border-vsoe-gold/30 px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-vsoe-midnight hover:border-vsoe-gold transition-all duration-300"
            >
                <ArrowLeft size={16} className="text-vsoe-gold group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-vsoe-cream group-hover:text-white">
                    Back
                </span>
            </motion.button>
        </AnimatePresence>
    );
}
