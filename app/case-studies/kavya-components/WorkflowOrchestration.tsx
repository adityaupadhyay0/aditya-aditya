'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const districts = [
  { id: 'SALES', x: 20, y: 80, label: 'SALES' },
  { id: 'MANAGER', x: 20, y: 30, label: 'MANAGER' },
  { id: 'FINANCE', x: 50, y: 20, label: 'FINANCE' },
  { id: 'LEGAL', x: 80, y: 30, label: 'LEGAL' },
  { id: 'OPERATIONS', x: 80, y: 80, label: 'OPERATIONS' },
];

export default function WorkflowOrchestration() {
  const [tokenPos, setTokenPos] = useState({ x: 20, y: 80 });
  const [status, setStatus] = useState('PENDING');

  useEffect(() => {
    let active = true;
    const runAnimation = async () => {
      if (!active) return;
      setTokenPos({ x: 20, y: 80 });
      await new Promise(r => setTimeout(r, 500));
      if (!active) return;

      setTokenPos({ x: 20, y: 30 });
      await new Promise(r => setTimeout(r, 500));
      if (!active) return;

      setTokenPos({ x: 50, y: 20 });
      await new Promise(r => setTimeout(r, 500));
      if (!active) return;

      setTokenPos({ x: 80, y: 30 });
      await new Promise(r => setTimeout(r, 500));
      if (!active) return;

      setTokenPos({ x: 80, y: 80 });
      await new Promise(r => setTimeout(r, 500));
      if (!active) return;

      setStatus('APPROVED');
    };

    runAnimation();
    return () => { active = false; };
  }, []);

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col relative overflow-hidden perspective-[900px]">
      <div className="flex-1 relative preserve-3d">
         <motion.div className="w-full h-full relative" style={{ rotateX: 25 }}>
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
               <path d="M 20 80 L 20 30 L 50 20 L 80 30 L 80 80" stroke="#B8973A" strokeWidth="2" fill="none" style={{ vectorEffect: 'non-scaling-stroke' }} />
               <line x1="20%" y1="80%" x2="20%" y2="30%" stroke="#B8973A" />
               <line x1="20%" y1="30%" x2="50%" y2="20%" stroke="#B8973A" />
               <line x1="50%" y1="20%" x2="80%" y2="30%" stroke="#B8973A" />
               <line x1="80%" y1="30%" x2="80%" y2="80%" stroke="#B8973A" />
            </svg>

            {districts.map(d => (
              <div key={d.id} className="absolute -ml-12 -mt-4 w-24 h-8 flex flex-col items-center justify-center" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translateZ(20px)' }}>
                <span className="font-mono text-[8px] tracking-[0.2em] font-bold text-[#B8973A]">{d.label}</span>
                {status === 'APPROVED' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#B8973A] text-[8px] mt-1">✓</motion.div>}
              </div>
            ))}

            <motion.div
              animate={{ left: `${tokenPos.x}%`, top: `${tokenPos.y}%` }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-[#B8973A] bg-white flex items-center justify-center z-20 shadow-[0_0_20px_rgba(184,151,58,0.6)]"
              style={{ transform: 'translateZ(30px)' }}
            >
               <div className="w-4 h-4 rounded-full bg-[#B8973A]" />
            </motion.div>
         </motion.div>
      </div>

      <div className="mt-8 flex justify-between items-end border-t border-[#E8E4DC] pt-6">
        <div>
           <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-1">Total Elapsed Time:</p>
           <p className="font-mono text-2xl font-bold text-[#B8973A]">4.1 Hours</p>
        </div>
        <div className="text-right">
           <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-1">Context Integrity:</p>
           <p className="font-mono text-2xl font-bold text-[#B8973A]">100%</p>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
