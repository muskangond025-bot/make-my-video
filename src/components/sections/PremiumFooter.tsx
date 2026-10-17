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

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <footer
      id="contact"
      className="w-full min-w-full relative bg-[#141416] text-[#F3EBDD] overflow-hidden select-none font-sans pt-6 sm:pt-8 pb-8 sm:pb-10 border-t border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center">
        
        {/* 1. The Walking Cat Loop Dot-Matrix Centerpiece - Full Viewport Width */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 flex justify-center items-center overflow-hidden">
          <CatWalkMatrix brandText="mowl" className="w-full" />
        </div>

        {/* 2. Compact Premium Content: Left Info + Newsletter | Right Spaced Directory */}
        <div className="w-full max-w-[1360px] mx-auto pt-10 sm:pt-12 pb-4 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">
          
          {/* Left Block: Logo, Tagline & Newsletter */}
          <div className="flex flex-col items-start max-w-md w-full">
            <a
              href="/"
              className="flex items-center transition-opacity hover:opacity-85"
              aria-label="Make My Vid Home"
            >
              <img
                src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
                alt="MAKE MY VID"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </a>

            <p className="text-zinc-200 text-xs sm:text-sm font-medium tracking-wide mt-3 leading-relaxed">
              ELEVATING/ EMPOWERING/ EVOLVING Brands through videos.
            </p>

            <div className="mt-7 sm:mt-8 w-full">
              <h3 className="text-white text-base sm:text-lg font-serif font-bold italic tracking-tight mb-3">
                Subscribe to Newsletter
              </h3>

              {newsletterSubscribed ? (
                <p className="text-xs text-[#D5FF3F] font-mono tracking-wide py-2">
                  ✓ Thank you for subscribing to Make My Vid!
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubscribed(true);
                  }}
                  className="flex items-center gap-3 w-full max-w-[360px]"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="flex-1 bg-transparent border border-white/40 focus:border-white rounded-full px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Newsletter"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-[#D5FF3F] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 stroke-[2.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Block: Two Columns with Wide Breathing Room (Not Centered) */}
          <div className="flex items-start gap-16 sm:gap-24 lg:gap-32 self-start md:self-auto pt-1">
            
            {/* Column 1: Home, About, Join Us, Blogs */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <a
                href="/"
                className="text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200"
              >
                About
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-left text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Join Us
              </button>
              <a
                href="#archive"
                className="text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200"
              >
                Blogs
              </a>
            </div>

            {/* Column 2: Projects, Services, Support */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <a
                href="#archive"
                className="text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200"
              >
                Projects
              </a>
              <a
                href="#expertise"
                className="text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#faq"
                className="text-sm sm:text-base font-normal text-zinc-200 hover:text-white transition-colors duration-200"
              >
                Support
              </a>
            </div>

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
