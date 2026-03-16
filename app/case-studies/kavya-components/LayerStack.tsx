'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const layers = [
  'Integration',
  'Knowledge',
  'Workflow',
  'Decision',
  'Creation',
  'Data',
  'Experience'
];

function Layers({ scrollYProgress }: { scrollYProgress: any }) {
  /* eslint-disable react-hooks/rules-of-hooks */
  return (
    <>
      {layers.map((layer, i) => {
        // Initial scattered state
        const initialRotateX = (i * 15) - 45;
        const initialRotateY = (i * 10) - 30;
        const initialZ = (i * 50) - 150;

        // Animate to stacked state
        const rotateX = useTransform(scrollYProgress, [0.2, 0.6], [initialRotateX, 0]);
        const rotateY = useTransform(scrollYProgress, [0.2, 0.6], [initialRotateY, 0]);
        const z = useTransform(scrollYProgress, [0.2, 0.6], [initialZ, i * 8]);
        const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.7, 1, 0]);
        const scale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.1]);

        return (
          <motion.div
            key={i}
            style={{
              rotateX,
              rotateY,
              z,
              opacity,
              scale,
              transformStyle: 'preserve-3d',
            }}
            className="absolute w-[400px] h-[60px] md:w-[600px] md:h-[80px] bg-white/70 backdrop-blur-md border border-[#9BA3AF]/40 flex items-center justify-center shadow-lg"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#9BA3AF] font-bold">
               {layer}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}

export default function LayerStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="h-[200vh] relative bg-[#FAFAF7]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        <div className="relative w-full max-w-4xl h-[60vh] perspective-[1400px]">
          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
             <Layers scrollYProgress={scrollYProgress} />

             {/* Kavya Label */}
             <motion.div
               style={{
                 opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1]),
                 y: useTransform(scrollYProgress, [0.7, 0.8], [20, 0]),
               }}
               className="absolute top-[80%] text-center z-50"
             >
                <h3 className="font-display italic text-6xl md:text-8xl text-[#B8973A]">Kavya</h3>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#9BA3AF] mt-4">The Operating Surface</p>
             </motion.div>
          </div>
        </div>

        {/* Backdrop Glow */}
        <motion.div
           style={{
             opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 0.12]),
             scale: useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1.2]),
           }}
           className="absolute w-[600px] h-[600px] rounded-full bg-[#B8973A] blur-[120px] pointer-events-none"
        />

        <div className="absolute top-1/2 left-10 md:left-20 -translate-y-1/2 max-w-sm">
           <motion.div
             style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7], [0, 1, 1, 0]),
                x: useTransform(scrollYProgress, [0, 0.2], [-20, 0])
             }}
             className="space-y-6"
           >
              <h2 className="text-4xl font-display italic leading-tight text-[#0F0F0D]">
                The Pattern Beneath Everything
              </h2>
              <p className="font-serif italic text-lg opacity-60">
                Seven companies are racing to solve seven problems. None of them have noticed they are all digging in the same field.
              </p>
           </motion.div>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
}
