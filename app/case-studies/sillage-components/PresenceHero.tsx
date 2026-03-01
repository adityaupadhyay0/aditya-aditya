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
          <div className="flex flex-col items-center text-center max-w-4xl px-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="font-serif italic text-2xl md:text-3xl text-[#1c1713]/40 mb-12"
            >
              Some things you feel before you understand them.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-[12rem] font-light text-[#1c1713] tracking-tight leading-none mb-16"
            >
              {product.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col items-center gap-6"
            >
              <span className="text-[0.7rem] font-mono uppercase tracking-[0.6em] text-[#b5893a]">Discover {product.name}</span>
              <motion.div
                animate={{ height: [0, 80, 0], y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1px] bg-gradient-to-b from-[#b5893a] to-transparent"
              />
            </motion.div>
          </div>
        );
      case 'B':
        return (
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] px-12 gap-24">
            <div className="flex-1 space-y-12">
              <motion.div
                 initial={{ opacity: 0, x: -40 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-6"
              >
                <div className="w-12 h-px bg-[#b5893a]" />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">
                  {product.craft.concentration_label}
                </span>
              </motion.div>
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-8xl md:text-[10rem] font-light text-[#1c1713] tracking-tighter leading-none"
                >
                  {product.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-serif italic text-4xl text-[#1c1713]/40"
                >
                  {product.title}
                </motion.p>
              </div>
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="pt-12 flex items-baseline gap-12"
              >
                <span className="text-6xl font-light text-[#1c1713]">£165</span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-[#b5893a] italic">{product.craft.batch_label}</span>
              </motion.div>
            </div>
            <div className="flex-1 relative aspect-[3/4] max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 border border-[#1c1713]/5 bg-white/40 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.03)]"
              >
                 <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <span className="font-display italic text-[20rem] text-[#1c1713]/[0.02] rotate-12">{product.name}</span>
                 </div>
              </motion.div>
            </div>
          </div>
        );
      case 'D':
      default:
        return (
          <div className="flex flex-col items-center text-center px-8">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '0.6em' }}
              transition={{ duration: 1.5 }}
              className="font-mono text-[0.7rem] uppercase text-[#b5893a] mb-12"
            >
              {product.name} — {product.craft.batch_label}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="text-8xl md:text-[14rem] font-light text-[#1c1713] tracking-tighter leading-none mb-12"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-serif italic text-3xl text-[#1c1713]/30 max-w-2xl mx-auto leading-relaxed"
            >
              {product.tagline}
            </motion.p>
          </div>
        );
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f2ece0]">
       <div className="absolute inset-0 pointer-events-none">
          <motion.div
             animate={{
               opacity: [0.3, 0.5, 0.3],
               scale: [1, 1.05, 1]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[100vh] rounded-full"
             style={{ background: `radial-gradient(circle at center, ${product.notes.top[0].color}11 0%, transparent 70%)` }}
          />
       </div>

       <div className="relative z-10 w-full flex items-center justify-center">
          {renderContent()}
       </div>

       <div className="absolute top-12 left-12 mix-blend-difference">
          <span className="font-serif italic text-2xl tracking-[0.3em] text-[#1c1713]">SILLAGE</span>
       </div>
    </section>
  );
};
