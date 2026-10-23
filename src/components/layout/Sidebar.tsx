"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Sidebar = () => {
  const { scrollYProgress } = useScroll();
  const [scrollIndex, setScrollIndex] = useState(-11);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Map scroll progress 0-1 to something like -11 to 07
      const mapped = Math.floor(latest * 18) - 11;
      setScrollIndex(mapped);
    });
  }, [scrollYProgress]);

  const displayIndex = scrollIndex < 0 ? scrollIndex.toString() : `0${scrollIndex}`.slice(-2);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-24 flex flex-col justify-end pb-12 items-center z-50 pointer-events-none mix-blend-difference text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-[1px] h-24 bg-background/50" />
        <span className="font-mono text-sm tracking-widest font-bold">
          {displayIndex}
        </span>
      </div>
    </div>
  );
};
