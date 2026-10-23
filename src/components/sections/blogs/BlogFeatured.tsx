"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BlogPost, BLOGS_DATA } from "@/data/blogsData";
import { BrandButton } from "@/components/shared/BrandButton";

interface BlogFeaturedProps {
  post?: BlogPost;
  onSelectArticle?: (post: BlogPost) => void;
}

export const BlogFeatured: React.FC<BlogFeaturedProps> = ({
  post: initialPost,
  onSelectArticle,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);

  // Strictly 3 featured publications only (per user feedback to prevent excessive size)
  const featuredPosts = useMemo(() => {
    const feats = BLOGS_DATA.filter((p) => p.isFeatured);
    return feats.slice(0, 3);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activePost = featuredPosts[currentIndex] || featuredPosts[0];

  // Automatic 3-Second Cycle with smooth transition (per user feedback & UI_RULES)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, featuredPosts.length]);

  // Exact 3D Perspective Card Tilt from <Expertise> and <AboutStory>
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;

    gsap.to(stageRef.current, {
      rotateX,
      rotateY,
      scale: 1.01,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
      transformPerspective: 1200,
    });
  };

  const handleStageMouseLeave = () => {
    setIsPaused(false);
    if (!stageRef.current) return;
    gsap.to(stageRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleOpenArticle = (p: BlogPost) => {
    if (onSelectArticle) {
      onSelectArticle(p);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#F3EBDD] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADING: Single Line, Left-Aligned (per UI_RULES item 27-31)      */}
        {/* ========================================================================= */}
        <div className="text-left w-full mb-8 sm:mb-12">
          <h2 className="typo-h2 font-heading font-black tracking-tight uppercase leading-none mb-3 text-[#141416] text-left">
            EDITORIAL <span className="text-[#7567EE]">SPOTLIGHT.</span>
          </h2>
          <p className="typo-body text-[#4A4658] font-normal text-left max-w-3xl">
            Flagship case studies, creative philosophies, and commercial film breakdowns curated by Rohan Joshi and Make My Vid senior directors.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL MASTER STAGE: Balanced Height Across Left and Right Columns     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* PRIMARY COLUMN: Flagship Stage Card (Compact, Content-Hugging) (7 Cols) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              ref={stageRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              onClick={() => handleOpenArticle(activePost)}
              className="group relative w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white text-[#141416] border border-[#141416]/10 p-5 sm:p-6 shadow-[0_12px_36px_rgba(20,20,22,0.06)] hover:shadow-[0_18px_48px_rgba(20,20,22,0.12)] hover:border-[#7567EE] transition-all duration-300 flex flex-col cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Corner Viewfinder Reticles [ ] in Signature Lavender */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#7567EE] pointer-events-none z-20" />

              <div>
                {/* Visual Media Container: Clean 16:9 Cinema Aspect Ratio */}
                <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-black/5 mb-4 border border-[#141416]/10">
                  {featuredPosts.map((p, idx) => (
                    <div
                      key={p.id}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        opacity: idx === currentIndex ? 1 : 0,
                        transform: idx === currentIndex ? "scale(1)" : "scale(1.05)",
                        pointerEvents: idx === currentIndex ? "auto" : "none",
                      }}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={idx === 0}
                      />
                    </div>
                  ))}

                  {/* Subtle 3-Second Cycle Progress Bar Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 overflow-hidden z-20">
                    <div
                      key={currentIndex}
                      className="h-full bg-[#7567EE]"
                      style={{
                        animation: isPaused ? "none" : "linear 3s forwards expandProgress",
                      }}
                    />
                  </div>
                </div>

                {/* Animated Text Content Block */}
                <div key={activePost.id} className="transition-all duration-500 ease-out">
                  {/* Metadata Line */}
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#4A4658] mb-2">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#7567EE]" />
                      {activePost.date}
                    </span>
                    <span>&bull;</span>
                    <span>By Rohan Joshi</span>
                  </div>

                  {/* Flagship Headline */}
                  <h3 className="typo-h3 sm:text-2xl lg:text-[26px] font-heading font-black uppercase text-[#141416] leading-snug mb-2 tracking-tight group-hover:text-[#7567EE] transition-colors line-clamp-2">
                    {activePost.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="typo-body text-[#33303E] text-sm sm:text-base font-normal leading-relaxed line-clamp-2">
                    {activePost.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Bottom Row sitting neatly under excerpt with zero awkward gap */}
              <div className="mt-4 pt-3.5 border-t border-[#141416]/10 flex items-center justify-between">
                <BrandButton
                  size="sm"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleOpenArticle(activePost);
                  }}
                  label="READ FULL STORY"
                />

                <span className="text-xs font-mono text-[#4A4658] uppercase hidden sm:inline-block">
                  Click To Read &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SECONDARY COLUMN: Perfectly Sized, Proportional 3 Cards (5 Cols)        */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {featuredPosts.map((sec, idx) => {
              const isActive = idx === currentIndex;

              return (
                <div
                  key={sec.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`group relative rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-4 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-3.5 items-center justify-between select-none border ${
                    isActive
                      ? "bg-white border-2 border-[#7567EE] shadow-[0_16px_36px_rgba(117,103,238,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[#7567EE]/25 scale-[1.01]"
                      : "bg-white/80 hover:bg-white border-[#141416]/10 hover:border-[#141416]/22 shadow-[0_4px_16px_rgba(20,20,22,0.03),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm hover:scale-[1.006]"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-[#7567EE]" />
                  )}

                  {/* Thumbnail with Cinema Bezel (No PART badge) */}
                  <div className="relative w-full sm:w-28 sm:h-24 aspect-[16/10] sm:aspect-auto rounded-[14px] overflow-hidden shrink-0 bg-black/5 shadow-inner border border-[#141416]/10">
                    <Image
                      src={sec.image}
                      alt={sec.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 130px"
                    />
                  </div>

                  {/* Info Column (No [02 // ...] badge) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full">
                    <div>
                      <h4
                        className={`text-sm sm:text-[15px] font-heading font-black uppercase tracking-tight leading-snug line-clamp-2 mb-1 transition-colors ${
                          isActive
                            ? "text-[#7567EE]"
                            : "text-[#141416] group-hover:text-[#7567EE]"
                        }`}
                      >
                        {sec.title}
                      </h4>

                      <p className="text-xs font-sans text-[#4A4658] line-clamp-1 font-normal leading-relaxed">
                        {sec.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 mt-1.5 border-t border-[#141416]/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#4A4658] text-[11px] font-medium">{sec.date}</span>
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleOpenArticle(sec);
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-sans transition-all ${
                          isActive
                            ? "bg-[#7567EE] text-white shadow-sm"
                            : "bg-[#141416]/5 text-[#141416] hover:bg-[#7567EE] hover:text-white"
                        }`}
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
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
