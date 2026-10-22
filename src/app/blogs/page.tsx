"use client";

import React, { useState, useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { CtaSection } from "@/components/sections/CtaSection";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

import { BLOGS_DATA } from "@/data/blogsData";
import { BlogHero } from "@/components/sections/blogs/BlogHero";
import { BlogFeatured } from "@/components/sections/blogs/BlogFeatured";
import { BlogGrid } from "@/components/sections/blogs/BlogGrid";

const CATEGORIES = [
  "All",
  "Brand Strategy",
  "Remote Post-Production",
  "Cinematic Production",
  "Corporate AV",
  "Live Broadcast",
  "Photography",
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = useMemo(() => {
    return BLOGS_DATA.find((p) => p.isFeatured) || BLOGS_DATA[0];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="bg-background text-foreground min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[20%] left-[5%] opacity-15 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Global Navigation matching Home, About, and Join Us */}
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Section 1: Hero & Search/Filters */}
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        {/* Section 2: Lead Featured Cover Story (Shown when no search query is active) */}
        {!searchQuery && selectedCategory === "All" && (
          <BlogFeatured post={featuredPost} />
        )}

        <SectionCrosses dark={false} />

        {/* Section 3: Publications Grid with 3-page pagination */}
        <BlogGrid posts={filteredPosts} />

        {/* Section 4: Signature CTA Section (Same as Home, About, Join Us) */}
        <CtaSection />

        {/* Section 5: Global Footer (Same as Home, About, Join Us) */}
        <PremiumFooter />
      </div>
    </main>
  );
}
