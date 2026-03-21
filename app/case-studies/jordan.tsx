'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Bebas_Neue, DM_Serif_Display, Manrope } from 'next/font/google';

// Components
import SceneHero from './jordan-components/SceneHero';
import SceneConfession from './jordan-components/SceneConfession';
import SceneStack from './jordan-components/SceneStack';
import SceneReveal from './jordan-components/SceneReveal';
import SceneDayOne from './jordan-components/SceneDayOne';
import SceneDemo from './jordan-components/SceneDemo';
import SceneTruth from './jordan-components/SceneTruth';
import SceneForecast from './jordan-components/SceneForecast';
import SceneModular from './jordan-components/SceneModular';
import SceneCTA from './jordan-components/SceneCTA';

// Fonts setup
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas'
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-dm-serif'
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-manrope'
});

export default function JordanCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      className={`
        ${bebas.variable}
        ${dmSerif.variable}
        ${manrope.variable}
        min-h-screen bg-[#050507] text-[#F5F2EC] selection:bg-[#C9A84C]/30 selection:text-[#F5F2EC]
        font-sans overflow-x-hidden relative
      `}
      style={{
        // @ts-ignore
        '--black': '#050507',
        '--black-2': '#0A0A0F',
        '--black-3': '#0F0F18',
        '--white': '#F5F2EC',
        '--cream': '#C8C3B8',
        '--muted': '#6B6760',
        '--gold': '#C9A84C',
        '--gold-light': '#E8C97A',
        '--gold-dim': 'rgba(201,168,76,0.10)',
        '--gold-glow': 'rgba(201,168,76,0.22)',
        '--glass': 'rgba(245,242,236,0.04)',
        '--glass-border': 'rgba(245,242,236,0.07)',
        '--t-display': 'clamp(80px, 12vw, 160px)',
        '--t-hero': 'clamp(48px, 7vw, 96px)',
        '--t-h2': 'clamp(32px, 4vw, 56px)',
        '--t-h3': 'clamp(20px, 2.5vw, 28px)',
        '--t-body': 'clamp(15px, 1.2vw, 17px)',
        '--t-small': '12px',
        '--t-label': '11px',
        '--s-xs': '8px',
        '--s-sm': '16px',
        '--s-md': '32px',
        '--s-lg': '64px',
        '--s-xl': '120px',
        '--s-2xl': '200px',
        '--ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        '--ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <div id="scroll-progress" className="fixed right-0 top-0 w-[2px] h-screen bg-[var(--glass-border)] z-[200]">
        <motion.div
          id="scroll-progress-fill"
          className="w-full bg-[var(--gold)] origin-top"
          style={{ scaleY }}
        />
      </div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.035]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>
      </div>

      <div ref={containerRef} className="relative z-10">
        <Nav />

        <SceneHero />
        <SceneConfession />
        <SceneStack />
        <SceneReveal />
        <SceneDayOne />
        <SceneDemo />
        <SceneTruth />
        <SceneForecast />
        <SceneModular />
        <SceneCTA />
      </div>

      <style jsx global>{`
        :root {
          --font-bebas: 'Bebas Neue', sans-serif;
          --font-dm-serif: 'DM Serif Display', serif;
          --font-manrope: 'Manrope', sans-serif;
        }
        .font-display { font-family: var(--font-bebas); }
        .font-serif { font-family: var(--font-dm-serif); }
        .font-sans { font-family: var(--font-manrope); }

        body {
          background-color: #050507;
          color: #F5F2EC;
        }
      `}</style>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[150] px-8 py-6 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[var(--black)]/85 border-b border-[var(--glass-border)]' : ''
      }`}
    >
      <span className="font-display text-[18px] text-[var(--gold)] tracking-widest font-bold">JORDAN</span>
      <button className="bg-transparent border border-[var(--glass-border)] text-[var(--cream)] px-4 py-2 rounded-full text-[12px] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
        Request Access →
      </button>
    </nav>
  );
}

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .score-row, .confession-card, .module-card, .tab-card, .cta-button, .interactive-trigger');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        id="cursor-dot"
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-[var(--gold)] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.1 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        id="cursor-ring"
        className="fixed top-0 left-0 w-[48px] h-[48px] border border-[var(--gold)] rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.5,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 0.5 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
