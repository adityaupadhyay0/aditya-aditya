'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FragranceDNA, Note } from './sillageData';

interface NotePyramidProps {
  product: FragranceDNA;
}

export const NotePyramid: React.FC<NotePyramidProps> = ({ product }) => {
  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
  const [synesthesiaNote, setSynesthesiaNote] = useState<Note | null>(null);

  const renderTier = (label: string, notes: Note[], duration: string) => (
    <div className="w-full space-y-12">
      <div className="flex justify-between items-center border-b border-[#1c1713]/10 pb-6">
        <div className="space-y-1">
           <span className="font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#b5893a]">{label}</span>
           <p className="font-mono text-[0.5rem] uppercase tracking-widest text-[#1c1713]/30">Diffusion Stage</p>
        </div>
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#1c1713]/40 border border-[#1c1713]/5 px-4 py-2 bg-white/20 backdrop-blur-sm">{duration}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map(note => (
          <motion.button
            key={note.name}
            onMouseEnter={() => setHoveredNote(note)}
            onMouseLeave={() => setHoveredNote(null)}
            onClick={() => {
              setSynesthesiaNote(note);
              setTimeout(() => setSynesthesiaNote(null), 2500);
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-12 border border-[#1c1713]/5 bg-white/40 backdrop-blur-xl rounded-none text-left hover:border-[#b5893a]/30 hover:bg-white transition-all duration-700 relative group overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.02)]"
          >
            <div className="relative z-10 space-y-6">
               <h4 className="font-serif text-3xl uppercase tracking-tighter text-[#1c1713]">{note.name}</h4>
               <div className="w-8 h-px bg-[#b5893a]/20 group-hover:w-full transition-all duration-700" />
               <p className="font-serif italic text-lg text-[#1c1713]/40 group-hover:text-[#1c1713]/80 transition-colors duration-700 leading-snug">"{note.feeling}"</p>
            </div>
            {/* Ambient Particle inside card */}
            <motion.div
               className="absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000"
               style={{ background: note.color }}
               animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-64 px-12 flex flex-col items-center relative overflow-hidden bg-[#f2ece0]">
       {/* Cinematic Background Shadows */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-white/40 to-transparent" />
       </div>

      <AnimatePresence>
        {synesthesiaNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <span className="text-[30vw] font-display uppercase tracking-[0.3em] text-[#1c1713] italic">
              {synesthesiaNote.energy}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] w-full space-y-48 relative z-10">
        <div className="text-center space-y-12">
           <span className="font-mono text-[0.8rem] uppercase tracking-[0.8em] text-[#b5893a]">Pillar 01 — Authority</span>
           <h2 className="text-8xl md:text-[12rem] font-light text-[#1c1713] tracking-tighter leading-tight italic">The Note Pyramid</h2>
           <p className="font-serif italic text-3xl text-[#1c1713]/30 max-w-4xl mx-auto leading-relaxed">"A structural map of an invisible architecture."</p>
        </div>

        <div className="space-y-48">
          {renderTier("The Opening", product.notes.top, "0 – 30 min")}
          {renderTier("The Heart", product.notes.heart, "30 min – 5 hours")}
          {renderTier("The Base", product.notes.base, "5 hours → forever")}
        </div>
      </div>
    </section>
  );
};
