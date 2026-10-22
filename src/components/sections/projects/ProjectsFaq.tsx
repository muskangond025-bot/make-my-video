"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PROJECT_FAQS, FaqItem } from "@/data/projectsPageData";

export const ProjectsFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-[1040px] mx-auto w-full border-t border-[#141416]/10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-12 border-b border-[#141416]/10 pb-6">
        <h2 className="text-4xl sm:text-6xl font-heading font-black tracking-tight uppercase text-[#141416]">
          FAQS
        </h2>
        <span className="font-serif italic text-lg sm:text-xl text-[#141416]/60">
          We Are Here To Help
        </span>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {PROJECT_FAQS.map((faq: FaqItem, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 border ${
                isOpen
                  ? "bg-white border-[#141416]/20 shadow-md"
                  : "bg-white/40 hover:bg-white/70 border-[#141416]/10"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 sm:px-8 py-5 flex items-center justify-between gap-4"
                aria-expanded={isOpen}
              >
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#141416] tracking-tight">
                  {faq.question}
                </h3>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "bg-[#141416] text-white rotate-180"
                      : "bg-black/5 text-[#141416]"
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base font-sans text-[#141416]/80 leading-relaxed space-y-3 border-t border-black/5">
                  <p>{faq.answer}</p>
                  {faq.bullets && faq.bullets.length > 0 && (
                    <ul className="space-y-2 pl-4 list-disc marker:text-[#7567EE]">
                      {faq.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="pl-1">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
