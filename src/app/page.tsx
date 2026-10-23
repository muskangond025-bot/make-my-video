import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PremiumFooter } from "@/components/layout/PremiumFooter";
import { SectionCrosses } from "@/components/shared/SectionCrosses";
import { CtaSection } from "@/components/shared/CtaSection";
import { Faq } from "@/components/shared/Faq";
import {
  Hero,
  Expertise,
  CubeShowcase,
  TrustedBrands,
  IndustriesServed,
  Testimonials,
} from "@/components/sections/home";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      {/* Background Ornament SVGs */}
      <div className="absolute top-[20%] left-[5%] opacity-15 pointer-events-none z-0">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#141416" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>

      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Chapter 1: Hero & Vision */}
        <div id="about" className="relative -top-24 pointer-events-none" />
        <Hero />

        {/* Chapter 2: Services & Capabilities */}
        <Expertise />

        {/* Chapter 3: Interactive 3D Archive */}
        <div id="projects" className="relative -top-24 pointer-events-none" />
        <CubeShowcase />

        {/* Chapter 4: Client Portfolio & Social Proof */}
        <TrustedBrands />
        <IndustriesServed />
        <Testimonials />

        {/* Chapter 5: FAQ, Dumemearts CTA & Footer */}
        <Faq />
        <CtaSection />
        <PremiumFooter />
      </div>
    </main>
  );
}
