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
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const startAmbient = () => {
    if (!audioCtxRef.current) return;

    // Low, steady drone for "Atmosphere"
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    const filter = audioCtxRef.current.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(40, audioCtxRef.current.currentTime); // Deep Paris Atmosphere

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, audioCtxRef.current.currentTime);

    gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    ambientOscRef.current = osc;
    ambientGainRef.current = gain;
    filterRef.current = filter;

    // Harmonic for elegance
    const osc2 = audioCtxRef.current.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(80, audioCtxRef.current.currentTime);
    const gain2 = audioCtxRef.current.createGain();
    gain2.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain2.gain.linearRampToValueAtTime(0.03, audioCtxRef.current.currentTime + 6);
    osc2.connect(gain2);
    gain2.connect(audioCtxRef.current.destination);
    osc2.start();
  };

  const stopAmbient = () => {
    if (ambientGainRef.current && audioCtxRef.current) {
      ambientGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.5);
      const ctx = audioCtxRef.current;
      setTimeout(() => {
        ambientOscRef.current?.stop();
        ctx.suspend();
      }, 1500);
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

    const now = audioCtxRef.current.currentTime;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(now + 2.5);
  };

  const playCtaSound = () => {
    if (!isPlaying || !audioCtxRef.current) return;

    const now = audioCtxRef.current.currentTime;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(now + 3);
  };

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
