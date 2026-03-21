'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

const timelineSteps = [
  {
    day: 'DAY 1',
    text: 'Better call summaries from your first ingested call. Your first deal brief. Assembled automatically.'
  },
  {
    day: 'DAY 3',
    text: 'First recommended action per deal. Specific. With a draft ready.'
  },
  {
    day: 'DAY 7',
    text: 'First pipeline truth view. What\'s real. What\'s inflated. What\'s at risk.'
  },
  {
    day: 'DAY 14',
    text: 'A forecast your CRO believes. Signed off before the board meeting.'
  }
];

export default function SceneDayOne() {
  return (
    <section id="scene-day-one" className="min-h-screen py-[var(--s-xl)] px-8 relative bg-gradient-to-b from-[var(--black)] to-[var(--black-2)] overflow-hidden">
      <SectionLine />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-[var(--s-lg)]">
        <div>
          <ChapterLabel>04 / DAY ONE</ChapterLabel>
          <RevealText>
            <h2 className="font-display text-[var(--t-h2)] text-[var(--white)] leading-[0.92] mb-6 uppercase">
              USEFUL FROM<br />THE FIRST SESSION.
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-md mb-12">
              Jordan doesn't wait for your data. It arrives pre-trained on thousands of enterprise deals across your industry and deal size.
            </p>
          </RevealText>

          <div className="relative pl-8 flex flex-col gap-10">
            {/* Vertical timeline line */}
            <div className="absolute left-1.5 top-2 bottom-2 w-[1px] bg-[var(--glass-border)]" />

            {timelineSteps.map((step, i) => (
              <TimelineNode key={i} day={step.day} text={step.text} delay={i * 0.1} />
            ))}
          </div>

          <RevealText delay={0.6} className="mt-16">
            <p className="font-sans text-[12px] text-[var(--muted)] max-w-sm italic">
              Jordan uses industry-wide patterns for Day 1. Your own data personalizes it within 30 days.
            </p>
          </RevealText>
        </div>

        <div className="relative flex items-center justify-center p-8">
           <div className="w-full h-[600px] border border-[var(--glass-border)] rounded-2xl bg-[var(--black-3)]/30 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-dim)] via-transparent to-transparent opacity-50" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
                 <div className="w-[1px] h-full bg-[var(--glass-border)] absolute left-1/2 -translate-x-1/2 opacity-20" />

                 {timelineSteps.map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-20% 0px" }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      className="w-16 h-16 rounded-full border border-[var(--gold)] bg-[var(--black-2)] flex items-center justify-center relative z-10 group-hover:shadow-[0_0_24px_var(--gold-glow)] transition-all"
                    >
                       <span className="font-display text-[var(--gold)] text-xl">{i + 1}</span>
                       <motion.div
                         animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                         className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-10"
                       />
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ day, text, delay }: { day: string, text: string, delay: number }) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      {/* Node dot */}
      <motion.div
        whileInView={{ backgroundColor: 'var(--gold)', borderColor: 'var(--gold)', boxShadow: '0 0 14px var(--gold-glow)' }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
        className="absolute left-[-30px] top-1.5 w-3 h-3 rounded-full border border-[var(--glass-border)] bg-[var(--black-3)] z-10 transition-colors"
      />

      <span className="font-display text-[var(--gold)] text-[13px] tracking-widest block mb-1">{day}</span>
      <p className="font-sans text-[15px] text-[var(--cream)] leading-[1.6]">
        {text}
      </p>
    </motion.div>
  );
}
