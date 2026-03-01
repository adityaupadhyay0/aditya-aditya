'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSillage } from './SillageContext';
import { FragranceDNA } from './sillageData';

interface PresenceHeroProps {
  product: FragranceDNA;
}

export const PresenceHero: React.FC<PresenceHeroProps> = ({ product }) => {
  const { session } = useSillage();
  const { referral_source, is_returning } = session;

  let variant: 'A' | 'B' | 'C' | 'D' | 'E' = 'D';

  if (referral_source === 'social') variant = 'A';
  else if (referral_source === 'search') variant = 'B';
  else if (is_returning) variant = 'C';
  else if (referral_source === 'referral') variant = 'E';

  const renderContent = () => {
    switch (variant) {
      case 'A':
        return (
          <div className="flex flex-col items-center text-center max-w-2xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif italic text-lg md:text-xl text-[#f0ebe0]/60 mb-8"
            >
              Some things you feel before you understand them.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-6xl md:text-9xl font-light text-[#f0ebe0] tracking-tight mb-12"
            >
              {product.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a6e44]">Scroll to Discover {product.name}</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-12 bg-gradient-to-b from-[#c9a96e] to-transparent"
              />
            </motion.div>
          </div>
        );
      case 'B':
        return (
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-8 gap-12">
            <div className="flex-1 space-y-6">
              <motion.span
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#c9a96e]"
              >
                {product.craft.concentration_label}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-8xl font-light text-[#f0ebe0]"
              >
                {product.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif italic text-2xl text-[#f0ebe0]/70"
              >
                {product.title}
              </motion.p>
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="pt-8 flex items-baseline gap-6"
              >
                <span className="text-4xl font-light text-[#f0ebe0]">£165</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8a6e44]">{product.craft.batch_label}</span>
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="w-64 h-96 bg-[#f0ebe0]/5 border border-[#f0ebe0]/10 rounded-sm relative"
              >
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="font-serif italic text-8xl">{product.name}</span>
                 </div>
              </motion.div>
            </div>
          </div>
        );
      case 'C':
        return (
          <div className="flex flex-col items-center text-center max-w-4xl px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#c9a96e] mb-8"
            >
              Welcome back. {product.name} is still here for you.
            </motion.p>
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-7xl md:text-9xl font-light text-[#f0ebe0] mb-12"
            >
              Your Bottle.
            </motion.h1>
            <div className="w-px h-24 bg-[#c9a96e]/30 mb-12" />
          </div>
        );
      case 'E':
        return (
          <div className="flex flex-col items-center text-center max-w-3xl px-6">
             <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#c9a96e] mb-6"
            >
              Someone wanted you to find this.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-light text-[#f0ebe0] mb-8"
            >
              {product.title}
            </motion.h1>
             <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="font-serif italic text-xl text-[#f0ebe0] max-w-md"
            >
              {product.tagline}
            </motion.p>
          </div>
        );
      case 'D':
      default:
        return (
          <div className="flex flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#8a6e44] mb-4"
            >
              {product.name} — {product.craft.batch_label}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-8xl md:text-[10rem] font-light text-[#f0ebe0] tracking-tight leading-none mb-6"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-serif italic text-2xl text-[#f0ebe0]/40"
            >
              {product.tagline}
            </motion.p>
          </div>
        );
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0908]">
       <motion.div
         animate={{
           scale: [1, 1.1, 1],
           opacity: [0.05, 0.08, 0.05]
         }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         className="absolute inset-0 rounded-full blur-[100px]"
         style={{ background: `radial-gradient(circle at 50% 50%, ${product.notes.top[0].color}44 0%, transparent 70%)` }}
       />

       <div className="relative z-10 w-full flex items-center justify-center">
          {renderContent()}
       </div>

       <div className="absolute top-12 left-12">
          <span className="font-serif italic text-xl tracking-[0.2em] text-[#f0ebe0]">SILLAGE</span>
       </div>
    </section>
  );
};
