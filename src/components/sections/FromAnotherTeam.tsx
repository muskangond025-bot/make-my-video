"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TeamSlide {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  location: string;
}

const TEAM_SLIDES: TeamSlide[] = [
  {
    id: "01",
    num: "01",
    title: "Creative Partnership",
    subtitle: "Beijing & Shanghai",
    description:
      "What started in China as a creative partnership which became the foundation of everything we've built. The curiosity never stops there.",
    image:
      "https://images.prismic.io/fromanother-2026/abvHx7bci2UF6QeN_Team_01.jpg?auto=format,compress",
    location: "China · 2020",
  },
  {
    id: "02",
    num: "02",
    title: "Finding Our Footing",
    subtitle: "Ho Chi Minh City",
    description:
      "Saigon is where we found our footing. Fast, ambitious, never satisfied — shaped how we work and what we expect from ourselves.",
    image:
      "https://images.prismic.io/fromanother-2026/abpGZLbci2UF6KTT_02.jpg?auto=format,compress",
    location: "Saigon · Studio",
  },
  {
    id: "03",
    num: "03",
    title: "Boundless Horizon",
    subtitle: "Global Expeditions",
    description:
      "But good work doesn't stay in one place — and neither did we. We go wherever the next brief takes us, across Asia, Europe and beyond.",
    image:
      "https://images.prismic.io/fromanother-2026/abvHxrbci2UF6QeL_Team_03.jpg?auto=format,compress",
    location: "Tokyo · Paris",
  },
  {
    id: "04",
    num: "04",
    title: "The Collective",
    subtitle: "Artists & Directors",
    description:
      "The offices gave us roots in new places. The people gave us reasons to keep going — a collective of visionaries pushing commercial cinema.",
    image:
      "https://images.prismic.io/fromanother-2026/abvHx7bci2UF6QeM_Team_04.jpg?auto=format,compress",
    location: "Hong Kong · Worldwide",
  },
];

export const FromAnotherTeam: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const total = TEAM_SLIDES.length;
  const slide = TEAM_SLIDES[currentIdx];
  const nextSlide = TEAM_SLIDES[(currentIdx + 1) % total];

  const goNext = () => setCurrentIdx((prev) => (prev + 1) % total);
  const goPrev = () => setCurrentIdx((prev) => (prev - 1 + total) % total);

  // Set up GSAP ScrollTrigger for pinned slide progression on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${total * 100}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.15,
      snap: 1 / (total - 1),
      onUpdate: (self) => {
        const idx = Math.min(
          total - 1,
          Math.max(0, Math.round(self.progress * (total - 1)))
        );
        setCurrentIdx(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] bg-[#EAE3DB] text-[#141416] overflow-hidden select-none flex flex-col justify-between py-8 sm:py-12 px-6 sm:px-12 lg:px-20"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7567EE]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#D5FF3F]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Header Bar: Menu Indicator & Quick Action */}
      <div className="relative z-30 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="w-4 h-0.5 bg-[#141416]/70 inline-block"></span>
          <span className="text-xs uppercase tracking-widest font-mono text-[#4A4658] font-bold">
            Collective Identity
          </span>
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

      {/* 2. Main Center Showcase Stage */}
      <div
        ref={contentRef}
        className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto w-full"
      >
        {/* Left Indicator Sidebar (Vertical Chapter Sequence) */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-start gap-4 font-mono text-xs text-[#4A4658]/70">
          {[1, 2, 3].map((num) => (
            <span key={num} className="cursor-pointer hover:text-[#141416]">
              {num}
            </span>
          ))}

          {/* Active 4 - Our team */}
          <div className="flex items-center gap-2.5 text-[#141416] font-bold my-1">
            <span className="font-bold">4</span>
            <span className="w-5 h-[1.5px] bg-[#7567EE] inline-block" />
            <span className="italic font-serif text-[#7567EE] tracking-wide text-sm whitespace-nowrap font-bold">
              Our team
            </span>
          </div>

          {[5, 6, 7].map((num) => (
            <span key={num} className="cursor-pointer hover:text-[#141416]">
              {num}
            </span>
          ))}
        </div>

        {/* Center: Main Film Photography Portrait Card */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(20,20,22,0.12)] border border-[#141416]/10 group bg-white/70">
            {/* Film Photo with Smooth Transition */}
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Vintage Serif Watermark in top right */}
            <div className="absolute top-4 right-5 font-serif italic text-white/95 text-sm sm:text-base tracking-wider drop-shadow-md">
              fromanother
            </div>

            {/* Location Tag in bottom left */}
            <div className="absolute bottom-4 left-5 font-mono text-[11px] text-[#141416] font-bold uppercase tracking-widest bg-[#D5FF3F] px-2.5 py-1 rounded shadow-sm">
              {slide.location}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Next Teaser Preview */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full py-4 text-left">
          {/* Narrative Text */}
          <div className="max-w-md">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141416] mb-3">
              {slide.title}
            </h3>
            <p className="text-sm sm:text-base text-[#4A4658] font-normal leading-relaxed">
              {slide.description}
            </p>
          </div>

          {/* Incoming Slide Preview Card (Layered depth from screenshot) */}
          <div
            onClick={goNext}
            className="hidden sm:flex items-center gap-4 mt-8 pt-6 border-t border-[#141416]/10 cursor-pointer group"
          >
            <div className="w-20 h-24 rounded-lg overflow-hidden relative border border-[#141416]/15 opacity-85 group-hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm">
              <img
                src={nextSlide.image}
                alt={nextSlide.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A4658]/80 font-semibold">
                Next Chapter // {nextSlide.num}
              </span>
              <span className="text-sm text-[#141416] font-bold group-hover:text-[#7567EE] transition-colors">
                {nextSlide.title}
              </span>
              <span className="text-xs text-[#4A4658] font-mono">
                {nextSlide.subtitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Footer Bar: Giant Numeral & Controls */}
      <div className="relative z-30 flex items-end justify-between w-full pt-4 border-t border-[#141416]/10">
        {/* Giant Numeral */}
        <div className="flex items-baseline gap-2">
          <span className="font-sans font-bold text-7xl sm:text-8xl md:text-9xl text-[#141416] leading-none select-none tracking-tighter">
            {slide.num}
          </span>
          <span className="text-xs font-mono text-[#4A4658] tracking-widest uppercase pb-2 font-semibold">
            / 0{total}
          </span>
        </div>

        {/* Carousel Progress Lines & Navigation Buttons */}
        <div className="flex items-center gap-6 pb-2">
          {/* 4 Line Segment Indicators */}
          <div className="flex items-center gap-1.5">
            {TEAM_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  i === currentIdx
                    ? "w-8 bg-[#7567EE]"
                    : "w-3 bg-[#141416]/20 hover:bg-[#141416]/40"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-[#141416]/20 bg-white/70 hover:bg-[#D5FF3F] flex items-center justify-center text-[#141416] transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full border border-[#141416]/20 bg-white/70 hover:bg-[#D5FF3F] flex items-center justify-center text-[#141416] transition-all shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
