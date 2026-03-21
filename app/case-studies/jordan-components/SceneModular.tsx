'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

const modules = [
  {
    icon: 'DB',
    name: 'DEAL BRAIN',
    desc: 'Every active deal. Health score, risk signals, and the one thing to do next. Always.',
    replaces: 'Your CRM + gut feel',
    start: 'Works from day one, with 2 integrations.'
  },
  {
    icon: 'AE',
    name: 'AE COCKPIT',
    desc: 'One surface. Full context. The draft ready. The CRM updated. Your AEs close 11 tabs.',
    replaces: 'CRM + email + call notes + spreadsheet',
    start: 'Ideal first module for AE teams.'
  },
  {
    icon: 'FC',
    name: 'FORECASTING',
    desc: 'A range, not a guess. With signal basis. With honest confidence. Before the board meeting.',
    replaces: 'Manual forecast + CRM reports + RevOps prep',
    start: 'Connect CRM + email. Done in a day.'
  },
  {
    icon: 'CI',
    name: 'CONVERSATION INTELLIGENCE',
    desc: 'Every call recorded, transcribed, and turned into deal updates and coaching triggers. Automatically.',
    replaces: 'Gong, Chorus, manual note-taking',
    start: 'Works on first call.'
  },
  {
    icon: 'EE',
    name: 'ENGAGEMENT ENGINE',
    desc: 'Signal-grounded outreach. Not templates. Every message personalized to what just happened at that account.',
    replaces: 'Sequence tools, manual prospecting',
    start: 'Ideal for SDR teams.'
  },
  {
    icon: 'CO',
    name: 'COACHING',
    desc: 'What your best reps do differently. Surfaced automatically. For every manager. Every week.',
    replaces: 'Manual call review, coaching spreadsheets',
    start: 'Activates from call data in week one.'
  }
];

export default function SceneModular() {
  return (
    <section id="scene-modular" className="min-h-screen py-[var(--s-xl)] px-8 relative bg-[var(--black)] overflow-hidden">
      <SectionLine />
      <div className="max-w-7xl mx-auto">
        <ChapterLabel>08 / START ANYWHERE</ChapterLabel>

        <div className="max-w-4xl">
          <RevealText>
            <h2 className="font-serif italic text-[var(--t-h2)] text-[var(--white)] leading-[1.1] mb-6">
              You don't have to replace<br />everything on day one.
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-md">
              Jordan is built to start exactly where your team needs it most. Begin with your AEs. Or your forecast. Or just one region.
              <br /><br />
              Every piece works standalone. Every piece is better together. You choose the pace.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--s-sm)] mt-[var(--s-xl)]">
           {modules.map((module, i) => (
             <ModuleCard key={i} module={module} delay={i * 0.1} />
           ))}
        </div>

        <div className="mt-[var(--s-xl)] text-center flex flex-col items-center">
           <RevealText delay={0.8}>
              <p className="font-sans text-[var(--cream)] text-[16px] max-w-[600px] mb-4">
                 "Most teams start with Deal Brain and the AE Cockpit. They see value in week one. They replace the rest of their stack within 90 days."
              </p>
              <span className="font-sans text-[13px] text-[var(--muted)] italic">
                 — Average Jordan customer journey
              </span>
           </RevealText>
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ module, delay }: { module: any, delay: number }) {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, borderColor: 'var(--gold)' }}
      role="article"
      aria-label={module.name}
      className="bg-[var(--black-3)] border border-[var(--glass-border)] p-10 rounded-lg relative overflow-hidden group cursor-pointer transition-all duration-300"
    >
       <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, var(--gold-dim), transparent)' }} />

       <div className="relative z-10">
          <div className="w-10 h-10 border border-[var(--glass-border)] rounded-md flex items-center justify-center font-display text-[var(--gold)] text-xl mb-6">
             {module.icon}
          </div>

          <h4 className="font-sans font-bold text-base text-[var(--white)] mb-4">{module.name}</h4>

          <p className="font-sans text-[13px] text-[var(--cream)] leading-[1.6] mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
            {module.desc}
          </p>

          <div className="space-y-4 pt-6 border-t border-white/5">
             <div>
                <span className="text-[10px] text-[var(--muted)] block mb-1 uppercase font-bold tracking-widest">Replaces</span>
                <p className="text-[11px] text-[var(--cream)] opacity-60"><strong>{module.replaces}</strong></p>
             </div>

             <motion.div
               className="opacity-0 group-hover:opacity-100 transition-all duration-300"
               animate={{ x: 0 }}
               whileHover={{ x: 4 }}
             >
                <span className="text-[12px] text-[var(--gold)] font-bold tracking-widest uppercase">Start here →</span>
                <p className="text-[10px] text-[var(--muted)] mt-1">{module.start}</p>
             </motion.div>
          </div>
       </div>
    </motion.div>
  );
}
