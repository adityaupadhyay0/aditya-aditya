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

  const chapters = [
    { id: 'opening', data: product.story_arc.opening, number: 'I', range: [0, 0.33] },
    { id: 'evolution', data: product.story_arc.evolution, number: 'II', range: [0.33, 0.66] },
    { id: 'signature', data: product.story_arc.signature, number: 'III', range: [0.66, 1] }
  ];

  const chapterValue = useTransform(smoothProgress, [0, 0.33, 0.66, 1], ["I", "I", "II", "III"]);

  useMotionValueEvent(chapterValue, "change", (latest) => {
    setCurrentChapterLabel(latest);
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#f2ece0]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Decorative Background Elements */}
        <motion.div
           style={{ rotate: useTransform(smoothProgress, [0, 1], [0, 45]) }}
           className="absolute w-[150%] h-[150%] border border-[#b5893a]/5 rounded-full pointer-events-none"
        />

        <AnimatePresence>
          {chapters.map((chapter) => (
            <ChapterView
              key={chapter.id}
              chapter={chapter}
              progress={smoothProgress}
            />
          ))}
        </AnimatePresence>

        {/* Floating Page Number */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <div className="h-12 w-px bg-[#b5893a]/20" />
           <span className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#b5893a]">
              Chapter {currentChapterLabel}
           </span>
        </div>
      </div>
    </div>
  );
};

const ChapterView = ({ chapter, progress }: { chapter: any, progress: any }) => {
  const opacity = useTransform(
    progress,
    [chapter.range[0], (chapter.range[0] + chapter.range[1]) / 2, chapter.range[1]],
    [0, 1, 0]
  );
  const y = useTransform(
    progress,
    [chapter.range[0], (chapter.range[0] + chapter.range[1]) / 2, chapter.range[1]],
    [100, 0, -100]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center p-8"
    >
      <div className="max-w-4xl w-full text-center space-y-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          className="absolute inset-0 flex items-center justify-center font-display text-[40vw] font-bold text-[#1c1713] pointer-events-none select-none"
        >
          {chapter.number}
        </motion.span>

        <div className="relative z-10 space-y-12">
          <motion.h3
            className="text-5xl md:text-8xl font-light text-[#1c1713] italic leading-tight"
          >
            {chapter.data.headline}
          </motion.h3>
          <motion.p
            className="font-serif italic text-2xl md:text-3xl text-[#1c1713]/60 max-w-2xl mx-auto leading-relaxed"
          >
            {chapter.data.body}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
