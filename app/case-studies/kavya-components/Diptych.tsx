'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DiptychProps {
  chapterNumber: string;
  headline: string;
  copy: ReactNode;
  demo: ReactNode;
  featureCallouts?: string[];
  id?: string;
}

export default function Diptych({ chapterNumber, headline, copy, demo, featureCallouts, id }: DiptychProps) {
  return (
    <section id={id} className="min-h-screen flex flex-col lg:flex-row border-t border-[#E8E4DC] relative">
      {/* Left Panel: Copy */}
      <div className="w-full lg:w-1/2 bg-[#F5F0E6] p-12 md:p-24 relative overflow-hidden flex flex-col justify-center">
        {/* Large Ghost Number */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[240px] font-black text-[#B8973A] opacity-[0.04] pointer-events-none select-none z-0">
          {chapterNumber}
        </div>

        <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
          {featureCallouts && featureCallouts.length > 0 && (
            <div className="mb-12 border border-[#9BA3AF]/30 p-6 bg-white/30 backdrop-blur-sm">
               <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-[#B8973A] mb-4">◆ KAVYA FEATURE ADDRESSED</span>
               <ul className="space-y-2">
                  {featureCallouts.map((feature, i) => (
                    <li key={i} className="font-mono text-[0.7rem] uppercase tracking-wide opacity-80">{feature}</li>
                  ))}
               </ul>
            </div>
          )}

          <div className="mb-8 flex items-center gap-4">
             <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[#B8973A]">Chapter {chapterNumber}</span>
             <div className="h-[1px] w-12 bg-[#B8973A]/30" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display italic leading-tight mb-12 text-[#0F0F0D]">
            {headline}
          </h2>

          <div className="space-y-8 text-xl font-serif leading-relaxed text-[#0F0F0D] opacity-90">
            {copy}
          </div>
        </div>
      </div>

      {/* Right Panel: Demo */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 relative">
        <div className="w-full h-full max-w-2xl aspect-square lg:aspect-auto lg:h-[80vh] bg-white border border-[#E8E4DC] shadow-[0_4px_20px_rgba(184,151,58,0.04)] overflow-hidden">
          {demo}
        </div>
      </div>
    </section>
  );
}
