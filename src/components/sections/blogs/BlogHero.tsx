"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface BlogHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  categories?: string[];
}

export const BlogHero: React.FC<BlogHeroProps> = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-36 pb-16 md:pt-44 md:pb-24 px-6 lg:px-16 overflow-hidden bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Title - Clean and Massive, without redundant pills or search bar */}
        <div ref={titleRef} className="max-w-4xl text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-[#141416]/90 leading-none mb-2">
            BLOGS &
          </h1>
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase text-[#141416] leading-tight tracking-tight">
            INDUSTRY <span className="text-[#7567EE]">UPDATES</span>
          </div>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#4A4658] font-normal max-w-3xl leading-relaxed">
            Expert breakdowns, creative philosophies, and technical guides on commercial video production, remote editing, and brand storytelling.
          </p>
        </div>
      </div>
    </section>
  );
};
