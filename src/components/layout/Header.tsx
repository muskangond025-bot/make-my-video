"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

interface NavItem {
  num: string;
  name: string;
  href: string;
  isExternal?: boolean;
}

const MENU_ITEMS: NavItem[] = [
  { num: "01", name: "HOME", href: "/" },
  { num: "02", name: "ABOUT", href: "/about" },
  { num: "03", name: "PROJECTS", href: "/projects" },
  { num: "04", name: "SERVICES", href: "/services" },
  { num: "05", name: "JOIN US", href: "/join-us" },
  { num: "06", name: "BLOG", href: "/blogs" },
  { num: "07", name: "SUPPORT", href: "/support" },
];

export const Header = () => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const getActiveIndex = () => {
    if (!pathname || pathname === "/") return 0;
    if (pathname.startsWith("/about")) return 1;
    if (pathname.startsWith("/projects") || pathname.startsWith("/_projects")) return 2;
    if (pathname.startsWith("/services")) return 3;
    if (pathname.startsWith("/join-us")) return 4;
    if (pathname.startsWith("/blog")) return 5;
    if (pathname.startsWith("/support")) return 6;
    return 0;
  };

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const isScrolledRef = useRef(false);
  const isHiddenRef = useRef(false);
  const lastScrollY = useRef(0);

  // Mount detection
  useEffect(() => {
    setMounted(true);
    setHoveredIndex(getActiveIndex());
  }, [pathname]);

  // Reset hovered index to current page whenever menu opens
  useEffect(() => {
    if (isOpen) {
      setHoveredIndex(getActiveIndex());
    }
  }, [isOpen, pathname]);

  // Smart auto-hide with direction detection, rAF batching & buffer:
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
            ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#141416]/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : isOpen
            ? "bg-transparent border-b border-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-3.5 sm:py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
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
          </Link>

          {/* Right Header Navigation Controls - "GOT A PROJECT?" REMOVED PER FEEDBACK */}
          <div className="relative z-50 flex items-center gap-2 sm:gap-3">
            {/* DUAL-STATE ROLLING TEXT MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center gap-2 bg-[#D5FF3F] text-[#141416] hover:bg-[#c2ed2c] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_2px_12px_rgba(213,255,63,0.35)] cursor-pointer group select-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              <div className="flex flex-col gap-1 w-3.5 justify-center">
                <span
                  className={`block h-[2px] bg-[#141416] transition-transform duration-300 ${
                    isOpen ? "rotate-45 translate-y-[3px]" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] bg-[#141416] transition-transform duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-[3px]" : ""
                  }`}
                />
              </div>
              <span className="font-extrabold text-xs sm:text-sm tracking-wider">
                {isOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* FLOATING LIGHT CARD MODAL (DUMEMEARTS STYLE)              */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Frosted Glass Backdrop Overlay */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xl"
              aria-hidden="true"
            />

            {/* Floating Light Card Container */}
            <motion.div
              key="nav-card"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 sm:top-24 left-4 sm:left-8 md:left-12 lg:left-16 z-50 w-[calc(100%-2rem)] sm:w-[410px] max-w-[430px] rounded-[32px] sm:rounded-[36px] bg-[#FAF8F5] border border-[#141416]/10 p-3 sm:p-4 shadow-[0_28px_80px_rgba(0,0,0,0.22)] select-none overflow-hidden"
              role="dialog"
              aria-label="Navigation Menu"
            >
              <div
                className="flex flex-col gap-1 sm:gap-1.5"
                onMouseLeave={() => setHoveredIndex(getActiveIndex())}
              >
                {MENU_ITEMS.map((item, idx) => {
                  const isHovered = hoveredIndex === idx;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        if (!item.isExternal) {
                          e.preventDefault();
                          handleLinkClick(item.href);
                        } else {
                          handleLinkClick(item.href, true);
                        }
                      }}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      className="relative flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-[22px] cursor-pointer group select-none transition-colors"
                    >
                      {/* Sliding Dark Pill Capsule */}
                      {isHovered && (
                        <motion.div
                          layoutId="dumemeNavPill"
                          className="absolute inset-0 bg-[#141416] rounded-[22px] z-0 shadow-md"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}

                      {/* Foreground Content */}
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <div className="flex items-center min-w-0">
                          {/* Left Vertical Accent Tick (fixed slot for perfect text alignment) */}
                          <span
                            className={`w-1 h-6 sm:h-7 rounded-full bg-[#D5FF3F] mr-3.5 sm:mr-4 flex-shrink-0 transition-all duration-200 ${
                              isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                            }`}
                          />

                          {/* Link Name in Humane Medium with perfect sizing & tracking */}
                          <span
                            className={`font-humane text-4xl sm:text-5xl md:text-[52px] uppercase leading-[0.88] transition-colors duration-200 select-none ${
                              isHovered
                                ? "text-white"
                                : "text-[#141416] group-hover:text-black"
                            }`}
                            style={{
                              fontFamily: "'Humane', sans-serif",
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {item.name}
                          </span>
                        </div>

                        {/* Right Glowing Circle Dot */}
                        <span
                          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D5FF3F] shadow-[0_0_12px_rgba(213,255,63,0.6)] flex-shrink-0 ml-4 transition-all duration-200 ${
                            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
