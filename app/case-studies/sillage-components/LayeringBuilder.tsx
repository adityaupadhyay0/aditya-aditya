'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYERING_STACKS, SILLAGE_PRODUCTS, LayeringStack } from './sillageData';
import { useSillage } from './SillageContext';

export const LayeringBuilder: React.FC = () => {
  const { session, addToCart } = useSillage();
  const [selectedStack, setSelectedStack] = useState<LayeringStack | null>(null);

  return (
    <section className="py-32 px-6 bg-[#0a0908] border-t border-[#f0ebe0]/5">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="text-center space-y-6">
           <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#8a6e44]">Pillar 04 — Stacking</span>
           <h2 className="text-5xl font-light text-[#f0ebe0] italic leading-tight">Layering Guide</h2>
           <p className="font-serif italic text-xl text-[#f0ebe0]/40 max-w-2xl mx-auto">"Fragrance is not an accessory. It is a practice. Create your own frequency."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-12 border border-[#f0ebe0]/5 bg-[#f0ebe0]/[0.02] space-y-8">
            <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#c9a96e]">Your Foundation</span>
            <div className="space-y-4">
              <h3 className="text-4xl font-light text-[#f0ebe0] uppercase tracking-tighter">No. 3 — Before Rain</h3>
              <p className="font-serif italic text-lg text-[#f0ebe0]/60">"The storm, settled."</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#c9a96e] px-4">Add a Layer</span>
            {LAYERING_STACKS.map(stack => (
               <motion.div
                 key={stack.id}
                 whileHover={{ x: 10 }}
                 onClick={() => setSelectedStack(stack)}
                 className={`p-10 border transition-all duration-500 cursor-pointer ${selectedStack?.id === stack.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#f0ebe0]/5 hover:border-[#f0ebe0]/20 bg-[#f0ebe0]/[0.01]'}`}
               >
                 <div className="flex justify-between items-start mb-6">
                    <h4 className="text-2xl font-light text-[#f0ebe0] uppercase tracking-tight">{stack.mood_name}</h4>
                    <span className="font-mono text-[0.6rem] uppercase text-[#c9a96e]">+{stack.total_duration_hours}h duration</span>
                 </div>
                 <p className="font-serif italic text-base text-[#f0ebe0]/50 mb-8">{stack.mood_tagline}</p>
                 <button
                   onClick={(e) => { e.stopPropagation(); stack.products.forEach(p => addToCart(p.product_id)); }}
                   className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a96e] border-b border-[#c9a96e]/30 pb-1 hover:text-[#f0ebe0] hover:border-[#f0ebe0] transition-all"
                 >
                   [ Add to Stack ]
                 </button>
               </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedStack && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-12 border border-[#c9a96e]/20 bg-[#c9a96e]/0.02 space-y-12 overflow-hidden"
            >
              <div className="max-w-3xl space-y-6">
                 <h4 className="font-mono text-[0.6rem] uppercase tracking-widest text-[#c9a96e]">Combined Effect</h4>
                 <p className="font-serif italic text-2xl text-[#f0ebe0] leading-relaxed">{selectedStack.combined_effect}</p>
              </div>

              <div className="space-y-8">
                 <h4 className="font-mono text-[0.6rem] uppercase tracking-widest text-[#c9a96e]">How to Wear This Stack</h4>
                 <div className="space-y-4">
                    {selectedStack.products.map((p, i) => (
                      <div key={i} className="flex gap-6 items-baseline font-serif text-lg text-[#f0ebe0]/80">
                        <span className="font-mono text-[0.6rem] text-[#c9a96e]/60">{i + 1}.</span>
                        <p>Apply <span className="text-[#f0ebe0] uppercase tracking-tighter">{SILLAGE_PRODUCTS[p.product_id].name}</span>. {p.sprays} sprays to {p.application_point}.</p>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
