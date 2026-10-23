"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ALL_SERVICES_CATALOG } from "@/data/servicesPageData";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ServicesListProps {
  searchQuery?: string;
}

const SERVICE_IMAGES: Record<string, string> = {
  "multi-city-production": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png",
  "remote-editing-work": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png",
  "corporate-av": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
  "trade-shows-exhibitions": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png",
  "corporate-events": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959841_11.png",
  "live-telecast": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959841_11.png",
  "conferences-panels": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1735391835_CH%2035%20(1).jpg",
  "social-initiatives": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959997_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(2).png",
};

const SERVICE_2LINE_TITLES: Record<string, [string, string]> = {
  "multi-city-production": ["MULTI CITY", "VIDEO PRODUCTION"],
  "remote-editing-work": ["REMOTE VIDEO", "EDITING SERVICES"],
  "corporate-av": ["CORPORATE AV &", "BRAND FILMS"],
  "trade-shows-exhibitions": ["TRADE SHOWS &", "EXHIBITION VIDEOS"],
  "corporate-events": ["CORPORATE EVENTS", "& TOWNHALLS"],
  "live-telecast": ["LIVE TELECAST &", "MULTI-PLATFORM STREAMING"],
  "conferences-panels": ["CONFERENCES &", "PANEL DISCUSSIONS"],
  "social-initiatives": ["SOCIAL INITIATIVES &", "CSR DOCUMENTATION"],
};

function getTwoLineTitle(id: string, fallbackTitle: string): [string, string] {
  if (SERVICE_2LINE_TITLES[id]) return SERVICE_2LINE_TITLES[id];
  const words = fallbackTitle.toUpperCase().split(" ");
  if (words.length <= 1) return [words[0] || "", ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

// Organic Dumemearts card swing offsets
const CARD_OFFSETS = [
  { rotation: 8, x: 20, y: 8 },
  { rotation: -7, x: -22, y: -6 },
  { rotation: 6, x: 18, y: 10 },
  { rotation: -9, x: -20, y: 6 },
  { rotation: 7, x: 22, y: -8 },
  { rotation: -6, x: -18, y: 8 },
  { rotation: 8, x: 18, y: -6 },
  { rotation: -7, x: -22, y: 6 },
];

export const ServicesList: React.FC<ServicesListProps> = ({ searchQuery = "" }) => {
  const pinSectionRef = useRef<HTMLElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredServices = ALL_SERVICES_CATALOG.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.deliverables && item.deliverables.some((d) => d.toLowerCase().includes(q)))
    );
  });

  // Fast & Responsive GSAP Pinned Stage (Header + Cards pinned together)
  useEffect(() => {
    if (!pinSectionRef.current || !pinnedStageRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cardsContainer = cardsContainerRef.current;
      if (!cardsContainer) return;

      const computeDistance = () => {
        return Math.max(0, cardsContainer.scrollWidth - window.innerWidth + 120);
      };

      // Pin the entire stage (header stays visible, does not go up)
      const scrollTween = gsap.to(cardsContainer, {
        x: () => -computeDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinSectionRef.current,
          pin: pinnedStageRef.current,
          start: "top top",
          end: () => `+=${computeDistance() * 0.75}`,
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

      // Individual Organic 3D Card Swing / Counter-Rotation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const config = CARD_OFFSETS[index % CARD_OFFSETS.length];

        gsap.fromTo(
          card,
          {
            rotation: config.rotation,
            xPercent: config.x,
            yPercent: config.y,
          },
          {
            rotation: -config.rotation,
            xPercent: -config.x,
            yPercent: -config.y,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 120%",
              end: "right -20%",
              scrub: 0.25,
            },
          }
        );
      });
    }, pinSectionRef);

    return () => ctx.revert();
  }, [filteredServices.length]);

  return (
    <section ref={pinSectionRef} className="relative w-full overflow-visible bg-[#EAE3DB]">
      
      {/* Pinned Stage: Holds both Header and Cards so the header never scrolls away */}
      <div
        ref={pinnedStageRef}
        className="w-full min-h-screen flex flex-col justify-center py-6 lg:py-8 overflow-hidden"
      >
        {/* Pinned Section Header - Stays anchored right here */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141416]/10 pb-5">
            <div>
              <h2 className="typo-h1 font-heading font-black tracking-tight uppercase text-[#141416]">
                WIDE RANGE <span className="font-serif italic font-normal text-[#7567EE]">OF SERVICES</span>
              </h2>
            </div>
            <p className="typo-body font-sans text-[#141416]/75 max-w-[480px] leading-relaxed">
              Scroll through our complete production and post-production capabilities — engineered for tier-1 corporate reliability and fast turnaround.
            </p>
          </div>
        </div>

        {/* Dumemearts Card-Container Frame in Light Theme */}
        <div className="w-[95%] sm:w-[94%] max-w-[1480px] mx-auto h-[68vh] min-h-[500px] rounded-[2.5rem] sm:rounded-[3.2rem] border border-[#141416]/15 bg-white/85 backdrop-blur-sm flex items-center justify-start overflow-hidden relative shadow-xl">
          
          {/* Background Concentric Radial Rings (Subtle Light Wireframe) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[18rem] h-[18rem] border border-[#141416] rounded-full absolute" />
            <div className="w-[30rem] h-[30rem] border border-[#141416] rounded-full absolute" />
            <div className="w-[44rem] h-[44rem] border border-[#141416] rounded-full absolute" />
            <div className="w-[60rem] h-[44rem] border border-[#7567EE] rounded-full absolute" />
            <div className="w-[78rem] h-[44rem] border border-[#141416] rounded-full absolute" />
          </div>

          {/* Subtle Dot Texture */}
          <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none z-0" />

          {/* Cards Track (Fast Horizontal Swinger) */}
          <div
            ref={cardsContainerRef}
            className="flex items-center gap-6 sm:gap-8 whitespace-nowrap will-change-transform z-10 pl-[35vw] pr-[45vw]"
          >
            {filteredServices.map((service, index) => {
              const imageSrc = SERVICE_IMAGES[service.id] || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop";
              const [line1, line2] = getTwoLineTitle(service.id, service.title);

              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="scroll-card flex-shrink-0 cursor-pointer select-none"
                >
                  {/* Image wrapper matching Home page */}
                  <div className="scroll-card-image-wrapper spacer-medium">
                    <img
                      src={imageSrc}
                      alt={service.title}
                      className="scroll-card-image"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content details: Description & Organized 2-Line Heading fully visible */}
                  <div className="scroll-card-inner-wrapper whitespace-normal w-full overflow-hidden flex flex-col justify-between flex-1">
                    <p className="text-size-tiny text-color-secondary text-style-wrap leading-relaxed mb-3 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="section-tagline is--full whitespace-normal w-full flex items-center justify-between mt-auto">
                      <div className="text-size-large text-weight-bold text-color-white is--title whitespace-normal break-words w-full">
                        <span className="block leading-tight">{line1}</span>
                        {line2 && <span className="block leading-tight text-[#EAE3DB]/90">{line2}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
