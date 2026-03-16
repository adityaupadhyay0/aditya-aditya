'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const results = [
  { id: 1, title: 'Slack thread · #enterprise-sales · March 2022', description: '"Channel deleted. 847 messages unrecoverable."', status: 'DEAD', color: '#C23B22' },
  { id: 2, title: 'Google Doc · "Harrington Post-Mortem Draft v2"', description: '"Owner account deactivated. Last edited 14 months ago."', status: 'ORPHANED', color: '#9BA3AF' },
  { id: 3, title: 'Email thread · 23 recipients · 61 replies', description: '"No summary available. Context requires full read."', status: 'FRAGMENT', color: '#B8973A' },
  { id: 4, title: 'Notion page · "Q1 Account Review"', description: '"Page moved or deleted. Workspace restructured."', status: 'EXPIRED', color: '#C23B22' },
];

export default function KnowledgeGraveyard() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const fullQuery = 'Why did we lose the Harrington account?';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setQuery(fullQuery.slice(0, i));
      i++;
      if (i > fullQuery.length) {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 500);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col">
      <div className="mb-12 border-b-2 border-[#B8973A] pb-4">
        <span className="font-serif italic text-2xl text-[#0F0F0D]">
          {query}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[2px] h-6 bg-[#B8973A] ml-1 align-middle"
          />
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
        <AnimatePresence>
          {showResults && results.map((result, i) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 border border-[#E8E4DC] bg-white relative group cursor-default"
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#9BA3AF]">{result.title}</span>
                <span className="font-mono text-[8px] font-bold tracking-widest" style={{ color: result.color }}>STATUS: {result.status}</span>
              </div>
              <p className="font-serif italic text-sm text-[#0F0F0D] opacity-80">{result.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {showResults && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.5 }}
             className="pt-8 text-center"
           >
              <p className="font-display italic text-2xl text-[#0F0F0D]">
                "The answer exists. It is simply unreachable."
              </p>
           </motion.div>
        )}
      </div>
    </div>
  );
}
