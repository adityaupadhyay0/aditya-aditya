'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSillage } from './SillageContext';
import { SILLAGE_PRODUCTS, SILLAGE_LANGUAGE } from './sillageData';

export const CartPanel: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { session, removeFromCart } = useSillage();
  const [isOpen, setIsOpen] = useState(false);

  const cartTotal = session.cart.reduce((total, id) => total + (SILLAGE_PRODUCTS[id] ? 165 : 0), 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-12 right-12 z-[500] group flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-[#8a6e44] group-hover:text-[#b5893a] transition-colors duration-700">Your Bottle</span>
        <div className="relative w-12 h-12 flex items-center justify-center border border-[#1c1713]/5 bg-white shadow-xl group-hover:border-[#b5893a]/30 transition-all duration-700">
           <span className="font-mono text-[0.7rem] text-[#b5893a] relative z-10">{session.cart.length}</span>
           <motion.div
              className="absolute inset-1 border border-[#b5893a]/10"
              animate={{ rotate: [0, 90] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#f2ece0]/60 backdrop-blur-xl z-[600]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[700] shadow-[-50px_0_100px_rgba(0,0,0,0.05)] p-16 flex flex-col justify-between"
            >
              <div className="space-y-16">
                 <div className="flex justify-between items-center">
                    <h3 className="font-serif italic text-4xl text-[#1c1713]">The Selection</h3>
                    <button onClick={() => setIsOpen(false)} className="font-mono text-[0.6rem] uppercase tracking-widest text-[#b5893a] hover:text-[#1c1713] transition-colors duration-700">[ Dismiss ]</button>
                 </div>

                 {session.cart.length === 0 ? (
                   <div className="space-y-12 pt-32 text-center">
                      <p className="font-serif italic text-3xl text-[#1c1713]/20">"{SILLAGE_LANGUAGE.empty_cart}"</p>
                      <div className="w-px h-24 bg-[#b5893a]/10 mx-auto" />
                   </div>
                 ) : (
                   <div className="space-y-12 max-h-[60vh] overflow-y-auto no-scrollbar pr-4">
                      {session.cart.map((id, i) => (
                        <div key={i} className="group relative pb-12 border-b border-[#1c1713]/5 flex justify-between items-start">
                           <div className="space-y-4">
                              <span className="font-mono text-[0.5rem] uppercase tracking-widest text-[#b5893a]">Item 0{i + 1}</span>
                              <h4 className="font-serif text-3xl uppercase tracking-tighter text-[#1c1713]">{SILLAGE_PRODUCTS[id].name}</h4>
                              <p className="font-serif italic text-xl text-[#1c1713]/40">{SILLAGE_PRODUCTS[id].title}</p>
                           </div>
                           <div className="text-right space-y-6">
                              <span className="text-3xl font-light text-[#1c1713]">£165</span>
                              <button onClick={() => removeFromCart(id)} className="block font-mono text-[0.5rem] uppercase tracking-widest text-[#b5893a]/30 hover:text-[#b5893a] transition-all duration-700">[ Remove ]</button>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </div>

              <div className="space-y-12 pt-12 border-t border-[#1c1713]/5">
                 <div className="flex justify-between items-baseline">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-[#8a6e44]">Total Investment</span>
                    <span className="font-serif text-5xl text-[#1c1713] font-light">£{cartTotal}</span>
                 </div>
                 <button
                   disabled={session.cart.length === 0}
                   onClick={() => { setIsOpen(false); if(onComplete) onComplete(); }}
                   className="w-full py-10 bg-[#1c1713] text-[#f2ece0] font-mono text-xs uppercase tracking-[0.6em] hover:bg-[#b5893a] transition-all duration-700 disabled:opacity-20"
                 >
                    Complete Your Order
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
