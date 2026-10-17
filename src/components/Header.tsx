"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowRight, ArrowUpRight, Film, Sparkles } from "lucide-react";
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
  { num: "02", name: "Services", href: "#expertise" },
  { num: "03", name: "3D Vault", href: "#archive" },
  { num: "04", name: "Brands", href: "#brands" },
  { num: "05", name: "Track Record", href: "#about" },
  { num: "06", name: "Reviews", href: "#testimonials" },
  { num: "07", name: "FAQ", href: "#faq" },
  { num: "08", name: "Contact", href: "#contact" },
];

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const lastScrollY = useRef(0);
  const menuWrapRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const extrasRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Smart auto-hide with direction detection and buffer:
  // 1. At the top (scrollY <= 80px): always visible.
  // 2. Scrolling DOWN past 120px (delta > 10px): smoothly glides up out of view.
  // 3. Scrolling UP (delta < -10px): smoothly glides down into view.
  // 4. Ignores micro scroll jitters (< 10px) to completely prevent up/down glitching.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      if (isOpen) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // At top of page, always keep navbar visible
      if (currentScrollY <= 80) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Buffer threshold: ignore micro movements (< 10px) to prevent fluttering/glitching
      if (Math.abs(delta) < 10) {
        return;
      }

      if (delta > 0 && currentScrollY > 120) {
        // Scrolling DOWN -> hide navbar
        setIsHidden(true);
      } else if (delta < 0) {
        // Scrolling UP -> reveal navbar
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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

  // Ignite Agency Cascading 3-Panel & Stagger Animation Timeline
  useEffect(() => {
    if (!panel1Ref.current || !panel2Ref.current || !panel3Ref.current || !menuWrapRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial positions
      gsap.set(menuWrapRef.current, { visibility: "hidden" });
      gsap.set([panel1Ref.current, panel2Ref.current, panel3Ref.current], { xPercent: 101 });
      gsap.set(linksRef.current.filter(Boolean), {
        autoAlpha: 0,
        yPercent: 110,
        rotation: 4,
        transformOrigin: "left bottom",
      });
      gsap.set(extrasRef.current, { autoAlpha: 0, y: 35 });
      gsap.set(bottomBarRef.current, { autoAlpha: 0, y: 25 });
      gsap.set(emblemRef.current, { autoAlpha: 0, scale: 0.6, rotate: -8 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut" },
      });

      tl
        // 1. Reveal wrapper
        .set(menuWrapRef.current, { visibility: "visible" })
        // 2. 3-Blade Cascading Backdrop Panels
        .fromTo(panel1Ref.current, { xPercent: 101 }, { xPercent: 0, duration: 0.55, ease: "power3.inOut" })
        .fromTo(panel2Ref.current, { xPercent: 101 }, { xPercent: 0, duration: 0.58, ease: "power3.inOut" }, "-=0.45")
        .fromTo(panel3Ref.current, { xPercent: 101 }, { xPercent: 0, duration: 0.62, ease: "power3.inOut" }, "-=0.46")
        // 3. Tilted Swing-Up Primary Links
        .to(
          linksRef.current.filter(Boolean),
          {
            autoAlpha: 1,
            yPercent: 0,
            rotation: 0,
            stagger: 0.045,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.25"
        )
        // 4. Center Visual Feature (Ignite Bolt style)
        .to(
          emblemRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.35"
        )
        // 5. Secondary Columns and Bottom Bar
        .to(
          extrasRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
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

    if (href.startsWith("#")) {
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  };

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <>
      {/* ========================================================= */}
      {/* IGNITE AGENCY TOP FIXED NAVBAR                            */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          isHidden
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        } ${
          isScrolled && !isOpen
            ? "bg-[#EAE3DB]/90 dark:bg-[#141416]/90 backdrop-blur-xl border-b border-[#141416]/10 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : isOpen
            ? "bg-transparent border-b border-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-3.5 sm:py-4 flex items-center justify-between">
          
          {/* Brand Logo - Crisp Black matching website primary */}
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
            
            {/* CTA Button: "GOT A PROJECT?" - Signature Neon Lime Capsule */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#D5FF3F] text-[#141416] hover:bg-[#c2ed2c] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(213,255,63,0.35)] cursor-pointer group"
            >
              <span>GOT A PROJECT?</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#141416] group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle className="border-[#141416]/15 text-[#141416] bg-[#141416]/5" />

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
      {/* DRAWER MENU - THEME HARMONIZED WITH WEBSITE SYSTEM        */}
      {/* ========================================================= */}
      <div
        ref={menuWrapRef}
        className="fixed inset-0 z-40 overflow-hidden select-none"
        style={{ visibility: "hidden" }}
      >
        {/* 3 Cascading Layered Panels */}
        {/* Panel 1: Electric Violet / Lavender Accent */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#7567EE] via-[#5A4DDE] to-[#141416]"
        />

        {/* Panel 2: Deep Charcoal Secondary Surface */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 z-0 bg-[#18181D]"
        />

        {/* Panel 3: Obsidian Dark Base */}
        <div
          ref={panel3Ref}
          className="absolute inset-0 z-0 bg-[#141416]"
        />

        {/* Subtle Ambient Film Grain Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(117,103,238,0.1)_0%,transparent_70%)]" />

        {/* Menu Inner Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-24 sm:pt-28 pb-8 text-white overflow-y-auto">
          
          {/* Middle Main Grid: Links, Visual Emblem, and Info Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-auto py-6">
            
            {/* Primary Numbered Hero Links (Cols 1 to 6) */}
            <nav className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-3.5 md:gap-4">
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
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#7567EE] dark:text-[#D5FF3F] mr-3 sm:mr-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      {item.num}
                    </span>

                    {/* Dual-Layered Rolling Text */}
                    <div className="relative h-[1.3em] overflow-hidden flex flex-col justify-start text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tight">
                      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                        {/* Default Layer */}
                        <span className="h-[1.3em] flex items-center text-white uppercase leading-none whitespace-nowrap">
                          {item.name}
                        </span>
                        {/* Rolled In Accent Layer */}
                        <span className="h-[1.3em] flex items-center text-[#7567EE] dark:text-[#D5FF3F] uppercase leading-none whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {item.isExternal && (
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2.5 text-white/40 group-hover:text-[#7567EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* Center Visual Feature Emblem */}
            <div
              ref={emblemRef}
              className="hidden lg:flex lg:col-span-3 items-center justify-center pointer-events-none select-none relative"
            >
              <div className="relative w-48 h-48 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-[0_0_50px_rgba(117,103,238,0.2)] group">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#7567EE]/40 animate-[spin_24s_linear_infinite]" />
                <div className="relative flex flex-col items-center justify-center gap-2 text-[#7567EE] dark:text-[#D5FF3F]">
                  <Film className="w-14 h-14 stroke-[1.5] animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase">
                    PROD // 4K CINEMA
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Studio & Social Columns (Cols 10 to 12) */}
            <div
              ref={extrasRef}
              className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col justify-between gap-6 sm:gap-10 lg:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 text-sm"
            >
              {/* Direct Inquiries Column */}
              <div className="flex flex-col gap-2.5">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#7567EE] dark:text-[#D5FF3F] uppercase">
                  Direct Line
                </p>

                {/* Email with Text Roll */}
                <a
                  href="mailto:hello@makemyvid.com"
                  className="group inline-flex items-center text-white/80 hover:text-white w-fit cursor-pointer"
                >
                  <div className="relative h-[1.3em] overflow-hidden flex flex-col justify-start text-sm">
                    <div className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                      <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap">
                        hello@makemyvid.com
                      </span>
                      <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap text-[#7567EE] dark:text-[#D5FF3F]">
                        hello@makemyvid.com
                      </span>
                    </div>
                  </div>
                </a>

                {/* Phone with Text Roll */}
                <a
                  href="tel:+919876543210"
                  className="group inline-flex items-center text-white/80 hover:text-white w-fit cursor-pointer"
                >
                  <div className="relative h-[1.3em] overflow-hidden flex flex-col justify-start text-sm">
                    <div className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                      <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap">
                        +91 (0) 98765 43210
                      </span>
                      <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap text-[#7567EE] dark:text-[#D5FF3F]">
                        +91 (0) 98765 43210
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Social Channels Column */}
              <div className="flex flex-col gap-2.5">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#7567EE] dark:text-[#D5FF3F] uppercase">
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
                      className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white w-fit cursor-pointer"
                    >
                      <div className="relative h-[1.3em] overflow-hidden flex flex-col justify-start text-sm">
                        <div className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                          <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap">
                            {item.label}
                          </span>
                          <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap text-[#7567EE] dark:text-[#D5FF3F]">
                            {item.label}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#7567EE] dark:text-[#D5FF3F] transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Ethos and Copyright */}
          <div
            ref={bottomBarRef}
            className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-white/60"
          >
            <p className="max-w-md text-white/70">
              Crafting cinematic commercial films and visual stories for world-class brands.
            </p>

            <p className="text-white/50">
              © 2026 MAKE MY VID®. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};
