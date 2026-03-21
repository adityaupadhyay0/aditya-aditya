'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

const scores = [
  {
    label: 'Deal Health',
    value: '52',
    conf: 78,
    data: 61,
    contra: 'Call sentiment positive — email engagement down 60% in 14 days.',
    missing: ['CFO / economic buyer signal', 'Legal engagement'],
    change: 'Sarah responds or James Wu joins next meeting: +18 points'
  },
  {
    label: 'Risk Score',
    value: '78',
    conf: 82,
    data: 74,
    contra: 'Pricing was agreed on call, but contract was not opened for 10 days.',
    missing: ['Legal review sign-off', 'Revised T&Cs approval'],
    change: 'Legal engagement: -12 points'
  },
  {
    label: 'Stall Probability',
    value: '71%',
    conf: 65,
    data: 58,
    contra: 'High executive engagement, but zero movement on technical tasks.',
    missing: ['IT project manager sign-off'],
    change: 'Technical eval complete: -24% probability'
  },
  {
    label: 'Close This Quarter',
    value: '34%',
    conf: 91,
    data: 88,
    contra: 'Average close time for this segment is 120 days. GlobalCo is at day 92.',
    missing: ['Final procurement approval'],
    change: 'Procurement sign-off: +45% probability'
  }
];

export default function SceneTruth() {
  const [hoveredScore, setHoveredScore] = useState(null);

  return (
    <section id="scene-truth" className="min-h-screen py-[var(--s-xl)] px-8 relative bg-[var(--black)] overflow-hidden">
      <SectionLine />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[44%_56%] gap-[var(--s-lg)] items-center">
        <div>
          <ChapterLabel>06 / THE TRUTH</ChapterLabel>
          <RevealText>
            <h2 className="font-serif italic text-[var(--t-h2)] text-[var(--white)] leading-[1.1] mb-6">
              Jordan never<br />pretends to know<br />what it doesn't.
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-md">
              Every score. Every recommendation. Every forecast. Shows exactly how confident it is — and why.
              <br /><br />
              Because a system that is confidently wrong is worse than one that is honestly uncertain.
            </p>
          </RevealText>

          <RevealText delay={0.4} className="mt-12">
            <div className="border border-[var(--glass-border)] rounded-md overflow-hidden bg-[var(--black-2)]/50">
               <div className="p-4 border-b border-[var(--glass-border)] text-[var(--muted)] text-sm italic">
                 <span className="text-red-400 mr-2 uppercase text-[10px] font-bold">❌ Most tools say:</span>
                 "Win probability: 67%"
               </div>
               <div className="p-4 border-l-2 border-[var(--gold)] bg-[var(--gold-dim)] text-[var(--white)] text-sm italic">
                 <span className="text-[var(--gold)] mr-2 uppercase text-[10px] font-bold">✓ Jordan says:</span>
                 "Win probability: 55–72%"<br />
                 <span className="text-[10px] text-[var(--muted)] block mt-2 leading-relaxed">
                   "Low confidence — CFO signal missing. Sentiment contradicts engagement trend."
                 </span>
               </div>
            </div>
          </RevealText>
        </div>

        <div className="relative p-8 flex flex-col items-center">
           <div className="w-full max-w-md bg-[var(--black-3)] border border-[var(--glass-border)] rounded-lg p-10 shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                 <span className="text-[10px] uppercase text-[var(--muted)] tracking-widest font-bold">GLOBALCO · $380K</span>
                 <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
              </div>

              <div className="space-y-4">
                 {scores.map((score, i) => (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      className="group relative cursor-default outline-none focus:bg-[var(--gold-dim)]"
                      onMouseEnter={() => setHoveredScore(score)}
                      onMouseLeave={() => setHoveredScore(null)}
                      onFocus={() => setHoveredScore(score)}
                      onBlur={() => setHoveredScore(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setHoveredScore(hoveredScore === score ? null : score);
                        }
                      }}
                    >
                       <div className="flex justify-between items-center py-4 border-b border-white/5 group-hover:bg-[var(--gold-dim)] transition-all px-4 -mx-4 rounded">
                         <span className="text-[var(--muted)] font-sans text-xs uppercase tracking-widest">{score.label}</span>
                         <span className="text-[var(--white)] font-display text-2xl">{score.value}</span>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-8 py-4 border-t border-white/5">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-[var(--muted)] uppercase tracking-widest">FORECAST</span>
                    <span className="text-[var(--gold)] font-bold">$180K – $380K</span>
                 </div>
                 <p className="text-[10px] text-[var(--muted)] text-right mt-1 opacity-60">(likely: $260K)</p>
              </div>

              <motion.p
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center text-[10px] text-[var(--muted)] uppercase tracking-widest mt-8 font-bold"
              >
                Hover any score to see exactly why.
              </motion.p>
           </div>

           <AnimatePresence>
             {hoveredScore && (
               <Tooltip score={hoveredScore} />
             )}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Tooltip({ score }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="absolute right-[calc(100%+24px)] top-1/2 -translate-y-1/2 w-[320px] bg-[var(--black-2)] border border-[var(--glass-border)] border-l-[3px] border-l-[var(--gold)] p-8 rounded shadow-[0_24px_60px_rgba(0,0,0,0.8)] z-50 pointer-events-none"
    >
       <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest block font-bold mb-4">WHY THIS SCORE</span>

       <div className="space-y-4 mb-6">
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] text-[var(--cream)] uppercase tracking-widest">
                <span>Signal Reliability</span>
                <span>{score.conf}/100</span>
             </div>
             <div className="h-1 bg-[var(--glass-border)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score.conf}%` }} className="h-full bg-[var(--gold)]" />
             </div>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] text-[var(--cream)] uppercase tracking-widest">
                <span>Data Completeness</span>
                <span>{score.data}/100</span>
             </div>
             <div className="h-1 bg-[var(--glass-border)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score.data}%` }} className="h-full bg-[var(--gold)]" />
             </div>
          </div>
       </div>

       <div className="bg-red-500/10 border border-red-500/20 p-3 rounded mb-6">
          <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest block mb-1">⚠ CONTRADICTION</span>
          <p className="text-[11px] text-red-200/70 italic leading-relaxed">{score.contra}</p>
       </div>

       <div className="mb-6">
          <span className="text-[9px] text-[var(--muted)] font-bold uppercase tracking-widest block mb-2">MISSING</span>
          <ul className="text-[11px] text-[var(--cream)] space-y-1 opacity-70">
             {score.missing.map((m, i) => <li key={i} className="flex gap-2"><span>·</span> {m}</li>)}
          </ul>
       </div>

       <div className="pt-4 border-t border-white/5">
          <span className="text-[9px] text-[var(--gold)] font-bold uppercase tracking-widest block mb-1">WHAT WOULD CHANGE THIS</span>
          <p className="text-[11px] text-[var(--cream)] italic leading-relaxed">{score.change}</p>
       </div>
    </motion.div>
  );
}
