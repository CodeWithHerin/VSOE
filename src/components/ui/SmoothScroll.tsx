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
    const rafIdRef = useRef<number | null>(null);
    const pausedRef = useRef(false);

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

        let isDispatching = false;
        lenis.on('scroll', () => {
            if (isDispatching) return;
            isDispatching = true;
            window.dispatchEvent(new Event('scroll'));
            isDispatching = false;
        });

        function raf(time: number) {
            if (!pausedRef.current) {
                lenis.raf(time);
            }
            rafIdRef.current = requestAnimationFrame(raf);
        }
        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value={{
            stop: () => {
                pausedRef.current = true;
                lenisRef.current?.stop();
            },
            start: () => {
                pausedRef.current = false;
                lenisRef.current?.start();
            },
        }}>
            {children}
        </LenisContext.Provider>
    );
}
