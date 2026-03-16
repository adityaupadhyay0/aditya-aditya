'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Cormorant_Garamond, Libre_Baskerville, Space_Mono, DM_Sans } from 'next/font/google';
import Diptych from './kavya-components/Diptych';
import TabExplosion from './kavya-components/TabExplosion';
import BrokenNetwork from './kavya-components/BrokenNetwork';
import KnowledgeGraveyard from './kavya-components/KnowledgeGraveyard';
import HandoffVisualizer from './kavya-components/HandoffVisualizer';
import DecisionLag from './kavya-components/DecisionLag';
import BacklogCounter from './kavya-components/BacklogCounter';
import DataJourney from './kavya-components/DataJourney';
import UXComparison from './kavya-components/UXComparison';
import LayerStack from './kavya-components/LayerStack';
import UnifiedDealSurface from './kavya-components/UnifiedDealSurface';
import LivingKnowledgeGraph from './kavya-components/LivingKnowledgeGraph';
import WorkflowOrchestration from './kavya-components/WorkflowOrchestration';
import DecisionSurface from './kavya-components/DecisionSurface';
import InstantInternalTooling from './kavya-components/InstantInternalTooling';
import NaturalLanguageData from './kavya-components/NaturalLanguageData';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville'
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
});

const KAVYA_COLORS = {
  bg: '#FAFAF7',
  bgWarm: '#F5F0E6',
  bgGold: '#FFFBF0',
  white: '#FFFFFF',
  gold: '#B8973A',
  silver: '#9BA3AF',
  ink: '#0F0F0D',
  mist: '#E8E4DC',
  shadowGold: 'rgba(184,151,58,0.08)',
};

const featureMatrix = [
  { layer: 'Integration', features: 'System Connectors · Unified Object Model · Auto Data Mapping', outcome: 'One surface. Zero reconciliation.' },
  { layer: 'Knowledge', features: 'Living Knowledge Graph · Contextual Memory · Document Linking', outcome: 'Knowledge that survives people.' },
  { layer: 'Workflow', features: 'Interpretable Engine · Context Routing · Autonomy Spectrum', outcome: 'Approvals in hours, not weeks.' },
  { layer: 'Decision', features: 'Scenario Simulation · Executive Narratives · Signal Processing', outcome: 'Decisions at the speed of questions.' },
  { layer: 'Creation', features: 'AI Interface Generation · Production Templates · Tool Promotion', outcome: 'Tools in seconds, not sprints.' },
  { layer: 'Data', features: 'Natural Language Layer · Source Attribution · Live Synthesis', outcome: 'Answers for everyone, not just engineers.' },
  { layer: 'Experience', features: 'Adaptive Interfaces · Role-Based Surfaces · Adoption-First Design', outcome: 'Software people choose to use.' },
];

