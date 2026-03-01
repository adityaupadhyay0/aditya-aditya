'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FragranceDNA } from './sillageData';
import { useSillageAudio } from './SillageAudio';

interface SensoryOverlaysProps {
  product: FragranceDNA;
  activeIngredient?: string;
}

export const SensoryOverlays: React.FC<SensoryOverlaysProps> = ({ product, activeIngredient }) => {
  const { setIngredientAmbiance } = useSillageAudio();

  // Example effect for "Musk"
  const isMuskActive = activeIngredient?.toLowerCase().includes('musk');
  const isPetrichorActive = activeIngredient?.toLowerCase().includes('petrichor');

  useEffect(() => {
    if (activeIngredient) {
      // Logic for frequency based on ingredient string hashing
      const freq = activeIngredient.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 200 + 40;
      setIngredientAmbiance(freq);
    }
  }, [activeIngredient, setIngredientAmbiance]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {isMuskActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/20 blur-[100px]"
          >
             <motion.div
                animate={{
                   scale: [1, 1.2, 0.9, 1.1, 1],
                   opacity: [0.3, 0.5, 0.2, 0.4, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/3 bg-white/40 rounded-full blur-[150px]"
             />
             <motion.div
                animate={{
                   scale: [1.1, 0.8, 1.3, 1, 1.1],
                   opacity: [0.4, 0.2, 0.5, 0.3, 0.4]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 right-0 w-full h-1/3 bg-white/40 rounded-full blur-[150px]"
             />
          </motion.div>
        )}

        {isPetrichorActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/10 pointer-events-none"
          >
             {/* Rain-like subtle falling streaks */}
             <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                   <motion.div
                      key={i}
                      initial={{ y: -100, x: Math.random() * 100 + 'vw', opacity: 0 }}
                      animate={{ y: '110vh', opacity: [0, 0.2, 0] }}
                      transition={{
                         duration: 0.5 + Math.random() * 0.5,
                         repeat: Infinity,
                         delay: Math.random() * 2,
                         ease: "linear"
                      }}
                      className="absolute w-px h-16 bg-white/20"
                   />
                ))}
             </div>
             {/* Bloom effect on edges */}
             <div className="absolute inset-0 border-[10vw] border-slate-900/10 blur-3xl mix-blend-multiply" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Watermark based on active ingredient */}
      <AnimatePresence>
         {activeIngredient && (
            <motion.div
               key={activeIngredient}
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 0.05, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.05, y: -20 }}
               transition={{ duration: 1 }}
               className="absolute inset-0 flex items-center justify-center"
            >
               <span className="font-serif italic text-[30vw] uppercase leading-none text-white tracking-tighter">
                  {activeIngredient}
               </span>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};
