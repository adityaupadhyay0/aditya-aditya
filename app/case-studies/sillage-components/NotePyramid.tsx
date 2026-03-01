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
    <div className="w-full space-y-8">
      <div className="flex justify-between items-baseline border-b border-[#1c1713]/10 pb-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#b5893a]">{label}</span>
        <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#1c1713]/30">{duration}</span>
      </div>
      <div className="flex flex-wrap gap-4">
        {notes.map(note => (
          <motion.button
            key={note.name}
            onMouseEnter={() => setHoveredNote(note)}
            onMouseLeave={() => setHoveredNote(null)}
            onClick={() => {
              setSynesthesiaNote(note);
              setTimeout(() => setSynesthesiaNote(null), 2500);
            }}
            whileHover={{ scale: 1.02 }}
            className="px-8 py-4 border border-[#1c1713]/5 bg-white/50 backdrop-blur-sm rounded-none font-serif text-lg text-[#1c1713] hover:border-[#b5893a]/30 hover:bg-white transition-all duration-500 relative group overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b5893a]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
            <span className="relative z-10">{note.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-64 px-8 flex flex-col items-center relative overflow-hidden bg-[#f2ece0]">
      {/* Synesthesia Watermark */}
      <AnimatePresence>
        {synesthesiaNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 0.05, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <span className="text-[20vw] font-display uppercase tracking-[0.2em] text-[#1c1713]">
              {synesthesiaNote.energy}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl w-full space-y-32 relative z-10">
        <div className="text-center space-y-8">
           <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">Pillar 01 — Authority</span>
           <h2 className="text-6xl md:text-8xl font-light text-[#1c1713] italic leading-tight">The Note Pyramid</h2>
           <p className="font-serif italic text-2xl text-[#1c1713]/40 max-w-2xl mx-auto">"Sensory architecture mapped through time."</p>
        </div>

        <div className="grid grid-cols-1 gap-24">
          {renderTier("Top Notes", product.notes.top, "0 – 30 min")}
          {renderTier("Heart Notes", product.notes.heart, "30 min – 5 hours")}
          {renderTier("Base Notes", product.notes.base, "5 hours → forever")}
        </div>
      </div>

      {/* Floating Insight Card */}
      <AnimatePresence>
        {hoveredNote && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-12 right-12 w-96 p-10 bg-white/90 backdrop-blur-2xl border border-[#b5893a]/10 z-[100] shadow-[0_30px_100px_rgba(0,0,0,0.05)]"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#b5893a]">{hoveredNote.duration_label}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNote.color }} />
              </div>
              <h4 className="text-3xl font-light text-[#1c1713] uppercase tracking-tighter">{hoveredNote.name}</h4>
              <p className="font-serif italic text-xl text-[#1c1713] leading-relaxed">"{hoveredNote.feeling}"</p>
              <div className="h-px w-full bg-[#1c1713]/5" />
              <div className="space-y-2">
                <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#1c1713]/40">Occasion</span>
                <p className="font-serif text-sm text-[#1c1713]/80">{hoveredNote.occasion}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
