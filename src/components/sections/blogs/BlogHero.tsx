"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface BlogHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  categories?: string[];
}

export const BlogHero: React.FC<BlogHeroProps> = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pillStageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pillStage = pillStageRef.current;
    const contentEl = contentRef.current;
    if (!container || !pillStage || !contentEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // 1. Signature Pill-to-Fullscreen Expansion Reveal
      tl.fromTo(
        pillStage,
        {
          clipPath: "inset(22% 30% 22% 30% round 9999px)",
          opacity: 0.3,
          scale: 0.94,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 36px)",
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power4.inOut",
        }
      );

      // 2. Background image gentle zoom-in to normal scale
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.25, filter: "brightness(0.65)" },
          { scale: 1, filter: "brightness(0.85)", duration: 1.8, ease: "power2.out" },
          0
        );
      }

      // 3. Staggered typography reveal
      tl.fromTo(
        contentEl.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power3.out" },
        "-=0.7"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 max-w-[1440px] mx-auto select-none"
    >
      {/* 70% Viewport Height Banner Stage with Pill Expansion Curtain */}
      <div
        ref={pillStageRef}
        className="relative w-full h-[70vh] min-h-[480px] max-h-[620px] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.18)] will-change-transform"
      >
        {/* Full-bleed Cinematic Background Image */}
        <div ref={imageRef} className="absolute inset-0 w-full h-full will-change-transform">
          <Image
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2069&auto=format&fit=crop"
            alt="Cinematic Storytelling & Production Suite"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Top-Left Biased Gradient Scrim for Top-Left Heading Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/55 to-black/25" />
        </div>

        {/* Top-Left Corner Heading Layer */}
        <div className="absolute inset-0 z-10 flex flex-col justify-start items-start p-8 sm:p-12 md:p-14 text-white">
          <div ref={contentRef} className="max-w-3xl text-left">
            <h1 className="font-serif italic text-white/90 text-3xl sm:text-5xl md:text-6xl leading-none mb-2.5 drop-shadow-md">
              BLOGS &
            </h1>
            <div className="font-heading font-black uppercase text-white text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none drop-shadow-lg">
              CREATIVE <span className="text-[#D5FF3F]">CHRONICLES</span>
            </div>
            <p className="mt-4 sm:mt-5 text-white/80 font-sans text-xs sm:text-sm md:text-base max-w-xl leading-relaxed drop-shadow-md">
              Expert breakdowns, creative philosophies, and technical guides on commercial filmmaking, remote cloud editing, and impactful brand storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
