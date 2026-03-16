'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DecisionSurface() {
  return (
    <div className="w-full h-full bg-white p-12 flex flex-col perspective-[1000px]">
      <div className="flex-1 relative border-l border-b border-[#E8E4DC]">
        {/* Kavya Timeline overlaying Old State */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute left-[4.34%] right-0 top-1/2 h-0.5 bg-gray-300" />
           <div className="absolute left-[82.6%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400" />
        </div>

        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#B8973A]" />

        {/* Signal & Decision at the same point */}
        <motion.div
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           className="absolute left-[4.34%] top-1/2 -translate-y-1/2"
        >
           <div className="w-3 h-3 rounded-full -ml-1.5 bg-[#B8973A] shadow-[0_0_12px_#B8973A]" />
           <div className="absolute top-6 left-0 -ml-2 whitespace-nowrap">
              <p className="font-mono text-[8px] text-[#B8973A] font-bold">DAY 01</p>
              <div className="mt-2 space-y-2 p-4 border border-[#B8973A] bg-white shadow-lg w-64">
                 <p className="font-mono text-[8px] uppercase tracking-widest text-[#B8973A] font-bold">KAVYA SIGNAL SURFACED</p>
                 <p className="font-serif italic text-xs text-[#0F0F0D]">"Enterprise LTV 34% above mid-market. Historical pattern suggests Q4 window for segment expansion. Confidence: 87%."</p>
                 <div className="pt-2 flex justify-between items-center">
                    <span className="font-mono text-[7px] text-[#9BA3AF]">Actionable Insight</span>
                    <button className="px-2 py-1 bg-[#B8973A] text-white font-mono text-[7px] uppercase tracking-widest">Execute Strategy</button>
                 </div>
              </div>
           </div>
           <div className="absolute -top-8 left-0 -ml-1 text-[#B8973A]">◆</div>
        </motion.div>
      </div>

      <div className="mt-12 text-center">
         <p className="font-display italic text-2xl text-[#0F0F0D] leading-tight">
           "The right answer, delivered on time, is strategy."
         </p>
         <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#B8973A] mt-4">23 DAYS COLLAPSED TO 1</p>
      </div>
    </div>
  );
}
