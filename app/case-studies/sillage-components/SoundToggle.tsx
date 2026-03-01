'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const SoundToggle: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
       const saved = localStorage.getItem('sillage_sound');
       if (saved === 'true') setActive(true);
    }
  }, []);

  const toggle = () => {
    setActive(prev => {
      const next = !prev;
      if (typeof localStorage !== 'undefined') {
         localStorage.setItem('sillage_sound', next.toString());
      }
      return next;
    });
  };

  return (
    <button onClick={toggle} className="flex items-center gap-4 group">
       <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8a6e44] group-hover:text-[#c9a96e] transition-colors">{active ? 'Ambient On' : 'Silent'}</span>
       <div className="w-10 h-10 border border-[#f0ebe0]/10 rounded-full flex items-center justify-center bg-[#0a0908]">
          <motion.div animate={{ height: active ? [2, 12, 4, 16, 2] : 1 }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[1px] bg-[#c9a96e]" />
          <motion.div animate={{ height: active ? [4, 8, 12, 6, 4] : 1 }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-[1px] bg-[#c9a96e] ml-1.5" />
       </div>
    </button>
  );
};
