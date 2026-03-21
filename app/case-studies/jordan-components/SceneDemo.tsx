'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChapterLabel, SectionLine } from './Common';

const beats = [
  {
    id: 1,
    time: 'MONDAY · 9:00 AM',
    text: 'Marcus has 15 active deals. He opens his tools. The same 11 tabs as yesterday.',
    detail: 'Time lost today: 00:00:00 →',
    isRed: true,
  },
  {
    id: 2,
    time: 'MONDAY · 9:03 AM',
    text: 'Then Marcus opens Jordan. One surface. Everything assembled. In 3 seconds.',
    detail: 'Time to first insight: 3 seconds',
    isRed: false,
  },
  {
    id: 3,
    time: 'MONDAY · 9:05 AM',
    text: 'Marcus clicks. The deal cockpit assembles. Stakeholder map. Risk signals. Recommended action. Draft ready. Under 1 second.',
    detail: 'Everything on one surface.',
    isRed: false,
  },
  {
    id: 4,
    time: 'MONDAY · 9:09 AM',
    text: 'The draft is ready. Personalized. Source-cited. Marcus edits one line. Approves. Done.',
    detail: 'This deal review: 9 minutes. Previously: 3 hours.',
    isRed: false,
  }
];

export default function SceneDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const activeBeatIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3]);
  const [currentBeat, setCurrentBeat] = useState(1);

  scrollYProgress.on('change', (v) => {
    const nextBeat = Math.min(Math.floor(v * 4) + 1, 4);
    if (nextBeat !== currentBeat) setCurrentBeat(nextBeat);
  });

  return (
    <section id="scene-demo" ref={containerRef} className="relative h-[400vh] bg-[var(--black)]">
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        <div className="px-8 py-[var(--s-md)]">
          <SectionLine />
          <ChapterLabel>05 / THE AE</ChapterLabel>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[42%_58%] gap-[var(--s-lg)] px-8 items-center pb-20">
          {/* Narrative (left) */}
          <div className="pl-0 md:pl-[var(--s-xl)] h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {beats.map((beat, i) => (
                (currentBeat === beat.id) && (
                  <motion.div
                    key={beat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-4"
                  >
                    <span className="font-display text-[var(--gold)] text-[13px] tracking-widest">{beat.time}</span>
                    <h3 className="font-serif italic text-[clamp(24px,3vw,36px)] text-[var(--white)] leading-[1.3]">
                      {beat.text}
                    </h3>
                    <p className={`font-sans text-[14px] uppercase tracking-widest ${beat.isRed ? 'text-red-400' : 'text-[var(--gold)]'}`}>
                      {beat.detail}
                    </p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Demo UI (right) */}
          <div className="relative h-[500px] w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBeat}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                {currentBeat === 1 && <DemoUIState1 />}
                {currentBeat === 2 && <DemoUIState2 />}
                {currentBeat === 3 && <DemoUIState3 />}
                {currentBeat === 4 && <DemoUIState4 />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoTopBar({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-[var(--glass-border)] text-[10px] text-[var(--muted)] tracking-widest uppercase">
       <div className="flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
         <span>JORDAN</span>
       </div>
       <div className="flex-1 text-center font-bold text-[var(--cream)]">{title}</div>
       <span>{subtitle}</span>
    </div>
  );
}

function DemoUIState1() {
  const tabs = ['CRM', 'Call Recorder', 'Sequencer', 'Forecast', 'Enrichment', 'Intent', 'Coaching', 'Capture', 'Email', 'Calendar', 'Sheet'];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[var(--black-2)] rounded-xl border border-[var(--glass-border)] p-8">
      <div className="flex flex-wrap gap-3 justify-center max-w-md">
        {tabs.map((tab, i) => (
          <div key={i} className="px-4 py-2 border border-[var(--glass-border)] text-[var(--muted)] text-[12px] rounded-md opacity-40 italic">
            {tab}
          </div>
        ))}
      </div>
      <p className="mt-12 text-red-500 font-sans text-[12px] uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full">
        Time to first useful insight: 3 hours
      </p>
    </div>
  );
}

function DemoUIState2() {
  return (
    <div className="w-full h-full flex flex-col bg-[var(--black-3)] rounded-xl border border-[var(--glass-border)] overflow-hidden">
      <DemoTopBar title="MORNING SURFACE" subtitle="MARCUS" />
      <div className="p-8">
        <p className="text-[var(--cream)] opacity-60 text-xs mb-6 font-serif italic">One thing needs your attention today.</p>
        <div className="border border-[var(--glass-border)] border-l-2 border-l-[var(--gold)] p-6 bg-[var(--glass)] rounded-md">
          <div className="flex justify-between items-start mb-4">
             <div>
               <h4 className="text-red-400 font-bold mb-1 flex items-center gap-2 text-base">
                 <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_red]" />
                 GlobalCo · $380K
               </h4>
               <p className="text-[var(--muted)] text-xs uppercase tracking-wider">Champion went dark · 14 days</p>
             </div>
             <div className="text-right">
               <span className="text-[var(--gold)] font-display text-2xl">52%</span>
               <p className="text-[var(--muted)] text-[10px] uppercase tracking-widest">Win Prob</p>
             </div>
          </div>
          <button className="text-[var(--gold)] border border-[var(--gold)] px-6 py-2 rounded text-[12px] hover:bg-[var(--gold)] hover:text-black transition-colors">See what to do →</button>
        </div>
      </div>
    </div>
  );
}

function DemoUIState3() {
  return (
    <div className="w-full h-full flex flex-col bg-[var(--black-3)] rounded-xl border border-[var(--glass-border)] overflow-hidden">
      <DemoTopBar title="GLOBALCO · $380K · Q2" subtitle="DEAL COCKPIT" />
      <div className="p-6 overflow-y-auto">
        <div className="mb-8">
          <h5 className="text-[10px] text-[var(--muted)] tracking-widest mb-4 uppercase">STAKEHOLDER MAP</h5>
          <div className="space-y-3">
            <StakeholderRow name="Sarah Kim" role="Champion" status="DARK" isRed />
            <StakeholderRow name="James Wu" role="Econ. Buyer" status="NEVER ENGAGED" isRed />
            <StakeholderRow name="Dev Team" role="Tech Eval" status="ACTIVE" isGreen />
          </div>
        </div>

        <div className="border-t border-[var(--glass-border)] pt-6">
          <h5 className="text-[10px] text-[var(--muted)] tracking-widest mb-4 uppercase">RECOMMENDED ACTION</h5>
          <div className="p-4 bg-[var(--gold-dim)] rounded-md border border-[var(--gold-glow)]">
            <p className="text-[var(--cream)] text-sm italic leading-relaxed">
              "Re-engage Sarah Kim. Then get an intro to James Wu — he's never been involved."
            </p>
            <button className="mt-4 text-[var(--gold)] text-xs hover:underline">Review draft →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StakeholderRow({ name, role, status, isRed = false, isGreen = false }) {
  return (
    <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
      <span className="text-[var(--white)] font-bold">{name}</span>
      <span className="text-[var(--muted)]">{role}</span>
      <div className="flex items-center gap-2">
        <span className={isRed ? 'text-red-400' : isGreen ? 'text-green-400' : 'text-amber-400'}>{status}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${isRed ? 'bg-red-500' : isGreen ? 'bg-green-500' : 'bg-amber-500'}`} />
      </div>
    </div>
  );
}

function DemoUIState4() {
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full h-full flex flex-col bg-[var(--black-3)] rounded-xl border border-[var(--glass-border)] overflow-hidden">
      <DemoTopBar title="DRAFT · SARAH KIM" subtitle="EMAIL" />
      <div className="p-8 flex flex-col h-full">
        <div className="flex-1">
          <div className="bg-[var(--glass)] p-3 rounded mb-4 text-[10px] text-[var(--muted)] inline-block">AI-generated — review before sending</div>
          <p className="text-[var(--white)] font-bold text-sm mb-4">Subject: Quick thought on the GlobalCo deal</p>
          <div className="text-[var(--cream)] text-xs leading-relaxed space-y-4 font-serif italic">
            <p>Sarah,</p>
            <p>I was reviewing our notes from the Mar 7 call. You mentioned the CFO's primary concern was the deployment window for Q2.</p>
            <p>I've put together a specific timeline for your team. Would it make sense to bring James Wu into the conversation next week to review this?</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--glass-border)] flex justify-between items-center">
          <div className="text-[10px] text-[var(--muted)] flex gap-4">
             <span>SOURCES:</span>
             <span className="hover:text-[var(--gold)] cursor-pointer">Mar 7 Call ↗</span>
             <span className="hover:text-[var(--gold)] cursor-pointer">Q1 Signal ↗</span>
          </div>
          <div className="flex gap-4">
             {sent ? (
               <motion.span initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-green-400 font-bold text-xs">✓ SENT</motion.span>
             ) : (
               <>
                 <button className="text-[var(--muted)] text-xs hover:text-[var(--white)]">Edit</button>
                 <button
                  onClick={() => setSent(true)}
                  className="bg-[var(--gold)] text-[var(--black)] px-6 py-2 rounded text-[12px] font-bold hover:bg-[var(--gold-light)] transition-all"
                 >
                   Approve & Send →
                 </button>
               </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
