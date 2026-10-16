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
  { num: "02", name: "About", href: "#about" },
  { num: "03", name: "Projects", href: "#projects" },
  { num: "04", name: "Services", href: "#expertise" },
  { num: "05", name: "Blogs", href: "https://rohanjoshi.in/all-blogs", isExternal: true },
  { num: "06", name: "Join Us", href: "https://rohanjoshi.in/join-us", isExternal: true },
  { num: "07", name: "Contact", href: "#contact" },
];

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

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

  // Directional scroll hide/reveal with Hero 3D camera stage delay
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroElement = document.getElementById("home");
      const heroThreshold = heroElement ? window.innerHeight * 0.75 : 60;

      setIsScrolled(currentScrollY > 20);

      if (isOpen) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // If user is within the top Hero area, always keep navbar hidden
      if (currentScrollY < heroThreshold) {
        setIsHidden(true);
      } else {
        // Beyond the Hero threshold (camera rotated to 3/4 LCD view as in screenshot)
        if (currentScrollY > lastScrollY.current + 6 && currentScrollY > heroThreshold + 120) {
          // Scrolling down further down the page -> hide
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY.current - 4) {
          // Scrolling up -> reveal navbar
          setIsHidden(false);
        } else if (lastScrollY.current < heroThreshold && currentScrollY >= heroThreshold) {
          // Just crossed the threshold scrolling down -> reveal navbar!
          setIsHidden(false);
        } else {
          setIsHidden(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Evaluate initial position immediately
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled && !isOpen
            ? "bg-[#0A0B0E]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            : isOpen
            ? "bg-transparent border-b border-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-5 flex items-center justify-between">
          
          {/* Brand Logo - Pure White */}
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="relative z-50 flex items-center transition-all duration-300 hover:opacity-80 group cursor-pointer"
            aria-label="Make My Vid Home"
          >
            <img
              src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
              alt="Make My Vid Logo"
              className="h-7 sm:h-8 w-auto object-contain brightness-0 invert transition-all duration-300"
            />
          </a>

          {/* Right Header Navigation Controls */}
          <div className="relative z-50 flex items-center gap-2.5 sm:gap-4 md:gap-6">
            
            {/* CTA Button: "Get in Touch" - Pure White */}
            {/* CTA Button: "Get in Touch" - No Capsule Shape, Pure Text & Roll */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-2 py-1.5 px-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white transition-all duration-300 group cursor-pointer relative"
            >
              <div className="relative h-4 sm:h-[18px] overflow-hidden flex flex-col justify-start">
                <div className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                  <span className="h-4 sm:h-[18px] flex items-center leading-none text-white whitespace-nowrap">
                    Get in Touch
                  </span>
                  <span className="h-4 sm:h-[18px] flex items-center leading-none text-white/70 whitespace-nowrap">
                    Get in Touch
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              {/* Bottom Underline on hover */}
              <span className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle className="border-white/20" />

            {/* DUAL-STATE ROLLING TEXT MENU BUTTON - No Capsule Shape, Pure White Text */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center py-1.5 px-2 text-white transition-all duration-300 group cursor-pointer bg-transparent border-none outline-none select-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              {/* Rolling Vertical Text on Hover & State */}
              <div className="relative h-4 sm:h-[18px] overflow-hidden flex flex-col justify-start">
                <div
                  className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] ${
                    isOpen ? "-translate-y-1/2" : "translate-y-0"
                  }`}
                >
                  {/* Closed state ("Menu"): pure white text, rolls on hover */}
                  <div className="h-4 sm:h-[18px] overflow-hidden flex flex-col justify-start">
                    <div className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                      <span className="h-4 sm:h-[18px] flex items-center font-bold tracking-widest text-xs sm:text-sm uppercase leading-none text-white whitespace-nowrap">
                        Menu
                      </span>
                      <span className="h-4 sm:h-[18px] flex items-center font-bold tracking-widest text-xs sm:text-sm uppercase leading-none text-white/70 whitespace-nowrap">
                        Menu
                      </span>
                    </div>
                  </div>

                  {/* Opened state ("Close"): pure white text, rolls on hover */}
                  <div className="h-4 sm:h-[18px] overflow-hidden flex flex-col justify-start">
                    <div className="flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                      <span className="h-4 sm:h-[18px] flex items-center font-bold tracking-widest text-xs sm:text-sm uppercase leading-none text-white whitespace-nowrap">
                        Close
                      </span>
                      <span className="h-4 sm:h-[18px] flex items-center font-bold tracking-widest text-xs sm:text-sm uppercase leading-none text-white/70 whitespace-nowrap">
                        Close
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ignite Hover Underline Accent */}
              <div className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0.01,0.05,0.99)]" />
            </button>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* IGNITE AGENCY FULL-SCREEN DRAWER MENU                     */}
      {/* ========================================================= */}
      <div
        ref={menuWrapRef}
        className="fixed inset-0 z-40 overflow-hidden select-none"
        style={{ visibility: "hidden" }}
      >
        {/* 3 Cascading Layered Panels */}
        {/* Panel 1: Vibrant Cinema Purple Brand Accent */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#8B5CF6] via-[#6D28D9] to-[#211747]"
        />

        {/* Panel 2: Rich Contrast Secondary Slate */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 z-0 bg-[#161722]"
        />

        {/* Panel 3: Obsidian Film Base */}
        <div
          ref={panel3Ref}
          className="absolute inset-0 z-0 bg-[#0A0B0E]"
        />

        {/* Subtle Ambient Film Grain Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(185,161,247,0.08)_0%,transparent_70%)]" />

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
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#B9A1F7] dark:text-[#D5FF3F] mr-3 sm:mr-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      {item.num}
                    </span>

                    {/* Dual-Layered Rolling Text (Ignite Hover Stagger - Proportional Height, No Clipping) */}
                    <div className="relative h-[1.3em] overflow-hidden flex flex-col justify-start text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tight">
                      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0.01,0.05,0.99)] group-hover:-translate-y-1/2">
                        {/* Default Layer */}
                        <span className="h-[1.3em] flex items-center text-white uppercase leading-none whitespace-nowrap">
                          {item.name}
                        </span>
                        {/* Rolled In Accent Layer */}
                        <span className="h-[1.3em] flex items-center text-[#B9A1F7] dark:text-[#D5FF3F] uppercase leading-none whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {item.isExternal && (
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2.5 text-white/40 group-hover:text-[#B9A1F7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* Center Visual Feature Emblem (Ignite Bolt counterpart: Cinema Clapper & Film Emblem) */}
            <div
              ref={emblemRef}
              className="hidden lg:flex lg:col-span-3 items-center justify-center pointer-events-none select-none relative"
            >
              <div className="relative w-48 h-48 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-[0_0_50px_rgba(185,161,247,0.15)] group">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#B9A1F7]/30 animate-[spin_24s_linear_infinite]" />
                <div className="relative flex flex-col items-center justify-center gap-2 text-[#B9A1F7] dark:text-[#D5FF3F]">
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
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#B9A1F7] dark:text-[#D5FF3F] uppercase">
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
                      <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap text-[#B9A1F7] dark:text-[#D5FF3F]">
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
                      <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap text-[#B9A1F7] dark:text-[#D5FF3F]">
                        +91 (0) 98765 43210
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Social Channels Column */}
              <div className="flex flex-col gap-2.5">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#B9A1F7] dark:text-[#D5FF3F] uppercase">
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
                          <span className="h-[1.3em] flex items-center leading-none whitespace-nowrap text-[#B9A1F7] dark:text-[#D5FF3F]">
                            {item.label}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#B9A1F7] dark:text-[#D5FF3F] transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Ethos and Copyright (Mumbai text removed) */}
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

      {/* Awwwards Vertical Ribbon (Desktop) - z-30 so it sits under the open menu */}
      <div
        className="awwwards-ribbon hidden lg:block"
        style={{
          position: "fixed",
          zIndex: 30,
          transform: "translateY(-50%)",
          top: "50%",
          right: 0,
        }}
      >
        <a
          href="https://rohanjoshi.in"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:translate-x-[-4px] transition-transform duration-300"
        >
          <svg width="53.08" height="171.358" className="shadow-2xl">
            <path
              className="js-color-bg"
              fill="#F3EBDD"
              stroke="rgba(33,23,71,0.15)"
              strokeWidth="1"
              d="M0 0h53.08v171.358H0z"
            />
            <g className="js-color-text" fill="#211747">
              <path
                d="M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.446a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495"
                fill="#211747"
              />
            </g>
          </svg>
        </a>
      </div>
    </>
  );
};
