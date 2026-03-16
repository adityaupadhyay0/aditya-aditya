'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NaturalLanguageData() {
  const [prompt, setPrompt] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const fullPrompt = "Which campaign drove the most revenue last quarter?";

  useEffect(() => {
    let active = true;
    let i = 0;
    const interval = setInterval(() => {
      if (!active) return;
      setPrompt(fullPrompt.slice(0, i));
      i++;
      if (i > fullPrompt.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (!active) return;
          setShowAnswer(true);
        }, 500);
      }
    }, 40);
    return () => { active = false; clearInterval(interval); };
  }, [fullPrompt]);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
         <div className="mb-12 border-b-2 border-[#B8973A] pb-4">
            <p className="font-serif italic text-lg text-[#0F0F0D]">
              {prompt}
              {!showAnswer && (
                 <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }} className="inline-block w-0.5 h-5 bg-[#B8973A] align-middle ml-1" />
              )}
            </p>
         </div>

         {showAnswer && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="p-8 border border-[#E8E4DC] bg-[#FAFAF7] relative shadow-lg"
           >
              <div className="flex justify-between items-center mb-6">
                 <span className="font-mono text-[8px] uppercase tracking-widest text-[#B8973A] font-bold">KAVYA DATA SYNTHESIS</span>
                 <span className="font-mono text-[8px] text-[#9BA3AF]">T+3.1s</span>
              </div>

              <div className="space-y-6">
                 <p className="font-serif text-sm text-[#0F0F0D] leading-relaxed">
                   The <span className="text-[#B8973A] font-bold">Enterprise Outreach Campaign (Oct–Dec)</span> drove <span className="font-bold">$4.2M</span> in attributed pipeline, 34% above the next closest campaign.
                 </p>
                 <p className="font-serif italic text-sm text-[#0F0F0D] opacity-70">
                   Primary drivers: EMEA mid-market segment response rate and accelerated deal cycles in weeks 6–8.
                 </p>

                 <div className="pt-6 border-t border-[#E8E4DC]">
                    <p className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF] mb-3">SOURCES ATTRIBUTED</p>
                    <div className="flex flex-wrap gap-4">
                       <span className="font-mono text-[8px] text-[#0F0F0D]">CRM PIPELINE</span>
                       <span className="font-mono text-[8px] text-[#0F0F0D]">MARKETING ATTRIBUTION</span>
                       <span className="font-mono text-[8px] text-[#0F0F0D]">FINANCE REVENUE</span>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         <div className="mt-16 text-center">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-4">Ratio of efficiency</p>
            <div className="flex justify-center items-center gap-12">
               <div>
                  <p className="font-mono text-xl md:text-3xl font-bold opacity-30 text-[#0F0F0D] line-through">4.5 DAYS</p>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF]">Ticket Journey</p>
               </div>
               <div className="text-2xl text-[#E8E4DC]">→</div>
               <div>
                  <p className="font-mono text-xl md:text-3xl font-bold text-[#B8973A]">3.1 SECS</p>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF]">Kavya Result</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
