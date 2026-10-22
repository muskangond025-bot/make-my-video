"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, CustomEase } from "@/lib/gsap";
import { Play } from "lucide-react";

export const AboutMissionVision: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Exact 3D Card Hover Perspective Effect from <Expertise> (GSAP-powered, no CSS transition conflict)
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
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      if (!card1 || !card2) return;

      // Register CustomEase matching <Expertise> silky progressive deceleration curve
      try {
        CustomEase.create("smoothSlideUp", "M0,0 C0.25,0.7 0.35,0.98 1,1");
      } catch {
        // already registered
      }

      // 1. Initial State: Cards tilted at subtle angles (-2.5deg and +2.5deg), offset down at y: 100, scaled at 0.92, zero opacity
      gsap.set(card1, {
        y: 100,
        scale: 0.92,
        opacity: 0,
        rotation: -2.5,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      gsap.set(card2, {
        y: 100,
        scale: 0.92,
        opacity: 0,
        rotation: 2.5,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      // 2. Smooth Slide-Up Entrance Timeline with smoothSlideUp curve (identical to <Expertise>)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(card1, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.15,
        ease: "smoothSlideUp",
      }).to(
        card2,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.15,
          ease: "smoothSlideUp",
        },
        "<0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 px-6 lg:px-16 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Single Line & Left-Aligned */}
        <div className="text-left max-w-4xl mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black tracking-tight uppercase leading-none mb-3 text-[#141416] text-left">
            DREAM <span className="text-[#7567EE]">TO ACHIEVE.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A4658] font-normal text-left">
            The core vision and mission that fuel every frame we produce.
          </p>
        </div>

        {/* Dual Cards: Centered on Canvas with Natural Compact Height */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto"
        >
          {/* CARD 1: OUR MISSION */}
          <div
            ref={card1Ref}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="w-full rounded-[30px] bg-white border border-[#141416]/10 p-7 sm:p-9 shadow-lg hover:shadow-2xl hover:border-[#7567EE] flex flex-col justify-between text-left cursor-pointer select-none"
            style={{
              transformStyle: "preserve-3d",
              // Critical: NO CSS transition on transform so GSAP mouse tilt is 100% butter smooth
            }}
          >
            <div>
              {/* Title as per web */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-[#141416] tracking-tight mb-4 text-left">
                Our Mission
              </h3>

              {/* Body written in one continuous flow as per web */}
              <p className="text-sm sm:text-base md:text-lg text-[#33303E] font-normal leading-relaxed text-left">
                At Make My Vid, we’re passionate about helping brands tell their unique stories through engaging video content. We believe in harnessing the power of video content to elevate the value of your brand, making sure your messages not only reach the target audience but also leave a lasting impact.
              </p>
            </div>

            {/* Bottom Action Icon as per web */}
            <div className="mt-6 pt-2 flex items-center justify-start">
              <div className="w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center shadow-sm">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </div>
          </div>

          {/* CARD 2: OUR VISION */}
          <div
            ref={card2Ref}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="w-full rounded-[30px] bg-white border border-[#141416]/10 p-7 sm:p-9 shadow-lg hover:shadow-2xl hover:border-[#7567EE] flex flex-col justify-between text-left cursor-pointer select-none"
            style={{
              transformStyle: "preserve-3d",
              // Critical: NO CSS transition on transform so GSAP mouse tilt is 100% butter smooth
            }}
          >
            <div>
              {/* Title as per web */}
              <h3 className="text-3xl sm:text-4xl font-sans font-medium text-[#141416] tracking-tight mb-5 text-left">
                Our Vision
              </h3>

              {/* Body written in one continuous flow as per web */}
              <p className="text-base sm:text-lg text-[#33303E] font-normal leading-relaxed text-left">
                At Make My Vid, our vision is to be a leading platform for video content, known for our creativity and commitment to delivering real value to our clients. We aim to empower brands, entrepreneurs, and creators worldwide to effectively share their stories through engaging video content. Our goal is to be the preferred partner for diverse video needs, simplifying the process of creating impactful content that resonates with audiences everywhere.
              </p>
            </div>

            {/* Bottom Action Icon as per web */}
            <div className="mt-8 pt-2 flex items-center justify-start">
              <div className="w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center shadow-sm">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
