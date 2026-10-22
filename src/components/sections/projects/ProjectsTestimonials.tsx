"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Quote, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/data/projectsPageData";

export const ProjectsTestimonials: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dipttii = CLIENT_TESTIMONIALS[0];
  const rachit = CLIENT_TESTIMONIALS[1];

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
      {/* Title */}
      <div className="text-center mb-16">
        <span className="block font-serif italic text-2xl sm:text-3xl text-[#141416]/75 mb-2">
          HEAR IT FROM
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight uppercase text-[#141416]">
          OUR CLIENTS AND PEOPLE
        </h2>
      </div>

      <div className="space-y-12">
        {/* Dipttii Khanna Testimonial */}
        {dipttii && (
          <div className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md relative">
              {dipttii.image ? (
                <img
                  src={dipttii.image}
                  alt={dipttii.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-[#141416] flex items-center justify-center text-white font-heading font-bold text-2xl">
                  {dipttii.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <Quote className="text-[#7567EE] w-8 h-8 mx-auto md:mx-0 opacity-80" />
              <p className="text-base sm:text-lg md:text-xl font-sans text-[#141416]/90 leading-relaxed italic">
                "{dipttii.quote}"
              </p>
              <div>
                <h4 className="text-lg sm:text-xl font-heading font-bold text-[#141416]">
                  {dipttii.name}
                </h4>
                <p className="text-sm font-sans text-[#141416]/60">
                  {dipttii.role} • {dipttii.company}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Rachit Mundra Video Testimonial */}
        {rachit && (
          <div className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Video Column */}
            <div className="w-full lg:w-7/12 relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-black/10 group">
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
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>

            {/* Quote Column */}
            <div className="w-full lg:w-5/12 space-y-4 text-center lg:text-left">
              <Quote className="text-[#7567EE] w-8 h-8 mx-auto lg:mx-0 opacity-80" />
              <p className="text-base sm:text-lg font-sans text-[#141416]/90 leading-relaxed italic">
                "{rachit.quote}"
              </p>
              <div>
                <h4 className="text-lg sm:text-xl font-heading font-bold text-[#141416]">
                  {rachit.name}
                </h4>
                <p className="text-sm font-sans text-[#141416]/60">
                  {rachit.role} • {rachit.company}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
