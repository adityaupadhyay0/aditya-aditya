'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYERING_STACKS, SILLAGE_PRODUCTS, LayeringStack } from './sillageData';
import { useSillage } from './SillageContext';
import { useSillageAudio } from './SillageAudio';

export const LayeringBuilder: React.FC = () => {
  const { session, addToCart } = useSillage();
  const { playCtaSound } = useSillageAudio();
  const [selectedStack, setSelectedStack] = useState<LayeringStack | null>(null);

  const stylistAdvice = [
    "You are in the right hands. This synthesis is about authority.",
    "I recommend this for a Sunday where the only agenda is stillness.",
    "A sophisticated choice. It Deepens the frequency without noise.",
    "This stack is an heirloom of memory. Wear it with intention."
  ];

  return (
    <section className="py-96 px-16 bg-[#fdfaf5] border-t border-[#0d0d0d]/5 relative overflow-hidden">
      {/* Decorative Atelier Background */}
      <div className="absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none">
         <span className="text-[40rem] font-display italic leading-none">A</span>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-48 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-24">
           <div className="space-y-12">
              <span className="font-mono text-[0.8rem] uppercase tracking-[1em] text-[#c29f6b]">L'Atelier des Stylistes</span>
              <h2 className="text-8xl md:text-[12rem] font-light text-[#0d0d0d] tracking-tighter italic leading-none">Consultation.</h2>
           </div>
           <div className="max-w-md text-right space-y-8">
              <p className="font-serif italic text-3xl text-[#0d0d0d]/40 leading-relaxed">
                 "Fragrance is the most intimate form of communication. Allow us to guide your frequency."
              </p>
              <div className="flex justify-end gap-4 font-mono text-[0.6rem] uppercase tracking-widest text-[#c29f6b]">
                 <span>Certified Stylist</span>
                 <span>Paris · 75001</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
          {/* Stylist Log */}
          <div className="lg:col-span-4 space-y-12 sticky top-48">
            <div className="p-12 border border-[#0d0d0d]/5 bg-white/60 backdrop-blur-xl shadow-2xl space-y-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-[#c29f6b]/20" />
               <div className="space-y-4">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#c29f6b]">Consultation Log</span>
                  <div className="h-px w-12 bg-[#c29f6b]/30" />
               </div>
               <div className="space-y-8">
                  <p className="font-serif italic text-2xl text-[#0d0d0d]/60 leading-relaxed">
                     {selectedStack ? stylistAdvice[Math.floor(Math.random() * stylistAdvice.length)] : "Awaiting your selection. We look for the resonance between the notes and your skin."}
                  </p>
               </div>
               <div className="pt-12 border-t border-[#0d0d0d]/5 flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full bg-[#f2ece0] flex items-center justify-center font-mono text-[0.5rem] text-[#c29f6b]">ST</div>
                  <div className="space-y-1">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#0d0d0d]">Atelier Advisor</p>
                     <p className="font-mono text-[0.5rem] uppercase text-[#0d0d0d]/30">Hand-coded Guidance</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Stacking Options */}
          <div className="lg:col-span-8 space-y-16">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.8em] text-[#c29f6b] px-4 block">Recommended Syntheses</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {LAYERING_STACKS.map(stack => (
                  <motion.div
                    key={stack.id}
                    whileHover={{ y: -20, scale: 1.02 }}
                    onClick={() => { setSelectedStack(stack); playCtaSound(); }}
                    className={`p-16 border transition-all duration-1000 cursor-pointer relative overflow-hidden group ${selectedStack?.id === stack.id ? 'border-[#c29f6b] bg-white shadow-[0_80px_150px_rgba(0,0,0,0.08)]' : 'border-[#0d0d0d]/5 hover:border-[#c29f6b]/40 bg-white/40'}`}
                  >
                    <div className="relative z-10 space-y-16">
                       <div className="flex justify-between items-start">
                          <h4 className="text-4xl font-light text-[#0d0d0d] uppercase tracking-tighter">{stack.mood_name}</h4>
                          <div className="flex gap-1">
                             {[1, 2, 3].map(i => (
                                <div key={i} className={`w-1 h-4 ${i <= 2 ? 'bg-[#c29f6b]' : 'bg-[#0d0d0d]/5'}`} />
                             ))}
                          </div>
                       </div>
                       <p className="font-serif italic text-2xl text-[#0d0d0d]/30 group-hover:text-[#0d0d0d]/60 transition-colors duration-1000">{stack.mood_tagline}</p>
                       <button
                         onClick={(e) => { e.stopPropagation(); stack.products.forEach(p => addToCart(p.product_id)); playCtaSound(); }}
                         className="w-full py-6 border border-[#c29f6b]/30 font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#c29f6b] hover:bg-[#c29f6b] hover:text-white transition-all duration-700"
                       >
                         [ Begin Synthesis ]
                       </button>
                    </div>
                  </motion.div>
               ))}
            </div>

            <AnimatePresence>
              {selectedStack && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-24 bg-white border border-[#c29f6b]/10 shadow-2xl space-y-32 relative overflow-hidden"
                >
                  <div className="max-w-5xl space-y-12 relative z-10">
                     <span className="font-mono text-[0.8rem] uppercase tracking-[1em] text-[#c29f6b]">The Combined Effect</span>
                     <p className="font-serif italic text-5xl md:text-7xl text-[#0d0d0d] leading-none tracking-tighter">{selectedStack.combined_effect}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-32 relative z-10">
                     <div className="space-y-16">
                        <span className="font-mono text-[0.8rem] uppercase tracking-[0.8em] text-[#c29f6b]">The Protocol</span>
                        <div className="space-y-12">
                           {selectedStack.products.map((p, i) => (
                             <div key={i} className="flex gap-12 items-baseline font-serif text-3xl text-[#0d0d0d]/40 group hover:text-[#0d0d0d] transition-colors duration-1000">
                               <span className="font-mono text-[0.8rem] text-[#c29f6b] border border-[#c29f6b]/20 px-3 py-1">{i + 1}</span>
                               <p>Apply <span className="text-[#0d0d0d] uppercase font-light tracking-tighter">{SILLAGE_PRODUCTS[p.product_id].name}</span>. {p.sprays} sprays to {p.application_point}.</p>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="p-16 border border-[#c29f6b]/5 flex flex-col justify-center gap-12 bg-[#fdfaf5]/50">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-px bg-[#c29f6b]" />
                           <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#c29f6b]">Atelier Tip</span>
                        </div>
                        <p className="font-serif italic text-3xl text-[#0d0d0d]/60 leading-tight">
                           "The heat of your skin is the final ingredient. Do not rub. Let the synthesis breathe."
                        </p>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
