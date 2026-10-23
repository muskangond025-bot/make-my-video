"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SPOTLIGHT_SERVICES } from "@/data/servicesPageData";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ServicesSpotlightProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSpotlight: React.FC<ServicesSpotlightProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardLeftRef.current || !cardRightRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Differential Parallax Drifting on independent column wrappers (avoids transform clobbering)
      if (colLeftRef.current) {
        gsap.to(colLeftRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (colRightRef.current) {
        gsap.to(colRightRef.current, {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Smooth Kinetic 3D Y-Axis Tilt Entrance on inner cards
      gsap.fromTo(
        cardLeftRef.current,
        {
          x: -55,
          rotateY: 8,
          opacity: 0.25,
          transformPerspective: 1200,
        },
        {
          x: 0,
          rotateY: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        cardRightRef.current,
        {
          x: 55,
          rotateY: -8,
          opacity: 0.25,
          transformPerspective: 1200,
        },
        {
          x: 0,
          rotateY: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-8 max-w-[1440px] mx-auto w-full py-16 sm:py-24 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-[#141416]/10 pb-8">
        <div>
          <h2 className="typo-h1 font-heading font-black tracking-tight uppercase text-[#141416]">
            PREMIER <span className="font-serif italic font-normal text-[#7567EE]">SOLUTIONS</span>
          </h2>
        </div>
        <p className="typo-body font-sans text-[#141416]/70 max-w-[480px] leading-relaxed">
          From on-ground multi-camera crews deployed across 50+ cities to remote cloud post-production suites built for high-stakes speed.
        </p>
      </div>

      {/* 2 Flagship Showcase Cards in Light Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch" style={{ perspective: 1200 }}>
        
        {/* Card 1: Multi City Video Production */}
        {SPOTLIGHT_SERVICES[0] && (
          <div ref={colLeftRef} className="w-full flex flex-col">
            <div
              ref={cardLeftRef}
              className="group relative bg-white/90 hover:bg-white text-[#141416] rounded-3xl overflow-hidden border border-[#141416]/10 hover:border-[#7567EE]/40 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-colors duration-300 transition-shadow duration-300 will-change-transform flex-1"
            >
            {/* Cinematic Widescreen Media Stage - Clean without overlays */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-6 border border-[#141416]/10 shadow-inner">
              <img
                src={SPOTLIGHT_SERVICES[0].image}
                alt={SPOTLIGHT_SERVICES[0].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content Details */}
            <div className="space-y-4 mb-6">
              <h3 className="typo-h2 font-heading font-black tracking-tight text-[#141416] group-hover:text-[#7567EE] transition-colors">
                {SPOTLIGHT_SERVICES[0].title}
              </h3>
              <p className="typo-body font-sans text-[#141416]/75 leading-relaxed">
                {SPOTLIGHT_SERVICES[0].description}
              </p>

              {/* Key Features Pill list */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                  <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                  <span>Verified Local Crews</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                  <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                  <span>Unified Sony FX Sensors</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                  <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                  <span>Single Creative Director</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                  <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                  <span>Same-Day DIT Uploads</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
              <div className="pt-5 border-t border-[#141416]/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectService && onSelectService(SPOTLIGHT_SERVICES[0].title)}
                  className="group/btn inline-flex items-center gap-2 typo-body font-sans font-bold text-[#141416] hover:text-[#7567EE] transition-colors"
                >
                  <span>Full Production Specs</span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-[#7567EE]"
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Remote Video Editing Services */}
        {SPOTLIGHT_SERVICES[1] && (
          <div ref={colRightRef} className="w-full flex flex-col">
            <div
              ref={cardRightRef}
              className="group relative bg-white/90 hover:bg-white text-[#141416] rounded-3xl overflow-hidden border border-[#141416]/10 hover:border-[#7567EE]/40 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-colors duration-300 transition-shadow duration-300 will-change-transform flex-1"
            >
              {/* Cinematic Widescreen Media Stage - Clean without overlays */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-6 border border-[#141416]/10 shadow-inner">
                <img
                  src={SPOTLIGHT_SERVICES[1].image}
                  alt={SPOTLIGHT_SERVICES[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content Details */}
              <div className="space-y-4 mb-6">
                <h3 className="typo-h2 font-heading font-black tracking-tight text-[#141416] group-hover:text-[#7567EE] transition-colors">
                  {SPOTLIGHT_SERVICES[1].title}
                </h3>
                <p className="typo-body font-sans text-[#141416]/75 leading-relaxed">
                  {SPOTLIGHT_SERVICES[1].description}
                </p>

                {/* Key Features Pill list */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                    <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                    <span>Timecode Frame Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                    <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                    <span>Color Grading & Sound Master</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                    <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                    <span>Dedicated Slack Channel</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-[#141416]/80">
                    <CheckCircle2 size={15} className="text-[#7567EE] shrink-0" />
                    <span>High-Speed Cloud Storage</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-5 border-t border-[#141416]/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectService && onSelectService(SPOTLIGHT_SERVICES[1].title)}
                  className="group/btn inline-flex items-center gap-2 typo-body font-sans font-bold text-[#141416] hover:text-[#7567EE] transition-colors"
                >
                  <span>Full Editing Specs</span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-[#7567EE]"
                  />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
