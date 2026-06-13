'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useTrackInterest } from '@/lib/profiling';

const ease = [0.25, 1, 0.5, 1] as const;

// SVG route paths — curved lines between city pairs
// ViewBox: 0 0 300 80
const ROUTE_PATHS = {
  'paris-venice': {
    path: 'M 20 40 C 80 20, 160 55, 280 45',
    from: 'Paris',
    to: 'Venice',
    fromX: 20, fromY: 40,
    toX: 280, toY: 45,
    waypoints: [
      { cx: 20, cy: 40 },
      { cx: 80, cy: 25 },
      { cx: 140, cy: 38 },
      { cx: 210, cy: 50 },
      { cx: 280, cy: 45 },
    ],
  },
  'paris-istanbul': {
    path: 'M 20 40 C 100 15, 200 60, 280 35',
    from: 'Paris',
    to: 'Istanbul',
    fromX: 20, fromY: 40,
    toX: 280, toY: 35,
    waypoints: [
      { cx: 20, cy: 40 },
      { cx: 85, cy: 22 },
      { cx: 150, cy: 42 },
      { cx: 220, cy: 52 },
      { cx: 280, cy: 35 },
    ],
  },
  'venice-paris': {
    path: 'M 20 45 C 80 55, 180 20, 280 40',
    from: 'Venice',
    to: 'Paris',
    fromX: 20, fromY: 45,
    toX: 280, toY: 40,
    waypoints: [
      { cx: 20, cy: 45 },
      { cx: 75, cy: 52 },
      { cx: 140, cy: 35 },
      { cx: 210, cy: 28 },
      { cx: 280, cy: 40 },
    ],
  },
};

