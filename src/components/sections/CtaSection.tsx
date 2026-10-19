"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const CtaSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const letters = lettersRef.current?.querySelectorAll(".cta-letter");
    if (!letters || letters.length === 0) return;

    // Staggered reveal for individual letters (Exact Dumemearts Animation)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "restart pause resume pause",
      },
    });

    tl.fromTo(
      letters,
      {
        y: 110,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.045,
        ease: "power3.out",
      }
    );

    if (pillRef.current) {
      tl.fromTo(
        pillRef.current,
        {
          scale: 0.82,
          opacity: 0,
          y: 35,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const titleLetters = [
    { char: "C" },
    { char: "O" },
    { char: "N" },
    { char: "T" },
    { char: "A" },
    { char: "C" },
    { char: "T" },
    { char: "\u00A0" },
    { char: "M" },
    { char: "E" },
  ];

  return (
    <section
      ref={containerRef}
      id="cta"
      className="relative w-full bg-[#111113] text-white pt-24 pb-16 px-4 sm:px-8 overflow-hidden select-none flex flex-col items-center justify-between min-h-[580px] lg:min-h-[680px]"
    >
      {/* 1. Eyebrow Header: READY TO WORK? */}
      <div className="w-full text-center mb-6 sm:mb-8">
        <h3 className="text-sm sm:text-base md:text-lg font-heading font-extrabold uppercase tracking-[0.25em] text-white/90">
          READY TO WORK?
        </h3>
      </div>

      {/* 2. Giant Typography + Overlaid Pill Capsule Centerpiece */}
      <div className="relative w-full max-w-[1440px] flex items-center justify-center my-auto">
        
        {/* Giant Blue/Indigo Humane Font Typography */}
        <div
          ref={lettersRef}
          className="flex items-center justify-center w-full leading-[0.8] tracking-[-0.015em] text-[#7567EE] uppercase font-medium overflow-hidden"
          style={{
            fontFamily: "'Humane', sans-serif",
            fontSize: "clamp(130px, 22vw, 340px)",
          }}
          aria-label="CONTACT ME"
        >
          {titleLetters.map((item, idx) => (
            <span
              key={idx}
              className="cta-letter inline-block will-change-transform"
            >
              {item.char}
            </span>
          ))}
        </div>

        {/* Overlaid Center Pill Button */}
        <a
          ref={pillRef}
          href="#contact"
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group flex items-center gap-3 sm:gap-5 bg-[#17171A]/95 hover:bg-[#1C1C20] border-2 border-white/25 hover:border-white/60 rounded-full pl-6 sm:pl-9 pr-3 sm:pr-4 py-2.5 sm:py-3.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 will-change-transform"
        >
          {/* Contact Label with Distinct Ring Highlight */}
          <span className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wider flex items-center relative">
            C
            <span className="relative inline-flex items-center justify-center">
              O
              <span className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-white/20 border border-white/50 animate-ping pointer-events-none" />
            </span>
            NTACT
          </span>

          {/* Right White Circle Button with Black Arrow */}
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white group-hover:bg-zinc-100 flex items-center justify-center text-black flex-shrink-0 shadow-[0_4px_16px_rgba(255,255,255,0.25)] transition-all duration-300 group-hover:translate-x-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </a>

      </div>

      {/* 3. Bottom Minimal Navigation Links Divided by Stars */}
      <div className="w-full flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-white/70 mt-8 sm:mt-12 flex-wrap">
        <a href="/" className="hover:text-white transition-colors duration-200">
          HOME
        </a>
        
        {/* Star Icon Separator */}
        <span className="text-[#7567EE] flex items-center" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>
        </span>

        <a href="#about" className="hover:text-white transition-colors duration-200">
          ABOUT
        </a>

        {/* Star Icon Separator */}
        <span className="text-[#7567EE] flex items-center" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>
        </span>

        <a href="#projects" className="hover:text-white transition-colors duration-200">
          PROJECTS
        </a>

        {/* Star Icon Separator */}
        <span className="text-[#7567EE] flex items-center" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>
        </span>

        <a href="#contact" className="hover:text-white transition-colors duration-200">
          CONTACT
        </a>
      </div>

    </section>
  );
};
