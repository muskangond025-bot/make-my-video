"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BlogPost } from "@/data/blogsData";
import { BrandButton } from "@/components/shared/BrandButton";

interface BlogGridProps {
  posts: BlogPost[];
  onSelectArticle?: (post: BlogPost) => void;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, onSelectArticle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "ledger">("grid");
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const gridEl = document.getElementById("publications-archive");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 3D perspective mouse hover for individual grid cards (matching <Expertise> and <AboutMissionVision>)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;

    gsap.to(e.currentTarget, {
      rotateX,
      rotateY,
      scale: 1.015,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
      transformPerspective: 1000,
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

  const handleCardClick = (post: BlogPost) => {
    if (onSelectArticle) {
      onSelectArticle(post);
    }
  };

  return (
    <section
      id="publications-archive"
      className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADING: Single Line, Left-Aligned (per UI_RULES item 27-31)      */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-left max-w-3xl">
            <h2 className="typo-h2 font-heading font-black tracking-tight uppercase leading-none mb-3 text-[#141416] text-left">
              CURATED <span className="text-[#7567EE]">PUBLICATIONS.</span>
            </h2>
            <p className="typo-body text-[#4A4658] font-normal text-left">
              Browse our complete archive of production breakdowns, editing workflows, and executive media strategies.
            </p>
          </div>

          {/* Controls Bar: View Mode Switcher with Black Icons */}
          <div className="flex items-center gap-3 self-start lg:self-end">

            {/* View Mode Toggle - Both icons explicitly in Black Color */}
            <div className="flex items-center bg-white rounded-full p-1 border border-[#141416]/10 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#D5FF3F] shadow-sm"
                    : "hover:bg-black/5"
                }`}
                title="Bento Grid View"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4 text-[#141416]" />
              </button>
              <button
                onClick={() => setViewMode("ledger")}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  viewMode === "ledger"
                    ? "bg-[#D5FF3F] shadow-sm"
                    : "hover:bg-black/5"
                }`}
                title="Editorial Ledger View"
                aria-label="List view"
              >
                <List className="w-4 h-4 text-[#141416]" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="py-24 text-center bg-white/80 backdrop-blur-md rounded-[32px] border border-[#141416]/10 p-12 shadow-sm">
            <h3 className="text-2xl font-heading font-black uppercase text-[#141416] mb-3">
              No Matching Publications Found
            </h3>
            <p className="text-base text-[#4A4658] max-w-md mx-auto">
              Please check back soon or explore our featured masterclass blueprints below.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* ======================================================================= */
          /* VIEW MODE A: ARCHITECTURAL BENTO GRID (CLEAN WITHOUT UNWANTED PILLS)   */
          /* ======================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => handleCardClick(post)}
                className="group relative rounded-[30px] bg-white border border-[#141416]/10 p-6 sm:p-7 shadow-[0_10px_30px_rgba(20,20,22,0.06)] hover:shadow-[0_20px_50px_rgba(20,20,22,0.16)] hover:border-[#7567EE] transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Corner Reticles on Hover */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#7567EE] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#7567EE] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Thumbnail Image - Clean without floating pills or top flex items */}
                  <div className="relative w-full aspect-[16/10] rounded-[22px] overflow-hidden bg-black/5 mb-5 border border-[#141416]/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Publication Date */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#4A4658] mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7567EE]" />
                    <span>{post.date}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="typo-h3 font-heading font-black uppercase text-[#141416] tracking-tight leading-snug group-hover:text-[#7567EE] transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="typo-body text-[#33303E] font-normal leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom Action Row matching BrandButton */}
                <div className="pt-4 border-t border-[#141416]/10 flex items-center justify-between">
                  <BrandButton
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(post);
                    }}
                    label="READ STORY"
                  />

                  <span className="text-[11px] font-mono text-[#4A4658] uppercase">
                    Make My Vid
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ======================================================================= */
          /* VIEW MODE B: EDITORIAL LEDGER (CLEAN DIRECTORY ROWS)                   */
          /* ======================================================================= */
          <div className="flex flex-col rounded-[32px] bg-white border border-[#141416]/10 overflow-hidden shadow-sm divide-y divide-[#141416]/10">
            {currentPosts.map((post, idx) => {
              const displayIndex = startIndex + idx + 1;
              return (
                <div
                  key={post.id}
                  onClick={() => handleCardClick(post)}
                  className="group px-6 sm:px-8 py-6 hover:bg-[#F3EBDD]/60 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none"
                >
                  {/* Left: Index */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm font-mono font-bold text-[#141416]">
                      0{displayIndex}
                    </span>
                  </div>

                  {/* Middle: Title & Excerpt */}
                  <div className="flex-1 min-w-0">
                    <h3 className="typo-h3 font-heading font-black uppercase text-[#141416] tracking-tight group-hover:text-[#7567EE] transition-colors line-clamp-1 mb-1">
                      {post.title}
                    </h3>
                    <p className="typo-small text-[#4A4658] line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Right: Date & Action Button */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right text-xs font-mono text-[#141416] hidden sm:block">
                      {post.date}
                    </div>

                    <BrandButton
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(post);
                      }}
                      label="READ"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGINATION CONTROLS: NUMBERS VISIBLE IN BLACK COLOR                       */}
        {/* ========================================================================= */}
        {totalPages > 1 && (
          <div className="mt-16 pt-8 border-t border-[#141416]/10 flex items-center justify-center gap-2.5">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-11 h-11 rounded-full border border-[#141416]/15 bg-white flex items-center justify-center text-[#141416] disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5 transition-all cursor-pointer shadow-sm"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 text-[#141416]" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              const isActive = currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-11 h-11 rounded-full text-xs font-mono font-bold text-[#141416] transition-all duration-300 cursor-pointer shadow-sm ${
                    isActive
                      ? "bg-[#D5FF3F] border border-[#141416]/25 scale-105"
                      : "bg-white border border-[#141416]/15 hover:bg-black/5"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-11 h-11 rounded-full border border-[#141416]/15 bg-white flex items-center justify-center text-[#141416] disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5 transition-all cursor-pointer shadow-sm"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 text-[#141416]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
