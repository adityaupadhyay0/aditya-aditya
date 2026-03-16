'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { label: 'BUSINESS QUESTION', wait: 'T+0', type: 'start' },
  { label: 'SLACK MESSAGE TO ANALYST', wait: '4 hours' },
  { label: 'ANALYST QUEUE ENTRY', wait: '31 hours' },
  { label: 'SQL QUERY WRITTEN', wait: '3 hours' },
  { label: 'QA REVIEW', wait: '6 hours' },
  { label: 'CSV EXPORTED', wait: 'Delivery: email' },
  { label: 'INTERPRETATION', wait: 'Self-directed' },
  { label: 'DECISION MADE', wait: 'Final', type: 'end' },
];

export default function DataJourney() {
  return (
    <div className="w-full h-full bg-white p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E8E4DC] -translate-x-1/2" />

        <div className="space-y-12 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <div className="flex-1 text-right pr-8">
                 <span className="font-mono text-[8px] tracking-widest text-[#B8973A] font-bold">{step.wait.toUpperCase()}</span>
              </div>

              <div className={`w-3 h-3 rounded-full border-2 bg-white ${step.type === 'start' || step.type === 'end' ? 'border-[#B8973A] w-4 h-4 -ml-0.5' : 'border-[#9BA3AF]'}`} />

              <div className="flex-1 text-left pl-8">
                 <span className="font-mono text-[9px] tracking-widest text-[#0F0F0D] font-bold">{step.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 w-full pt-12 border-t border-[#E8E4DC] text-center">
         <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-4">Ratio of efficiency</p>
         <div className="flex justify-center items-center gap-12">
            <div>
               <p className="font-mono text-xl md:text-3xl font-bold text-[#C23B22]">4.5 DAYS</p>
               <p className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF]">Current Journey</p>
            </div>
            <div className="text-2xl text-[#E8E4DC]">:</div>
            <div>
               <p className="font-mono text-xl md:text-3xl font-bold text-[#B8973A]">4.5 SECS</p>
               <p className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF]">Optimal State</p>
            </div>
         </div>
      </div>
    </div>
  );
}
