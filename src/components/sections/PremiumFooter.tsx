"use client";

import React, { useState } from "react";
import { CatWalkMatrix } from "@/components/ui/CatWalkMatrix";

export const PremiumFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <footer
      id="contact"
      className="w-full relative bg-[#08080C] text-[#F3EBDD] overflow-hidden select-none font-sans pt-16 pb-12 transition-colors border-t border-zinc-900/60"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center">
        
        {/* 1. The Walking Cat Loop Dot-Matrix Centerpiece */}
        <div className="w-full flex justify-center items-center">
          <CatWalkMatrix brandText="mowl" className="max-w-[880px]" />
        </div>

        {/* 2. Tagline (Directly below cat walk baseline, matching screenshot) */}
        <div className="text-center mt-6 mb-12 sm:mb-14">
          <p className="text-zinc-400 text-sm sm:text-base font-normal tracking-wide">
            An assistant that works while you sleep.
          </p>
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-600 mt-1">
            Make My Vid &bull; High-Impact Video Production Studio
          </p>
        </div>

        {/* 3. The 3-Column Directory (Product, Company, Legal) */}
        <div className="w-full max-w-[620px] mx-auto grid grid-cols-3 gap-6 sm:gap-12 md:gap-16 text-left pb-14 sm:pb-16 border-b border-zinc-800/50">
          
          {/* Column 1: Product */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-white text-sm sm:text-base tracking-tight mb-1">
              Product
            </h4>
            <a
              href="#expertise"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Agents
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Pricing
            </a>
            <a
              href="#projects"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Showreels
            </a>
            <a
              href="#expertise"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              3D Motion
            </a>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-white text-sm sm:text-base tracking-tight mb-1">
              Company
            </h4>
            <a
              href="#about"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#careers"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Careers
            </a>
            <a
              href="#about"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Studio
            </a>
            <a
              href="#about"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Press
            </a>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-white text-sm sm:text-base tracking-tight mb-1">
              Legal
            </h4>
            <a
              href="/terms"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-left text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
            <a
              href="/privacy"
              className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Security
            </a>
          </div>

        </div>

        {/* 4. Bottom Bar (Copyright, Live Availability, Social Links) */}
        <div className="w-full max-w-[880px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Make My Vid.</span>
            <span>All rights reserved.</span>
          </div>

          {/* Live Studio Availability Badge */}
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-tight">
              Studio Active &bull; Available Worldwide
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              Twitter / X
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>

      {/* 5. Contact / Booking Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#101118] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-zinc-800 overflow-y-auto max-h-[90vh]">
            
            {/* Modal close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-zinc-400 max-w-xs">
                  Thank you for reaching out. Our production team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 mb-2 border border-indigo-500/30">
                  CONNECT WITH MAKE MY VID
                </div>
                <h4 className="text-2xl font-bold tracking-tight mb-2 text-white">
                  Let&apos;s build something cinematic
                </h4>
                <p className="text-xs text-zinc-400 mb-6">
                  Tell us about your project or production timeline and we will get back to you shortly.
                </p>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Phone Number <span className="text-zinc-600 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your video production, timeline, or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <input
                      required
                      type="checkbox"
                      id="footer-privacy"
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      className="rounded accent-indigo-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="footer-privacy" className="text-xs text-zinc-400 cursor-pointer">
                      I agree to the <span className="underline text-zinc-300 hover:text-white">Privacy Policy</span> *
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-zinc-800">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors shadow-md cursor-pointer"
                    >
                      <span>Submit Request</span>
                      <span>&rarr;</span>
                    </button>
                    <span className="text-xs text-zinc-500">
                      Or email direct: <a href="mailto:hello@makemyvid.com" className="underline text-zinc-400 hover:text-white">hello@makemyvid.com</a>
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
