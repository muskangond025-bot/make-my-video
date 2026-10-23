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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ----------------------------------------------------------------------- */}
          {/* PRIMARY COLUMN: Flagship Stage Card (Perfect Height Balance) (7 Cols)   */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div
              ref={stageRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              onClick={() => handleOpenArticle(activePost)}
              className="group relative w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white text-[#141416] border border-[#141416]/10 p-6 sm:p-8 shadow-[0_12px_36px_rgba(20,20,22,0.06)] hover:shadow-[0_18px_48px_rgba(20,20,22,0.12)] hover:border-[#7567EE] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Corner Viewfinder Reticles [ ] in Signature Lavender */}
              <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-[#7567EE] pointer-events-none z-20" />
              <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-[#7567EE] pointer-events-none z-20" />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Visual Media Container: Perfectly proportioned aspect ratio */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-black/5 mb-5 border border-[#141416]/10">
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
                    <div className="flex items-center gap-2.5 text-xs font-mono text-[#4A4658] mb-2.5">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#7567EE]" />
                        {activePost.date}
                      </span>
                      <span>&bull;</span>
                      <span>By Rohan Joshi</span>
                    </div>

                    {/* Flagship Headline */}
                    <h3 className="typo-h3 sm:text-2xl lg:text-3xl font-heading font-black uppercase text-[#141416] leading-tight mb-3 tracking-tight group-hover:text-[#7567EE] transition-colors line-clamp-2">
                      {activePost.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="typo-body text-[#33303E] font-normal leading-relaxed mb-4 line-clamp-2">
                      {activePost.excerpt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bottom Row matching BrandButton */}
              <div className="pt-4 border-t border-[#141416]/10 flex items-center justify-between">
                <BrandButton
                  size="sm"
                  onClick={(e) => {
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
          {/* SECONDARY COLUMN: Strictly 3 Cards Matching Left Column Height (5 Cols) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3.5 h-full">
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
                  className={`group relative flex-1 rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-4 items-center justify-between select-none ${
                    isActive
                      ? "bg-white border-2 border-[#7567EE] shadow-[0_10px_30px_rgba(117,103,238,0.12)] scale-[1.01]"
                      : "bg-white/80 border border-[#141416]/10 hover:bg-white hover:border-[#141416]/20"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-32 aspect-[16/10] sm:aspect-[16/11] rounded-[16px] overflow-hidden shrink-0 bg-black/5">
                    <Image
                      src={sec.image}
                      alt={sec.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 130px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full">
                    <div>
                      <h4
                        className={`typo-h3 text-sm sm:text-base font-heading font-black uppercase tracking-tight leading-snug line-clamp-2 mb-1.5 transition-colors ${
                          isActive
                            ? "text-[#7567EE]"
                            : "text-[#141416] group-hover:text-[#7567EE]"
                        }`}
                      >
                        {sec.title}
                      </h4>

                      <p className="typo-small text-[#4A4658] line-clamp-1 font-normal leading-relaxed">
                        {sec.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#141416]/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#4A4658] text-[11px]">{sec.date}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenArticle(sec);
                        }}
                        className="inline-flex items-center gap-1 text-[#141416] font-bold hover:text-[#7567EE] transition-colors text-[11px]"
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
