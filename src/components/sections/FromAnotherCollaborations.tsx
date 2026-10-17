"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CollabBrand {
  id: string;
  name: string;
  logo: string;
  category?: string;
}

const COLLAB_BRANDS: CollabBrand[] = [
  {
    id: "lv",
    name: "Louis Vuitton",
    logo: "https://images.prismic.io/fromanother-2026/aZX9osFoBIGEgiIZ_LV.png?auto=format,compress",
    category: "High Luxury & Fashion",
  },
  {
    id: "oneplus",
    name: "OnePlus",
    logo: "https://images.prismic.io/fromanother-2026/aZX9ycFoBIGEgiIh_OnePlus.png?auto=format,compress",
    category: "Consumer Tech & Devices",
  },
  {
    id: "chanel",
    name: "Chanel",
    logo: "https://images.prismic.io/fromanother-2026/aZX93sFoBIGEgiIk_Chanel.png?auto=format,compress",
    category: "Haute Couture & Fragrance",
  },
  {
    id: "glossier",
    name: "Glossier",
    logo: "https://images.prismic.io/fromanother-2026/aZX98cFoBIGEgiIq_Glossier.png?auto=format,compress",
    category: "Beauty & Skincare",
  },
  {
    id: "lamer",
    name: "La Mer",
    logo: "https://images.prismic.io/fromanother-2026/aZX-A8FoBIGEgiIr_LaMer.png?auto=format,compress",
    category: "Luxury Skincare",
  },
  {
    id: "loreal",
    name: "L'Oreal",
    logo: "https://images.prismic.io/fromanother-2026/aZX9jsFoBIGEgiIY_L%27Oreal.png?auto=format,compress",
    category: "Global Cosmetics",
  },
  {
    id: "dior",
    name: "Dior",
    logo: "https://images.prismic.io/fromanother-2026/aZX-PMFoBIGEgiIx_Dior.png?auto=format,compress",
    category: "French Luxury House",
  },
  {
    id: "oppo",
    name: "Oppo",
    logo: "https://images.prismic.io/fromanother-2026/aZX-TsFoBIGEgiI0_Oppo.png?auto=format,compress",
    category: "Mobile Innovation",
  },
  {
    id: "northface",
    name: "The North Face",
    logo: "https://images.prismic.io/fromanother-2026/aZX-XMFoBIGEgiI6_TheNorthFace.png?auto=format,compress",
    category: "Technical Outerwear",
  },
  {
    id: "88rising",
    name: "88rising",
    logo: "https://images.prismic.io/fromanother-2026/aZX-dsFoBIGEgiJC_88rising.png?auto=format,compress",
    category: "Music & Media Collective",
  },
  {
    id: "oribe",
    name: "Oribe",
    logo: "https://images.prismic.io/fromanother-2026/aZX-isFoBIGEgiJR_Oribe.png?auto=format,compress",
    category: "Artisanal Haircare",
  },
];

