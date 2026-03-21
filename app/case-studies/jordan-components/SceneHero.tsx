'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoldGrid, RevealText } from './Common';

export default function SceneHero() {
  return (
    <section id="scene-hero" className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[var(--black)]">
      <GoldGrid />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <RevealText delay={0.3}>
          <span className="font-sans text-[var(--t-label)] text-[var(--muted)] tracking-[0.3em] font-medium uppercase mb-4 block">
            THE COMPLETE SALES PLATFORM
          </span>
        </RevealText>

        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-display text-[var(--t-display)] text-[var(--white)] leading-[0.92] mb-6"
        >
          JORDAN
        </motion.h1>

        <RevealText delay={0.6}>
          <p className="font-serif italic text-[var(--cream)] text-[clamp(22px,3vw,32px)] leading-[1.3] mb-12">
            Your team's most valuable colleague.<br />
            Knows every deal. Remembers every signal.<br />
            Always tells you what to do next.
          </p>
        </RevealText>

        <div className="flex flex-wrap justify-center gap-[var(--s-sm)]">
          <Badge delay={0.8}>Replaces your entire stack</Badge>
          <Badge delay={0.9}>Starts with what you need</Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-10 bg-[var(--gold)]" />
        <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
        <span className="font-sans text-[10px] text-[var(--muted)] tracking-[0.2em]">SCROLL</span>
      </motion.div>
    </section>
  );
}

function Badge({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="inline-flex items-center gap-2 border border-[var(--glass-border)] px-[18px] py-2 rounded-full font-sans text-[12px] text-[var(--cream)] tracking-wider"
    >
      <div className="w-[6px] h-[6px] rounded-full bg-[var(--gold)]" />
      {children}
    </motion.div>
  );
}
