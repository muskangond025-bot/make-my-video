"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandButton } from "@/components/shared/BrandButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee continuous auto-play in modern browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Full-Width Video Canvas Curtain Clip-Path Reveal
      if (canvasRef.current) {
        tl.fromTo(
          canvasRef.current,
          {
            clipPath: "inset(12% 0% 12% 0% round 36px)",
            opacity: 0.3,
            scale: 0.98,
          },
          {
            clipPath: "inset(0% 0% 0% round 36px)",
            opacity: 1,
            scale: 1,
            duration: 1.35,
            ease: "power3.inOut",
          }
        );
      }

      // 2. Video Zoom Out Entrance & Scroll Parallax
      if (videoWrapperRef.current) {
        tl.fromTo(
          videoWrapperRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 1.6, ease: "power2.out" },
          "-=1.2"
        );

        gsap.to(videoWrapperRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. Kinetic Headline & Subheading Stagger Reveal (Layered over playing video)
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".kinetic-line");
        tl.fromTo(
          lines,
          { yPercent: 125, opacity: 0, rotateZ: 1.5 },
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.9"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-14 bg-[#EAE3DB] text-[#141416] select-none overflow-hidden"
    >
      <div className="max-w-[1520px] mx-auto">
        
        {/* ========================================================================= */}
        {/* FULL-WIDTH CINEMATIC PLAYING VIDEO CANVAS                                 */}
        {/* ========================================================================= */}
        <div
          ref={canvasRef}
          className="relative w-full h-[68vh] sm:h-[78vh] md:h-[84vh] lg:h-[88vh] rounded-[28px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden bg-[#141416] shadow-[0_30px_90px_rgba(20,20,22,0.22)] border border-[#141416]/10"
        >
          {/* Continuous Genuine Video Playing Background */}
          <div
            ref={videoWrapperRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
            >
              <source src="/videos/hero-rohan.mp4" type="video/mp4" />
              <source src="/videos/hero-reel.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Clean Cinematic Gradient Overlay for Optimal Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40 pointer-events-none" />

          {/* Film Grain Texture Accent */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* ----------------------------------------------------------------------- */}
          {/* FOREGROUND HERO CONTENT OVERLAYING THE PLAYING VIDEO                    */}
          {/* ----------------------------------------------------------------------- */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 pointer-events-none">
            
            {/* TOP/MIDDLE: PROFESSIONAL ABOUT US JOURNEY HEADLINE & SUBHEAD */}
            <div ref={headlineRef} className="flex flex-col max-w-5xl pt-2 sm:pt-4">
              

              {/* Main Headline Line 1 */}
              <div className="overflow-hidden py-0.5 sm:py-1">
                <h1
                  className="kinetic-line font-humane text-white text-[12vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.2vw] leading-[0.82] uppercase font-medium tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] select-none"
                  style={{
                    fontFamily: "'Humane', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                  }}
                >
                  THE MAKE MY VID JOURNEY
                </h1>
              </div>

              {/* Main Headline Line 2 in Electric Lime Brand Color */}
              <div className="overflow-hidden py-0.5 sm:py-1">
                <span
                  className="kinetic-line font-humane text-[#D5FF3F] text-[12vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[7.2vw] leading-[0.82] uppercase font-medium tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] select-none"
                  style={{
                    fontFamily: "'Humane', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                  }}
                >
                  A DECADE OF VISUAL STORYTELLING
                </span>
              </div>

              {/* Professional Editorial Subheading */}
              <div className="overflow-hidden pt-4 sm:pt-6 max-w-3xl">
                <p className="kinetic-line typo-body text-white/95 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                  What began as a solo passion for cinematic editing by founder Rohan Joshi has grown into a globally recognized video production house. Today, we craft high-retention commercial films, visionary brand campaigns, and cultural visual stories for ambitious brands worldwide.
                </p>
              </div>

              {/* Action Button */}
              <div className="overflow-hidden pt-5 sm:pt-7 pointer-events-auto">
                <BrandButton label="EXPLORE OUR STORY" href="#story" size="md" />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
