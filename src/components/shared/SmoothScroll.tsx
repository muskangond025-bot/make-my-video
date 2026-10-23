"use client";
import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger } from '@/lib/gsap';

function ScrollResetOnReload() {
  const lenis = useLenis();

  useEffect(() => {
    // 1. Tell browser not to restore previous scroll position on reload
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Immediately scroll window to top (Hero section)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });

    // 3. Connect Lenis with ScrollTrigger for silky 60fps scrub
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.on('scroll', ScrollTrigger.update);
    }

    // 4. Reset scroll on beforeunload so the next load starts at 0
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 5. Secondary safety check after DOM hydration
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }, 50);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(timer);
    };
  }, [lenis]);

  return null;
}

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <ScrollResetOnReload />
      {children as any}
    </ReactLenis>
  );
};

