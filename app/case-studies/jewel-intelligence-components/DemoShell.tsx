'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DemoShellProps {
  activePillar: string;
  children: React.ReactNode;
  title?: string;
}

export default function DemoShell({ activePillar, children, title }: DemoShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-[1400px] w-full h-full flex items-center justify-center p-4">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="demo-window w-full h-full bg-[#0e0c13] border border-[rgba(201,168,76,0.2)] rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(201,168,76,0.06),0_40px_80px_rgba(0,0,0,0.5),0_80px_160px_rgba(0,0,0,0.3)] relative"
      >
        {/* Title Bar */}
        <div className="demo-window__bar flex items-center gap-2 px-4 py-3 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.03)]">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.3)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.3)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.3)]" />
          </div>
          {title && (
            <span className="ml-2 text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)] font-mono">
              {title}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="demo-window__body relative h-[calc(100%-41px)] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
