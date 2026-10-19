"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Brand {
  id: string;
  name: string;
  tag: string;
  desc: string;
  logo: string;
  bgImage: string;
}

const BRANDS_DATA: Brand[] = [
  {
    id: "aditya-birla",
    name: "Aditya Birla Capital",
    tag: "Corporate · Financial Services",
    desc: "From leadership interviews to employee engagement and high-stakes fraud awareness campaigns, we partner with Aditya Birla Capital to enhance their national corporate communications.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e78c0bc623_logo2.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
  },
  {
    id: "cipla",
    name: "Cipla",
    tag: "Healthcare · Pharmaceuticals",
    desc: "Precision multi-city shoots across Mumbai and Goa delivering employee branding, onboarding films, and corporate culture documentaries showcasing their societal healthcare impact.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8656edbeb_logo9.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png",
  },
  {
    id: "bpcl",
    name: "Bharat Petroleum (BPCL)",
    tag: "Energy & Infrastructure",
    desc: "Comprehensive event coverage, 4K timelapses, giant LED screen broadcasts, and international delegate interviews at premier global energy expos including India Energy Week.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e89a63b9fc_logo20.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png",
  },
  {
    id: "wol3d",
    name: "Wol3D",
    tag: "3D Tech · Shark Tank India",
    desc: "Crafted high-converting pitch videos, commercial films, and product explainer campaigns that helped Wol3D pitch and close investment deals on Shark Tank India.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed87fd05ca_logo55.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png",
  },
  {
    id: "nisau",
    name: "NISAU UK",
    tag: "Global Tours · Education",
    desc: "Documenting phenomenal tours across 8 cities in India and high-profile delegations in the UK with multi-camera cinematography, photography, and real-time social edits.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed813bd21e_logo50.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959858_12.png",
  },
  {
    id: "mangalam",
    name: "Mangalam & Campure",
    tag: "E-Commerce & Retail",
    desc: "Produced high-converting Amazon product explainer and commercial video suites that continue driving retail performance, clicks, and brand trust 4+ years later.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8afca1dfc_logo29.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png",
  },
  {
    id: "baybot",
    name: "Baybot",
    tag: "Smart Home & IoT",
    desc: "Dynamic product explainer videos, unboxings, and consumer installation walkthroughs optimized for Amazon listings and high-conversion digital performance ad campaigns.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e7b3e41b51_logo4.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1735391835_CH%2035%20(1).jpg",
  },
  {
    id: "zee-media",
    name: "Zee Media",
    tag: "Broadcast & News Media",
    desc: "Fast-paced broadcast video production, corporate AV showcases, and digital snippets engineered for maximum viewer retention and national broadcast reach.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed8ad93b67_logo57.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959841_11.png",
  },
  {
    id: "motilal-oswal",
    name: "Motilal Oswal",
    tag: "Wealth Management & Finance",
    desc: "Creating polished executive corporate films, client case studies, and investor communications tailored with pristine motion graphics and cinematic grading.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8bce56518_logo34.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
  },
  {
    id: "pipal-tree",
    name: "Pipal Tree",
    tag: "Sustainable Development",
    desc: "Directing sensitive documentary short films focused on sustainable rural development and community transformation, showcased to global audiences and delegates worldwide.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8c40d1cbb_logo36.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959876_13.png",
  },
  {
    id: "crompton",
    name: "Crompton",
    tag: "Consumer Electricals",
    desc: "Showcasing high-impact commercial product launches, dealer meets, and internal team engagement films with cinema-grade camera work and dynamic sound design.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e868785e02_logo10.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png",
  },
  {
    id: "welspun",
    name: "Welspun India",
    tag: "Global Conglomerate & Textiles",
    desc: "Crafting comprehensive corporate facility documentaries, safety awareness modules, and sustainability initiative videos for industrial facilities.",
    logo: "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed86853fe8_logo54.jpg",
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png",
  },
];

