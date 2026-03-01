'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSillage } from './SillageContext';
import { useSillageAudio } from './SillageAudio';

export const ScentLab: React.FC = () => {
  const [molecules, setMolecules] = useState<{ id: number, x: number, y: number, color: string, freq: number, type: string }[]>([]);
  const [ambientColor, setAmbientColor] = useState('#fdfaf5');
  const { logEvent } = useSillage();
  const { playNotePing } = useSillageAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  const addMolecule = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const types = ['Orris', 'Vetiver', 'Aldehydes', 'Ambrette'];
    const type = types[Math.floor(Math.random() * types.length)];
    const colors = ['#c4956a', '#5c3d2e', '#d4e8f0', '#7a4f35'];
    const freqs = [329.63, 220.00, 440.00, 164.81];
    const index = types.indexOf(type);

    const newMolecule = {
      id: Date.now(),
      x, y,
      color: colors[index],
      freq: freqs[index],
      type
    };

    setMolecules(prev => [...prev, newMolecule].slice(-10));
    setAmbientColor(colors[index]);
    playNotePing(newMolecule.freq);
    logEvent('lab_synthesis', { type });
  };

  return (
    <section
       className="py-64 px-12 relative overflow-hidden min-h-screen flex flex-col items-center transition-colors duration-1000"
       style={{ backgroundColor: `${ambientColor}08` }}
    >
       <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <svg width="100%" height="100%">
             <filter id="labNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="3" />
             </filter>
             <rect width="100%" height="100%" filter="url(#labNoise)" />
          </svg>
       </div>

       <div className="max-w-6xl text-center space-y-12 mb-32 relative z-10">
          <div className="space-y-4">
             <span className="font-mono text-[0.8rem] uppercase tracking-[1em] text-[#c29f6b]">L'Atelier de Synthèse</span>
             <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#0d0d0d]/30">Paris · 75001</p>
          </div>
          <h2 className="text-8xl md:text-[12rem] font-light italic text-[#0d0d0d] tracking-tighter leading-none">The Lab.</h2>
          <p className="font-serif italic text-3xl text-[#0d0d0d]/40 max-w-4xl mx-auto leading-tight">Touch the void to release molecules. Bathe the atmosphere in your selection.</p>
       </div>

       <div
          ref={containerRef}
          onClick={addMolecule}
          className="relative w-full max-w-7xl aspect-[21/9] border border-[#0d0d0d]/5 bg-white/40 backdrop-blur-2xl cursor-crosshair overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.01)]"
       >
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c29f6b]/20 to-transparent" />

          <AnimatePresence>
             {molecules.map((m) => (
               <motion.div
                  key={m.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                     scale: [1, 5, 0],
                     opacity: [0.7, 0.2, 0],
                     // Animating left/top directly for container-relative positioning
                     left: [`${m.x}%`, `${m.x + (Math.random() - 0.5) * 20}%`],
                     top: [`${m.y}%`, `${m.y - 30}%`]
                  }}
                  transition={{ duration: 5, ease: "easeOut" }}
                  className="absolute w-24 h-24 rounded-full blur-[50px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: m.color }}
               />
             ))}
          </AnimatePresence>

          <div className="absolute top-12 left-12 flex flex-col gap-2 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-[#0d0d0d]/20">
             <span>Protocol: Sillage_v2.2</span>
             <span>Environment: Isolated</span>
          </div>

          <div className="absolute bottom-12 right-12 text-right font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#c29f6b]">
             <p>Live Synthesis Engine</p>
             <p className="text-[#0d0d0d]/20 mt-2">Active Components: {molecules.length}</p>
          </div>
       </div>

       <div className="mt-48 grid grid-cols-2 md:grid-cols-4 gap-24">
          {[
            { label: 'IRIS ROOT', color: '#c4956a' },
            { label: 'VETIVER BOURBON', color: '#5c3d2e' },
            { label: 'ALDEHYDES', color: '#d4e8f0' },
            { label: 'AMBRETTE SEED', color: '#7a4f35' }
          ].map((ing) => (
             <div key={ing.label} className="flex flex-col items-center gap-6 group">
                <div className="w-1.5 h-1.5 rounded-full transition-all duration-700 group-hover:scale-[3]" style={{ backgroundColor: ing.color }} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#0d0d0d]/40 group-hover:text-[#0d0d0d] transition-colors">{ing.label}</span>
             </div>
          ))}
       </div>
    </section>
  );
};
