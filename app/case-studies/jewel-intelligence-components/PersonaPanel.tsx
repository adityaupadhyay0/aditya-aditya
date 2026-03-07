'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PersonaPanel() {
  const familyNodes = [
    { id: 'riya', label: 'Riya', role: 'Self', x: 0, y: 0, purchase: 'Tennis Bracelet', date: '2 weeks ago' },
    { id: 'mother', label: 'Anjali', role: 'Mother', x: -80, y: -60, purchase: 'Drop Earrings', date: '3 months ago' },
    { id: 'fiance', label: 'Arjun', role: 'Fiancé', x: 80, y: -60, purchase: 'Platinum Band', date: '1 month ago' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-[#0e0c13] text-[#f2ece0] overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(201,168,76,0.4)] to-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-2xl font-serif italic">
          R
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-xl font-serif italic mb-1">Riya Malhotra</h4>
            <span className="px-2 py-1 bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] text-[0.55rem] text-[rgba(201,168,76,0.9)] uppercase tracking-[0.2em] rounded-full">
              Wedding Buyer
            </span>
          </div>
          <div className="flex gap-4 font-mono text-[0.6rem] uppercase tracking-wider opacity-60">
            <span>Lifetime: $42,500</span>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h5 className="text-[0.6rem] uppercase tracking-[0.3em] text-[rgba(201,168,76,0.5)] font-mono mb-6">Family Graph</h5>
        <div className="relative h-48 flex items-center justify-center">
          <div className="relative z-10 w-full flex justify-center items-center gap-12">
            {familyNodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="group relative flex flex-col items-center"
              >
                <div className={`w-10 h-10 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[0.6rem] font-serif ${i === 0 ? 'bg-[rgba(201,168,76,0.2)]' : 'bg-[#16141a]'}`}>
                  {node.label[0]}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[0.6rem] font-medium">{node.label}</p>
                  <p className="text-[0.5rem] opacity-40 uppercase tracking-tighter">{node.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h5 className="text-[0.6rem] uppercase tracking-[0.3em] text-[rgba(201,168,76,0.5)] font-mono mb-4">Style DNA</h5>
        <div className="flex flex-wrap gap-2">
          {['Minimal', 'Solitaire', 'Rose Gold', 'Size 12'].map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)] rounded text-[0.6rem] uppercase tracking-wider text-[rgba(201,168,76,0.8)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
