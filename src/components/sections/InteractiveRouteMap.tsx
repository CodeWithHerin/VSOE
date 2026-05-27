'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const VB_W = 1200;
const VB_H = 600;
const GOLD   = '#C5A059';
const DARK   = '#050B14';
const CREAM  = '#F5F0E8';
const GOLD_H = '#D4B87A'; // highlight variant

// Route bezier paths (geographically approximated in the 1200×600 viewBox)
const PATH_LONDON_PARIS    = 'M 185 118 C 208 145 245 174 270 200';
const PATH_PARIS_VENICE    = 'M 270 200 C 368 232 495 272 590 295';
const PATH_VENICE_ISTANBUL = 'M 590 295 C 700 308 848 320 980 330';
// Full concatenated path for the train to follow
const TRAIN_PATH = 'M 185 118 C 208 145 245 174 270 200 C 368 232 495 272 590 295 C 700 308 848 320 980 330';

// Simplified vintage Europe coastlines — impressionistic, ~10-15 nodes each
// Coordinates calibrated to place London(185,118), Paris(270,200),
// Venice(590,295), Istanbul(980,330) in geographically plausible positions.
const COASTLINES = [
  // England + Wales (clockwise from SW tip)
  'M 108 50 C 128 28 165 5 192 8 C 215 22 220 52 218 80 C 215 100 222 118 220 128 C 185 130 108 138 34 148 C 26 162 32 185 40 198 C 52 198 72 190 84 184 C 98 176 108 162 110 148 C 113 132 112 118 108 108 Z',
  // Ireland
  'M 15 80 C 5 95 2 118 8 135 C 14 152 30 162 46 160 C 60 158 68 148 65 135 C 62 122 52 110 46 98 C 40 86 28 78 15 80 Z',
  // Iberian Peninsula (Spain + Portugal)
  'M 0 192 C 18 182 42 188 58 205 C 72 220 70 245 62 268 C 54 290 38 308 30 332 C 22 354 25 380 38 400 C 52 422 75 435 105 438 C 158 440 225 418 258 398 C 285 380 295 358 288 328 C 280 298 258 278 235 272 C 212 268 192 272 175 268 C 158 262 148 248 152 228 C 156 208 168 194 182 188',
  // NW France — Brittany peninsula
  'M 35 148 C 42 168 40 188 45 210 C 50 230 62 248 78 262 C 95 276 115 282 135 278 C 155 274 165 260 158 242 C 150 224 135 212 125 200 C 115 188 108 175 112 162 C 116 150 126 142 140 138',
  // France Mediterranean coast + Riviera
  'M 148 268 C 172 275 208 278 238 272 C 265 268 292 264 322 260 C 352 256 385 254 415 258 C 445 262 468 268 490 275',
  // Italian Peninsula — boot shape
  'M 490 275 C 515 280 540 295 555 312 C 570 328 575 348 570 368 C 565 388 552 408 538 425 C 524 440 508 450 492 448 C 478 446 468 435 468 420 C 468 405 478 390 485 376 C 492 358 492 340 485 322 C 478 305 462 295 448 290 C 432 285 415 286 400 290',
  // Adriatic — Balkan east coast
  'M 558 292 C 572 308 582 328 580 350 C 578 370 565 390 550 408 C 536 425 515 435 498 440',
  // Greece (simplified)
  'M 638 340 C 662 330 695 332 720 345 C 742 356 750 372 742 388 C 734 404 715 410 698 406 C 680 402 665 390 656 375 C 648 360 642 348 638 340',
  // Turkey — Black Sea north coast
  'M 928 268 C 958 260 990 258 1020 265 C 1050 272 1072 282 1086 295',
  // Turkey — Aegean / Mediterranean south coast
  'M 848 332 C 880 324 914 320 948 324 C 975 328 1002 336 1025 345 C 1050 355 1070 365 1084 368',
  // North Africa — Mediterranean shoreline
  'M 45 490 C 155 478 290 472 440 475 C 588 478 740 475 890 482 C 980 486 1078 495 1145 505',
  // Scandinavia — Denmark + partial Norway hints
  'M 322 0 C 335 20 342 45 338 65 C 334 80 322 90 310 92',
  'M 390 0 C 402 24 410 52 404 75',
  'M 450 0 C 462 28 468 58 460 82 C 454 98 438 108 420 105',
];

