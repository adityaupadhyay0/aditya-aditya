'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

const confessions = [
  {
    quote: '"My forecast is rep opinion dressed as a number."',
    attr: 'CRO, $80M ARR'
  },
  {
    quote: '"I find out a deal is dying when it\'s already dead."',
    attr: 'Enterprise AE, 14 years in the field'
  },
  {
    quote: '"I spend 3 hours every morning deciding who to contact and what to say."',
    attr: 'SDR, Top 10% quota attainment'
  },
  {
    quote: '"Half my week is data hygiene. I haven\'t done strategy in months."',
    attr: 'RevOps Director, 200-person sales org'
  },
  {
    quote: '"I asked \'will we hit the number?\' I got a 20-slide deck."',
    attr: 'CEO, post Series B'
  }
];

export default function SceneConfession() {
  return (
    <section id="scene-confession" className="min-h-screen py-[var(--s-xl)] px-8 relative bg-[var(--black)]">
      <SectionLine />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-[var(--s-lg)]">
        <div>
          <ChapterLabel>01 / THE PROBLEM</ChapterLabel>
          <RevealText>
            <h2 className="font-serif italic text-[var(--t-h2)] text-[var(--white)] leading-[1.1] mb-6">
              Every revenue leader<br />has a secret.
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-md">
              They don't put it in the board deck. They barely say it to their team. But the data is clear — and so is the pain.
            </p>
          </RevealText>
        </div>

        <div className="flex flex-col gap-[var(--s-sm)]">
          {confessions.map((confession, i) => (
            <ConfessionCard key={i} confession={confession} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConfessionCard({ confession, delay }: { confession: any, delay: number }) {
  return (
    <motion.div
      initial={{ x: 60, opacity: 0, rotateY: 12 }}
      whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -3, borderColor: 'var(--gold-light)', boxShadow: '0 0 32px var(--gold-dim)' }}
      className="confession-card bg-[var(--black-3)] border border-[var(--glass-border)] border-l-[3px] border-l-[var(--gold)] p-7 md:p-8 rounded-[4px] relative overflow-hidden group transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, var(--gold-dim), transparent 70%)' }} />
      <p className="font-serif italic text-[clamp(17px,1.6vw,21px)] text-[var(--white)] leading-[1.5] mb-4">
        {confession.quote}
      </p>
      <p className="font-sans text-[var(--t-small)] text-[var(--muted)] tracking-widest uppercase">
        — {confession.attr}
      </p>
    </motion.div>
  );
}
