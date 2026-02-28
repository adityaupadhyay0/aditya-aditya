'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Tier = 'top' | 'heart' | 'base';

type Note = {
  name: string;
  feeling: string;
  occasion: string;
  color: string;
  energy: string;
  durationLabel: string;
};

const dna = {
  id: 'no3-before-rain',
  name: 'No. 3',
  title: 'Before Rain',
  tagline: 'The scent of a sky about to open.',
  storyArc: {
    opening: {
      headline: 'A stillness in the air.',
      body: 'Something electric and clean arrives before you understand what it is. This is the moment before the storm — that specific quality of charged silence.',
    },
    evolution: {
      headline: 'The cool resolves into warmth.',
      body: 'Root and earth rise slowly, as if the ground itself is responding. The sharp gives way to the considered. This is the scent settling into your skin.',
    },
    signature: {
      headline: 'This is what it feels like to be the calm before the storm.',
      body: "What remains is not dramatic. It is assured. Worn by the person who doesn't need to enter a room loudly.",
    },
  },
  notes: {
    top: [
      {
        name: 'Petrichor Accord',
        feeling: 'Rain on dry earth. A breath held.',
        occasion: 'The moment before everything changes.',
        color: '#e8d5a3',
        energy: 'electric',
        durationLabel: '0–30 minutes',
      },
      {
        name: 'Aldehydes',
        feeling: 'Cool. Metallic light through cloud cover.',
        occasion: 'First impressions. Sharp clarity.',
        color: '#d4e8f0',
        energy: 'cool',
        durationLabel: '0–20 minutes',
      },
    ] as Note[],
    heart: [
      {
        name: 'Iris Root Absolute',
        feeling: 'Powdered stone. Quiet, unreachable elegance.',
        occasion: "The second hour of a dinner you didn't want to leave.",
        color: '#c4956a',
        energy: 'refined',
        durationLabel: '30 min – 5 hours',
      },
      {
        name: 'Violet Leaf',
        feeling: 'Green-edged. A garden after a storm has moved through.',
        occasion: 'Afternoons. Considered solitude.',
        color: '#9ea87a',
        energy: 'verdant',
        durationLabel: '1 – 4 hours',
      },
    ] as Note[],
    base: [
      {
        name: 'Vetiver Bourbon',
        feeling: 'Smoke and soil. The ground after rain has passed.',
        occasion: 'Evening. Whatever comes after.',
        color: '#5c3d2e',
        energy: 'grounded',
        durationLabel: '5 hours → forever',
      },
      {
        name: 'Ambrette Seed',
        feeling: 'Skin-warm. Something intimate and barely there.',
        occasion: 'The end of the day. What stays.',
        color: '#7a4f35',
        energy: 'intimate',
        durationLabel: '6 hours → forever',
      },
    ] as Note[],
  },
  craft: {
    concentration: '23%',
    concentrationLabel: 'Eau de Parfum Intense',
    iterations: 47,
    perfumer: 'Maison Leroux, Grasse',
    batchSize: 400,
    sourcing: {
      iris: {
        label: 'Florence, Italy.',
        detail: 'The iris root requires three years in the ground before it can be harvested. This is the root, not the flower.',
      },
      vetiver: {
        label: 'Réunion Island.',
        detail: 'Distilled slowly for depth and warmth with no rushed fraction cuts.',
      },
      aldehydes: {
        label: 'Synthesised in-house.',
        detail: 'Batch controlled for consistency while preserving brightness.',
      },
    },
  },
  layering: [
    {
      id: 'no1-cedar-smoke',
      name: 'No. 1 — Cedar & Smoke',
      feeling: 'Deepens the base. Adds weight for evening.',
      effect: 'Evening authority',
      price: 130,
      sprays: 'One spray to base of throat',
    },
    {
      id: 'no7-white-suede',
      name: 'No. 7 — White Suede',
      feeling: 'Softens the top. Weekend, not boardroom.',
      effect: 'Sunday softness',
      price: 125,
      sprays: 'One spray to chest',
    },
  ],
  wearGuide: {
    tip: 'Apply to bare skin before dressing. The warmth of your body is the final ingredient.',
  },
};