export default function KavyaCaseStudy() {
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

  return (
    <div
      className={`
        ${cormorant.variable}
        ${libreBaskerville.variable}
        ${spaceMono.variable}
        ${dmSans.variable}
        min-h-screen bg-[#FAFAF7] text-[#0F0F0D] selection:bg-[#B8973A]/20 selection:text-[#0F0F0D]
        font-serif noise-bg
      `}
      style={{
        // @ts-ignore
        '--kavya-bg': KAVYA_COLORS.bg,
        '--kavya-bg-warm': KAVYA_COLORS.bgWarm,
        '--kavya-bg-gold': KAVYA_COLORS.bgGold,
        '--kavya-gold': KAVYA_COLORS.gold,
        '--kavya-silver': KAVYA_COLORS.silver,
        '--kavya-ink': KAVYA_COLORS.ink,
        '--kavya-mist': KAVYA_COLORS.mist,
      }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left bg-[#B8973A]"
        style={{ scaleX }}
      />

      <div ref={containerRef} className="relative">
         {/* Hero Section */}
         <section className="h-screen flex flex-col items-center justify-center px-8 text-center bg-[#FAFAF7]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#B8973A] mb-8 block">KAVYA</span>
              <h1 className="text-6xl md:text-9xl font-display italic leading-tight mb-12 text-[#0F0F0D]">
                The Operating Surface
              </h1>
              <p className="text-xl md:text-2xl font-serif font-light opacity-60 italic max-w-2xl mx-auto leading-relaxed">
                Enterprises do not fail because they lack tools. They fail because work is scattered across them.
              </p>
            </motion.div>
         </section>

         {/* Opening cinematic sequence */}
         <section className="min-h-screen py-32 bg-[#FAFAF7] flex flex-col items-center justify-center px-8">
            <div className="max-w-4xl mx-auto text-center mb-24">
               <div className="space-y-8 text-xl md:text-3xl font-serif italic leading-relaxed text-[#0F0F0D] opacity-80">
                  <p>Every enterprise in the world is running on the same quiet dysfunction.</p>
                  <p>Not because they lack tools. Because they have too many — and none of them talk to each other.</p>
                  <p>Right now, a sales rep has 11 tabs open to update one deal.</p>
                  <p>A manager is waiting three days for a report that should take three seconds.</p>
                  <p>An executive is making a $40 million decision using last quarter's data.</p>
               </div>
            </div>
            <TabExplosion />
         </section>

         {/* Act 1: The Problems */}
         <Diptych
            id="chapter-1"
            chapterNumber="I"
            headline="The Archaeology of Tuesday"
            featureCallouts={["Enterprise System Connectors", "Adaptive Unified Object Model", "Automatic Data Model Mapping", "Single Operational Surface"]}
            copy={
              <>
                <p>One hundred tools. One thousand, in the largest enterprises.</p>
                <p>Each one was acquired to solve a problem. Each one solved it — and created three more.</p>
                <p>CRM knows the customer's name. Finance knows their contract value. Marketing knows what they clicked on last Tuesday. Legal knows what they signed. Analytics knows that they're drifting.</p>
                <p>But none of these systems have ever been introduced to each other.</p>
                <p>So every morning, your most capable people do the work that infrastructure should do. They copy. They paste. They reconcile. They translate.</p>
                <p className="italic">The problem was never the shovel.</p>
              </>
            }
            demo={<BrokenNetwork />}
         />

         <Diptych
            id="chapter-2"
            chapterNumber="II"
            headline="The Library That Forgets"
            featureCallouts={["Company Knowledge Graph", "Contextual Organizational Memory", "People → Decision → Document Linking", "Living Knowledge Architecture"]}
            copy={
              <>
                <p>Every answer your company will ever need already exists inside it. This is not optimism. This is documentation.</p>
                <p>But the person who wrote it down left eighteen months ago. The Slack channel where it was discussed has been archived. The Google Doc it lived in was last edited by someone whose account no longer exists.</p>
                <p>Companies do not fail to generate knowledge. They fail to keep it alive.</p>
                <p>Every enterprise is hemorrhaging intelligence. Quietly. Continuously. At the cost of every repeated mistake.</p>
              </>
            }
            demo={<KnowledgeGraveyard />}
         />

         <Diptych
            id="chapter-3"
            chapterNumber="III"
            headline="The Handoff That Ate the Quarter"
            featureCallouts={["Interpretable Workflow Engine", "Cross-Department Routing", "Context-Attached Approvals", "Automated Coordination Chains"]}
            copy={
              <>
                <p>Enterprise work does not die in disasters. It dies in the space between desks.</p>
                <p>A deal is closed. A pricing exception is needed. The rep sends an email. The manager is traveling. Finance is CC'd. Finance needs legal sign-off first.</p>
                <p>Three weeks later: approved. The deal's momentum: already a memory.</p>
                <p>What was missing was not information. What was missing was infrastructure — a system capable of moving context through an organization at the speed that decisions require.</p>
              </>
            }
            demo={<HandoffVisualizer />}
         />

         <Diptych
            id="chapter-4"
            chapterNumber="IV"
            headline="The $40 Million Gut Feeling"
            featureCallouts={["Executive Decision Surfaces", "Scenario Simulation Engine", "Confidence Interval Modeling", "Historical Signal Analysis"]}
            copy={
              <>
                <p>Leaders today have access to more data than any decision-maker in human history. And they are still, at the critical moment, going with their gut.</p>
                <p>Not because they are reckless. But because by the time data reaches the room where the decision will be made — the window has already moved.</p>
                <p>Data without speed is not intelligence. It is history with excellent formatting.</p>
              </>
            }
            demo={<DecisionLag />}
         />

         <Diptych
            id="chapter-5"
            chapterNumber="V"
            headline="The Queue That Outlives Quarters"
            featureCallouts={["AI-Generated Interface Engine", "Production Template Library", "Zero Engineering Queue"]}
            copy={
              <>
                <p>Every team in your organization needs a tool that does not exist yet. A territory planner. A pricing calculator.</p>
                <p>So they file a ticket. Six weeks later, the tool ships. The requirements changed four weeks ago.</p>
                <p>The team has already built a workaround in Excel. This is how enterprise organizations calcify. Not in dramatic failures. In accumulated workarounds.</p>
              </>
            }
            demo={<BacklogCounter />}
         />

         <Diptych
            id="chapter-6"
            chapterNumber="VI"
            headline="The Four-Day Answer"
            featureCallouts={["Natural Language Data Interface", "Business Team Analytics Access", "Source-Attributed Instant Answers"]}
            copy={
              <>
                <p>A marketing director wants to know which campaign drove the most revenue last quarter. Simple question.</p>
                <p>She files a ticket. She waits. On day four, she receives a CSV with 14,000 rows and no explanation. She makes the decision based on what she remembers from the last all-hands.</p>
                <p>The data was there. The infrastructure was not built for her.</p>
              </>
            }
            demo={<DataJourney />}
         />

         <Diptych
            id="chapter-7"
            chapterNumber="VII"
            headline="The Software People Endure"
            featureCallouts={["Adaptive Role-Based Interfaces", "Consumer-Grade Enterprise UX", "Adoption-First Design System"]}
            copy={
              <>
                <p>Every morning, people close the apps they chose. They open the apps they were given.</p>
                <p>Enterprise software was not designed to be used. It was designed to be justified. Justified to procurement. To compliance. To IT.</p>
                <p>The difference is not aesthetic. It is 9 clicks multiplied by every action, every employee, every day.</p>
              </>
            }
            demo={<UXComparison />}
         />

         {/* Act 2: The Pattern Reveal */}
         <LayerStack />

         {/* Act 3: Kavya - The Hero */}
         <section className="min-h-screen py-32 bg-[#FFFFFF] flex flex-col items-center justify-center px-8 border-t border-[#E8E4DC]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="max-w-4xl text-center"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#B8973A] mb-12 block">THE HERO ENTERS</span>
              <h2 className="text-5xl md:text-8xl font-display italic leading-tight mb-16 text-[#0F0F0D]">
                Infrastructure <span className="text-[#B8973A]">designed for humans.</span>
              </h2>
              <div className="space-y-12 text-xl md:text-2xl font-serif italic leading-relaxed text-[#0F0F0D] opacity-70">
                <p>Kavya is not another enterprise tool. It is the operating surface that sits above your tools — and turns them into one coherent environment where work is visible, explainable, and executable.</p>
                <p>Connect your systems once. Let context travel automatically. Let knowledge accumulate and stay alive.</p>
              </div>
            </motion.div>
         </section>

         {/* Act 3: Solutions */}
         <Diptych
            chapterNumber="VIII"
            headline="The Deal Cockpit"
            featureCallouts={["Unified Operational Object", "Automatic Context Assembly", "Adaptive Surface Rendering"]}
            copy={
              <>
                <p>You connect your systems once. Kavya maps the data models automatically. Every tool becomes part of one operational object.</p>
                <p>For Sales, that's the Deal Cockpit — emails, conversations, pricing, documents, engagement signals, internal notes — all in one surface.</p>
                <p>Your rep closes eleven tabs. Opens one.</p>
              </>
            }
            demo={<UnifiedDealSurface />}
         />

         <Diptych
            chapterNumber="IX"
            headline="The Living Knowledge Graph"
            featureCallouts={["Knowledge Graph Architecture", "Contextual Memory", "Knowledge That Survives People"]}
            copy={
              <>
                <p>Kavya connects people, decisions, documents, customers, and results into a living graph.</p>
                <p>When someone asks why a discount was approved, Kavya shows the decision thread, the approver, the supporting data, and the comparable deals — instantly.</p>
                <p>Knowledge doesn't retire when people do.</p>
              </>
            }
            demo={<LivingKnowledgeGraph />}
         />

         <Diptych
            chapterNumber="X"
            headline="Interpretable Workflow Orchestration"
            featureCallouts={["Interpretable Workflow Engine", "Context-Attached Routing", "Full Audit Trail"]}
            copy={
              <>
                <p>When a rep requests a pricing exception, Kavya gathers the relevant context, routes it to the correct approver, attaches supporting data, tracks the chain, and updates the deal automatically.</p>
                <p>The 9-day approval becomes same-day. Every step remains visible. Humans stay in control.</p>
              </>
            }
            demo={<WorkflowOrchestration />}
         />

         <Diptych
            chapterNumber="XI"
            headline="Decision Surfaces for Leadership"
            featureCallouts={["Scenario Simulation Engine", "Executive Decision Narratives", "Real-Time Signal Processing"]}
            copy={
              <>
                <p>Kavya converts dashboards into decision surfaces. Leaders don't read reports — they explore outcomes.</p>
                <p>A CRO asks: "What happens if we shift 30% of budget to enterprise accounts?" Kavya simulates the result using historical signals.</p>
                <p>The answer arrives before the meeting ends.</p>
              </>
            }
            demo={<DecisionSurface />}
         />

         <Diptych
            chapterNumber="XII"
            headline="Instant Internal Tooling"
            featureCallouts={["AI Interface Generation", "Production Template Library", "Zero Engineering Queue"]}
            copy={
              <>
                <p>Users describe the tool they need. Kavya builds it. Territory planner, pricing calculator, campaign analyzer — generated in seconds, not weeks.</p>
                <p>If it proves useful, it's promoted to a permanent template. The engineering queue shrinks.</p>
              </>
            }
            demo={<InstantInternalTooling />}
         />

         <Diptych
            chapterNumber="XIII"
            headline="Natural Language Data Access"
            featureCallouts={["Natural Language Query Layer", "Source Attribution", "Real-Time Synthesis"]}
            copy={
              <>
                <p>Business teams ask questions in plain English. Kavya finds the answer. No SQL. No tickets. No CSV files. No waiting.</p>
                <p>The marketing director has her answer — with source attribution — before she finishes her coffee.</p>
              </>
            }
            demo={<NaturalLanguageData />}
         />

         {/* Closing Statement */}
         <section className="py-32 bg-[#FAFAF7] flex flex-col items-center justify-center px-8 border-t border-[#E8E4DC]">
            <div className="max-w-4xl text-center mb-24">
               <div className="space-y-12 text-xl md:text-3xl font-serif italic leading-relaxed text-[#0F0F0D] opacity-80">
                  <p>When Kavya is fully deployed, something changes that no dashboard can measure.</p>
                  <p>Employees stop navigating tools. They interact with work itself.</p>
                  <p>Context appears automatically. Knowledge stays alive. Decisions happen at the speed of questions.</p>
                  <p>The enterprise stops running on friction. It starts running on clarity.</p>
               </div>
            </div>

            {/* Feature Matrix */}
            <div className="w-full max-w-5xl mb-32 overflow-x-auto">
               <table className="w-full border-collapse">
                  <thead>
                     <tr className="border-b border-[#E8E4DC]">
                        <th className="text-left p-6 font-mono text-[0.7rem] uppercase tracking-widest text-[#9BA3AF]">Layer</th>
                        <th className="text-left p-6 font-mono text-[0.7rem] uppercase tracking-widest text-[#9BA3AF]">Kavya Feature Cluster</th>
                        <th className="text-left p-6 font-mono text-[0.7rem] uppercase tracking-widest text-[#9BA3AF]">Outcome</th>
                     </tr>
                  </thead>
                  <tbody>
                     {featureMatrix.map((row, i) => (
                        <tr key={i} className="border-b border-[#E8E4DC] hover:bg-white transition-colors">
                           <td className="p-6 font-display italic text-xl text-[#0F0F0D]">{row.layer}</td>
                           <td className="p-6 font-serif text-sm text-[#0F0F0D] opacity-70">{row.features}</td>
                           <td className="p-6 font-mono text-[0.7rem] uppercase tracking-widest text-[#B8973A] font-bold">{row.outcome}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* CTA */}
            <div className="text-center">
               <h3 className="text-3xl font-display italic mb-12">Which layer are you ready to unify first?</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="p-8 border border-[#B8973A]/20 bg-white hover:border-[#B8973A] transition-all group">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#B8973A] mb-4">START WITH SALES</p>
                     <p className="font-serif italic text-sm text-[#0F0F0D] mb-8">Deploy the Deal Cockpit to one team. Measure. Expand.</p>
                     <button className="font-mono text-[0.7rem] uppercase tracking-[0.2em] font-bold group-hover:text-[#B8973A] transition-colors">Begin Pilot →</button>
                  </div>
                  <div className="p-8 border border-[#B8973A]/20 bg-white hover:border-[#B8973A] transition-all group">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#B8973A] mb-4">TALK TO AN ARCHITECT</p>
                     <p className="font-serif italic text-sm text-[#0F0F0D] mb-8">Custom deployment scoped to your stack.</p>
                     <button className="font-mono text-[0.7rem] uppercase tracking-[0.2em] font-bold group-hover:text-[#B8973A] transition-colors">Schedule a Call →</button>
                  </div>
                  <div className="p-8 border border-[#B8973A]/20 bg-white hover:border-[#B8973A] transition-all group">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#B8973A] mb-4">TECHNICAL OVERVIEW</p>
                     <p className="font-serif italic text-sm text-[#0F0F0D] mb-8">APIs, SDKs, and integration specs.</p>
                     <button className="font-mono text-[0.7rem] uppercase tracking-[0.2em] font-bold group-hover:text-[#B8973A] transition-colors">View Docs →</button>
                  </div>
               </div>
            </div>
         </section>

      </div>

      <style jsx global>{`
        .font-display {
          font-family: var(--font-cormorant), serif;
        }
        .font-mono {
          font-family: var(--font-space-mono), monospace;
        }
        .font-serif {
          font-family: var(--font-libre-baskerville), serif;
        }
        .font-sans {
          font-family: var(--font-dm-sans), sans-serif;
        }

        .noise-bg::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
