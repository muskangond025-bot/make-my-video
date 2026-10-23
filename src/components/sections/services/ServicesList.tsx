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

                  {/* Card Content details matching Home page CardSwing */}
                  <div className="scroll-card-inner-wrapper">
                    <p className="text-size-tiny text-color-secondary text-style-wrap">
                      {service.description}
                    </p>
                    <div className="section-tagline is--full">
                      <div className="text-size-large text-weight-bold text-color-white is--title">
                        {service.title.toUpperCase()}
                      </div>
                      <div className="icon-embed-medium w-embed">
                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.667969 22.833C0.667969 16.8656 3.0385 11.1427 7.25807 6.92311C11.4776 2.70354 17.2006 0.333008 23.168 0.333008C29.1353 0.333008 34.8583 2.70354 39.0779 6.92311C43.2974 11.1427 45.668 16.8656 45.668 22.833C45.668 28.8004 43.2974 34.5233 39.0779 38.7429C34.8583 42.9625 29.1353 45.333 23.168 45.333C17.2006 45.333 11.4776 42.9625 7.25807 38.7429C3.0385 34.5233 0.667969 28.8004 0.667969 22.833ZM21.7617 3.36207C19.8773 3.93582 18.007 5.66832 16.4545 8.57926C15.9433 9.54716 15.5034 10.5511 15.1383 11.583H21.7617V3.36207ZM12.1711 11.583C12.6403 10.0892 13.2428 8.6406 13.9711 7.25457C14.4606 6.3369 15.022 5.45947 15.6502 4.63051C12.1659 6.07633 9.16794 8.48873 7.01016 11.583H12.1711ZM10.5342 21.4268C10.6186 18.9602 10.9223 16.5949 11.4117 14.3955H5.37609C4.32998 16.6044 3.70432 18.9888 3.53109 21.4268H10.5342ZM14.3002 14.3955C13.747 16.7012 13.4285 19.0569 13.3495 21.4268H21.7617V14.3955H14.3002ZM24.5742 14.3955V21.4268H32.9836C32.9056 19.057 32.588 16.7013 32.0358 14.3955H24.5742ZM13.3523 24.2393C13.4304 26.609 13.7479 28.9647 14.3002 31.2705H21.7617V24.2393H13.3523ZM24.5742 24.2393V31.2705H32.0358C32.5617 29.1189 32.8964 26.748 32.9864 24.2393H24.5742ZM15.1383 34.083C15.5283 35.1705 15.967 36.1718 16.4545 37.0868C18.007 39.9977 19.8802 41.7274 21.7617 42.3039V34.083H15.1383ZM15.6502 41.0355C15.022 40.2065 14.4606 39.3291 13.9711 38.4114C13.2428 37.0254 12.6403 35.5768 12.1711 34.083H7.01016C9.16445 37.1805 12.1634 39.5938 15.6502 41.0355ZM11.4117 31.2705C10.9039 28.9587 10.6101 26.605 10.5342 24.2393H3.53109C3.70547 26.7424 4.34953 29.1133 5.37609 31.2705H11.4117ZM30.6858 41.0355C34.1725 39.5938 37.1715 37.1805 39.3258 34.083H34.1648C33.6956 35.5768 33.0932 37.0254 32.3648 38.4114C31.8753 39.3291 31.3139 40.2065 30.6858 41.0355ZM24.5742 34.083V42.3039C26.4586 41.7302 28.3289 39.9977 29.8814 37.0868C30.3689 36.1736 30.8077 35.1724 31.1977 34.083H24.5742ZM34.9242 31.2705H40.9598C41.9864 29.1133 42.6305 26.7424 42.8048 24.2393H35.8017C35.7258 26.605 35.4321 28.9587 34.9242 31.2705ZM42.8048 21.4268C42.6316 18.9888 42.006 16.6044 40.9598 14.3955H34.9242C35.4136 16.5949 35.7173 18.9602 35.8017 21.4268H42.8048ZM32.3648 7.25457C33.0595 8.55957 33.6642 10.0108 34.1648 11.583H39.3258C37.1715 8.48548 34.1725 6.07222 30.6858 4.63051C31.2989 5.42926 31.8614 6.31238 32.3648 7.25457ZM31.1977 11.583C30.8326 10.5511 30.3926 9.54716 29.8814 8.57926C28.3289 5.66832 26.4586 3.93863 24.5742 3.36207V11.583H31.1977Z" fill="white" />
                        </svg>
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
