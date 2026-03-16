'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstantInternalTooling() {
  const [prompt, setPrompt] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [isBuilt, setIsBuilt] = useState(false);

  const fullPrompt = "Build me a territory planner showing revenue by region, flagging accounts with declining engagement, with a filter for enterprise vs mid-market";

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
          setIsBuilding(true);
          setTimeout(() => {
            if (!active) return;
            setIsBuilding(false);
            setIsBuilt(true);
          }, 2000);
        }, 500);
      }
    }, 40);
    return () => { active = false; clearInterval(interval); };
  }, [fullPrompt]);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg mb-8">
         <div className="border border-[#B8973A] p-4 bg-[#F5F0E6]/30 relative">
            <p className="font-serif italic text-sm text-[#0F0F0D]">
              {prompt}
              {!isBuilding && !isBuilt && (
                 <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }} className="inline-block w-0.5 h-4 bg-[#B8973A] align-middle ml-1" />
              )}
            </p>
         </div>
      </div>

      <div className="w-full flex-1 relative min-h-[300px] border border-[#E8E4DC] rounded overflow-hidden p-6 bg-[#FAFAF7]">
         <AnimatePresence>
            {isBuilding && (
              <motion.div
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                 <div className="w-48 h-1 bg-[#E8E4DC] relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-[#B8973A]"
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
                 <p className="font-mono text-[8px] uppercase tracking-widest text-[#B8973A] mt-4">Assembling Operating Surface...</p>
              </motion.div>
            )}

            {isBuilt && (
              <motion.div
                key="built"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex flex-col"
              >
                 <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[8px] font-bold text-[#0F0F0D]">TERRITORY PLANNER</span>
                    <div className="flex gap-2">
                       <div className="w-12 h-4 bg-[#E8E4DC] rounded" />
                       <div className="w-12 h-4 bg-[#B8973A]/20 rounded" />
                    </div>
                 </div>
                 <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="col-span-2 bg-white border border-[#E8E4DC] p-4 flex flex-col">
                       <div className="h-4 bg-[#F5F0E6] w-1/3 mb-4" />
                       <div className="flex-1 border-t border-[#E8E4DC] relative flex items-center justify-center">
                          <svg className="w-full h-full opacity-10">
                             <circle cx="50%" cy="50%" r="40" stroke="#B8973A" fill="none" />
                             <path d="M 0 50 Q 50 0 100 50" stroke="#B8973A" fill="none" />
                          </svg>
                          <span className="font-mono text-[8px] text-[#9BA3AF] absolute">Map Visualizer</span>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="bg-white border border-[#E8E4DC] p-3">
                          <div className="h-2 bg-[#F5F0E6] w-2/3 mb-2" />
                          <div className="h-4 bg-[#B8973A]/10 w-full" />
                       </div>
                       <div className="bg-white border border-[#E8E4DC] p-3">
                          <div className="h-2 bg-[#F5F0E6] w-2/3 mb-2" />
                          <div className="h-4 bg-[#C23B22]/10 w-full" />
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="mt-8 text-center">
         <p className="font-mono text-[10px] text-[#B8973A] font-bold">QUEUE BYPASSED. TIME TO BUILD: 4.2 SECS.</p>
      </div>
    </div>
  );
}
