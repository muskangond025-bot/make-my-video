"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch by rendering a skeleton placeholder
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-full border border-black/10 dark:border-white/10 opacity-0 ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto shadow-sm cursor-pointer focus:outline-none flex-shrink-0 ${className}`}
      style={{
        backgroundColor: isDark ? "#211747" : "#F3EBDD",
        borderColor: isDark ? "rgba(185, 161, 247, 0.4)" : "rgba(33, 23, 71, 0.25)",
      }}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <Sun
          className={`absolute w-full h-full transition-all duration-500 transform ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          strokeWidth={2.2}
          color={isDark ? "#D5FF3F" : "#211747"}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute w-full h-full transition-all duration-500 transform ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          strokeWidth={2.2}
          color={isDark ? "#D5FF3F" : "#211747"}
        />
      </div>
    </button>
  );
}
