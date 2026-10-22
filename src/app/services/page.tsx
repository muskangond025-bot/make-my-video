"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CtaSection } from "@/components/sections/CtaSection";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesSpotlight } from "@/components/sections/services/ServicesSpotlight";
import { ServicesKeyFeatures } from "@/components/sections/services/ServicesKeyFeatures";
import { ServicesList } from "@/components/sections/services/ServicesList";
import { ServicesFeaturedTags } from "@/components/sections/services/ServicesFeaturedTags";
import { ServicesFaq } from "@/components/sections/services/ServicesFaq";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="bg-[#EAE3DB] text-[#141416] min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[18%] right-[5%] opacity-15 pointer-events-none z-0">
        <svg width="240" height="240" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="3,3" />
        </svg>
      </div>

      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Hero Section with Search */}
        <ServicesHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 3 Flagship Spotlight Services */}
        <ServicesSpotlight
          onSelectService={(name) => {
            setSearchQuery(name);
            const el = document.getElementById("services-catalog");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Key Features & Company Values */}
        <ServicesKeyFeatures />

        {/* Expandable Services Catalog */}
        <div id="services-catalog">
          <ServicesList searchQuery={searchQuery} />
        </div>

        {/* Featured Capabilities & Tags */}
        <ServicesFeaturedTags />

        {/* FAQs */}
        <ServicesFaq />

        {/* Global CTA Section */}
        <CtaSection />

        {/* Footer */}
        <PremiumFooter />
      </div>
    </main>
  );
}
