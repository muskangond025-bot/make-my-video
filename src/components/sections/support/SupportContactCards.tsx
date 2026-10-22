"use client";

import React, { useRef, useEffect } from "react";
import { Mail, MapPin, Globe, ArrowUpRight, Phone } from "lucide-react";
import { gsap, ScrollTrigger, CustomEase } from "@/lib/gsap";

export const SupportContactCards: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Card Hover Perspective Effect (Matching 3rd section of Home Page / Expertise)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;

    gsap.to(e.currentTarget, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cardsContainerRef.current || cards.length === 0) return;

      try {
        CustomEase.create("smoothSlideUp", "M0,0 C0.25,0.7 0.35,0.98 1,1");
      } catch {
        // already registered
      }

      // Initial State: Cards tilted (-2.5deg, 0deg, +2.5deg), offset down at y: 90, scaled at 0.92, zero opacity
      cards.forEach((card, i) => {
        const tilt = i === 0 ? -2.5 : i === 2 ? 2.5 : 0;
        gsap.set(card, {
          y: 90,
          scale: 0.92,
          opacity: 0,
          rotation: tilt,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });
      });

      // Smooth Slide-Up Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.15,
            ease: "smoothSlideUp",
          },
          i === 0 ? 0 : "<0.18"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-[1360px] mx-auto w-full select-none"
    >
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        style={{ perspective: 1200 }}
      >
        {/* CARD 1: DIRECT COMMUNICATIONS */}
        <div
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="w-full rounded-[32px] bg-white border-2 border-[#141416]/10 p-8 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-[#7567EE] flex flex-col justify-between text-left cursor-pointer transition-colors duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] border border-[#141416]/15">
                <Mail size={22} />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#141416] uppercase font-bold">
                COMMUNICATIONS
              </span>
            </div>

            {/* Highly Visible, Font-Sans Alphanumeric Text Block */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#141416] font-bold block mb-1.5">
                  General & Project Inquiries
                </span>
                <a
                  href="mailto:info@makemyvid.io?subject=Hello%20Make%20My%20Vid"
                  className="text-lg sm:text-xl font-sans font-black text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-2"
                  style={{ color: "#141416" }}
                >
                  <span className="tracking-tight">info@makemyvid.io</span>
                  <ArrowUpRight size={18} className="text-[#7567EE] shrink-0" />
                </a>
              </div>

              <div className="pt-3 border-t-2 border-[#141416]/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#141416] font-bold block mb-1.5">
                  India Direct Line
                </span>
                <a
                  href="tel:+917977484292"
                  className="text-lg sm:text-xl font-sans font-black text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-2"
                  style={{ color: "#141416" }}
                >
                  <Phone size={17} className="text-[#7567EE] shrink-0" />
                  <span className="tracking-tight">+91 79774 84292</span>
                </a>
              </div>

              <div className="pt-3 border-t-2 border-[#141416]/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#141416] font-bold block mb-1.5">
                  UK Representative Line
                </span>
                <a
                  href="tel:+447542550969"
                  className="text-lg sm:text-xl font-sans font-black text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-2"
                  style={{ color: "#141416" }}
                >
                  <Phone size={17} className="text-[#7567EE] shrink-0" />
                  <span className="tracking-tight">+44 75425 50969</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-[#141416]/10 mt-6 flex items-center justify-between">
            <span className="text-xs font-sans font-bold text-[#141416]">
              Mon - Sat • 10:00 AM - 8:00 PM IST
            </span>
            <div className="w-8 h-8 rounded-full bg-[#141416] text-white flex items-center justify-center">
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>

        {/* CARD 2: HEADQUARTERS OFFICE */}
        <div
          ref={(el) => {
            cardRefs.current[1] = el;
          }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="w-full rounded-[32px] bg-white border-2 border-[#141416]/10 p-8 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-[#7567EE] flex flex-col justify-between text-left cursor-pointer transition-colors duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] border border-[#141416]/15">
                <MapPin size={22} />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#7567EE] uppercase font-black">
                HEADQUARTERS
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-heading font-black text-[#141416] mb-3">
                Corporate Office
              </h3>
              <p className="text-sm font-sans font-medium text-[#141416] leading-relaxed">
                11, Star Trade Centre, Chamunda Circle, Sodawala Lane, Borivali West, Mumbai, Maharashtra 400092.
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#141416] font-bold block mb-1">
                Coordinates
              </span>
              <p className="text-sm font-mono font-bold text-[#141416]">
                19.233379° N, 72.855010° E
              </p>
            </div>
          </div>

          {/* Replaced "Get Directions" with Useful Facility Info */}
          <div className="pt-6 border-t-2 border-[#141416]/10 mt-6">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F6F2] border border-[#141416]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-sans font-bold text-[#141416]">
                  Client Meetings by Appointment
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#7567EE] tracking-wider">
                WEST HUB
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: PRODUCTION STUDIO */}
        <div
          ref={(el) => {
            cardRefs.current[2] = el;
          }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="w-full rounded-[32px] bg-white border-2 border-[#141416]/10 p-8 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-[#7567EE] flex flex-col justify-between text-left cursor-pointer transition-colors duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] border border-[#141416]/15">
                <Globe size={22} />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#7567EE] uppercase font-black">
                POST-PRODUCTION
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-heading font-black text-[#141416] mb-3">
                Editing Studio
              </h3>
              <p className="text-sm font-sans font-medium text-[#141416] leading-relaxed">
                Gala 6, Navratna Apartment, Asara Colony Road, Dattapada, Borivali East, Mumbai, Maharashtra 400066.
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#141416] font-bold block mb-1">
                Studio Capabilities
              </span>
              <p className="text-sm font-sans font-bold text-[#141416]">
                4K HDR Color Grading & Audio Mixing
              </p>
            </div>
          </div>

          {/* Replaced "Get Directions" with Studio Suite Specs */}
          <div className="pt-6 border-t-2 border-[#141416]/10 mt-6">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F6F2] border border-[#141416]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7567EE] shrink-0" />
                <span className="text-xs font-sans font-bold text-[#141416]">
                  Dual 4K DaVinci Resolve Suites
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#7567EE] tracking-wider">
                EAST HUB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
