'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FragranceDNA } from './sillageData';

interface StoryArcScrollProps {
  product: FragranceDNA;
}

export const StoryArcScroll: React.FC<StoryArcScrollProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgOpacityTop = useTransform(smoothScroll, [0, 0.3], [0.08, 0]);
  const bgOpacityHeart = useTransform(smoothScroll, [0.3, 0.5, 0.7], [0, 0.08, 0]);
  const bgOpacityBase = useTransform(smoothScroll, [0.7, 0.9], [0, 0.08]);

  const chapters = [
    { id: 'opening', data: product.story_arc.opening, number: '01', colors: product.notes.top.map(n => n.color) },
    { id: 'evolution', data: product.story_arc.evolution, number: '02', colors: product.notes.heart.map(n => n.color) },
    { id: 'signature', data: product.story_arc.signature, number: '03', colors: product.notes.base.map(n => n.color) }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0a0908]">
       <motion.div
         className="fixed inset-0 pointer-events-none"
         style={{
           opacity: bgOpacityTop,
           background: `radial-gradient(circle at 50% 50%, ${chapters[0].colors[0]}44 0%, transparent 70%)`
         }}
       />
       <motion.div
         className="fixed inset-0 pointer-events-none"
         style={{
           opacity: bgOpacityHeart,
           background: `radial-gradient(circle at 50% 50%, ${chapters[1].colors[0]}44 0%, transparent 70%)`
         }}
       />
       <motion.div
         className="fixed inset-0 pointer-events-none"
         style={{
           opacity: bgOpacityBase,
           background: `radial-gradient(circle at 50% 50%, ${chapters[2].colors[0]}44 0%, transparent 70%)`
         }}
       />

       {chapters.map((chapter, i) => (
         <section
           key={chapter.id}
           className="h-screen w-full flex items-center justify-center p-8 sticky top-0"
         >
           <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
             <motion.span
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 0.1, y: 0 }}
               viewport={{ once: true }}
               className="block font-serif text-[12vw] font-bold text-[#f0ebe0] tracking-tight leading-none mb-4"
             >
               {chapter.number}
             </motion.span>
             <motion.h3
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-4xl md:text-6xl font-light text-[#f0ebe0] italic leading-tight"
             >
               {chapter.data.headline}
             </motion.h3>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 0.7, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="font-serif italic text-xl md:text-2xl text-[#f0ebe0] max-w-2xl mx-auto leading-relaxed"
             >
               {chapter.data.body}
             </motion.p>
           </div>
         </section>
       ))}

       <div className="h-[100vh]" />
    </div>
  );
};
