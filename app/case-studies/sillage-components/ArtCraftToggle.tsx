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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-24"
    >
      <div className="space-y-8">
        <h3 className="text-5xl md:text-7xl font-light italic text-[#1c1713] leading-tight">
          {product.story_arc.opening.headline}
        </h3>
        <p className="font-serif italic text-2xl md:text-3xl text-[#1c1713]/50 leading-relaxed max-w-3xl">
          {product.story_arc.opening.body}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {product.notes.top.map((n, i) => (
          <motion.div
            key={n.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="space-y-4"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#b5893a]">Chapter {i + 1}</span>
            <h4 className="font-serif text-3xl uppercase tracking-tighter text-[#1c1713]">{n.name}</h4>
            <div className="h-px w-12 bg-[#b5893a]/30" />
            <p className="font-serif italic text-lg text-[#1c1713]/40 leading-relaxed">{n.feeling}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderCraft = () => (
    <motion.div
      key="craft"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="space-y-16">
           <CraftFact label="Concentration" value={`${product.craft.concentration} — ${product.craft.concentration_label}`} />
           <CraftFact label="Iterations" value={`${product.craft.iterations} development stages.`} />
           <CraftFact label="Perfumer" value={product.craft.perfumer} />
        </div>
        <div className="space-y-16">
           <CraftFact label="Florentine Iris" value={product.craft.sourcing.iris} />
           <CraftFact label="Réunion Vetiver" value={product.craft.sourcing.vetiver} />
           <CraftFact label="Availability" value={product.craft.batch_label} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-8">
      <div className="flex items-center justify-center gap-16 mb-32">
        {['art', 'craft'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`group flex flex-col items-center gap-4 transition-all duration-700`}
          >
            <span className={`font-mono text-[0.7rem] uppercase tracking-[0.6em] ${activeTab === tab ? 'text-[#b5893a]' : 'text-[#1c1713]/30 group-hover:text-[#1c1713]'}`}>
              {tab === 'art' ? 'The Sensory' : 'The Rational'}
            </span>
            <motion.div
               className="h-px bg-[#b5893a]"
               initial={{ width: 0 }}
               animate={{ width: activeTab === tab ? 40 : 0 }}
               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'art' ? renderArt() : renderCraft()}
      </AnimatePresence>
    </div>
  );
};

const CraftFact = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-6 group">
    <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#8a6e44] block border-l-2 border-[#b5893a]/20 pl-4">{label}</span>
    <p className="font-serif text-3xl text-[#1c1713] font-light leading-snug group-hover:pl-2 transition-all duration-700">
      {value}
    </p>
  </div>
);
