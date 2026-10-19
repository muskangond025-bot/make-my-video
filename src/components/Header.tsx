"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

interface NavItem {
  num: string;
  name: string;
  href: string;
  isExternal?: boolean;
}

const MENU_ITEMS: NavItem[] = [
  { num: "01", name: "Home", href: "/" },
  { num: "02", name: "About", href: "/#about" },
  { num: "03", name: "Projects", href: "/#projects" },
  { num: "04", name: "Services", href: "/#expertise" },
  { num: "05", name: "Join Us", href: "/#contact" },
  { num: "06", name: "Blog", href: "/#archive" },
  { num: "07", name: "Contact", href: "/#contact" },
];

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const isScrolledRef = useRef(false);
  const isHiddenRef = useRef(false);
  const lastScrollY = useRef(0);
  const menuWrapRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const extrasRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Smart auto-hide with direction detection, rAF batching & buffer:
  // 1. At the top (scrollY <= 80px): always visible.
  // 2. Scrolling DOWN past 120px (delta > 10px): smoothly glides up out of view.
  // 3. Scrolling UP (delta < -10px): smoothly glides down into view.
  // 4. Ignores micro scroll jitters (< 10px) to completely prevent up/down glitching.
  // 5. Throttled via requestAnimationFrame and state transition guards to prevent frame drops.
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      ticking = false;
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY.current;

      const nextScrolled = currentScrollY > 20;
      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      let nextHidden = isHiddenRef.current;

      if (isOpen) {
        nextHidden = false;
      } else if (currentScrollY <= 80) {
        nextHidden = false;
      } else if (Math.abs(delta) >= 10) {
        if (delta > 0 && currentScrollY > 120) {
          nextHidden = true;
        } else if (delta < 0) {
          nextHidden = false;
        }
      }

      if (nextHidden !== isHiddenRef.current) {
        isHiddenRef.current = nextHidden;
        setIsHidden(nextHidden);
      }

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Lenis and Body Scroll Lock integration
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const safeStopLenis = () => {
      try {
        if (lenis && typeof lenis.stop === "function") {
          lenis.stop();
        } else if (typeof (window as unknown as { lenis?: { stop?: () => void } }).lenis?.stop === "function") {
          (window as unknown as { lenis: { stop: () => void } }).lenis.stop();
        }
      } catch {
        // Safe fallback
      }
    };

    const safeStartLenis = () => {
      try {
        if (lenis && typeof lenis.start === "function") {
          lenis.start();
        } else if (typeof (window as unknown as { lenis?: { start?: () => void } }).lenis?.start === "function") {
          (window as unknown as { lenis: { start: () => void } }).lenis.start();
        }
      } catch {
        // Safe fallback
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      safeStopLenis();
    } else {
      document.body.style.overflow = "";
      safeStartLenis();
    }

    // Keyboard ESC to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      safeStartLenis();
    };
  }, [isOpen, lenis]);

  // Cascading 3-Panel & Stagger Animation Timeline
  useEffect(() => {
    if (!panel1Ref.current || !panel2Ref.current || !panel3Ref.current || !menuWrapRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial positions
      gsap.set(menuWrapRef.current, { visibility: "hidden" });
      gsap.set([panel1Ref.current, panel2Ref.current, panel3Ref.current], { xPercent: 101 });
      gsap.set(linksRef.current.filter(Boolean), {
        autoAlpha: 0,
        yPercent: 110,
        rotation: 3,
        transformOrigin: "left bottom",
      });
      gsap.set(extrasRef.current, { autoAlpha: 0, y: 35 });
      gsap.set(bottomBarRef.current, { autoAlpha: 0, y: 25 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      tl
        // 1. Reveal wrapper
        .set(menuWrapRef.current, { visibility: "visible" })
        // 2. 3-Blade Cascading Backdrop Panels
        .fromTo(panel1Ref.current, { xPercent: 101 }, { xPercent: 0, duration: 0.52, ease: "power3.inOut" })
        .fromTo(panel2Ref.current, { xPercent: 101 }, { xPercent: 0, duration: 0.55, ease: "power3.inOut" }, "-=0.42")
        .fromTo(panel3Ref.current, { xPercent: 101 }, { xPercent: 0, duration: 0.58, ease: "power3.inOut" }, "-=0.42")
        // 3. Tilted Swing-Up Primary Links
        .to(
          linksRef.current.filter(Boolean),
          {
            autoAlpha: 1,
            yPercent: 0,
            rotation: 0,
            stagger: 0.05,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.25"
        )
        // 4. Secondary Columns and Bottom Bar
        .to(
          extrasRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.35"
        )
        .to(
          bottomBarRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.3"
        );

      tlRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  // Trigger animations on state change
  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.timeScale(1).play();
    } else {
      tlRef.current.timeScale(1.4).reverse();
    }
  }, [isOpen]);

  const handleLinkClick = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(href, "_blank", "noopener,noreferrer");
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    if (href.includes("#")) {
      const hash = href.substring(href.indexOf("#"));
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = href.startsWith("/") ? href : `/${href}`;
        return;
      }
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* TOP FIXED NAVBAR                                          */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          isHidden
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        } ${
          isScrolled && !isOpen
            ? "bg-[#EAE3DB]/90 backdrop-blur-xl border-b border-[#141416]/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : isOpen
            ? "bg-transparent border-b border-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-3.5 sm:py-4 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="relative z-50 flex items-center transition-all duration-300 hover:opacity-80 group cursor-pointer"
            aria-label="Make My Vid Home"
          >
            <img
              src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
              alt="Make My Vid Logo"
              className="h-7 sm:h-8 w-auto object-contain transition-all duration-300"
            />
          </a>

          {/* Right Header Navigation Controls */}
          <div className="relative z-50 flex items-center gap-2 sm:gap-3 md:gap-4">
            
            {/* CTA Button: "GOT A PROJECT?" */}
            <a
              href="#cta-connect"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#cta-connect");
              }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#D5FF3F] text-[#141416] hover:bg-[#c2ed2c] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(213,255,63,0.35)] cursor-pointer group"
            >
              <span>GOT A PROJECT?</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#141416] group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>

            {/* DUAL-STATE ROLLING TEXT MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center gap-2 bg-[#D5FF3F] text-[#141416] hover:bg-[#c2ed2c] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(213,255,63,0.35)] cursor-pointer group select-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              <div className="flex flex-col gap-1 w-3.5 justify-center">
                <span className={`block h-[2px] bg-[#141416] transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <span className={`block h-[2px] bg-[#141416] transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
              </div>
              <span className="font-extrabold text-xs sm:text-sm tracking-wider">
                {isOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* DRAWER MENU - SIGNATURE WARM CREAM LIGHT COLOR SYSTEM     */}
      {/* ========================================================= */}
      <div
        ref={menuWrapRef}
        className="fixed inset-0 z-40 overflow-hidden select-none"
        style={{ visibility: "hidden" }}
      >
        {/* 3 Cascading Layered Panels in Premium Light Palette */}
        {/* Panel 1: Deep Cream / Sand Blade */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 z-0 bg-[#D9D0C5]"
        />

        {/* Panel 2: Warm Sand Accent Blade */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 z-0 bg-[#E2D9CE]"
        />

        {/* Panel 3: Signature Warm Beige / Cream Base (#EAE3DB) */}
        <div
          ref={panel3Ref}
          className="absolute inset-0 z-0 bg-[#EAE3DB]"
        />

        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_60%_35%,rgba(117,103,238,0.06)_0%,transparent_70%)]" />

        {/* Menu Inner Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-6 text-[#141416] overflow-y-auto">
          
          {/* Middle Main Grid: Primary Links & Info Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-3 sm:py-5">
            
            {/* Primary Numbered Hero Links (7 Items: Home, About, Projects, Services, Join Us, Blog, Contact) */}
            <nav className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3 md:gap-3.5">
              {MENU_ITEMS.map((item, idx) => (
                <div key={item.name} className="overflow-hidden py-0.5">
                  <a
                    ref={(el) => {
                      linksRef.current[idx] = el;
                    }}
                    href={item.href}
                    onClick={(e) => {
                      if (!item.isExternal) {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      } else {
                        handleLinkClick(item.href, true);
                      }
                    }}
                    className="flex items-center group cursor-pointer text-decoration-none select-none w-fit"
                  >
                    {/* Eyebrow Number */}
                    <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#1D4ED8] mr-3 sm:mr-5 flex-shrink-0">
                      {item.num}
                    </span>

                    {/* Dual-Layered Rolling Text */}
                    <div className="relative h-[1.3em] overflow-hidden flex flex-col justify-start text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight">
                      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                        {/* Default Layer (Deep Solid Black) */}
                        <span className="h-[1.3em] flex items-center text-black uppercase leading-none whitespace-nowrap flex-shrink-0" style={{ color: "#000000" }}>
                          {item.name}
                        </span>
                        {/* Rolled In Accent Layer (Electric Blue) */}
                        <span className="h-[1.3em] flex items-center text-[#1D4ED8] uppercase leading-none whitespace-nowrap flex-shrink-0">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {item.isExternal && (
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2.5 text-black/60 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right Side: Studio & Social Columns (Cols 8 to 12) - Pure Solid Black */}
            <div
              ref={extrasRef}
              className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between gap-6 sm:gap-7 lg:gap-7 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-10 xl:pl-14 border-black/20 text-sm"
            >
              {/* Direct Inquiries Column */}
              <div className="flex flex-col gap-2">
                <p
                  className="font-mono text-xs font-black tracking-[0.2em] text-black uppercase"
                  style={{ color: "#000000" }}
                >
                  Direct Line
                </p>

                {/* Email */}
                <a
                  href="mailto:hello@makemyvid.com"
                  className="text-base sm:text-lg font-bold text-black hover:text-[#1D4ED8] w-fit cursor-pointer transition-colors duration-200"
                  style={{ color: "#000000" }}
                >
                  hello@makemyvid.com
                </a>

                {/* Phone */}
                <a
                  href="tel:+919876543210"
                  className="text-base sm:text-lg font-bold text-black hover:text-[#1D4ED8] w-fit cursor-pointer transition-colors duration-200"
                  style={{ color: "#000000" }}
                >
                  +91 (0) 98765 43210
                </a>
              </div>

              {/* Social Channels Column */}
              <div className="flex flex-col gap-2">
                <p
                  className="font-mono text-xs font-black tracking-[0.2em] text-black uppercase"
                  style={{ color: "#000000" }}
                >
                  Network & Archives
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Instagram", href: "https://www.instagram.com" },
                    { label: "LinkedIn", href: "https://www.linkedin.com" },
                    { label: "YouTube Showreel", href: "https://www.youtube.com" },
                    { label: "Client Support Portal", href: "https://rohanjoshi.in/support" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-black hover:text-[#1D4ED8] w-fit cursor-pointer transition-colors duration-200"
                      style={{ color: "#000000" }}
                    >
                      <span className="text-black" style={{ color: "#000000" }}>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-black group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Ethos and Copyright */}
          <div
            ref={bottomBarRef}
            className="border-t border-black/15 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono"
          >
            <p className="max-w-md text-black font-semibold" style={{ color: "#000000" }}>
              Crafting cinematic commercial films and visual stories for world-class brands.
            </p>

            <p className="text-black font-semibold" style={{ color: "#000000" }}>
              © 2026 MAKE MY VID®. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};
