'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';

const scenes = [
  {
    city: 'Paris',
    time: '18:32',
    label: 'The Departure',
    desc: 'Platform 8, Gare de Lyon. The locomotive breathes steam into the amber evening.',
    bg: '/images/vsoe/vsoe-paris-station.jpg',
    mid: '/images/vsoe/vsoe-sky-night.jpg',
    fg: '/images/vsoe/vsoe-train-exterior.jpg',
    midOpacity: 0.08,
  },
  {
    city: 'Countryside',
    time: '23:14',
    label: 'The Journey',
    desc: 'Rolling hills dissolve into blue hour. The world outside slows to a different pace.',
    bg: '/images/vsoe/vsoe-countryside-blue.jpg',
    mid: '/images/vsoe/vsoe-countryside-green.jpg',
    fg: '/images/vsoe/vsoe-sunrise-fields.jpg',
    midOpacity: 0,
  },
  {
    city: 'The Alps',
    time: '02:48',
    label: 'The Crossing',
    desc: 'Moonlight floods the Simplon Pass. Snow peaks rise and vanish into darkness.',
    bg: '/images/vsoe/vsoe-alpine-moonlight.jpg',
    mid: '/images/vsoe/vsoe-alpine-silhouette.jpg',
    fg: '/images/vsoe/vsoe-alpine-silhouette.jpg',
    midOpacity: 0.06,
  },
  {
    city: 'Venice',
    time: '09:48',
    label: 'The Arrival',
    desc: 'Santa Lucia. The lagoon shimmers gold beyond the platform.',
    bg: '/images/vsoe/vsoe-venice-dawn.jpg',
    mid: '/images/vsoe/vsoe-sunrise-fields.jpg',
    fg: '/images/vsoe/vsoe-window-detail.jpg',
    midOpacity: 0,
  },
];

const cities = ['Paris', 'Countryside', 'The Alps', 'Venice'];

// Blinking clock display — colon pulses like a real digital clock
function ClockTime({ time }: { time: string }) {
  const [parts] = time.split(':');
  const minutes = time.split(':')[1];
  return (
    <div className="flex items-center justify-center gap-0 font-mono text-[11px] tracking-[0.25em] text-vsoe-gold/70 mb-1">
      <span>{parts}</span>
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-[1px]"
      >
        :
      </motion.span>
      <span>{minutes}</span>
    </div>
  );
}

