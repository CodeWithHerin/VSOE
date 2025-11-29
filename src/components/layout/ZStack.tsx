'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useBookingStore } from '@/store/bookingStore';
import Lenis from 'lenis';

interface ZStackProps {
    children: React.ReactNode;
}

export default function ZStack({ children }: ZStackProps) {
    const setScrollProgress = useBookingStore((state) => state.setScrollProgress);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Sync scroll progress to store
        lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
            const progress = Math.min(1, Math.max(0, scroll / limit));
            setScrollProgress(progress);
        });

        return () => {
            lenis.destroy();
        };
    }, [setScrollProgress]);

    return (
        <div className="relative w-full min-h-screen bg-vsoe-midnight text-vsoe-steam overflow-hidden">
            {/* Layer 1: WebGL Canvas (Fixed Background) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    {/* Placeholder for 3D Scene */}
                    <mesh rotation={[0, 0, 0]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="#B8860B" wireframe />
                    </mesh>
                </Canvas>
            </div>

            {/* Layer 2: Vignette & Grain Overlay (Fixed) */}
            <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay" />

            {/* Layer 3: UI ScrollContainer (Scrollable) */}
            <main className="relative z-20 w-full">
                {children}
            </main>
        </div>
    );
}
