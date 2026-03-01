'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StageGraphProps {
  accords: { label: string, value: number }[];
}

export const StageGraph: React.FC<StageGraphProps> = ({ accords }) => {
  const points = accords.map((a, i) => {
    const angle = (i / accords.length) * Math.PI * 2;
    const r = (a.value / 100) * 40;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-96 h-96 flex items-center justify-center group">
       <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background Grid */}
          {[20, 30, 40].map((r) => (
             <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#0d0d0d" strokeWidth="0.1" strokeDasharray="1,2" opacity="0.1" />
          ))}

          {/* Axis Lines */}
          {accords.map((_, i) => {
             const angle = (i / accords.length) * Math.PI * 2;
             const x = 50 + 40 * Math.cos(angle);
             const y = 50 + 40 * Math.sin(angle);
             return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#0d0d0d" strokeWidth="0.1" opacity="0.1" />;
          })}

          {/* Data Shape */}
          <motion.polygon
             points={points}
             fill="#c29f6b11"
             stroke="#c29f6b"
             strokeWidth="0.5"
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 2 }}
          />

          {/* Accord Labels */}
          {accords.map((a, i) => {
             const angle = (i / accords.length) * Math.PI * 2;
             const r = 46;
             const x = 50 + r * Math.cos(angle);
             const y = 50 + r * Math.sin(angle);
             return (
                <text
                   key={i}
                   x={x} y={y}
                   textAnchor="middle"
                   className="font-mono text-[1.8px] uppercase tracking-widest fill-[#0d0d0d]/40"
                   dominantBaseline="middle"
                >
                   {a.label}
                </text>
             );
          })}
       </svg>
    </div>
  );
};
