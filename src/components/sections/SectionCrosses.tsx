"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const SectionCrosses = ({ dark = false }: { dark?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const crosses = containerRef.current.querySelectorAll('.cross-svg');
    
    // Spin crosses based on scroll velocity or just simple scrub
    gsap.to(crosses, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, []);

  const strokeColor = dark ? "#B9A1F7" : "#211747";
  const borderColor = dark ? "border-[#B9A1F7]/25" : "border-[#211747]/15";

  return (
    <div ref={containerRef} className={`w-full flex justify-between items-center px-6 lg:px-12 py-3 border-t ${borderColor}`}>
      <svg className="cross-svg w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0V24M0 12H24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg className="cross-svg w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0V24M0 12H24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};
