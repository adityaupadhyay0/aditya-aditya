'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSillage } from './SillageContext';

export const IntelligencePanel: React.FC = () => {
  const { session } = useSillage();
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      `SESSION_ID: ${session.session_id}`,
      `REFERRAL: ${session.referral_source.toUpperCase()}`,
      `ARCHETYPE_DETECTED: ${session.inferred_archetype.toUpperCase()}`,
      `CONFIDENCE_SCORE: ${(session.confidence * 100).toFixed(2)}%`,
      `SIGNALS_TOTAL: ${session.signals_observed.length}`,
      `LTV_PROJECTION: £${(Math.random() * 500 + 400).toFixed(0)}`,
      `--- LIVE SIGNALS ---`,
      ...session.signals_observed.map(s => `> ${s.toUpperCase()}`)
    ];
    setTerminalLines(lines);
  }, [session]);

  return (
    <div className="w-full max-w-2xl p-10 bg-[#1c1713] text-[#b5893a] border border-[#b5893a]/20 shadow-2xl relative overflow-hidden font-mono text-[0.65rem] leading-relaxed">
       {/* Terminal Scanline */}
       <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b5893a]/20 to-transparent h-12 animate-scan" />
       </div>

       <div className="relative z-0 space-y-4">
          <div className="flex justify-between items-center border-b border-[#b5893a]/20 pb-4 mb-6">
             <span className="tracking-[0.4em]">SILLAGE_INTEL_v1.0</span>
             <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b5893a] animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#b5893a]/20" />
             </div>
          </div>

          <div className="space-y-1">
             {terminalLines.map((line, i) => (
               <motion.p
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="whitespace-pre-wrap"
               >
                  {line}
               </motion.p>
             ))}
             <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-3 bg-[#b5893a] align-middle ml-1"
             />
          </div>
       </div>

       <style jsx>{`
         @keyframes scan {
           from { transform: translateY(-100%); }
           to { transform: translateY(1000%); }
         }
         .animate-scan {
           animation: scan 10s linear infinite;
         }
       `}</style>
    </div>
  );
};
