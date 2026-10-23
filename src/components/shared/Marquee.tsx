"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const Marquee = ({ text = "PROJECTS" }: { text?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    
    // Create an infinite horizontal scroll
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 10
    });

    // Optional: Reverse on scroll up (a classic Webflow/GSAP trick)
    let lastScroll = 0;
    const updateDir = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScroll) {
        tl.timeScale(1); // scrolling down
      } else {
        tl.timeScale(-1); // scrolling up
      }
      lastScroll = st <= 0 ? 0 : st;
    };
    
    window.addEventListener("scroll", updateDir);
    return () => {
      tl.kill();
      window.removeEventListener("scroll", updateDir);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-background border-t border-b border-black/10 py-4 select-none flex items-center">
      <div ref={trackRef} className="flex whitespace-nowrap gap-8 pr-8 w-fit">
        {/* We duplicate the content to ensure seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-heading text-6xl md:text-[10rem] uppercase tracking-tighter text-white leading-[0.8]">
              {text}
            </span>
            <span className="text-primary-red text-6xl md:text-[8rem]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
