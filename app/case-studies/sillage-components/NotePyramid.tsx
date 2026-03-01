'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FragranceDNA, Note } from './sillageData';
import { useSillageAudio } from './SillageAudio';

interface NotePyramidProps {
  product: FragranceDNA;
}

export const NotePyramid: React.FC<NotePyramidProps> = ({ product }) => {
  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
  const [synesthesiaNote, setSynesthesiaNote] = useState<Note | null>(null);
  const { playNotePing } = useSillageAudio();

  const renderTier = (label: string, notes: Note[], duration: string) => (
    <div className="w-full space-y-16">
      <div className="flex justify-between items-center border-b border-[#1c1713]/10 pb-12">
        <div className="space-y-4">
           <span className="font-mono text-[0.8rem] uppercase tracking-[1em] text-[#c29f6b]">{label}</span>
           <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#0d0d0d]/30">Structural Diffusion Stage</p>
        </div>
        <div className="px-8 py-4 border border-[#c29f6b]/20 bg-white/40 backdrop-blur-xl shadow-lg">
           <span className="font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#0d0d0d]">{duration}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {notes.map(note => (
          <motion.button
            key={note.name}
            onMouseEnter={() => setHoveredNote(note)}
            onMouseLeave={() => setHoveredNote(null)}
            onClick={() => {
              setSynesthesiaNote(note);
              playNotePing(note.name === 'Petrichor Accord' ? 440 : 220);
              setTimeout(() => setSynesthesiaNote(null), 2500);
            }}
            whileHover={{ y: -16 }}
            className="p-16 border border-[#0d0d0d]/5 bg-white/40 backdrop-blur-2xl rounded-none text-left hover:border-[#c29f6b]/40 hover:bg-white transition-all duration-1000 relative group overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.03)]"
          >
            {/* Apothecary Cabinet Style Detail */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c29f6b]/10 group-hover:bg-[#c29f6b] transition-all duration-1000" />

            <div className="relative z-10 space-y-8">
               <div className="space-y-2">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#c29f6b]/60">Provenance: Controlled</span>
                  <h4 className="font-serif text-5xl md:text-6xl font-extralight uppercase tracking-tighter text-[#0d0d0d] leading-none">{note.name}</h4>
               </div>
               <div className="w-12 h-px bg-[#c29f6b]/30 group-hover:w-full transition-all duration-1000" />
               <p className="font-serif italic text-2xl text-[#0d0d0d]/40 group-hover:text-[#0d0d0d]/80 transition-colors duration-1000 leading-tight">"{note.feeling}"</p>
            </div>

            {/* Interactive Scent Cloud Simulation */}
            <motion.div
               className="absolute -bottom-20 -right-20 w-64 h-64 blur-[80px] opacity-0 group-hover:opacity-20 transition-all duration-1000 pointer-events-none"
               style={{ background: note.color }}
               animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 90, 0],
                  x: [0, 20, 0],
                  y: [0, -20, 0]
               }}
               transition={{ duration: 12, repeat: Infinity }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-96 px-16 flex flex-col items-center relative overflow-hidden bg-[#fdfaf5]">
       {/* Background Depth Elements */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-white/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white/60 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-[#c29f6b]/5 rounded-full rotate-45" />
       </div>

      <AnimatePresence>
        {synesthesiaNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(40px)' }}
            animate={{ opacity: 0.1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(80px)' }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <span className="text-[35vw] font-display uppercase tracking-[0.4em] text-[#0d0d0d] italic font-black">
              {synesthesiaNote.energy}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1800px] w-full space-y-64 relative z-10">
        <div className="text-center space-y-16">
           <div className="space-y-6">
              <span className="font-mono text-[0.8rem] uppercase tracking-[1.2em] text-[#c29f6b]">Pillar 01 — Authority</span>
              <div className="w-px h-24 bg-[#c29f6b]/30 mx-auto" />
           </div>
           <h2 className="text-9xl md:text-[18rem] font-light text-[#0d0d0d] tracking-tighter leading-none italic">Architecture.</h2>
           <p className="font-serif italic text-4xl text-[#0d0d0d]/30 max-w-6xl mx-auto leading-tight">"We do not build scents. We construct environments of desire through precise molecular layering."</p>
        </div>

        <div className="space-y-64">
          {renderTier("L'Ouverture", product.notes.top, "0 – 30 min")}
          {renderTier("Le Coeur", product.notes.heart, "30 min – 5 hours")}
          {renderTier("Le Sillage", product.notes.base, "5 hours → forever")}
        </div>
      </div>

      {/* Authority Watermark */}
      <div className="absolute bottom-24 left-16 font-mono text-[0.6rem] uppercase tracking-[1em] text-[#0d0d0d]/10 rotate-90 origin-left">
         Sillage_Authority_Framework_v1.0
      </div>
    </section>
  );
};
