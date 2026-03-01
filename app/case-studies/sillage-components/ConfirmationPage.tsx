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
    <div className="min-h-screen bg-[#f2ece0] flex flex-col items-center justify-center p-12 text-center space-y-32">
       <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
       >
          <div className="flex flex-col items-center gap-8 mb-16">
             <div className="w-16 h-px bg-[#b5893a]" />
             <span className="font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#b5893a] block">Protocol Confirmed</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-light italic text-[#1c1713] leading-tight">It is on its way to you.</h1>
          <div className="space-y-4">
            <p className="font-serif text-3xl text-[#1c1713]/60">{product.name} — {product.title}</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#b5893a]/60">Hand-packed in Grasse · Arriving T+3 days</p>
          </div>
       </motion.div>

       <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center border-t border-[#1c1713]/5 pt-32">
          <div className="space-y-8 text-left">
             <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#b5893a] block">Preparation</span>
             <p className="font-serif italic text-2xl text-[#1c1713] leading-relaxed">"{product.wear_guide.tip}"</p>
          </div>
          <IntelligencePanel />
       </div>

       <button
         onClick={() => window.location.reload()}
         className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#1c1713]/20 hover:text-[#b5893a] transition-all duration-700 pb-12"
       >
          [ Return to Frequency ]
       </button>
    </div>
  );
};
