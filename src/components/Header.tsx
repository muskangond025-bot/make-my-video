"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Exact original data items preserved
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Join Us", href: "https://rohanjoshi.in/join-us", target: "_blank" },
    { name: "Blogs", href: "https://rohanjoshi.in/all-blogs", target: "_blank" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#expertise" },
    { name: "Supports", href: "https://rohanjoshi.in/support", target: "_blank" },
  ];

  return (
    <>
      {/* Floating Header Container (Butter.video style: single left pill) */}
      <header className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-50 pointer-events-none select-none transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-start">

            {/* ========================================================= */}
            {/* BUTTER-STYLE FLOATING PILL NAVBAR                         */}
            {/* ========================================================= */}
            <div className="relative pointer-events-auto w-full sm:w-auto">
              <div
                className={`flex items-center justify-between sm:justify-start rounded-[1.6rem] transition-all duration-300 border ${
                  isScrolled
                    ? "bg-[#F3EBDD]/90 dark:bg-[#211747]/90 shadow-[0_12px_36px_rgba(33,23,71,0.12)] backdrop-blur-xl border-[#211747]/12 dark:border-[#B9A1F7]/20"
                    : "bg-[#F3EBDD]/95 dark:bg-[#211747]/95 shadow-[0_6px_24px_rgba(33,23,71,0.06)] backdrop-blur-md border-[#211747]/10 dark:border-[#B9A1F7]/15"
                }`}
                style={{
                  padding: "1.25rem 2.2rem",
                  color: isDark ? "#F3EBDD" : "#211747",
                  gap: "44px",
                }}
              >
                {/* Brand Logo */}
                <a
                  href="/"
                  className="flex items-center flex-shrink-0 transition-opacity duration-200 hover:opacity-75"
                  aria-label="Make My Vid Home"
                >
                  <img
                    src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
                    alt="Make My Vid Logo"
                    className="h-6 sm:h-[26px] w-auto object-contain dark:brightness-110"
                  />
                </a>

                {/* Desktop Nav Items with strict equal gap */}
                <nav
                  className="butter-nav-desktop whitespace-nowrap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "44px",
                  }}
                >
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.target || "_self"}
                      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="transition-colors duration-200 text-decoration-none hover:text-[#B9A1F7] block flex-shrink-0"
                      style={{
                        fontFamily: "'HK Guise', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "15px",
                        lineHeight: 1.5,
                        letterSpacing: "0.04em",
                        fontWeight: 500,
                        color: isDark ? "#F3EBDD" : "#211747",
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Theme Mode Toggle Button placed directly where the cross/more menu icon was */}
                <ThemeToggle />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Awwwards Vertical Ribbon (Desktop) */}
      <div
        className="awwwards-ribbon hidden lg:block"
        style={{
          position: "fixed",
          zIndex: 40,
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
            <path className="js-color-bg" fill="#F3EBDD" stroke="rgba(33,23,71,0.15)" strokeWidth="1" d="M0 0h53.08v171.358H0z" />
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
