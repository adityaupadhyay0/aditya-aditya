'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const layers = [
  'Integration',
  'Knowledge',
  'Workflow',
  'Decision',
  'Creation',
  'Data',
  'Experience'
];

interface LayerProps {
  layer: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}

function SingleLayer({ layer, index, scrollYProgress }: LayerProps) {
  const initialRotateX = (index * 15) - 45;
  const initialRotateY = (index * 10) - 30;
  const initialZ = (index * 50) - 150;

  const rotateX = useTransform(scrollYProgress, [0.2, 0.6], [initialRotateX, 0]);
  const rotateY = useTransform(scrollYProgress, [0.2, 0.6], [initialRotateY, 0]);
  const z = useTransform(scrollYProgress, [0.2, 0.6], [initialZ, index * 8]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.7, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.7], [1, 1.1]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        z,
        opacity,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className="absolute w-[300px] h-[50px] md:w-[600px] md:h-[80px] bg-white/70 backdrop-blur-md border border-[#9BA3AF]/40 flex items-center justify-center shadow-lg"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#9BA3AF] font-bold">
         {layer}
      </span>
    </motion.div>
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
             {layers.map((layer, i) => (
               <SingleLayer key={i} layer={layer} index={i} scrollYProgress={scrollYProgress} />
             ))}

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
