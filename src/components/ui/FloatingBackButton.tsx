'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingBackButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === '/') return null;

    return (
        <AnimatePresence>
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 1 }}
                onClick={() => router.back()}
                className="fixed bottom-8 left-8 z-50 group flex items-center gap-3 bg-vsoe-midnight/90 backdrop-blur-md border border-vsoe-gold/30 px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-vsoe-midnight hover:border-vsoe-gold transition-all duration-300"
            >
                <ArrowLeft size={16} className="text-vsoe-gold group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-vsoe-cream group-hover:text-white">
                    Back
                </span>
            </motion.button>
        </AnimatePresence>
    );
}
