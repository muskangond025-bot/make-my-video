"use client";

import React from "react";
import { Search, X, Sparkles, Film, ArrowDownRight } from "lucide-react";

interface ProjectsHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  totalProjects: number;
}

export const ProjectsHero: React.FC<ProjectsHeroProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
  totalProjects,
}) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-8 max-w-[1360px] mx-auto w-full">
      {/* Editorial Premium Banner Container */}
      <div className="relative rounded-[36px] sm:rounded-[44px] bg-white border border-[#141416]/10 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#7567EE]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D5FF3F]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-[#141416]/10 pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416]/5 border border-[#141416]/10 text-xs font-mono font-semibold uppercase tracking-wider text-[#141416]">
            <Film size={13} className="text-[#7567EE]" />
            <span>DIRECTORS ARCHIVE • 2026</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#141416]/60">
            <span>SHOWCASING {totalProjects} PRODUCTIONS</span>
            <span>•</span>
            <span className="text-[#7567EE] font-bold">4K CINEMA MASTERING</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-12">
          <div className="lg:col-span-8">
            <h1
              className="uppercase text-[#141416] tracking-tight leading-none typo-h1"
              style={{
                fontFamily: "'Humane', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(64px, 10vw, 140px)",
                lineHeight: 0.82,
                letterSpacing: "0.01em",
              }}
            >
              SELECTED WORKS
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="typo-body text-[#4A4658] font-normal leading-relaxed">
              From global corporate summits to intimate agrarian documentaries — explore our portfolio of cinematic commercial productions.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#141416]/60">
              <ArrowDownRight size={14} className="text-[#7567EE]" />
              <span>SCROLL DOWN TO REVEAL CARD DECK</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-5 pt-6 border-t border-[#141416]/10">
          {/* Search Input Box */}
          <div className="relative w-full max-w-xl">
            <div className="relative flex items-center bg-[#F8F6F2] border border-[#141416]/15 rounded-2xl px-4 py-3 shadow-inner hover:border-[#141416]/30 focus-within:border-[#7567EE] focus-within:ring-2 focus-within:ring-[#7567EE]/20 transition-all">
              <Search size={18} className="text-[#141416]/40 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="SEARCH PROJECT, BRAND OR SPECIALTY..."
                className="w-full bg-transparent border-0 outline-none text-[#141416] placeholder:text-[#141416]/40 font-sans text-xs sm:text-sm tracking-wider uppercase font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                  className="p-1 rounded-full text-[#141416]/50 hover:text-[#141416] hover:bg-black/5"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-sans font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#141416] text-white shadow-sm"
                      : "bg-[#F8F6F2] hover:bg-white text-[#141416]/75 hover:text-[#141416] border border-[#141416]/10"
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
