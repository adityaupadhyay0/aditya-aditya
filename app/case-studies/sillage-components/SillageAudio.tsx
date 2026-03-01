'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  playNotePing: (frequency: number) => void;
  playCtaSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const SillageAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscillators = useRef<OscillatorNode[]>([]);
  const ambientGainRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const startAmbient = () => {
    if (!audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const gain = ctx.createGain();

    // Primary Drone
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(40, ctx.currentTime);

    // Harmonic Layer
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(80, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    activeOscillators.current = [osc1, osc2];
    ambientGainRef.current = gain;
  };

  const stopAmbient = () => {
    if (ambientGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      ambientGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

      const oscillatorsToStop = [...activeOscillators.current];
      activeOscillators.current = [];

      setTimeout(() => {
        oscillatorsToStop.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
      }, 1100);
    }
  };

  const toggleSound = () => {
    initAudio();
    if (isPlaying) {
      stopAmbient();
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      startAmbient();
      setIsPlaying(true);
    }
  };

  const playNotePing = (freq: number) => {
    if (!isPlaying || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.1);
    setTimeout(() => osc.disconnect(), 2200);
  };

  const playCtaSound = () => {
    if (!isPlaying || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.6);
    setTimeout(() => osc.disconnect(), 2700);
  };

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound, playNotePing, playCtaSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useSillageAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useSillageAudio must be used within SillageAudioProvider');
  return context;
};
