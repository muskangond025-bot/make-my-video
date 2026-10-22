"use client";

import React from "react";

interface AboutMarqueeProps {
  variant?: "primary" | "secondary";
  text?: string;
}

export const AboutMarquee: React.FC<AboutMarqueeProps> = ({
  variant = "primary",
  text = 'CAUTION "AWESOME VIDEOS AHEAD"',
}) => {
  const isPrimary = variant === "primary";

  return (
    <section
      className={`w-full overflow-hidden py-6 select-none border-y ${
        isPrimary
          ? "bg-[#141416] text-[#EAE3DB] border-[#141416]"
          : "bg-[#7567EE] text-white border-[#7567EE]"
      }`}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marqueeGlideNormal {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marqueeGlideInverted {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-marquee-glide {
            display: flex;
            width: max-content;
            animation: marqueeGlideNormal 25s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          }
          .animate-marquee-glide-rev {
            display: flex;
            width: max-content;
            animation: marqueeGlideInverted 28s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          }
          .animate-marquee-glide:hover,
          .animate-marquee-glide-rev:hover {
            animation-duration: 45s;
          }
        `
      }} />

      <div className="flex w-full overflow-hidden">
        <div className={isPrimary ? "animate-marquee-glide" : "animate-marquee-glide-rev"}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-8 px-6">
              <span className="text-2xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight whitespace-nowrap">
                {text}
              </span>

              <span className={`w-3 h-3 rounded-full ${isPrimary ? "bg-[#7567EE]" : "bg-[#D5FF3F]"}`} />

              <span className="text-xl sm:text-2xl font-serif italic font-normal tracking-wide opacity-80 whitespace-nowrap">
                Make My Vid Creative Studio
              </span>

              <span className="text-xl opacity-40">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
