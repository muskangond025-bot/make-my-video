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

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        {/* Section 1: Editorial Premium Banner with Integrated Filters */}
        <ProjectsHero
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          totalProjects={filteredProjects.length}
        />

        {/* Section 2: Netgíró Stacked Card Scroll Animation Showcase */}
        <ProjectsShowcase projects={filteredProjects} />

        {/* Section 3: Awwwards-Grade Client Testimonials */}
        <ProjectsTestimonials />

        {/* Section 4: Awwwards-Grade Projects FAQ */}
        <ProjectsFaq />

        {/* Section 5: Signature CTA Section */}
        <CtaSection />

        {/* Section 6: Premium Footer */}
        <PremiumFooter />
      </div>
    </main>
  );
}
