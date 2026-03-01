'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentChapterLabel, setCurrentChapterLabel] = useState("I");
  const chapterValue = useTransform(smoothProgress, [0, 0.33, 0.66, 1], ["I", "I", "II", "III"]);

  useMotionValueEvent(chapterValue, "change", (latest) => {
    setCurrentChapterLabel(latest);
  });

  const chapters = [
    { id: 'opening', data: product.story_arc.opening, number: 'I', range: [0, 0.33], color: product.notes.top[0].color },
    { id: 'evolution', data: product.story_arc.evolution, number: 'II', range: [0.33, 0.66], color: product.notes.heart[0].color },
    { id: 'signature', data: product.story_arc.signature, number: 'III', range: [0.66, 1], color: product.notes.base[0].color }
  ];

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#fdfaf5]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Dynamic Atmospheric Gradient */}
        <motion.div
           className="absolute inset-0 pointer-events-none opacity-20 blur-[150px]"
           style={{
             background: useTransform(
               smoothProgress,
               [0, 0.5, 1],
               [chapters[0].color, chapters[1].color, chapters[2].color]
             )
           }}
        />

        <AnimatePresence>
          {chapters.map((chapter, i) => (
            <ChapterView
              key={chapter.id}
              chapter={chapter}
              progress={smoothProgress}
              index={i}
            />
          ))}
        </AnimatePresence>

        {/* Cinematic Scrubber */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 z-50">
           <div className="font-mono text-[0.6rem] uppercase tracking-[0.6em] rotate-90 text-[#c29f6b]/40 mb-12">L'Histoire</div>
           <div className="h-64 w-px bg-[#0d0d0d]/10 relative">
              <motion.div
                 className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border border-[#c29f6b] bg-[#fdfaf5] rounded-full"
                 style={{ y: useTransform(smoothProgress, [0, 1], [0, 256]) }}
              />
           </div>
           <div className="font-mono text-[0.8rem] text-[#c29f6b] pt-4">{currentChapterLabel}</div>
        </div>
      </div>
    </div>
  );
};

const ChapterView = ({ chapter, progress, index }: { chapter: any, progress: any, index: number }) => {
  const isActive = useTransform(
    progress,
    [chapter.range[0], (chapter.range[0] + chapter.range[1]) / 2, chapter.range[1]],
    [0, 1, 0]
  );

  const scale = useTransform(
    progress,
    [chapter.range[0], (chapter.range[0] + chapter.range[1]) / 2, chapter.range[1]],
    [1.1, 1, 0.9]
  );

  const x = useTransform(
    progress,
    [chapter.range[0], (chapter.range[0] + chapter.range[1]) / 2, chapter.range[1]],
    [100, 0, -100]
  );

  return (
    <motion.div
      style={{ opacity: isActive, scale, x }}
      className="absolute inset-0 flex items-center justify-center p-24"
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

        <div className="lg:col-span-2 hidden lg:block">
           <motion.span
             className="font-serif italic text-[14rem] text-[#0d0d0d]/[0.02] leading-none select-none"
           >
             {chapter.number}
           </motion.span>
        </div>

        <div className="lg:col-span-8 text-center space-y-16 relative">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.4 }}
             className="absolute -top-32 left-0 font-serif italic text-2xl text-[#c29f6b] hidden lg:block"
          >
             Note du Parfumeur: {index === 0 ? "L'ouverture est électrique." : index === 1 ? "Le coeur est poudreux." : "Le sillage est éternel."}
          </motion.div>

          <motion.h3
            className="text-7xl md:text-[10rem] font-light text-[#0d0d0d] tracking-tighter leading-tight italic"
          >
            {chapter.data.headline}
          </motion.h3>
          <div className="w-24 h-px bg-[#c29f6b]/30 mx-auto" />
          <motion.p
            className="font-serif italic text-3xl md:text-5xl text-[#0d0d0d]/60 max-w-5xl mx-auto leading-relaxed"
          >
            {chapter.data.body}
          </motion.p>
        </div>

        <div className="lg:col-span-2" />
      </div>
    </motion.div>
  );
};
