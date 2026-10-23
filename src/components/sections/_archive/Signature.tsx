"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const Signature = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return;
    
    // Get total length of path for drawSVG effect natively
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { 
      strokeDasharray: length, 
      strokeDashoffset: length 
    });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "+=500", 
        scrub: true
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-32 bg-background text-white">
      <div className="header-sig w-full max-w-2xl px-6">
        <svg viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
          {/* A simulated curvy signature path representing "Dumeme" */}
          <path 
            ref={pathRef}
            d="M 50 100 C 50 50, 100 20, 100 100 C 100 120, 150 150, 150 100 C 150 50, 200 80, 200 100 C 200 120, 250 120, 250 100 C 250 80, 300 80, 300 100 C 300 120, 350 120, 350 100 C 350 80, 400 80, 400 100 C 400 120, 450 120, 480 80" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </div>
  );
};
