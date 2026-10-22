"use client";

import React from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";

interface ServicesHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-8 max-w-[1360px] mx-auto w-full">
      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 pb-8 border-b border-[#141416]/10">
        <div>
          <span className="block font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#141416]/80 tracking-wide mb-1">
            AWESOME
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase text-[#141416] leading-none">
            VIDEO SOLUTIONS FOR
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

      {/* Interactive Search Bar */}
      <div className="max-w-xl">
        <div className="relative flex items-center bg-white/70 backdrop-blur-sm border border-[#141416]/15 rounded-2xl px-4 py-3 shadow-sm hover:border-[#141416]/30 focus-within:border-[#7567EE] focus-within:ring-2 focus-within:ring-[#7567EE]/20 transition-all">
          <Search size={20} className="text-[#141416]/40 mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH SERVICES & CAPABILITIES..."
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
    </section>
  );
};
