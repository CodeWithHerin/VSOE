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

const PALETTES: Record<TimeOfDay, ModePalette> = {
  dawn:  { bg: '#1A0E08', bgCenter: '#2A1812', accent: '#E8B87C', overlay: 'rgba(240,160,80, 0.10)'  },
  day:   { bg: '#0E1828', bgCenter: '#182238', accent: '#D4C89A', overlay: 'rgba(210,200,160,0.06)'  },
  dusk:  { bg: '#050B14', bgCenter: '#0A1525', accent: '#C5A059', overlay: 'rgba(160,80,20, 0.08)'   },
  night: { bg: '#020610', bgCenter: '#050A1A', accent: '#8BAAD4', overlay: 'rgba(30,50,120, 0.18)'   },
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
const TRAIN_PATH = 'M 185 118 C 208 145 245 174 270 200 C 368 232 495 272 590 295 C 700 308 848 320 980 330';

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

// Seeded deterministic particles (no Math.random — avoids hydration mismatch)
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id:       i,
  cx:       80  + (i * 47 + 13) % 1060,
  cy:       40  + (i * 31 + 17) % 520,
  r:        1   + (i % 3) * 0.4,
  duration: 8   + (i % 7),
  delay:    (i  * 0.4) % 6,
  yDrift:   -10 + (i % 5) * 5,
  opacity:  0.15 + (i % 4) * 0.06,
}));

// Night-sky stars
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id:       i,
  cx:       50  + (i * 67 + 23) % 1100,
  cy:       20  + (i * 43 + 11) % 200,
  r:        0.8 + (i % 3) * 0.3,
  duration: 2   + (i % 3),
  delay:    (i  * 0.3) % 4,
}));

