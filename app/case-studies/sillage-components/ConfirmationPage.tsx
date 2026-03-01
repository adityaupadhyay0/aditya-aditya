'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSillage } from './SillageContext';
import { SILLAGE_PRODUCTS } from './sillageData';
import { IntelligencePanel } from './IntelligencePanel';

export const ConfirmationPage: React.FC = () => {
  const { session } = useSillage();
  const product = SILLAGE_PRODUCTS[session.cart[0] || 'no3-before-rain'];

  return (
    <div className="min-h-screen bg-[#0a0908] flex flex-col items-center justify-center p-12 text-center space-y-24">
       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#8a6e44] block mb-8">Order Confirmed</span>
          <h1 className="text-6xl md:text-8xl font-light italic text-[#f0ebe0] leading-tight">It is on its way to you.</h1>
          <p className="font-serif text-2xl text-[#f0ebe0]/60">{product.name} — {product.title}</p>
       </motion.div>
       <div className="max-w-xl space-y-6">
          <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#8a6e44] block">A Note While You Wait</span>
          <p className="font-serif italic text-xl text-[#f0ebe0] leading-relaxed">"{product.wear_guide.tip}"</p>
       </div>
       <IntelligencePanel />
       <button onClick={() => window.location.reload()} className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#c9a96e]/30 hover:text-[#c9a96e]"> [ Return to Store ] </button>
    </div>
  );
};
