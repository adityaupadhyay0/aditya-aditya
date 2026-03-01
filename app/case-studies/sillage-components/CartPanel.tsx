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
        className="fixed top-12 right-12 z-50 flex flex-col items-center gap-2 group"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8a6e44] group-hover:text-[#c9a96e] transition-colors">Your Bottle</span>
        <div className="w-8 h-8 border border-[#f0ebe0]/10 flex items-center justify-center bg-[#0a0908]/50 backdrop-blur-sm group-hover:border-[#c9a96e]/30 transition-all">
           <span className="font-mono text-[0.6rem] text-[#c9a96e]">{session.cart.length}</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#161210] z-[300] shadow-2xl p-12 flex flex-col justify-between border-l border-[#f0ebe0]/5"
          >
            <div className="space-y-12">
               <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-3xl uppercase tracking-widest text-[#f0ebe0]">The Cart</h3>
                  <button onClick={() => setIsOpen(false)} className="font-mono text-[0.6rem] uppercase tracking-widest text-[#c9a96e]/60 hover:text-[#c9a96e] transition-colors">[ Close ]</button>
               </div>

               {session.cart.length === 0 ? (
                 <div className="space-y-6 pt-24 text-center">
                    <p className="font-serif italic text-2xl text-[#f0ebe0]/40">"{SILLAGE_LANGUAGE.empty_cart}"</p>
                 </div>
               ) : (
                 <div className="space-y-8">
                    {session.cart.map((id, i) => (
                      <div key={i} className="py-8 border-b border-[#f0ebe0]/5 flex justify-between items-center">
                         <div className="space-y-1">
                            <h4 className="font-serif text-xl uppercase tracking-tighter text-[#f0ebe0]">{SILLAGE_PRODUCTS[id].name}</h4>
                            <p className="font-serif italic text-sm text-[#f0ebe0]/40">{SILLAGE_PRODUCTS[id].title}</p>
                         </div>
                         <div className="text-right space-y-2">
                            <span className="font-serif text-lg text-[#f0ebe0]">£165</span>
                            <button onClick={() => removeFromCart(id)} className="block font-mono text-[0.5rem] uppercase tracking-widest text-[#c9a96e]/30 hover:text-[#c9a96e] transition-colors">[ Remove ]</button>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="space-y-8 pt-8">
               <div className="flex justify-between items-baseline border-t border-[#f0ebe0]/5 pt-8">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8a6e44]">Subtotal</span>
                  <span className="font-serif text-3xl text-[#f0ebe0]">£{cartTotal}</span>
               </div>
               <button
                 disabled={session.cart.length === 0}
                 onClick={() => { setIsOpen(false); if(onComplete) onComplete(); }}
                 className="w-full py-6 bg-[#c9a96e] text-[#0a0908] font-mono text-sm uppercase tracking-[0.2em] hover:bg-[#f0ebe0] transition-all duration-500 disabled:opacity-20"
               >
                  Complete Your Order
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
