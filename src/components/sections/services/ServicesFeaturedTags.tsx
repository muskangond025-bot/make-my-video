"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Film, Disc, Cpu, Compass } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  specs: string[];
  image: string;
  icon: React.ReactNode;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "scripting-voiceover",
    number: "01",
    title: "Scripting & Voiceover Services",
    subtitle: "High-impact narrative blueprints, character arcs, and multilingual voice talent in 15+ dialects.",
    specs: ["Multi-lingual VO Artists", "Director Story Blueprints", "Broadcast Audio Mastering"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    icon: <Disc size={20} className="text-[#7567EE]" />,
  },
  {
    id: "social-viral-reels",
    number: "02",
    title: "Social Media Content & Viral Reels",
    subtitle: "Thumb-stopping 9:16 vertical cinematography engineered for Instagram Reels, YouTube Shorts, and LinkedIn video.",
    specs: ["9:16 Vertical Framing", "Hook Optimization", "Kinetic Subtitle Design"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    icon: <Sparkles size={20} className="text-[#7567EE]" />,
  },
  {
    id: "creative-direction",
    number: "03",
    title: "Creative Direction & Storyboarding",
    subtitle: "Frame-by-frame visual pre-visualization, concept decks, and moodboards aligned with your global brand identity.",
    specs: ["Moodboard Curation", "Frame Pre-Vis", "Executive Pitch Decks"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
    icon: <Compass size={20} className="text-[#7567EE]" />,
  },
  {
    id: "3d-motion-graphics",
    number: "04",
    title: "3D Motion Graphics & Animation",
    subtitle: "Photorealistic 3D product renders, explosive CGI transitions, and futuristic UI visual effects in Cinema 4D.",
    specs: ["Cinema 4D + Octane", "Photoreal Lighting", "Procedural Motion"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    icon: <Cpu size={20} className="text-[#7567EE]" />,
  },
  {
    id: "fpv-drone-aerials",
    number: "05",
    title: "Aerial Cinematography & FPV Drones",
    subtitle: "DGCA-certified drone pilots executing cinematic high-speed acrobatics, factory fly-throughs, and 4K panoramic views.",
    specs: ["DGCA Certified Pilots", "Indoor FPV Micro-Drones", "Dual-Operator Gimbal"],
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200&auto=format&fit=crop",
    icon: <Film size={20} className="text-[#7567EE]" />,
  },
];

export const ServicesFeaturedTags: React.FC = () => {
  const [activeItem, setActiveItem] = useState<CapabilityItem>(CAPABILITIES[0]);
  const previewImageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = (item: CapabilityItem) => {
    setActiveItem(item);
    if (previewImageRef.current) {
      gsap.fromTo(
        previewImageRef.current,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  };

  return (
    <section className="relative w-full bg-[#EAE3DB] text-[#141416] py-20 lg:py-28 overflow-hidden border-t border-b border-[#141416]/10">
      
      {/* Background Kinetic Marquee Ticker in Subtle Tone */}
      <div className="w-full overflow-hidden whitespace-nowrap opacity-10 select-none pointer-events-none mb-12">
        <div className="inline-flex animate-[marquee_25s_linear_infinite] gap-8 font-heading font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#141416]">
          <span>CREATIVE SPECIALTIES</span>
          <span>•</span>
          <span>CINEMA CRAFT</span>
          <span>•</span>
          <span>FPV DRONES</span>
          <span>•</span>
          <span>3D CGI MOTION</span>
          <span>•</span>
          <span>DOLBY SOUND MASTER</span>
          <span>•</span>
          <span>CREATIVE SPECIALTIES</span>
          <span>•</span>
          <span>CINEMA CRAFT</span>
          <span>•</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#141416]/10">
          <div>
            <h2 className="typo-h1 font-heading font-black tracking-tight uppercase text-[#141416]">
              FEATURED <span className="font-serif italic font-normal text-[#7567EE]">SPECIALTIES</span>
            </h2>
          </div>
          <p className="typo-body font-sans text-[#141416]/75 max-w-[440px] leading-relaxed">
            Every specialist tool required to elevate corporate communication into award-worthy cinema.
          </p>
        </div>

        {/* Awwwards Full-Width Capability Split Stage in Light Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Capability List (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {CAPABILITIES.map((item) => {
              const isActive = activeItem.id === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item)}
                  className={`group relative py-5 sm:py-6 px-5 sm:px-7 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-white border-[#7567EE] shadow-lg scale-[1.01]"
                      : "bg-white/60 hover:bg-white border-[#141416]/10 hover:border-[#141416]/20 shadow-sm"
                  }`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      <span className="font-mono text-sm sm:text-base text-[#7567EE] font-bold">
                        {item.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`typo-h3 font-heading font-black tracking-tight transition-colors duration-200 ${
                            isActive ? "text-[#7567EE]" : "text-[#141416] group-hover:text-[#7567EE]"
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                        <p className="typo-small font-sans text-[#141416]/70 mt-1 max-w-[520px] leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#7567EE] text-white rotate-45 shadow-md"
                        : "bg-[#141416]/5 text-[#141416]/60 group-hover:bg-[#7567EE] group-hover:text-white"
                    }`}>
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Light Stage Media Screen (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#141416]/15 bg-white shadow-xl p-3 sm:p-4">
              
              {/* Media Frame */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-100 shadow-inner border border-[#141416]/10">
                <img
                  ref={previewImageRef}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Bottom Media Card Info */}
                <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl text-[#141416]">
                  <h4 className="font-heading font-black text-lg text-[#141416]">
                    {activeItem.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-3.5">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141416] hover:bg-[#7567EE] text-white font-bold text-xs uppercase font-sans tracking-wide transition-all shadow-md group/btn"
                    >
                      <span className="text-white">Inquire Specialty</span>
                      <ArrowUpRight size={15} className="text-[#D5FF3F] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
