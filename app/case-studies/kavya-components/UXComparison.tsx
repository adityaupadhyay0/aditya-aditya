'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function UXComparison() {
  const [leftClicks, setLeftClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);
  const [rightTaskDone, setRightTaskDone] = useState(false);

  return (
    <div className="w-full h-full bg-white flex flex-col perspective-[1200px]">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Typical Tool */}
        <motion.div
          className="w-full md:w-1/2 border-r border-[#E8E4DC] p-6 bg-[#F5F5F5] flex flex-col"
          animate={{ rotateY: 8 }}
          style={{ transformOrigin: 'right' }}
        >
           <span className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF] mb-4">TYPICAL ENTERPRISE TOOL</span>

           <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-1">
                 {[...Array(11)].map((_, i) => (
                   <div key={i} className="px-2 py-1 bg-[#E8E4DC] text-[7px] font-mono text-[#9BA3AF]">MENU_{i+1}</div>
                 ))}
              </div>

              <div className="p-4 bg-white border border-[#E8E4DC] space-y-3">
                 <div className="h-4 bg-[#F5F5F5] w-full" />
                 <div className="h-4 bg-[#F5F5F5] w-2/3" />

                 <div className="grid grid-cols-2 gap-2 mt-4">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="h-6 border border-[#E8E4DC] rounded p-1">
                        <div className="h-full bg-[#F5F5F5] w-1/2" />
                     </div>
                   ))}
                 </div>

                 <button
                  onClick={() => setLeftClicks(prev => prev + 1)}
                  className="w-full py-2 bg-[#9BA3AF] text-white font-mono text-[9px] uppercase tracking-widest"
                 >
                   Submit Request
                 </button>
              </div>
           </div>

           <div className="mt-4 text-center">
              <p className="font-mono text-[10px] text-[#9BA3AF]">CLICKS: {leftClicks}</p>
           </div>
        </motion.div>

        {/* Kavya */}
        <motion.div
          className="w-full md:w-1/2 p-6 bg-white flex flex-col relative"
          animate={{ rotateY: -8 }}
          style={{ transformOrigin: 'left' }}
        >
           <div className="absolute inset-0 bg-gradient-to-br from-[#B8973A]/5 to-transparent pointer-events-none" />
           <span className="font-mono text-[8px] uppercase tracking-widest text-[#B8973A] mb-4">KAVYA</span>

           <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-full space-y-6 relative z-10">
                 <div className="border-b border-[#B8973A] pb-2">
                   <p className="font-serif italic text-sm text-[#0F0F0D]">Request pricing exception for Deal #447</p>
                 </div>

                 {rightTaskDone ? (
                   <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-[#B8973A]/10 border border-[#B8973A]/20"
                   >
                     <p className="font-mono text-[8px] uppercase tracking-widest text-[#B8973A] font-bold mb-2">REQUEST SUBMITTED</p>
                     <p className="font-serif italic text-xs text-[#0F0F0D]">Kavya has routed the request with full context to Sarah K.</p>
                   </motion.div>
                 ) : (
                   <div className="space-y-4">
                      <div className="p-3 bg-[#F5F0E6] border border-[#E8E4DC] flex justify-between items-center">
                         <span className="font-mono text-[8px] text-[#9BA3AF]">DEAL #447 CONTEXT</span>
                         <span className="font-mono text-[8px] text-[#B8973A]">READY</span>
                      </div>
                      <button
                        onClick={() => { setRightClicks(prev => prev + 1); setRightTaskDone(true); }}
                        className="w-full py-3 border border-[#B8973A] text-[#B8973A] font-mono text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-[#B8973A] hover:text-white transition-all"
                      >
                        Submit with context →
                      </button>
                   </div>
                 )}
              </div>
           </div>

           <div className="mt-4 text-center">
              <p className="font-mono text-[10px] text-[#B8973A] font-bold">CLICKS: {rightClicks}</p>
           </div>
        </motion.div>
      </div>

      <div className="p-8 border-t border-[#E8E4DC] text-center bg-white">
         <p className="font-display italic text-lg text-[#0F0F0D]">
           "The difference is not aesthetic. It is 9 clicks multiplied by every action, every employee, every day."
         </p>
      </div>
    </div>
  );
}