export default function JourneyWindows() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ─── Scene opacities ──────────────────────────────────────────────────────
  // Each scene holds for ~22% of scroll, crossfade is tight (4%)
  // Scene 0: visible 0→0.24, fades 0.24→0.28
  // Scene 1: fades in 0.24→0.28, holds 0.28→0.49, fades 0.49→0.53
  // Scene 2: fades in 0.49→0.53, holds 0.53→0.71, fades 0.71→0.75
  // Scene 3: fades in 0.71→0.75, holds 0.75→1.00
  const scene0Opacity = useTransform(scrollYProgress, [0, 0, 0.22, 0.28], [0, 1, 1, 0]);
  const scene1Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.47, 0.53], [0, 1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.47, 0.53, 0.69, 0.75], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.69, 0.75, 1.00, 1.00], [0, 1, 1, 1]);
  const sceneOpacities = [scene0Opacity, scene1Opacity, scene2Opacity, scene3Opacity];

  // ─── Carriage window overlay — brief flash at scene boundaries ───────────
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.23, 0.25, 0.31, 0.48, 0.50, 0.56, 0.70, 0.72, 0.78],
    [0,    0.5,  0,    0,    0.5,  0,    0,    0.5,  0   ]
  );

  // ─── Background layer — slowest, 120px travel ────────────────────────────
  const bg0Y = useTransform(scrollYProgress, [0, 0.28], ['0px', '-120px']);
  const bg1Y = useTransform(scrollYProgress, [0.24, 0.53], ['80px', '-120px']);
  const bg2Y = useTransform(scrollYProgress, [0.49, 0.75], ['80px', '-120px']);
  const bg3Y = useTransform(scrollYProgress, [0.71, 1.00], ['80px', '-40px']);
  const bgYs = [bg0Y, bg1Y, bg2Y, bg3Y];

  // ─── Midground layer — medium, 260px travel ───────────────────────────────
  const mid0Y = useTransform(scrollYProgress, [0, 0.28], ['0px', '-260px']);
  const mid1Y = useTransform(scrollYProgress, [0.24, 0.53], ['180px', '-260px']);
  const mid2Y = useTransform(scrollYProgress, [0.49, 0.75], ['180px', '-260px']);
  const mid3Y = useTransform(scrollYProgress, [0.71, 1.00], ['180px', '-80px']);
  const midYs = [mid0Y, mid1Y, mid2Y, mid3Y];

  // ─── Foreground layer — fastest, 420px travel ────────────────────────────
  const fg0Y = useTransform(scrollYProgress, [0, 0.28], ['0px', '-420px']);
  const fg1Y = useTransform(scrollYProgress, [0.24, 0.53], ['300px', '-420px']);
  const fg2Y = useTransform(scrollYProgress, [0.49, 0.75], ['300px', '-420px']);
  const fg3Y = useTransform(scrollYProgress, [0.71, 1.00], ['300px', '-100px']);
  const fgYs = [fg0Y, fg1Y, fg2Y, fg3Y];

  // ─── Text opacity — tight window, clear per-scene ────────────────────────
  const text0Opacity = useTransform(scrollYProgress, [0.03, 0.10, 0.20, 0.26], [0, 1, 1, 0]);
  const text1Opacity = useTransform(scrollYProgress, [0.29, 0.36, 0.45, 0.51], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.54, 0.61, 0.67, 0.73], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.76, 0.83, 1.00, 1.00], [0, 1, 1, 1]);
  const textOpacities = [text0Opacity, text1Opacity, text2Opacity, text3Opacity];

  // ─── Text Y lift ──────────────────────────────────────────────────────────
  const text0Y = useTransform(scrollYProgress, [0.03, 0.10], ['28px', '0px']);
  const text1Y = useTransform(scrollYProgress, [0.29, 0.36], ['28px', '0px']);
  const text2Y = useTransform(scrollYProgress, [0.54, 0.61], ['28px', '0px']);
  const text3Y = useTransform(scrollYProgress, [0.76, 0.83], ['28px', '0px']);
  const textYs = [text0Y, text1Y, text2Y, text3Y];

  // ─── Progress line ────────────────────────────────────────────────────────
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // ─── Dot opacities ────────────────────────────────────────────────────────
  const dot0Opacity = useTransform(scrollYProgress, [0, 0.02, 0.24, 0.28], [0.3, 1, 1, 0.3]);
  const dot1Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.49, 0.53], [0.3, 1, 1, 0.3]);
  const dot2Opacity = useTransform(scrollYProgress, [0.49, 0.53, 0.71, 0.75], [0.3, 1, 1, 0.3]);
  const dot3Opacity = useTransform(scrollYProgress, [0.71, 0.75, 1.00, 1.00], [0.3, 1, 1, 1]);
  const dotOpacities = [dot0Opacity, dot1Opacity, dot2Opacity, dot3Opacity];

  // ─── Dot scales ───────────────────────────────────────────────────────────
  const dot0Scale = useTransform(scrollYProgress, [0, 0.02, 0.24, 0.28], [0.8, 1.5, 1.5, 0.8]);
  const dot1Scale = useTransform(scrollYProgress, [0.24, 0.28, 0.49, 0.53], [0.8, 1.5, 1.5, 0.8]);
  const dot2Scale = useTransform(scrollYProgress, [0.49, 0.53, 0.71, 0.75], [0.8, 1.5, 1.5, 0.8]);
  const dot3Scale = useTransform(scrollYProgress, [0.71, 0.75, 1.00, 1.00], [0.8, 1.5, 1.5, 0.8]);
  const dotScales = [dot0Scale, dot1Scale, dot2Scale, dot3Scale];

  // ─── Scroll hint ──────────────────────────────────────────────────────────
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-vsoe-midnight">

        {/* Section label */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <div className="w-6 h-px bg-vsoe-gold mx-auto mb-3" />
          <span className="text-vsoe-gold text-[9px] font-bold uppercase tracking-[0.45em]">
            The Journey
          </span>
        </div>

        {/* Scene layers */}
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

            {/* Midground — no blend mode, straight opacity so images stay distinct */}
            <motion.div
              style={{ y: midYs[i] }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src={scene.mid}
                alt=""
                fill
                className="object-cover"
                style={{ opacity: scene.midOpacity }}
                sizes="100vw"
              />
            </motion.div>

            {/* Foreground — texture layer, very subtle */}
            <motion.div
              style={{ y: fgYs[i] }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src={scene.fg}
                alt=""
                fill
                className="object-cover opacity-0"
                sizes="100vw"
              />
            </motion.div>

            {/* Radial vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

            {/* Bottom fade for text */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-vsoe-midnight via-vsoe-midnight/60 to-transparent pointer-events-none" />
          </motion.div>
        ))}

        {/* Carriage overlay at boundaries */}
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
          <div className="absolute inset-0 bg-vsoe-midnight/50" />
        </motion.div>

        {/* Text overlays */}
        {scenes.map((scene, i) => (
          <div
            key={`text-${scene.city}`}
            className="absolute inset-x-0 bottom-0 z-25 flex flex-col items-center justify-end pb-20 pointer-events-none"
          >
            <motion.div
              style={{ opacity: textOpacities[i], y: textYs[i] }}
              className="text-center px-8"
            >
              <ClockTime time={scene.time} />
              <div className="mb-3">
                <span className="font-serif text-4xl md:text-5xl text-vsoe-cream tracking-wide">
                  {scene.city}
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

        {/* Venice arrival CTA — appears with scene 4 */}
        <motion.div
          style={{ opacity: text3Opacity }}
          className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center justify-end pb-6 pointer-events-none"
        >
          <motion.div
            style={{ y: text3Y }}
            className="flex flex-col items-center gap-3"
          >

            <Link
              href="/book"
              className="pointer-events-auto group flex items-center gap-3 px-8 py-3 border border-vsoe-gold/50 text-[9px] uppercase tracking-[0.45em] text-vsoe-gold font-bold hover:bg-vsoe-gold hover:text-vsoe-midnight transition-all duration-500"
            >
              Begin Your Journey
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M 1 6 L 11 6 M 7 2 L 11 6 L 7 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
          <div className="relative w-px bg-vsoe-gold/20" style={{ height: '160px' }}>
            <motion.div
              style={{ height: progressHeight }}
              className="absolute top-0 left-0 w-full bg-vsoe-gold origin-top"
            />
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

        {/* Scroll hint */}
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
