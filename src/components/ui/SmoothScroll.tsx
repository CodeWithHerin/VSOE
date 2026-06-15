'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// ─── Context ──────────────────────────────────────────────────────────────────

interface LenisContextValue {
    stop: () => void;
    start: () => void;
}

const LenisContext = createContext<LenisContextValue>({
    stop: () => {},
    start: () => {},
});

export function useLenis() {
    return useContext(LenisContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', () => {
            window.dispatchEvent(new Event('scroll'));
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value={{
            stop: () => lenisRef.current?.stop(),
            start: () => lenisRef.current?.start(),
        }}>
            {children}
        </LenisContext.Provider>
    );
}
