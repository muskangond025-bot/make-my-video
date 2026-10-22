"use client";

import React from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";

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
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 max-w-[1360px] mx-auto w-full">
      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 pb-8 border-b border-[#141416]/10">
        <div>
          <span className="block font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#141416]/80 tracking-wide mb-1">
            CREATING
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase text-[#141416] leading-none">
            MASTERPIECES
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141416] text-[#EAE3DB] hover:bg-[#7567EE] transition-all duration-300 font-sans font-semibold tracking-wide shadow-lg hover:shadow-xl"
          >
            <span>Get Quote</span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col gap-6">
        {/* Search Input Box */}
        <div className="relative w-full max-w-xl mx-auto md:mx-0">
          <div className="relative flex items-center bg-white/70 backdrop-blur-sm border border-[#141416]/15 rounded-2xl px-4 py-3 shadow-sm hover:border-[#141416]/30 focus-within:border-[#7567EE] focus-within:ring-2 focus-within:ring-[#7567EE]/20 transition-all">
            <Search size={20} className="text-[#141416]/40 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="SEARCH PROJECT OR CLIENT..."
              className="w-full bg-transparent border-0 outline-none text-[#141416] placeholder:text-[#141416]/40 font-sans text-sm tracking-wider uppercase font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="p-1 rounded-full text-[#141416]/50 hover:text-[#141416] hover:bg-black/5"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-[#141416] text-white shadow-md"
                    : "bg-white/50 hover:bg-white text-[#141416]/75 hover:text-[#141416] border border-[#141416]/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
