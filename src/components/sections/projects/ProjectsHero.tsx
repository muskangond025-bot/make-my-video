"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface ProjectsHeroProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  totalProjects?: number;
}

export const ProjectsHero: React.FC<ProjectsHeroProps> = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const textEl = textRef.current;
    if (!container || !stage || !textEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Signature 3D Perspective Horizon Tilt-Down Settle
      tl.fromTo(
        stage,
        {
          rotateX: 14,
          scale: 0.94,
          y: 40,
          opacity: 0.2,
          transformPerspective: 1200,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.45,
          ease: "power3.out",
        }
      );

      // 2. Background image gentle zoom-in settle
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          {
            scale: 1.18,
            filter: "brightness(0.65)",
          },
          {
            scale: 1.0,
            filter: "brightness(0.85)",
            duration: 1.7,
            ease: "power2.out",
          },
          0
        );
      }

      // 3. Staggered Top-Down Typography Drop
      tl.fromTo(
        textEl.children,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, stagger: 0.14, ease: "power3.out" },
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
      {/* 70% Viewport Height Banner Stage with 3D Perspective Horizon Tilt */}
      <div
        ref={stageRef}
        className="relative w-full h-[70vh] min-h-[480px] max-h-[620px] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.18)] will-change-transform"
      >
        {/* Full-Width Background Cinema Image */}
        <div ref={imageRef} className="absolute inset-0 w-full h-full will-change-transform">
          <Image
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
            alt="Cinematic Film Premiere and Production Works"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Top-Left Biased Gradient Scrim for Top-Left Heading Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/55 to-black/25" />
        </div>

        {/* Minimal Editorial Content Layer - Top-Left Corner Aligned */}
        <div className="absolute inset-0 z-10 flex flex-col justify-start items-start p-8 sm:p-12 md:p-14 text-white">
          <div ref={textRef} className="max-w-3xl text-left">
            <h1 className="font-serif italic text-white/90 text-3xl sm:text-5xl md:text-6xl leading-none mb-2.5 drop-shadow-md">
              SELECTED
            </h1>
            <div className="font-heading font-black uppercase text-white text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none drop-shadow-lg">
              WORKS & <span className="text-[#D5FF3F]">ARCHIVE</span>
            </div>
            <p className="mt-4 sm:mt-5 text-white/80 font-sans text-xs sm:text-sm md:text-base max-w-xl leading-relaxed drop-shadow-md">
              Commercial productions, brand anthem films, and multi-city visual campaigns engineered for industry leaders across India and abroad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
