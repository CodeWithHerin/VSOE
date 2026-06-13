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
    <section id="track-adventure" className="w-full bg-vsoe-midnight py-8 relative z-20">

      {/* Journey rows */}
      <div className="flex flex-col">
        {JOURNEYS.map((journey, index) => {
          const imageOnLeft = index % 2 === 0;

          return (
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, x: imageOnLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: 0 }}
              className={`relative flex flex-col md:flex-row ${!imageOnLeft ? 'md:flex-row-reverse' : ''} min-h-[480px] border-b border-vsoe-gold/10 last:border-b-0`}
            >
              {/* Image — 55% width */}
              <div className="group relative w-full md:w-[55%] overflow-hidden min-h-[320px] md:min-h-0">
                <Image
                  src={journey.image}
                  alt={journey.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="55vw"
                />
                {/* Dark overlay */}
                <div className={`absolute inset-0 bg-gradient-to-${imageOnLeft ? 'r' : 'l'} from-transparent via-transparent to-vsoe-midnight`} />
                <div className="absolute inset-0 bg-vsoe-gold/0 group-hover:bg-vsoe-gold/8 transition-colors duration-700 pointer-events-none" />

                {/* Flagship badge */}
                {journey.flagship && (
                  <div className="absolute top-6 left-6 bg-vsoe-gold px-4 py-1.5 text-[9px] uppercase tracking-[0.4em] text-vsoe-midnight font-bold">
                    Signature Journey
                  </div>
                )}

                {/* Route pill */}
                <div className="absolute bottom-6 left-6 border border-vsoe-gold/50 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-vsoe-gold backdrop-blur-sm bg-vsoe-midnight/60">
                  {journey.route}
                </div>
              </div>

              {/* Content — 45% width */}
              <div className={`relative w-full md:w-[45%] flex flex-col justify-center px-10 py-16 md:py-24 md:px-16 ${journey.flagship ? 'bg-[#0d1220]' : 'bg-vsoe-midnight'}`}>

                {/* Index number */}
                <span className="text-vsoe-gold/20 font-serif text-[80px] leading-none absolute top-6 right-8 select-none pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Duration badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-vsoe-gold/40" />
                  <span className="text-[9px] uppercase tracking-[0.4em] text-vsoe-gold/70">
                    {journey.duration} · {journey.dates}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`font-serif leading-tight mb-4 ${journey.flagship ? 'text-4xl md:text-5xl text-vsoe-gold' : 'text-3xl md:text-4xl text-vsoe-cream'}`}>
                  {journey.title}
                </h3>

                {/* Description */}
                <p className="text-vsoe-cream/60 text-sm leading-relaxed mb-8 max-w-xs font-sans">
                  {journey.description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-vsoe-gold/15">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-vsoe-cream/30 block mb-1">
                      From
                    </span>
                    <span className={`font-serif ${journey.flagship ? 'text-3xl text-vsoe-gold' : 'text-2xl text-vsoe-cream'}`}>
                      {journey.price}
                    </span>
                    <span className="text-vsoe-cream/30 text-xs ml-2">per person</span>
                  </div>

                  <Link
                    href={`/book?route=${journey.routeParam}`}
                    className={`group flex items-center gap-3 px-6 py-3 text-[9px] uppercase tracking-[0.35em] font-bold transition-all duration-300 ${
                      journey.flagship
                        ? 'bg-vsoe-gold text-vsoe-midnight hover:bg-vsoe-cream'
                        : 'border border-vsoe-gold/40 text-vsoe-gold hover:border-vsoe-gold hover:bg-vsoe-gold/10'
                    }`}
                  >
                    Reserve
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
