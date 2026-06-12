'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// ─── Scene data ───────────────────────────────────────────────────────────────
const scenes = [
  {
    city: 'Paris',
    time: '18:32',
    label: 'The Departure',
    desc: 'Platform 8, Gare de Lyon. The locomotive breathes steam into the amber evening.',
    bg: '/images/vsoe/vsoe-paris-station.jpg',
    mid: '/images/vsoe/vsoe-sky-night.jpg',
    fg: '/images/vsoe/vsoe-train-exterior.jpg',
  },
  {
    city: 'Countryside',
    time: '23:14',
    label: 'The Journey',
    desc: 'Rolling hills dissolve into blue hour. The world outside slows to a different pace.',
    bg: '/images/vsoe/vsoe-countryside-blue.jpg',
    mid: '/images/vsoe/vsoe-countryside-green.jpg',
    fg: '/images/vsoe/vsoe-sunrise-fields.jpg',
  },
  {
    city: 'The Alps',
    time: '02:48',
    label: 'The Crossing',
    desc: 'Moonlight floods the Simplon Pass. Snow peaks rise and vanish into darkness.',
    bg: '/images/vsoe/vsoe-alpine-moonlight.jpg',
    mid: '/images/vsoe/vsoe-alpine-silhouette.jpg',
    fg: '/images/vsoe/vsoe-alpine-silhouette.jpg',
  },
  {
    city: 'Venice',
    time: '09:48',
    label: 'The Arrival',
    desc: 'Santa Lucia. The lagoon shimmers gold beyond the platform.',
    bg: '/images/vsoe/vsoe-venice-dawn.jpg',
    mid: '/images/vsoe/vsoe-sunrise-fields.jpg',
    fg: '/images/vsoe/vsoe-window-detail.jpg',
  },
];

const cities = ['Paris', 'Countryside', 'The Alps', 'Venice'];

