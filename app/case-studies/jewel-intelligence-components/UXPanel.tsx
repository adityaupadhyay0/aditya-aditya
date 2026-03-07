'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function UXPanel() {
  const [isPrepared, setIsPrepared] = useState(false);

  return (
    <div className="p-8 h-full flex flex-col bg-[#0e0c13] text-[#f2ece0]">
      <div className="mb-10">
        <h4 className="text-xl font-serif italic mb-1">Riya Malhotra</h4>
        <p className="text-[0.6rem] font-mono uppercase tracking-[0.2em] opacity-40">4:00 PM Appointment</p>
      </div>

      <div className="flex-1 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-[#16141a] border border-[rgba(201,168,76,0.1)] rounded p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0e0c13] rounded border border-[rgba(201,168,76,0.1)]" />
            <div className="flex-1">
              <div className="h-2 w-24 bg-[rgba(201,168,76,0.2)] mb-2" />
              <div className="h-2 w-16 bg-[rgba(201,168,76,0.1)]" />
            </div>
          </div>
        ))}
      </div>

      <motion.button
        onClick={() => setIsPrepared(true)}
        className={`w-full py-4 mt-8 rounded font-mono text-[0.7rem] uppercase tracking-[0.3em] border ${isPrepared ? 'bg-[rgba(201,168,76,0.9)] text-[#0e0c13]' : 'border-[rgba(201,168,76,0.3)]'}`}
      >
        {isPrepared ? 'Prepared ✓' : 'Mark Prepared'}
      </motion.button>
    </div>
  );
}
