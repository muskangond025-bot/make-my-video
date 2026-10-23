"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check, ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandButton } from "@/components/shared/BrandButton";

export const JoinForm: React.FC = () => {
  // Calendar state: Preferred interview / availability slot
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [currentMonth, setCurrentMonth] = useState<string>("October 2026");

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "VIDEO EDITOR",
    expertise: "",
    portfolioLinks: "",
  });

  const [isCaptchaChecked, setIsCaptchaChecked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Creative roles
  const roles = [
    "VIDEO EDITOR",
    "VIDEOGRAPHER",
    "MOTION DESIGNER",
    "COLORIST",
  ];

  // Days of the week header
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // October 2026 calendar days grid
  const calendarDays = [
    null, null, null, null, // leading empty slots
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="application-form"
      className="relative py-8 sm:py-16 px-4 sm:px-8 max-w-[1360px] mx-auto w-full select-none"
    >
      {/* Outer Rounded Stage Container (Exact Visual Match to Support Page) */}
      <div className="relative rounded-[36px] sm:rounded-[48px] bg-white border border-[#141416]/10 text-[#141416] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        
        {/* ========================================================================= */}
        {/* MAIN TWO-COLUMN SPLIT: LEFT (TITLE + CALENDAR), RIGHT (FORM)              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: JOIN US HEADER & INTERVIEW CALENDAR WIDGET (5 COLS)        */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Refined Slim JOIN US Header with Geometric Star (Identical Visual Design) */}
              <div className="flex items-center gap-4 sm:gap-6 mb-3">
                <h2
                  className="uppercase text-[#141416] select-none typo-h2"
                  style={{
                    fontFamily: "'Humane', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(84px, 10vw, 140px)",
                    lineHeight: 0.82,
                    letterSpacing: "0.02em",
                  }}
                >
                  JOIN US
                </h2>
                
                {/* Clean Geometric Star/Cross Icon */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 text-[#7567EE] shrink-0 mb-2">
                  <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2h8v10h10v8H24v18h-8V20H6v-8h10V2z" />
                  </svg>
                </div>
              </div>

              {/* Narrative Subtitle */}
              <p className="typo-body text-[#4A4658] font-normal leading-relaxed mb-8 max-w-md">
                Tell us about your craft, your primary specialization, and share your finest pieces of work. Join our global network of directors, editors, colorists, and motion artists.
              </p>
            </div>

            {/* Interactive Embedded Calendar Widget (Preferred Interview / Availability Date) */}
            <div className="w-full rounded-[24px] bg-[#F8F6F2] border border-[#141416]/10 p-5 sm:p-6 shadow-sm">
              {/* Calendar Header with Month & Year */}
              <div className="flex items-center justify-between pb-4 border-b border-[#141416]/10 mb-4">
                <span className="text-base font-sans font-bold text-[#141416] tracking-wide">
                  {currentMonth}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth("September 2026")}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#EAE3DB] border border-[#141416]/10 flex items-center justify-center text-[#141416] transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth("November 2026")}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#EAE3DB] border border-[#141416]/10 flex items-center justify-center text-[#141416] transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Days of Week Row */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((day) => (
                  <span key={day} className="text-xs font-mono font-bold text-[#141416] uppercase">
                    {day}
                  </span>
                ))}
              </div>

              {/* Dates Grid (All 31 Days Bold & Clearly Visible) */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-9 w-full" />;
                  }

                  const isSelected = selectedDate === day;

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`h-9 w-full rounded-xl text-xs sm:text-sm font-sans font-bold transition-all flex flex-col items-center justify-center relative cursor-pointer border ${
                        isSelected
                          ? "bg-[#141416] text-white border-[#141416] shadow-md"
                          : "bg-white text-[#141416] border-[#141416]/10 hover:bg-[#7567EE] hover:text-white hover:border-[#7567EE]"
                      }`}
                      style={{
                        color: isSelected ? "#FFFFFF" : undefined,
                      }}
                    >
                      <span className="font-bold leading-none">{day}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D5FF3F] mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#141416]/10 flex items-center justify-between text-xs text-[#141416]">
                <span className="font-sans font-medium">Preferred Interview / Start Date:</span>
                <span className="font-mono font-bold text-[#141416]">
                  Oct {selectedDate}, 2026
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: APPLICATION FORM FIELDS (7 COLS)                          */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#141416] mb-3">
                  APPLICATION RECEIVED!
                </h3>
                <p className="text-base text-[#4A4658] max-w-md mb-8">
                  Thank you for applying to the Make My Vid creative network. Our production leads will review your portfolio and get in touch within 48 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      role: "VIDEO EDITOR",
                      expertise: "",
                      portfolioLinks: "",
                    });
                  }}
                  className="px-8 py-3 rounded-full bg-[#141416] text-white text-xs font-heading font-black uppercase tracking-wider hover:bg-[#7567EE] transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Row 1: FIRST NAME & LAST NAME */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-2">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#141416]/20 focus:border-[#7567EE] text-[#141416] placeholder:text-[#141416]/35 py-2.5 text-base font-sans outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-2">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Morgan"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#141416]/20 focus:border-[#7567EE] text-[#141416] placeholder:text-[#141416]/35 py-2.5 text-base font-sans outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: EMAIL ADDRESS & PHONE NUMBER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@creative.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#141416]/20 focus:border-[#7567EE] text-[#141416] placeholder:text-[#141416]/35 py-2.5 text-base font-sans outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-2">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#141416]/20 focus:border-[#7567EE] text-[#141416] placeholder:text-[#141416]/35 py-2.5 text-base font-sans outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: ROLE APPLYING FOR (Matching Exact Service Pill Design) */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-3">
                    ROLE APPLYING FOR *
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {roles.map((r) => {
                      const isSelected = formData.role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: r })}
                          style={{
                            backgroundColor: isSelected ? "#141416" : "#F3EBDD",
                          }}
                          className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "shadow-sm ring-1 ring-[#141416]"
                              : "border border-[#141416]/15 hover:border-[#141416]"
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#D5FF3F] bg-[#141416]"
                                : "border-[#141416]/40 bg-transparent"
                            }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D5FF3F]" />
                            )}
                          </span>
                          <span
                            style={{
                              color: isSelected ? "#FFFFFF" : "#141416",
                            }}
                            className="font-bold tracking-wide"
                          >
                            {r}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: PRIMARY EXPERTISE & TOOLS */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-2">
                    PRIMARY EXPERTISE & TOOLS *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Premiere Pro, After Effects, DaVinci Resolve, Cinema 4D, Sony FX3 / RED"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#141416]/20 focus:border-[#7567EE] text-[#141416] placeholder:text-[#141416]/35 py-2.5 text-base font-sans outline-none transition-colors"
                  />
                </div>

                {/* Row 5: BEST WORK / PORTFOLIO LINKS */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141416] mb-2">
                    PORTFOLIO / SHOWREEL LINKS * (Share up to 3 links — YouTube, Vimeo, Behance, Frame.io)
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Paste links to your best work or showreel with brief context on what you did..."
                    value={formData.portfolioLinks}
                    onChange={(e) => setFormData({ ...formData, portfolioLinks: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#141416]/20 focus:border-[#7567EE] text-[#141416] placeholder:text-[#141416]/35 py-2.5 text-base font-sans outline-none transition-colors resize-none"
                  />
                </div>

                {/* Row 6: reCAPTCHA & Submit Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                  {/* Standard reCAPTCHA Card */}
                  <div className="flex items-center gap-4 px-4 py-3 bg-[#F8F6F2] border border-[#141416]/15 rounded-xl shadow-xs self-start">
                    <button
                      type="button"
                      onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded border-2 border-[#141416]/30 flex items-center justify-center bg-white transition-colors">
                        {isCaptchaChecked && (
                          <Check size={16} className="text-emerald-600 stroke-[3]" />
                        )}
                      </div>
                      <span className="text-xs font-sans font-semibold text-[#141416]">
                        I&apos;m not a robot
                      </span>
                    </button>

                    <div className="pl-4 border-l border-[#141416]/10 flex flex-col items-center">
                      <div className="w-5 h-5 text-[#141416]/40">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                          <path d="M16 21h5v-5" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-sans text-[#141416]/50">reCAPTCHA</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <BrandButton
                    type="submit"
                    label="SUBMIT APPLICATION"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
