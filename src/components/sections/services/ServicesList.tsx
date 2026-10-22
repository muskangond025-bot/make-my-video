"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, ArrowUpRight } from "lucide-react";
import { ALL_SERVICES_CATALOG, ServiceDetailItem } from "@/data/servicesPageData";

interface ServicesListProps {
  searchQuery: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({ searchQuery }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  const filteredServices = ALL_SERVICES_CATALOG.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.deliverables && item.deliverables.some((d) => d.toLowerCase().includes(q)))
    );
  });

  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-[1360px] mx-auto w-full border-t border-[#141416]/10">
      {/* Title */}
      <div className="mb-14">
        <span className="block font-serif italic text-2xl sm:text-3xl text-[#141416]/80 tracking-wide mb-1">
          WIDE RANGE
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight uppercase text-[#141416]">
          OF SERVICES TO CHOOSE
        </h2>
      </div>

      {filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-white/40 rounded-3xl border border-[#141416]/10">
          <p className="text-[#141416]/60 font-sans text-lg">
            No services found matching "{searchQuery}". Try a broader term.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredServices.map((service, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-white border-[#141416]/20 shadow-md"
                    : "bg-white/50 hover:bg-white/80 border-[#141416]/10"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full text-left px-6 sm:px-10 py-6 flex items-center justify-between gap-4"
                  aria-expanded={isExpanded}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#141416] tracking-tight">
                    {service.title}
                  </h3>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isExpanded
                        ? "bg-[#141416] text-white rotate-180"
                        : "bg-black/5 text-[#141416]"
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 sm:px-10 pb-8 pt-2 border-t border-black/5 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left Column: CTA & Headline */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="text-sm font-heading font-bold text-[#7567EE] tracking-wider uppercase">
                          {service.headline}
                        </div>
                        <p className="text-xs font-sans text-[#141416]/60">
                          Tailored production scopes designed for agency standards and corporate requirements.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141416] hover:bg-[#7567EE] text-white text-xs font-sans font-semibold transition-colors shadow-sm"
                          >
                            <span>Get Quote</span>
                            <ArrowUpRight size={14} />
                          </Link>
                          <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#141416]/5 border border-[#141416]/15 text-[#141416] text-xs font-sans font-semibold transition-colors"
                          >
                            <span>View Projects</span>
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Narrative & Deliverables */}
                      <div className="lg:col-span-8 space-y-5">
                        <p className="text-base sm:text-lg font-sans text-[#141416]/85 leading-relaxed">
                          {service.description}
                        </p>

                        {service.deliverables && (
                          <div className="pt-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141416]/50 mb-3">
                              Key Capabilities & Deliverables
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.deliverables.map((item, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="flex items-center gap-2 text-sm font-sans text-[#141416]/80 bg-[#EAE3DB]/40 px-3 py-2 rounded-xl border border-[#141416]/5"
                                >
                                  <CheckCircle2 size={16} className="text-[#7567EE] shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
