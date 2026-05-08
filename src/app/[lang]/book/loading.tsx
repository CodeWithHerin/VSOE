import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-vsoe-midnight text-vsoe-cream">
            {/* Elegant Spinning Border */}
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-[1px] border-vsoe-gold/20 rounded-full" />
                <div className="absolute inset-0 border-[1px] border-t-vsoe-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />

                {/* Center Logo/Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-2xl text-vsoe-gold animate-pulse">B</span>
                </div>
            </div>

            {/* Loading Text */}
            <h2 className="font-serif text-2xl text-vsoe-gold mb-2 tracking-wide">Checking Availability</h2>
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
