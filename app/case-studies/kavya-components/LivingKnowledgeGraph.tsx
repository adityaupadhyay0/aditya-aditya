'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LivingKnowledgeGraph() {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAssembled(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col relative overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center">
         {/* Background Graph Nodes */}
         <svg className="absolute inset-0 w-full h-full">
            <motion.circle cx="50%" cy="50%" r="100" fill="none" stroke="#E8E4DC" strokeWidth="1" strokeDasharray="5 5" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
         </svg>

         <div className="relative z-10 w-full max-w-sm">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-8 border-2 border-[#B8973A] bg-white shadow-xl relative"
            >
               <div className="mb-6 flex justify-between items-center border-b border-[#E8E4DC] pb-4">
                  <span className="font-mono text-[8px] tracking-[0.2em] font-bold text-[#B8973A]">KNOWLEDGE GRAPH RECONSTRUCTION</span>
                  <span className="font-mono text-[8px] text-[#9BA3AF]">DEAL #447</span>
               </div>

               <div className="space-y-6">
                  <h3 className="font-display italic text-xl text-[#0F0F0D]">Why did we lose the Harrington account?</h3>

                  <div className="space-y-4">
                     <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: assembled ? 1 : 0, x: assembled ? 0 : -10 }} transition={{ delay: 0.2 }} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#B8973A] mt-1.5" />
                        <div>
                           <p className="font-sans text-[10px] font-bold text-[#0F0F0D]">PRIMARY FACTOR</p>
                           <p className="font-serif italic text-xs text-[#0F0F0D] opacity-70">Pricing exception denied at final stage.</p>
                        </div>
                     </motion.div>

                     <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: assembled ? 1 : 0, x: assembled ? 0 : -10 }} transition={{ delay: 0.4 }} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#B8973A] mt-1.5" />
                        <div>
                           <p className="font-sans text-[10px] font-bold text-[#0F0F0D]">DECISION SOURCE</p>
                           <p className="font-serif italic text-xs text-[#0F0F0D] opacity-70">Sarah K. (VP Sales) — March 14, 2024</p>
                        </div>
                     </motion.div>

                     <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: assembled ? 1 : 0, x: assembled ? 0 : -10 }} transition={{ delay: 0.6 }} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#B8973A] mt-1.5" />
                        <div>
                           <p className="font-sans text-[10px] font-bold text-[#0F0F0D]">OUTCOME PATTERN</p>
                           <p className="font-serif italic text-xs text-[#0F0F0D] opacity-70">2 of 3 exception-approved deals renewed at full price.</p>
                        </div>
                     </motion.div>
                  </div>

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: assembled ? 1 : 0 }}
                     transition={{ delay: 1 }}
                     className="pt-6 border-t border-[#E8E4DC]"
                  >
                     <p className="font-mono text-[8px] uppercase tracking-widest text-[#B8973A] font-bold mb-2">SOURCES CONNECTED</p>
                     <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                           <div key={i} className="w-6 h-6 border border-[#B8973A]/30 rounded-full flex items-center justify-center font-mono text-[6px] text-[#B8973A]">{i+1}</div>
                        ))}
                     </div>
                  </motion.div>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
