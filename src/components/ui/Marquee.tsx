'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';

// CSS keyframe styles injected once
const MARQUEE_STYLES = `
@keyframes windowFlicker1 {
  0%, 100% { opacity: 1; }
  15% { opacity: 0.7; }
  16% { opacity: 1; }
  60% { opacity: 0.9; }
  61% { opacity: 1; }
}
@keyframes windowFlicker2 {
  0%, 100% { opacity: 0.85; }
  30% { opacity: 0.5; }
  31% { opacity: 0.85; }
  80% { opacity: 0.7; }
  81% { opacity: 0.85; }
}
@keyframes windowDim {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.2; }
}
@keyframes steamRise1 {
  0% { opacity: 0.6; transform: translateY(0) scaleX(1); }
  100% { opacity: 0; transform: translateY(-28px) scaleX(1.8); }
}
@keyframes steamRise2 {
  0% { opacity: 0.5; transform: translateY(0) scaleX(1); }
  100% { opacity: 0; transform: translateY(-22px) scaleX(2.2); }
}
@keyframes steamRise3 {
  0% { opacity: 0.4; transform: translateY(0) scaleX(1); }
  100% { opacity: 0; transform: translateY(-18px) scaleX(1.5); }
}
`;

// Window configs: each window has a glow style
const WINDOWS = [
  { style: 'animation: windowFlicker1 4.2s ease-in-out infinite', warm: true },
  { style: 'animation: windowFlicker2 3.8s ease-in-out infinite 0.6s', warm: true },
  { style: 'animation: windowDim 6s ease-in-out infinite 1.2s', warm: false },
  { style: 'animation: windowFlicker1 5.1s ease-in-out infinite 0.3s', warm: true },
  { style: 'animation: windowFlicker2 4.7s ease-in-out infinite 1.8s', warm: true },
  { style: 'animation: windowDim 7s ease-in-out infinite 0.9s', warm: false },
  { style: 'animation: windowFlicker1 3.9s ease-in-out infinite 2.1s', warm: true },
  { style: 'animation: windowFlicker2 4.4s ease-in-out infinite 0.4s', warm: true },
  { style: 'animation: windowDim 5.5s ease-in-out infinite 1.5s', warm: false },
  { style: 'animation: windowFlicker1 6.2s ease-in-out infinite 0.8s', warm: true },
];

