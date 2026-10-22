"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ArrowUpRight } from "lucide-react";
import { STUDIO_LOCATIONS, StudioLocation } from "@/data/supportPageData";

export const SupportLocationMap: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<"office" | "studio">("office");

  const activeLocation: StudioLocation =
    STUDIO_LOCATIONS.find((loc) => loc.id === selectedLocationId) || STUDIO_LOCATIONS[0];

  return (
    <section className="relative py-12 px-4 sm:px-8 max-w-[1360px] mx-auto w-full">
      <div className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7567EE] block mb-1">
              Find Us In Mumbai
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#141416]">
              Interactive Studio Maps
            </h3>
          </div>

          <div className="flex items-center gap-2 p-1 bg-[#EAE3DB] rounded-full border border-[#141416]/10 self-start sm:self-auto">
            {STUDIO_LOCATIONS.map((loc) => {
              const isSelected = selectedLocationId === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all ${
                    isSelected
                      ? "bg-[#141416] text-white shadow-sm"
                      : "text-[#141416]/70 hover:text-[#141416]"
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Address Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#EAE3DB]/40 border border-[#141416]/10">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="text-base font-heading font-bold text-[#141416]">
                {activeLocation.name}
              </h4>
              <p className="text-sm font-sans text-[#141416]/80 mt-0.5">
                {activeLocation.addressLines.join(", ")}
              </p>
            </div>
          </div>

          <a
            href={activeLocation.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#141416] hover:bg-[#7567EE] text-white text-xs font-sans font-semibold transition-colors self-start md:self-auto"
          >
            <Navigation size={14} />
            <span>Open in Google Maps</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Embedded Map Container */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#141416]/10 shadow-inner bg-black/5">
          <iframe
            key={activeLocation.id}
            src={`https://maps.google.com/maps?q=${activeLocation.lat},${activeLocation.lng}&z=17&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${activeLocation.name} Map`}
            className="w-full h-full grayscale-[25%] contrast-[105%]"
          />
        </div>
      </div>
    </section>
  );
};