export default function JourneyWindows() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ─── Scene opacities ──────────────────────────────────────────────────────
  // Each scene occupies ~25% of scroll range with overlap for crossfade
  const scene0Opacity = useTransform(scrollYProgress, [0, 0, 0.20, 0.28], [0, 1, 1, 0]);
  const scene1Opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.45, 0.53], [0, 1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.78], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.70, 0.78, 1.00, 1.00], [0, 1, 1, 1]);
  const sceneOpacities = [scene0Opacity, scene1Opacity, scene2Opacity, scene3Opacity];

  // ─── Carriage window overlay opacity ─────────────────────────────────────
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.24, 0.28, 0.43, 0.49, 0.53, 0.68, 0.74, 0.78],
    [0,    0.7,  0,    0,    0.7,  0,    0,    0.7,  0   ]
  );

  // ─── Background layer y transforms (slowest — ~60px total travel) ────────
  const bg0Y = useTransform(scrollYProgress, [0, 0.28], ['0px', '-60px']);
  const bg1Y = useTransform(scrollYProgress, [0.20, 0.53], ['40px', '-60px']);
  const bg2Y = useTransform(scrollYProgress, [0.45, 0.78], ['40px', '-60px']);
  const bg3Y = useTransform(scrollYProgress, [0.70, 1.00], ['40px', '-20px']);
  const bgYs = [bg0Y, bg1Y, bg2Y, bg3Y];

  // ─── Midground layer y transforms (medium — ~120px total travel) ─────────
  const mid0Y = useTransform(scrollYProgress, [0, 0.28], ['0px', '-120px']);
  const mid1Y = useTransform(scrollYProgress, [0.20, 0.53], ['80px', '-120px']);
  const mid2Y = useTransform(scrollYProgress, [0.45, 0.78], ['80px', '-120px']);
  const mid3Y = useTransform(scrollYProgress, [0.70, 1.00], ['80px', '-40px']);
  const midYs = [mid0Y, mid1Y, mid2Y, mid3Y];

  // ─── Foreground layer y transforms (fastest — ~200px total travel) ───────
  const fg0Y = useTransform(scrollYProgress, [0, 0.28], ['0px', '-200px']);
  const fg1Y = useTransform(scrollYProgress, [0.20, 0.53], ['120px', '-200px']);
  const fg2Y = useTransform(scrollYProgress, [0.45, 0.78], ['120px', '-200px']);
  const fg3Y = useTransform(scrollYProgress, [0.70, 1.00], ['120px', '-60px']);
  const fgYs = [fg0Y, fg1Y, fg2Y, fg3Y];

  // ─── Text opacity (scroll-position driven, not time-driven) ──────────────
  const text0Opacity = useTransform(scrollYProgress, [0.04, 0.12, 0.18, 0.25], [0, 1, 1, 0]);
  const text1Opacity = useTransform(scrollYProgress, [0.26, 0.34, 0.43, 0.50], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.51, 0.59, 0.68, 0.75], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.76, 0.84, 1.00, 1.00], [0, 1, 1, 1]);
  const textOpacities = [text0Opacity, text1Opacity, text2Opacity, text3Opacity];

  // ─── Text y (scroll-position driven lift) ────────────────────────────────
  const text0Y = useTransform(scrollYProgress, [0.04, 0.12], ['24px', '0px']);
  const text1Y = useTransform(scrollYProgress, [0.26, 0.34], ['24px', '0px']);
  const text2Y = useTransform(scrollYProgress, [0.51, 0.59], ['24px', '0px']);
  const text3Y = useTransform(scrollYProgress, [0.76, 0.84], ['24px', '0px']);
  const textYs = [text0Y, text1Y, text2Y, text3Y];

  // ─── Progress line fill height ────────────────────────────────────────────
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // ─── City dot opacities ───────────────────────────────────────────────────
  const dot0Opacity = useTransform(scrollYProgress, [0, 0.02, 0.20, 0.28], [0.3, 1, 1, 0.3]);
  const dot1Opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.45, 0.53], [0.3, 1, 1, 0.3]);
  const dot2Opacity = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.78], [0.3, 1, 1, 0.3]);
  const dot3Opacity = useTransform(scrollYProgress, [0.70, 0.78, 1.00, 1.00], [0.3, 1, 1, 1]);
  const dotOpacities = [dot0Opacity, dot1Opacity, dot2Opacity, dot3Opacity];

  // ─── City dot scales ──────────────────────────────────────────────────────
  const dot0Scale = useTransform(scrollYProgress, [0, 0.02, 0.20, 0.28], [0.8, 1.4, 1.4, 0.8]);
  const dot1Scale = useTransform(scrollYProgress, [0.20, 0.28, 0.45, 0.53], [0.8, 1.4, 1.4, 0.8]);
  const dot2Scale = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.78], [0.8, 1.4, 1.4, 0.8]);
  const dot3Scale = useTransform(scrollYProgress, [0.70, 0.78, 1.00, 1.00], [0.8, 1.4, 1.4, 0.8]);
  const dotScales = [dot0Scale, dot1Scale, dot2Scale, dot3Scale];

  // ─── Scroll hint opacity (fades out after scrolling begins) ──────────────
  // DECLARED HERE — never inside JSX. Rule 1.
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    // Outer container: 500vh scroll room. NO overflow-hidden — would clip layer movement.
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>

      {/* Sticky inner: pins to viewport for the full 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-vsoe-midnight">

        {/* ── Section label ── */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <div className="w-6 h-px bg-vsoe-gold mx-auto mb-3" />
          <span className="text-vsoe-gold text-[9px] font-bold uppercase tracking-[0.45em]">
            The Journey
          </span>
        </div>

        {/* ── Scene layers ── */}
        {scenes.map((scene, i) => (
          <motion.div
            key={scene.city}
            style={{ opacity: sceneOpacities[i] }}
            className="absolute inset-0"
          >
            {/* Background — slowest */}
            <motion.div
              style={{ y: bgYs[i] }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src={scene.bg}
                alt={scene.city}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </motion.div>

            {/* Midground — medium speed, screen blend for dark images */}
            <motion.div
              style={{ y: midYs[i] }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src={scene.mid}
                alt=""
                fill
                className="object-cover mix-blend-screen opacity-40"
                sizes="100vw"
              />
            </motion.div>

            {/* Foreground — fastest, low opacity texture layer */}
            <motion.div
              style={{ y: fgYs[i] }}
              className="absolute inset-0 scale-125"
            >
              <Image
                src={scene.fg}
                alt=""
                fill
                className="object-cover opacity-20"
                sizes="100vw"
              />
            </motion.div>

            {/* Radial vignette — dark edges, clear centre */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

            {/* Bottom fade — text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-vsoe-midnight/90 to-transparent pointer-events-none" />
          </motion.div>
        ))}

        {/* ── Carriage window overlay — flashes at scene boundaries ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <Image
            src="/images/vsoe/vsoe-window-detail.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-vsoe-midnight/40" />
        </motion.div>

        {/* ── Text overlays (one per scene, scroll-driven opacity and y) ── */}
        {scenes.map((scene, i) => (
          <div
            key={`text-${scene.city}`}
            className="absolute inset-x-0 bottom-0 z-25 flex flex-col items-center justify-end pb-20 pointer-events-none"
          >
            <motion.div
              style={{
                opacity: textOpacities[i],
                y: textYs[i],
              }}
              className="text-center px-8"
            >
              <div className="flex items-baseline justify-center gap-4 mb-2">
                <span className="font-serif text-4xl md:text-5xl text-vsoe-cream tracking-wide">
                  {scene.city}
                </span>
                <span className="font-mono text-vsoe-gold text-xs tracking-[0.3em] opacity-80">
                  {scene.time}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-[9px] uppercase tracking-[0.45em] text-vsoe-gold font-bold">
                  {scene.label}
                </span>
              </div>
              <p className="text-vsoe-cream/60 text-sm leading-relaxed max-w-sm mx-auto">
                {scene.desc}
              </p>
            </motion.div>
          </div>
        ))}

        {/* ── Vertical progress indicator ── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
          <div className="relative w-px bg-vsoe-gold/20" style={{ height: '160px' }}>
            {/* Animated fill */}
            <motion.div
              style={{ height: progressHeight }}
              className="absolute top-0 left-0 w-full bg-vsoe-gold origin-top"
            />
            {/* City dots */}
            {cities.map((city, i) => (
              <motion.div
                key={city}
                style={{
                  opacity: dotOpacities[i],
                  scale: dotScales[i],
                  top: `${(i / (cities.length - 1)) * 100}%`,
                }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-vsoe-gold"
              />
            ))}
          </div>
        </div>

        {/* ── Scroll hint — uses pre-declared const, not inline hook ── */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-vsoe-cream/40 text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-vsoe-gold/60 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
