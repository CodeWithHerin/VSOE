'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function PortfolioBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative z-[70] w-full bg-vsoe-midnight border-b border-vsoe-gold/20 text-center py-1.5 px-10"
      role="note"
    >
      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-vsoe-gold/70 leading-relaxed">
        A portfolio project inspired by the Venice Simplon-Orient-Express. Not affiliated with Belmond or LVMH.
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss notice"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-vsoe-gold/50 hover:text-vsoe-gold transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
}
