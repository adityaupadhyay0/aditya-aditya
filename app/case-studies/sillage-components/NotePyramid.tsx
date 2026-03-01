'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FragranceDNA, Note } from './sillageData';

interface NotePyramidProps {
  product: FragranceDNA;
}

export const NotePyramid: React.FC<NotePyramidProps> = ({ product }) => {
  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base' | null>(null);
  const [synesthesiaNote, setSynesthesiaNote] = useState<Note | null>(null);

  const renderNotePill = (note: Note, tier: 'top' | 'heart' | 'base') => (
    <motion.button
      key={note.name}
      onMouseEnter={() => setHoveredNote(note)}
      onMouseLeave={() => setHoveredNote(null)}
      onClick={() => {
        setSynesthesiaNote(note);
        setTimeout(() => setSynesthesiaNote(null), 2500);
      }}
      className="px-6 py-3 border border-[#f0ebe0]/10 bg-[#f0ebe0]/5 backdrop-blur-sm rounded-none font-serif text-sm text-[#f0ebe0] hover:bg-[#f0ebe0]/10 hover:border-[#f0ebe0]/30 transition-all duration-300 relative group overflow-hidden"
    >
      <motion.div
         className="absolute inset-0 origin-center bg-[#f0ebe0]/10"
         initial={{ scale: 0 }}
         whileHover={{ scale: 1 }}
         transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{note.name}</span>
    </motion.button>
  );

  return (
    <section className="py-32 px-6 flex flex-col items-center relative overflow-hidden bg-[#0a0908]">
      <AnimatePresence>
        {synesthesiaNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.04, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <span className="text-[25vw] font-serif uppercase tracking-[0.1em] text-[#f0ebe0]">
              {synesthesiaNote.energy}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full space-y-24 relative z-10">
        <div className="text-center space-y-6">
           <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#8a6e44]">Pillar 01 — Authority</span>
           <h2 className="text-5xl font-light text-[#f0ebe0] italic leading-tight">The Note Pyramid</h2>
           <p className="font-serif italic text-xl text-[#f0ebe0]/40">"A taxonomy of desire, revealed in layers."</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div
            className="w-full max-w-[400px] flex flex-wrap justify-center gap-4 p-8 border border-[#f0ebe0]/5 transition-all duration-500"
            style={{ backgroundColor: activeTier === 'top' ? `${product.notes.top[0].color}11` : 'transparent' }}
            onMouseEnter={() => setActiveTier('top')}
            onMouseLeave={() => setActiveTier(null)}
          >
            <div className="w-full flex justify-between items-baseline mb-4 opacity-40 font-mono text-[0.5rem] uppercase tracking-widest">
               <span>Top Notes</span>
               <span>0 – 30 min</span>
            </div>
            {product.notes.top.map(n => renderNotePill(n, 'top'))}
          </div>

          <div
            className="w-full max-w-[600px] flex flex-wrap justify-center gap-4 p-10 border border-[#f0ebe0]/5 transition-all duration-500"
            style={{ backgroundColor: activeTier === 'heart' ? `${product.notes.heart[0].color}11` : 'transparent' }}
            onMouseEnter={() => setActiveTier('heart')}
            onMouseLeave={() => setActiveTier(null)}
          >
            <div className="w-full flex justify-between items-baseline mb-4 opacity-40 font-mono text-[0.5rem] uppercase tracking-widest">
               <span>Heart Notes</span>
               <span>30 min – 5 hours</span>
            </div>
            {product.notes.heart.map(n => renderNotePill(n, 'heart'))}
          </div>

          <div
            className="w-full max-w-[800px] flex flex-wrap justify-center gap-4 p-12 border border-[#f0ebe0]/5 transition-all duration-500"
            style={{ backgroundColor: activeTier === 'base' ? `${product.notes.base[0].color}11` : 'transparent' }}
            onMouseEnter={() => setActiveTier('base')}
            onMouseLeave={() => setActiveTier(null)}
          >
            <div className="w-full flex justify-between items-baseline mb-4 opacity-40 font-mono text-[0.5rem] uppercase tracking-widest">
               <span>Base Notes</span>
               <span>5 hours → forever</span>
            </div>
            {product.notes.base.map(n => renderNotePill(n, 'base'))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredNote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 right-12 w-80 p-8 border border-[#f0ebe0]/10 bg-[#161210]/90 backdrop-blur-xl z-[100] shadow-2xl"
          >
            <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#c9a96e] mb-4 block">{hoveredNote.energy} — {hoveredNote.duration_label}</span>
            <h4 className="text-2xl font-light text-[#f0ebe0] mb-4 uppercase tracking-tighter">{hoveredNote.name}</h4>
            <p className="font-serif italic text-lg text-[#f0ebe0] mb-6 leading-relaxed">"{hoveredNote.feeling}"</p>
            <div className="h-px w-12 bg-[#c9a96e]/30 mb-6" />
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#f0ebe0]/40 leading-relaxed">Occasion: {hoveredNote.occasion}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
