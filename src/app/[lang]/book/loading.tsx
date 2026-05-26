import React from 'react';

// This loading state is shown by Next.js while the page JS bundle loads.
// The actual data loading is handled inside the page component via useEffect.
export default function Loading() {
    return (
        <div className="min-h-[70vh] relative flex flex-col items-center justify-center bg-vsoe-midnight text-vsoe-cream">
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-[1px] border-vsoe-gold/20 rounded-full" />
                <div className="absolute inset-0 border-[1px] border-t-vsoe-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-2xl text-vsoe-gold animate-pulse">B</span>
                </div>
            </div>
            <h2 className="font-serif text-2xl text-vsoe-gold mb-2 tracking-wide">Loading</h2>
            <div className="flex gap-1">
                <div className="w-1 h-1 bg-vsoe-cream/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1 h-1 bg-vsoe-cream/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1 h-1 bg-vsoe-cream/40 rounded-full animate-bounce" />
            </div>
            <p className="absolute bottom-12 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Venice Simplon-Orient-Express
            </p>
        </div>
    );
}
