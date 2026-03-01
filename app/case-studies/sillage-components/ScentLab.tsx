'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSillage } from './SillageContext';
import { useSillageAudio } from './SillageAudio';

export const ScentLab: React.FC = () => {
  const [molecules, setMolecules] = useState<{ id: number, x: number, y: number, color: string, freq: number, type: string }[]>([]);
  const { logEvent } = useSillage();
  const { playNotePing } = useSillageAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  const addMolecule = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const types = ['Iris', 'Vetiver', 'Rain', 'Smoke'];
    const type = types[Math.floor(Math.random() * types.length)];
    const colors = ['#c4956a', '#5c3d2e', '#e8d5a3', '#1c1713'];
    const freqs = [330, 220, 440, 110];
    const index = types.indexOf(type);

    const newMolecule = {
      id: Date.now(),
      x, y,
      color: colors[index],
      freq: freqs[index],
      type
    };

    setMolecules(prev => [...prev, newMolecule].slice(-8));
    playNotePing(newMolecule.freq);
    logEvent('lab_synthesis', { type });
  };

  return (
    <section className="py-64 px-12 bg-white relative overflow-hidden min-h-screen flex flex-col items-center">
       <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%">
             <filter id="labNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
             </filter>
             <rect width="100%" height="100%" filter="url(#labNoise)" />
          </svg>
       </div>

       <div className="max-w-4xl text-center space-y-12 mb-32 relative z-10">
          <span className="font-mono text-[0.8rem] uppercase tracking-[0.8em] text-[#b5893a]">The Synthesis Lab</span>
          <h2 className="text-7xl md:text-9xl font-light italic text-[#1c1713] tracking-tighter">Play with the Sillage.</h2>
          <p className="font-serif italic text-2xl text-[#1c1713]/40">Click the canvas to release scent molecules. Mix your own frequency.</p>
       </div>

       <div
          ref={containerRef}
          onClick={addMolecule}
          className="relative w-full max-w-6xl aspect-video border border-[#1c1713]/5 bg-[#f2ece0]/30 backdrop-blur-sm cursor-crosshair overflow-hidden shadow-inner"
       >
          <AnimatePresence>
             {molecules.map((m) => (
               <motion.div
                  key={m.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                     scale: [1, 2, 0],
                     opacity: [0.8, 0.4, 0],
                     x: [`${m.x}%`, `${m.x + (Math.random() - 0.5) * 20}%`],
                     y: [`${m.y}%`, `${m.y - 40}%`]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  className="absolute w-24 h-24 rounded-full blur-[40px] pointer-events-none"
                  style={{ backgroundColor: m.color, left: 0, top: 0 }}
               />
             ))}
          </AnimatePresence>

          <div className="absolute bottom-8 right-8 text-right font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#1c1713]/30">
             <p>Live Synthesis Engine</p>
             <p>Active Molecules: {molecules.length}</p>
          </div>
       </div>

       <div className="mt-32 flex gap-24">
          {['Opening', 'Heart', 'Base'].map((phase, i) => (
             <div key={phase} className="flex flex-col items-center gap-4">
                <div className="w-1 h-12 bg-[#b5893a]/20 relative">
                   <motion.div
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3 + i, repeat: Infinity }}
                      className="absolute top-0 left-0 w-full bg-[#b5893a]"
                   />
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#1c1713]/40">{phase}</span>
             </div>
          ))}
       </div>
    </section>
  );
};
