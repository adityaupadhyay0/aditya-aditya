'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function InsightsPanel() {
  const opportunities = [
    { name: 'Sarah J.', occasion: 'Wedding Anniversary', days: 18, score: 92 },
    { name: 'Michael R.', occasion: 'Birthday Milestone', days: 12, score: 85 },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-[#0e0c13] text-[#f2ece0] overflow-y-auto no-scrollbar">
      <div className="mb-8">
        <h4 className="text-[0.6rem] uppercase tracking-[0.3em] text-[rgba(201,168,76,0.6)] font-mono mb-2">Upcoming Occasions</h4>
      </div>

      <div className="space-y-4 mb-10">
        {opportunities.map((opp, i) => (
          <div key={i} className="bg-[#16141a] border border-[rgba(201,168,76,0.1)] rounded p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">{opp.name}</span>
                <span className="text-[0.55rem] font-mono opacity-40 uppercase tracking-widest">{opp.occasion}</span>
              </div>
              <div className="w-full h-1 bg-[rgba(201,168,76,0.05)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${opp.score}%` }}
                  className="h-full bg-[rgba(201,168,76,0.8)]"
                />
              </div>
            </div>
            <span className="ml-4 text-[0.5rem] font-mono opacity-40">{opp.days}d</span>
          </div>
        ))}
      </div>
    </div>
  );
}