export const TrustedBrands: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(6); // Default to Wellvia (index 6) as in screenshot
  const [isMobile, setIsMobile] = useState(false);

  // Resize listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update visible brand content
  const handleIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Set up ScrollTrigger on desktop using CSS sticky track (eliminates buggy pin-spacer)
  useEffect(() => {
    if (isMobile) return;

    const track = trackRef.current;
    const list = listRef.current;
    const wrap = wrapRef.current;
    if (!track || !list || !wrap) return;

    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    const itemHeight = items[0].offsetHeight || 72;
    const wrapCenter = wrap.offsetHeight / 2;

    const renderList = (progress: number) => {
      const virtualIndex = progress * (items.length - 1);
      const y = wrapCenter - (virtualIndex * itemHeight + itemHeight / 2);

      gsap.set(list, { y });

      items.forEach((item, i) => {
        const distance = Math.abs(i - virtualIndex);
        let opacity = 0.25;

        if (distance < 0.5) opacity = 1;
        else if (distance < 1.5) opacity = 0.85;
        else if (distance < 2.5) opacity = 0.60;
        else if (distance < 3.5) opacity = 0.40;

        gsap.set(item, { opacity });
      });

      const closestIndex = Math.round(virtualIndex);
      const distanceFromCenter = Math.abs(virtualIndex - closestIndex);

      if (distanceFromCenter < 0.18) {
        handleIndexChange(closestIndex);
      }
    };

    // Initialize list position
    renderList(6 / (items.length - 1));

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      snap: 1 / (items.length - 1),
      onUpdate: (self) => {
        renderList(self.progress);
      },
    });

    scrollTriggerRef.current = trigger;

    // Refresh ScrollTrigger to calculate exact pixel offsets without layout mismatch
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      trigger.kill();
    };
  }, [isMobile, handleIndexChange]);

  // Click on a brand in list to center on it
  const selectBrand = (index: number) => {
    setActiveIndex(index);
    if (scrollTriggerRef.current) {
      const targetProgress = index / (BRANDS_DATA.length - 1);
      const scrollPos =
        scrollTriggerRef.current.start +
        targetProgress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  const currentBrand = BRANDS_DATA[activeIndex] || BRANDS_DATA[6];

  return (
    <div
      ref={trackRef}
      id="brands-track"
      className="relative w-full"
      style={{ height: isMobile ? "auto" : `${(BRANDS_DATA.length - 1) * 95 + 1000}px` }}
    >
      <section
        ref={sectionRef}
        id="brands"
        className="w-full h-screen min-h-[680px] max-h-[1080px] bg-[#EAE3DB] overflow-hidden select-none flex items-center sticky top-0 z-10"
      >
      {/* 1. Full-Bleed Dynamic Background Product Photos with soft lightness */}
      {BRANDS_DATA.map((brand, idx) => (
        <div
          key={brand.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out pointer-events-none ${
            idx === activeIndex ? "opacity-35 z-0" : "opacity-0 z-[-1]"
          }`}
        >
          <img
            src={brand.bgImage}
            alt={brand.name}
            className="w-full h-full object-cover object-right md:object-center transform scale-105 transition-transform duration-1000 ease-out filter saturate-120"
          />
        </div>
      ))}

      {/* 2. Warm Sand Editorial Vignette & Readability Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#EAE3DB]/95 via-[#EAE3DB]/90 to-[#EAE3DB]/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[#EAE3DB]/40 backdrop-blur-[1px] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#EAE3DB]/95 via-transparent to-[#EAE3DB]/80 pointer-events-none z-10" />

      {/* 3. Main Content Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-between py-12 lg:py-20">
        
        {/* Top Header Badge */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7567EE] animate-pulse shadow-[0_0_8px_rgba(117,103,238,0.8)]"></span>
            <span className="text-xs uppercase font-mono tracking-widest text-[#7567EE] font-bold drop-shadow-sm">
              Client Portfolio Spotlight
            </span>
          </div>
          <span className="text-xs font-mono text-[#141416]/70 font-semibold tracking-wider">
            {String(activeIndex + 1).padStart(2, "0")} / {String(BRANDS_DATA.length).padStart(2, "0")}
          </span>
        </div>

        {/* Center Grid: Left Brand Roller & Right Brand Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
          
          {/* Left Column: Brand Names List (Roulette Roller) */}
          <div className="lg:col-span-7 relative">
            <div
              ref={wrapRef}
              className="brands-list-wrap relative h-[400px] sm:h-[480px] md:h-[540px] overflow-hidden flex flex-col items-start justify-start"
            >
              <div
                ref={listRef}
                className="brands-list flex flex-col w-full will-change-transform"
              >
                {BRANDS_DATA.map((brand, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={brand.id}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      onClick={() => selectBrand(i)}
                      className={`brand-item py-3 sm:py-4 cursor-pointer transition-all duration-300 text-left ${
                        isActive
                          ? "text-[#141416] opacity-100 translate-x-4 drop-shadow-sm"
                          : "text-[#4A4658]/70 hover:text-[#141416]"
                      }`}
                    >
                      <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight transition-all duration-200 inline-block py-1 leading-[1.2] ${
                        isActive ? "font-bold text-[#141416]" : "font-medium text-[#4A4658]"
                      }`}>
                        {brand.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Title + Active Brand Card */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left lg:pl-8">
            <div className="bg-white/85 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#7567EE]/20 shadow-[0_12px_40px_rgba(20,20,22,0.08)] transition-all duration-500">
              <h2 className="text-xl sm:text-2xl md:text-3xl text-[#141416] font-bold tracking-tight mb-6">
                Trusted by over 100+ companies
              </h2>

              {/* Dynamic Brand Card */}
              <div className="transition-all duration-500 transform">
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  {currentBrand.logo && (
                    <div className="h-10 px-3 py-1.5 rounded-lg bg-[#EAE3DB]/80 border border-[#141416]/10 flex items-center justify-center shadow-sm">
                      <img
                        src={currentBrand.logo}
                        alt={currentBrand.name}
                        className="h-7 max-w-[120px] object-contain"
                      />
                    </div>
                  )}
                  <span className="inline-block text-xs uppercase tracking-wider text-[#141416] font-mono font-bold py-1.5 px-3.5 rounded-full bg-[#D5FF3F] border border-[#D5FF3F] shadow-[0_2px_8px_rgba(213,255,63,0.35)]">
                    {currentBrand.tag}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#141416]/90 leading-relaxed font-normal">
                  {currentBrand.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator / Instruction */}
        <div className="flex items-center justify-between text-xs text-[#141416]/60 font-mono tracking-wider pt-4 border-t border-[#141416]/10">
          <span>Scroll to cycle partners</span>
          <span>Click any brand to inspect</span>
        </div>
      </div>
    </section>
  </div>
  );
};
