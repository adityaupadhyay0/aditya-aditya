'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Cormorant_Garamond, DM_Sans, Cinzel } from 'next/font/google';
import DemoShell from './jewel-intelligence-components/DemoShell';
import AuthorityPanel from './jewel-intelligence-components/AuthorityPanel';
import PersonaPanel from './jewel-intelligence-components/PersonaPanel';
import PresencePanel from './jewel-intelligence-components/PresencePanel';
import InsightsPanel from './jewel-intelligence-components/InsightsPanel';
import BrandingPanel from './jewel-intelligence-components/BrandingPanel';
import UXPanel from './jewel-intelligence-components/UXPanel';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '700'], style: ['normal', 'italic'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cinzel' });

const pillars = [
  { id: '01', title: 'Authority', component: <AuthorityPanel /> },
  { id: '02', title: 'Persona', component: <PersonaPanel /> },
  { id: '03', title: 'Presence', component: <PresencePanel /> },
  { id: '04', title: 'Insights', component: <InsightsPanel /> },
  { id: '05', title: 'Branding', component: <BrandingPanel /> },
  { id: '06', title: 'UX/CX', component: <UXPanel /> },
];

export default function JewelIntelligence() {
  const [activePillar, setActivePillar] = useState('01');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-pillar');
          if (id) setActivePillar(id);
        }
      });
    }, { rootMargin: '-40% 0% -40% 0%' });

    const sections = document.querySelectorAll('[data-pillar]');
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable} font-sans bg-[#0e0c13] text-[#f2ece0] selection:bg-[#c9a84c]/30 overflow-x-hidden`}>
      <div className="fixed left-8 top-1/2 -translate-y-1/2 w-px h-40 bg-[#c9a84c]/10 z-[100] hidden md:block">
        <motion.div className="w-full bg-[#c9a84c] origin-top" style={{ height: '100%', scaleY }} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-[110] px-8 py-6 flex justify-between items-center backdrop-blur-md bg-[#0e0c13]/50 border-b border-[#c9a84c]/10">
        <span className="font-cinzel text-lg tracking-[0.2em] text-[#c9a84c]">JEWEL INTELLIGENCE</span>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center z-10 max-w-4xl">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.6em] text-[#c9a84c] mb-12 block">Case Study</span>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-12 leading-tight">Jewel Intelligence</h1>
          <p className="text-xl md:text-2xl font-sans font-light opacity-60 italic">"Every customer feels like your only customer."</p>
        </motion.div>
      </section>

      <div ref={containerRef} className="max-w-[1400px] mx-auto px-8 lg:px-24">
        {pillars.map((pillar, index) => (
          <section key={pillar.id} data-pillar={pillar.id} className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center py-32">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="font-cinzel text-[#c9a84c] text-xl">{pillar.id}</span>
                <h2 className="text-4xl md:text-6xl font-serif italic">{pillar.title}</h2>
              </div>
              <p className="text-lg font-sans font-light opacity-70">
                Pillar {pillar.id} of the Jewel Intelligence framework focusing on premium clienteling and operational excellence.
              </p>
            </div>
            <div className="h-[600px] w-full">
               <DemoShell activePillar={pillar.id} title={`${pillar.title} Demo`}>
                  {pillar.component}
               </DemoShell>
            </div>
          </section>
        ))}
      </div>

      <section className="py-64 px-8 border-t border-[#c9a84c]/10 text-center">
        <h2 className="text-4xl md:text-7xl font-serif italic mb-16">"Trust is the currency."</h2>
      </section>
    </div>
  );
}
