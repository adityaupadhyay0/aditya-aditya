'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialTickets = [
  { id: 'INT-0847', label: 'Territory Planner — Revenue by Region', filed: '67 days ago', status: 'In Queue', color: '#9BA3AF' },
  { id: 'INT-0831', label: 'Pricing Exception Calculator', filed: '71 days ago', status: 'In Queue', color: '#9BA3AF' },
  { id: 'INT-0814', label: 'Campaign Attribution Dashboard', filed: '89 days ago', status: 'In Progress', color: '#B8973A' },
  { id: 'INT-0798', label: 'Client Health Scoring Tool', filed: '103 days ago', status: 'In Queue', color: '#9BA3AF' },
  { id: 'INT-0776', label: 'Competitive Intelligence Tracker', filed: '118 days ago', status: 'Backlogged', color: 'rgba(194,59,34,0.7)' },
  { id: 'INT-0751', label: 'Forecast Scenario Simulator', filed: '134 days ago', status: 'Backlogged', color: 'rgba(194,59,34,0.7)' },
  { id: 'INT-0729', label: 'Contract Renewal Workflow', filed: '156 days ago', status: 'On Hold', color: '#444' },
  { id: 'INT-0704', label: 'Executive Pipeline Summary', filed: '177 days ago', status: 'Backlogged', color: 'rgba(194,59,34,0.7)' },
];

export default function BacklogCounter() {
  const [tickets, setTickets] = useState<typeof initialTickets>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let i = 0;
    const timer = setInterval(() => {
      if (!active) return;
      if (i < initialTickets.length) {
        setTickets(prev => [...prev, initialTickets[i]]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 200);
    return () => { active = false; clearInterval(timer); };
  }, []);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col perspective-[800px]">
      <div className="flex justify-between items-center mb-8 border-b border-[#E8E4DC] pb-4">
         <div>
            <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#0F0F0D]">INTERNAL TOOL REQUESTS</h4>
            <p className="font-mono text-[8px] text-[#9BA3AF]">TOTAL THIS YEAR: 47 | COMPLETED: 6</p>
         </div>
         <div className="text-right">
            <span className="font-mono text-[10px] font-bold text-[#B8973A]">AVG WAIT: 61 DAYS</span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar relative">
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 border border-[#E8E4DC] bg-white flex justify-between items-center group cursor-pointer hover:border-[#B8973A] transition-all`}
              onClick={() => setSelectedTicket(ticket.id)}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[8px] text-[#9BA3AF]">{ticket.id}</span>
                <span className="font-serif text-sm text-[#0F0F0D]">{ticket.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[8px] text-[#9BA3AF]">{ticket.filed}</span>
                <span className="font-mono text-[8px] font-bold px-2 py-0.5 border" style={{ color: ticket.color, borderColor: ticket.color }}>{ticket.status.toUpperCase()}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedTicket && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute inset-y-0 right-0 w-full md:w-2/3 bg-white border-l border-[#E8E4DC] p-8 shadow-2xl z-20"
            >
               <button onClick={() => setSelectedTicket(null)} className="mb-8 font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF] hover:text-[#0F0F0D]">← Back to list</button>
               <h3 className="font-display italic text-2xl mb-4 text-[#0F0F0D]">
                 {tickets.find(t => t.id === selectedTicket)?.label}
               </h3>
               <div className="mt-12 pt-8 border-t border-[#E8E4DC]">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF] mb-4">LATEST COMMENT</p>
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[#E8E4DC]" />
                     <div>
                        <p className="font-sans text-[10px] font-bold text-[#0F0F0D]">sarah.k <span className="font-normal text-[#9BA3AF] ml-2">43 days ago</span></p>
                        <p className="font-serif italic text-sm text-[#0F0F0D] mt-1">"Team has moved forward with Excel workaround for now."</p>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
