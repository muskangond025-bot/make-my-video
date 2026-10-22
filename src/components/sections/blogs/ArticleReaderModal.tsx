"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Calendar, Clock, CheckCircle2, Share2, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogsData";

interface ArticleReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectArticle?: (post: BlogPost) => void;
  allPosts?: BlogPost[];
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  post,
  onClose,
  onSelectArticle,
  allPosts = [],
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (post) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  // Track reading scroll progress
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
    }
  };

  const handleShare = async () => {
    if (!post) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!post) return null;

  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.isFeatured))
    .slice(0, 2);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#141416]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] bg-[#F3EBDD] text-[#141416] rounded-[28px] sm:rounded-[38px] border border-[#141416]/20 shadow-[0_30px_90px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden relative"
      >
        {/* Dynamic Reading Progress Bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-[#7567EE] z-30 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-[#141416]/10 bg-[#EAE3DB]/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#7567EE] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#4A4658]">
              MMV Editorial Dispatch
            </span>
            <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#141416] text-[#F3EBDD]">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-full bg-white text-[#141416] hover:bg-[#141416] hover:text-[#F3EBDD] transition-colors border border-[#141416]/10 text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Share Article Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#141416] text-white hover:bg-[#7567EE] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              aria-label="Close article modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-8 space-y-8 select-text"
        >
          {/* Article Meta Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#4A4658] border-b border-[#141416]/10 pb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#7567EE]" />
              {post.date}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7567EE]" />
              {post.readTime}
            </span>
            <span>&bull;</span>
            <span className="text-[#141416] font-semibold">
              {post.author || "Rohan Joshi"}
            </span>
            <span className="text-[#4A4658]/70">({post.authorRole || "Founder, Make My Vid"})</span>
          </div>

          {/* Article Title */}
          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-[#141416] tracking-tight leading-[1.1] mb-4">
              {post.title}
            </h1>
            <p className="text-base sm:text-xl text-[#33303E] font-normal leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Main Cinematic Feature Visual */}
          <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden border border-[#141416]/15 shadow-xl bg-black/10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
            />
            {/* Viewfinder reticles */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#7567EE] pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#7567EE] pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#7567EE] pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#7567EE] pointer-events-none" />
          </div>

          {/* Key Executive Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="rounded-[24px] bg-[#141416] text-[#F3EBDD] p-6 sm:p-8 border border-[#7567EE]/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5FF3F]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D5FF3F]">
                  Executive Insights & Key Takeaways
                </h3>
              </div>
              <ul className="space-y-3">
                {post.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#F3EBDD]/90 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#7567EE] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Written Narrative Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-[#33303E] leading-relaxed font-sans">
            {post.content && post.content.length > 0 ? (
              post.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">
                At Make My Vid, we approach video production as an architectural discipline: every frame, cut, and sound frequency is calibrated to serve commercial performance and human emotion. High-end video storytelling transforms how audiences perceive your brand value from the very first impression.
              </p>
            )}
          </div>

          {/* Author Quote Box */}
          <div className="border-l-4 border-[#7567EE] pl-6 py-2 my-8 bg-white/50 rounded-r-2xl">
            <p className="text-lg sm:text-xl font-serif italic text-[#141416] leading-snug">
              &ldquo;Great video is not about showing equipment; it is about eliminating friction between a founder&apos;s vision and their audience&apos;s heart.&rdquo;
            </p>
            <div className="mt-3 text-xs font-mono text-[#4A4658] uppercase">
              &mdash; Rohan Joshi, Executive Producer & Founder
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && onSelectArticle && (
            <div className="pt-8 border-t border-[#141416]/10">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#4A4658] mb-4">
                Continue Reading
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                      if (scrollRef.current) scrollRef.current.scrollTop = 0;
                    }}
                    className="group p-4 rounded-2xl bg-white border border-[#141416]/10 hover:border-[#7567EE] transition-all cursor-pointer flex items-center gap-4 shadow-sm"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black/5">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-mono text-[#7567EE] uppercase">
                        {rel.category}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#141416] line-clamp-1 group-hover:text-[#7567EE] transition-colors">
                        {rel.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#4A4658] mt-0.5">
                        {rel.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#4A4658] group-hover:text-[#7567EE] group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Close Button */}
          <div className="pt-6 pb-2 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#141416] text-[#EAE3DB] text-xs font-mono uppercase tracking-wider hover:bg-[#7567EE] hover:text-white transition-all shadow-md cursor-pointer"
            >
              Close Publication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
