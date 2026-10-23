"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, BLOGS_DATA } from "@/data/blogsData";
import { BrandButton } from "@/components/shared/BrandButton";

interface MasterclassTrack {
  id: string;
  index: string;
  title: string;
  summary: string;
  impactStat: string;
  impactLabel: string;
  image: string;
  linkedCategory: string;
  featuredSlug: string;
}

const TRACKS: MasterclassTrack[] = [
  {
    id: "track-01",
    index: "01",
    title: "High-Stakes Investor AVs & Founder Storytelling",
    summary:
      "How we engineered the viral Shark Tank India pitch film for Wol3D and executive documentaries for Aditya Birla, distilling complex financial metrics into emotionally compelling narratives.",
    impactStat: "$45M+",
    impactLabel: "Capital Raised by Featured Founders",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
    linkedCategory: "Corporate AV",
    featuredSlug: "why-every-business-needs-professional-video-editing-service-for-investor-pitches-and-corporate-avs",
  },
  {
    id: "track-02",
    index: "02",
    title: "Decentralized Remote Post-Production Pipelines",
    summary:
      "Inside our decentralized editing infrastructure: how Make My Vid delivers 24-hour turnaround multi-aspect deliverables across international time zones without geographical bottlenecks.",
    impactStat: "24-HR",
    impactLabel: "Global Assembly Turnaround Standard",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/blogs/blog%202%20editing%20(1)%20(1).jpg",
    linkedCategory: "Remote Post-Production",
    featuredSlug: "editing-beyond-borders-remote-solutions-for-global-needs",
  },
  {
    id: "track-03",
    index: "03",
    title: "Commercial Cinematography & Lighting Architecture",
    summary:
      "Mastering volumetric three-point lighting, focal length perspective compression, and dynamic gimbal choreography to achieve cinematic richness on tight commercial schedules.",
    impactStat: "4K RAW",
    impactLabel: "Cinema Master Grading Standard",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/blogs/DALL%C2%B7E%202025-02-14%2016.28.18%20-%20A%20professional%20video%20production%20setup%20in%20a%20studio,%20with%20a%20cinematographer%20using%20a%20high-end%20camera%20on%20a%20stabilizer.%20The%20studio%20has%20well-placed%20lighting%20(1).jpg",
    linkedCategory: "Cinematic Production",
    featuredSlug: "how-to-master-cinematic-techniques",
  },
  {
    id: "track-04",
    index: "04",
    title: "Enterprise Live Broadcast & Hybrid Summit Pipelines",
    summary:
      "Expanding physical corporate summits into international broadcast-grade live streams with redundant cellular bonding, dynamic lower-thirds, and instant executive soundbite syndication.",
    impactStat: "50,000+",
    impactLabel: "Concurrent Remote Viewers Supported",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/blogs/live%20streaming%20(1)%20(1).jpg",
    linkedCategory: "Live Broadcast",
    featuredSlug: "why-your-business-needs-professional-streaming-for-events",
  },
];

interface BlogFeaturedShowcaseProps {
  onCategoryFilter?: (category: string) => void;
  onSelectArticle?: (post: BlogPost) => void;
}

