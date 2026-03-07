'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthorityPanel() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center bg-[#0e0c13] text-[#f2ece0]">
      <div className="w-full max-w-sm">
        <div
          className="relative w-full aspect-[3/4] cursor-pointer perspective-[1000px]"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="absolute inset-0 bg-[#16141a] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 flex flex-col"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(201,168,76,0.6)] font-mono mb-1">SKU Identity</h4>
                  <p className="text-lg font-serif italic text-[rgba(201,168,76,0.9)]">The Eternal Solitaire</p>
                </div>
                <div className="px-2 py-1 border border-green-500/30 bg-green-500/10 rounded text-[0.5rem] text-green-400 uppercase tracking-widest">Verified</div>
              </div>

              <div className="aspect-square w-full bg-[#0e0c13] border border-[rgba(201,168,76,0.1)] rounded flex items-center justify-center mb-6 overflow-hidden">
                 <div className="w-16 h-16 border border-[rgba(201,168,76,0.2)] rounded-full flex items-center justify-center opacity-40">
                    <span className="text-[0.5rem] font-mono tracking-tighter">HALLMARK</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[0.6rem] font-mono uppercase tracking-wider mb-8">
                <div>
                  <span className="block opacity-40 mb-1">Stone</span>
                  <span>1.2ct Diamond</span>
                </div>
                <div>
                  <span className="block opacity-40 mb-1">Serial</span>
                  <span>JI-882-QX</span>
                </div>
                <div>
                  <span className="block opacity-40 mb-1">Last Service</span>
                  <span>12 Oct 2023</span>
                </div>
                <div>
                  <span className="block opacity-40 mb-1">Status</span>
                  <span className="text-[rgba(201,168,76,0.9)]">Pristine</span>
                </div>
              </div>

              <div className="mt-auto">
                <button className="w-full py-2 border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)] text-[0.6rem] uppercase tracking-[0.2em] hover:bg-[rgba(201,168,76,0.1)] transition-colors">
                  Upload Certificate
                </button>
              </div>
            </div>

            <div
              className="absolute inset-0 bg-[#16141a] border border-[rgba(201,168,76,0.5)] rounded-lg p-6 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="w-24 h-24 border-2 border-[rgba(201,168,76,0.3)] rounded-full flex items-center justify-center mb-4 relative">
                 <div className="absolute inset-2 border border-[rgba(201,168,76,0.2)] rounded-full animate-pulse" />
                 <span className="text-[rgba(201,168,76,0.9)] text-xs font-serif italic">Verified</span>
              </div>
              <h5 className="font-serif italic text-lg mb-2">Provenance Authenticated</h5>
              <p className="text-[0.65rem] opacity-60 leading-relaxed font-mono uppercase tracking-tight">
                Verified metal purity and stone grading.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
