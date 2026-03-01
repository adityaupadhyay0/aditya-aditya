'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SoundToggleProps {
  onToggle: () => void;
  active: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ onToggle, active }) => {
  return (
    <button onClick={onToggle} className="flex items-center gap-8 group">
       <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#8a6e44] group-hover:text-[#b5893a] transition-colors duration-700">Ambient</span>
          <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#1c1713]/30">{active ? 'Harmonics Active' : 'Silence'}</span>
       </div>
       <div className="w-16 h-16 border border-[#1c1713]/5 rounded-full flex items-center justify-center bg-white shadow-xl group-hover:border-[#b5893a]/30 transition-all duration-700 overflow-hidden relative">
          <AnimatePresence>
             {active && (
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 bg-[#b5893a]/5"
                />
             )}
          </AnimatePresence>
          <div className="flex items-end gap-[3px] relative z-10 h-6">
             {[1, 2, 3, 4, 5].map(i => (
                <motion.div
                   key={i}
                   animate={{
                      height: active ? [4, 24, 8, 20, 4] : 2,
                   }}
                   transition={{
                      duration: 1 + (i * 0.2),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                   }}
                   className={`w-[1px] ${active ? 'bg-[#b5893a]' : 'bg-[#1c1713]/20'}`}
                />
             ))}
          </div>
       </div>
    </button>
  );
};
