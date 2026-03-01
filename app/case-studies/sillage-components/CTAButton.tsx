'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSillage } from './SillageContext';

export const CTAButton: React.FC = () => {
  const { session, addToCart } = useSillage();
  const { experience_config } = session;

  return (
    <motion.button
      onClick={() => addToCart('no3-before-rain')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative px-16 py-8 bg-[#1c1713] text-[#f2ece0] font-mono text-xs uppercase tracking-[0.4em] transition-all duration-700 group overflow-hidden"
    >
      <span className="relative z-10 transition-colors duration-700 group-hover:text-[#1c1713]">{experience_config.cta_copy}</span>
      <motion.div
         initial={{ y: "100%" }}
         whileHover={{ y: "0%" }}
         className="absolute inset-0 bg-[#b5893a] z-0"
         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 border border-[#b5893a]/20 pointer-events-none" />
    </motion.button>
  );
};
