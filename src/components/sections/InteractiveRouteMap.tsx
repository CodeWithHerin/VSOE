'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

interface ModePalette {
  bg: string;
  bgCenter: string;
  accent: string;
  overlay: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const VB_W = 1200;
const VB_H = 600;
const CREAM = '#F5F0E8';
const DARK  = '#050B14';

const PALETTES: Record<TimeOfDay, ModePalette & { coast: string, particleColor?: string }> = {
  dawn:  { bg: '#1A1228', bgCenter: '#2D2444', accent: '#FFD4A0', overlay: 'rgba(255,145,90, 0)', coast: '#C57B59', particleColor: '#FFB88C' },
  day:   { bg: '#0E1828', bgCenter: '#182238', accent: '#D4C89A', overlay: 'rgba(210,200,160,0.06)', coast: CREAM },
  dusk:  { bg: '#050B14', bgCenter: '#0A1525', accent: '#C5A059', overlay: 'rgba(160,80,20, 0.08)', coast: CREAM },
  night: { bg: '#020610', bgCenter: '#050A1A', accent: '#8BAAD4', overlay: 'rgba(30,50,120, 0.18)', coast: CREAM },
};

const MODE_LABELS: Record<TimeOfDay, { icon: string; label: string }> = {
  dawn:  { icon: '🌅', label: 'Dawn'  },
  day:   { icon: '☀️', label: 'Day'   },
  dusk:  { icon: '🌆', label: 'Dusk'  },
  night: { icon: '🌙', label: 'Night' },
};

const PATH_LONDON_PARIS    = 'M 185 118 C 208 145 245 174 270 200';
const PATH_PARIS_VENICE    = 'M 270 200 C 368 232 495 272 590 295';
const PATH_VENICE_ISTANBUL = 'M 590 295 C 700 308 848 320 980 330';
const TRAIN_PATH = `path('${PATH_LONDON_PARIS.slice(2)} C 368 232 495 272 590 295 C 700 308 848 320 980 330')`; // offset-path compatible
const TRAIN_PATH_SVG = 'M 185 118 C 208 145 245 174 270 200 C 368 232 495 272 590 295 C 700 308 848 320 980 330';

const COASTLINES = [
  'M 108 50 C 128 28 165 5 192 8 C 215 22 220 52 218 80 C 215 100 222 118 220 128 C 185 130 108 138 34 148 C 26 162 32 185 40 198 C 52 198 72 190 84 184 C 98 176 108 162 110 148 C 113 132 112 118 108 108 Z',
  'M 15 80 C 5 95 2 118 8 135 C 14 152 30 162 46 160 C 60 158 68 148 65 135 C 62 122 52 110 46 98 C 40 86 28 78 15 80 Z',
  'M 0 192 C 18 182 42 188 58 205 C 72 220 70 245 62 268 C 54 290 38 308 30 332 C 22 354 25 380 38 400 C 52 422 75 435 105 438 C 158 440 225 418 258 398 C 285 380 295 358 288 328 C 280 298 258 278 235 272 C 212 268 192 272 175 268 C 158 262 148 248 152 228 C 156 208 168 194 182 188',
  'M 35 148 C 42 168 40 188 45 210 C 50 230 62 248 78 262 C 95 276 115 282 135 278 C 155 274 165 260 158 242 C 150 224 135 212 125 200 C 115 188 108 175 112 162 C 116 150 126 142 140 138',
  'M 148 268 C 172 275 208 278 238 272 C 265 268 292 264 322 260 C 352 256 385 254 415 258 C 445 262 468 268 490 275',
  'M 490 275 C 515 280 540 295 555 312 C 570 328 575 348 570 368 C 565 388 552 408 538 425 C 524 440 508 450 492 448 C 478 446 468 435 468 420 C 468 405 478 390 485 376 C 492 358 492 340 485 322 C 478 305 462 295 448 290 C 432 285 415 286 400 290',
  'M 558 292 C 572 308 582 328 580 350 C 578 370 565 390 550 408 C 536 425 515 435 498 440',
  'M 638 340 C 662 330 695 332 720 345 C 742 356 750 372 742 388 C 734 404 715 410 698 406 C 680 402 665 390 656 375 C 648 360 642 348 638 340',
  'M 928 268 C 958 260 990 258 1020 265 C 1050 272 1072 282 1086 295',
  'M 848 332 C 880 324 914 320 948 324 C 975 328 1002 336 1025 345 C 1050 355 1070 365 1084 368',
  'M 45 490 C 155 478 290 472 440 475 C 588 478 740 475 890 482 C 980 486 1078 495 1145 505',
  'M 322 0 C 335 20 342 45 338 65 C 334 80 322 90 310 92',
  'M 390 0 C 402 24 410 52 404 75',
  'M 450 0 C 462 28 468 58 460 82 C 454 98 438 108 420 105',
];

// Seeded deterministic particles (cut to 8 for performance)
// Randomize starting delays significantly (-2s to -10s)
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id:       i,
  cx:       80  + (i * 127 + 13) % 1060,
  cy:       40  + (i * 61 + 17) % 520,
  r:        1.2 + (i % 3) * 0.4,
  duration: 8   + (i % 7),
  delay:    -2  - (i * 1.7) % 8, // negative delay starts animation mid-cycle
  yDrift:   -15 + (i % 5) * 6,
  opacity:  0.25 + (i % 4) * 0.08,
}));