export default function Marquee() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const x = useMotionValue(0);

  useAnimationFrame((_t, delta) => {
    if (containerRef.current && trainRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const trainWidth = trainRef.current.offsetWidth;
      if (x.get() > containerWidth) x.set(-trainWidth);
      if (x.get() < -trainWidth) x.set(containerWidth);
    }
    if (!isHovering.current) {
      x.set(x.get() + -1.6 * (delta / 16));
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering.current) return;
    x.set(x.get() + e.movementX * 2.5);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_STYLES }} />
      <div
        ref={containerRef}
        className="bg-vsoe-midnight py-10 border-y border-vsoe-gold/20 relative z-20 overflow-hidden flex items-center"
        style={{ minHeight: '160px' }}
      >
        {/* Rail tracks */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-vsoe-gold/15 -translate-y-3" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-vsoe-gold/15 translate-y-3" />
        {/* Rail sleepers — subtle vertical dashes */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex gap-6 px-4 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-1 h-7 bg-vsoe-gold/8 flex-shrink-0" />
          ))}
        </div>

        <motion.div
          ref={trainRef}
          style={{ x }}
          className="relative inline-flex items-center will-change-transform cursor-ew-resize"
          onMouseEnter={() => { isHovering.current = true; }}
          onMouseLeave={() => { isHovering.current = false; }}
          onMouseMove={handleMouseMove}
        >
          {/* ── Locomotive ── */}
          <div className="relative flex-shrink-0 mr-0">

            {/* Steam puffs — CSS only, no Framer Motion */}
            <div className="absolute pointer-events-none" style={{ left: '18px', top: '-8px', zIndex: 30 }}>
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: 'rgba(245,240,232,0.35)',
                animation: 'steamRise1 1.8s ease-out infinite',
                position: 'absolute', left: '0px',
              }} />
              <div style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'rgba(245,240,232,0.25)',
                animation: 'steamRise2 2.2s ease-out infinite 0.4s',
                position: 'absolute', left: '6px', top: '2px',
              }} />
              <div style={{
                width: '5px', height: '5px',
                borderRadius: '50%',
                background: 'rgba(245,240,232,0.20)',
                animation: 'steamRise3 1.6s ease-out infinite 0.9s',
                position: 'absolute', left: '-4px', top: '3px',
              }} />
            </div>

            {/* Locomotive body */}
            <div style={{
              width: '100px',
              height: '56px',
              background: 'linear-gradient(180deg, #1e2d45 0%, #111c2e 60%, #0a1220 100%)',
              borderTop: '2px solid rgba(201,168,76,0.6)',
              borderBottom: '2px solid rgba(201,168,76,0.6)',
              borderLeft: '2px solid rgba(201,168,76,0.4)',
              borderRight: 'none',
              borderRadius: '4px 0 0 4px',
              position: 'relative',
              boxShadow: '0 0 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>
              {/* Chimney */}
              <div style={{
                position: 'absolute', top: '-12px', left: '18px',
                width: '10px', height: '14px',
                background: '#0a1220',
                border: '1.5px solid rgba(201,168,76,0.4)',
                borderRadius: '2px 2px 0 0',
              }} />
              {/* Cab window */}
              <div style={{
                position: 'absolute', top: '8px', right: '10px',
                width: '22px', height: '20px',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '2px',
                boxShadow: 'inset 0 0 8px rgba(201,168,76,0.15)',
              }} />
              {/* Boiler dome */}
              <div style={{
                position: 'absolute', top: '-6px', left: '36px',
                width: '20px', height: '8px',
                background: '#1a2840',
                border: '1.5px solid rgba(201,168,76,0.35)',
                borderRadius: '10px 10px 0 0',
              }} />
              {/* Gold stripe */}
              <div style={{
                position: 'absolute', bottom: '12px', left: '0', right: '0',
                height: '1px',
                background: 'rgba(201,168,76,0.3)',
              }} />
            </div>

            {/* Locomotive wheels */}
            <motion.div style={{ rotate: useTransform(x, v => v * 1.8), position: 'absolute', bottom: '-8px', left: '14px' }}>
              <div style={{
                width: '18px', height: '18px',
                borderRadius: '50%',
                background: '#080e18',
                border: '2px solid rgba(201,168,76,0.5)',
                boxShadow: '0 0 6px rgba(201,168,76,0.2)',
              }} />
            </motion.div>
            <div style={{ position: 'absolute', bottom: '-8px', left: '44px', width: '22px', height: '22px', borderRadius: '50%', background: '#080e18', border: '2px solid rgba(201,168,76,0.5)', boxShadow: '0 0 6px rgba(201,168,76,0.2)' }} />
            <div style={{ position: 'absolute', bottom: '-8px', left: '74px', width: '18px', height: '18px', borderRadius: '50%', background: '#080e18', border: '2px solid rgba(201,168,76,0.5)', boxShadow: '0 0 6px rgba(201,168,76,0.2)' }} />
          </div>

          {/* ── Carriages ── */}
          {[0, 1, 2].map((carriageIndex) => (
            <div key={carriageIndex} style={{
              position: 'relative',
              flexShrink: 0,
              width: '280px',
              height: '56px',
              background: 'linear-gradient(180deg, #1a253a 0%, #111c2e 70%, #0a1220 100%)',
              borderTop: '2px solid rgba(201,168,76,0.5)',
              borderBottom: '2px solid rgba(201,168,76,0.5)',
              borderLeft: carriageIndex === 0 ? 'none' : '1px solid rgba(201,168,76,0.2)',
              borderRight: '1px solid rgba(201,168,76,0.2)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 20px rgba(0,0,0,0.4)',
            }}>
              {/* Top highlight */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              {/* Windows with individual glow and flicker */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 16px' }}>
                {WINDOWS.slice(carriageIndex * 3, carriageIndex * 3 + 4).map((win, wi) => (
                  <div key={wi} style={{
                    width: '36px',
                    height: '26px',
                    borderRadius: '2px',
                    border: '1px solid rgba(201,168,76,0.25)',
                    background: win.warm
                      ? 'rgba(201,140,60,0.18)'
                      : 'rgba(20,30,50,0.8)',
                    boxShadow: win.warm
                      ? 'inset 0 0 10px rgba(201,140,60,0.25), 0 0 8px rgba(201,140,60,0.1)'
                      : 'inset 0 0 4px rgba(0,0,0,0.5)',
                    animation: win.style.replace('animation: ', ''),
                  } as React.CSSProperties} />
                ))}
              </div>

              {/* Carriage text content */}
              {carriageIndex === 1 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 10,
                }}>
                  <div style={{
                    background: 'rgba(10,18,32,0.85)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '20px',
                    padding: '4px 16px',
                    backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    fontSize: '9px', fontWeight: '700',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.9)',
                    userSelect: 'none',
                  }}>
                    <span>{t.marquee.vsoe}</span>
                    <span style={{ color: 'rgba(201,168,76,0.4)' }}>✦</span>
                    <span>{t.marquee.cities}</span>
                  </div>
                </div>
              )}

              {/* Gold stripe */}
              <div style={{ position: 'absolute', bottom: '13px', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.15)' }} />

              {/* Wheels */}
              <div style={{ position: 'absolute', bottom: '-8px', left: '40px', width: '18px', height: '18px', borderRadius: '50%', background: '#080e18', border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 4px rgba(201,168,76,0.15)' }} />
              <div style={{ position: 'absolute', bottom: '-8px', right: '40px', width: '18px', height: '18px', borderRadius: '50%', background: '#080e18', border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 4px rgba(201,168,76,0.15)' }} />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
