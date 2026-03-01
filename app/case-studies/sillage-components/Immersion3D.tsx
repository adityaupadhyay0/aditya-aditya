'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface Immersion3DProps {
  product: FragranceDNA;
}

export const Immersion3D: React.FC<Immersion3DProps> = ({ product }) => {
  const { scrollYProgress } = useScroll();

  // Create a 3D parallax effect based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const z = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
        className="relative w-[60vw] h-[60vh] flex items-center justify-center"
      >
        {/* Floating Layers representing the "Art" of the fragrance */}
        {product.art_elements.color_palette.map((color, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full mix-blend-screen blur-3xl opacity-20"
            style={{
              backgroundColor: color,
              translateZ: (i - 2) * 100,
              scale: 1 + i * 0.1
            }}
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* The Central Artifact (abstract representation of the scent) */}
        <motion.div
          className="relative z-10 w-64 h-96 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
          style={{ transformStyle: 'preserve-3d', translateZ: 50 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[1em] text-white/40 mb-4">L'IMMERSION</span>
          <h2 className="font-serif italic text-4xl text-white tracking-tighter mb-8 leading-none">
            {product.name}
          </h2>
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/60 leading-relaxed">
            {product.art_elements.texture}
          </p>

          {/* Internal floating geometry */}
          <div className="mt-12 w-16 h-16 border border-white/20 rotate-45 animate-pulse" />
        </motion.div>

        {/* Pattern layer */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ transformStyle: 'preserve-3d', translateZ: -100 }}>
             <svg width="100%" height="100%" className="w-full h-full">
                <pattern id="immersion-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                   <circle cx="50" cy="50" r="1" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#immersion-pattern)" />
             </svg>
        </div>
      </motion.div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="font-mono text-[0.5rem] uppercase tracking-[1.5em]">Scroll to enter the craft</span>
        <div className="w-px h-16 bg-white/20 animate-bounce" />
      </div>
    </div>
  );
};
