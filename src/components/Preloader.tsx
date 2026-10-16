"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinemaClapper3D } from "@/components/ui/CinemaClapper3D";

export const Preloader: React.FC = () => {
  // Runs on page load / refresh
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const hasHandledRef = React.useRef(false);

  const handleComplete = useCallback(() => {
    if (hasHandledRef.current) return;
    hasHandledRef.current = true;
    setIsExiting(true);
    // Smooth cinematic dissolve duration (550ms)
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 550);
  }, []);

  const handleSkip = useCallback(() => {
    if (hasHandledRef.current) return;
    hasHandledRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 200);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Global replay function
    (window as any).replayCinematicIntro = () => {
      hasHandledRef.current = false;
      setIsExiting(false);
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    };

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVisible, handleSkip]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.03 : 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: isExiting ? 0.55 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-[#111215] select-none overflow-hidden"
      >
        {/* Subtle studio soft tint vignette behind clapper on white */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F6F7F9_70%,#ECEEF2_100%)]" />

        {/* Minimalist Studio Skip Button (Top-Right) */}
        <div className="absolute top-8 md:top-12 right-8 md:right-16 z-30">
          <button
            onClick={handleSkip}
            className="px-4 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 backdrop-blur-md text-[10px] md:text-xs font-mono tracking-widest text-black/60 hover:text-black transition-all cursor-pointer shadow-sm"
          >
            SKIP [ESC]
          </button>
        </div>

        {/* 3D Clapperboard Stage */}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <CinemaClapper3D
            autoPlay={true}
            onComplete={handleComplete}
            className="w-full h-full max-w-[1100px] max-h-[800px]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

