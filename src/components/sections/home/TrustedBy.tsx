"use client";
import React from 'react';

const logos = [
  {
    "name": "Zee Media",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed8ad93b67_logo57.jpg"
  },
  {
    "name": "Dynamic Decor",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e86dc82ef5_logo13.jpg"
  },
  {
    "name": "NISAU",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed813bd21e_logo50.jpg"
  },
  {
    "name": "Aditya BIrla",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e78c0bc623_logo2.jpg"
  },
  {
    "name": "cipla",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8656edbeb_logo9.jpg"
  },
  {
    "name": "Altius",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e79cbf2b66_logo3.jpg"
  },
  {
    "name": "Achievers",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed7ee4ef7e_logo48.jpg"
  },
  {
    "name": "boroplast",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8610ef640_logo6.jpg"
  },
  {
    "name": "ficosa",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e899458314_logo19.jpg"
  },
  {
    "name": "crompton",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e868785e02_logo10.jpg"
  },
  {
    "name": "Motilal Oswal",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8bce56518_logo34.jpg"
  },
  {
    "name": "pipal tree",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8c40d1cbb_logo36.jpg"
  },
  {
    "name": "deccan",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e869df2448_logo11.jpg"
  },
  {
    "name": "baybot",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e7b3e41b51_logo4.jpg"
  },
  {
    "name": "Dipttii Khanna",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e86bb82a24_logo12.jpg"
  },
  {
    "name": "Ochre Tree",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e881b1ab71_logo14.jpg"
  },
  {
    "name": "essajees",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8835f2f1b_logo15.jpg"
  },
  {
    "name": "cams",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e863bb2581_logo8.jpg"
  },
  {
    "name": "Evolve",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e893aa254c_logo16.jpg"
  },
  {
    "name": "Extramile",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e895753590_logo17.jpg"
  },
  {
    "name": "Mars Petcare",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8b4b9cb5b_logo30.jpg"
  },
  {
    "name": "fit falcon",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e89a63b9fc_logo20.jpg"
  },
  {
    "name": "Gain creadit",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e89d029dcc_logo21.jpg"
  },
  {
    "name": "Ghoom360",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e89e7cdf83_logo22.jpg"
  },
  {
    "name": "Gyanada Foundation",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8a3235df2_logo23.jpg"
  },
  {
    "name": "jll",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8a6d2f7ad_logo25.jpg"
  },
  {
    "name": "Liberty Insurance",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8a8b85000_logo26.jpg"
  },
  {
    "name": "lotus aircon",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8aa528ccd_logo27.jpg"
  },
  {
    "name": "Unity Software SDN",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8acb9acb3_logo28.jpg"
  },
  {
    "name": "mangalam Organics limited",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8afca1dfc_logo29.jpg"
  },
  {
    "name": "a to z services",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e777b7c69d_logo1.jpg"
  },
  {
    "name": "Midas next logo",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8b65b05af_logo31.jpg"
  },
  {
    "name": "Modisto",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8b81755dc_logo32.jpg"
  },
  {
    "name": "Moneypower Consultants",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8b9631c6a_logo33.jpg"
  },
  {
    "name": "Pentacle finance",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8be5799bf_logo35.jpg"
  },
  {
    "name": "Rotary",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed54c0b6b9_logo37.jpg"
  },
  {
    "name": "Romila Palliative Care",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed5c0910ea_logo38.jpg"
  },
  {
    "name": "Safeway",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed5d2403d9_logo39.jpg"
  },
  {
    "name": "Welspun India",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed86853fe8_logo54.jpg"
  },
  {
    "name": "ThatFIGtree",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed71fbf468_logo41.jpg"
  },
  {
    "name": "Sneha",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed732cc618_logo42.jpg"
  },
  {
    "name": "Snowball",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed744e5098_logo43.jpg"
  },
  {
    "name": "Sorgen",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed77fa9d9b_logo45.jpg"
  },
  {
    "name": "Stones 3D",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed7d9bf577_logo47.jpg"
  },
  {
    "name": "Global Invest Ventures",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed8072cabf_logo49.jpg"
  },
  {
    "name": "Late Night Signs",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed83151b6d_logo51.jpg"
  },
  {
    "name": "LYSNA",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed84322ba9_logo52.jpg"
  },
  {
    "name": "Sign Bee",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed8566fc19_logo53.jpg"
  },
  {
    "name": "Wol 3D",
    "logoUrl": "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed87fd05ca_logo55.jpg"
  }
];

export const TrustedBy = () => {
  const row1 = logos.slice(0, 25);
  const row2 = logos.slice(25);

  return (
    <section id="trusted" className="w-full py-24 bg-background border-t border-b border-white/5 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
          PARTNERSHIPS & CLIENTELE
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
          TRUSTED BY
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans">
          Proud to produce high-impact films, corporate AVs, and digital campaigns for over 49+ visionary brands and global enterprises.
        </p>
      </div>

      {/* Row 1 Marquee (Scrolls Left) */}
      <div className="relative w-full overflow-hidden flex items-center mb-6">
        <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full">
          {[...row1, ...row1].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-40 h-20 sm:w-48 sm:h-24 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white border border-white/10 hover:border-white transition-all duration-300 group shrink-0 shadow-md backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.logoUrl}
                alt={logo.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee (Scrolls Right) */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap min-w-full">
          {[...row2, ...row2].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-40 h-20 sm:w-48 sm:h-24 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white border border-white/10 hover:border-white transition-all duration-300 group shrink-0 shadow-md backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.logoUrl}
                alt={logo.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
