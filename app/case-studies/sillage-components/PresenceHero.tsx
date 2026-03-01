'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSillage } from './SillageContext';
import { FragranceDNA } from './sillageData';

interface PresenceHeroProps {
  product: FragranceDNA;
}

export const PresenceHero: React.FC<PresenceHeroProps> = ({ product }) => {
  const { session } = useSillage();
  const { referral_source, is_returning } = session;
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const bottleY = useTransform(scrollY, [0, 500], [0, -100]);

  let variant: 'A' | 'B' | 'C' | 'D' | 'E' = 'D';
  if (referral_source === 'social') variant = 'A';
  else if (referral_source === 'search') variant = 'B';
  else if (is_returning) variant = 'C';
  else if (referral_source === 'referral') variant = 'E';

  const renderContent = () => {
    switch (variant) {
      case 'A':
        return (
          <div className="flex flex-col items-center text-center max-w-6xl px-8 scale-[0.8]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic text-3xl md:text-5xl text-[#1c1713]/40 mb-16"
            >
              Some things you feel before you understand them.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-9xl md:text-[16rem] font-light text-[#1c1713] tracking-tighter leading-none mb-24"
            >
              {product.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="flex flex-col items-center gap-10"
            >
              <span className="text-[0.7rem] font-mono uppercase tracking-[1em] text-[#b5893a]">Enter the Sillage</span>
              <div className="h-32 w-px bg-gradient-to-b from-[#b5893a] to-transparent" />
            </motion.div>
          </div>
        );
      case 'B':
        return (
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1600px] px-16 gap-32 scale-[0.85]">
            <div className="flex-1 space-y-16">
              <motion.div
                 initial={{ opacity: 0, x: -60 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-10"
              >
                <div className="w-24 h-px bg-[#b5893a]" />
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.8em] text-[#b5893a]">
                  {product.craft.concentration_label}
                </span>
              </motion.div>
              <div className="space-y-10">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-9xl md:text-[14rem] font-light text-[#1c1713] tracking-tighter leading-none"
                >
                  {product.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-serif italic text-5xl md:text-6xl text-[#1c1713]/30"
                >
                  {product.title}
                </motion.p>
              </div>
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1.2 }}
                 className="pt-16 flex items-baseline gap-16"
              >
                <span className="text-8xl font-light text-[#1c1713]">£165</span>
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#b5893a] italic">{product.craft.batch_label}</span>
              </motion.div>
            </div>
            <motion.div
              style={{ y: bottleY }}
              className="flex-1 relative aspect-[3/4] max-w-xl group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 border border-[#1c1713]/10 bg-white/20 backdrop-blur-3xl shadow-[0_80px_150px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                 <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] border border-[#b5893a]/5 rounded-full"
                 />
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-display italic text-[30rem] text-[#1c1713]/[0.03] rotate-12">{product.name}</span>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        );
      case 'D':
      default:
        return (
          <div className="flex flex-col items-center text-center px-12 relative scale-[0.75]">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '2em' }}
              animate={{ opacity: 1, letterSpacing: '1.2em' }}
              transition={{ duration: 2.5 }}
              className="font-mono text-[0.8rem] uppercase text-[#b5893a] mb-20"
            >
              {product.name} — {product.craft.batch_label}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              className="text-9xl md:text-[20rem] font-light text-[#1c1713] tracking-tighter leading-none mb-20"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-serif italic text-4xl md:text-5xl text-[#1c1713]/20 max-w-4xl mx-auto leading-relaxed"
            >
              {product.tagline}
            </motion.p>
          </div>
        );
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#fdfaf5]">
       {/* Atmospheric Fluid SVG Background */}
       <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
             <filter id="fluid">
                <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" seed="1" />
                <feDisplacementMap in="SourceGraphic" scale="100" />
             </filter>
             <circle cx="500" cy="500" r="400" fill="#c29f6b" filter="url(#fluid)">
                <animate attributeName="cx" values="400;600;400" dur="20s" repeatCount="indefinite" />
                <animate attributeName="cy" values="400;600;400" dur="25s" repeatCount="indefinite" />
             </circle>
          </svg>
       </div>

       <motion.div
         style={{ opacity: heroOpacity, scale: heroScale }}
         className="relative z-10 w-full flex items-center justify-center"
       >
          {renderContent()}
       </motion.div>

       <div className="absolute top-16 left-16 z-50">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-3xl tracking-[0.4em] text-[#0d0d0d]"
          >
            SILLAGE
          </motion.span>
       </div>
    </section>
  );
};
