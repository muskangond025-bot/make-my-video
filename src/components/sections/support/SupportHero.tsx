"use client";

import React from "react";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";

export const SupportHero: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-8 px-4 sm:px-8 max-w-[1360px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#141416]/10">
        <div>
          <span className="block font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#141416]/80 tracking-wide mb-1">
            GET IN TOUCH
          </span>
          <h1 className="typo-h1 font-heading font-black tracking-tighter uppercase text-[#141416] leading-none">
            LET’S TALK
          </h1>
        </div>

        <p className="max-w-md typo-body font-sans text-[#141416]/75 leading-relaxed">
          Ready to elevate your brand storytelling? Tell us about your project requirements or reach out directly to our production studio.
        </p>
      </div>
    </section>
  );
};
