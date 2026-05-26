'use client';

import { motion } from 'framer-motion';

/**
 * PageTransition — reusable wrapper component
 *
 * Matches the template.tsx spec exactly:
 *   Enter : opacity 0→1, translateY -8px→0,  400ms ease-out
 *   Exit  : opacity 1→0, translateY  0→8px,  250ms ease-out (via AnimatePresence)
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            style={{ position: 'relative', willChange: 'opacity, transform' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
                opacity: { duration: 0.4, ease: 'easeOut' },
                y:       { duration: 0.4, ease: 'easeOut' },
            }}
        >
            {children}
        </motion.div>
    );
}
