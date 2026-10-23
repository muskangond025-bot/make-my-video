"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SectionCrosses } from "@/components/shared/SectionCrosses";
import { CtaSection } from "@/components/shared/CtaSection";
import { PremiumFooter } from "@/components/layout/PremiumFooter";

import { JoinHero } from "@/components/sections/join/JoinHero";
import { JoinForm } from "@/components/sections/join/JoinForm";
import { JoinSpotlights } from "@/components/sections/join/JoinSpotlights";

export default function JoinUsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[20%] left-[5%] opacity-15 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Global Navigation matching Home & About */}
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Section 1: Hero & Community Overview */}
        <JoinHero />

        {/* Section 2: Application Portal Form */}
        <JoinForm />

        <SectionCrosses dark={false} />

        {/* Section 3: Community Spotlights (Videos & Testimonials) */}
        <JoinSpotlights />

        {/* Section 4: Signature CTA Section (Same as Home & About) */}
        <CtaSection />

        {/* Section 5: Global Footer (Same as Home & About) */}
        <PremiumFooter />
      </div>
    </main>
  );
}
