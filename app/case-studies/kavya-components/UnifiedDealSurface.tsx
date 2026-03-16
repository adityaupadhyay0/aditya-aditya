'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UnifiedDealSurface() {
  const [healed, setHealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nodes = [
    { id: 0, label: 'SF', x: 20, y: 30 },
    { id: 1, label: 'NS', x: 80, y: 20 },
    { id: 2, label: 'HS', x: 50, y: 50 },
    { id: 3, label: 'SL', x: 25, y: 70 },
    { id: 4, label: 'GD', x: 75, y: 80 },
    { id: 5, label: 'WD', x: 15, y: 50 },
    { id: 6, label: 'JS', x: 85, y: 55 },
    { id: 7, label: 'AS', x: 45, y: 15 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 6 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 4, to: 6 },
    { from: 7, to: 0 },
    { from: 2, to: 4 },
  ];

  return (
    <div className="w-full h-full relative bg-white p-12 flex flex-col overflow-hidden">
      <div className="flex-1 relative perspective-[1200px]">
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateX: 18, rotateY: -4 }}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {connections.map((conn, i) => {
              const from = nodes[conn.from];
              const to = nodes[conn.to];

              return (
                <motion.line
                  key={i}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={healed ? '#B8973A' : '#9BA3AF'}
                  strokeWidth={healed ? 2 : 1}
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: healed ? 1 : 0, opacity: healed ? 0.8 : 0.2 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Particles converging to center */}
          {healed && connections.map((conn, i) => (
             <motion.div
               key={`particle-${i}`}
               initial={{ left: `${nodes[conn.from].x}%`, top: `${nodes[conn.from].y}%` }}
               animate={{ left: '50%', top: '50%' }}
               transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
               className="absolute w-1.5 h-1.5 bg-[#B8973A] rounded-full blur-[1px] z-20"
             />
          ))}

          {/* Central Deal Node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -ml-12 -mt-12 w-24 h-24 rounded-full border-2 border-[#B8973A] bg-white flex items-center justify-center z-30 shadow-[0_0_40px_rgba(184,151,58,0.2)]"
            animate={{ scale: healed ? 1 : 0.8 }}
          >
            <div className="text-center">
              <span className="font-mono text-[8px] tracking-widest text-[#B8973A] font-bold">DEAL</span>
              <p className="font-mono text-[10px] font-bold text-[#0F0F0D]">#447</p>
            </div>
          </motion.div>

          {/* Surrounding Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full border border-[#9BA3AF]/30 bg-white flex items-center justify-center z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{ borderColor: healed ? '#B8973A' : '#9BA3AF', opacity: healed ? 1 : 0.5 }}
            >
              <span className="font-mono text-[8px] text-[#0F0F0D]">{node.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-between items-end border-t border-[#E8E4DC] pt-6">
        <div>
           <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-1">Manual reconciliation eliminated:</p>
           <p className="font-mono text-2xl font-bold text-[#B8973A]">2,847 / week</p>
        </div>
        <div className="text-right">
           <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-1">Time to full deal context:</p>
           <p className="font-mono text-2xl font-bold text-[#B8973A]">0.4 SECS</p>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