// Night-sky stars (cut to 15 for performance)
const STARS = Array.from({ length: 15 }, (_, i) => ({
  id:       i,
  cx:       50  + (i * 97 + 23) % 1100,
  cy:       20  + (i * 53 + 11) % 200,
  r:        0.8 + (i % 3) * 0.3,
  duration: 2   + (i % 3),
  delay:    -2  - (i * 1.3) % 4,
}));

// Cloud drift positions
const CLOUDS = [
  { cx: 280,  cy: 145, rx: 300, ry: 65, dur: 22, drift: 20, delay: -4  },
  { cx: 700,  cy: 420, rx: 340, ry: 55, dur: 28, drift: 30, delay: -12 },
  { cx: 1050, cy: 200, rx: 220, ry: 50, dur: 20, drift: 15, delay: -8  },
];

const CITY_IMAGES: Record<string, string> = {
  london:   '/images/vsoe/vsoe-london-station.jpg',
  paris:    '/images/vsoe/vsoe-paris-departure.jpg',
  venice:   '/images/vsoe/vsoe-venice-night.jpg',
  istanbul: '/images/vsoe/vsoe-istanbul-twilight.jpg',
};

const COMPASS_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const CX = 1108; // compass center x
const CY = 72;   // compass center y

// ─────────────────────────────────────────────────────────────────────────────
// Hook: prefers-reduced-motion
// ─────────────────────────────────────────────────────────────────────────────
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: SteamLocomotive
// ─────────────────────────────────────────────────────────────────────────────
function SteamLocomotive({ accent }: { accent: string }) {
  const HL = '#D4B87A';
  return (
    <g>
      <rect x={-28} y={-5}  width={12} height={8}  rx={1} fill={accent} opacity={0.85} />
      <rect x={-27} y={-8}  width={10} height={4}  rx={1} fill={accent} opacity={0.75} />
      <rect x={-18} y={-10} width={13} height={13} rx={1} fill={accent} />
      <rect x={-20} y={-12} width={17} height={3}  rx={1} fill={HL} />
      <rect x={-15} y={-8}  width={4}  height={3.5} rx={0.5} fill={DARK} opacity={0.75} />
      <rect x={-9}  y={-8}  width={4}  height={3.5} rx={0.5} fill={DARK} opacity={0.75} />
      <rect x={-5}  y={-7}  width={24} height={10} rx={5}   fill={accent} />
      <ellipse cx={4}  cy={-8.5} rx={3.5} ry={2.5} fill={accent} />
      <ellipse cx={18} cy={-3.5} rx={3}   ry={3}   fill={HL}     />
      <rect x={8}  y={-16} width={4.5} height={10} rx={1.5} fill={accent} />
      <ellipse cx={10} cy={-16} rx={5.5} ry={1.8}  fill={HL} />
      <circle cx={20} cy={-1.5} r={2}  fill={HL}    opacity={0.9} />
      <rect x={20} y={1} width={2.5} height={5} rx={0.5} fill={accent} />
      <rect x={-28} y={3} width={52} height={1.5}  fill={accent} opacity={0.9} />
      <circle cx={-22} cy={6.5} r={3.5} fill={DARK} stroke={accent} strokeWidth={1}   />
      <circle cx={-12} cy={6.5} r={3.5} fill={DARK} stroke={accent} strokeWidth={1}   />
      <circle cx={-1}  cy={6.5} r={4.5} fill={DARK} stroke={accent} strokeWidth={1.3} />
      <circle cx={11}  cy={6.5} r={4.5} fill={DARK} stroke={accent} strokeWidth={1.3} />
      <circle cx={20}  cy={6.5} r={3}   fill={DARK} stroke={accent} strokeWidth={1}   />
      <line x1={-1} y1={6.5} x2={11} y2={6.5} stroke={accent} strokeWidth={1.5} opacity={0.75} />
      <rect x={11} y={5} width={9} height={2} rx={1} fill={accent} opacity={0.8} />
      <line x1={-8} y1={6.5} x2={-1} y2={6.5} stroke={accent} strokeWidth={1} opacity={0.5} />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: CompassRose (Static for performance)
// ─────────────────────────────────────────────────────────────────────────────
const CompassRose = React.memo(function CompassRose({ accent }: { accent: string }) {
  return (
    <g opacity={0.48} style={{ willChange: 'color' }}>
      {/* Outer dashed ring */}
      <circle cx={CX} cy={CY} r={29} fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 4" />

      {/* Spokes */}
      {COMPASS_ANGLES.map((angle) => {
        const rad      = (angle * Math.PI) / 180;
        const cardinal = angle % 90 === 0;
        const len      = cardinal ? 22 : 13;
        return (
          <line
            key={angle}
            x1={CX}
            y1={CY}
            x2={CX + Math.sin(rad) * len}
            y2={CY - Math.cos(rad) * len}
            stroke={accent}
            strokeWidth={cardinal ? 1.5 : 0.8}
          />
        );
      })}

      {/* Cardinal labels */}
      <text x={CX}      y={CY - 28} textAnchor="middle" fill={accent} fontSize="8"   fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="1">N</text>
      <text x={CX}      y={CY + 38} textAnchor="middle" fill={accent} fontSize="6.5" fontFamily="Georgia, serif" opacity="0.65">S</text>
      <text x={CX + 36} y={CY + 2.5} textAnchor="middle" fill={accent} fontSize="6.5" fontFamily="Georgia, serif" opacity="0.65">E</text>
      <text x={CX - 36} y={CY + 2.5} textAnchor="middle" fill={accent} fontSize="6.5" fontFamily="Georgia, serif" opacity="0.65">W</text>

      {/* Centre rings */}
      <circle cx={CX} cy={CY} r={4}   fill="none"   stroke={accent} strokeWidth="1"   />
      <circle cx={CX} cy={CY} r={1.5} fill={accent}                                    />
    </g>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: Static Coastlines (Memoized)
// ─────────────────────────────────────────────────────────────────────────────
const StaticCoastlines = React.memo(function StaticCoastlines({ coastColor }: { coastColor: string }) {
  return (
    <g pointerEvents="none" aria-hidden="true">
      {/* Bloom copy (cheaper than svg filter: just slightly thicker and very low opacity) */}
      <g stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.04">
        {COASTLINES.map((d, i) => <path key={`bloom-${i}`} d={d} />)}
      </g>
      {/* Primary coastlines */}
      <g stroke={coastColor} strokeWidth="1.2" fill="none" opacity="0.09" strokeLinejoin="round" strokeLinecap="round" style={{ transition: 'stroke 1.5s ease' }}>
        {COASTLINES.map((d, i) => <path key={`main-${i}`} d={d} />)}
      </g>
    </g>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function InteractiveRouteMap() {
  const { t }              = useTranslation();
  const [mode, setMode]    = useState<TimeOfDay>('dusk');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [trainDone, setTrainDone]     = useState(false);
  const sectionRef    = useRef<HTMLElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView      = useInView(sectionRef, { once: true, margin: '-80px' });
  const reducedMotion = usePrefersReducedMotion();

  const palette = PALETTES[mode];

  // Clean up timeout on unmount
  useEffect(() => () => { if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current); }, []);

  // ── Hover bridge: unified enter / leave with 100ms close delay ──
  const handleCityEnter = useCallback((id: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setHoveredCity(id);
  }, []);

  const handleCityLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setHoveredCity(null), 100);
  }, []);

  const CITY_DATA = [
    { id: 'london',   x: 185, y: 118, routeQuery: '?route=gateway',  label: t.routeMap?.londonLabel   ?? 'London',   sub: t.routeMap?.londonSub   ?? 'The grand departure' },
    { id: 'paris',    x: 270, y: 200, routeQuery: '?route=classic',  label: t.routeMap?.parisLabel    ?? 'Paris',    sub: t.routeMap?.parisSub    ?? 'Classic departure city'             },
    { id: 'venice',   x: 590, y: 295, routeQuery: '?route=venice',   label: t.routeMap?.veniceLabel   ?? 'Venice',   sub: t.routeMap?.veniceSub   ?? 'The Floating City'                  },
    { id: 'istanbul', x: 980, y: 330, routeQuery: '?route=istanbul', label: t.routeMap?.istanbulLabel ?? 'Istanbul', sub: t.routeMap?.istanbulSub ?? 'Continental terminus'               },
  ];

  // Shared transition value for time-of-day palette changes
  const modeTransition = reducedMotion ? 'none' : 'all 1.5s ease';

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full relative z-10"
      id="interactive-route-map"
      aria-label="Interactive European Route Map"
      style={{ backgroundColor: palette.bg, transition: modeTransition, contain: 'layout style paint' }}
    >
      {/* Inject pure CSS animations for GPU accelerated particles/clouds/train */}
      <style>{`
        @keyframes vsoeFloatY {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, var(--y-drift), 0); }
        }
        @keyframes vsoeFloatX {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(var(--x-drift), 0, 0); }
        }
        @keyframes vsoeStarPulse {
          0%, 100% { opacity: 0; transform: translateZ(0) scale(0.8); }
          50% { opacity: 0.6; transform: translateZ(0) scale(1.1); }
          75% { opacity: 0.2; transform: translateZ(0) scale(0.9); }
        }
        @keyframes vsoeTrainJourney {
          0%   { offset-distance: 0%; opacity: 0; }
          3%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION HEADER
      ══════════════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

          {/* Title */}
          <div className="text-center md:text-left">
            <motion.p
              className="text-[10px] uppercase tracking-[0.35em] mb-3 font-sans"
              style={{ color: palette.accent, transition: modeTransition }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {t.routeMap?.grandTour ?? 'European Grand Tour'}
            </motion.p>
            <motion.h2
              className="font-serif text-3xl md:text-5xl text-vsoe-cream leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t.map?.network ?? 'Venice Simplon-Orient-Express Network'}
            </motion.h2>
            <motion.div
              className="w-16 h-px mx-auto md:mx-0 mt-4"
              style={{ backgroundColor: palette.accent, transition: modeTransition }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* ── Time-of-day toggle ── */}
          <div
            className="flex items-center gap-1.5 justify-center md:justify-end flex-wrap"
            role="group"
            aria-label="Map atmosphere"
          >
            {(Object.keys(MODE_LABELS) as TimeOfDay[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className="px-3 py-1.5 text-[9px] uppercase tracking-widest border font-sans flex items-center gap-1.5 select-none"
                style={{
                  borderColor:     mode === m ? palette.accent : 'rgba(255,255,255,0.14)',
                  color:           mode === m ? palette.accent : 'rgba(255,255,255,0.38)',
                  backgroundColor: mode === m ? `${palette.accent}18` : 'transparent',
                  transition:      reducedMotion ? 'none' : 'all 0.3s ease',
                }}
              >
                <span role="img" aria-hidden="true">{MODE_LABELS[m].icon}</span>
                <span>{MODE_LABELS[m].label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MAP FRAME
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 pb-10">
        <div className="relative">

          {/* Art-Deco corner ornaments */}
          {(['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'] as const).map((cls, i) => (
            <div key={i} className={`absolute ${cls} w-10 h-10 z-10 pointer-events-none`}
              style={{ borderColor: palette.accent, transition: modeTransition }} />
          ))}
          <div className="absolute top-0    left-1/2 -translate-x-1/2 w-20 h-0.5 z-10 pointer-events-none" style={{ backgroundColor: palette.accent, transition: modeTransition }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 z-10 pointer-events-none" style={{ backgroundColor: palette.accent, transition: modeTransition }} />

          {/* ── Main aspect-ratio container ── */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2 / 1' }}>

            {/* ══════════════════════════════════════════════
                LAYER 1 — Destination background images & Gradients
            ══════════════════════════════════════════════ */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ backgroundColor: palette.bgCenter }}>
              {/* Base gradient layer */}
              <div 
                className="absolute inset-0 transition-colors duration-1000 ease-in-out" 
                style={{ 
                  background: mode === 'dawn' 
                    ? `linear-gradient(to top, #FFB88C 0%, #E89B8B 30%, #2D2444 100%)`
                    : `radial-gradient(ellipse 60% 60% at 50% 50%, ${palette.bgCenter} 0%, ${palette.bg} 100%)` 
                }} 
              />
              
              {/* Sun-glow for dawn */}
              <div 
                className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle at 20% 100%, #FFE0B0 0%, transparent 60%)',
                  opacity: mode === 'dawn' ? 1 : 0,
                  transform: 'translateZ(0)'
                }}
              />

              <AnimatePresence>
                {hoveredCity && (
                  <motion.div
                    key={hoveredCity}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.40 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ zIndex: 2, transform: 'translateZ(0)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={CITY_IMAGES[hoveredCity]}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                      loading="eager"
                      /* Removed mixBlendMode and filter for performance */
                      style={{ opacity: 0.5 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lighter vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                style={{
                  background: `radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, ${palette.bg} 90%)`,
                }}
              />
              {/* Time-of-day atmospheric tint */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: palette.overlay }}
              />
            </div>

            {/* ══════════════════════════════════════════════
                LAYER 2 — SVG Map
            ══════════════════════════════════════════════ */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              /* currentColor propagates accent to all stroke/fill="currentColor" children */
              style={{ color: palette.accent, transition: modeTransition }}
            >
              <defs>
                <path id="vsoe-train-route" d={TRAIN_PATH_SVG} />
                {/* Grid */}
                <pattern id="vsoe-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.055" />
                </pattern>
                {/* Vignette (Top overlay) */}
                <radialGradient id="vsoe-vignette-svg" cx="50%" cy="50%" r="65%">
                  <stop offset="40%"  stopColor="transparent"  stopOpacity="0"    />
                  <stop offset="100%" stopColor={palette.bg}   stopOpacity="0.5" />
                </radialGradient>
              </defs>

              {/* Grid (No opaque rect here, so layer 1 shows through) */}
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-grid)" />

              {/* ── Cloud drift (atmospheric depth, Layer 1 back) ── */}
              {!reducedMotion && (
                <g aria-hidden="true" pointerEvents="none" className="will-change-transform">
                  {CLOUDS.map((c, i) => (
                    <ellipse
                      key={i}
                      cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
                      fill={CREAM} opacity={0.025}
                      style={{
                        '--x-drift': `${c.drift}px`,
                        animation: `vsoeFloatX ${c.dur}s ease-in-out ${c.delay}s infinite`,
                        animationPlayState: hoveredCity ? 'running' : 'paused',
                      } as React.CSSProperties}
                    />
                  ))}
                </g>
              )}

              {/* ── Coastlines (Memoized, no expensive filters) ── */}
              <StaticCoastlines coastColor={palette.coast} />

              {/* ── Route Lines ── */}
              {/* London → Paris — thin dashed */}
              <motion.path
                d={PATH_LONDON_PARIS} stroke="currentColor" strokeWidth="1.5"
                fill="none" strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
                transition={{ duration: reducedMotion ? 0 : 1.5, delay: 0, ease: 'easeInOut' }}
              />
              {/* Paris → Venice — solid, featured */}
              <motion.path
                d={PATH_PARIS_VENICE} stroke="currentColor" strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: reducedMotion ? 0 : 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
              {/* Venice → Istanbul — dashed */}
              <motion.path
                d={PATH_VENICE_ISTANBUL} stroke="currentColor" strokeWidth="1.5"
                fill="none" strokeDasharray="8 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: reducedMotion ? 0 : 1.5, delay: 0.6, ease: 'easeInOut' }}
              />

              {/* Route line labels */}
              <text x={214} y={128} fill="currentColor" fontSize="7.5" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.45" transform="rotate(-14, 214, 128)">BRITISH PULLMAN</text>
              <text x={395} y={222} fill="currentColor" fontSize="7.5" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.50" transform="rotate(-7, 395, 222)">THE CLASSIC ROUTE</text>
              <text x={760} y={288} fill="currentColor" fontSize="7.5" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.40" transform="rotate(-3, 760, 288)">THE GRAND EXPRESS</text>

              {/* ── Steam locomotive (CSS offset-path animation for GPU perf) ── */}
              {isInView && !trainDone && (
                <g
                  style={{
                    offsetPath: TRAIN_PATH,
                    animation: 'vsoeTrainJourney 7s ease-in-out forwards',
                    willChange: 'offset-distance, opacity',
                  }}
                  onAnimationEnd={() => setTrainDone(true)}
                >
                  <SteamLocomotive accent={palette.accent} />
                </g>
              )}

              {/* ── City marker visuals (pointer-events off; HTML handles interaction) ── */}
              {CITY_DATA.map((city, i) => {
                const isHovered  = hoveredCity === city.id;
                const labelX     = city.id === 'istanbul' ? city.x - 14 : city.x + 14;
                const labelY     = city.id === 'istanbul' ? city.y - 14 : city.y - 13;
                const textAnchor = city.id === 'istanbul' ? 'end' : 'start';

                return (
                  <g key={city.id} pointerEvents="none">
                    {/* Pulse ring */}
                    <motion.circle
                      cx={city.x} cy={city.y}
                      fill="none" stroke="currentColor" strokeWidth="0.8"
                      initial={{ r: 12, opacity: 0.3 }}
                      animate={isInView && !reducedMotion
                        ? { r: [12, 30, 12], opacity: [0.3, 0, 0.3] }
                        : { r: 12, opacity: 0.3 }
                      }
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.55 }}
                    />
                    {/* Static inner ring */}
                    <circle cx={city.x} cy={city.y} r={8}
                      fill="none" stroke="currentColor" strokeWidth="1"
                      opacity={isHovered ? 1 : 0.4}
                      style={{ transition: 'opacity 0.2s' }}
                    />
                    {/* Solid centre dot — grows on hover */}
                    <motion.circle
                      cx={city.x} cy={city.y}
                      fill="currentColor"
                      animate={{ r: isHovered ? 8 : 5 }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* City label */}
                    <text
                      x={labelX} y={labelY}
                      fill={CREAM} fontSize="11" fontFamily="Georgia, serif"
                      letterSpacing="2" textAnchor={textAnchor}
                      opacity={isHovered ? 1 : 0.55}
                      style={{ transition: 'opacity 0.2s', userSelect: 'none' }}
                    >
                      {city.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* ── Atmospheric particles (Layer 3 front) ── */}
              {!reducedMotion && PARTICLES.map((p) => (
                <circle
                  key={p.id}
                  cx={p.cx} cy={p.cy} r={p.r}
                  fill={palette.particleColor || 'currentColor'} opacity={p.opacity}
                  aria-hidden="true"
                  style={{
                    '--y-drift': `${p.yDrift}px`,
                    animation: `vsoeFloatY ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    willChange: 'transform',
                  } as React.CSSProperties}
                />
              ))}

              {/* ── Night stars ── */}
              {mode === 'night' && !reducedMotion && STARS.map((s) => (
                <circle
                  key={s.id}
                  cx={s.cx} cy={s.cy} r={s.r}
                  fill={CREAM}
                  aria-hidden="true"
                  style={{
                    opacity: 0, // baseline handled by keyframe
                    animation: `vsoeStarPulse ${s.duration}s ease-in-out ${s.delay}s infinite`,
                    willChange: 'opacity, transform',
                  }}
                />
              ))}

              {/* ── Compass rose (Static now) ── */}
              <CompassRose accent={palette.accent} />

              {/* ── Bottom labels ── */}
              <text x={22} y={VB_H - 18} fill="currentColor" fontSize="8.5" fontFamily="sans-serif" letterSpacing="3" opacity="0.45">
                {(t.routeMap?.network ?? 'Venice Simplon-Orient-Express Network').toUpperCase()}
              </text>
              <text x={VB_W - 22} y={VB_H - 18} fill={CREAM} fontSize="8.5" fontFamily="Georgia, serif" opacity="0.28" textAnchor="end" fontStyle="italic">
                Est. 1982
              </text>

              {/* Vignette overlay (top of SVG stack) */}
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-vignette-svg)" pointerEvents="none" />
            </svg>

            {/* ══════════════════════════════════════════════
                LAYER 3 — HTML hit zones + tooltips
                Each city: one unified div that covers both
                the SVG marker AND the tooltip above it.
                onMouseEnter/Leave with 100ms delay on close.
            ══════════════════════════════════════════════ */}
            {CITY_DATA.map((city) => {
              const isHovered = hoveredCity === city.id;
              const leftPct   = `${(city.x / VB_W) * 100}%`;
              const topPct    = `${(city.y / VB_H) * 100}%`;

              return (
                <div
                  key={city.id}
                  className="absolute"
                  style={{
                    left:      leftPct,
                    top:       topPct,
                    transform: 'translate(-50%, -50%)',
                    width:     '32px',
                    height:    '32px',
                    cursor:    'pointer',
                    zIndex:    15,
                  }}
                  onMouseEnter={() => handleCityEnter(city.id)}
                  onMouseLeave={handleCityLeave}
                >
                  {/* Tooltip — rendered inside the same hit zone (no gap ever) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.93 }}
                        transition={{ duration: 0.18 }}
                        className="absolute bottom-[28px] left-1/2 pointer-events-auto"
                        style={{ transform: 'translateX(-50%) translateY(-100%)' }}
                        /* Extra safety: tooltip itself also extends the hover */
                        onMouseEnter={() => handleCityEnter(city.id)}
                        onMouseLeave={handleCityLeave}
                      >
                        {/* Card */}
                        <div
                          className="border backdrop-blur-sm px-5 py-4 text-center shadow-2xl"
                          style={{
                            minWidth:        '172px',
                            backgroundColor: `${palette.bg}f2`,
                            borderColor:     `${palette.accent}55`,
                            transition:      modeTransition,
                          }}
                        >
                          <p className="font-serif text-vsoe-cream text-sm tracking-[0.12em] uppercase mb-1">
                            {city.label}
                          </p>
                          <p className="font-sans text-white/55 text-[10px] tracking-wide mb-3 leading-relaxed">
                            {city.sub}
                          </p>
                          <Link
                            href={`/book${city.routeQuery}`}
                            className="text-[9px] uppercase tracking-[0.18em] font-sans border px-3 py-1 inline-block whitespace-nowrap"
                            style={{
                              color:           palette.accent,
                              borderColor:     `${palette.accent}50`,
                              transition:      'all 0.2s ease',
                            }}
                          >
                            {t.routeMap?.viewJourneys ?? 'View Journeys'} →
                          </Link>
                        </div>
                        {/* Caret pointing down toward marker */}
                        <div
                          className="absolute left-1/2 top-full"
                          style={{
                            transform: 'translateX(-50%)',
                            width: 0, height: 0,
                            borderLeft:  '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop:   `6px solid ${palette.accent}55`,
                          }}
                        />
                        {/* The Umbilical Cord (Invisible bridge linking tooltip directly to marker) */}
                        <div 
                          className="absolute left-1/2 top-full -translate-x-1/2 bg-transparent"
                          style={{ width: '40px', height: '34px' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
