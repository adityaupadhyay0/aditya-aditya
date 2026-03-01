'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { SillageProvider, useSillage } from './sillage-components/SillageContext';
import { SillageAudioProvider, useSillageAudio } from './sillage-components/SillageAudio';
import { PresenceHero } from './sillage-components/PresenceHero';
import { NotePyramid } from './sillage-components/NotePyramid';
import { StoryArcScroll } from './sillage-components/StoryArcScroll';
import { ArtCraftToggle } from './sillage-components/ArtCraftToggle';
import { LayeringBuilder } from './sillage-components/LayeringBuilder';
import { DiscoveryQuestion } from './sillage-components/DiscoveryQuestion';
import { CartPanel } from './sillage-components/CartPanel';
import { CTAButton } from './sillage-components/CTAButton';
import { IntelligencePanel } from './sillage-components/IntelligencePanel';
import { SoundToggle } from './sillage-components/SoundToggle';
import { ConfirmationPage } from './sillage-components/ConfirmationPage';
import { NoteWeaver } from './sillage-components/NoteWeaver';
import { StageGraph } from './sillage-components/StageGraph';
import { SILLAGE_PRODUCTS } from './sillage-components/sillageData';
import { Cormorant_Garamond, DM_Mono } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono'
});

const SillageContent = () => {
  const { session } = useSillage();
  const { toggleSound, isPlaying } = useSillageAudio();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const product = SILLAGE_PRODUCTS['no3-before-rain'];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (orderConfirmed) {
    return (
      <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[#fdfaf5] text-[#0d0d0d]`}>
        <ConfirmationPage />
      </div>
    );
  }

  return (
    <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[#fdfaf5] text-[#0d0d0d] selection:bg-[#c29f6b]/20 selection:text-[#0d0d0d] antialiased`}>
      {/* Dynamic Soul Overlay */}
      <AnimatePresence>
         {session.activeSoul && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.08 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[10] pointer-events-none transition-colors duration-1000"
             style={{ backgroundColor: session.activeSoul.color }}
           />
         )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-[#c29f6b]"
        style={{ scaleX }}
      />

      <CartPanel onComplete={() => setOrderConfirmed(true)} />
      <DiscoveryQuestion />

      <PresenceHero product={product} />

      <div ref={containerRef}>
        <section className="py-[30vh] px-12 flex flex-col items-center bg-white/10 border-b border-[#0d0d0d]/5">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 2.5 }}
             className="max-w-[1400px] text-center space-y-32"
           >
              <div className="space-y-8">
                <span className="font-mono text-[0.7rem] uppercase tracking-[1em] text-[#c29f6b]">L'Origine du Parfum</span>
                <div className="h-px w-32 bg-[#c29f6b]/30 mx-auto" />
              </div>
              <h2 className="text-8xl md:text-[18rem] font-light italic leading-[0.8] text-balance tracking-tighter">
                "The Soul of No. 3"
              </h2>
              <div className="space-y-16">
                <p className="font-serif italic text-4xl md:text-5xl text-[#0d0d0d]/40 leading-tight max-w-[1200px] mx-auto">
                   You are not here to shop. You are here to be found.
                </p>
                <div className="flex justify-center pt-24">
                   <StageGraph accords={[
                      { label: 'ELECTRIC', value: 85 },
                      { label: 'POWDERY', value: 65 },
                      { label: 'GROUNDED', value: 90 },
                      { label: 'VERDANT', value: 45 },
                      { label: 'MINERAL', value: 75 }
                   ]} />
                </div>
              </div>
           </motion.div>
        </section>

        <NotePyramid product={product} />

        <NoteWeaver />

        <StoryArcScroll product={product} />

        <section className="py-96 flex flex-col items-center gap-64 border-t border-[#0d0d0d]/5 bg-white/40 backdrop-blur-sm">
           <ArtCraftToggle product={product} />

           <div className="flex flex-col items-center gap-24">
              <div className="text-center space-y-8">
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#c29f6b]">La Personnalité</span>
                <h3 className="font-serif italic text-5xl text-[#0d0d0d]/40">Align your frequency.</h3>
              </div>
              <CTAButton />
           </div>
        </section>

        <LayeringBuilder />

        <section className="py-96 px-12 flex flex-col items-center border-t border-[#0d0d0d]/5 bg-[#fdfaf5] relative">
            <div className="max-w-7xl w-full text-center space-y-48">
               <div className="space-y-12">
                  <span className="font-mono text-[0.8rem] uppercase tracking-[1em] text-[#c29f6b]">L'Intelligence Collective</span>
                  <h2 className="text-9xl md:text-[20rem] font-light italic leading-tight tracking-tighter text-balance">Data Spirit.</h2>
               </div>
               <div className="flex justify-center">
                  <IntelligencePanel />
               </div>
            </div>

            <div className="mt-64">
               <button
                 onClick={() => setOrderConfirmed(true)}
                 className="group flex flex-col items-center gap-8 font-mono text-[0.8rem] uppercase tracking-[0.5em] text-[#0d0d0d]/20 hover:text-[#c29f6b] transition-all duration-1000"
               >
                  <span>[ Secure the Sillage ]</span>
                  <div className="w-32 h-px bg-[#0d0d0d]/10 group-hover:w-64 group-hover:bg-[#c29f6b]/30 transition-all duration-1000" />
               </button>
            </div>
        </section>
      </div>

      <footer className="py-64 px-24 border-t border-[#0d0d0d]/5 bg-white/60 flex flex-col md:flex-row justify-between items-end gap-32 font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#0d0d0d]/40">
        <div className="space-y-16 text-left">
           <div className="flex items-center gap-16">
              <span className="italic tracking-[0.4em] font-serif text-4xl text-[#0d0d0d]">SILLAGE</span>
              <span className="w-px h-16 bg-[#0d0d0d]/10 hidden md:block" />
              <div className="space-y-4">
                 <p className="text-[0.7rem]">Paris Atelier v.4.2</p>
                 <p className="text-[0.7rem]">Maison Leroux</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:items-end gap-24">
           <SoundToggle onToggle={toggleSound} active={isPlaying} />
           <div className="flex items-center gap-16">
              <span className="hover:text-[#c29f6b] transition-colors cursor-pointer border-b border-transparent hover:border-[#c29f6b]/30 pb-1">Archive</span>
              <span className="hover:text-[#c29f6b] transition-colors cursor-pointer border-b border-transparent hover:border-[#c29f6b]/30 pb-1">Manifesto</span>
           </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --sillage-bg: #fdfaf5;
          --sillage-ink: #0d0d0d;
          --sillage-gold: #c29f6b;
          --sillage-gold-dim: #a68b5a;
          --font-display: var(--font-cormorant);
          --font-mono: var(--font-dm-mono);
        }

        body {
          background-color: var(--sillage-bg);
          color: var(--sillage-ink);
          overflow-x: hidden;
          font-size: 14px;
        }

        .font-display { font-family: var(--font-display); }
        .font-mono { font-family: var(--font-mono); }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--sillage-bg); }
        ::-webkit-scrollbar-thumb { background: #c29f6b22; }

        @keyframes spin-slow {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
           animation: spin-slow 120s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function SillageCaseStudy() {
  return (
    <SillageAudioProvider>
      <SillageProvider>
        <SillageContent />
      </SillageProvider>
    </SillageAudioProvider>
  );
}
