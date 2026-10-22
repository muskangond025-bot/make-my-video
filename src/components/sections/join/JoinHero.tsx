"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { gsap } from "gsap";

export const JoinHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        title1Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      )
        .fromTo(
          title2Ref.current,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          "-=0.7"
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full pt-36 pb-16 md:pt-44 md:pb-24 px-6 lg:px-16 overflow-hidden bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none"
    >
      {/* Soft Interactive Radial Glow matching Home & About */}
      <div
        className="absolute pointer-events-none transition-transform duration-500 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: "550px",
          height: "550px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(117,103,238,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Background Ornament Rings */}
      <div className="absolute top-12 right-12 w-80 h-80 rounded-full border border-[#141416]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Subtle Minimal Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#7567EE]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A4658]">
            Creative Network & Careers
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={title1Ref}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-[#141416]/90 leading-none mb-2"
        >
          JOIN OUR
        </h1>
        <h2
          ref={title2Ref}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase text-[#141416] leading-tight tracking-tight mb-6"
        >
          CREATIVE <span className="text-[#7567EE]">COMMUNITY</span>
        </h2>

        {/* Description & Action */}
        <div ref={descRef} className="max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-[#4A4658] font-normal leading-relaxed mb-8">
            Whether you are a meticulous remote video editor or an agile mobile videographer,
            join Make My Vid to access consistent, paid commercial projects with national & international brands.
          </p>

          <a
            href="#application-form"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#141416] text-[#EAE3DB] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#7567EE] hover:text-white hover:shadow-[0_10px_30px_rgba(117,103,238,0.35)] cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
