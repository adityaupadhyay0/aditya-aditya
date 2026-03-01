'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import { SILLAGE_PRODUCTS } from './sillage-components/sillageData';
import { Cormorant_Garamond, DM_Mono } from 'next/font/google';

// New Immersion Components
import { Immersion3D } from './sillage-components/Immersion3D';
import { SensoryOverlays } from './sillage-components/SensoryOverlays';
import { ArtisticExpression } from './sillage-components/ArtisticExpression';

// New Exposure Components
import { AccordGraphs } from './sillage-components/AccordGraphs';
import { NotesTree } from './sillage-components/NotesTree';
import { UsageGuide } from './sillage-components/UsageGuide';
import { WardrobeAlignment } from './sillage-components/WardrobeAlignment';

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
  const [activeIngredient, setActiveIngredient] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    if (session.activeSoul) {
      document.documentElement.style.setProperty('--soul-color', session.activeSoul.color);
      document.documentElement.style.setProperty('--soul-secondary', session.activeSoul.secondaryColor);
    } else {
      document.documentElement.style.setProperty('--soul-color', '#0a0908');
      document.documentElement.style.setProperty('--soul-secondary', '#161210');
    }
  }, [session.activeSoul]);

  if (orderConfirmed) {
    return (
      <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[#0a0908] text-white transition-colors duration-[2000ms]`}>
        <ConfirmationPage />
      </div>
    );
  }

  return (
    <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[#0a0908] text-white selection:bg-[#c29f6b]/20 selection:text-white antialiased transition-colors duration-[2000ms]`}>

      {/* Cinematic Sensory Infrastructure */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] mix-blend-screen overflow-hidden">
        <svg width="100%" height="100%">
          <filter id="ultraGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#ultraGrain)" />
        </svg>
      </div>

      <SensoryOverlays product={product} activeIngredient={activeIngredient} />

      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[1px] origin-left bg-[#c29f6b]"
        style={{ scaleX }}
      />

      <CartPanel onComplete={() => setOrderConfirmed(true)} />
      <DiscoveryQuestion />

      <PresenceHero product={product} />

      <div ref={containerRef}>

        {/* PILLAR 1: ARTS (IMMERSION) */}
        <section className="relative">
           <Immersion3D product={product} />

           <div className="py-[20vh] px-[10vw] flex flex-col items-center text-center gap-24 border-y border-white/5 bg-white/[0.01]">
              <span className="font-mono text-[0.6rem] uppercase tracking-[1.5em] text-[#c29f6b]">L'Art de Sillage</span>
              <h2 className="text-[10vw] font-light italic leading-none tracking-tighter">
                Immersion <span className="not-italic font-serif uppercase font-extralight text-white/40">Séquentielle</span>
              </h2>
              <p className="font-mono text-[0.8rem] uppercase tracking-[0.5em] text-white/30 max-w-xl leading-relaxed">
                As we cannot immerse the user in the real fragrance, we use the tools of color, texture, and geometry to translate the olfactory into the optical.
              </p>
           </div>

           <ArtisticExpression product={product} />
        </section>

        {/* Transition Point */}
        <section className="h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0908] to-[#0d0d0c] relative overflow-hidden">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 3 }}
             className="text-center space-y-8 relative z-10"
           >
              <span className="font-mono text-[0.5rem] uppercase tracking-[1em] text-[#c29f6b]/60">Le Passage</span>
              <h3 className="font-serif italic text-7xl text-white tracking-tighter">From Art to Craft.</h3>
              <div className="w-16 h-px bg-[#c29f6b]/40 mx-auto" />
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.8em] text-white/20">The subjective becomes structural.</p>
           </motion.div>

           <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 1000 1000" className="w-full h-full text-white">
                 <path d="M500,0 L500,1000 M0,500 L1000,500" stroke="currentColor" strokeWidth="0.5" />
              </svg>
           </div>
        </section>

        {/* PILLAR 2: CRAFT (EXPOSURE) */}
        <section className="bg-[#0d0d0c] border-t border-white/5">
           <div className="py-[20vh] flex flex-col items-center">
              <AccordGraphs accords={product.art_elements.accords || []} />
           </div>

           <NotesTree product={product} />

           <div className="py-[10vh] border-y border-white/5 bg-white/[0.01]">
              <UsageGuide product={product} />
           </div>

           <WardrobeAlignment product={product} />

           <div className="py-[20vh] flex flex-col items-center gap-32 border-t border-white/5">
              <div className="text-center space-y-12">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.8em] text-[#c29f6b]">Consultation de Persona</span>
                <h3 className="font-serif italic text-7xl text-white/20 tracking-tighter leading-none">Finalize your frequency.</h3>
              </div>
              <CTAButton />
           </div>
        </section>

        <LayeringBuilder />

        <section className="py-[40vh] px-[10vw] flex flex-col items-center border-t border-white/5 bg-[#0a0908] relative transition-colors duration-[2000ms]">
            <div className="max-w-[1800px] w-full text-center space-y-64">
               <div className="space-y-12">
                  <span className="font-mono text-[0.8rem] uppercase tracking-[1.2em] text-[#c29f6b]">L'Intelligence Collective</span>
                  <h2 className="text-[15vw] font-light italic leading-tight tracking-tighter uppercase font-serif font-extralight text-white/10">Spirit.</h2>
               </div>
               <div className="flex justify-center">
                  <IntelligencePanel />
               </div>
            </div>

            <div className="mt-[30vh]">
               <button
                 onClick={() => setOrderConfirmed(true)}
                 className="group flex flex-col items-center gap-12 font-mono text-[0.6rem] uppercase tracking-[1em] text-white/10 hover:text-[#c29f6b] transition-all duration-1000"
               >
                  <span>[ Secure the Sillage ]</span>
                  <div className="w-48 h-px bg-white/5 group-hover:w-[30vw] group-hover:bg-[#c29f6b]/20 transition-all duration-1000" />
               </button>
            </div>
        </section>
      </div>

      <footer className="py-64 px-24 border-t border-white/5 bg-[#0a0908] flex flex-col md:flex-row justify-between items-end gap-32 font-mono text-[0.65rem] uppercase tracking-[0.8em] text-white/30">
        <div className="space-y-24 text-left">
           <div className="flex items-center gap-24">
              <span className="italic tracking-[0.5em] font-serif text-6xl text-white font-extralight">SILLAGE</span>
              <div className="space-y-4">
                 <p className="tracking-[0.4em]">Atelier de Paris v.5.0</p>
                 <p className="tracking-[0.4em]">Maison de Fragrance</p>
              </div>
           </div>
           <p className="tracking-widest leading-loose max-w-xl opacity-40 italic font-serif text-2xl">
              "The customer who lands on a HexaDON experience does not feel sold to. They feel found."
           </p>
        </div>

        <div className="flex flex-col md:items-end gap-32">
           <SoundToggle onToggle={toggleSound} active={isPlaying} />
           <div className="flex items-center gap-24">
              <span className="hover:text-[#c29f6b] transition-colors cursor-pointer border-b border-transparent hover:border-[#c29f6b]/20 pb-2">Archive</span>
              <span className="hover:text-[#c29f6b] transition-colors cursor-pointer border-b border-transparent hover:border-[#c29f6b]/20 pb-2">Manifeste</span>
           </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --sillage-bg: #0a0908;
          --sillage-ink: #fdfaf5;
          --sillage-gold: #c29f6b;
          --sillage-gold-dim: #a68b5a;
          --soul-color: #0a0908;
          --soul-secondary: #161210;
          --font-display: var(--font-cormorant);
          --font-mono: var(--font-dm-mono);
        }

        body {
          background-color: var(--sillage-bg);
          color: var(--sillage-ink);
          overflow-x: hidden;
          font-size: 12px;
        }

        .perspective-1000 {
           perspective: 1000px;
        }

        .font-display { font-family: var(--font-display); }
        .font-mono { font-family: var(--font-mono); }

        ::-webkit-scrollbar { width: 1px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c29f6b22; }

        section {
           width: 100%;
           box-sizing: border-box;
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
