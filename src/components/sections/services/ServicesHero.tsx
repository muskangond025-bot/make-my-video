"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Film, Compass, ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BrandButton } from "@/components/shared/BrandButton";

export const ServicesHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt on Mouse Movement (Desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(stageRef.current, {
      rotateY: x * 4,
      rotateX: -y * 4,
      scale: 1.01,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1400,
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * 12,
        y: y * 8,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!stageRef.current) return;
    gsap.to(stageRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  // Multi-Layer Cinematic Parallax Scroll Scrubbing (Matching Reference Video)
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: false,
        },
      });

      // 1. Deep Background layer moves slowly with subtle zoom
      if (bgRef.current) {
        tl.to(
          bgRef.current,
          {
            y: 80,
            scale: 1.08,
            ease: "none",
          },
          0
        );
      }

      // 2. Middle Typography ('SERVICES') moves up at medium speed, sinking behind the mountain ridges
      if (textRef.current) {
        tl.to(
          textRef.current,
          {
            y: -140,
            opacity: 0.4,
            ease: "none",
          },
          0
        );
      }

      // 3. Foreground Ridge Layer moves up rapidly, occluding the typography
      if (fgRef.current) {
        tl.to(
          fgRef.current,
          {
            y: -190,
            ease: "none",
          },
          0
        );
      }

      // 4. Floating UI and Center CTA Pill fade gently as user navigates down
      if (contentOverlayRef.current) {
        tl.to(
          contentOverlayRef.current,
          {
            y: -60,
            opacity: 0.85,
            ease: "none",
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-24 sm:pt-32 pb-8 sm:pb-14 px-4 sm:px-8 max-w-[1400px] mx-auto w-full select-none"
    >
      {/* ========================================================================= */}
      {/* 3D TILT CINEMATIC STAGE CONTAINER (Matches Reference Mockup Aesthetic)    */}
      {/* ========================================================================= */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[540px] sm:h-[640px] md:h-[720px] rounded-[36px] sm:rounded-[48px] overflow-hidden border border-[#141416]/12 shadow-[0_24px_70px_rgba(0,0,0,0.14)] bg-[#0C1B24] transition-shadow duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 1: Deep Alpine Sky & Distant Mountain Peaks Backdrop              */}
        {/* ----------------------------------------------------------------------- */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] select-none pointer-events-none will-change-transform"
        >
          <Image
            src="/images/services/services_hero_lake.jpg"
            alt="Alpine Landscape Panorama Background"
            fill
            priority
            className="object-cover object-top filter brightness-[0.98] contrast-[1.05]"
            sizes="100vw"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B24]/90 via-transparent to-black/30" />
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 2: Massive 3D Sandwiched Typography ('SERVICES')                  */}
        {/* ----------------------------------------------------------------------- */}
        <div
          ref={textRef}
          className="absolute inset-x-0 top-[18%] sm:top-[16%] md:top-[15%] flex items-center justify-center pointer-events-none z-10 select-none will-change-transform"
        >
          <h1
            className="text-white font-black tracking-tight text-center uppercase drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            style={{
              fontFamily: "'Humane', sans-serif",
              fontSize: "clamp(90px, 18vw, 250px)",
              lineHeight: 0.82,
              letterSpacing: "0.02em",
              textShadow: "0 10px 40px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            SERVICES
          </h1>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 3: Foreground Pine Ridges, Mountain Slope & Serene Lake Shore     */}
        {/* (Transparent cutout: occludes the typography as it scrolls up!)         */}
        {/* ----------------------------------------------------------------------- */}
        <div
          ref={fgRef}
          className="absolute inset-0 w-full h-[120%] -top-[5%] select-none pointer-events-none z-20 will-change-transform"
        >
          <Image
            src="/images/services/services_lake_fg.png"
            alt="Alpine Mountain Ridges Foreground Cutout"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Seamless bottom fade into deep stage tone */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0C1B24] via-[#0C1B24]/70 to-transparent" />
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 4: Interactive Floating UI Layer (Clean, Uncluttered, Pure Focus)  */}
        {/* ----------------------------------------------------------------------- */}
        <div
          ref={contentOverlayRef}
          className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10 md:p-12 pointer-events-none"
        >
          {/* Top Metadata Row: Minimal editorial navigation */}
          <div className="flex items-center justify-between gap-4 pointer-events-auto">
            {/* Left Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider shadow-sm">
              <Film size={13} className="text-[#D4FF1F]" />
              <span className="font-semibold">DIRECTORS ARCHIVE • 2026</span>
            </div>

            {/* Center Logo Monogram Accent */}
            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono font-bold text-xs shadow-sm">
              M
            </div>

            {/* Right Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider shadow-sm">
              <Compass size={13} className="text-[#7567EE]" />
              <span className="font-semibold">4K CINEMA MASTERING</span>
            </div>
          </div>

          {/* Center Floating Action Pill: Signature Neon BrandButton */}
          <div className="flex flex-col items-center justify-center my-auto pointer-events-auto pt-16 sm:pt-20">
            <span className="text-white/80 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] mb-3 text-center drop-shadow-md">
              Full Spectrum Commercial Video Production
            </span>

            <BrandButton
              size="lg"
              href="#services-spotlight"
              label="EXPLORE SERVICES"
            />
          </div>

          {/* Bottom Row: Micro Narrative & Smooth Scroll Prompt */}
          <div className="flex items-end justify-between gap-4 pointer-events-auto pt-4">
            <div className="max-w-xs sm:max-w-md hidden sm:block">
              <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed drop-shadow-md">
                From high-stakes multi-city shoots to rapid decentralized post-production — explore our end-to-end commercial filmmaking capabilities.
              </p>
            </div>

            <div className="flex items-center gap-2 text-white/80 font-mono text-[11px] sm:text-xs uppercase tracking-wider ml-auto">
              <ArrowDown size={14} className="text-[#D4FF1F] animate-bounce" />
              <span>Scroll To Discover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
