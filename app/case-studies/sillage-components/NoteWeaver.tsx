'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSillage } from './SillageContext';
import { useSillageAudio } from './SillageAudio';

export const NoteWeaver: React.FC = () => {
  const { session, setSoul, logEvent } = useSillage();
  const { setIngredientAmbiance, playNotePing } = useSillageAudio();

  const ingredients = [
    { label: 'IRIS ROOT', color: '#d8c8ff', secondaryColor: '#e0d4ff', freq: 329.63, description: "L'élégance poudreuse d'un matin florentin." },
    { label: 'VETIVER BOURBON', color: '#5c3d2e', secondaryColor: '#7a4f35', freq: 220.00, description: "La terre humide après l'orage." },
    { label: 'ALDEHYDES', color: '#d4e8f0', secondaryColor: '#e0f4f0', freq: 440.00, description: "La clarté métallique d'un ciel parisien." },
    { label: 'AMBRETTE SEED', color: '#7a4f35', secondaryColor: '#a68b5a', freq: 164.81, description: "L'intimité du musc végétal sur la peau." }
  ];

  const handlePick = (ing: any) => {
    setSoul({
      color: ing.color,
      secondaryColor: ing.secondaryColor,
      texture: 'silk',
      freq: ing.freq,
      label: ing.label
    });
    setIngredientAmbiance(ing.freq);
    playNotePing(ing.freq * 2);
    logEvent('note_woven', { ingredient: ing.label });
  };

  return (
    <section className="py-[40vh] px-[10vw] relative overflow-hidden flex flex-col items-center bg-white/5">

       {/* Botanical Parallax Behind */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
             <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 5 }}
                d="M500,100 C300,300 700,500 500,900"
                fill="none" stroke="#0d0d0d" strokeWidth="0.5"
             />
             <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 4, delay: 1 }}
                d="M200,200 C400,400 100,600 300,800"
                fill="none" stroke="#c29f6b" strokeWidth="0.3"
             />
          </svg>
       </div>

       <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-48 items-center relative z-10">
          <div className="space-y-16">
             <div className="space-y-6">
                <span className="font-mono text-[0.7rem] uppercase tracking-[1em] text-[#c29f6b]">L'Atelier de Synthèse</span>
                <div className="h-px w-32 bg-[#c29f6b]/30" />
             </div>
             <h2 className="text-[10vw] font-light italic text-[#0d0d0d] tracking-tighter leading-[0.8] text-balance">The Note Weaver.</h2>
             <p className="font-serif italic text-4xl md:text-5xl text-[#0d0d0d]/30 max-w-2xl leading-tight">Pick an ingredient to bathe the atmosphere in its soul. Synthesize the fragrance in real-time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 scale-[0.9]">
             {ingredients.map((ing) => (
                <button
                   key={ing.label}
                   onClick={() => handlePick(ing)}
                   className={`p-16 border transition-all duration-1000 text-left relative group overflow-hidden ${session.activeSoul?.label === ing.label ? 'border-[#c29f6b] bg-white shadow-[0_50px_100px_rgba(0,0,0,0.05)]' : 'border-[#0d0d0d]/5 bg-white/40 hover:border-[#c29f6b]/30'}`}
                >
                   <div className="relative z-10 space-y-12">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.6em] text-[#c29f6b]">{ing.label}</span>
                      <p className="font-serif italic text-3xl text-[#0d0d0d]/30 group-hover:text-[#0d0d0d]/70 transition-colors duration-1000 leading-tight">"{ing.description}"</p>
                   </div>

                   {/* Bloom Effect on selection */}
                   <AnimatePresence>
                      {session.activeSoul?.label === ing.label && (
                         <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 3, opacity: 0.1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                            style={{ backgroundColor: ing.color }}
                         />
                      )}
                   </AnimatePresence>
                </button>
             ))}
          </div>
       </div>

       {/* Generative Scent Bloom (Centralized) */}
       <div className="mt-[20vh] relative w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] flex items-center justify-center pointer-events-none">
          <AnimatePresence>
             {session.activeSoul && (
                <motion.div
                   key={session.activeSoul.label}
                   initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
                   animate={{ opacity: 1, rotate: 360, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.5 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0"
                >
                   <svg viewBox="0 0 100 100" className="w-full h-full">
                      {[...Array(8)].map((_, i) => (
                         <motion.ellipse
                            key={i}
                            cx="50" cy="50" rx="10" ry="40"
                            transform={`rotate(${i * 45} 50 50)`}
                            fill="none" stroke={session.activeSoul?.color}
                            strokeWidth="0.05"
                            animate={{ rx: [10, 15, 10] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                         />
                      ))}
                      <circle cx="50" cy="50" r="2" fill={session.activeSoul?.color} opacity="0.4" />
                   </svg>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </section>
  );
};