export const FromAnotherCollaborations: React.FC = () => {
  // Default to index 2 (Chanel) matching the screenshot
  const [activeIndex, setActiveIndex] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const total = COLLAB_BRANDS.length;
  const currentBrand = COLLAB_BRANDS[activeIndex] || COLLAB_BRANDS[2];

  const updateIndex = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(total - 1, index)));
    },
    [total]
  );

  // GSAP ScrollTrigger for smooth cylindrical scroll pinning
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${(total - 1) * 110}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.15,
      snap: 1 / (total - 1),
      onUpdate: (self) => {
        const rawIdx = self.progress * (total - 1);
        const closestIdx = Math.round(rawIdx);
        updateIndex(closestIdx);
      },
    });

    scrollTriggerRef.current = trigger;

    return () => {
      trigger.kill();
    };
  }, [total, updateIndex]);

  // Click on a brand in the arc to rotate it straight into center
  const selectBrand = (index: number) => {
    setActiveIndex(index);
    if (scrollTriggerRef.current) {
      const targetProgress = index / (total - 1);
      const scrollPos =
        scrollTriggerRef.current.start +
        targetProgress *
          (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="collaborations"
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] bg-[#EAE3DB] text-[#141416] overflow-hidden select-none flex flex-col justify-between py-8 sm:py-12 px-6 sm:px-12 lg:px-20"
    >
      {/* 1. Atmospheric Ambient Lighting Fog */}
      <div className="absolute -top-20 -left-20 w-[650px] h-[650px] bg-[#7567EE]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#D5FF3F]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[700px] h-[700px] bg-[#7567EE]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* 2. Top Header Bar: Chapter / Title / Action */}
      <div className="relative z-30 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="w-4 h-0.5 bg-[#141416]/70 inline-block"></span>
          <span className="text-xs uppercase tracking-widest font-mono text-[#4A4658] font-bold">
            Client Collaborations
          </span>
        </div>

        {/* Center Serif Watermark Logo */}
        <div className="font-serif italic text-lg sm:text-xl text-[#141416]/80 tracking-wide font-medium">
          fromanother
        </div>

        <a
          href="#contact"
          className="text-xs uppercase font-mono tracking-widest text-[#141416] hover:text-[#7567EE] flex items-center gap-2 group transition-colors font-semibold"
        >
          <span>Let&apos;s chat</span>
          <span className="transform group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </a>
      </div>

      {/* 3. Center Stage: Left Chapter Index + 3D Arc Roller + Right Logo & Narrative */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center my-auto w-full">
        
        {/* Far Left: Chapter Numbers (1..7 with 5 active) */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-start gap-4 font-mono text-xs text-[#4A4658]/70">
          {[1, 2, 3, 4].map((num) => (
            <span key={num} className="cursor-pointer hover:text-[#141416]">
              {num}
            </span>
          ))}

          {/* Active 5 — They trust us */}
          <div className="flex items-center gap-2.5 text-[#141416] font-bold my-1">
            <span className="font-bold">5</span>
            <span className="w-5 h-[1.5px] bg-[#7567EE] inline-block" />
            <span className="italic font-serif text-[#7567EE] tracking-wide text-sm whitespace-nowrap font-bold">
              They trust us
            </span>
          </div>

          {[6, 7].map((num) => (
            <span key={num} className="cursor-pointer hover:text-[#141416]">
              {num}
            </span>
          ))}
        </div>

        {/* Center-Left: 3D Cylindrical Arc Wheel */}
        <div className="lg:col-span-6 relative h-[420px] sm:h-[500px] flex items-center justify-start [perspective:1200px]">
          <div className="relative w-full h-full flex flex-col justify-center items-start">
            {COLLAB_BRANDS.map((brand, i) => {
              const delta = i - activeIndex;

              // Arc math for the curved cylindrical layout
              const translateY = delta * 82;
              const rotateX = delta * 22;
              const rotateZ = delta * -7;
              const translateZ = -Math.abs(delta) * 70;
              const scale = Math.max(0.4, 1 - Math.abs(delta) * 0.14);
              const opacity =
                delta === 0
                  ? 1
                  : Math.max(0.15, 1 - Math.abs(delta) * 0.28);
              const isCenter = delta === 0;

              // Render within +/- 4 slots to avoid clutter
              if (Math.abs(delta) > 4) return null;

              return (
                <div
                  key={brand.id}
                  onClick={() => selectBrand(i)}
                  style={{
                    transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                    opacity,
                    filter: !isCenter
                      ? `blur(${Math.min(2.5, Math.abs(delta) * 0.8)}px)`
                      : "none",
                  }}
                  className={`absolute left-4 sm:left-12 origin-left cursor-pointer transition-all duration-300 ease-out whitespace-nowrap py-1 ${
                    isCenter
                      ? "text-[#141416] font-bold drop-shadow-sm"
                      : "text-[#4A4658]/70 hover:text-[#141416]"
                  }`}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight">
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center-Right: Active Brand Logo & Description */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left lg:pl-6">
          {/* Active Brand Logo Card */}
          <div className="h-16 sm:h-20 flex items-center mb-6 sm:mb-8 transition-all duration-500">
            {currentBrand.logo ? (
              <div className="p-3 bg-white/85 rounded-xl border border-[#141416]/10 shadow-sm flex items-center justify-center">
                <img
                  key={currentBrand.id}
                  src={currentBrand.logo}
                  alt={currentBrand.name}
                  className="max-h-10 sm:max-h-12 max-w-[180px] sm:max-w-[220px] object-contain transition-transform duration-500"
                />
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-serif uppercase tracking-widest text-[#141416] font-bold">
                {currentBrand.name}
              </span>
            )}
          </div>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base text-[#4A4658] font-normal leading-relaxed max-w-md">
            From multinational companies to independent brands, we have been
            fortunate to work in a diversity of projects and clients.
          </p>

          {/* Brand Category Tag */}
          {currentBrand.category && (
            <div className="mt-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#141416] font-bold bg-[#D5FF3F] border border-[#D5FF3F] px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(213,255,63,0.35)]">
                {currentBrand.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Bar: Scroll Navigation & Direct Controls */}
      <div className="relative z-30 flex items-center justify-between w-full pt-4 border-t border-[#141416]/10 text-xs text-[#4A4658] font-mono tracking-wider font-semibold">
        <div className="flex items-center gap-3">
          <span>0{activeIndex + 1}</span>
          <span className="text-[#141416]/30">/</span>
          <span>0{total}</span>
          <span className="hidden sm:inline text-[#4A4658]/70 ml-2">
            · Scroll to rotate wheel
          </span>
        </div>

        {/* Up / Down Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => selectBrand((activeIndex - 1 + total) % total)}
            aria-label="Previous brand"
            className="w-8 h-8 rounded-full border border-[#141416]/20 bg-white/70 hover:bg-[#D5FF3F] flex items-center justify-center text-[#141416] transition-all shadow-sm"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => selectBrand((activeIndex + 1) % total)}
            aria-label="Next brand"
            className="w-8 h-8 rounded-full border border-[#141416]/20 bg-white/70 hover:bg-[#D5FF3F] flex items-center justify-center text-[#141416] transition-all shadow-sm"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
