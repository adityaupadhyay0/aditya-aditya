'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

export default function SceneReveal() {
  return (
    <section id="scene-reveal" className="min-h-screen py-[var(--s-xl)] px-8 relative bg-[var(--black)] overflow-hidden">
      <SectionLine />
      <div className="max-w-4xl mx-auto text-center relative z-10 mb-16">
        <ChapterLabel className="tracking-[0.3em]">INTRODUCING</ChapterLabel>
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[var(--t-display)] text-[var(--gold)] leading-[0.92] mb-6"
        >
          JORDAN
        </motion.h2>
        <RevealText delay={0.2}>
          <p className="font-serif italic text-[var(--cream)] text-[clamp(20px,2.5vw,30px)] leading-[1.3] mb-10 max-w-2xl mx-auto">
            The complete sales platform. One product. Every function. Replaces everything your team currently uses.
          </p>
        </RevealText>

        <div className="flex flex-wrap justify-center gap-[var(--s-sm)]">
          <button className="bg-[var(--gold)] text-[var(--black)] font-sans font-bold text-[14px] uppercase tracking-wider px-8 py-4 rounded-[4px] hover:bg-[var(--gold-light)] hover:-translate-y-1 transition-all duration-300 shadow-[0_14px_44px_var(--gold-glow)]">
            Request Early Access
          </button>
          <a href="#scene-demo" className="bg-transparent border border-[var(--glass-border)] text-[var(--cream)] font-sans text-[14px] px-8 py-4 rounded-[4px] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors inline-block">
            See how it works ↓
          </a>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <CockpitPanel />
      </div>

      <div className="flex flex-wrap justify-center gap-[var(--s-sm)] mt-[var(--s-lg)]">
        <StatPill num="REPLACES 8–12" label="TOOLS" delay={0.1} />
        <StatPill num="14" label="DAYS TO FIRST VALUE" delay={0.2} />
        <StatPill num="40–60%" label="LOWER TOTAL COST" delay={0.3} />
      </div>
    </section>
  );
}

function CockpitPanel() {
  return (
    <motion.div
      initial={{ perspective: 1400, rotateX: 42, y: 80, opacity: 0 }}
      whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[var(--black-3)] border border-[var(--glass-border)] rounded-lg overflow-hidden shadow-2xl"
    >
      <div className="p-4 md:p-6 border-b border-[var(--glass-border)] flex justify-between items-center text-[11px] text-[var(--muted)] tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
          <span>JORDAN</span>
        </div>
        <span>MARCUS · AE</span>
      </div>

      <div className="p-8 md:p-12">
        <h4 className="font-sans font-semibold text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-8">MORNING SURFACE</h4>
        <h3 className="font-serif italic text-2xl text-[var(--white)] mb-10">One thing needs your attention today.</h3>

        <div className="border border-[var(--glass-border)] border-l-4 border-l-[var(--gold)] p-6 md:p-8 rounded-md bg-[var(--glass)] max-w-2xl">
           <div className="flex items-start justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
                <span className="font-sans font-bold text-[var(--white)] text-lg">GlobalCo</span>
                <span className="font-sans text-[var(--muted)] ml-2">$380K</span>
             </div>
             <div className="flex items-center gap-2 text-[var(--muted)] text-[10px] uppercase tracking-wider">
               <span>Champion dark 14 days</span>
               <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
             </div>
           </div>

           <div className="flex items-center gap-4 mb-6">
             <div>
               <span className="text-[10px] uppercase text-[var(--muted)] tracking-widest block mb-1">Win probability</span>
               <span className="text-2xl font-display text-[var(--gold)]">52% <span className="text-sm font-sans text-red-400">↓ 19%</span></span>
             </div>
             <p className="text-sm text-[var(--cream)] opacity-60 max-w-[200px] leading-snug">
               You're 2 moves from getting this back.
             </p>
           </div>

           <button className="bg-transparent border border-[var(--gold)] text-[var(--gold)] font-sans text-[12px] px-6 py-2.5 rounded-md hover:bg-[var(--gold)] hover:text-[var(--black)] transition-all">
             See what to do →
           </button>
        </div>

        <div className="mt-10 pt-10 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] text-[var(--muted)] tracking-widest">
          <span>2 OTHER DEALS WORTH A LOOK TODAY</span>
          <span className="text-lg">↓</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatPill({ num, label, delay }: { num: string, label: string, delay: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="border border-[var(--glass-border)] px-8 py-5 rounded-full text-center flex-1 min-w-[200px]"
    >
      <span className="font-display text-4xl text-[var(--gold)] block leading-none">{num}</span>
      <span className="font-sans text-[10px] text-[var(--muted)] tracking-widest uppercase mt-2 block">{label}</span>
    </motion.div>
  );
}
