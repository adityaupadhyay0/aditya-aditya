'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface UsageGuideProps {
  product: FragranceDNA;
}

export const UsageGuide: React.FC<UsageGuideProps> = ({ product }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-32 px-12 grid grid-cols-1 md:grid-cols-2 gap-32">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[0.6rem] uppercase tracking-[1em] text-[#c9a96e]">Le Rituel</span>
          <h3 className="font-serif italic text-4xl text-white tracking-tighter">Usage Guide</h3>
        </div>

        <p className="font-serif italic text-xl text-white/60 leading-relaxed italic">
          "{product.wear_guide.tip}"
        </p>

        <div className="flex flex-col gap-6">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.5em] text-[#c9a96e]">Application Points</span>
          <div className="flex flex-wrap gap-4">
            {product.wear_guide.application_points.map((point, i) => (
              <span key={i} className="px-4 py-2 border border-white/10 font-mono text-[0.6rem] uppercase tracking-widest text-white/40">
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden">
        {/* Silhouette decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.02] pointer-events-none">
           <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
              <path d="M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z" />
           </svg>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.8em] text-white/30 text-center">Recommended Dosage</span>

          <div className="grid grid-cols-3 gap-8">
            <DosageItem label="Daytime" count={product.wear_guide.spray_count.daytime} />
            <DosageItem label="Evening" count={product.wear_guide.spray_count.evening} />
            <DosageItem label="Occasion" count={product.wear_guide.spray_count.special_occasion} />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
           <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/30 leading-loose">
              Apply to bare skin before dressing. The warmth of your body is the final ingredient that activates the sillage.
           </p>
        </div>
      </div>
    </div>
  );
};

const DosageItem = ({ label, count }: { label: string, count: number }) => (
  <div className="flex flex-col items-center gap-6">
    <div className="flex flex-col gap-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`w-8 h-px ${i < count ? 'bg-[#c9a96e]' : 'bg-white/10'}`} />
      ))}
    </div>
    <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/60">{label}</span>
    <span className="font-mono text-[0.7rem] text-white">{count} Sprays</span>
  </div>
);
