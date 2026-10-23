"use client";

import React from "react";
import { KEY_FEATURES } from "@/data/servicesPageData";

export const ServicesKeyFeatures: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-[1360px] mx-auto w-full border-t border-[#141416]/10">
      {/* Title */}
      <div className="mb-14">
        <span className="block font-serif italic text-2xl sm:text-3xl text-[#141416]/80 tracking-wide mb-1">
          KEY
        </span>
        <h2 className="typo-h1 font-heading font-black tracking-tight uppercase text-[#141416]">
          FEATURES
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {KEY_FEATURES.map((feature, idx) => (
          <div
            key={feature.id}
            className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:bg-white/90 hover:border-[#141416]/25 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#EAE3DB] flex items-center justify-center p-3 mb-6 border border-[#141416]/10 shadow-inner">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="typo-h3 font-heading font-bold text-[#141416] mb-3">
                {feature.title}
              </h3>

              <p className="typo-body font-sans text-[#141416]/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
