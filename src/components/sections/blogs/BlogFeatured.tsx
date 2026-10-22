"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/data/blogsData";

interface BlogFeaturedProps {
  post: BlogPost;
}

export const BlogFeatured: React.FC<BlogFeaturedProps> = ({ post }) => {
  return (
    <section className="relative w-full py-16 md:py-20 px-6 lg:px-16 bg-[#F3EBDD] text-[#141416] border-b border-[#141416]/10 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#7567EE]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A4658]">
            Featured Cover Story
          </span>
        </div>

        {/* Featured Bento Card */}
        <div className="group relative rounded-3xl overflow-hidden border border-[#141416]/10 bg-white p-6 sm:p-10 shadow-xl transition-all duration-500 hover:border-[#7567EE] hover:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#141416] shadow-sm">
                {post.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 text-xs font-mono text-[#4A4658] mb-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7567EE]" />
                    {post.date}
                  </span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7567EE]" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif text-[#141416] leading-snug mb-4">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base text-[#4A4658] font-normal leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#141416]/10 flex items-center justify-between">
                <Link
                  href={`#read-${post.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Opening full article: "${post.title}"`);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141416] text-[#EAE3DB] text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[#7567EE] hover:text-white"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <span className="text-xs font-mono text-[#4A4658] uppercase">
                  Cover Feature
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
