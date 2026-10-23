"use client";
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export const VelocityRibbon = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Continuous Infinite Loop
      // Duplicate items visually for seamless loop
      const totalWidth = trackRef.current?.scrollWidth || 0;
      
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(trackRef.current, {
        x: -totalWidth / 2, // Scroll halfway (since we doubled items)
        duration: 30, // Base idle speed
        ease: "none"
      });

      // 2. Scroll Velocity Injection
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skewAmount = gsap.utils.clamp(-15, 15, velocity / -200);
          
          // Inject speed into timeScale
          const timeScale = 1 + Math.abs(velocity / 100);
          gsap.to(tl, { timeScale, duration: 0.2, overwrite: "auto", onComplete: () => {
            gsap.to(tl, { timeScale: 1, duration: 1 });
          }});

          // Skew the items physically
          gsap.to(".ribbon-item", {
            skewX: skewAmount,
            duration: 0.2,
            overwrite: "auto",
            onComplete: () => {
              gsap.to(".ribbon-item", { skewX: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            }
          });
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const baseItems = [
    { text: "E-Commerce", color: "bg-blue-600" },
    { text: "Portfolios", color: "bg-purple-600" },
    { text: "SaaS Platforms", color: "bg-red-600" },
    { text: "Web3 Apps", color: "bg-green-600" },
    { text: "Design Systems", color: "bg-orange-600" }
  ];

  // Double items for seamless loop
  const items = [...baseItems, ...baseItems];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#000] text-white flex items-center overflow-hidden border-t border-black/5 py-32">
      <div className="absolute top-12 left-12">
        <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 font-bold">Showcase Gallery</h3>
      </div>
      
      <div className="w-full overflow-hidden">
        <div ref={trackRef} className="flex gap-12 px-12 w-max">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="ribbon-item w-[60vw] md:w-[40vw] max-w-[500px] aspect-[4/3] rounded-3xl p-8 flex items-end relative overflow-hidden bg-background/5 border border-black/10 shrink-0 shadow-2xl"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Continuous Breathing Glow */}
              <div className={`absolute inset-0 opacity-20 ${item.color} blur-[50px] mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]`} />
              <div className="absolute inset-4 rounded-2xl bg-background/5 border border-black/5 backdrop-blur-md" />
              <h4 className="text-3xl md:text-5xl font-semibold tracking-tighter relative z-10 drop-shadow-lg">{item.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
