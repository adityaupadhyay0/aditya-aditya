'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSillage } from './SillageContext';

export const IntelligencePanel: React.FC = () => {
  const { session } = useSillage();
  const data = [
    { label: 'ARRIVAL', value: session.referral_source },
    { label: 'ARCHETYPE', value: session.inferred_archetype },
    { label: 'CONFIDENCE', value: `${(session.confidence * 100).toFixed(0)}%` },
    { label: 'EST. LIFETIME VALUE', value: `£${(Math.random() * 500 + 400).toFixed(0)}` },
  ];

  return (
    <div className="w-full max-w-2xl p-16 bg-white border border-[#1c1713]/5 shadow-[0_50px_100px_rgba(0,0,0,0.03)] relative overflow-hidden font-mono text-left">
       <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="text-9xl font-display italic">S</span>
       </div>

       <div className="relative z-10 space-y-16">
          <div className="flex justify-between items-center border-b border-[#1c1713]/5 pb-8">
             <div className="space-y-2">
                <span className="text-[0.6rem] uppercase tracking-[0.6em] text-[#b5893a]">Sillage Intelligence</span>
                <p className="text-[0.5rem] text-[#1c1713]/40 tracking-widest uppercase">Proprietary HexaDON Session Log</p>
             </div>
             <div className="w-12 h-px bg-[#b5893a]/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24">
             {data.map((item) => (
               <div key={item.label} className="space-y-4">
                  <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#8a6e44]">{item.label}</span>
                  <div className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#b5893a]" />
                     <span className="text-lg uppercase tracking-widest text-[#1c1713] font-light">{item.value}</span>
                  </div>
               </div>
             ))}
          </div>

          <div className="space-y-8 border-t border-[#1c1713]/5 pt-12">
             <span className="text-[0.5rem] uppercase tracking-[0.4em] text-[#1c1713]/30">Live Signal Detection</span>
             <div className="flex flex-wrap gap-4">
                {session.signals_observed.map((signal, i) => (
                  <div key={i} className="px-4 py-2 bg-[#f2ece0] text-[0.5rem] uppercase tracking-widest text-[#1c1713]/60">
                    {signal}
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};
