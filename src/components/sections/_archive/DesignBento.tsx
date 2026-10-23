"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const DesignBento = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Initial Reveal
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          onComplete: () => {
            // 2. Continuous Idle Floating
            cardsRef.current.forEach((card, i) => {
              gsap.to(card, {
                y: i % 2 === 0 ? -10 : 10,
                duration: 3 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            });
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight coordinates
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const bentoItems = [
    { title: "Typography", desc: "Precision crafted type scales.", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
    { title: "Colors", desc: "Vibrant semantic palettes.", colSpan: "col-span-1", rowSpan: "row-span-2" },
    { title: "Motion", desc: "Fluid, physics-based springs.", colSpan: "col-span-1", rowSpan: "row-span-1" },
    { title: "Components", desc: "Atomic modular blocks.", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  ];

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#000] text-white py-32 px-6 lg:px-24 overflow-hidden border-t border-black/10" style={{ perspective: "2000px" }}>
      
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">System</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            A meticulously crafted foundation designed to scale beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {bentoItems.map((item, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className={`group relative overflow-visible rounded-3xl bg-background/[0.03] border border-black/10 p-8 flex flex-col justify-end ${item.colSpan} ${item.rowSpan} hover:border-black/20 transition-colors duration-500 will-change-transform shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 hover:z-20`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Inner content wrapper to pop out in 3D */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
                {/* Spotlight Effect */}
                <div 
                  className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`
                  }}
                />
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-2 relative z-10" style={{ transform: "translateZ(30px)" }}>{item.title}</h3>
              <p className="text-gray-600 relative z-10" style={{ transform: "translateZ(20px)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
