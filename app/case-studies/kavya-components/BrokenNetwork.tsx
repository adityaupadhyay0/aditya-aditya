'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BrokenNetwork() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [reconciliationHours, setReconciliationHours] = useState(0);

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
    { from: 0, to: 1, broken: true },
    { from: 0, to: 2, broken: false },
    { from: 1, to: 6, broken: true },
    { from: 2, to: 3, broken: true },
    { from: 3, to: 5, broken: false },
    { from: 4, to: 6, broken: true },
    { from: 7, to: 0, broken: true },
    { from: 2, to: 4, broken: true },
  ];

  useEffect(() => {
    const target = 2847;
    const duration = 1400;
    const start = Date.now();

    const update = () => {
      const now = Date.now();
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setReconciliationHours(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, []);

  return (
    <div className="w-full h-full relative bg-white p-12 flex flex-col">
      <div className="flex-1 relative perspective-[1200px]">
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{
            rotateX: 18,
            rotateY: -4,
          }}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {connections.map((conn, i) => {
              const from = nodes[conn.from];
              const to = nodes[conn.to];
              const isRelevant = hoveredNode === conn.from || hoveredNode === conn.to;

              return (
                <motion.line
                  key={i}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={conn.broken ? (isRelevant ? '#C23B22' : '#9BA3AF') : (isRelevant ? '#B8973A' : '#9BA3AF')}
                  strokeWidth={isRelevant ? 2 : 1}
                  strokeDasharray={conn.broken ? "4 6" : "0"}
                  className={conn.broken ? "animate-dash" : ""}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: isRelevant ? 1 : 0.2 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-[#9BA3AF]/30 bg-white flex items-center justify-center cursor-pointer z-10 shadow-sm"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              whileHover={{ scale: 1.1, borderColor: '#B8973A' }}
            >
              <span className="font-mono text-[10px] font-bold text-[#0F0F0D]">{node.label}</span>
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 bg-white border border-[#E8E4DC] p-2 whitespace-nowrap shadow-lg z-50 pointer-events-none"
                >
                  <p className="font-mono text-[8px] uppercase tracking-widest text-[#C23B22]">7 Missing Connections</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 text-right">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#9BA3AF] mb-1">
          Estimated manual reconciliation hours<br />across your organization this week:
        </p>
        <p className="font-mono text-4xl font-bold text-[#B8973A]">{reconciliationHours.toLocaleString()}</p>
      </div>

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes dash {
          to { stroke-dashoffset: -10; }
        }
        .animate-dash {
          animation: dash 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
}
