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

    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // Low A

    gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, audioCtxRef.current.currentTime + 4);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    ambientOscRef.current = osc;
    ambientGainRef.current = gain;

    // Add a second harmonic for richness
    const osc2 = audioCtxRef.current.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, audioCtxRef.current.currentTime);
    const gain2 = audioCtxRef.current.createGain();
    gain2.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain2.gain.linearRampToValueAtTime(0.02, audioCtxRef.current.currentTime + 6);
    osc2.connect(gain2);
    gain2.connect(audioCtxRef.current.destination);
    osc2.start();
  };

  const stopAmbient = () => {
    if (ambientGainRef.current && audioCtxRef.current) {
      ambientGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        ambientOscRef.current?.stop();
      }, 1000);
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

    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

    gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 1.5);
  };

  const playCtaSound = () => {
    if (!isPlaying || !audioCtxRef.current) return;

    const now = audioCtxRef.current.currentTime;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(now + 2);
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
