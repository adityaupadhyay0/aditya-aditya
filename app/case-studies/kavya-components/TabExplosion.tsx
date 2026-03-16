'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabExplosion() {
  const [tabs, setTabs] = useState<string[]>([]);
  const allTabs = [
    'Salesforce - Deal #447',
    'Outlook - Re: Pricing exception',
    'Slack - #enterprise-sales',
    'Google Drive - Proposal_v4.pdf',
    'Tableau - Q4 Revenue Dashboard',
    'DocuSign - Pending Signature',
    'Internal Wiki - Approval Policy',
    'NetSuite - Invoice #8841',
    'Jira - INT-0847',
    'LinkedIn - Prospect Profile',
    'Zoom - Meeting Link'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTabs(prev => {
        if (prev.length < allTabs.length) {
          return [...prev, allTabs[prev.length]];
        }
        clearInterval(timer);
        return prev;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#FAFAF7]">
      <div className="w-full max-w-lg">
        {/* Browser Chrome Mockup */}
        <div className="bg-[#E8E4DC] rounded-t-lg p-2 flex items-center gap-2 border-b border-[#9BA3AF]/20">
          <div className="flex gap-1.5 ml-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#9BA3AF]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#9BA3AF]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#9BA3AF]/40" />
          </div>
          <div className="flex-1 ml-4 bg-white/50 rounded h-5" />
        </div>

        <div className="bg-white border-x border-b border-[#E8E4DC] rounded-b-lg h-64 relative overflow-hidden p-4 shadow-sm">
           <div className="flex flex-wrap gap-1">
             {tabs.map((tab, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 5, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 className="px-3 py-1.5 bg-[#F5F0E6] border border-[#E8E4DC] rounded-t text-[10px] font-sans flex items-center gap-2 whitespace-nowrap overflow-hidden max-w-[120px]"
               >
                 <span className="truncate">{tab}</span>
                 <span className="opacity-30">×</span>
               </motion.div>
             ))}
           </div>

           <div className="mt-12 text-center">
             <AnimatePresence>
               {tabs.length === allTabs.length && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="space-y-4"
                 >
                   <p className="font-serif italic text-lg text-[#0F0F0D]">
                     "This is Tuesday morning for your best sales rep."
                   </p>
                   <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#B8973A]">
                     11 TABS. 8 TOOLS. 1 DEAL.
                   </p>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
