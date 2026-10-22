"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Quote, CheckCircle } from "lucide-react";

export const JoinSpotlights: React.FC = () => {
  const [editorMuted, setEditorMuted] = useState(true);
  const [videographerMuted, setVideographerMuted] = useState(true);

  return (
    <section className="relative w-full py-28 md:py-36 px-6 lg:px-16 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7567EE]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4A4658]">
              Community Stories
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic text-[#141416] leading-none mb-2">
            BUILD TRUST
          </h2>
          <div className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-[#7567EE]">
            BUILD CONNECTIONS
          </div>
          <p className="mt-4 text-sm md:text-base text-[#4A4658] font-normal">
            Real stories from creators thriving in the Make My Vid global network.
          </p>
        </div>

        {/* Spotlight 1: Video Editor (Video Left, Quote Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-5 relative group rounded-3xl overflow-hidden border border-[#141416]/10 bg-black aspect-[9/14] sm:aspect-[9/12] shadow-xl">
            <video
              src="https://storage.googleapis.com/mkv_imagesbackend/partnerships/67ac2ff62d47d_Community%20Video%20Editor.mp4"
              autoPlay
              loop
              muted={editorMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-5 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-center pointer-events-auto">
                <span className="bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#141416]">
                  Editor
                </span>
                <button
                  onClick={() => setEditorMuted(!editorMuted)}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-[#7567EE] transition-colors cursor-pointer"
                  title={editorMuted ? "Unmute" : "Mute"}
                >
                  {editorMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-white">
                <div className="text-sm font-semibold">Mayuri K</div>
                <div className="text-xs text-zinc-300 font-mono">Remote Video Editor &bull; Kolhapur</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-white border border-[#141416]/10 rounded-3xl p-8 sm:p-12 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] mb-6">
                <Quote className="w-6 h-6" />
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-[#141416] leading-relaxed mb-8 italic">
                &ldquo;Working with Make My Vid has been a game-changer for me as a freelance video editor. I get consistent projects from national and international brands, allowing me to focus on creativity without worrying about finding work. The process is seamless, deadlines are clear, and payments are always on time. If you’re an editor looking for steady, high-quality work—this is the place to be!&rdquo;
              </blockquote>

              <div className="pt-6 border-t border-[#141416]/10 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold uppercase tracking-tight text-[#141416]">
                    Mayuri K
                  </div>
                  <div className="text-xs font-mono text-[#4A4658]">
                    Remote Video Editor &bull; Kolhapur, India
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7567EE] font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Verified Partner
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight 2: Mobile Videographer (Quote Left, Video Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
            <div className="bg-white border border-[#141416]/10 rounded-3xl p-8 sm:p-12 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] mb-6">
                <Quote className="w-6 h-6" />
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-[#141416] leading-relaxed mb-8 italic">
                &ldquo;I never thought shooting high-quality videos with my phone could turn into a serious career—until I joined Make My Vid Community. Now, I get paid projects from brands that need quick, engaging content, all shot on my smartphone. Whether it’s event coverage, social media videos, or creative reels, I get to work remotely and on my own schedule. If you’re a mobile videographer, this is the perfect platform to turn your skills into real opportunities!&rdquo;
              </blockquote>

              <div className="pt-6 border-t border-[#141416]/10 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold uppercase tracking-tight text-[#141416]">
                    Aryan Pandey
                  </div>
                  <div className="text-xs font-mono text-[#4A4658]">
                    Mobile Videographer &bull; Mysore, India
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#7567EE] font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Verified Partner
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative group rounded-3xl overflow-hidden border border-[#141416]/10 bg-black aspect-[9/14] sm:aspect-[9/12] shadow-xl">
            <video
              src="https://storage.googleapis.com/mkv_imagesbackend/partnerships/67ac30181be6e__Community%20Phone%20Videographer.mp4"
              autoPlay
              loop
              muted={videographerMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-5 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-center pointer-events-auto">
                <span className="bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#141416]">
                  Videographer
                </span>
                <button
                  onClick={() => setVideographerMuted(!videographerMuted)}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-[#7567EE] transition-colors cursor-pointer"
                  title={videographerMuted ? "Unmute" : "Mute"}
                >
                  {videographerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-white">
                <div className="text-sm font-semibold">Aryan Pandey</div>
                <div className="text-xs text-zinc-300 font-mono">Mobile Videographer &bull; Mysore</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
