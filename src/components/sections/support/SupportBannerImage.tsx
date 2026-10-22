"use client";

import React from "react";

export const SupportBannerImage: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-8 max-w-[1360px] mx-auto w-full py-8">
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-3xl overflow-hidden shadow-lg border border-[#141416]/10 bg-[#141416]">
        <img
          src="https://storage.googleapis.com/mkv_imagesbackend/lets_talk_img/Get%20in%20touch.jpg"
          alt="Make My Vid Creative Studio"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6 sm:p-10">
          <p className="text-white/90 font-serif italic text-lg sm:text-2xl tracking-wide">
            "Every frame crafted with intention, purpose, and impact."
          </p>
        </div>
      </div>
    </section>
  );
};
