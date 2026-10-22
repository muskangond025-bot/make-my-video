"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, CheckCircle2 } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/projectsPageData";
import { gsap } from "@/lib/gsap";

export const ProjectsTestimonials: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dipttii = CLIENT_TESTIMONIALS[0];
  const rachit = CLIENT_TESTIMONIALS[1];

  // Scroll Reveal Animation on Cards
  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 55, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-[1360px] mx-auto w-full border-t border-[#141416]/10">
      {/* Editorial Header */}
      <div className="mb-12 border-b border-[#141416]/10 pb-6">
        <span className="block font-serif italic text-xl sm:text-2xl text-[#141416]/70 mb-1">
          HEAR IT FROM
        </span>
        <h2
          className="uppercase text-[#141416] tracking-tight leading-none"
          style={{
            fontFamily: "'Humane', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(64px, 8vw, 110px)",
            lineHeight: 0.85,
          }}
        >
          OUR CLIENTS & PARTNERS
        </h2>
      </div>

      {/* Stacked Full-Width Testimonials with Smooth Scroll Reveal */}
      <div ref={containerRef} className="space-y-10">
        
        {/* Testimonial 1: Dipttii Khanna (Full-Width Premium Light Card) */}
        {dipttii && (
          <div className="bg-white border border-[#141416]/10 rounded-[32px] sm:rounded-[40px] p-7 sm:p-11 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-8 md:gap-14">
            {/* Avatar Column */}
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden shrink-0 border-4 border-[#F8F6F2] shadow-md relative">
              {dipttii.image ? (
                <img
                  src={dipttii.image}
                  alt={dipttii.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-[#141416] flex items-center justify-center text-white font-heading font-black text-2xl">
                  {dipttii.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="flex-1 space-y-5 text-center md:text-left">
              <p className="text-lg sm:text-2xl font-sans text-[#141416] font-medium leading-relaxed">
                &ldquo;{dipttii.quote}&rdquo;
              </p>

              <div className="pt-2 border-t border-[#141416]/10 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h4 className="text-lg sm:text-xl font-heading font-black text-[#141416] tracking-tight uppercase">
                      {dipttii.name}
                    </h4>
                    <CheckCircle2 size={16} className="text-[#7567EE]" />
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-[#141416]/65 font-medium">
                    {dipttii.role} • <span className="font-semibold text-[#141416]">{dipttii.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial 2: Rachit Mundra (Full-Width Premium Light Card with Video) */}
        {rachit && (
          <div className="bg-white border border-[#141416]/10 rounded-[32px] sm:rounded-[40px] p-7 sm:p-11 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
            {/* Video Column */}
            <div className="w-full lg:w-7/12 relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-lg border border-[#141416]/10 group">
              {rachit.videoUrl && (
                <video
                  ref={videoRef}
                  src={rachit.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}

              {/* Media Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#7567EE] backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#7567EE] backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
            </div>

            {/* Quote Column */}
            <div className="w-full lg:w-5/12 space-y-5 text-center lg:text-left">
              <p className="text-base sm:text-xl font-sans text-[#141416] font-medium leading-relaxed">
                &ldquo;{rachit.quote}&rdquo;
              </p>

              <div className="pt-2 border-t border-[#141416]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg sm:text-xl font-heading font-black text-[#141416] tracking-tight uppercase">
                    {rachit.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-[#141416]/65 font-medium">
                    {rachit.role} • <span className="font-semibold text-[#141416]">{rachit.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
