'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AccordGraphsProps {
  accords: { label: string, value: number, color?: string }[];
}

export const AccordGraphs: React.FC<AccordGraphsProps> = ({ accords }) => {
  return (
    <div className="w-full flex flex-col gap-12 max-w-4xl mx-auto px-12">
      <div className="flex flex-col gap-2 mb-8">
        <span className="font-mono text-[0.6rem] uppercase tracking-[1em] text-[#c9a96e]">Les Accords Principal</span>
        <h3 className="font-serif italic text-4xl text-white tracking-tighter leading-none">The Harmonic Structure</h3>
      </div>

      {accords.map((accord, i) => (
        <div key={i} className="flex flex-col gap-3 group">
          <div className="flex justify-between items-end">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
              {accord.label}
            </span>
            <span className="font-mono text-[0.6rem] text-white/30 tracking-widest">
              {accord.value}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/5 relative overflow-hidden">
            <motion.div
               initial={{ width: 0 }}
               whileInView={{ width: `${accord.value}%` }}
               transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
               className="absolute top-0 left-0 h-full bg-[#c9a96e]"
               style={{ backgroundColor: accord.color || '#c9a96e' }}
            />

            {/* Glossy highlight */}
            <motion.div
               animate={{ x: ['-100%', '200%'] }}
               transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
               className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            />
          </div>
        </div>
      ))}

      <div className="mt-16 border-t border-white/10 pt-8 flex justify-between items-start opacity-40">
        <p className="font-mono text-[0.55rem] uppercase tracking-widest max-w-xs leading-relaxed">
          The intensity of each accord represents the dominant olfactory weight within the scent profile.
        </p>
        <span className="font-mono text-[0.55rem] uppercase tracking-widest">Analysis v.2.4</span>
      </div>
    </div>
  );
};
