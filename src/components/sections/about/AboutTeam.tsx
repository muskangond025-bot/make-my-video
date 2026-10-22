"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "rohan-joshi",
    name: "Rohan Joshi",
    role: "CEO & Founder",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220328_IMG-20241213-WA0005%20(1).jpg",
  },
  {
    id: "savitha",
    name: "Savitha",
    role: "COO",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220354_SAVITA%20-%20COO.png",
  },
  {
    id: "govind",
    name: "Govind",
    role: "Creative Director",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1736243390_GOVIND%20-%20Creative%20Director.png",
  },
  {
    id: "ritika",
    name: "Ritika",
    role: "Content Head & Script Writer",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220395_RITIKA%20-%20Content%20Head%20&%20Script%20Writer.png",
  },
  {
    id: "devendra",
    name: "Devendra",
    role: "Post Production Head",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220444_DEVENDRA%20-%20Post%20Production%20Head.png",
  },
  {
    id: "sashank",
    name: "Sashank",
    role: "Social Media Head",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220424_SASHANK%20-%20Social%20Media%20Head.png",
  },
  {
    id: "mayuri",
    name: "Mayuri",
    role: "Senior Editor",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220466_MAYURI%20-%20Senior%20Editor.png",
  },
  {
    id: "vaibhav",
    name: "Vaibhav",
    role: "Cinematographer",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220485_VAIBHAV%20-%20Cinmatographer.png",
  },
  {
    id: "ravinder",
    name: "Ravinder",
    role: "Drone Pilot",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220507_RAVINDER%20-%20Drone%20Pilot.png",
  },
  {
    id: "ronny",
    name: "Ronny",
    role: "Cinematographer",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220525_RONNY%20-%20Cinematographer%20&%20Photographer.png",
  },
  {
    id: "addy",
    name: "Addy",
    role: "Photographer",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220548_ADDY%20-%20Photographer.png",
  },
  {
    id: "rishi",
    name: "Rishi",
    role: "Live Stream Videography",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220567_Screenshot_2024-12-13-13-26-24-816_com.android.chrome~2%20(1).jpg",
  },
  {
    id: "imran",
    name: "Imran",
    role: "Cinematographer",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1735220583_Screenshot_2024-12-13-13-19-58-204_com.android.chrome~2%20(1).jpg",
  },
  {
    id: "kandhu",
    name: "Kandhu",
    role: "Positive Vibes Officer",
    image:
      "https://storage.googleapis.com/mkv_imagesbackend/team_profiles/1734153179_KHANDU%20-%20PVO%20positive%20vibes%20officer%20(2).png",
  },
];

export const AboutTeam: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Exact 3-Second Automatic Cycle Synchronizing Left Member & Right Name Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const activeMember = TEAM_MEMBERS[activeIndex];

  // Mathematical vertical centering:
  // Container height = 360px. Exactly 3 rows of 120px height are visible.
  // Center of container is at 180px.
  // Row height = 120px. Center of row = 60px.
  // translateY = (1 - activeIndex) * 120px.
  // When activeIndex = 0: translateY = 120px (Row 0 starts at 120px, ends at 240px, center at 180px).
  // When activeIndex = i: Row i starts at 120px, ends at 240px, center at 180px.
  const ROW_HEIGHT = 120;
  const CONTAINER_HEIGHT = 360;
  const translateY = (1 - activeIndex) * ROW_HEIGHT;

  return (
    <section className="relative w-full py-20 md:py-28 px-6 lg:px-16 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER: Single Line & Left-Aligned in Light Colors                */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mb-12 sm:mb-16 text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black tracking-tight uppercase leading-none mb-3 text-[#141416] text-left">
            OUR <span className="text-[#7567EE]">MEMBERS.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A4658] font-normal leading-relaxed text-left">
            The visionary directors, cinematographers, drone pilots, and editors who bring our productions to life.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DUMEARTS DUAL-PANEL LAYOUT (LIGHT PALETTE, FREE SPACE TICKER)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT PANEL: Member Photo (Top) & Post/Role Below                        */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[32px] bg-white border border-[#141416]/10 p-6 sm:p-8 shadow-xl">
            {/* Top Member Portrait Viewport: Pre-rendered stack for zero latency / instant sync */}
            <div className="relative w-full aspect-[4/4.8] rounded-[24px] overflow-hidden bg-[#141416]/5 border border-[#141416]/10 shadow-inner">
              {TEAM_MEMBERS.map((member, idx) => (
                <div
                  key={member.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === activeIndex
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority={idx < 4}
                  />
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Bottom: Post / Designation in Chaney Wide (No Bio) */}
            <div className="mt-6 pt-5 border-t border-[#141416]/10 flex flex-col justify-center text-left min-h-[88px]">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#7567EE] font-semibold">
                POST • DESIGNATION
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-[#141416] tracking-tight leading-tight mt-1 transition-all duration-500">
                {activeMember.role}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT SIDE: High-Contrast Dark Text Ticker in Free Open Space           */}
          {/* (PERFECT 1:1 SYNCHRONIZATION WITH THE LEFT SIDE MEMBER)                  */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 relative flex flex-col justify-center items-center">
            {/* Ticker Container with Shared Coordinate Space for Reticle & Column */}
            <div
              className="relative w-full overflow-hidden flex flex-col justify-start items-center"
              style={{ height: `${CONTAINER_HEIGHT}px` }}
            >
              {/* Top & Bottom Gradient Fades */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#EAE3DB] via-[#EAE3DB]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EAE3DB] via-[#EAE3DB]/80 to-transparent z-10 pointer-events-none" />

              {/* Viewfinder Reticle Centered Perfectly in the Container */}
              <div
                className="absolute inset-x-2 sm:inset-x-6 top-1/2 -translate-y-1/2 pointer-events-none z-20"
                style={{ height: `${ROW_HEIGHT}px` }}
              >
                {/* Corner Viewfinder Brackets in Lavender */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#7567EE]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-[#7567EE]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-[#7567EE]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#7567EE]" />

                {/* Subtle Horizontal Guide Lines */}
                <div className="absolute inset-x-6 top-0 h-[1px] bg-[#7567EE]/25" />
                <div className="absolute inset-x-6 bottom-0 h-[1px] bg-[#7567EE]/25" />
              </div>

              {/* Rolling Column of Names in Pure Dark Color (#141416) */}
              <div
                className="w-full flex flex-col items-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translate3d(0, ${translateY}px, 0)`,
                  willChange: "transform",
                }}
              >
                {TEAM_MEMBERS.map((member, idx) => {
                  const isActive = activeIndex === idx;
                  const distance = Math.abs(activeIndex - idx);

                  return (
                    <div
                      key={member.id}
                      onClick={() => setActiveIndex(idx)}
                      style={{ height: `${ROW_HEIGHT}px` }}
                      className={`h-[120px] flex-shrink-0 flex items-center justify-center transition-all duration-700 w-full px-4 text-center cursor-pointer ${
                        isActive
                          ? "opacity-100 scale-100"
                          : distance === 1
                          ? "opacity-45 scale-95"
                          : "opacity-15 scale-90"
                      }`}
                    >
                      <span
                        className={`font-humane uppercase tracking-wider text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.8] text-[#141416] transition-all duration-300 ${
                          isActive ? "font-black" : "font-normal"
                        }`}
                      >
                        {member.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
