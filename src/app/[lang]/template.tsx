'use client';

import { motion } from 'framer-motion';

/**
 * PageTransition — App Router template.tsx
 *
 * Next.js re-mounts this component on every route change (unlike layout.tsx
 * which persists). AnimatePresence is NOT needed here — Next handles unmounting.
 *
 * Specs (Aman.com-style, luxury polish):
 *   Enter : opacity 0→1, translateY -8px→0,  400ms ease-out
 *   Exit  : opacity 1→0, translateY  0→8px,  250ms ease-out
 */
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            style={{ position: 'relative', willChange: 'opacity, transform' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
                // Enter transition
                opacity: { duration: 0.4, ease: 'easeOut' },
                y:       { duration: 0.4, ease: 'easeOut' },
            }}
        >
            {children}
        </motion.div>
    );
}
