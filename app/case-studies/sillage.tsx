'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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
import { ScentLab } from './sillage-components/ScentLab';
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
      <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[#f2ece0] text-[#1c1713]`}>
        <ConfirmationPage />
      </div>
    );
  }

  return (
    <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[#f2ece0] text-[#1c1713] selection:bg-[#b5893a]/20 selection:text-[#1c1713] antialiased`}>
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-[#b5893a]"
        style={{ scaleX }}
      />

      <CartPanel onComplete={() => setOrderConfirmed(true)} />
      <DiscoveryQuestion />

      <PresenceHero product={product} />

      <div ref={containerRef}>
        <section className="py-[30vh] px-12 flex flex-col items-center border-b border-[#1c1713]/5 bg-white/20">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 2 }}
             className="max-w-6xl text-center space-y-24"
           >
              <div className="space-y-6">
                <span className="font-mono text-[0.8rem] uppercase tracking-[1em] text-[#b5893a]">Part I: The Wound</span>
                <div className="h-px w-24 bg-[#b5893a]/30 mx-auto" />
              </div>
              <h2 className="text-8xl md:text-[14rem] font-light italic leading-[0.9] text-balance tracking-tighter">
                "Fragrance is invisible. It cannot be sampled through a screen."
              </h2>
           </motion.div>
        </section>

        <NotePyramid product={product} />

        <ScentLab />

        <StoryArcScroll product={product} />

        <section className="py-64 flex flex-col items-center gap-64 border-t border-[#1c1713]/5 bg-white/40 backdrop-blur-sm">
           <ArtCraftToggle product={product} />

           <div className="flex flex-col items-center gap-24">
              <div className="text-center space-y-6">
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#b5893a]">Pillar 02 — Persona</span>
                <h3 className="font-serif italic text-4xl text-[#1c1713]/40">Align your frequency.</h3>
              </div>
              <CTAButton />
           </div>
        </section>

        <LayeringBuilder />

        <section className="py-64 px-12 flex flex-col items-center border-t border-[#1c1713]/5 bg-[#f2ece0] relative">
            <div className="max-w-6xl w-full text-center space-y-32">
               <div className="space-y-8">
                  <span className="font-mono text-[0.8rem] uppercase tracking-[0.8em] text-[#b5893a]">Pillar 05 — Insights</span>
                  <h2 className="text-9xl md:text-[14rem] font-light italic leading-tight tracking-tighter">Collective Intel.</h2>
               </div>
               <div className="flex justify-center">
                  <IntelligencePanel />
               </div>
            </div>

            <div className="mt-48">
               <button
                 onClick={() => setOrderConfirmed(true)}
                 className="group flex flex-col items-center gap-6 font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#1c1713]/20 hover:text-[#b5893a] transition-all duration-1000"
               >
                  <span>[ Secure the Sillage ]</span>
                  <div className="w-24 h-px bg-[#1c1713]/10 group-hover:w-48 group-hover:bg-[#b5893a]/30 transition-all duration-1000" />
               </button>
            </div>
        </section>
      </div>

      <footer className="py-48 px-24 border-t border-[#1c1713]/5 bg-white/60 flex flex-col md:flex-row justify-between items-end gap-24 font-mono text-[0.8rem] uppercase tracking-[0.6em] text-[#1c1713]/40">
        <div className="space-y-12">
           <div className="flex items-center gap-12">
              <span className="italic tracking-[0.4em] font-serif text-3xl text-[#1c1713]">SILLAGE</span>
              <span className="w-px h-12 bg-[#1c1713]/10 hidden md:block" />
              <div className="space-y-2">
                 <p className="text-[0.6rem]">High-Authority Infrastructure</p>
                 <p className="text-[0.6rem]">By Aditya & Aditya</p>
              </div>
           </div>
           <p className="text-[0.5rem] tracking-widest leading-loose max-w-sm opacity-60">
              The customer who lands on a HexaDON experience does not feel sold to. They feel found.
           </p>
        </div>

        <div className="flex flex-col md:items-end gap-16">
           <SoundToggle onToggle={toggleSound} active={isPlaying} />
           <div className="flex items-center gap-12">
              <span className="hover:text-[#b5893a] transition-colors cursor-pointer border-b border-transparent hover:border-[#b5893a]/30 pb-1">Archive</span>
              <span className="hover:text-[#b5893a] transition-colors cursor-pointer border-b border-transparent hover:border-[#b5893a]/30 pb-1">Philosophy</span>
           </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --sillage-bg: #f2ece0;
          --sillage-ink: #1c1713;
          --sillage-gold: #b5893a;
          --sillage-gold-dim: #8a6e44;
          --font-display: var(--font-cormorant);
          --font-mono: var(--font-dm-mono);
        }

        body {
          background-color: var(--sillage-bg);
          color: var(--sillage-ink);
        }

        .font-display { font-family: var(--font-display); }
        .font-mono { font-family: var(--font-mono); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--sillage-bg); }
        ::-webkit-scrollbar-thumb { background: #b5893a22; }
        ::-webkit-scrollbar-thumb:hover { background: #b5893a44; }
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
