"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FEATURED_CAPABILITIES } from "@/data/servicesPageData";
import { BrandButton } from "@/components/shared/BrandButton";

export const ServicesFeaturedTags: React.FC = () => {
  return (
    <section className="relative py-16 px-4 sm:px-8 max-w-[1360px] mx-auto w-full border-t border-[#141416]/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="typo-caption uppercase tracking-widest text-[#7567EE] font-semibold block mb-1">
            CREATIVE PRODUCTION
          </span>
          <h2 className="typo-h2 font-heading font-black tracking-tight uppercase text-[#141416]">
            FEATURED SERVICES & SPECIALTIES
          </h2>
        </div>
        <BrandButton label="CUSTOM REQUEST" href="/support" size="sm" />
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {FEATURED_CAPABILITIES.map((capability, i) => (
          <Link
            key={i}
            href="/#contact"
            className="group px-6 py-4 rounded-2xl bg-white/60 hover:bg-white border border-[#141416]/10 hover:border-[#141416]/25 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-3"
          >
            <Sparkles size={16} className="text-[#7567EE] transition-transform group-hover:rotate-12" />
            <span className="text-sm sm:text-base font-heading font-bold text-[#141416]">
              {capability}
            </span>
            <ArrowUpRight
              size={15}
              className="text-[#141416]/40 transition-transform group-hover:text-[#141416] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