// ─────────────────────────────────────────────────────────────────────────────
// Train icon — 1920s steam locomotive, front facing positive-x (right)
// Origin at (0, 0); animateMotion will translate this along the path.
// ─────────────────────────────────────────────────────────────────────────────
function SteamLocomotive() {
  return (
    <g>
      {/* ── Tender (coal car, rear) ── */}
      <rect x={-28} y={-5} width={12} height={8} rx={1} fill={GOLD} opacity={0.85} />
      <rect x={-27} y={-8} width={10} height={4} rx={1} fill={GOLD} opacity={0.75} />

      {/* ── Cab body ── */}
      <rect x={-18} y={-10} width={13} height={13} rx={1} fill={GOLD} />
      {/* Cab roof */}
      <rect x={-20} y={-12} width={17} height={3} rx={1} fill={GOLD_H} />
      {/* Cab windows */}
      <rect x={-15} y={-8} width={4} height={3.5} rx={0.5} fill={DARK} opacity={0.75} />
      <rect x={-9}  y={-8} width={4} height={3.5} rx={0.5} fill={DARK} opacity={0.75} />

      {/* ── Boiler (main barrel) ── */}
      <rect x={-5} y={-7} width={24} height={10} rx={5} fill={GOLD} />

      {/* Steam dome on top of boiler */}
      <ellipse cx={4}  cy={-8.5} rx={3.5} ry={2.5} fill={GOLD} />
      {/* Front boiler dome / headlamp housing */}
      <ellipse cx={18} cy={-3.5} rx={3}   ry={3}   fill={GOLD_H} />

      {/* ── Smokestack ── */}
      <rect x={8} y={-16} width={4.5} height={10} rx={1.5} fill={GOLD} />
      {/* Stack cap — wider at top */}
      <ellipse cx={10} cy={-16} rx={5.5} ry={1.8} fill={GOLD_H} />

      {/* Headlight */}
      <circle cx={20} cy={-1.5} r={2} fill={GOLD_H} opacity={0.9} />
      {/* Front buffer plate */}
      <rect x={20} y={1} width={2.5} height={5} rx={0.5} fill={GOLD} />

      {/* ── Running board / footplate ── */}
      <rect x={-28} y={3} width={52} height={1.5} fill={GOLD} opacity={0.9} />

      {/* ── Wheels ── */}
      {/* Tender wheels */}
      <circle cx={-22} cy={6.5} r={3.5} fill={DARK} stroke={GOLD} strokeWidth={1}   />
      <circle cx={-12} cy={6.5} r={3.5} fill={DARK} stroke={GOLD} strokeWidth={1}   />
      {/* Main driving wheels (larger) */}
      <circle cx={-1}  cy={6.5} r={4.5} fill={DARK} stroke={GOLD} strokeWidth={1.3} />
      <circle cx={11}  cy={6.5} r={4.5} fill={DARK} stroke={GOLD} strokeWidth={1.3} />
      {/* Front pony wheel */}
      <circle cx={20}  cy={6.5} r={3}   fill={DARK} stroke={GOLD} strokeWidth={1}   />

      {/* ── Connecting / piston rods ── */}
      <line x1={-1} y1={6.5} x2={11}  y2={6.5} stroke={GOLD} strokeWidth={1.5} opacity={0.75} />
      <rect x={11}  y={5}   width={9}  height={2} rx={1} fill={GOLD} opacity={0.8} />
      <line x1={-8} y1={6.5} x2={-1}  y2={6.5} stroke={GOLD} strokeWidth={1}   opacity={0.5} />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function InteractiveRouteMap() {
  const { t } = useTranslation();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [trainDone, setTrainDone]     = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });

  const CITY_DATA = [
    {
      id: 'london',
      x: 185, y: 118,
      label: t.routeMap?.londonLabel   ?? 'London',
      sub:   t.routeMap?.londonSub     ?? 'Belmond British Pullman departure',
      slug:  'london',
    },
    {
      id: 'paris',
      x: 270, y: 200,
      label: t.routeMap?.parisLabel    ?? 'Paris',
      sub:   t.routeMap?.parisSub      ?? 'Classic departure city',
      slug:  'paris-venice',
    },
    {
      id: 'venice',
      x: 590, y: 295,
      label: t.routeMap?.veniceLabel   ?? 'Venice',
      sub:   t.routeMap?.veniceSub     ?? 'The Floating City',
      slug:  'paris-venice',
    },
    {
      id: 'istanbul',
      x: 980, y: 330,
      label: t.routeMap?.istanbulLabel ?? 'Istanbul',
      sub:   t.routeMap?.istanbulSub   ?? 'Continental terminus',
      slug:  'paris-istanbul',
    },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full bg-vsoe-midnight relative z-10"
      id="interactive-route-map"
      aria-label="Interactive European Route Map"
    >
      {/* ── Section Header ── */}
      <div className="container mx-auto px-6 md:px-12 pt-16 pb-8 text-center">
        <motion.p
          className="text-[10px] uppercase tracking-[0.35em] text-vsoe-gold mb-3 font-sans"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.routeMap?.grandTour ?? 'European Grand Tour'}
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-5xl text-vsoe-cream mb-5 leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.map?.network ?? 'Venice Simplon-Orient-Express Network'}
        </motion.h2>
        <motion.div
          className="w-16 h-px bg-vsoe-gold mx-auto"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* ── Map Outer Frame ── */}
      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 pb-10">
        <div className="relative">
          {/* Art-Deco corner ornaments */}
          <div className="absolute top-0 left-0  w-10 h-10 border-t-2 border-l-2 border-vsoe-gold z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-vsoe-gold z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0  w-10 h-10 border-b-2 border-l-2 border-vsoe-gold z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-vsoe-gold z-10 pointer-events-none" />
          {/* Center-top / center-bottom gold accents */}
          <div className="absolute top-0    left-1/2 -translate-x-1/2 w-20 h-0.5 bg-vsoe-gold z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-vsoe-gold z-10 pointer-events-none" />

          {/* ── SVG + tooltip layer ── */}
          <div className="relative w-full" style={{ aspectRatio: '2 / 1' }}>

            {/* ──────────── SVG MAP ──────────── */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Train path for animateMotion */}
                <path id="vsoe-train-route" d={TRAIN_PATH} />

                {/* Subtle grid pattern */}
                <pattern id="vsoe-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.055" />
                </pattern>

                {/* Radial vignette */}
                <radialGradient id="vsoe-vignette" cx="50%" cy="50%" r="65%">
                  <stop offset="30%" stopColor="transparent"  stopOpacity="0"   />
                  <stop offset="100%" stopColor={DARK}        stopOpacity="0.82" />
                </radialGradient>
              </defs>

              {/* ── Background layers ── */}
              <rect width={VB_W} height={VB_H} fill={DARK} />
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-grid)" />
              <rect width={VB_W} height={VB_H} fill="url(#vsoe-vignette)" />

              {/* ── Vintage coastlines (8% opacity, cream) ── */}
              <g
                stroke={CREAM}
                strokeWidth="1.2"
                fill="none"
                opacity="0.08"
                strokeLinejoin="round"
                strokeLinecap="round"
              >
                {COASTLINES.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>

              {/* ── Route lines ── */}
              {/* London → Paris  — thin dashed (British Pullman connection) */}
              <motion.path
                d={PATH_LONDON_PARIS}
                stroke={GOLD}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
                transition={{ duration: 1.5, delay: 0, ease: 'easeInOut' }}
              />
              {/* Paris → Venice — solid, featured (Classic Route) */}
              <motion.path
                d={PATH_PARIS_VENICE}
                stroke={GOLD}
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
              {/* Venice → Istanbul — dashed, dimmer (Grand Express) */}
              <motion.path
                d={PATH_VENICE_ISTANBUL}
                stroke={GOLD}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="8 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
              />

              {/* ── Route line labels ── */}
              <text x={214} y={128} fill={GOLD} fontSize="7.5" fontFamily="sans-serif"
                letterSpacing="1.5" opacity="0.45" transform="rotate(-14, 214, 128)">
                BRITISH PULLMAN
              </text>
              <text x={395} y={222} fill={GOLD} fontSize="7.5" fontFamily="sans-serif"
                letterSpacing="1.5" opacity="0.5" transform="rotate(-7, 395, 222)">
                THE CLASSIC ROUTE
              </text>
              <text x={760} y={288} fill={GOLD} fontSize="7.5" fontFamily="sans-serif"
                letterSpacing="1.5" opacity="0.4" transform="rotate(-3, 760, 288)">
                THE GRAND EXPRESS
              </text>

              {/* ── Steam locomotive (SMIL path motion + Framer Motion opacity) ── */}
              {isInView && !trainDone && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 7, times: [0, 0.05, 0.88, 1], ease: 'easeInOut' }}
                  onAnimationComplete={() => setTrainDone(true)}
                >
                  {/* SMIL animateMotion — child of the group it animates */}
                  <animateMotion dur="7s" fill="freeze" rotate="auto">
                    <mpath href="#vsoe-train-route" />
                  </animateMotion>
                  <SteamLocomotive />
                </motion.g>
              )}

              {/* ── City markers ── */}
              {CITY_DATA.map((city, i) => {
                const isHovered = hoveredCity === city.id;
                // Label anchor: most cities label to the right; Istanbul labels above-left to avoid edge
                const labelX    = city.id === 'istanbul' ? city.x - 14 : city.x + 14;
                const labelY    = city.id === 'istanbul' ? city.y - 14 : city.y - 13;
                const textAnchor = city.id === 'istanbul' ? 'end' : 'start';

                return (
                  <g
                    key={city.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onTouchStart={() => setHoveredCity(hoveredCity === city.id ? null : city.id)}
                  >
                    {/* Transparent hit area (larger tap target) */}
                    <circle cx={city.x} cy={city.y} r={28} fill="transparent" />

                    {/* Outer pulse ring — animates radius, not scale */}
                    <motion.circle
                      cx={city.x} cy={city.y}
                      fill="none"
                      stroke={GOLD}
                      strokeWidth="0.8"
                      initial={{ r: 12, opacity: 0.3 }}
                      animate={isInView ? { r: [12, 30, 12], opacity: [0.3, 0, 0.3] } : {}}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.55,
                      }}
                    />

                    {/* Static inner ring */}
                    <circle
                      cx={city.x} cy={city.y}
                      r={8}
                      fill="none"
                      stroke={GOLD}
                      strokeWidth="1"
                      opacity={isHovered ? 1 : 0.4}
                      style={{ transition: 'opacity 0.2s' }}
                    />

                    {/* Solid gold dot — grows on hover */}
                    <motion.circle
                      cx={city.x} cy={city.y}
                      fill={GOLD}
                      animate={{ r: isHovered ? 8 : 5 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* City name label */}
                    <text
                      x={labelX}
                      y={labelY}
                      fill={CREAM}
                      fontSize="11"
                      fontFamily="Georgia, serif"
                      letterSpacing="2"
                      textAnchor={textAnchor}
                      opacity={isHovered ? 1 : 0.55}
                      style={{ transition: 'opacity 0.2s', userSelect: 'none' }}
                    >
                      {city.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* ── Bottom bar labels ── */}
              <text
                x={22} y={VB_H - 18}
                fill={GOLD} fontSize="8.5" fontFamily="sans-serif"
                letterSpacing="3" opacity="0.45"
              >
                {(t.routeMap?.network ?? 'Venice Simplon-Orient-Express Network').toUpperCase()}
              </text>
              <text
                x={VB_W - 22} y={VB_H - 18}
                fill={CREAM} fontSize="8.5" fontFamily="Georgia, serif"
                opacity="0.28" textAnchor="end" fontStyle="italic"
              >
                Est. 1982
              </text>
            </svg>

            {/* ──────────── HTML Tooltip Overlays ──────────── */}
            <AnimatePresence>
              {CITY_DATA.map((city) =>
                hoveredCity === city.id ? (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.92 }}
                    transition={{ duration: 0.18 }}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: `${(city.x / VB_W) * 100}%`,
                      top:  `${(city.y / VB_H) * 100}%`,
                      transform: 'translate(-50%, calc(-100% - 22px))',
                    }}
                  >
                    {/* Tooltip card */}
                    <div className="bg-[#050B14]/95 border border-vsoe-gold/40 backdrop-blur-sm px-5 py-4 text-center min-w-[168px] shadow-2xl">
                      <p className="font-serif text-vsoe-cream text-sm tracking-[0.12em] uppercase mb-1">
                        {city.label}
                      </p>
                      <p className="font-sans text-white/55 text-[10px] tracking-wide mb-3 leading-relaxed">
                        {city.sub}
                      </p>
                      <Link
                        href={`/destinations/${city.slug}`}
                        className="pointer-events-auto text-[9px] uppercase tracking-[0.18em] text-vsoe-gold hover:text-vsoe-cream transition-colors duration-200 font-sans border border-vsoe-gold/40 hover:border-vsoe-gold hover:bg-vsoe-gold/10 px-3 py-1 inline-block"
                      >
                        {t.routeMap?.viewJourneys ?? 'View Journeys'} →
                      </Link>
                    </div>
                    {/* Downward caret */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full"
                      style={{
                        width: 0, height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid rgba(197,160,89,0.4)',
                      }}
                    />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
