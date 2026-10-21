"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface IndustryItem {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  brands: string;
  deliverables: string[];
  techSpec: string;
  image: string;
  stat: string;
  statLabel: string;
  icon: React.ReactNode;
}

export const IndustriesServed: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const INDUSTRIES_DATA: IndustryItem[] = [
    {
      id: "corporate-bfsi",
      name: "Corporate & BFSI",
      shortName: "Corporate & BFSI",
      subtitle: "Enterprise Authority & Leadership",
      brands: "Aditya Birla Capital · Fortune 500 Leaders",
      deliverables: ["Investor Pitch AVs", "Founder Documentaries", "Leadership Keynotes"],
      techSpec: "4K Master Audio · DaVinci Film Color",
      image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
      stat: "100%",
      statLabel: "Confidentiality & Compliance",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" stroke="currentColor">
          <path d="M6 42H42M10 42V18L24 8L38 18V42M18 42V28H30V42M18 20H20M28 20H30M24 14H24.02" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "healthcare-pharma",
      name: "Healthcare & Pharma",
      shortName: "Healthcare & Pharma",
      subtitle: "Precision Science & Human Touch",
      brands: "CIPLA · Medical Research Summits",
      deliverables: ["Doctor Roundtables", "Product Launch Films", "Clinical Care Documentaries"],
      techSpec: "Cinema Primes · Clean Acoustic Mastering",
      image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png",
      stat: "15M+",
      statLabel: "Practitioner Impressions",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" stroke="currentColor">
          <circle cx="24" cy="24" r="18" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M24 14V34M14 24H34" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="24" r="5" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: "d2c-startups",
      name: "D2C & Tech Startups",
      shortName: "D2C & Startups",
      subtitle: "High-Conversion Visual Momentum",
      brands: "Wol3D (Shark Tank India) · Baybot IoT",
      deliverables: ["Shark Tank Pitch Films", "High-Speed Product Ads", "E-Commerce Hero Cuts"],
      techSpec: "Dynamic Macro · 2D/3D Motion VFX",
      image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1735391835_CH%2035%20(1).jpg",
      stat: "4X",
      statLabel: "Average ROAS Lift",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" stroke="currentColor">
          <path d="M24 6L38 18V38L24 44L10 38V18L24 6Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M24 6V44M10 18L38 38M38 18L10 38" strokeWidth="1.2" strokeOpacity="0.4" />
          <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.6" />
        </svg>
      ),
    },
    {
      id: "energy-industry",
      name: "Energy & Infrastructure",
      shortName: "Energy & Infra",
      subtitle: "Grand Scale & Industrial Might",
      brands: "BPCL · India Energy Week",
      deliverables: ["Refinery & Plant Tours", "Anamorphic Expo Loops", "Safety & Vision Modules"],
      techSpec: "Pan-India 4K Crews · Certified Aerial Drones",
      image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png",
      stat: "8+",
      statLabel: "Cities Covered Simultaneously",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" stroke="currentColor">
          <path d="M26 6L14 26H24L22 42L34 22H24L26 6Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="19" strokeWidth="1.4" strokeOpacity="0.3" strokeDasharray="4 4" />
        </svg>
      ),
    },
    {
      id: "csr-social",
      name: "CSR & Social Impact",
      shortName: "CSR & Impact",
      subtitle: "Empathy, Ethics & Lasting Change",
      brands: "Pipal Tree · SNEHA NGO · That Fig Tree",
      deliverables: ["Field Impact Documentaries", "Beneficiary Stories", "Global Donor Showcases"],
      techSpec: "Natural Light · Authentic Unscripted Audio",
      image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959876_13.png",
      stat: "12+",
      statLabel: "Global Film Screenings",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" stroke="currentColor">
          <path d="M24 38C24 38 10 28 10 18C10 12.5 14.5 9 19.5 9C22.5 9 24 10.5 24 10.5C24 10.5 25.5 9 28.5 9C33.5 9 38 12.5 38 18C38 28 24 38 24 38Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 18V28M19 23H29" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      ),
    },
    {
      id: "trade-shows-expos",
      name: "Trade Shows & Expos",
      shortName: "Trade Shows & Expos",
      subtitle: "Showstopper Presence & Foot Traffic",
      brands: "HGH India · International Trade Summits",
      deliverables: ["Giant LED Wall Animations", "Booth Crowd-Pullers", "Same-Day Event Recaps"],
      techSpec: "8K Anamorphic Canvas · 24-Hour Turnaround",
      image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png",
      stat: "50K+",
      statLabel: "Booth Delegates Engaged",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12" stroke="currentColor">
          <rect x="8" y="10" width="32" height="22" rx="3" strokeWidth="1.8" />
          <path d="M16 38L24 32L32 38M24 32V42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 17L22 21L16 25" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="25" y1="25" x2="31" y2="25" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="industries"
      className="relative w-full bg-[#EAE3DB] text-[#141416] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      {/* 1. Header Block with Dumemearts Star Accent & Monumental Heading */}
      <div className="w-full max-w-[1440px] mx-auto text-center mb-16 sm:mb-20 flex flex-col items-center">
        {/* Eyebrow with Animated Sparkle */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#141416]/5 border border-[#141416]/10 mb-8 sm:mb-12 backdrop-blur-sm">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#141416]/80">
            INDUSTRIES WE SERVE
          </span>
          <span className="text-[#7567EE] text-xs animate-pulse">✦</span>
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#7567EE]">
            SPECIALIZED EXPERTISE
          </span>
        </div>

        {/* Big Editorial Heading - Dedicated wrapper with generous breathing room and lineHeight: 1.2 */}
        <div className="w-full py-4 sm:py-8 my-2 flex items-center justify-center">
          <h2
            className="font-humane text-[#141416] uppercase font-medium select-none whitespace-nowrap drop-shadow-xs"
            style={{
              fontSize: "clamp(46px, 7.8vw, 114px)",
              lineHeight: "1.25",
              letterSpacing: "0.04em",
            }}
          >
            SECTORS WE COMMAND..
          </h2>
        </div>

        {/* Minimal Subtitle with generous top gap */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#6E6B7B] max-w-2xl mt-8 sm:mt-12 leading-relaxed font-normal">
          Every industry demands its own visual dialect, compliance standards, and audience psychology. We engineer bespoke cinema-grade visual assets tailored to each sector.
        </p>
      </div>

      {/* 2. THE DUMEMEARTS CHASSIS (Ultra-clean, Minimalist Architecture) */}
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#111114] text-white border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] overflow-hidden">
          
          {/* Top Chassis Accent: Centered Glowing Status Dot */}
          <div className="w-full flex items-center justify-center pt-5 pb-3">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7567EE] shadow-[0_0_12px_#7567EE]" />
              <span className="absolute w-5 h-5 rounded-full bg-[#7567EE]/30 animate-ping pointer-events-none" />
            </div>
          </div>

          {/* Dumemearts Signature Industrial Striped Hazard / Aperture Ribbon */}
          <div className="w-full px-6 sm:px-10 overflow-hidden opacity-30 my-1 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="16"
              viewBox="0 0 1696 24"
              fill="none"
              className="text-white"
            >
              <pattern
                id="hazard-pattern"
                width="28"
                height="24"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="24" stroke="currentColor" strokeWidth="6" />
              </pattern>
              <rect width="100%" height="24" fill="url(#hazard-pattern)" />
            </svg>
          </div>

          {/* Horizontal Hairline Divider */}
          <div className="w-full h-[1px] bg-white/10 mt-2" />

          {/* 3. GROW CARDS LIST DECK (Dumemearts-Level Clean Minimalist Deck) */}
          <div className="w-full p-4 sm:p-6 lg:p-8">
            <div className="grow-cards-container flex flex-col lg:flex-row gap-3 sm:gap-4 w-full min-h-[500px] lg:h-[520px]">
              {INDUSTRIES_DATA.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                const isOther = isAnyHovered && !isHovered;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`relative rounded-2xl sm:rounded-3xl border overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-6 sm:p-7 ${
                      isHovered
                        ? "lg:flex-[3.2] bg-[#1A1A22] border-[#7567EE]/70 shadow-[0_0_35px_rgba(117,103,238,0.22)] z-20"
                        : isOther
                        ? "lg:flex-[0.85] bg-[#141417]/80 border-white/5 opacity-35 grayscale-[80%] z-10"
                        : "lg:flex-1 bg-[#16161B] border-white/10 hover:border-white/20 z-10"
                    }`}
                  >
                    {/* Background Visual Texture on Card */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                          isHovered
                            ? "opacity-35 scale-105 saturate-120"
                            : "opacity-10 scale-100 grayscale"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/85 to-transparent" />
                    </div>

                    {/* Technical Dumemearts Corner Brackets */}
                    <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
                    <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />

                    {/* Card Center: Elegant Minimalist Vector Emblem + Refined Typography */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full py-4 transition-all duration-500">
                      
                      {/* Luxury Minimalist Vector Icon with Soft Glow */}
                      <div
                        className={`transition-all duration-500 flex items-center justify-center rounded-2xl ${
                          isHovered
                            ? "text-[#7567EE] scale-110 drop-shadow-[0_0_15px_rgba(117,103,238,0.4)] mb-4"
                            : "text-white/65 hover:text-white mb-5"
                        }`}
                      >
                        {item.icon}
                      </div>

                      {/* Clean Refined Industry Title (Zero Awkward Overflow or Word Clipping) */}
                      <h3
                        className={`tracking-wide text-white transition-all duration-300 ${
                          isHovered
                            ? "text-2xl sm:text-3xl font-heading uppercase text-left w-full mt-2"
                            : "text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.18em] leading-relaxed max-w-[150px] mx-auto text-white/90"
                        }`}
                      >
                        {isHovered ? item.name : item.shortName}
                      </h3>

                      {/* Subtitle visible when card expands */}
                      {isHovered && (
                        <p className="text-xs text-white/60 font-sans tracking-wide mt-1.5 text-left w-full font-light animate-fadeIn">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Card Bottom Drawer (Expands smoothly on hover) */}
                    <div
                      className={`relative z-10 transition-all duration-500 overflow-hidden flex flex-col justify-end pt-3 border-t border-white/10 ${
                        isHovered
                          ? "opacity-100 max-h-[260px] translate-y-0"
                          : "lg:opacity-0 lg:max-h-0 lg:translate-y-4"
                      }`}
                    >
                      {/* Key Brands */}
                      <div className="mb-3">
                        <span className="text-xs sm:text-sm font-semibold text-white/95 tracking-wide block">
                          {item.brands}
                        </span>
                      </div>

                      {/* Deliverables: Refined Editorial List */}
                      <div className="space-y-1.5 mb-4 border-l-2 border-[#7567EE]/60 pl-3">
                        {item.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className="text-xs font-sans tracking-wide text-white/80 flex items-center gap-2"
                          >
                            <span className="text-[#7567EE] text-[9px]">✦</span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* Metrics & Action Link */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-base sm:text-lg font-bold font-heading text-[#7567EE] leading-none">
                            {item.stat}
                          </span>
                          <span className="text-[10px] text-white/50 font-mono uppercase tracking-wider mt-0.5">
                            {item.statLabel}
                          </span>
                        </div>

                        <Link
                          href="#projects"
                          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-white hover:text-[#7567EE] transition-colors py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                          FILMS <ArrowUpRight className="w-3.5 h-3.5 text-[#7567EE]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
