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

export default function HandoffVisualizer() {
  const [tokenPos, setTokenPos] = useState({ x: 20, y: 80 });
  const [clock, setClock] = useState(0);
  const [status, setStatus] = useState('PENDING');

  useEffect(() => {
    let active = true;
    const runAnimation = async () => {
      if (!active) return;
      // 1. Enter Sales
      setTokenPos({ x: 20, y: 80 });
      await new Promise(r => setTimeout(r, 1000));
      if (!active) return;

      // 2. To Manager
      setTokenPos({ x: 20, y: 30 });
      setClock(prev => prev + 31);
      await new Promise(r => setTimeout(r, 1500));
      if (!active) return;

      // 3. To Finance
      setTokenPos({ x: 50, y: 20 });
      setClock(prev => prev + 48);
      await new Promise(r => setTimeout(r, 1000));
      if (!active) return;

      // 4. Bounce back to Sales
      setStatus('REJECTED');
      setTokenPos({ x: 20, y: 80 });
      setClock(prev => prev + 24);
      await new Promise(r => setTimeout(r, 1500));
      if (!active) return;

      // 5. Back to Finance
      setStatus('PENDING');
      setTokenPos({ x: 50, y: 20 });
      setClock(prev => prev + 36);
      await new Promise(r => setTimeout(r, 1000));
      if (!active) return;

      // 6. To Legal
      setTokenPos({ x: 80, y: 30 });
      setClock(prev => prev + 72);
      await new Promise(r => setTimeout(r, 2000));
      if (!active) return;

      // 7. To Operations
      setTokenPos({ x: 80, y: 80 });
      setClock(prev => prev + 12);
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
            {/* Streets */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
               <path d="M 20 80 L 20 30 L 50 20 L 80 30 L 80 80" stroke="#E8E4DC" strokeWidth="2" fill="none" style={{ vectorEffect: 'non-scaling-stroke' }} />
               {/* Note: percentage-based path coordinates in SVG don't work like this, using simplified version for mock */}
               <line x1="20%" y1="80%" x2="20%" y2="30%" stroke="#E8E4DC" />
               <line x1="20%" y1="30%" x2="50%" y2="20%" stroke="#E8E4DC" />
               <line x1="50%" y1="20%" x2="80%" y2="30%" stroke="#E8E4DC" />
               <line x1="80%" y1="30%" x2="80%" y2="80%" stroke="#E8E4DC" />
            </svg>

            {/* District Nodes */}
            {districts.map(d => (
              <div key={d.id} className="absolute -ml-12 -mt-4 w-24 h-8 flex flex-col items-center justify-center" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translateZ(20px)' }}>
                <span className="font-mono text-[8px] tracking-[0.2em] font-bold text-[#9BA3AF]">{d.label}</span>
              </div>
            ))}

            {/* Token */}
            <motion.div
              animate={{
                left: `${tokenPos.x}%`,
                top: `${tokenPos.y}%`,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 bg-white flex items-center justify-center z-20 shadow-[0_0_12px_rgba(184,151,58,0.4)] ${status === 'REJECTED' ? 'border-[#C23B22]' : 'border-[#B8973A]'}`}
              style={{ transform: 'translateZ(30px)' }}
            >
               <div className="w-4 h-4 rounded-full bg-[#B8973A]" style={{ backgroundColor: status === 'REJECTED' ? '#C23B22' : '#B8973A' }} />
               {status === 'REJECTED' && (
                 <div className="absolute -top-6 whitespace-nowrap font-mono text-[8px] text-[#C23B22] font-bold">REJECTED</div>
               )}
            </motion.div>
         </motion.div>
      </div>

      <div className="mt-8 flex justify-between items-end">
        <div className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF]">
          <p>EXCEPTION REQUEST #447</p>
          <p className={status === 'APPROVED' ? 'text-[#B8973A] font-bold' : ''}>STATUS: {status}</p>
        </div>
        <div className="text-right">
           <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-1">Total Elapsed Time:</p>
           <p className="font-mono text-3xl font-bold text-[#B8973A]">{(clock / 24).toFixed(1)} Days</p>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
