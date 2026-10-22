"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Smooth cinematic entrance matching Dumearts
      tl.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.98, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1 }
      )
        .fromTo(
          reticleRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50, letterSpacing: "-0.05em" },
          { opacity: 1, y: 0, letterSpacing: "0.02em", duration: 1.2 },
          "-=0.7"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-12 bg-[#EAE3DB] text-[#141416] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* DUMEARTS-INSPIRED STAGE CONTAINER (WARM BEIGE COLOR SYSTEM)               */}
        {/* ========================================================================= */}
        <div
          ref={stageRef}
          className="relative w-full rounded-[36px] sm:rounded-[48px] border border-[#141416]/12 bg-white/50 backdrop-blur-md p-6 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(20,20,22,0.04)] flex flex-col items-center text-center overflow-hidden"
        >
          {/* Subtle Ambient Background Ring */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#7567EE]/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#7567EE]/5 blur-3xl pointer-events-none" />

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER VIEWPORT: VIEWFINDER RETICLE + MASSIVE 'ABOUT' TYPOGRAPHY         */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={reticleRef}
            className="relative w-full max-w-4xl py-10 sm:py-16 md:py-20 flex items-center justify-center my-4 sm:my-8"
          >
            {/* Viewfinder Corner Reticles Framing the Text */}
            <div className="absolute top-0 left-4 sm:left-12 w-8 sm:w-12 h-8 sm:h-12 border-t-[3px] border-l-[3px] border-[#7567EE] rounded-tl-sm pointer-events-none" />
            <div className="absolute top-0 right-4 sm:right-12 w-8 sm:w-12 h-8 sm:h-12 border-t-[3px] border-r-[3px] border-[#7567EE] rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-0 left-4 sm:left-12 w-8 sm:w-12 h-8 sm:h-12 border-b-[3px] border-l-[3px] border-[#7567EE] rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-0 right-4 sm:right-12 w-8 sm:w-12 h-8 sm:h-12 border-b-[3px] border-r-[3px] border-[#7567EE] rounded-br-sm pointer-events-none" />

            {/* Massive Kinetic 'ABOUT' Headline */}
            <h1
              ref={titleRef}
              className="font-humane uppercase font-bold tracking-tight text-[#7567EE] text-[7.5rem] sm:text-[13rem] md:text-[17rem] lg:text-[21rem] leading-[0.78] select-none text-center drop-shadow-sm"
            >
              ABOUT
            </h1>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SUBTITLE: Introduces Make My Vid & Rohan Joshi                          */}
          {/* ----------------------------------------------------------------------- */}
          <div className="relative max-w-2xl mx-auto mt-2 sm:mt-4 mb-8 sm:mb-12 px-4">
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-[#4A4658] font-normal leading-relaxed text-center"
            >
              Hello! We&apos;re{" "}
              <strong className="text-[#141416] font-semibold">Make My Video</strong>, a premier
              creative video production house and visual direction studio founded by{" "}
              <strong className="text-[#141416] font-semibold">Rohan Joshi</strong>.
            </p>

            {/* Decorative Accent Dot matching Dumearts layout */}
            <div className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#7567EE] shadow-[0_0_12px_rgba(117,103,238,0.5)] pointer-events-none" />
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* STAT CARDS: Side-by-Side with Corner Brackets                           */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-2 text-left"
          >
            {/* Card 1: Years of Experience */}
            <div className="relative rounded-[24px] border border-[#141416]/12 bg-white/70 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Corner Bracket Accents on the Card */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#141416]/30 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#141416]/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#141416]/30 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#141416]/30 pointer-events-none" />

              <div className="text-5xl sm:text-6xl font-heading font-black text-[#141416] tracking-tight leading-none shrink-0">
                10+
              </div>
              <div className="flex flex-col">
                <div className="text-xs sm:text-sm font-heading font-bold text-[#7567EE] tracking-wider uppercase mb-1">
                  Years of Experience
                </div>
                <div className="text-xs sm:text-sm text-[#4A4658] font-normal leading-relaxed">
                  Consistently delivering high-retention video campaigns and visual narratives that exceed expectations.
                </div>
              </div>
            </div>

            {/* Card 2: Clients Served */}
            <div className="relative rounded-[24px] border border-[#141416]/12 bg-white/70 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Corner Bracket Accents on the Card */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#141416]/30 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#141416]/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#141416]/30 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#141416]/30 pointer-events-none" />

              <div className="text-5xl sm:text-6xl font-heading font-black text-[#141416] tracking-tight leading-none shrink-0">
                250+
              </div>
              <div className="flex flex-col">
                <div className="text-xs sm:text-sm font-heading font-bold text-[#7567EE] tracking-wider uppercase mb-1">
                  Clients & Brands Served
                </div>
                <div className="text-xs sm:text-sm text-[#4A4658] font-normal leading-relaxed">
                  From viral social-first productions to commercial ads resulting in massive audience engagement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
