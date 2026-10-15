"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mmv_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("mmv_cookie_consent", accepted ? "accepted" : "denied");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-[#211747]/95 border border-[#B9A1F7]/30 text-[#F3EBDD] backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">🍪</span>
            <div className="space-y-3">
              <p className="text-xs text-[#F3EBDD]/80 font-sans leading-relaxed">
                We use cookies to ensure that we give you the best experience on our website.{" "}
                <span className="text-[#B9A1F7] hover:text-[#D5FF3F] underline cursor-pointer">Learn more</span>.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleChoice(true)}
                  className="px-4 py-1.5 rounded-full bg-[#D5FF3F] hover:bg-[#b8e030] text-[#211747] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleChoice(false)}
                  className="px-4 py-1.5 rounded-full bg-[#191138] border border-[#B9A1F7]/30 hover:bg-[#B9A1F7]/20 text-[#F3EBDD]/80 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
