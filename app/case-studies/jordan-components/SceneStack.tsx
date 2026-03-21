'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

const tabNames = [
  'CRM', 'Call Recorder', 'Sequencer',
  'Forecasting', 'Enrichment', 'Intent Data',
  'Coaching', 'Activity Capture', 'Email',
  'Calendar', 'Spreadsheet'
];

const positions = [
  { x: -340, y: -180, r: -6,  ry: 8  },
  { x:  200, y: -220, r:  4,  ry: -6 },
  { x: -280, y:  60,  r: -10, ry: 12 },
  { x:  320, y:  40,  r:  7,  ry: -8 },
  { x:  -60, y: -260, r:  3,  ry: 5  },
  { x:  380, y: -100, r: -5,  ry: -10},
  { x: -400, y:  180, r:  8,  ry: 6  },
  { x:  140, y:  200, r: -4,  ry: 14 },
  { x: -160, y:  240, r:  6,  ry: -5 },
  { x:  300, y:  220, r: -8,  ry: 8  },
  { x:   40, y:  280, r:  2,  ry: -12}
];

export default function SceneStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="scene-stack" ref={containerRef} className="min-h-[150vh] py-[var(--s-xl)] px-8 relative bg-[var(--black)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(192,57,43,0.04) 0%, transparent 70%)' }} />
      <SectionLine />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ChapterLabel>02 / THE STACK</ChapterLabel>
        <RevealText>
          <h2 className="font-display text-[var(--t-hero)] text-[var(--white)] leading-[0.92] mb-6">
            RIGHT NOW YOUR REP<br />HAS 11 TABS OPEN.
          </h2>
        </RevealText>
        <RevealText delay={0.2}>
          <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-lg mx-auto">
            None of them share data. None of them know what the others know. The AI in each one is flying blind.
          </p>
        </RevealText>
      </div>

      <div className="relative h-[80vh] flex items-center justify-center">
        {tabNames.map((name, i) => (
          <TabCard
            key={i}
            name={name}
            pos={positions[i]}
            progress={springScroll}
          />
        ))}

        {/* SVG Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
           {positions.slice(0, 8).map((p, i) => {
             const next = positions[(i + 1) % positions.length];
             return (
               <line
                 key={i}
                 x1="500" y1="500"
                 x2={500 + p.x} y2={500 + p.y}
                 stroke="white"
                 strokeWidth="1"
                 strokeDasharray="4 6"
               />
             );
           })}
        </svg>
      </div>

      <div className="mt-[var(--s-xl)] text-center relative z-10">
        <RevealText>
          <p className="font-serif italic text-[clamp(24px,4vw,36px)] text-[var(--cream)]">
            What if there was just one?
          </p>
        </RevealText>
      </div>
    </section>
  );
}

function TabCard({ name, pos, progress }: { name: string, pos: any, progress: any }) {
  const x = useTransform(progress, [0, 0.5, 1], [0, pos.x, pos.x * 1.5]);
  const y = useTransform(progress, [0, 0.5, 1], [0, pos.y, pos.y * 1.5]);
  const rotateZ = useTransform(progress, [0, 0.5, 1], [0, pos.r, pos.r * 2]);
  const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0.8, 0.55, 0.55, 0]);

  return (
    <motion.div
      style={{ x, y, rotateZ, opacity, zIndex: 11 - tabNames.indexOf(name) }}
      className="absolute bg-[var(--black-3)] border border-[var(--glass-border)] px-5 py-2.5 rounded-md font-sans text-[13px] text-[var(--cream)] whitespace-nowrap shadow-2xl"
    >
      {name}
    </motion.div>
  );
}
