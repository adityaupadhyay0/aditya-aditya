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
    }, 10000); // Show earlier for demo
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
    updateArchetype(archetype, 0.95, 'discovery_question_answered');
    setAnswered(true);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-[#f2ece0]/95 backdrop-blur-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl w-full p-24 bg-white border border-[#b5893a]/10 shadow-[0_50px_150px_rgba(0,0,0,0.1)] space-y-24 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b5893a] to-transparent" />

            <div className="space-y-12 text-center">
               <span className="font-mono text-[0.7rem] uppercase tracking-[0.6em] text-[#b5893a]">Context Engine</span>
               <h3 className="text-5xl md:text-7xl font-light text-[#1c1713] italic leading-tight text-balance">
                 {questions[0].text}
               </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {questions[0].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.archetype)}
                  className="group p-10 border border-[#1c1713]/5 text-center font-serif italic text-2xl text-[#1c1713]/40 hover:text-[#1c1713] hover:border-[#b5893a]/40 hover:bg-white transition-all duration-700"
                >
                  "{option.text}"
                </button>
              ))}
            </div>

            <button
              onClick={() => setShow(false)}
              className="w-full font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#1c1713]/20 hover:text-[#1c1713] transition-all duration-700 pt-12"
            >
              [ I know my frequency ]
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
