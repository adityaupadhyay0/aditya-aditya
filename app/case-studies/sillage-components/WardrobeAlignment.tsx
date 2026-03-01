'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface WardrobeAlignmentProps {
  product: FragranceDNA;
}

export const WardrobeAlignment: React.FC<WardrobeAlignmentProps> = ({ product }) => {
  // Logic-driven comparison with common fragrance archetypes
  const alignments = [
    { label: 'Fresh/Citrus', value: 30, overlap: 'Low' },
    { label: 'Floral/Powdery', value: 85, overlap: 'High' },
    { label: 'Woody/Earthy', value: 70, overlap: 'Moderate' },
    { label: 'Oriental/Spicy', value: 20, overlap: 'Niche' },
    { label: 'Gourmand/Sweet', value: 10, overlap: 'Rare' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-32 px-12 border-t border-white/5 bg-[#0d0d0c] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-full opacity-[0.05] pointer-events-none z-0">
         <svg viewBox="0 0 1000 1000" className="w-full h-full text-white">
            <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,10" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,12" />
            <circle cx="500" cy="500" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,15" />
         </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[1em] text-[#c9a96e]">L'Alignement du Garde-robe</span>
            <h3 className="font-serif italic text-6xl text-white tracking-tighter leading-none">The Wardrobe Analysis</h3>
          </div>

          <p className="font-serif italic text-2xl text-white/60 leading-relaxed max-w-md">
            How {product.name} integrates with the signatures you already wear.
          </p>

          <div className="flex flex-col gap-8 mt-12">
             <div className="flex items-center gap-6">
                <div className="w-2 h-2 bg-[#c9a96e] rounded-full" />
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40">Complementary to your existing profiles</p>
             </div>
             <p className="font-mono text-[0.55rem] uppercase tracking-widest leading-loose text-white/30 max-w-xs">
                {product.name} provides the emotional anchor that your current collection may lack. It acts as the bridge between fresh mornings and deep evenings.
             </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 bg-white/[0.01] p-12 border border-white/5">
           <span className="font-mono text-[0.5rem] uppercase tracking-[0.8em] text-white/30">Overlap Intensity Map</span>

           <div className="flex flex-col gap-8">
              {alignments.map((alignment, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                   <div className="flex justify-between items-end">
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{alignment.label}</span>
                      <span className="font-mono text-[0.5rem] text-white/30 tracking-widest uppercase">{alignment.overlap}</span>
                   </div>
                   <div className="h-px w-full bg-white/5 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${alignment.value}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className="absolute top-0 left-0 h-full bg-[#c9a96e]/40"
                      />
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center text-center gap-4">
              <span className="font-mono text-[0.5rem] uppercase tracking-[1em] text-[#c9a96e]">Verdict</span>
              <p className="font-serif italic text-xl text-white/80">"A necessary complexity for your collection."</p>
           </div>
        </div>
      </div>
    </div>
  );
};
