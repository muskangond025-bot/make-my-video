"use client";

import React from "react";
import Link from "next/link";

export interface BrandButtonProps {
  label?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  showArrow?: boolean;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  label,
  children,
  href,
  onClick,
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  showArrow = true,
}) => {
  // Responsive sizing configurations matching the standard typography and device scale
  const sizeStyles = {
    sm: {
      button: "py-1.5 pl-3 pr-2 gap-2 text-[11px] sm:text-xs",
      innerPill: "py-0.5 px-2.5",
      circle: "w-6 h-6",
      arrow: "w-3 h-3",
    },
    md: {
      button: "py-2 pl-4 sm:pl-5 pr-2.5 gap-2.5 sm:gap-3 text-xs sm:text-sm",
      innerPill: "py-1 px-3 sm:px-3.5",
      circle: "w-7 h-7 sm:w-8 sm:h-8",
      arrow: "w-3.5 h-3.5 sm:w-4 sm:h-4",
    },
    lg: {
      button: "py-2.5 sm:py-3 pl-5 sm:pl-6 pr-3 sm:pr-3.5 gap-3 sm:gap-4 text-xs sm:text-base",
      innerPill: "py-1 sm:py-1.5 px-4 sm:px-5",
      circle: "w-8 h-8 sm:w-10 sm:h-10",
      arrow: "w-4 h-4 sm:w-5 sm:h-5",
    },
  }[size];

  const content = (
    <>
      {/* Inner White Outline Pill Hugging the Typography */}
      <span
        className={`inline-flex items-center justify-center border border-white/85 rounded-full font-sans font-black tracking-widest uppercase text-black select-none transition-colors ${sizeStyles.innerPill}`}
      >
        {label || children}
      </span>

      {/* Signature Purple Circle with Sliding Black Arrow */}
      {showArrow && (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-[#7567EE] text-black shadow-sm flex-shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 ${sizeStyles.circle}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${sizeStyles.arrow}`}
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </>
  );

  const baseClasses = `
    group relative inline-flex items-center justify-between
    bg-[#D4FF1F] hover:bg-[#c9f518] active:bg-[#bde814]
    rounded-full font-bold
    shadow-[0_0_20px_rgba(212,255,31,0.4)]
    hover:shadow-[0_0_30px_rgba(212,255,31,0.65)]
    transition-all duration-300 ease-out
    hover:scale-[1.04] active:scale-[0.97]
    cursor-pointer select-none
    ${sizeStyles.button}
    ${disabled ? "opacity-50 pointer-events-none" : ""}
    ${className}
  `.trim();

  if (href) {
    if (href.startsWith("http") || target === "_blank") {
      return (
        <a
          href={href}
          target={target}
          rel={rel || "noopener noreferrer"}
          onClick={onClick}
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
};
