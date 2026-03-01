'use client';

import React from 'react';
import { useSillage } from './SillageContext';

export const IntelligencePanel: React.FC = () => {
  const { session } = useSillage();
  const data = [
    { label: 'ARRIVAL', value: session.referral_source },
    { label: 'ARCHETYPE', value: session.inferred_archetype },
    { label: 'CONFIDENCE', value: `${(session.confidence * 100).toFixed(0)}%` },
    { label: 'INTENT', value: session.inferred_archetype === 'the_collector' ? 'Self — a serious purchase' : 'Discovery' },
  ];

  return (
    <div className="w-full max-w-lg p-12 bg-[#0a0908] border border-[#c9a96e]/20 shadow-2xl relative overflow-hidden font-mono">
       <div className="relative z-0 space-y-12">
          <div className="flex justify-between items-center border-b border-[#c9a96e]/10 pb-6">
             <span className="text-[0.6rem] uppercase tracking-[0.5em] text-[#c9a96e]">SILLAGE · SESSION INTELLIGENCE</span>
          </div>
          <div className="space-y-8 text-left">
             {data.map((item) => (
               <div key={item.label} className="flex justify-between items-baseline gap-12">
                  <span className="text-[0.55rem] uppercase tracking-widest text-[#8a6e44]">{item.label}</span>
                  <span className="text-[0.7rem] uppercase tracking-widest text-[#f0ebe0] truncate max-w-[200px]">{item.value}</span>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};
