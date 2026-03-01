'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface ArtCraftToggleProps {
  product: FragranceDNA;
}

export const ArtCraftToggle: React.FC<ArtCraftToggleProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'art' | 'craft'>('art');

  const renderArt = () => (
    <motion.div
      key="art"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <div className="space-y-6">
        <h3 className="text-4xl font-light italic text-[#f0ebe0]">{product.story_arc.opening.headline}</h3>
        <p className="font-serif italic text-xl text-[#f0ebe0]/70 leading-relaxed max-w-2xl">
          {product.story_arc.opening.body}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8a6e44] italic">Key Impressions</span>
        <div className="flex flex-wrap gap-8">
           {product.notes.top.map(n => (
             <div key={n.name} className="flex flex-col gap-2">
               <span className="font-serif text-lg uppercase tracking-tight text-[#f0ebe0]">{n.name}</span>
               <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#c9a96e]/60">{n.feeling}</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );

  const renderCraft = () => (
    <motion.div
      key="craft"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <CraftFact label="Concentration" value={`${product.craft.concentration} — ${product.craft.concentration_label}`} />
           <CraftFact label="Iterations" value={`${product.craft.iterations} before this formula was approved.`} />
           <CraftFact label="Perfumer" value={product.craft.perfumer} />
        </div>
        <div className="space-y-8">
           <CraftFact label="Source: Iris" value={product.craft.sourcing.iris} />
           <CraftFact label="Source: Vetiver" value={product.craft.sourcing.vetiver} />
           <CraftFact label="Batch Size" value={product.craft.batch_label} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24 border-t border-[#f0ebe0]/5">
      <div className="flex items-center gap-12 mb-16">
        <button
          onClick={() => setActiveTab('art')}
          className={`font-mono text-[0.6rem] uppercase tracking-[0.4em] transition-all duration-500 relative pb-2 ${activeTab === 'art' ? 'text-[#c9a96e]' : 'text-[#f0ebe0]/30 hover:text-[#f0ebe0]'}`}
        >
          [ The Art ]
          {activeTab === 'art' && (
            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a96e]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('craft')}
          className={`font-mono text-[0.6rem] uppercase tracking-[0.4em] transition-all duration-500 relative pb-2 ${activeTab === 'craft' ? 'text-[#c9a96e]' : 'text-[#f0ebe0]/30 hover:text-[#f0ebe0]'}`}
        >
          [ The Craft ]
          {activeTab === 'craft' && (
            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a96e]" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'art' ? renderArt() : renderCraft()}
      </AnimatePresence>
    </div>
  );
};

const CraftFact = ({ label, value }: { label: string, value: string }) => (
  <div className="group cursor-default">
    <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-[#8a6e44] mb-2 block">{label}</span>
    <p className="font-serif text-lg text-[#f0ebe0] opacity-80 group-hover:opacity-100 transition-opacity">
      {value}
    </p>
  </div>
);
