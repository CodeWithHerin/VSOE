'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { LocalizedLink as Link } from '@/components/i18n/LocalizedLink';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useTrackInterest } from '@/lib/profiling';

const ease = [0.25, 1, 0.5, 1] as const;

export default function GrandTourSection() {
  const { t } = useTranslation();
  useTrackInterest('adventure');

  const JOURNEYS = [
    {
      id: 'paris-venice',
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
      id: 'paris-istanbul',
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
      id: 'venice-paris',
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

  return (
    <section id="track-adventure" className="w-full bg-vsoe-midnight py-16 relative z-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-6 mb-16"
        >
          <div className="w-8 h-px bg-vsoe-gold/50" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-vsoe-gold font-bold">
            Journeys
          </span>
          <div className="flex-1 h-px bg-vsoe-gold/10" />
        </motion.div>

        {/* Journey cards */}
        <div className="flex flex-col gap-6">
          {JOURNEYS.map((journey, index) => {
            const imageOnLeft = index % 2 === 0;

            return (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, x: imageOnLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease }}
                className={`group relative flex flex-col md:flex-row ${!imageOnLeft ? 'md:flex-row-reverse' : ''} overflow-hidden rounded-sm border border-vsoe-gold/10 hover:border-vsoe-gold/30 transition-colors duration-500 ${journey.flagship ? 'bg-[#0d1220]' : 'bg-[#080c16]'}`}
              >
                {/* Image — 52% width */}
                <div className="relative w-full md:w-[52%] overflow-hidden min-h-[300px] md:min-h-[420px]">
                  <Image
                    src={journey.image}
                    alt={journey.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="52vw"
                  />

                  {/* Edge gradient blending into content panel */}
                  <div className={`absolute inset-0 bg-gradient-to-${imageOnLeft ? 'r' : 'l'} from-transparent via-transparent to-[${journey.flagship ? '#0d1220' : '#080c16'}]`} />

                  {/* Gold hover tint */}
                  <div className="absolute inset-0 bg-vsoe-gold/0 group-hover:bg-vsoe-gold/6 transition-colors duration-700 pointer-events-none" />

                  {/* Flagship badge */}
                  {journey.flagship && (
                    <div className="absolute top-5 left-5 bg-vsoe-gold px-3 py-1 text-[8px] uppercase tracking-[0.4em] text-vsoe-midnight font-bold">
                      Signature Journey
                    </div>
                  )}

                  {/* Route pill — bottom */}
                  <div className="absolute bottom-5 left-5 border border-vsoe-gold/40 px-3 py-1 text-[8px] uppercase tracking-[0.3em] text-vsoe-gold backdrop-blur-sm bg-vsoe-midnight/70">
                    {journey.route}
                  </div>
                </div>

                {/* Content — 48% width */}
                <div className="relative w-full md:w-[48%] flex flex-col justify-center px-8 py-10 md:py-14 md:px-12">

                  {/* Ghost index */}
                  <span className="text-vsoe-gold/10 font-serif text-[60px] leading-none absolute top-4 right-6 select-none pointer-events-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Duration + dates */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-5 h-px bg-vsoe-gold/40" />
                    <span className="text-[8px] uppercase tracking-[0.4em] text-vsoe-gold/60">
                      {journey.duration} · {journey.dates}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif leading-tight mb-4 ${journey.flagship ? 'text-3xl md:text-4xl text-vsoe-gold' : 'text-2xl md:text-3xl text-vsoe-cream'}`}>
                    {journey.title}
                  </h3>

                  {/* Description */}
                  <p className="text-vsoe-cream/50 text-sm leading-relaxed mb-8 max-w-[280px] font-sans">
                    {journey.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-vsoe-gold/10 mb-6" />

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[8px] uppercase tracking-[0.3em] text-vsoe-cream/25 block mb-1">
                        From
                      </span>
                      <span className={`font-serif ${journey.flagship ? 'text-2xl text-vsoe-gold' : 'text-xl text-vsoe-cream'}`}>
                        {journey.price}
                      </span>
                      <span className="text-vsoe-cream/25 text-[10px] ml-1.5">per person</span>
                    </div>

                    <Link
                      href={`/book?route=${journey.routeParam}`}
                      className={`flex items-center gap-2.5 px-5 py-2.5 text-[8px] uppercase tracking-[0.35em] font-bold transition-all duration-300 ${
                        journey.flagship
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
