'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PresencePanel() {
  const timelineEntries = [
    { type: 'Store Visit', icon: '📍', time: 'Active Now', detail: 'Flagship Store, Tray 3 prepared', status: 'active' },
    { type: 'WhatsApp', icon: '💬', time: 'Today, 10:42 AM', detail: 'Confirmed appointment for 4:00 PM' },
    { type: 'Website', icon: '🌐', time: 'Yesterday', detail: 'Viewed Eternal Solitaire (3x)' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-[#0e0c13] text-[#f2ece0] overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-[0.6rem] uppercase tracking-[0.3em] text-[rgba(201,168,76,0.6)] font-mono">Omnichannel Timeline</h4>
      </div>

      <div className="relative border-l border-[rgba(201,168,76,0.1)] ml-2 pl-8 space-y-8">
        {timelineEntries.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative group"
          >
            <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-[#0e0c13] z-10 ${entry.status === 'active' ? 'bg-[rgba(201,168,76,1)]' : 'bg-[rgba(201,168,76,0.3)]'}`} />

            <div className={`p-4 rounded-lg border bg-[#16141a] ${entry.status === 'active' ? 'border-[rgba(201,168,76,0.3)]' : 'border-[rgba(201,168,76,0.1)]'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[0.6rem] font-mono uppercase tracking-widest opacity-40">{entry.type}</span>
                <span className="text-[0.55rem] font-mono opacity-30">{entry.time}</span>
              </div>
              <p className="text-[0.7rem] font-medium tracking-wide">{entry.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
