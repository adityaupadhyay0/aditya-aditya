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
      className="relative px-12 py-6 bg-[#c9a96e] text-[#0a0908] font-mono text-sm uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden group"
    >
      <span className="relative z-10">{experience_config.cta_copy}</span>
      <motion.div
         initial={{ x: "-100%" }}
         whileHover={{ x: "0%" }}
         className="absolute inset-0 bg-[#f0ebe0] z-0"
         transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.button>
  );
};
