"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Send, Sparkles } from "lucide-react";

export const JoinForm: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("Editor");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Editor",
    expertise: "",
    portfolioLinks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const roles = [
    { id: "Editor", title: "Video Editor", desc: "Remote narrative & commercial editing" },
    { id: "Videographer", title: "Videographer", desc: "Mobile & field camera shoots" },
    { id: "Motion Designer", title: "Motion Designer", desc: "2D/3D motion graphics & title design" },
  ];

  return (
    <section id="application-form" className="relative w-full py-24 md:py-32 px-6 lg:px-16 bg-[#F3EBDD] text-[#141416] border-b border-[#141416]/10 select-none">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7567EE]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A4658]">
              Join Our Team
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase text-[#141416] tracking-tight">
            APPLICATION <span className="text-[#7567EE]">PORTAL</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#4A4658] font-normal max-w-xl mx-auto">
            Tell us about your craft, your primary specialization, and share your top 3 pieces of work.
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-white border border-[#141416]/10 rounded-3xl p-6 sm:p-12 shadow-xl">
          {submitted ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#141416] mb-3">
                APPLICATION RECEIVED!
              </h3>
              <p className="text-base text-[#4A4658] max-w-md mb-8">
                Thank you for applying to the Make My Vid creative community. Our production leads will review your portfolio and get in touch within 48 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    role: "Editor",
                    expertise: "",
                    portfolioLinks: "",
                  });
                }}
                className="px-6 py-2.5 rounded-full border border-[#141416]/20 text-xs font-mono uppercase tracking-wider text-[#141416] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection Switcher */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#4A4658] mb-3">
                  Select Your Primary Role *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {roles.map((r) => {
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => {
                          setSelectedRole(r.id);
                          setFormData({ ...formData, role: r.id });
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-[#7567EE] text-white border-[#7567EE] shadow-md"
                            : "bg-[#EAE3DB]/40 text-[#141416] border-[#141416]/10 hover:border-[#7567EE]/40 hover:bg-white"
                        }`}
                      >
                        <div className="text-sm font-bold uppercase tracking-tight">
                          {r.title}
                        </div>
                        <div className={`text-xs mt-1 ${isSelected ? "text-white/80" : "text-[#4A4658]"}`}>
                          {r.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#4A4658] mb-2">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#EAE3DB]/30 border border-[#141416]/15 text-[#141416] placeholder-[#4A4658]/60 text-sm focus:outline-none focus:border-[#7567EE] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#4A4658] mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#EAE3DB]/30 border border-[#141416]/15 text-[#141416] placeholder-[#4A4658]/60 text-sm focus:outline-none focus:border-[#7567EE] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone & Expertise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#4A4658] mb-2">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#EAE3DB]/30 border border-[#141416]/15 text-[#141416] placeholder-[#4A4658]/60 text-sm focus:outline-none focus:border-[#7567EE] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#4A4658] mb-2">
                    Primary Field of Expertise *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Color Grading, Reels, Corporate AV, Documentaries"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#EAE3DB]/30 border border-[#141416]/15 text-[#141416] placeholder-[#4A4658]/60 text-sm focus:outline-none focus:border-[#7567EE] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Portfolio Links */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#4A4658] mb-2">
                  Best Work Links * (Share maximum 3 links — YouTube, Vimeo, Drive or Frame.io)
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste up to 3 links showcasing your finest commercial or creative work..."
                  value={formData.portfolioLinks}
                  onChange={(e) => setFormData({ ...formData, portfolioLinks: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#EAE3DB]/30 border border-[#141416]/15 text-[#141416] placeholder-[#4A4658]/60 text-sm focus:outline-none focus:border-[#7567EE] focus:bg-white transition-all leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#4A4658] font-mono">
                  All submissions are treated with strict creative confidentiality.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#141416] text-[#EAE3DB] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#7567EE] hover:text-white hover:shadow-[0_10px_30px_rgba(117,103,238,0.35)] cursor-pointer"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
