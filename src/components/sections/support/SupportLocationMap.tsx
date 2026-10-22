"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ArrowUpRight,
  Search,
  Star,
  Clock,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import { STUDIO_LOCATIONS, StudioLocation } from "@/data/supportPageData";

export const SupportLocationMap: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<"office" | "studio">("office");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeLocation: StudioLocation =
    STUDIO_LOCATIONS.find((loc) => loc.id === selectedLocationId) || STUDIO_LOCATIONS[0];

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeLocation.addressLines.join(", "));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-8 max-w-[1360px] mx-auto w-full select-none">
      {/* Outer Shell: Google Maps Replica Frame */}
      <div className="relative rounded-[32px] sm:rounded-[40px] bg-white border-2 border-[#141416]/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        
        {/* ========================================================================= */}
        {/* TOP GOOGLE MAPS REPLICA BAR (Search & Location Switcher)                   */}
        {/* ========================================================================= */}
        <div className="px-6 py-4 bg-white border-b-2 border-[#141416]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Google Maps Search Box (Without pulse dot) */}
          <div className="flex items-center gap-3 bg-[#F8F6F2] px-5 py-3 rounded-2xl border border-[#141416]/15 max-w-md w-full">
            <Search size={18} className="text-[#141416] shrink-0" />
            <span className="text-sm font-sans font-bold text-[#141416] truncate">
              {activeLocation.name} • Mumbai
            </span>
          </div>

          {/* Location Toggle Buttons with 100% Bold Visible Text */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            {STUDIO_LOCATIONS.map((loc) => {
              const isSelected = selectedLocationId === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-black transition-all cursor-pointer ${
                    isSelected
                      ? "shadow-md ring-2 ring-[#141416]/20"
                      : "hover:border-[#141416]"
                  }`}
                  style={{
                    color: isSelected ? "#FFFFFF" : "#141416",
                    backgroundColor: isSelected ? "#141416" : "#F3EBDD",
                  }}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PLACE DETAILS & ACTION BAR (Never Clipped, Always 100% Visible)           */}
        {/* ========================================================================= */}
        <div className="px-6 py-5 bg-[#F8F6F2] border-b-2 border-[#141416]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#141416]/15 text-[#7567EE] flex items-center justify-center shrink-0 shadow-xs">
              <MapPin size={24} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-heading font-black text-[#141416]">
                  {activeLocation.name}
                </h3>
                <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-[#141416]/10 text-xs font-bold text-[#141416]">
                  <span>5.0</span>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[#141416]/60 font-normal">(48)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans font-medium text-[#141416] mt-1">
                {activeLocation.addressLines.join(", ")}
              </p>

              <div className="flex items-center gap-4 mt-2 text-xs font-sans font-bold text-[#141416]">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Clock size={13} />
                  <span>Open • Closes 8:00 PM IST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-[#7567EE]" />
                  <a href="tel:+917977484292" className="hover:text-[#7567EE]">
                    +91 79774 84292
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Bold, High-Contrast "Open in Google Maps" Button */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <a
              href={activeLocation.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#141416] hover:bg-[#7567EE] text-white text-xs sm:text-sm font-sans font-black uppercase tracking-wider transition-all shadow-md cursor-pointer group"
              style={{ color: "#FFFFFF", backgroundColor: "#141416" }}
            >
              <Navigation size={15} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-white font-black tracking-wide">Open in Google Maps</span>
              <ArrowUpRight size={16} className="text-white" />
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#EAE3DB] text-[#141416] text-xs sm:text-sm font-sans font-bold border-2 border-[#141416]/15 transition-colors cursor-pointer"
              title="Copy address"
            >
              {isCopied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              <span>{isCopied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CLEAN EMBEDDED GOOGLE MAP (Native Google Controls, Zero Overlaps)         */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[480px] sm:h-[560px] bg-[#E5E3DF]">
          <iframe
            key={activeLocation.id}
            src={`https://maps.google.com/maps?q=${activeLocation.lat},${activeLocation.lng}&z=17&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${activeLocation.name} Google Map Replica`}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
