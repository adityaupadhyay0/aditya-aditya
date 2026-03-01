'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface ArtisticExpressionProps {
  product: FragranceDNA;
}

export const ArtisticExpression: React.FC<ArtisticExpressionProps> = ({ product }) => {
  const { scrollYProgress } = useScroll();

  // Transform values for a cinematic, textured feel
  const blurScale = useTransform(scrollYProgress, [0.4, 0.6], [20, 0]);
  const grainOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 0.2]);
  const textY = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);

  return (
    <section className="relative min-h-[200vh] w-full bg-[#0a0908] flex flex-col items-center justify-start py-[30vh] overflow-hidden">
      {/* Background patterns and textures */}
      <motion.div
         style={{ opacity: grainOpacity }}
         className="absolute inset-0 z-0 pointer-events-none opacity-20"
      >
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

         {/* Animated geometric pattern based on product */}
         <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-[150vw] h-[150vw] border-[1px] border-white/5 rounded-full"
            />
            <motion.div
               animate={{ rotate: -360 }}
               transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
               className="w-[120vw] h-[120vw] border-[1px] border-white/5 rounded-full"
            />
         </div>
      </motion.div>

      {/* Visual representation of "Texture" */}
      <div className="relative z-10 max-w-[1400px] w-full px-[10vw] flex flex-col items-center gap-64">
         <motion.div
            style={{ y: textY }}
            className="flex flex-col items-center text-center gap-12"
         >
            <span className="font-mono text-[0.6rem] uppercase tracking-[1.2em] text-[#c9a96e]">L'Expression Artistique</span>
            <h2 className="font-serif italic text-6xl md:text-9xl text-white tracking-tighter leading-[0.8]">
               The <span className="not-italic font-light">Texture</span> of Scent
            </h2>
            <p className="font-mono text-[0.8rem] uppercase tracking-[0.5em] text-white/40 max-w-2xl leading-loose">
               {product.art_elements.texture}
            </p>
         </motion.div>

         {/* Abstract Art Canvas */}
         <div className="relative w-full aspect-video border border-white/10 group overflow-hidden">
            <motion.div
               className="absolute inset-0 bg-gradient-to-tr from-[#0a0908] via-transparent to-white/5"
            />

            {/* Generative shapes reflecting the fragrance's art elements */}
            <div className="absolute inset-0 flex items-center justify-center p-32">
               <motion.div
                  style={{ filter: `blur(${blurScale}px)` }}
                  className="w-full h-full border border-white/5 relative"
               >
                  {/* Internal circles reflecting the color palette */}
                  {product.art_elements.color_palette.map((color, i) => (
                     <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                           backgroundColor: color,
                           width: `${20 + i * 10}%`,
                           height: `${20 + i * 10}%`,
                           left: `${Math.random() * 60 + 20}%`,
                           top: `${Math.random() * 60 + 20}%`,
                           opacity: 0.1,
                           mixBlendMode: 'screen'
                        }}
                        animate={{
                           x: [0, 50, -50, 0],
                           y: [0, -50, 50, 0],
                        }}
                        transition={{
                           duration: 15 + i * 5,
                           repeat: Infinity,
                           ease: "easeInOut"
                        }}
                     />
                  ))}

                  {/* Pattern based on Art DNA */}
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                     <p className="font-serif italic text-3xl text-white/20 tracking-[1em] text-center uppercase">
                        {product.art_elements.pattern}
                     </p>
                  </div>
               </motion.div>
            </div>

            <div className="absolute bottom-8 right-8 font-mono text-[0.5rem] uppercase tracking-[1em] text-white/20">
               Fig. 01 — Visual Synthesis of DNA
            </div>
         </div>

         {/* Sound texture callout */}
         <div className="flex flex-col items-center gap-8">
            <div className="w-48 h-px bg-white/10" />
            <div className="flex items-center gap-6">
               <div className="w-1 h-1 bg-[#c9a96e] rounded-full animate-ping" />
               <span className="font-mono text-[0.6rem] uppercase tracking-[0.8em] text-[#c9a96e]">Sound Texture</span>
            </div>
            <p className="font-serif italic text-2xl text-white/60 tracking-tight">
               "{product.art_elements.sound_texture}"
            </p>
         </div>
      </div>

      {/* Scroll indicator to Craft section */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 group">
         <span className="font-mono text-[0.5rem] uppercase tracking-[1.5em] text-white/30 group-hover:text-white/60 transition-colors">Enter the Craft</span>
         <div className="w-px h-32 bg-white/10 group-hover:h-48 group-hover:bg-[#c9a96e]/40 transition-all duration-1000" />
      </div>
    </section>
  );
};
