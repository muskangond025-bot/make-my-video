"use client";

import React, { useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { gsap } from "gsap";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const BlogHero: React.FC<BlogHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      {/* Soft Interactive Radial Glow */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Subtle Minimal Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#7567EE]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A4658]">
            Studio Journal & Industry Insights
          </span>
        </div>

        {/* Hero Title */}
        <div ref={titleRef} className="mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-[#141416]/90 leading-none mb-2">
            BLOGS &
          </h1>
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase text-[#141416] leading-tight tracking-tight">
            INDUSTRY <span className="text-[#7567EE]">UPDATES</span>
          </div>
          <p className="mt-4 text-base sm:text-lg text-[#4A4658] font-normal max-w-2xl leading-relaxed">
            Expert breakdowns, creative philosophies, and technical guides on commercial video production, remote editing, and brand storytelling.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-6 border-t border-[#141416]/10">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4658]" />
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#141416]/15 text-sm text-[#141416] placeholder-[#4A4658]/60 focus:outline-none focus:border-[#7567EE] shadow-sm transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#141416] text-[#EAE3DB] shadow-md"
                      : "bg-white text-[#4A4658] hover:text-[#141416] hover:bg-white/80 border border-[#141416]/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
