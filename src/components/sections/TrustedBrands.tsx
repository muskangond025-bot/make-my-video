"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  tags: string[];
  bgImage: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "remote-editing",
    name: "Remote Editing Work",
    category: "POST-PRODUCTION // 24-48H RAPID",
    desc: "High-precision global video editing for tech brands, agencies, and creators. Includes cinematic color grading, dynamic motion graphics, sound design, and rapid iterative turnarounds.",
    tags: ["DaVinci Color", "Motion VFX", "Spatial Audio", "Multi-Ratio Cuts"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png",
  },
  {
    id: "corporate-av",
    name: "Corporate AV",
    category: "ENTERPRISE // BRAND NARRATIVE",
    desc: "High-impact corporate brand films, investor showcases, and founder documentaries that articulate your enterprise mission, technological moat, and market leadership with cinematic gravity.",
    tags: ["Leadership Keynotes", "Investor Pitches", "Office & Plant Tours", "CSR Modules"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
  },
  {
    id: "trade-shows",
    name: "Trade Shows & Exhibition Videos",
    category: "EXPOS & SUMMITS // VISUAL SPECTACLE",
    desc: "Attention-commanding booth loops, giant anamorphic LED video walls, product demos, and showstopper teasers engineered to halt foot traffic at international trade shows and expos.",
    tags: ["High-Res LED Wall Loops", "3D Product Demos", "Booth Teasers", "Same-Day Recaps"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png",
  },
  {
    id: "corporate-events",
    name: "Corporate Events",
    category: "ON-SITE COVERAGE // PAN-INDIA",
    desc: "Full-scale cinematic event documentation across India's top metros. Multi-camera 4K coverage capturing keynote speeches, award galas, and VIP delegate networking with same-day highlight reels.",
    tags: ["Multi-City Crews", "Same-Day Teasers", "Gala & Awards Filming", "Executive Sound"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png",
  },
  {
    id: "live-telecast",
    name: "Live Telecast of Events",
    category: "BROADCAST // ULTRA-LOW LATENCY",
    desc: "Studio-grade multi-cam live streaming and satellite-grade webcasting to YouTube, LinkedIn, and private enterprise networks with seamless graphic overlays, lower-thirds, and instant clipping.",
    tags: ["Multi-Cam Live Switchers", "Redundant RTMP Feeds", "Live Lower-Thirds", "Global CDN"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png",
  },
  {
    id: "conferences",
    name: "Conference & Panel Discussion",
    category: "THOUGHT LEADERSHIP // 4K ARCHIVE",
    desc: "Pristine audio recording, synchronized multi-angle coverage, and dynamic post-event micro-content generation from executive roundtables, global summits, and symposiums.",
    tags: ["Lavalier Arrays", "Multi-Angle Iso-Record", "Bite-Sized Social Clips", "Master Archival"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959858_12.png",
  },
  {
    id: "social-initiatives",
    name: "Social Initiatives & Documentation",
    category: "CSR & NGO // IMPACT STORYTELLING",
    desc: "Soul-stirring, empathetic on-the-ground documentary films capturing non-profit milestones, rural empowerment, and sustainable community impact initiatives that inspire donor action.",
    tags: ["Field Documentaries", "Impact Metrics Visuals", "Beneficiary Voices", "Donor Cuts"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959876_13.png",
  },
  {
    id: "brand-campaign",
    name: "Brand Campaign",
    category: "COMMERCIAL // HIGH CONVERSION",
    desc: "End-to-end commercial filmmaking from conceptual treatments to cinematic direction, multi-location sets, high-end styling, and performance-driven digital ad campaign suites.",
    tags: ["Digital Commercials", "Shark Tank Pitch Films", "Product Hero Commercials", "Ad Creatives"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959841_11.png",
  },
  {
    id: "scripting-voiceover",
    name: "Scripting & Voiceover Services",
    category: "NARRATIVE // COPYWRITING & AUDIO",
    desc: "Compelling script architectures, storyboard treatments, and a curated global roster of native voiceover artists in multiple languages, recorded with professional acoustic mastering.",
    tags: ["Commercial Scriptwriting", "Multi-Language VO", "Acoustic Mastering", "Storyboards"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1735391835_CH%2035%20(1).jpg",
  },
  {
    id: "creative-direction",
    name: "Creative Direction",
    category: "ART DIRECTION // CONCEPT TO DELIVERY",
    desc: "Visionary creative oversight ensuring unified visual language, bespoke cinematic lighting, frame-by-frame color mood boards, and aesthetic precision across every deliverable.",
    tags: ["Visual Moodboards", "Lighting Treatment", "Directorial Vision", "Brand Compliance"],
    bgImage: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
  },
];

export const TrustedBrands: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
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

  // Update visible service content only when index changes to avoid re-renders during scrolling
  const handleIndexChange = useCallback((index: number) => {
    if (activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  }, []);

  // Set up ScrollTrigger on desktop using CSS sticky track
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

      const closestIndex = Math.max(0, Math.min(items.length - 1, Math.round(virtualIndex)));
      handleIndexChange(closestIndex);
    };

    // Initialize list position
    renderList(0);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.05,
      onUpdate: (self) => {
        renderList(self.progress);
      },
    });

    scrollTriggerRef.current = trigger;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      trigger.kill();
    };
  }, [isMobile, handleIndexChange]);

  // Click or hover on a service in list to center on it smoothly
  const selectService = (index: number) => {
    setActiveIndex(index);
    if (!isMobile && listRef.current && wrapRef.current) {
      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      if (items.length > 0) {
        const itemHeight = items[0].offsetHeight || 72;
        const wrapCenter = wrapRef.current.offsetHeight / 2;
        const y = wrapCenter - (index * itemHeight + itemHeight / 2);
        gsap.to(listRef.current, { y, duration: 0.35, ease: "power2.out" });

        items.forEach((item, i) => {
          const distance = Math.abs(i - index);
          let opacity = 0.25;
          if (distance === 0) opacity = 1;
          else if (distance === 1) opacity = 0.85;
          else if (distance === 2) opacity = 0.60;
          gsap.to(item, { opacity, duration: 0.35 });
        });
      }
    }
    if (scrollTriggerRef.current && !isMobile) {
      const targetProgress = index / (SERVICES_DATA.length - 1);
      const scrollPos =
        scrollTriggerRef.current.start +
        targetProgress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start);
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  // Direct mouse wheel on list wrapper for ultra-fast, snappy cycling
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0 && activeIndex < SERVICES_DATA.length - 1) {
        selectService(activeIndex + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        selectService(activeIndex - 1);
      }
    }
  };

  const currentService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  return (
    <div
      ref={trackRef}
      id="brands-track"
      className="relative w-full"
      style={{ height: isMobile ? "auto" : `${(SERVICES_DATA.length - 1) * 95 + 650}px` }}
    >
      <section
        ref={sectionRef}
        id="brands"
        className="w-full h-screen min-h-[680px] max-h-[1080px] bg-[#EAE3DB] overflow-hidden select-none flex items-center sticky top-0 z-10"
      >
        {/* 1. Full-Bleed Dynamic Background Visuals with Soft Editorial Lightness */}
        {SERVICES_DATA.map((service, idx) => (
          <div
            key={service.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out pointer-events-none ${
              idx === activeIndex ? "opacity-35 z-0" : "opacity-0 z-[-1]"
            }`}
          >
            <img
              src={service.bgImage}
              alt={service.name}
              className="w-full h-full object-cover object-right md:object-center transform scale-105 transition-transform duration-1000 ease-out filter saturate-120"
            />
          </div>
        ))}

        {/* 2. Warm Sand Editorial Vignette & Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAE3DB]/95 via-[#EAE3DB]/90 to-[#EAE3DB]/80 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[#EAE3DB]/40 backdrop-blur-[1px] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#EAE3DB]/95 via-transparent to-[#EAE3DB]/80 pointer-events-none z-10" />

        {/* 3. Main Content Container */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-between py-10 lg:py-16">
          
          {/* Main Section Header: Matches First Image Heading (Humane Font in #7567EE) */}
          <div className="w-full mb-1 lg:mb-2">
            <h2
              className="font-humane text-[#7567EE] uppercase leading-[0.82] font-medium select-none drop-shadow-xs whitespace-nowrap"
              style={{
                fontSize: "clamp(54px, 7.6vw, 124px)",
                letterSpacing: "0.04em",
                wordSpacing: "0.28em",
              }}
            >
              OUR CREATIVE UNIVERSE..
            </h2>
          </div>

          {/* Center Grid: Left Service Roller & Right Service Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
            
            {/* Left Column: Service Names List (Roulette Roller with Hover, Click & Wheel) */}
            <div className="lg:col-span-7 relative flex flex-col">
              <div
                ref={wrapRef}
                onWheel={handleWheel}
                className="brands-list-wrap relative h-[380px] sm:h-[440px] md:h-[500px] overflow-hidden flex flex-col items-start justify-start"
              >
                <div
                  ref={listRef}
                  className="brands-list flex flex-col w-full will-change-transform"
                >
                  {SERVICES_DATA.map((service, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={service.id}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        onClick={() => selectService(i)}
                        onMouseEnter={() => selectService(i)}
                        className={`brand-item py-3 sm:py-3.5 cursor-pointer transition-all duration-300 text-left ${
                          isActive
                            ? "text-[#141416] opacity-100 translate-x-4 drop-shadow-sm"
                            : "text-[#4A4658]/70 hover:text-[#141416]"
                        }`}
                      >
                        <span className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight transition-all duration-200 inline-block py-1 leading-[1.2] ${
                          isActive ? "font-bold text-[#141416]" : "font-medium text-[#4A4658]"
                        }`}>
                          {service.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Ultra-Premium Service Card with Pure Cinematic Image */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left lg:pl-6">
              <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-[#141416]/10 shadow-[0_20px_50px_rgba(20,20,22,0.12)] transition-all duration-500 flex flex-col gap-4">
                
                {/* Visual Image Showcase on Card (Clean, No Overlay Pills) */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#141416] shadow-md group">
                  <img
                    key={currentService.id}
                    src={currentService.bgImage}
                    alt={currentService.name}
                    className="w-full h-full object-cover object-center transform transition-all duration-700 ease-out group-hover:scale-105 filter saturate-115"
                  />
                  {/* Subtle Filmic Ambient Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-[#141416] font-bold tracking-tight leading-snug">
                  {currentService.name}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-[#141416]/80 leading-relaxed font-normal">
                  {currentService.desc}
                </p>

                {/* Direct Action Link with Bright Lime BG and Black Text */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-[#D5FF3F] hover:bg-[#c6f028] text-black border border-black/10 transition-all duration-300 font-bold text-sm tracking-wide shadow-[0_4px_16px_rgba(213,255,63,0.45)] hover:shadow-[0_6px_22px_rgba(213,255,63,0.65)] hover:-translate-y-0.5 mt-2"
                >
                  <span className="text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm">Inquire For This Service</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
