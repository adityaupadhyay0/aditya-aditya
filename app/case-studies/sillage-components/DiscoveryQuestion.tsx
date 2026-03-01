'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSillage } from './SillageContext';
import { Archetype } from './sillageData';

export const DiscoveryQuestion: React.FC = () => {
  const { session, updateArchetype } = useSillage();
  const [show, setShow] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!answered && session.confidence < 0.65) {
        setShow(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [answered, session.confidence]);

  const questions = [
    {
      id: 'Q1',
      text: "Tell us one thing you remember and we'll find your scent.",
      options: [
        { text: "Something from childhood that made everything feel safe", archetype: 'the_romantic' as Archetype },
        { text: "A city in the rain", archetype: 'the_explorer' as Archetype },
        { text: "The morning before something important", archetype: 'the_collector' as Archetype },
        { text: "A room I haven't been in for years", archetype: 'the_romantic' as Archetype }
      ]
    }
  ];

  const handleAnswer = (archetype: Archetype) => {
    updateArchetype(archetype, 0.9, 'discovery_question_answered');
    setAnswered(true);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0a0908]/80 backdrop-blur-xl"
        >
          <div className="max-w-2xl w-full p-12 border border-[#c9a96e]/30 bg-[#161210] shadow-2xl space-y-12">
            <div className="space-y-6">
               <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#c9a96e]">A Single Question</span>
               <h3 className="text-4xl font-light text-[#f0ebe0] italic leading-tight">
                 {questions[0].text}
               </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {questions[0].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.archetype)}
                  className="p-6 border border-[#f0ebe0]/5 text-left font-serif italic text-lg text-[#f0ebe0]/60 hover:text-[#f0ebe0] hover:border-[#c9a96e]/30 hover:bg-[#c9a96e]/5 transition-all duration-500"
                >
                  "{option.text}"
                </button>
              ))}
            </div>
            <button
              onClick={() => setShow(false)}
              className="w-full font-mono text-[0.6rem] uppercase tracking-widest text-[#f0ebe0]/20 hover:text-[#f0ebe0] transition-colors pt-6"
            >
              [ Dismiss ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