export default function GrandTourSection() {
  const { t } = useTranslation();
  useTrackInterest('adventure');

  const JOURNEYS = [
    {
      id: 'paris-venice' as const,
      routeParam: 'classic',
      title: t.routes.journey1Title,
      route: t.routes.journey1Route,
      duration: t.routes.journey1Duration,
      image: '/images/vsoe/vsoe-paris-departure.jpg',
      description: t.routes.journey1Desc,
      price: t.routes.journey1Price,
      dates: t.routes.journey1Dates,
      flagship: false,
    },
    {
      id: 'paris-istanbul' as const,
      routeParam: 'italian',
      title: t.routes.journey2Title,
      route: t.routes.journey2Route,
      duration: t.routes.journey2Duration,
      image: '/images/vsoe/vsoe-dining-car.jpg',
      description: t.routes.journey2Desc,
      price: t.routes.journey2Price,
      dates: t.routes.journey2Dates,
      flagship: true,
    },
    {
      id: 'venice-paris' as const,
      routeParam: 'gateway',
      title: t.routes.journey3Title,
      route: t.routes.journey3Route,
      duration: t.routes.journey3Duration,
      image: '/images/vsoe/vsoe-venice-night.jpg',
      description: t.routes.journey3Desc,
      price: t.routes.journey3Price,
      dates: t.routes.journey3Dates,
      flagship: false,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeJourney = JOURNEYS[activeIndex];
  const routeData = ROUTE_PATHS[activeJourney.id];

  return (
    <section id="track-adventure" className="w-full bg-vsoe-midnight py-16 relative z-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-6 mb-12"
        >
          <div className="w-8 h-px bg-vsoe-gold/50" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-vsoe-gold font-bold">
            Journeys
          </span>
          <div className="flex-1 h-px bg-vsoe-gold/10" />
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="flex gap-0 mb-8 border border-vsoe-gold/15 rounded-sm overflow-hidden w-fit"
        >
          {JOURNEYS.map((journey, index) => (
            <button
              key={journey.id}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-3 text-[8px] uppercase tracking-[0.4em] font-bold transition-all duration-300 border-r border-vsoe-gold/15 last:border-r-0 ${
                activeIndex === index
                  ? 'bg-vsoe-gold text-vsoe-midnight'
                  : 'text-vsoe-gold/50 hover:text-vsoe-gold hover:bg-vsoe-gold/5'
              }`}
            >
              {journey.route}
            </button>
          ))}
        </motion.div>

        {/* Active card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeJourney.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            className={`group relative flex flex-col md:flex-row overflow-hidden rounded-sm border border-vsoe-gold/10 hover:border-vsoe-gold/25 transition-colors duration-500 ${activeJourney.flagship ? 'bg-[#0d1220]' : 'bg-[#080c16]'}`}
          >
            {/* Image — 55% */}
            <div className="relative w-full md:w-[55%] overflow-hidden min-h-[320px] md:min-h-[500px]">
              <Image
                src={activeJourney.image}
                alt={activeJourney.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="55vw"
                priority
              />

              {/* Edge gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080c16]" />

              {/* Gold hover tint */}
              <div className="absolute inset-0 bg-vsoe-gold/0 group-hover:bg-vsoe-gold/5 transition-colors duration-700 pointer-events-none" />

              {/* Flagship badge */}
              {activeJourney.flagship && (
                <div className="absolute top-5 left-5 bg-vsoe-gold px-3 py-1 text-[8px] uppercase tracking-[0.4em] text-vsoe-midnight font-bold">
                  Signature Journey
                </div>
              )}

              {/* Route pill */}
              <div className="absolute bottom-5 left-5 border border-vsoe-gold/40 px-3 py-1 text-[8px] uppercase tracking-[0.3em] text-vsoe-gold backdrop-blur-sm bg-vsoe-midnight/70">
                {activeJourney.route}
              </div>
            </div>

            {/* Content — 45% */}
            <div className="relative w-full md:w-[45%] flex flex-col justify-center px-8 py-10 md:py-14 md:px-12">

              {/* Ghost index */}
              <span className="text-vsoe-gold/10 font-serif text-[60px] leading-none absolute top-4 right-6 select-none pointer-events-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              {/* Duration + dates */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-vsoe-gold/40" />
                <span className="text-[8px] uppercase tracking-[0.4em] text-vsoe-gold/60">
                  {activeJourney.duration} · {activeJourney.dates}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-serif leading-tight mb-3 ${activeJourney.flagship ? 'text-3xl md:text-4xl text-vsoe-gold' : 'text-2xl md:text-3xl text-vsoe-cream'}`}>
                {activeJourney.title}
              </h3>

              {/* Description */}
              <p className="text-vsoe-cream/50 text-sm leading-relaxed mb-6 max-w-[280px] font-sans">
                {activeJourney.description}
              </p>

              {/* ── SVG Route Map ── */}
              <div className="mb-6">
                <svg
                  viewBox="0 0 300 80"
                  className="w-full max-w-[280px] h-16 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="trainGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Dim base path */}
                  <path
                    d={routeData.path}
                    stroke="rgba(201,168,76,0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="none"
                  />

                  {/* Animated gold path drawing in */}
                  <motion.path
                    key={activeJourney.id}
                    d={routeData.path}
                    stroke="rgba(201,168,76,0.7)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] as const, delay: 0.2 }}
                  />

                  {/* Animated train dot — waypoint interpolation, cross-browser safe */}
                  <motion.circle
                    key={`train-${activeJourney.id}`}
                    r="3.5"
                    fill="rgba(201,168,76,1)"
                    filter="url(#trainGlow)"
                    initial={{
                      cx: routeData.waypoints[0].cx,
                      cy: routeData.waypoints[0].cy,
                      opacity: 0,
                    }}
                    animate={{
                      cx: routeData.waypoints.map((p: { cx: number; cy: number }) => p.cx),
                      cy: routeData.waypoints.map((p: { cx: number; cy: number }) => p.cy),
                      opacity: [0, 1, 1, 1, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      ease: 'easeInOut',
                      delay: 1.4,
                      times: [0, 0.25, 0.5, 0.75, 1],
                    }}
                  />

                  {/* Departure city dot */}
                  <motion.circle
                    key={`from-${activeJourney.id}`}
                    cx={routeData.fromX}
                    cy={routeData.fromY}
                    r="3"
                    fill="rgba(201,168,76,0.9)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />

                  {/* Arrival city dot */}
                  <motion.circle
                    key={`to-${activeJourney.id}`}
                    cx={routeData.toX}
                    cy={routeData.toY}
                    r="3"
                    fill="rgba(201,168,76,0.9)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                  />

                  {/* Departure label */}
                  <motion.text
                    key={`fromlabel-${activeJourney.id}`}
                    x={routeData.fromX}
                    y={routeData.fromY + 14}
                    textAnchor="middle"
                    fontSize="7"
                    letterSpacing="2"
                    fill="rgba(201,168,76,0.6)"
                    fontFamily="sans-serif"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    {routeData.from.toUpperCase()}
                  </motion.text>

                  {/* Arrival label */}
                  <motion.text
                    key={`tolabel-${activeJourney.id}`}
                    x={routeData.toX}
                    y={routeData.toY + 14}
                    textAnchor="middle"
                    fontSize="7"
                    letterSpacing="2"
                    fill="rgba(201,168,76,0.6)"
                    fontFamily="sans-serif"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    {routeData.to.toUpperCase()}
                  </motion.text>
                </svg>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-vsoe-gold/10 mb-6" />

              {/* Price + CTA */}
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-vsoe-cream/25 block mb-1">
                    From
                  </span>
                  <span className={`font-serif ${activeJourney.flagship ? 'text-2xl text-vsoe-gold' : 'text-xl text-vsoe-cream'}`}>
                    {activeJourney.price}
                  </span>
                  <span className="text-vsoe-cream/25 text-[10px] ml-1.5">per person</span>
                </div>

                <Link
                  href={`/book?route=${activeJourney.routeParam}`}
                  className={`flex items-center gap-2.5 px-5 py-2.5 text-[8px] uppercase tracking-[0.35em] font-bold transition-all duration-300 ${
                    activeJourney.flagship
                      ? 'bg-vsoe-gold text-vsoe-midnight hover:bg-vsoe-cream'
                      : 'border border-vsoe-gold/30 text-vsoe-gold hover:border-vsoe-gold hover:bg-vsoe-gold/8'
                  }`}
                >
                  Reserve
                  <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
