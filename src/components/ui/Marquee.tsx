'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';

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
@keyframes steamDrift {
  0%   { opacity: 0; transform: translate(0px, 0px) scale(0.6); }
  15%  { opacity: 0.7; }
  100% { opacity: 0; transform: translate(28px, -32px) scale(2.2); }
}
@keyframes steamDrift2 {
  0%   { opacity: 0; transform: translate(0px, 0px) scale(0.5); }
  15%  { opacity: 0.5; }
  100% { opacity: 0; transform: translate(22px, -26px) scale(1.8); }
}
@keyframes steamDrift3 {
  0%   { opacity: 0; transform: translate(0px, 0px) scale(0.4); }
  15%  { opacity: 0.4; }
  100% { opacity: 0; transform: translate(18px, -20px) scale(1.5); }
}
@keyframes steamDrift4 {
  0%   { opacity: 0; transform: translate(0px, 0px) scale(0.6); }
  15%  { opacity: 0.6; }
  100% { opacity: 0; transform: translate(32px, -28px) scale(2.4); }
}
@keyframes steamDrift5 {
  0%   { opacity: 0; transform: translate(0px, 0px) scale(0.5); }
  20%  { opacity: 0.45; }
  100% { opacity: 0; transform: translate(24px, -36px) scale(2.0); }
}
`;

const WINDOWS = [
  { anim: 'windowFlicker1 4.2s ease-in-out infinite', warm: true },
  { anim: 'windowFlicker2 3.8s ease-in-out infinite 0.6s', warm: true },
  { anim: 'windowDim 6s ease-in-out infinite 1.2s', warm: false },
  { anim: 'windowFlicker1 5.1s ease-in-out infinite 0.3s', warm: true },
  { anim: 'windowFlicker2 4.7s ease-in-out infinite 1.8s', warm: true },
  { anim: 'windowDim 7s ease-in-out infinite 0.9s', warm: false },
  { anim: 'windowFlicker1 3.9s ease-in-out infinite 2.1s', warm: true },
  { anim: 'windowFlicker2 4.4s ease-in-out infinite 0.4s', warm: true },
  { anim: 'windowDim 5.5s ease-in-out infinite 1.5s', warm: false },
  { anim: 'windowFlicker1 6.2s ease-in-out infinite 0.8s', warm: true },
  { anim: 'windowFlicker2 4.1s ease-in-out infinite 1.1s', warm: true },
  { anim: 'windowDim 5.8s ease-in-out infinite 0.5s', warm: false },
];

// SVG spoke wheel — front (bold, fully visible)
function SpokeWheel({ size, x: wx, rotate }: { size: number; x: number; rotate: import('framer-motion').MotionValue<number> }) {
  const r = size / 2;
  const hubR = r * 0.22;
  const spokeLen = r - hubR - 2;
  const spokes = 6;
  return (
    <motion.svg
      width={size} height={size}
      style={{ position: 'absolute', bottom: -size * 0.55, left: wx, rotate }}
      viewBox={`0 0 ${size} ${size}`}
      overflow="visible"
    >
      {/* Outer rim */}
      <circle cx={r} cy={r} r={r - 1} fill="#080e18" stroke="rgba(201,168,76,0.7)" strokeWidth="2" />
      {/* Spokes */}
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        const x1 = r + Math.cos(rad) * hubR;
        const y1 = r + Math.sin(rad) * hubR;
        const x2 = r + Math.cos(rad) * (r - 2);
        const y2 = r + Math.sin(rad) * (r - 2);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.55)" strokeWidth="1.2" />;
      })}
      {/* Hub */}
      <circle cx={r} cy={r} r={hubR} fill="#0a1220" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" />
      <circle cx={r} cy={r} r={hubR * 0.4} fill="rgba(201,168,76,0.4)" />
    </motion.svg>
  );
}

// SVG spoke wheel — rear shadow (faint, offset to suggest depth)
function SpokeWheelShadow({ size, x: wx, rotate }: { size: number; x: number; rotate: import('framer-motion').MotionValue<number> }) {
  const r = size / 2;
  const hubR = r * 0.22;
  const spokes = 6;
  return (
    <motion.svg
      width={size} height={size}
      style={{
        position: 'absolute',
        bottom: -size * 0.55,
        left: wx + 4,
        rotate,
        opacity: 0.35,
      }}
      viewBox={`0 0 ${size} ${size}`}
      overflow="visible"
    >
      {/* Clip — show only bottom half */}
      <defs>
        <clipPath id={`halfClip-${size}-${wx}`}>
          <rect x="0" y={r} width={size} height={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#halfClip-${size}-${wx})`}>
        <circle cx={r} cy={r} r={r - 1} fill="none" stroke="rgba(201,168,76,0.65)" strokeWidth="1.5" />
        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (i * 360) / spokes;
          const rad = (angle * Math.PI) / 180;
          const x1 = r + Math.cos(rad) * hubR;
          const y1 = r + Math.sin(rad) * hubR;
          const x2 = r + Math.cos(rad) * (r - 2);
          const y2 = r + Math.sin(rad) * (r - 2);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.5)" strokeWidth="1" />;
        })}
        <circle cx={r} cy={r} r={hubR} fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1" />
      </g>
    </motion.svg>
  );
}

