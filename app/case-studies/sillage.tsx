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
    return <ConfirmationPage />;
  }

  return (
    <div className="bg-[#0a0908] text-[#f0ebe0] font-serif selection:bg-[#c9a96e]/20">
      <motion.div className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left bg-[#c9a96e]" style={{ scaleX }} />

      <CartPanel onComplete={() => setOrderConfirmed(true)} />
      <DiscoveryQuestion />

      <PresenceHero product={product} />

      <div ref={containerRef}>
        <section className="py-32 px-6 flex flex-col items-center border-b border-[#f0ebe0]/5">
           <div className="max-w-4xl text-center space-y-12">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#8a6e44]">The Wound</span>
              <h2 className="text-5xl md:text-7xl font-light italic leading-tight text-balance">
                "Fragrance is the hardest product to sell online. It is invisible. It is subjective."
              </h2>
           </div>
        </section>

        <NotePyramid product={product} />

        <StoryArcScroll product={product} />

        <section className="py-64 flex flex-col items-center gap-24 border-t border-[#f0ebe0]/5">
           <ArtCraftToggle product={product} />
           <CTAButton />
        </section>

        <LayeringBuilder />

        <section className="py-64 px-6 flex flex-col items-center border-t border-[#f0ebe0]/5">
            <IntelligencePanel />
            <button onClick={() => setOrderConfirmed(true)} className="mt-12 font-mono text-[0.5rem] uppercase tracking-widest text-[#c9a96e]/20 hover:text-[#c9a96e]"> [ Demo Checkout ] </button>
        </section>
      </div>

      <footer className="py-32 px-12 border-t border-[#f0ebe0]/5 flex flex-col md:flex-row justify-between items-center gap-12 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#f0ebe0]/30">
        <span className="italic tracking-widest text-[#f0ebe0]/60">SILLAGE — PARIS</span>
        <div className="flex gap-12">
           <SoundToggle />
        </div>
      </footer>
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
