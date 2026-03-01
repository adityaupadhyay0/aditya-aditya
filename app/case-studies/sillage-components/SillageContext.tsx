'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Archetype, ExperienceConfig, ARCHETYPE_CONFIGS } from './sillageData';

interface IngredientSoul {
  color: string;
  texture: 'silk' | 'dust' | 'mist' | 'earth';
  freq: number;
  label: string;
}

interface SessionContext {
  session_id: string;
  referral_source: string;
  inferred_archetype: Archetype;
  confidence: number;
  signals_observed: string[];
  experience_config: ExperienceConfig;
  last_visit_days_ago?: number;
  is_returning: boolean;
  cart: string[];
  activeSoul: IngredientSoul | null;
}

interface SillageContextType {
  session: SessionContext;
  updateArchetype: (archetype: Archetype, confidence: number, signal: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  logEvent: (event: string, data: any) => void;
  setSoul: (soul: IngredientSoul | null) => void;
}

const SillageContext = createContext<SillageContextType | undefined>(undefined);

export function SillageProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionContext>({
    session_id: Math.random().toString(36).substring(7),
    referral_source: 'unknown',
    inferred_archetype: 'the_explorer',
    confidence: 0.5,
    signals_observed: [],
    experience_config: ARCHETYPE_CONFIGS['the_explorer'],
    is_returning: false,
    cart: [],
    activeSoul: null
  });

  useEffect(() => {
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    let source = 'direct';
    if (referrer.includes('instagram.com') || referrer.includes('t.co')) source = 'social';
    else if (referrer.includes('google.com')) source = 'search';

    let prevVisit = null;
    if (typeof localStorage !== 'undefined') {
       prevVisit = localStorage.getItem('sillage_last_visit');
    }
    const isReturning = !!prevVisit;
    const lastVisitDays = prevVisit ? Math.floor((Date.now() - parseInt(prevVisit)) / (1000 * 60 * 60 * 24)) : undefined;

    let initialArchetype: Archetype = 'the_explorer';
    if (source === 'social') initialArchetype = 'the_romantic';
    if (source === 'search') initialArchetype = 'the_collector';
    if (isReturning) initialArchetype = 'the_returner';

    setSession(prev => ({
      ...prev,
      referral_source: source,
      inferred_archetype: initialArchetype,
      experience_config: ARCHETYPE_CONFIGS[initialArchetype],
      is_returning: isReturning,
      last_visit_days_ago: lastVisitDays,
      signals_observed: [...prev.signals_observed, `referral_${source}`]
    }));

    if (typeof localStorage !== 'undefined') {
       localStorage.setItem('sillage_last_visit', Date.now().toString());
    }
  }, []);

  const updateArchetype = (archetype: Archetype, confidence: number, signal: string) => {
    setSession(prev => ({
      ...prev,
      inferred_archetype: archetype,
      confidence: confidence,
      experience_config: ARCHETYPE_CONFIGS[archetype],
      signals_observed: Array.from(new Set([...prev.signals_observed, signal]))
    }));
  };

  const setSoul = (soul: IngredientSoul | null) => {
    setSession(prev => ({ ...prev, activeSoul: soul }));
  };

  const addToCart = (productId: string) => {
    setSession(prev => ({ ...prev, cart: [...prev.cart, productId] }));
    logEvent('add_to_cart', { product_id: productId });
  };

  const removeFromCart = (productId: string) => {
    setSession(prev => ({ ...prev, cart: prev.cart.filter(id => id !== productId) }));
  };

  const clearCart = () => {
    setSession(prev => ({ ...prev, cart: [] }));
  };

  const logEvent = (event: string, data: any) => {
    console.log(`[Sillage Analytics] ${event}:`, {
      ...data,
      session_id: session.session_id,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <SillageContext.Provider value={{ session, updateArchetype, addToCart, removeFromCart, clearCart, logEvent, setSoul }}>
      {children}
    </SillageContext.Provider>
  );
}

export function useSillage() {
  const context = useContext(SillageContext);
  if (context === undefined) throw new Error('useSillage must be used within a SillageProvider');
  return context;
}
