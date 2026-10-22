"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { CtaSection } from "@/components/sections/CtaSection";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

// Redesigned About Sections (Harmonized with Home Page color system & typography)
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutMissionVision } from "@/components/sections/about/AboutMissionVision";
import { AboutBtsSlider } from "@/components/sections/about/AboutBtsSlider";
import { AboutTeam } from "@/components/sections/about/AboutTeam";

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs matching Home Page */}
      <div className="absolute top-[20%] left-[5%] opacity-15 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Global Navigation matching Home Page */}
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Section 1: Hero & Story Header */}
        <AboutHero />

        {/* Section 2: Founder Story & Narrative */}
        <AboutStory />

        {/* Section 3: Mission & Vision ("DREAM TO ACHIEVE") */}
        <AboutMissionVision />

        {/* Section 4: Magic Behind Camera (Cinematic BTS Video Showcase) */}
        <AboutBtsSlider />

        <SectionCrosses dark={false} />

        {/* Section 7: Our Team Collective & Bio Modal */}
        <AboutTeam />

        {/* Section 8: Signature CTA Section (Same as Home Page) */}
        <CtaSection />

        {/* Section 9: Global Footer (Same as Home Page) */}
        <PremiumFooter />
      </div>
    </main>
  );
}
