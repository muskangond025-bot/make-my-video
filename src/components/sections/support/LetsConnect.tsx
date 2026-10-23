"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LetsConnect = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Multi City Video Production",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-28 bg-[#050508] text-white relative overflow-hidden select-none border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Giant Kinetic Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6 w-fit">
              START A CONVERSATION
            </div>

            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.9]">
              LET&apos;S <br />
              <span className="text-red-500 font-sans font-extrabold">CONNECT.</span>
            </h2>

            <p className="mt-8 text-base sm:text-lg text-zinc-400 font-sans leading-relaxed max-w-lg">
              Have an upcoming event, product launch, brand campaign, or social documentary? 
              Partner with Make My Vid for seamless execution across India or remote post-production globally.
            </p>

            {/* Quick Contact Badges */}
            <div className="mt-10 space-y-4 font-mono text-sm">
              <div className="flex items-center gap-3 text-zinc-300">
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  📍
                </span>
                <span>Mumbai, India • Multi-City Execution Worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  ✉️
                </span>
                <span>contact@makemyvid.com / info@rohanjoshi.in</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation / Quote Form */}
          <div className="lg:col-span-6">
            <div className="rounded-[2.5rem] bg-white/[0.03] border border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 text-red-400 mx-auto flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Thank You!</h3>
                  <p className="text-sm text-zinc-400 font-sans max-w-sm mx-auto">
                    Your request has been received. Rohan and the Make My Vid team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Your Name / Company
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe, Aditya Birla Group"
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 text-sm font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 text-sm font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#0f0f13] border border-white/10 text-white focus:outline-none focus:border-red-500 text-sm font-sans transition-colors"
                    >
                      <option value="Multi City Video Production">Multi City Video Production</option>
                      <option value="Remote Editing Work">Remote Editing Work</option>
                      <option value="Corporate AV">Corporate AV</option>
                      <option value="Trade Shows & Exhibition Videos">Trade Shows & Exhibition Videos</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Live Telecast of Events">Live Telecast of Events</option>
                      <option value="Conference & Panel Discussion">Conference & Panel Discussion</option>
                      <option value="Social Initiatives & Documentation">Social Initiatives & Documentation</option>
                      <option value="Brand Campaign">Brand Campaign</option>
                      <option value="Scripting & Voiceover Services">Scripting & Voiceover Services</option>
                      <option value="Creative Direction">Creative Direction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                      Project Details / Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your dates, cities, timeline, or deliverable..."
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 text-sm font-sans transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_45px_rgba(220,38,38,0.6)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Submit Quote Request →
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