export default function Marquee() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const x = useMotionValue(0);

  const wheelRotate = useTransform(x, (v) => v * 2.2);

  useAnimationFrame((_t, delta) => {
    if (containerRef.current && trainRef.current) {
      const cw = containerRef.current.offsetWidth;
      const tw = trainRef.current.offsetWidth;
      if (x.get() > cw) x.set(-tw);
      if (x.get() < -tw) x.set(cw);
    }
    if (!isHovering.current) {
      x.set(x.get() - 1.6 * (delta / 16));
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering.current) return;
    x.set(x.get() + e.movementX * 2.5);
  };

  // Track ballast background — repeating pattern full width
  const trackStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: 'translateY(-50%)',
    height: '28px',
    backgroundImage: `repeating-linear-gradient(
      90deg,
      transparent,
      transparent 18px,
      rgba(201,168,76,0.07) 18px,
      rgba(201,168,76,0.07) 20px
    )`,
    pointerEvents: 'none',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_STYLES }} />
      <div
        ref={containerRef}
        className="bg-vsoe-midnight border-y border-vsoe-gold/20 relative z-20 overflow-hidden flex items-center"
        style={{ minHeight: '180px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        {/* Track ballast — full width repeating pattern */}
        <div style={trackStyle} />
        {/* Rail — top */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.25)', transform: 'translateY(-10px)', pointerEvents: 'none' }} />
        {/* Rail — bottom */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.25)', transform: 'translateY(10px)', pointerEvents: 'none' }} />

        <motion.div
          ref={trainRef}
          style={{ x }}
          className="relative inline-flex items-center will-change-transform cursor-ew-resize"
          onMouseEnter={() => { isHovering.current = true; }}
          onMouseLeave={() => { isHovering.current = false; }}
          onMouseMove={handleMouseMove}
        >
          {/* ── Locomotive ── */}
          <div style={{ position: 'relative', flexShrink: 0 }}>

            {/* Steam puffs — drift backward (positive x = right = backward for leftward train) */}
            <div style={{ position: 'absolute', left: '22px', top: '-18px', zIndex: 30, pointerEvents: 'none' }}>
              {[
                { w: 10, h: 10, anim: 'steamDrift 2.0s ease-out infinite', l: '0px', t: '0px' },
                { w: 7,  h: 7,  anim: 'steamDrift2 2.4s ease-out infinite 0.5s', l: '8px', t: '3px' },
                { w: 6,  h: 6,  anim: 'steamDrift3 1.8s ease-out infinite 1.0s', l: '-4px', t: '4px' },
                { w: 9,  h: 9,  anim: 'steamDrift4 2.6s ease-out infinite 0.3s', l: '4px', t: '-2px' },
                { w: 5,  h: 5,  anim: 'steamDrift5 2.2s ease-out infinite 1.4s', l: '-2px', t: '6px' },
              ].map((s, i) => (
                <div key={i} style={{
                  width: s.w, height: s.h,
                  borderRadius: '50%',
                  background: 'rgba(245,240,232,0.3)',
                  animation: s.anim,
                  position: 'absolute',
                  left: s.l, top: s.t,
                }} />
              ))}
            </div>

            {/* Locomotive body — rounded front boiler */}
            <div style={{
              width: '110px',
              height: '58px',
              background: 'linear-gradient(180deg, #1e2d45 0%, #111c2e 60%, #0a1220 100%)',
              borderTop: '2px solid rgba(201,168,76,0.6)',
              borderBottom: '2px solid rgba(201,168,76,0.6)',
              borderLeft: '2px solid rgba(201,168,76,0.5)',
              borderRight: 'none',
              borderRadius: '40px 0 0 40px',
              position: 'relative',
              boxShadow: '0 0 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>
              {/* Chimney */}
              <div style={{
                position: 'absolute', top: '-14px', left: '22px',
                width: '11px', height: '16px',
                background: '#0a1220',
                border: '1.5px solid rgba(201,168,76,0.45)',
                borderRadius: '3px 3px 0 0',
              }} />
              {/* Chimney cap */}
              <div style={{
                position: 'absolute', top: '-16px', left: '19px',
                width: '17px', height: '4px',
                background: '#0a1220',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '2px',
              }} />
              {/* Boiler dome */}
              <div style={{
                position: 'absolute', top: '-8px', left: '42px',
                width: '22px', height: '10px',
                background: '#1a2840',
                border: '1.5px solid rgba(201,168,76,0.4)',
                borderRadius: '11px 11px 0 0',
              }} />
              {/* Cab window */}
              <div style={{
                position: 'absolute', top: '10px', right: '10px',
                width: '24px', height: '22px',
                background: 'rgba(201,168,76,0.10)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '3px',
                boxShadow: 'inset 0 0 10px rgba(201,168,76,0.18)',
              }} />
              {/* Headlamp */}
              <div style={{
                position: 'absolute', top: '16px', left: '6px',
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.4)',
                boxShadow: '0 0 8px rgba(201,168,76,0.3)',
              }} />
              {/* Gold waist stripe */}
              <div style={{
                position: 'absolute', bottom: '14px', left: '28px', right: '0',
                height: '1px', background: 'rgba(201,168,76,0.35)',
              }} />
            </div>

            {/* Connecting rod between locomotive wheels */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '18px',
              width: '74px',
              height: '2px',
              background: 'rgba(201,168,76,0.35)',
              zIndex: 5,
            }} />

            {/* Locomotive wheels — 3 spoke wheels + shadows */}
            <SpokeWheelShadow size={17} x={14} rotate={wheelRotate} />
            <SpokeWheel size={17} x={14} rotate={wheelRotate} />

            <SpokeWheelShadow size={22} x={42} rotate={wheelRotate} />
            <SpokeWheel size={22} x={42} rotate={wheelRotate} />

            <SpokeWheelShadow size={17} x={74} rotate={wheelRotate} />
            <SpokeWheel size={17} x={74} rotate={wheelRotate} />
          </div>

          {/* ── Carriages ── */}
          {[0, 1, 2].map((ci) => (
            <div key={ci} style={{
              position: 'relative',
              flexShrink: 0,
              width: '300px',
              height: '58px',
              background: 'linear-gradient(180deg, #1a253a 0%, #111c2e 70%, #0a1220 100%)',
              borderTop: '2px solid rgba(201,168,76,0.5)',
              borderBottom: '2px solid rgba(201,168,76,0.5)',
              borderLeft: ci === 0 ? 'none' : '2px solid rgba(201,168,76,0.25)',
              borderRight: '2px solid rgba(201,168,76,0.25)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              {/* Top sheen */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.05)' }} />

              {/* Windows */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px' }}>
                {WINDOWS.slice(ci * 4, ci * 4 + 4).map((win, wi) => (
                  <div key={wi} style={{
                    width: '38px',
                    height: '26px',
                    borderRadius: '2px 2px 0 0',
                    border: '1px solid rgba(201,168,76,0.3)',
                    background: win.warm ? 'rgba(201,140,60,0.20)' : 'rgba(15,22,40,0.9)',
                    boxShadow: win.warm
                      ? 'inset 0 0 12px rgba(201,140,60,0.28), 0 0 6px rgba(201,140,60,0.08)'
                      : 'inset 0 0 4px rgba(0,0,0,0.6)',
                    animation: win.anim,
                  } as React.CSSProperties} />
                ))}
              </div>

              {/* Carriage 0 — train name */}
              {ci === 0 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  paddingBottom: '8px',
                  zIndex: 10,
                }}>
                  <div style={{
                    background: 'rgba(8,14,24,0.88)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: '20px',
                    padding: '5px 20px',
                    backdropFilter: 'blur(6px)',
                    whiteSpace: 'nowrap',
                    fontSize: '9px', fontWeight: '700',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.95)',
                    userSelect: 'none',
                    minWidth: '200px',
                    textAlign: 'center',
                  }}>
                    {t.marquee.vsoe}
                  </div>
                </div>
              )}
              {/* Carriage 1 — cities text straddles border to carriage 2 */}
              {ci === 1 && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-100px',
                  transform: 'translateY(calc(-50% - 4px))',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}>
                  <div style={{
                    background: 'rgba(8,14,24,0.97)',
                    border: '1px solid rgba(201,168,76,0.30)',
                    borderRadius: '20px',
                    padding: '5px 20px',
                    backdropFilter: 'blur(8px)',
                    whiteSpace: 'nowrap',
                    fontSize: '9px', fontWeight: '700',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.85)',
                    userSelect: 'none',
                    width: 'auto',
                    minWidth: '260px',
                    textAlign: 'center',
                  }}>
                    LONDON · PARIS · VENICE · ISTANBUL
                  </div>
                </div>
              )}

              {/* Gold waist stripe */}
              <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, height: '1px', background: 'rgba(201,168,76,0.18)' }} />

              {/* Connecting rod between carriage bogies */}
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                left: '36px',
                width: '226px',
                height: '2px',
                background: 'rgba(201,168,76,0.25)',
                zIndex: 5,
              }} />

              {/* Carriage wheels — front bogie (two wheels close together) */}
              <SpokeWheelShadow size={20} x={36} rotate={wheelRotate} />
              <SpokeWheel size={20} x={36} rotate={wheelRotate} />
              <SpokeWheelShadow size={20} x={58} rotate={wheelRotate} />
              <SpokeWheel size={20} x={58} rotate={wheelRotate} />

              {/* Carriage wheels — rear bogie (two wheels close together) */}
              <SpokeWheelShadow size={20} x={220} rotate={wheelRotate} />
              <SpokeWheel size={20} x={220} rotate={wheelRotate} />
              <SpokeWheelShadow size={20} x={242} rotate={wheelRotate} />
              <SpokeWheel size={20} x={242} rotate={wheelRotate} />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
