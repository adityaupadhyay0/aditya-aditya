'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYERING_STACKS, SILLAGE_PRODUCTS, LayeringStack } from './sillageData';
import { useSillage } from './SillageContext';

export const LayeringBuilder: React.FC = () => {
  const { session, addToCart } = useSillage();
  const [selectedStack, setSelectedStack] = useState<LayeringStack | null>(null);

  return (
    <section className="py-64 px-8 bg-[#f2ece0] border-t border-[#1c1713]/5">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="text-center space-y-12">
           <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">Pillar 04 — Stacking</span>
           <h2 className="text-6xl md:text-8xl font-light text-[#1c1713] italic leading-tight">The Layering Tool</h2>
           <p className="font-serif italic text-2xl text-[#1c1713]/40 max-w-3xl mx-auto leading-relaxed">"Fragrance is not an accessory. It is a practice. Create your own frequency."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Foundation Column */}
          <div className="p-20 border border-[#1c1713]/5 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.02)] space-y-12 sticky top-32">
            <div className="space-y-4">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#b5893a]">Your Foundation</span>
              <h3 className="text-5xl font-light text-[#1c1713] uppercase tracking-tighter">No. 3 — Before Rain</h3>
            </div>
            <p className="font-serif italic text-2xl text-[#1c1713]/50 leading-relaxed">"The moment before the storm — that specific quality of charged silence."</p>
            <div className="flex items-center gap-8 pt-12 border-t border-[#1c1713]/5">
               <div className="flex gap-3">
                 {[1, 2, 3].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i <= 2 ? 'bg-[#b5893a]' : 'bg-[#1c1713]/10'}`} />
                 ))}
               </div>
               <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#1c1713]/40">2 sprays · Pulse Points</span>
            </div>
          </div>

          {/* Layers Column */}
          <div className="space-y-12">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#b5893a] px-4 block mb-12">Synthesize</span>
            {LAYERING_STACKS.map(stack => (
               <motion.div
                 key={stack.id}
                 whileHover={{ y: -10 }}
                 onClick={() => setSelectedStack(stack)}
                 className={`p-16 border transition-all duration-700 cursor-pointer relative overflow-hidden group ${selectedStack?.id === stack.id ? 'border-[#b5893a] bg-white shadow-2xl' : 'border-[#1c1713]/5 hover:border-[#b5893a]/30 bg-white/40'}`}
               >
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                       <h4 className="text-3xl font-light text-[#1c1713] uppercase tracking-tight">{stack.mood_name}</h4>
                       <span className="font-mono text-[0.6rem] uppercase text-[#b5893a] border border-[#b5893a]/20 px-3 py-1">+{stack.total_duration_hours}h Depth</span>
                    </div>
                    <p className="font-serif italic text-xl text-[#1c1713]/50 mb-12 group-hover:text-[#1c1713] transition-colors duration-700">{stack.mood_tagline}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); stack.products.forEach(p => addToCart(p.product_id)); }}
                      className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#b5893a] relative pb-2 group/btn"
                    >
                      [ Begin Your Stack ]
                      <div className="absolute bottom-0 left-0 w-full h-px bg-[#b5893a] origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700" />
                    </button>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedStack && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-20 bg-white border border-[#b5893a]/10 shadow-2xl space-y-24 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                 <span className="text-[30rem] font-display italic">M</span>
              </div>

              <div className="max-w-4xl space-y-12 relative z-10">
                 <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">The Experience</h4>
                 <p className="font-serif italic text-4xl md:text-5xl text-[#1c1713] leading-[1.2]">{selectedStack.combined_effect}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
                 <div className="space-y-12">
                    <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">The Protocol</h4>
                    <div className="space-y-8">
                       {selectedStack.products.map((p, i) => (
                         <div key={i} className="flex gap-8 items-baseline font-serif text-2xl text-[#1c1713]/60 group hover:text-[#1c1713] transition-colors duration-700">
                           <span className="font-mono text-[0.7rem] text-[#b5893a] w-12">{String(i + 1).padStart(2, '0')}</span>
                           <p>Apply <span className="text-[#1c1713] uppercase font-light tracking-tighter">{SILLAGE_PRODUCTS[p.product_id].name}</span>. {p.sprays} sprays to {p.application_point}.</p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="p-12 bg-[#f2ece0]/50 border border-[#1c1713]/5 flex flex-col justify-center gap-8">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#b5893a]">Pro Tip</span>
                    <p className="font-serif italic text-xl text-[#1c1713]/60 leading-relaxed">
                       "Do not rub the skin. Let the heat of your body be the final ingredient in the synthesis."
                    </p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
