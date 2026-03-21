'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ChapterLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 0.5, x: 0 }}
    viewport={{ once: true }}
    className={`font-sans text-[var(--t-label)] font-semibold tracking-[0.2em] uppercase text-[var(--gold)] mb-[var(--s-md)] ${className}`}
  >
    {children}
  </motion.div>
);

export const SectionLine = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: "-12% 0px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent origin-left mb-[var(--s-lg)]"
  />
);

export const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ y: 36, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-18% 0px" }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const GoldGrid = ({ className = "", glow = false }: { className?: string, glow?: boolean }) => (
  <div
    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[220vw] h-[220vh] origin-bottom pointer-events-none ${className}`}
    style={{
      transform: 'translateX(-50%) perspective(900px) rotateX(72deg)',
      backgroundImage: `
        linear-gradient(${glow ? 'var(--gold-dim)' : 'var(--glass-border)'} 1px, transparent 1px),
        linear-gradient(90deg, ${glow ? 'var(--gold-dim)' : 'var(--glass-border)'} 1px, transparent 1px)
      `,
      backgroundSize: '64px 64px',
      maskImage: 'radial-gradient(ellipse 80% 55% at 50% 100%, black 30%, transparent 100%)',
      opacity: glow ? 0.6 : 1
    }}
  />
);
