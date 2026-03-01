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
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-48"
    >
      <div className="space-y-12">
        <motion.h3
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-8xl md:text-[12rem] font-light italic text-[#1c1713] leading-none tracking-tighter"
        >
          {product.story_arc.opening.headline}
        </motion.h3>
        <p className="font-serif italic text-4xl md:text-6xl text-[#1c1713]/40 leading-tight max-w-6xl">
          {product.story_arc.opening.body}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 border-t border-[#1c1713]/5 pt-32">
        {product.notes.top.map((n, i) => (
          <motion.div
            key={n.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 1.5 }}
            className="space-y-8 group"
          >
            <span className="font-mono text-[0.8rem] uppercase tracking-[0.8em] text-[#b5893a] block">Genesis {i + 1}</span>
            <h4 className="font-serif text-5xl uppercase tracking-tighter text-[#1c1713]">{n.name}</h4>
            <div className="w-12 h-px bg-[#b5893a]/30 group-hover:w-32 transition-all duration-1000" />
            <p className="font-serif italic text-2xl text-[#1c1713]/50 leading-relaxed">{n.feeling}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderCraft = () => (
    <motion.div
      key="craft"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="space-y-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-48 items-start">
        <div className="space-y-32">
           <CraftFact label="Concentration" value={`${product.craft.concentration}`} subtitle={product.craft.concentration_label} />
           <CraftFact label="Iterations" value={`${product.craft.iterations}`} subtitle="Proprietary Formulations" />
           <CraftFact label="Perfumer" value="Maison Leroux" subtitle="Grasse, France" />
        </div>
        <div className="space-y-32">
           <CraftFact label="Florentine Iris" value="Harvest T+3y" subtitle={product.craft.sourcing.iris} />
           <CraftFact label="Réunion Vetiver" value="Volcanic Soil" subtitle={product.craft.sourcing.vetiver} />
           <CraftFact label="Batch" value="Ltd Edition" subtitle={product.craft.batch_label} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto px-16">
      <div className="flex items-center justify-between mb-48 border-b border-[#1c1713]/10 pb-12">
        <div className="flex gap-24">
           {['art', 'craft'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`group flex flex-col gap-4 transition-all duration-700`}
             >
               <span className={`font-mono text-[0.8rem] uppercase tracking-[1em] ${activeTab === tab ? 'text-[#b5893a]' : 'text-[#1c1713]/30 group-hover:text-[#1c1713]'}`}>
                 {tab === 'art' ? 'The Art' : 'The Craft'}
               </span>
               <motion.div
                  className="h-px bg-[#b5893a]"
                  initial={{ width: 0 }}
                  animate={{ width: activeTab === tab ? '100%' : 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               />
             </button>
           ))}
        </div>
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#1c1713]/20 hidden md:block">Credential Architecture</span>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'art' ? renderArt() : renderCraft()}
      </AnimatePresence>
    </div>
  );
};

const CraftFact = ({ label, value, subtitle }: { label: string, value: string, subtitle: string }) => (
  <div className="space-y-8 group relative">
    <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#8a6e44] block">{label}</span>
    <div className="space-y-4">
       <p className="font-serif text-7xl md:text-9xl text-[#1c1713] font-extralight tracking-tighter group-hover:pl-4 transition-all duration-1000">
         {value}
       </p>
       <p className="font-mono text-[0.8rem] uppercase tracking-widest text-[#1c1713]/40 group-hover:text-[#b5893a] transition-colors duration-700 pl-1">
         {subtitle}
       </p>
    </div>
  </div>
);
