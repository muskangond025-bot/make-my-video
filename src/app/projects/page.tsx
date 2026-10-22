"use client";

import React, { useState, useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CtaSection } from "@/components/sections/CtaSection";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

import { ALL_PROJECTS } from "@/data/projectsPageData";
import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectsShowcase } from "@/components/sections/projects/ProjectsShowcase";
import { ProjectsTestimonials } from "@/components/sections/projects/ProjectsTestimonials";
import { ProjectsFaq } from "@/components/sections/projects/ProjectsFaq";

const CATEGORIES = [
  "All",
  "Video Production",
  "Corporate Video Production",
  "Social Documentary",
  "CSR Video",
  "Cinematography",
  "Employee Engagement",
  "Employee Video",
];

const ITEMS_PER_PAGE = 4;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewAll, setViewAll] = useState<boolean>(false);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((proj) => {
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        proj.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handle pagination
  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "All";
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const displayedProjects = useMemo(() => {
    if (isFiltering || viewAll) {
      return filteredProjects;
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage, isFiltering, viewAll]);

  return (
    <main className="bg-[#EAE3DB] text-[#141416] min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[15%] left-[5%] opacity-15 pointer-events-none z-0">
        <svg width="220" height="220" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="4,4" />
        </svg>
      </div>

      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Hero Section with Search & Categories */}
        <ProjectsHero
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          totalProjects={filteredProjects.length}
        />

        {/* Projects Showcase */}
        <ProjectsShowcase projects={displayedProjects} />

        {/* Pagination Controls when not filtering */}
        {!isFiltering && totalPages > 1 && (
          <div className="max-w-[1360px] mx-auto px-4 pb-16 flex flex-wrap items-center justify-center gap-3">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = !viewAll && currentPage === pageNum;

              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setViewAll(false);
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className={`w-11 h-11 rounded-full text-sm font-heading font-bold transition-all ${
                    isActive
                      ? "bg-[#141416] text-white shadow-md"
                      : "bg-white/50 hover:bg-white text-[#141416] border border-[#141416]/10"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setViewAll(!viewAll)}
              className={`px-5 h-11 rounded-full text-xs font-sans font-semibold tracking-wide transition-all ${
                viewAll
                  ? "bg-[#141416] text-white shadow-md"
                  : "bg-white/50 hover:bg-white text-[#141416] border border-[#141416]/10"
              }`}
            >
              {viewAll ? "Paginate" : "View All"}
            </button>
          </div>
        )}

        {/* Client Testimonials */}
        <ProjectsTestimonials />

        {/* FAQs */}
        <ProjectsFaq />

        {/* Global CTA Section */}
        <CtaSection />

        {/* Footer */}
        <PremiumFooter />
      </div>
    </main>
  );
}