// Cloud drift positions
const CLOUDS = [
  { cx: 280,  cy: 145, rx: 300, ry: 65, dur: 22, drift: 20, delay: 0  },
  { cx: 700,  cy: 420, rx: 340, ry: 55, dur: 28, drift: 30, delay: 6  },
  { cx: 1050, cy: 200, rx: 220, ry: 50, dur: 20, drift: 15, delay: 10 },
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
// Sub-component: CompassRose
// ─────────────────────────────────────────────────────────────────────────────
function CompassRose({ accent, reducedMotion }: { accent: string; reducedMotion: boolean }) {
  return (
    <g opacity={0.48}>
      {/* Outer dashed ring — slow rotation */}
      <motion.g
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      >
        <circle cx={CX} cy={CY} r={29} fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 4" />
      </motion.g>

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
}

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
    { id: 'london',   x: 185, y: 118, slug: 'london',        label: t.routeMap?.londonLabel   ?? 'London',   sub: t.routeMap?.londonSub   ?? 'Belmond British Pullman departure' },
    { id: 'paris',    x: 270, y: 200, slug: 'paris-venice',  label: t.routeMap?.parisLabel    ?? 'Paris',    sub: t.routeMap?.parisSub    ?? 'Classic departure city'             },
    { id: 'venice',   x: 590, y: 295, slug: 'paris-venice',  label: t.routeMap?.veniceLabel   ?? 'Venice',   sub: t.routeMap?.veniceSub   ?? 'The Floating City'                  },
    { id: 'istanbul', x: 980, y: 330, slug: 'paris-istanbul', label: t.routeMap?.istanbulLabel ?? 'Istanbul', sub: t.routeMap?.istanbulSub ?? 'Continental terminus'               },
  ];

  // Shared transition value for time-of-day palette changes
  const modeTransition = reducedMotion ? 'none' : 'all 1.5s ease';

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full relative z-10"
      id="interactive-route-map"
      aria-label="Interactive European Route Map"
      style={{ backgroundColor: palette.bg, transition: modeTransition }}
    >

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
                LAYER 1 — Destination background images
            ══════════════════════════════════════════════ */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {CITY_DATA.map((city) => (
                <div
                  key={city.id}
                  className="absolute inset-0"
                  style={{ opacity: hoveredCity === city.id ? 0.30 : 0, transition: 'opacity 700ms ease-in-out' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CITY_IMAGES[city.id]}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    loading="eager"
                    style={{ filter: 'sepia(0.25) saturate(0.75)', mixBlendMode: 'luminosity' }}
                  />
                </div>
              ))}

              {/* Heavy radial vignette (always above images) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, ${palette.bg} 83%)`,
                  transition: modeTransition,
                }}
              />
              {/* Time-of-day atmospheric tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: palette.overlay, transition: modeTransition }}
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
                <path id="vsoe-train-route" d={TRAIN_PATH} />

                {/* Grid */}
                <pattern id="vsoe-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.055" />
                </pattern>

                {/* Radial background gradient */}
                <radialGradient id="vsoe-bg-grad" cx="50%" cy="50%" r="60%">
                  <stop offset="0%"   stopColor={palette.bgCenter} />
                  <stop offset="100%" stopColor={palette.bg}       />
                </radialGradient>

                {/* Vignette */}
                <radialGradient id="vsoe-vignette" cx="50%" cy="50%" r="65%">
                  <stop offset="30%"  stopColor="transparent"  stopOpacity="0"    />
                  <stop offset="100%" stopColor={palette.bg}   stopOpacity="0.78" />
                </radialGradient>

                {/* Coastline glow/bloom filter */}
                <filter id="vsoe-coast-glow" x="-15%" y="-15%" width="130%" height="130%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"         />
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-bg-grad)" />
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-grid)"    />

              {/* ── Cloud drift (atmospheric depth, Layer 1 back) ── */}
              {!reducedMotion && (
                <g aria-hidden="true" pointerEvents="none">
                  {CLOUDS.map((c, i) => (
                    <motion.ellipse
                      key={i}
                      cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
                      fill={CREAM} opacity={0.025}
                      animate={{ x: [-c.drift, c.drift, -c.drift] }}
                      transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
                    />
                  ))}
                </g>
              )}

              {/* ── Coastlines (Layer 2 mid — bloom + main) ── */}
              {/* Bloom copy (blurred, accent-tinted) */}
              <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.05"
                filter="url(#vsoe-coast-glow)" pointerEvents="none" aria-hidden="true">
                {COASTLINES.map((d, i) => <path key={i} d={d} />)}
              </g>
              {/* Primary coastlines (cream) */}
              <g stroke={CREAM} strokeWidth="1.2" fill="none" opacity="0.09"
                strokeLinejoin="round" strokeLinecap="round" pointerEvents="none" aria-hidden="true">
                {COASTLINES.map((d, i) => <path key={i} d={d} />)}
              </g>

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

              {/* ── Steam locomotive (SMIL motion + Framer Motion opacity) ── */}
              {isInView && !trainDone && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 7, times: [0, 0.05, 0.88, 1], ease: 'easeInOut' }}
                  onAnimationComplete={() => setTrainDone(true)}
                >
                  <animateMotion dur="7s" fill="freeze" rotate="auto">
                    <mpath href="#vsoe-train-route" />
                  </animateMotion>
                  <SteamLocomotive accent={palette.accent} />
                </motion.g>
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
                <motion.circle
                  key={p.id}
                  cx={p.cx} cy={p.cy} r={p.r}
                  fill="currentColor" opacity={p.opacity}
                  animate={{ y: [0, p.yDrift, 0] }}
                  transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                  aria-hidden="true"
                />
              ))}

              {/* ── Night stars ── */}
              <AnimatePresence>
                {mode === 'night' && !reducedMotion && STARS.map((s) => (
                  <motion.circle
                    key={s.id}
                    cx={s.cx} cy={s.cy} r={s.r}
                    fill={CREAM}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.2, 0.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
                    aria-hidden="true"
                  />
                ))}
              </AnimatePresence>

              {/* ── Compass rose (top-right ornament) ── */}
              <CompassRose accent={palette.accent} reducedMotion={reducedMotion} />

              {/* ── Bottom labels ── */}
              <text x={22} y={VB_H - 18} fill="currentColor" fontSize="8.5" fontFamily="sans-serif" letterSpacing="3" opacity="0.45">
                {(t.routeMap?.network ?? 'Venice Simplon-Orient-Express Network').toUpperCase()}
              </text>
              <text x={VB_W - 22} y={VB_H - 18} fill={CREAM} fontSize="8.5" fontFamily="Georgia, serif" opacity="0.28" textAnchor="end" fontStyle="italic">
                Est. 1982
              </text>

              {/* Vignette overlay (top of SVG stack) */}
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-vignette)" pointerEvents="none" />
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
                    // Centre hit zone on marker, then add padding that extends
                    // upward to enclose the tooltip (no gap = no hover break)
                    transform:    'translate(-50%, -50%)',
                    paddingTop:   '140px',  // covers tooltip height above marker
                    paddingBottom:'28px',
                    paddingLeft:  '72px',
                    paddingRight: '72px',
                    cursor:  'pointer',
                    zIndex:  15,
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
                            href={`/destinations/${city.slug}`}
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
