'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DecisionLag() {
  const [activeStage, setActiveStage] = useState(-1);
  const stages = [
    { label: 'Signal appears in sales data', day: 1, type: 'signal' },
    { label: 'Analyst assigned', day: 4 },
    { label: 'Analysis complete', day: 9 },
    { label: 'Report reviewed, revisions requested', day: 12 },
    { label: 'Deck presented to leadership', day: 16 },
    { label: 'Decision made: increase enterprise focus', day: 19, type: 'decision' },
    { label: 'Strategy updated, resources reallocated', day: 23 },
  ];

  useEffect(() => {
    let active = true;
    let current = -1;
    const interval = setInterval(() => {
      if (!active) return;
      current++;
      if (current < stages.length) {
        setActiveStage(current);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => { active = false; clearInterval(interval); };
  }, [stages.length]);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col perspective-[1000px]">
      <motion.div
        className="flex-1 relative border-l border-b border-[#E8E4DC]"
        animate={{ rotateX: 8 }}
      >
        {/* Optimal Window */}
        <div className="absolute left-[4.34%] right-[52.17%] top-1/2 -translate-y-1/2 h-8 bg-[#C23B22]/5 border-x border-[#C23B22]/20 flex items-center justify-center">
           <span className="font-mono text-[8px] uppercase tracking-widest text-[#C23B22] font-bold">Optimal Decision Window</span>
        </div>

        {/* Timeline Line */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#E8E4DC]" />

        {/* Milestones */}
        {stages.map((stage, i) => {
          const xPos = (stage.day / 23) * 100;
          const isActive = i <= activeStage;

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${xPos}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
            >
              <div className={`w-2 h-2 rounded-full -ml-1 ${stage.type === 'signal' ? 'bg-[#B8973A] shadow-[0_0_8px_#B8973A]' : (stage.type === 'decision' ? 'bg-[#C23B22]' : 'bg-[#9BA3AF]')}`} />

              <div className="absolute top-4 left-0 -ml-2 whitespace-nowrap overflow-visible">
                 <p className="font-mono text-[8px] text-[#9BA3AF]">Day {stage.day < 10 ? `0${stage.day}` : stage.day}</p>
                 <p className={`font-sans text-[9px] max-w-[100px] leading-tight mt-1 ${stage.type === 'decision' ? 'font-bold text-[#C23B22]' : 'text-[#0F0F0D]'}`}>{stage.label}</p>
              </div>

              {stage.type === 'signal' && (
                <div className="absolute -top-8 left-0 -ml-1 text-[#B8973A]">◆</div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-12 text-center">
         <p className="font-display italic text-2xl text-[#0F0F0D] leading-tight">
           "The right answer, delivered on time, is strategy. The same answer, delivered late, is a post-mortem."
         </p>
      </div>
    </div>
  );
}
