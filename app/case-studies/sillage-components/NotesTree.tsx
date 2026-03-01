'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface NotesTreeProps {
  product: FragranceDNA;
}

export const NotesTree: React.FC<NotesTreeProps> = ({ product }) => {
  const allNotes = [
    ...product.notes.top.map(n => ({ ...n, type: 'top' })),
    ...product.notes.heart.map(n => ({ ...n, type: 'heart' })),
    ...product.notes.base.map(n => ({ ...n, type: 'base' })),
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-32 px-12">
      <div className="flex flex-col items-center mb-24 text-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[1em] text-[#c9a96e] mb-4">L'Architecture du Parfum</span>
        <h3 className="font-serif italic text-5xl text-white tracking-tighter">The Notes Tree</h3>
      </div>

      <div className="relative flex flex-col items-center">
        {/* The Tree Structure (SVG lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '600px' }}>
           <defs>
              <linearGradient id="tree-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
              </linearGradient>
           </defs>
           {/* Trunk */}
           <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#tree-grad)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        <div className="relative z-10 w-full flex flex-col gap-32">
          {/* Top Notes Section */}
          <div className="flex flex-col items-center gap-8">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-white/30">Volatile / First Exposure</span>
            <div className="flex flex-wrap justify-center gap-6">
              {product.notes.top.map((note, i) => (
                <NoteNode key={i} note={note} delay={i * 0.1} />
              ))}
            </div>
          </div>

          {/* Heart Notes Section */}
          <div className="flex flex-col items-center gap-8">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-white/30">The Core / Persistence</span>
            <div className="flex flex-wrap justify-center gap-8">
              {product.notes.heart.map((note, i) => (
                <NoteNode key={i} note={note} delay={0.5 + i * 0.1} size="lg" />
              ))}
            </div>
          </div>

          {/* Base Notes Section */}
          <div className="flex flex-col items-center gap-8">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-white/30">Foundation / The Ghost</span>
            <div className="flex flex-wrap justify-center gap-6">
              {product.notes.base.map((note, i) => (
                <NoteNode key={i} note={note} delay={1 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoteNode = ({ note, delay, size = 'md' }: { note: any, delay: number, size?: 'md' | 'lg' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
    whileHover={{ scale: 1.05 }}
    className={`relative group flex flex-col items-center p-6 border border-white/5 backdrop-blur-sm bg-white/[0.02] ${size === 'lg' ? 'w-48 h-48' : 'w-40 h-40'} justify-center text-center`}
  >
    <div
      className="absolute top-0 left-0 w-full h-1"
      style={{ backgroundColor: note.color }}
    />
    <span className="font-serif italic text-lg text-white mb-2 leading-tight">{note.name}</span>
    <span className="font-mono text-[0.5rem] uppercase tracking-widest text-white/40 group-hover:text-[#c9a96e] transition-colors">
      {note.energy}
    </span>

    {/* Hover Info */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a0908]/90 flex flex-col items-center justify-center p-4">
       <p className="font-serif italic text-xs text-white leading-relaxed">{note.feeling}</p>
       <div className="mt-4 w-8 h-px bg-[#c9a96e]/40" />
    </div>
  </motion.div>
);
