'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GoldGrid, RevealText } from './Common';

export default function SceneCTA() {
  return (
    <section id="scene-cta" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[var(--black)]">
      <GoldGrid glow />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-[var(--t-hero)] text-[var(--muted)] leading-[0.92] mb-4 uppercase"
        >
          11 TABS.
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif italic text-[var(--muted)] text-2xl mb-4 block"
        >
          — or —
        </motion.span>

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="font-display text-[var(--t-display)] text-[var(--gold)] leading-[0.92] mb-12 uppercase"
        >
          JORDAN.
        </motion.h2>

        <RevealText delay={0.8}>
          <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-md mx-auto mb-16">
            The complete sales platform. Replace your entire stack. Or start with one module. You choose.
          </p>
        </RevealText>

        <div className="flex flex-wrap justify-center gap-[var(--s-sm)] mb-16">
          <button className="bg-[var(--gold)] text-[var(--black)] font-sans font-bold text-[14px] uppercase tracking-wider px-10 py-5 rounded-[4px] hover:bg-[var(--gold-light)] hover:-translate-y-1 transition-all duration-300 shadow-[0_14px_44px_var(--gold-glow)]">
            Request Early Access
          </button>
          <button className="bg-transparent border border-[var(--glass-border)] text-[var(--cream)] font-sans text-[14px] px-10 py-5 rounded-[4px] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors inline-block">
            Talk to a human first →
          </button>
        </div>

        <RevealText delay={1.2}>
          <p className="font-sans text-[12px] text-[var(--muted)] max-w-[400px] leading-relaxed mx-auto italic uppercase tracking-widest">
            Jordan is in private beta. We onboard three enterprise teams per month. No demo farm. No sales sequence. A real conversation.
          </p>
        </RevealText>
      </div>

      <footer className="absolute bottom-8 w-full text-center">
         <span className="font-sans text-[11px] text-[var(--muted)] tracking-[0.2em] uppercase">
            Jordan · Private Beta 2026 · hello@jordan.ai
         </span>
      </footer>
    </section>
  );
}