export const BlogFeaturedShowcase: React.FC<BlogFeaturedShowcaseProps> = ({
  onCategoryFilter,
  onSelectArticle,
}) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic 3-Second Cycle with smooth transition (per user feedback & UI_RULES)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeTrack = TRACKS[activeTrackIndex];

  const handleReadGuide = () => {
    const matched = BLOGS_DATA.find((p) => p.slug === activeTrack.featuredSlug);
    if (matched && onSelectArticle) {
      onSelectArticle(matched);
    } else if (onCategoryFilter) {
      onCategoryFilter(activeTrack.linkedCategory);
      const archiveEl = document.getElementById("publications-archive");
      if (archiveEl) archiveEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFilterCategory = () => {
    if (onCategoryFilter) {
      onCategoryFilter(activeTrack.linkedCategory);
      const archiveEl = document.getElementById("publications-archive");
      if (archiveEl) archiveEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#F3EBDD] text-[#141416] select-none overflow-hidden border-b border-[#141416]/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADING: Single Line, Left-Aligned (per UI_RULES item 27-31)      */}
        {/* ========================================================================= */}
        <div className="text-left w-full mb-12 sm:mb-16">
          <h2 className="typo-h2 font-heading font-black tracking-tight uppercase leading-none mb-3 text-[#141416] text-left">
            MASTERCLASS <span className="text-[#7567EE]">SERIES.</span>
          </h2>
          <p className="typo-body text-[#4A4658] font-normal text-left max-w-3xl">
            Four signature creative tracks distilled from over 10+ years of commercial filming, multi-city shoots, and Shark Tank pitch films.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE TRACK DECK (SMOOTH 3-SECOND CYCLE)                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT RAIL: Track Selector Tabs with Animated Progress (5 Cols)          */}
          {/* ----------------------------------------------------------------------- */}
          <div
            className="lg:col-span-5 flex flex-col justify-between gap-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex flex-col gap-3 flex-1">
              {TRACKS.map((track, idx) => {
                const isActive = idx === activeTrackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => setActiveTrackIndex(idx)}
                    className={`group relative text-left p-5 sm:p-6 rounded-[24px] border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 overflow-hidden ${
                      isActive
                        ? "bg-white border-2 border-[#7567EE] shadow-[0_10px_30px_rgba(117,103,238,0.15)] scale-[1.01]"
                        : "bg-white/80 border-[#141416]/10 hover:bg-white hover:border-[#141416]/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-sm font-mono font-bold transition-colors ${
                          isActive ? "text-[#7567EE]" : "text-[#141416]"
                        }`}
                      >
                        [ {track.index} ]
                      </span>

                      <div>
                        <h4
                          className={`text-base sm:text-lg font-heading font-black uppercase tracking-tight transition-colors line-clamp-2 ${
                            isActive ? "text-[#141416]" : "text-[#141416]/80 group-hover:text-[#141416]"
                          }`}
                        >
                          {track.title}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? "bg-[#141416] text-[#D5FF3F] scale-105"
                          : "bg-black/5 text-[#141416] group-hover:bg-[#141416] group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Active 3-Second Cycle Progress Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 overflow-hidden">
                        <div
                          key={activeTrackIndex}
                          className="h-full bg-[#7567EE]"
                          style={{
                            animation: isPaused ? "none" : "linear 3s forwards expandProgress",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT STAGE: Active Blueprint Cinema Card (7 Cols)                      */}
          {/* ----------------------------------------------------------------------- */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full h-full rounded-[32px] sm:rounded-[42px] overflow-hidden bg-white border border-[#141416]/12 p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,20,22,0.06)] flex flex-col justify-between">
              {/* Corner Viewfinder Reticles [ ] in Signature Lavender */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-[#7567EE] pointer-events-none z-20" />

              <div>
                {/* Visual Header: Pre-rendered stack for Butter-Smooth Opacity Cross-Fade */}
                <div className="relative w-full aspect-[16/9] rounded-[22px] overflow-hidden bg-black/5 mb-8 border border-[#141416]/10">
                  {TRACKS.map((t, idx) => (
                    <div
                      key={t.id}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        opacity: idx === activeTrackIndex ? 1 : 0,
                        transform: idx === activeTrackIndex ? "scale(1)" : "scale(1.05)",
                        pointerEvents: idx === activeTrackIndex ? "auto" : "none",
                      }}
                    >
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  ))}

                  {/* Impact Stat Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                    <div>
                      <div className="text-2xl sm:text-4xl font-heading font-black text-[#D5FF3F] leading-none mb-1">
                        {activeTrack.impactStat}
                      </div>
                      <div className="text-[11px] font-mono text-white/90 uppercase tracking-wider">
                        {activeTrack.impactLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Track Content */}
                <div key={activeTrack.id} className="transition-all duration-500 ease-out">
                  <h3 className="typo-h3 sm:text-3xl font-heading font-black uppercase text-[#141416] tracking-tight leading-tight mb-4">
                    {activeTrack.title}
                  </h3>

                  <p className="typo-body text-[#33303E] leading-relaxed mb-6 font-normal">
                    {activeTrack.summary}
                  </p>
                </div>
              </div>

              {/* Action Buttons Row with BrandButton */}
              <div className="pt-6 border-t border-[#141416]/10 flex flex-wrap items-center justify-between gap-4">
                <BrandButton
                  onClick={handleReadGuide}
                  label="READ FEATURED BLUEPRINT"
                />

                <button
                  onClick={handleFilterCategory}
                  className="text-xs font-mono text-[#141416] hover:text-[#7567EE] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors font-semibold"
                >
                  <span>Filter Related Publications</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
