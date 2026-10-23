"use client";
import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export const KineticTypography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const lines = containerRef.current.querySelectorAll('.kinetic-line');
    
    lines.forEach((line, index) => {
      // Alternate direction based on index (even = right to left, odd = left to right)
      const isEven = index % 2 === 0;
      
      gsap.fromTo(line, 
        { x: isEven ? '0%' : '-50%' }, 
        {
          x: isEven ? '-50%' : '0%',
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    });
    
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-32 bg-background overflow-hidden flex flex-col justify-center items-center">
      <div className="w-full flex flex-col gap-2 md:gap-4 whitespace-nowrap">
        
        {/* Line 1 */}
        <div className="kinetic-line text-[18vw] md:text-[12vw] font-heading font-black leading-none tracking-tighter uppercase text-white/20 hover:text-white transition-colors duration-500 cursor-default">
          DIGITAL DIGITAL DIGITAL DIGITAL DIGITAL DIGITAL
        </div>

        {/* Line 2 */}
        <div className="kinetic-line text-[18vw] md:text-[12vw] font-heading font-black leading-none tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:3px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:2px_rgba(255,255,255,1)] md:hover:[-webkit-text-stroke:3px_rgba(255,255,255,1)] transition-all duration-500 cursor-default">
          EXPERIENCES EXPERIENCES EXPERIENCES EXPERIENCES
        </div>

        {/* Line 3 */}
        <div className="kinetic-line text-[18vw] md:text-[12vw] font-heading font-black leading-none tracking-tighter uppercase text-primary-red/30 hover:text-primary-red transition-colors duration-500 cursor-default">
          DESIGN DESIGN DESIGN DESIGN DESIGN DESIGN
        </div>

        {/* Line 4 */}
        <div className="kinetic-line text-[18vw] md:text-[12vw] font-heading font-black leading-none tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_rgba(232,60,37,0.3)] md:[-webkit-text-stroke:3px_rgba(232,60,37,0.3)] hover:[-webkit-text-stroke:2px_rgba(232,60,37,1)] md:hover:[-webkit-text-stroke:3px_rgba(232,60,37,1)] transition-all duration-500 cursor-default">
          INNOVATION INNOVATION INNOVATION INNOVATION
        </div>

      </div>
    </section>
  );
};
