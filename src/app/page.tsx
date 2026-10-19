import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { CubeShowcase } from "@/components/sections/CubeShowcase";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

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
        <Hero />

        {/* Chapter 2: Services & Capabilities */}
        <Expertise />

        {/* Chapter 3: Interactive 3D Archive */}
        <CubeShowcase />

        {/* Chapter 4: Client Portfolio & Social Proof */}
        <TrustedBrands />
        <Testimonials />

        {/* Chapter 5: FAQ, Dumemearts CTA & Footer */}
        <Faq />
        <CtaSection />
        <PremiumFooter />
      </div>
    </main>
  );
}
