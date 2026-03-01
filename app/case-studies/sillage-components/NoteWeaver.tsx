'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSillage } from './SillageContext';
import { useSillageAudio } from './SillageAudio';

export const NoteWeaver: React.FC = () => {
  const { session, setSoul, logEvent } = useSillage();
  const { playNotePing } = useSillageAudio();

  const ingredients = [
    { label: 'IRIS ROOT', color: '#d8c8ff', texture: 'silk', freq: 329.63, description: "Powdered stone. Quiet, unreachable elegance." },
    { label: 'VETIVER BOURBON', color: '#5c3d2e', texture: 'earth', freq: 220.00, description: "Smoke and soil. The ground after rain has passed." },
    { label: 'ALDEHYDES', color: '#d4e8f0', texture: 'mist', freq: 440.00, description: "Metallic light through cloud cover." },
    { label: 'AMBRETTE SEED', color: '#7a4f35', texture: 'dust', freq: 164.81, description: "Skin-warm. Something intimate and barely there." }
  ];

  const handlePick = (ing: any) => {
    setSoul({
      color: ing.color,
      texture: ing.texture as any,
      freq: ing.freq,
      label: ing.label
    });
    playNotePing(ing.freq);
    logEvent('note_woven', { ingredient: ing.label });
  };

  return (
    <section className="py-[30vh] px-12 relative overflow-hidden flex flex-col items-center">
       {/* Background Scent Bloom (Generative) */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
             {session.activeSoul && (
                <motion.div
                   key={session.activeSoul.label}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 0.15, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.2 }}
                   transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] animate-spin-slow opacity-60">
                      <motion.circle
                         cx="50" cy="50" r="40"
                         fill="none" stroke={session.activeSoul.color}
                         strokeWidth="0.1" strokeDasharray="1,2"
                      />
                      <motion.polygon
                         points="50,10 90,50 50,90 10,50"
                         fill="none" stroke={session.activeSoul.color}
                         strokeWidth="0.05"
                      />
                   </svg>
                </motion.div>
             )}
          </AnimatePresence>
       </div>

       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-12">
             <div className="space-y-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[1em] text-[#c29f6b]">L'Atelier de Synthèse</span>
                <div className="h-px w-24 bg-[#c29f6b]/20" />
             </div>
             <h2 className="text-8xl md:text-[14rem] font-light italic text-[#0d0d0d] tracking-tighter leading-[0.8] text-balance">The Note Weaver.</h2>
             <p className="font-serif italic text-3xl text-[#0d0d0d]/40 max-w-2xl leading-tight">Pick an ingredient to bathe the atmosphere in its soul. Synthesize the fragrance in real-time.</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
             {ingredients.map((ing) => (
                <button
                   key={ing.label}
                   onClick={() => handlePick(ing)}
                   className={`p-16 border transition-all duration-1000 text-left relative group overflow-hidden ${session.activeSoul?.label === ing.label ? 'border-[#c29f6b] bg-white shadow-2xl' : 'border-[#0d0d0d]/5 bg-white/40 hover:border-[#c29f6b]/30'}`}
                >
                   <div className="relative z-10 space-y-8">
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-[#c29f6b]">{ing.label}</span>
                      <p className="font-serif italic text-xl text-[#0d0d0d]/40 group-hover:text-[#0d0d0d]/80 transition-colors duration-700 leading-snug">"{ing.description}"</p>
                   </div>
                   <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ing.color }} />
                   </div>
                </button>
             ))}
          </div>
       </div>

       {/* Scent Pulse Sidebar (Memory) */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 font-mono text-[0.5rem] uppercase tracking-[0.6em] text-[#0d0d0d]/20 rotate-90 origin-right">
          <span>PARIS · 75001</span>
          <span>MOLECULAR_SYNTHESIS_v4.2</span>
       </div>
    </section>
  );
};
