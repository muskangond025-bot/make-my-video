"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { SPOTLIGHT_SERVICES } from "@/data/servicesPageData";

interface ServicesSpotlightProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSpotlight: React.FC<ServicesSpotlightProps> = ({ onSelectService }) => {
  return (
    <section className="relative px-4 sm:px-8 max-w-[1360px] mx-auto w-full pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SPOTLIGHT_SERVICES.map((service, index) => (
          <div
            key={service.id}
            className="group relative bg-white/60 hover:bg-white/90 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            {/* Visual Media Poster */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#141416]/5 mb-6 shadow-inner">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-xs font-sans tracking-wider uppercase font-semibold">
                  {service.tag}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7567EE] font-semibold block mb-1">
                  {service.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black tracking-tight text-[#141416]">
                  {service.title}
                </h3>
                <p className="text-sm font-sans text-[#141416]/75 mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#141416]/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectService && onSelectService(service.title)}
                  className="group/btn inline-flex items-center gap-2 text-sm font-sans font-bold text-[#141416] hover:text-[#7567EE] transition-colors"
                >
                  <span>Know More</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </button>

                <Link
                  href="/#contact"
                  className="px-4 py-2 rounded-full bg-[#141416] text-[#EAE3DB] hover:bg-[#7567EE] text-xs font-sans font-semibold transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
