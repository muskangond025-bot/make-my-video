"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

interface SpotlightItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  videoUrl: string;
}

const SPOTLIGHTS: SpotlightItem[] = [
  {
    id: "mayuri",
    number: "01",
    title: "MAYURI K",
    description:
      "Working with Make My Vid has been a game-changer. I get steady projects from national and international brands, allowing me to focus on storytelling and color craft without the hassle of client acquisition.",
    tags: ["Remote Editing", "Lead Video Editor", "2026"],
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/partnerships/67ac2ff62d47d_Community%20Video%20Editor.mp4",
  },
  {
    id: "aryan",
    number: "02",
    title: "ARYAN P",
    description:
      "I never thought shooting cinematic content on phone gear could become a full-time career. Now I capture events and commercial reels for top enterprises with complete schedule freedom.",
    tags: ["Mobile Cinematography", "Field Videographer", "2026"],
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/partnerships/67ac30181be6e__Community%20Phone%20Videographer.mp4",
  },
  {
    id: "tanvi",
    number: "03",
    title: "TANVI M",
    description:
      "From 3D product renders to kinetic typography, Make My Vid connects me with commercial shoots across Mumbai and London. The creative freedom and prompt payouts make it unmatched.",
    tags: ["3D Motion Design", "Title Designer", "2026"],
    videoUrl:
      "https://cdn.jsdelivr.net/gh/dumemearts/dumemearts-portfolio-2025@3e1bcf83b8c0f8153588ef8196097f062f913a04/videos/logitech-NEW-compressed.mp4",
  },
];

export const JoinSpotlights: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Scroll Runway Observer: Keeps the exact scroll animation timing intact
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = rect.height - windowHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      // Clean 3-zone scroll thresholds
      let nextIndex = 0;
      if (progress > 0.62) {
        nextIndex = 2;
      } else if (progress > 0.31) {
        nextIndex = 1;
      } else {
        nextIndex = 0;
      }

      setActiveIndex(nextIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340vh] select-none"
    >
      {/* Sticky Viewport Stage: Pinned in the center of the viewport */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center px-4 sm:px-8 z-10">
        
        {/* Stationary Light Stage Card */}
        <div className="w-full max-w-[1360px] rounded-[36px] sm:rounded-[48px] bg-white border border-[#141416]/10 text-[#141416] p-7 sm:p-11 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">
          
          {/* Top Bar: Clean Right-Aligned (APPLY) -> Button (No border-b dividing line) */}
          <div className="flex items-center justify-end mb-6">
            <a
              href="#application-form"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-[#141416]/20 bg-transparent hover:bg-[#141416] transition-all cursor-pointer shadow-xs"
            >
              <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-[#141416] group-hover:text-white transition-colors">
                APPLY
              </span>
              <div className="w-8 h-8 rounded-full bg-[#D5FF3F] text-[#141416] flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </a>
          </div>

          {/* Two-Column Internal Sliding Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: ROLLING TYPOGRAPHY & TAGS STACK                        */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between overflow-hidden">
              <div>
                {/* 1. Rolling Title Stack (Zero bottom clipping, exact 100% item slots) */}
                <div className="h-[80px] sm:h-[105px] lg:h-[120px] overflow-hidden relative mb-4">
                  <div
                    className="h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform: `translateY(-${activeIndex * 100}%)`,
                    }}
                  >
                    {SPOTLIGHTS.map((s) => (
                      <div
                        key={s.id}
                        className="h-full shrink-0 flex items-baseline gap-4"
                      >
                        <h3
                          className="uppercase text-[#141416] tracking-tight leading-none"
                          style={{
                            fontFamily: "'Humane', sans-serif",
                            fontWeight: 500,
                            fontSize: "clamp(72px, 8.5vw, 120px)",
                            lineHeight: 0.85,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {s.title}
                        </h3>
                        <span className="text-xl sm:text-2xl font-mono text-[#7567EE] font-bold">
                          ({s.number})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Rolling Description (Zero quotes, clean paragraph) */}
                <div className="h-[80px] sm:h-[95px] overflow-hidden relative mb-8">
                  <div
                    className="h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform: `translateY(-${activeIndex * 100}%)`,
                    }}
                  >
                    {SPOTLIGHTS.map((s) => (
                      <div key={s.id} className="h-full shrink-0 flex items-start">
                        <p className="text-sm sm:text-base text-[#4A4658] font-normal leading-relaxed max-w-xl">
                          {s.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Rolling Pill Tags Stack (No top dividing line, zero chopped borders) */}
              <div className="h-12 overflow-hidden relative mt-2">
                <div
                  className="h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transform: `translateY(-${activeIndex * 100}%)`,
                  }}
                >
                  {SPOTLIGHTS.map((s) => (
                    <div key={s.id} className="h-full shrink-0 flex items-center gap-2.5">
                      {s.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center rounded-full border border-[#141416]/20 bg-[#F8F6F2] px-5 py-2 text-xs font-sans font-semibold text-[#141416]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: ROLLING MEDIA REEL (Exact Video Strip)                */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 rounded-[28px] sm:rounded-[36px] bg-[#F8F6F2] p-3 sm:p-5 border border-[#141416]/10 shadow-lg relative overflow-hidden">
              <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden bg-black aspect-[16/10] sm:aspect-[16/9] w-full shadow-inner">
                {/* Rolling Video Strip */}
                <div
                  className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col"
                  style={{
                    transform: `translateY(-${activeIndex * 100}%)`,
                  }}
                >
                  {SPOTLIGHTS.map((s) => (
                    <div key={s.id} className="w-full h-full shrink-0 relative">
                      <video
                        src={s.videoUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Minimal Audio Mute/Unmute Toggle */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#7567EE] transition-colors cursor-pointer border border-white/20"
                    title={isMuted ? "Unmute audio" : "Mute audio"}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
