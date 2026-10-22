"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CtaSection } from "@/components/sections/CtaSection";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

import { SupportHero } from "@/components/sections/support/SupportHero";
import { SupportInquiryForm } from "@/components/sections/support/SupportInquiryForm";
import { SupportBannerImage } from "@/components/sections/support/SupportBannerImage";
import { SupportContactCards } from "@/components/sections/support/SupportContactCards";
import { SupportLocationMap } from "@/components/sections/support/SupportLocationMap";

export default function SupportPage() {
  return (
    <main className="bg-[#EAE3DB] text-[#141416] min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[22%] left-[4%] opacity-15 pointer-events-none z-0">
        <svg width="220" height="220" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="4,4" />
        </svg>
      </div>

      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Hero Section */}
        <SupportHero />

        {/* Multi-Step Interactive Consultation / Inquiry Form */}
        <SupportInquiryForm />

        {/* Visual Studio Banner */}
        <SupportBannerImage />

        {/* Contact Communications & Studio Address Cards */}
        <SupportContactCards />

        {/* Interactive Location Switcher & Embedded Maps */}
        <SupportLocationMap />

        {/* Global CTA Section */}
        <CtaSection />

        {/* Footer */}
        <PremiumFooter />
      </div>
    </main>
  );
}
