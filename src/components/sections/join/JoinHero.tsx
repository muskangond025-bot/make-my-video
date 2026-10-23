"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export const JoinHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shroudRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const shroud = shroudRef.current;
    const textEl = textRef.current;
    if (!container || !stage || !shroud || !textEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Cinematic Shroud Fade-Out Animation (dissolves away to unveil scene)
      tl.to(shroud, {
        opacity: 0,
        duration: 1.4,
        ease: "power2.inOut",
      });

      // 2. Background image subtle de-magnification
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.12, filter: "brightness(0.65)" },
          { scale: 1.0, filter: "brightness(0.85)", duration: 1.6, ease: "power2.out" },
          0
        );
      }

      // 3. Crisp Top-Left Typography Fade-In
      tl.fromTo(
        textEl.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" },
        "-=0.9"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 max-w-[1440px] mx-auto select-none"
    >
      {/* 70% Viewport Height Banner Stage with Fade-Out Shroud */}
      <div
        ref={stageRef}
        className="relative w-full h-[70vh] min-h-[480px] max-h-[620px] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.18)] will-change-transform"
      >
        {/* Full-Width Background Imagery */}
        <div ref={imageRef} className="absolute inset-0 w-full h-full will-change-transform">
          <Image
            src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop"
            alt="Film Crew & Production On-Set Collaboration"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Top-Left Biased Gradient Scrim for Top-Left Heading Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/55 to-black/25" />
        </div>

        {/* Cinematic Fade-Out Shroud Layer */}
        <div
          ref={shroudRef}
          className="absolute inset-0 z-20 bg-[#141416] pointer-events-none will-change-transform"
        />

        {/* Minimal Hero Content Layer - Top-Left Corner Aligned */}
        <div className="absolute inset-0 z-10 flex flex-col justify-start items-start p-8 sm:p-12 md:p-14 text-white">
          <div ref={textRef} className="max-w-3xl text-left">
            <h1 className="font-serif italic text-white/90 text-3xl sm:text-5xl md:text-6xl leading-none mb-2.5 drop-shadow-md">
              JOIN OUR
            </h1>
            <div className="font-heading font-black uppercase text-white text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none drop-shadow-lg">
              CREATIVE <span className="text-[#7567EE]">COMMUNITY</span>
            </div>
            <p className="mt-4 sm:mt-5 text-white/80 font-sans text-xs sm:text-sm md:text-base max-w-xl leading-relaxed drop-shadow-md">
              Whether you are an agile on-ground cinema camera operator or a remote post-production artist, collaborate with Make My Vid on tier-1 commercial brand productions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
