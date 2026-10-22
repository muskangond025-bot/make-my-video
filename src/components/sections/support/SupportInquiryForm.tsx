"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Send, Sparkles } from "lucide-react";
import {
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  REFERRAL_OPTIONS,
  KEY_FACTORS,
} from "@/data/supportPageData";

export const SupportInquiryForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    service: "",
    description: "",
    timeline: "",
    referral: "",
    experience: "",
    factors: [] as string[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Please enter your name";
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Please enter your phone number";
      }
    } else if (step === 1) {
      if (!formData.service) newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const toggleFactor = (factor: string) => {
    setFormData((prev) => ({
      ...prev,
      factors: prev.factors.includes(factor)
        ? prev.factors.filter((f) => f !== factor)
        : [...prev.factors, factor],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/80 backdrop-blur-md border border-[#141416]/10 rounded-3xl p-8 sm:p-14 text-center shadow-lg max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-[#7567EE]/10 text-[#7567EE] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#141416] mb-3">
          Thank You, {formData.name}!
        </h3>
        <p className="text-sm sm:text-base font-sans text-[#141416]/75 max-w-md mx-auto leading-relaxed mb-8">
          We have received your project inquiry. Rohan and the Make My Vid team will review your specifications and get in touch within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(0);
            setFormData({
              name: "",
              email: "",
              phone: "",
              companyName: "",
              service: "",
              description: "",
              timeline: "",
              referral: "",
              experience: "",
              factors: [],
            });
          }}
          className="px-8 py-3.5 rounded-full bg-[#141416] text-[#EAE3DB] hover:bg-[#7567EE] font-sans text-sm font-semibold transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8 px-2">
        {["1. Your Details", "2. Project Scope", "3. Requirements"].map((title, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === i
                  ? "bg-[#141416] text-white"
                  : currentStep > i
                  ? "bg-[#7567EE] text-white"
                  : "bg-black/10 text-[#141416]/50"
              }`}
            >
              {currentStep > i ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`text-xs sm:text-sm font-sans font-medium hidden sm:inline ${
                currentStep >= i ? "text-[#141416]" : "text-[#141416]/40"
              }`}
            >
              {title}
            </span>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/75 backdrop-blur-md border border-[#141416]/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm transition-all"
      >
        {/* Step 0: Basic Contact Info */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-[#141416] tracking-tight mb-1">
                Tell us about yourself
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#141416]/60">
                Let us know who we will be collaborating with.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                  Full Name <span className="text-[#7567EE]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                    E-mail Address <span className="text-[#7567EE]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                    Phone / WhatsApp <span className="text-[#7567EE]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 / +44 Phone number"
                    className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                  Company / Brand Name <span className="text-black/40 text-[10px] normal-case">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Your organization or project title"
                  className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Project Scope */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-[#141416] tracking-tight mb-1">
                How can we help?
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#141416]/60">
                Choose the primary service you require and describe your project goals.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                  Select Service <span className="text-[#7567EE]">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                  Tell us about your project <span className="text-black/40 text-[10px] normal-case">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share details on format, locations, deliverables, or inspiration..."
                  className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl p-5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                  What’s your timeline? <span className="text-black/40 text-[10px] normal-case">(Optional)</span>
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                >
                  <option value="" disabled>
                    Select a timeline
                  </option>
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Preferences & Factors */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-[#141416] tracking-tight mb-1">
                Final Details
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#141416]/60">
                Help us tailor the perfect proposal for your team.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                  What’s the most important factor for you?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {KEY_FACTORS.map((factor) => {
                    const isChecked = formData.factors.includes(factor);
                    return (
                      <div
                        key={factor}
                        onClick={() => toggleFactor(factor)}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-sans cursor-pointer transition-all flex items-center gap-3 ${
                          isChecked
                            ? "bg-[#141416] text-white border-[#141416]"
                            : "bg-[#EAE3DB]/30 border-[#141416]/15 text-[#141416]/80 hover:bg-[#EAE3DB]/60"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-[#7567EE] border-[#7567EE] text-white"
                              : "border-[#141416]/30 bg-white"
                          }`}
                        >
                          {isChecked && <Check size={12} />}
                        </div>
                        <span>{factor}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                    className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {REFERRAL_OPTIONS.map((ref) => (
                      <option key={ref} value={ref}>
                        {ref}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#141416]/70 font-semibold mb-2">
                    Have you worked with a video team?
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-[#EAE3DB]/40 border border-[#141416]/15 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-[#141416] outline-none focus:border-[#7567EE] focus:ring-2 focus:ring-[#7567EE]/20 transition-all font-sans"
                  >
                    <option value="" disabled>
                      Choose an option
                    </option>
                    <option value="Yes, but looking for better quality">
                      Yes, but looking for better quality
                    </option>
                    <option value="No, and I need guidance">No, and I need guidance</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-black/10">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-black/5 text-[#141416] border border-[#141416]/15 text-xs sm:text-sm font-sans font-semibold transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#141416] hover:bg-[#7567EE] text-white text-xs sm:text-sm font-sans font-semibold transition-colors shadow-md"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-[#141416] hover:bg-[#7567EE] text-white text-xs sm:text-sm font-sans font-semibold transition-colors shadow-lg disabled:opacity-50"
            >
              <span>{isSubmitting ? "Submitting..." : "Send Inquiry"}</span>
              <Send size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
