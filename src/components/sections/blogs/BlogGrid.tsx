"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost } from "@/data/blogsData";

interface BlogGridProps {
  posts: BlogPost[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-6 lg:px-16 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#7567EE]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A4658]">
                All Publications
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase text-[#141416] tracking-tight">
              LATEST <span className="text-[#7567EE]">ARTICLES</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-[#4A4658] uppercase">
            Showing {currentPosts.length} of {posts.length} articles
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#141416]/10 p-12">
            <h3 className="text-xl font-bold uppercase text-[#141416] mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-[#4A4658]">
              Try adjusting your search query or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="group relative rounded-3xl overflow-hidden border border-[#141416]/10 bg-white p-4 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-[#7567EE] hover:shadow-xl hover:scale-[1.01]"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/5 mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#141416] shadow-sm">
                      {post.category}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs font-mono text-[#4A4658] px-1 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#7567EE]" />
                      {post.date}
                    </span>
                    <span>&bull;</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#7567EE]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-xl font-serif text-[#141416] px-1 mb-3 leading-snug group-hover:text-[#7567EE] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A4658] font-normal px-1 mb-6 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3 px-1 border-t border-[#141416]/10 flex items-center justify-between">
                  <Link
                    href={`#read-${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Opening full article: "${post.title}"`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#141416] font-semibold group-hover:text-[#7567EE] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <span className="text-[11px] font-mono text-[#4A4658]">
                    Make My Vid
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section (Matching genuine 3 pages) */}
        {totalPages > 1 && (
          <div className="mt-16 pt-8 border-t border-[#141416]/10 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-[#141416]/15 bg-white flex items-center justify-center text-[#141416] disabled:opacity-40 disabled:pointer-events-none hover:bg-[#141416] hover:text-[#EAE3DB] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              const isActive = currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#141416] text-[#EAE3DB] shadow-md"
                      : "bg-white text-[#141416] border border-[#141416]/15 hover:bg-black/5"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-[#141416]/15 bg-white flex items-center justify-center text-[#141416] disabled:opacity-40 disabled:pointer-events-none hover:bg-[#141416] hover:text-[#EAE3DB] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
