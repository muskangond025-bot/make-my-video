"use client";

import React from "react";
import { Mail, Phone, MapPin, Globe, ArrowUpRight } from "lucide-react";
import { CONTACT_DETAILS, STUDIO_LOCATIONS } from "@/data/supportPageData";

export const SupportContactCards: React.FC = () => {
  return (
    <section className="relative py-14 px-4 sm:px-8 max-w-[1360px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Communications Box */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] border border-[#141416]/10">
              <Mail size={22} />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#141416]/50 block mb-1">
                  Email
                </span>
                <a
                  href="mailto:info@makemyvid.io?subject=Hello%20Make%20My%20Vid"
                  className="text-lg font-heading font-bold text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-1.5"
                >
                  info@makemyvid.io
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="pt-2 border-t border-black/5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#141416]/50 block mb-1">
                  India Direct Line
                </span>
                <a
                  href="tel:+917977484292"
                  className="text-base font-heading font-bold text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-1.5"
                >
                  +91 79774 84292
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="pt-2 border-t border-black/5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#141416]/50 block mb-1">
                  UK Enquiries
                </span>
                <a
                  href="tel:+447542550969"
                  className="text-base font-heading font-bold text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-1.5"
                >
                  +44 75425 50969
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Address Card */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] border border-[#141416]/10">
              <MapPin size={22} />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7567EE] font-medium block mb-1">
                Headquarters
              </span>
              <h3 className="text-xl font-heading font-black text-[#141416] mb-3">
                Office Address
              </h3>
              <p className="text-sm font-sans text-[#141416]/80 leading-relaxed space-y-1">
                11, Star Trade Centre, Chamunda Circle,<br />
                Sodawala Lane, Borivali West,<br />
                Mumbai, Maharashtra 400092.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-black/5 mt-6">
            <a
              href="https://maps.google.com/?q=19.233379,72.855010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans font-bold uppercase tracking-wider text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-1"
            >
              Get Directions <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Editing Studio Address Card */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#EAE3DB] flex items-center justify-center text-[#7567EE] border border-[#141416]/10">
              <Globe size={22} />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7567EE] font-medium block mb-1">
                Production Lab
              </span>
              <h3 className="text-xl font-heading font-black text-[#141416] mb-3">
                Editing Studio Address
              </h3>
              <p className="text-sm font-sans text-[#141416]/80 leading-relaxed space-y-1">
                Gala 6, Navratna Apartment,<br />
                Asara Colony Road, Dattapada,<br />
                Borivali East, Mumbai, Maharashtra 400066.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-black/5 mt-6">
            <a
              href="https://maps.google.com/?q=19.223883,72.858639"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans font-bold uppercase tracking-wider text-[#141416] hover:text-[#7567EE] transition-colors inline-flex items-center gap-1"
            >
              Get Directions <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
