'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BrandingPanel() {
  const [typedMessage, setTypedMessage] = useState('');
  const fullMessage = "✨ Hi Riya — your Diamond Necklace is ready. Reply ✅ to confirm.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedMessage(fullMessage.slice(0, i));
      i++;
      if (i > fullMessage.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 h-full flex items-center justify-center bg-[#0e0c13]">
      <div className="w-full max-w-[260px] aspect-[9/18] bg-[#000000] rounded-[2.5rem] border-[4px] border-[#1c1a21] relative overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[rgba(201,168,76,0.1)] flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#16141a] border border-[rgba(201,168,76,0.2)]" />
          <div className="text-[0.6rem] font-medium">Jewel Intelligence</div>
        </div>
        <div className="flex-1 p-4">
          <div className="max-w-[90%] bg-[#16141a] border border-[rgba(201,168,76,0.15)] rounded-lg p-3">
            <p className="text-[0.65rem] leading-relaxed text-[rgba(255,255,255,0.9)]">
              {typedMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