const chapterMap: Array<{ key: keyof typeof dna.storyArc; chapter: string; tint: string }> = [
  { key: 'opening', chapter: '01', tint: 'linear-gradient(160deg, rgba(232,213,163,0.09), rgba(212,232,240,0.02))' },
  { key: 'evolution', chapter: '02', tint: 'linear-gradient(160deg, rgba(196,149,106,0.09), rgba(158,168,122,0.02))' },
  { key: 'signature', chapter: '03', tint: 'linear-gradient(160deg, rgba(92,61,46,0.11), rgba(122,79,53,0.03))' },
];

const tierOrder: Tier[] = ['top', 'heart', 'base'];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default function SillageCaseStudy() {
  const reduced = useReducedMotion();
  const [soundOn, setSoundOn] = useState(false);
  const detectArrival = () => {
    if (typeof window === 'undefined') return 'direct';
    if (document.referrer.includes('instagram') || window.location.search.includes('ig')) return 'instagram';
    if (document.referrer.includes('google')) return 'google';
    if (window.location.search.includes('email')) return 'email';
    return 'direct';
  };

  const [selectedTab, setSelectedTab] = useState<'art' | 'craft'>(() =>
    detectArrival() === 'google' || detectArrival() === 'direct' ? 'craft' : 'art',
  );
  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
  const [hoveredTier, setHoveredTier] = useState<Tier | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showWatermark, setShowWatermark] = useState(false);
  const [stack, setStack] = useState<string[]>([]);
  const [arrivedFrom] = useState(() => detectArrival());
  const [archetypeOverride, setArchetypeOverride] = useState<string | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [inConfirmation, setInConfirmation] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowQuestion(true), 180000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      setScrollProgress(clamp(progress, 0, 1));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const archetype = useMemo(() => {
    if (archetypeOverride) return archetypeOverride;
    if (arrivedFrom === 'google' || arrivedFrom === 'direct') return 'the_collector';
    if (arrivedFrom === 'instagram') return 'the_romantic';
    if (arrivedFrom === 'email') return 'the_returner';
    return 'the_romantic';
  }, [archetypeOverride, arrivedFrom]);

  const background = useMemo(() => {
    const top = `rgba(232,213,163,${0.01 + scrollProgress * 0.03})`;
    const heart = `rgba(196,149,106,${Math.max(0, 0.045 - Math.abs(scrollProgress - 0.5) * 0.12)})`;
    const base = `rgba(92,61,46,${Math.max(0, (scrollProgress - 0.6) * 0.1)})`;
    return `radial-gradient(circle at 20% 0%, ${top}, transparent 40%), radial-gradient(circle at 80% 45%, ${heart}, transparent 55%), radial-gradient(circle at 50% 100%, ${base}, transparent 65%), #0a0908`;
  }, [scrollProgress]);

  const playTone = useCallback(
    async (tier: Tier) => {
      if (!soundOn) {
        return;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const now = ctx.currentTime;
      const config = {
        top: { freq: 980, release: 0.2, type: 'triangle' as OscillatorType, q: 15 },
        heart: { freq: 440, release: 0.4, type: 'sine' as OscillatorType, q: 8 },
        base: { freq: 120, release: 0.8, type: 'sawtooth' as OscillatorType, q: 4 },
      }[tier];

      osc.type = config.type;
      osc.frequency.setValueAtTime(config.freq, now);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(config.q, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + config.release);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + config.release);
    },
    [soundOn],
  );

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setShowWatermark(true);
    setTimeout(() => setShowWatermark(false), 2500);
  };

  const basePrice = 165;
  const stackTotal = stack.reduce((sum, id) => {
    const fragrance = dna.layering.find((item) => item.id === id);
    return sum + (fragrance?.price ?? 0);
  }, basePrice);

  if (inConfirmation) {
    return (
      <div className="min-h-screen px-6 py-20 md:px-12" style={{ background: '#0a0908', color: '#f0ebe0' }}>
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-4xl italic md:text-6xl">It is on its way to you.</h1>
          <p className="mb-8 text-center font-mono text-sm uppercase tracking-[0.3em] text-[#8a6e44]">No. 3 — Before Rain · Arriving within 3 days</p>
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg italic text-[#c9a96e]">{dna.wearGuide.tip}</p>

          <section className="rounded-xl border border-[#c9a96e]/30 bg-[#0f0d0b] p-6 font-mono text-sm leading-relaxed shadow-[0_0_40px_rgba(201,169,110,0.08)]">
            <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c9a96e]">SILLAGE · SESSION INTELLIGENCE</h2>
            <p>ARRIVAL          {arrivedFrom}</p>
            <p>ARCHETYPE        {archetype.replaceAll('_', ' ')}</p>
            <p>INTENT           Self — a serious purchase</p>
            <p>LTV PROJECTION   £840 over 24 months</p>
            <p className="mt-6">NEXT ENGAGEMENT</p>
            <p>T+14 days: A note on wearing No. 3 in winter</p>
            <p>T+30 days: Early access to No. 4</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden px-6 pb-24 pt-10 md:px-12" style={{ background, color: '#f0ebe0' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8a6e44]">Sillage, Paris · No. 3</span>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/30 px-4 py-2 text-sm"
            onClick={async () => {
              if (!soundOn && audioContextRef.current?.state === 'suspended') {
                await audioContextRef.current.resume();
              }
              setSoundOn((prev) => !prev);
            }}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundOn ? 'Sound On' : 'Sound Off'}</span>
          </button>
        </div>

        <section className="mb-20 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div initial={{ opacity: 0, y: reduced ? 0 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#c9a96e]">{arrivedFrom === 'instagram' ? 'Some things you feel before you understand them.' : 'A HexaDON × DTC fragrance experience'}</p>
            <h1 className="text-5xl italic leading-tight md:text-7xl">
              {dna.name} — <span className="text-[#c9a96e]">{dna.title}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg italic text-[#d8ccb8]">{dna.tagline}</p>
            <button
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-[#c9a96e]"
              onClick={() => setInConfirmation(true)}
            >
              Begin Your Bottle <ArrowRight size={14} />
            </button>
          </motion.div>

          <div className="rounded-2xl border border-[#c9a96e]/20 bg-[#161210]/70 p-6 backdrop-blur">
            <div className="mb-5 flex gap-3">
              {(['art', 'craft'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] ${selectedTab === tab ? 'bg-[#c9a96e] text-black' : 'bg-transparent text-[#c9a96e]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedTab === 'art' ? (
                <motion.div key="art" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="mb-2 text-2xl italic">{dna.storyArc.opening.headline}</h3>
                  <p className="text-[#d8ccb8]">{dna.storyArc.opening.body}</p>
                </motion.div>
              ) : (
                <motion.div key="craft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  <p>{dna.craft.concentration} concentration — {dna.craft.concentrationLabel}</p>
                  <p>{dna.craft.iterations} iterations before this formula was approved.</p>
                  <p>Composed by {dna.craft.perfumer} — the home of modern perfumery.</p>
                  <p>One batch. {dna.craft.batchSize} bottles. When it is gone, it is gone.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className="mb-20 rounded-2xl border border-[#c9a96e]/20 bg-[#100e0c]/70 p-6">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#c9a96e]">Interactive Note Pyramid</h2>
          <div className="space-y-3">
            {tierOrder.map((tier, idx) => {
              const notes = dna.notes[tier];
              const widthClass = idx === 0 ? 'w-[48%]' : idx === 1 ? 'w-[72%]' : 'w-full';

              return (
                <div
                  key={tier}
                  onMouseEnter={() => setHoveredTier(tier)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`mx-auto rounded-xl border border-[#c9a96e]/20 p-4 transition ${widthClass}`}
                  style={{
                    background: `linear-gradient(90deg, ${notes[0].color}22, ${notes[1].color}22)`,
                    opacity: hoveredTier === tier ? 1 : 0.85,
                  }}
                >
                  <div className="flex flex-wrap gap-2">
                    {notes.map((note) => (
                      <button
                        key={note.name}
                        onMouseEnter={() => {
                          setHoveredNote(note);
                          playTone(tier);
                        }}
                        onMouseLeave={() => setHoveredNote(null)}
                        onClick={() => handleNoteClick(note)}
                        className="rounded-full border border-[#c9a96e]/40 px-3 py-1 text-sm"
                      >
                        {note.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {hoveredTier && <p className="mt-4 text-right text-sm text-[#c9a96e]">Lasts {dna.notes[hoveredTier][0].durationLabel} on skin.</p>}
          {hoveredNote && (
            <div className="mt-6 rounded-xl border border-[#c9a96e]/20 bg-[#0f0d0b] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c9a96e]">{hoveredNote.energy}</p>
              <p className="italic">{hoveredNote.feeling}</p>
              <p className="text-[#c3b6a0]">{hoveredNote.occasion}</p>
            </div>
          )}
        </section>

        <section className="mb-20 space-y-8">
          {chapterMap.map((chapter) => (
            <motion.article
              key={chapter.chapter}
              initial={{ opacity: 0, y: reduced ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border border-[#c9a96e]/15 p-8"
              style={{ background: chapter.tint }}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-[#8a6e44]">{chapter.chapter}</p>
              <h3 className="mt-3 text-4xl italic">{dna.storyArc[chapter.key].headline}</h3>
              <p className="mt-3 text-lg italic text-[#d9cfbf]">{dna.storyArc[chapter.key].body}</p>
            </motion.article>
          ))}
        </section>

        <section className="mb-20 rounded-2xl border border-[#c9a96e]/20 bg-[#161210]/65 p-8">
          <h2 className="mb-6 text-3xl italic">Layering Builder</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-[#c9a96e]/20 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a6e44]">Your Foundation</p>
              <h3 className="mt-2 text-2xl italic">No. 3 — Before Rain</h3>
              <p className="mt-2 text-[#c3b6a0]">Two sprays · Inner wrists</p>
            </div>
            <div className="space-y-4">
              {dna.layering.map((item) => {
                const active = stack.includes(item.id);
                return (
                  <div key={item.id} className="rounded-xl border border-[#c9a96e]/20 p-4">
                    <h4 className="italic">{item.name}</h4>
                    <p className="text-[#d7cab5]">{item.feeling}</p>
                    <button
                      onClick={() => setStack((prev) => (prev.includes(item.id) ? prev.filter((v) => v !== item.id) : [...prev, item.id]))}
                      className={`mt-3 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] ${active ? 'border-[#c9a96e] bg-[#c9a96e] text-black' : 'border-[#c9a96e]/40 text-[#c9a96e]'}`}
                    >
                      {active ? 'Added to Stack' : 'Add to Stack'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#c9a96e]/20 bg-black/25 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a6e44]">How to wear this stack</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-[#d7cab5]">
              <li>Apply No. 3 first. Two sprays to inner wrists.</li>
              <li>Wait 60 seconds. Let the top notes open.</li>
              <li>Apply your selected layer. One spray to the base of your throat or chest.</li>
              <li>Do not rub. The heat of your skin will blend them.</li>
              <li>The stack evolves over six hours. Give it time.</li>
            </ol>
            <p className="mt-4 font-mono text-sm text-[#c9a96e]">TOTAL: £{stackTotal}</p>
          </div>
        </section>

        <AnimatePresence>
          {showQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/65 p-6"
            >
              <div className="w-full max-w-xl rounded-2xl border border-[#c9a96e]/40 bg-[#100e0c] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a6e44]">Before we continue — can we ask you one thing?</p>
                <h3 className="mt-3 text-2xl italic">Tell us one thing you remember and we’ll find your scent.</h3>
                <div className="mt-5 grid gap-3">
                  {[
                    'Something from childhood that made everything feel safe',
                    'A city in the rain',
                    'The morning before something important',
                    "A room I haven't been in for years",
                  ].map((question) => (
                    <button
                      key={question}
                      className="rounded-lg border border-[#c9a96e]/20 p-3 text-left text-sm text-[#d6cab5] hover:border-[#c9a96e]/45"
                      onClick={() => {
                        setShowQuestion(false);
                        setArchetypeOverride('the_romantic');
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
                <button className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-[#8a6e44]" onClick={() => setShowQuestion(false)}>
                  Continue without answering
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showWatermark && selectedNote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
              style={{ background: `radial-gradient(circle, ${selectedNote.color}10 0%, transparent 62%)` }}
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.07 }} exit={{ opacity: 0 }} className="text-[18vw] font-semibold uppercase tracking-tight">
                {selectedNote.energy}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
