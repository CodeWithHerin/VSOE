'use client';

import { motion } from 'framer-motion';

interface ChapterTransitionProps {
  chapter: string;
  location: string;
}

const ease = [0.25, 1, 0.5, 1] as const;

export default function ChapterTransition({ chapter, location }: ChapterTransitionProps) {
  return (
    <div className="relative w-full bg-vsoe-midnight py-16 flex flex-col items-center justify-center overflow-hidden">

      {/* Full-width gold line — draws across */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease }}
        className="absolute top-0 left-0 w-full h-px bg-vsoe-gold/40 origin-left"
      />

      {/* Content block */}
      <div className="flex flex-col items-center gap-4 text-center px-8">

        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="text-[9px] uppercase tracking-[0.5em] text-vsoe-gold font-bold"
        >
          Chapter {chapter}
        </motion.span>

        {/* Location / chapter name */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="font-serif text-2xl md:text-3xl text-vsoe-cream tracking-wide"
        >
          {location}
        </motion.h2>

        {/* Short decorative rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease, delay: 0.7 }}
          className="w-16 h-px bg-vsoe-gold/30 origin-left"
        />
      </div>

      {/* Full-width gold line — bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="absolute bottom-0 left-0 w-full h-px bg-vsoe-gold/40 origin-left"
      />

    </div>
  );
}
