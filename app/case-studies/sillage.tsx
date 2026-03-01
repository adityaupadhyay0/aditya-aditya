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

  // Global Soul Transition
  useEffect(() => {
    if (session.activeSoul) {
      document.documentElement.style.setProperty('--soul-color', session.activeSoul.color);
      document.documentElement.style.setProperty('--soul-secondary', session.activeSoul.secondaryColor);
    } else {
      document.documentElement.style.setProperty('--soul-color', '#fdfaf5');
      document.documentElement.style.setProperty('--soul-secondary', '#f7f3eb');
    }
  }, [session.activeSoul]);

  if (orderConfirmed) {
    return (
      <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[var(--soul-color)] text-[#0d0d0d] transition-colors duration-[2000ms]`}>
        <ConfirmationPage />
      </div>
    );
  }

  return (
    <div className={`${cormorant.variable} ${dmMono.variable} font-serif bg-[var(--soul-color)] text-[#0d0d0d] selection:bg-[#c29f6b]/20 selection:text-[#0d0d0d] antialiased transition-colors duration-[2000ms]`}>

      {/* Absolute Sensory Infrastructure */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] mix-blend-multiply overflow-hidden">
        <svg width="100%" height="100%">
          <filter id="masterGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#masterGrain)" />
        </svg>
      </div>

      {/* Moire / Botanical Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02] mix-blend-darken">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
               <pattern id="moire" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#0d0d0d" strokeWidth="0.05" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#0d0d0d" strokeWidth="0.02" />
               </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#moire)" />
         </svg>
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[1px] origin-left bg-[#c29f6b]"
        style={{ scaleX }}
      />

      <CartPanel onComplete={() => setOrderConfirmed(true)} />
      <DiscoveryQuestion />

      <PresenceHero product={product} />

      <div ref={containerRef}>
        <section className="py-[40vh] px-[10vw] flex flex-col items-center border-b border-[#0d0d0d]/5">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 3 }}
             className="max-w-[1600px] text-center space-y-48"
           >
              <div className="space-y-12">
                <span className="font-mono text-[0.6rem] uppercase tracking-[1.5em] text-[#c29f6b]">L'Essence du Temps</span>
                <div className="h-px w-48 bg-[#c29f6b]/20 mx-auto" />
              </div>

              <h2 className="text-[10vw] md:text-[18vw] font-light italic leading-[0.75] text-balance tracking-tighter">
                "The Soul of <span className="font-serif not-italic uppercase font-extralight">No. 3</span>"
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15vw] items-center pt-32">
                 <div className="text-left space-y-16">
                    <p className="font-serif italic text-4xl md:text-6xl text-[#0d0d0d]/30 leading-[1.1] max-w-4xl">
                       Fragrance is the only art form that exists <span className="text-[#0d0d0d]">inside</span> the viewer.
                    </p>
                    <div className="h-px w-24 bg-[#c29f6b]/40" />
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-[#0d0d0d]/40 max-w-md leading-loose">
                       We replace the grocery receipt of notes with a structural map of desire. A HexaDON signature.
                    </p>
                 </div>
                 <div className="flex justify-center">
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

        <section className="py-[30vh] flex flex-col items-center gap-[20vh] border-t border-[#0d0d0d]/5 bg-white/20">
           <ArtCraftToggle product={product} />

           <div className="flex flex-col items-center gap-32">
              <div className="text-center space-y-12">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.8em] text-[#c29f6b]">Consultation de Persona</span>
                <h3 className="font-serif italic text-6xl text-[#0d0d0d]/20 tracking-tighter">Align your unique frequency.</h3>
              </div>
              <CTAButton />
           </div>
        </section>

        <LayeringBuilder />

        <section className="py-[40vh] px-[10vw] flex flex-col items-center border-t border-[#0d0d0d]/5 bg-[var(--soul-color)] relative transition-colors duration-[2000ms]">
            <div className="max-w-[1800px] w-full text-center space-y-64">
               <div className="space-y-12">
                  <span className="font-mono text-[0.8rem] uppercase tracking-[1.2em] text-[#c29f6b]">L'Intelligence Collective</span>
                  <h2 className="text-[12vw] font-light italic leading-tight tracking-tighter uppercase font-serif font-extralight">Spirit.</h2>
               </div>
               <div className="flex justify-center">
                  <IntelligencePanel />
               </div>
            </div>

            <div className="mt-96">
               <button
                 onClick={() => setOrderConfirmed(true)}
                 className="group flex flex-col items-center gap-12 font-mono text-[0.6rem] uppercase tracking-[1em] text-[#0d0d0d]/10 hover:text-[#c29f6b] transition-all duration-1000"
               >
                  <span>[ Secure the Sillage ]</span>
                  <div className="w-48 h-px bg-[#0d0d0d]/5 group-hover:w-96 group-hover:bg-[#c29f6b]/20 transition-all duration-1000" />
               </button>
            </div>
        </section>
      </div>

      <footer className="py-64 px-24 border-t border-[#0d0d0d]/5 bg-white/40 flex flex-col md:flex-row justify-between items-end gap-32 font-mono text-[0.65rem] uppercase tracking-[0.8em] text-[#0d0d0d]/30">
        <div className="space-y-24 text-left">
           <div className="flex items-center gap-24">
              <span className="italic tracking-[0.5em] font-serif text-5xl text-[#0d0d0d] font-extralight">SILLAGE</span>
              <div className="space-y-4">
                 <p className="tracking-[0.4em]">Atelier de Paris v.4.2</p>
                 <p className="tracking-[0.4em]">Propriété de HexaDON</p>
              </div>
           </div>
           <p className="tracking-widest leading-loose max-w-xl opacity-40 italic font-serif text-lg">
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
          --sillage-bg: #fdfaf5;
          --sillage-ink: #0d0d0d;
          --sillage-gold: #c29f6b;
          --sillage-gold-dim: #a68b5a;
          --soul-color: #fdfaf5;
          --soul-secondary: #f7f3eb;
          --font-display: var(--font-cormorant);
          --font-mono: var(--font-dm-mono);
        }

        body {
          background-color: var(--sillage-bg);
          color: var(--sillage-ink);
          overflow-x: hidden;
          font-size: 13px; /* Reduced base size */
        }

        .font-display { font-family: var(--font-display); }
        .font-mono { font-family: var(--font-mono); }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c29f6b11; }

        @keyframes spin-slow {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
           animation: spin-slow 180s linear infinite;
        }

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
