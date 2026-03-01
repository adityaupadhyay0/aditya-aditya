'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SillageProvider, useSillage } from './sillage-components/SillageContext';
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
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-multiply">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-[#b5893a]"
        style={{ scaleX }}
      />

      <CartPanel onComplete={() => setOrderConfirmed(true)} />
      <DiscoveryQuestion />

      <PresenceHero product={product} />

      <div ref={containerRef}>
        <section className="py-64 px-8 flex flex-col items-center border-b border-[#1c1713]/5">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2 }}
             className="max-w-4xl text-center space-y-16"
           >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.6em] text-[#b5893a]">The Wound</span>
              <h2 className="text-5xl md:text-8xl font-light italic leading-[1.1] text-balance">
                "Fragrance is the hardest product to sell online. It is invisible. It is subjective."
              </h2>
              <div className="w-px h-24 bg-gradient-to-b from-[#b5893a] to-transparent mx-auto" />
              <p className="font-serif italic text-2xl md:text-3xl text-[#1c1713]/60 leading-relaxed max-w-3xl mx-auto">
                This is not a disadvantage. This is the entire opportunity.
              </p>
           </motion.div>
        </section>

        <NotePyramid product={product} />

        <StoryArcScroll product={product} />

        <section className="py-64 flex flex-col items-center gap-48 border-t border-[#1c1713]/5">
           <ArtCraftToggle product={product} />

           <div className="flex flex-col items-center gap-16">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">Pillar 02 — Persona</span>
              <CTAButton />
           </div>
        </section>

        <LayeringBuilder />

        <section className="py-64 px-8 flex flex-col items-center border-t border-[#1c1713]/5 bg-[#f2ece0] relative">
            <div className="max-w-4xl w-full text-center space-y-24">
               <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#b5893a]">Post-Purchase</span>
               <h2 className="text-6xl md:text-8xl font-light italic leading-tight">Collective Intelligence</h2>
               <div className="flex justify-center pt-12">
                  <IntelligencePanel />
               </div>
            </div>

            <div className="mt-32">
               <button
                 onClick={() => setOrderConfirmed(true)}
                 className="group flex flex-col items-center gap-4 font-mono text-[0.6rem] uppercase tracking-widest text-[#1c1713]/20 hover:text-[#b5893a] transition-all duration-700"
               >
                  <span>[ Demo Checkout ]</span>
                  <div className="w-12 h-px bg-[#1c1713]/10 group-hover:bg-[#b5893a]/30 transition-all duration-700" />
               </button>
            </div>
        </section>
      </div>

      <footer className="py-32 px-12 border-t border-[#1c1713]/5 flex flex-col md:flex-row justify-between items-center gap-12 font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#1c1713]/40">
        <div className="flex items-center gap-12">
           <span className="italic tracking-[0.3em] font-serif text-xl text-[#1c1713]">SILLAGE</span>
           <span className="w-px h-6 bg-[#1c1713]/10 hidden md:block" />
           <span className="text-[0.6rem]">Paris · Grasse · London</span>
        </div>

        <div className="flex gap-16 items-center">
           <SoundToggle />
           <div className="flex items-center gap-8">
              <span className="hover:text-[#b5893a] transition-colors cursor-pointer text-[0.6rem]">The Collective</span>
              <span className="hover:text-[#b5893a] transition-colors cursor-pointer text-[0.6rem]">Sourcing</span>
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
      `}</style>
    </div>
  );
};

export default function SillageCaseStudy() {
  return (
    <SillageProvider>
      <SillageContent />
    </SillageProvider>
  );
}
