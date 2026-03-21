'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChapterLabel, RevealText, SectionLine } from './Common';

export default function SceneForecast() {
  return (
    <section id="scene-forecast" className="min-h-screen py-[var(--s-xl)] px-8 relative bg-[var(--black)] overflow-hidden">
      <SectionLine />
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        <ChapterLabel>07 / THE CRO</ChapterLabel>

        <div className="flex flex-col items-center gap-6 mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-end gap-2">
              <Counter target={67} />
              <span className="font-display text-[var(--gold)] text-6xl md:text-8xl mb-2">%</span>
            </div>
            <p className="font-sans text-[var(--t-body)] text-[var(--cream)] leading-[1.7] max-w-lg mt-6">
              of revenue leaders don't trust the data their forecasting relies on.
            </p>
            <span className="font-sans text-[var(--t-small)] text-[var(--muted)] tracking-widest mt-4 uppercase">
              (Enterprise Revenue Research, 2025)
            </span>
          </motion.div>
        </div>

        <RevealText>
          <h2 className="font-display text-[var(--t-hero)] text-[var(--white)] leading-[0.92] mb-8 uppercase">
            KNOW YOUR NUMBER<br />BEFORE YOU WALK INTO<br />THE BOARD ROOM.
          </h2>
        </RevealText>
        <RevealText delay={0.2}>
          <p className="font-serif italic text-[clamp(20px,2.5vw,30px)] text-[var(--cream)] leading-[1.3] mb-16 max-w-2xl">
            Not a number. A range. With signal basis. With honest confidence.
          </p>
        </RevealText>

        <ForecastPanel />
      </div>
    </section>
  );
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        const update = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={nodeRef} className="font-display text-[var(--gold)] text-[clamp(80px,12vw,160px)] leading-[0.92]">{count}</span>;
}

function ForecastPanel() {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl bg-[var(--black-3)] border border-[var(--glass-border)] rounded-lg overflow-hidden shadow-2xl text-left"
    >
      <div className="p-6 border-b border-[var(--glass-border)] flex justify-between items-center text-[10px] text-[var(--muted)] tracking-widest uppercase font-bold">
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
           <span>REVENUE FORECAST · Q1 2026</span>
         </div>
         <span>JORDAN</span>
      </div>

      <div className="p-8 md:p-12">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
               <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-[var(--muted)] font-sans text-xs uppercase tracking-widest">Target</span>
                  <span className="text-[var(--white)] font-display text-3xl">$5.2M</span>
               </div>
               <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[var(--muted)] font-sans text-xs uppercase tracking-widest block mb-1">Rep Submission</span>
                    <span className="text-[var(--muted)] text-[10px] italic">← what your reps think</span>
                  </div>
                  <span className="text-[var(--muted)] font-display text-3xl">$4.9M</span>
               </div>

               <div className="pt-6">
                  <span className="text-[var(--muted)] font-sans text-xs uppercase tracking-widest block mb-6">Jordan Range</span>
                  <div className="flex justify-between text-[var(--white)] font-display text-4xl mb-6">
                     <span>$3.8M</span>
                     <span>$4.6M</span>
                  </div>

                  <div className="relative h-1.5 bg-[var(--glass-border)] rounded-full mb-10 overflow-hidden">
                     <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="absolute inset-y-0 left-[14%] right-[14%] bg-gradient-to-r from-[rgba(201,168,76,0.25)] via-[var(--gold)] to-[rgba(201,168,76,0.25)] origin-left"
                     />
                     <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--gold)] border-4 border-[var(--black-3)] rounded-full shadow-[0_0_12px_var(--gold-glow)]"
                     />
                  </div>

                  <div className="flex justify-between text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest">
                     <span>P10</span>
                     <div className="flex flex-col items-center">
                        <span className="text-[var(--gold)] text-sm mb-1">$4.1M MOST LIKELY</span>
                        <span>P50</span>
                     </div>
                     <span>P90</span>
                  </div>
               </div>
            </div>

            <div className="space-y-10">
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">FORECAST HEALTH</span>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-[var(--glass-border)] rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: '81%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-[var(--gold)]" />
                        </div>
                        <span className="font-display text-[var(--white)] text-xl">81 / 100</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">DATA TRUST</span>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-[var(--glass-border)] rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} whileInView={{ width: '79%' }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-[var(--gold)]" />
                        </div>
                        <span className="font-display text-[var(--white)] text-xl">79 / 100</span>
                     </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5">
                  <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold block mb-4">THIS WEEK'S DELTA</span>
                  <ul className="space-y-4 text-xs font-sans">
                     <li className="flex justify-between items-center text-red-300">
                        <span className="flex items-center gap-2">↓ TechCorp $380K <span className="text-[10px] opacity-60 uppercase">pushed to Q2</span></span>
                        <span className="opacity-60 text-[10px] uppercase">legal review</span>
                     </li>
                     <li className="flex justify-between items-center text-green-300">
                        <span className="flex items-center gap-2">↑ GlobalInc $250K <span className="text-[10px] opacity-60 uppercase">upgraded</span></span>
                        <span className="opacity-60 text-[10px] uppercase">NDA signed</span>
                     </li>
                     <li className="flex justify-between items-center text-[var(--cream)]">
                        <span className="flex items-center gap-2">+ 4 new deals entered: $890K</span>
                     </li>
                  </ul>
               </div>

               <div className="pt-10 border-t border-white/5">
                  <span className="text-[10px] text-[var(--gold)] uppercase tracking-widest font-bold block mb-4">ONE ACTION THIS WEEK</span>
                  <div className="bg-[var(--gold-dim)] p-6 rounded-md border border-[var(--gold-glow)]">
                     <p className="text-[var(--cream)] text-sm italic leading-relaxed mb-4">
                        "Executive sponsor not engaged on GlobalCo. Your involvement → 34% higher close rate. Tuesday 2PM is free on your calendar."
                     </p>
                     <button className="text-[var(--gold)] text-xs font-bold hover:underline">Draft outreach →</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
