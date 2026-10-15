"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinemaClapper3D } from "@/components/ui/CinemaClapper3D";
import { ViewfinderOverlay } from "@/components/ui/ViewfinderOverlay";

export const Preloader: React.FC = () => {
  // Runs on every single page load / refresh
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }

    // Global replay function
    (window as any).replayCinematicIntro = () => {
      setIsExiting(false);
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    };

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    // Smooth fade duration matches transition
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 900);
  }, []);

  const handleSkip = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 400);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F3EBDD] text-[#211747] select-none overflow-hidden"
      >
        {/* Fullscreen Camera Viewfinder Overlay (active throughout preloader duration) */}
        <ViewfinderOverlay />

        {/* Minimalist Skip Button (Top-Right) */}
        <div className="absolute top-8 md:top-12 right-8 md:right-16 z-30">
          <button
            onClick={handleSkip}
            className="px-3.5 py-1.5 rounded-full bg-[#211747]/8 hover:bg-[#211747] border border-[#211747]/15 text-[10px] md:text-xs font-mono tracking-widest text-[#211747] hover:text-[#F3EBDD] transition-all cursor-pointer"
          >
            SKIP [ESC]
          </button>
        </div>

        {/* 3D Clapperboard Stage (Drops from top in static form) */}
        <div className="relative w-full h-full flex items-center justify-center z-10 cursor-pointer">
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
