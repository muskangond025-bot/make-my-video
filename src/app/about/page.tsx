"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutEnhancements } from "@/components/sections/AboutEnhancements";
import { Faq } from "@/components/sections/Faq";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

import {
  HERO_ABOUT_HTML,
  STACK_HTML,
  CERTIFIED_HTML,
  PROCESS_HTML
} from "./aboutHtml";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Dynamic import to prevent SSR issues with window/DOM-dependent packages
    const initAnimations = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      const { Draggable } = await import("gsap/dist/Draggable");

      gsap.registerPlugin(ScrollTrigger, Draggable);

      // 0. Initial layouts grid and text reveals (fixes missing column lines)
      gsap.to(".hero-about-bg-wrap", { opacity: 1, duration: 1.2, ease: "power2.out" });
      gsap.to(".text-size-regular.is--about", { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.3 });

      // 0b. Text highlight scroll animations
      const splitHeadingTargets = document.querySelectorAll("[data-highlight-text]");
      splitHeadingTargets.forEach((heading) => {
        const scrollStart = heading.getAttribute("data-highlight-scroll-start") || "top 90%";
        const scrollEnd = heading.getAttribute("data-highlight-scroll-end") || "center 40%";
        const fadedValue = parseFloat(heading.getAttribute("data-highlight-fade") || "0.2");
        const staggerValue = parseFloat(heading.getAttribute("data-highlight-stagger") || "0.1");

        import('split-type').then(({ default: SplitType }) => {
          const split = new SplitType(heading as HTMLElement, { types: 'chars,words' });
          const tl = gsap.timeline({
            scrollTrigger: {
              scrub: true,
              trigger: heading,
              start: scrollStart,
              end: scrollEnd,
            }
          });
          tl.from(split.chars, {
            opacity: fadedValue,
            stagger: staggerValue,
            ease: "linear"
          });
        });
      });

      // 0c. Donut intro animations on scroll
      const donuts = [
        { el: ".donut--1", scale: 0.82 },
        { el: ".donut--2", scale: 0.85 },
        { el: ".donut--3", scale: 0.88 },
        { el: ".donut--4", scale: 0.91 },
        { el: ".donut--5", scale: 0.94 },
        { el: ".donut--6", scale: 0.97 }
      ];
      const donutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-about-header",
          start: "top 50%",
          end: "bottom 10%",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      donuts.forEach((donut, i) => {
        donutTl.to(donut.el, {
          borderWidth: 100,
          scale: donut.scale,
          ease: "none",
          duration: 1
        }, i * 0.06);
      });

      // 0d. Parallax layers scroll animations
      document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
        let parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0
          }
        });

        const layers = [
           { layer: "-1", yPercent: -10 },
           { layer: "-2", yPercent: -20 },
           { layer: "-3", yPercent: -30 },
           { layer: "-4", yPercent: -40 },
           { layer: "-5", yPercent: -50 },
           { layer: "-6", yPercent: -60 },
           { layer: "-7", yPercent: -70 },
           { layer: "-8", yPercent: -80 },
           { layer: "-9", yPercent: -90 },
           { layer: "1", yPercent: 10 },
           { layer: "2", yPercent: 20 },
           { layer: "3", yPercent: 30 },
           { layer: "4", yPercent: 40 },
           { layer: "5", yPercent: 50 },
           { layer: "6", yPercent: 60 },
           { layer: "7", yPercent: 70 },
           { layer: "8", yPercent: 80 },
           { layer: "9", yPercent: 90 }
        ];

        layers.forEach((layerObj, idx) => {
          parallaxTl.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
            {
              yPercent: layerObj.yPercent,
              ease: "none"
            },
            idx === 0 ? undefined : "<"
          );
        });
      });

      // 0e. Button stagger letters hover stagers
      const staggerButtons = document.querySelectorAll('[data-button-animate-chars]');
      staggerButtons.forEach(button => {
        const text = button.textContent || '';
        button.innerHTML = '';
        [...text].forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.transitionDelay = `${index * 0.05}s`;
          if (char === ' ') {
            span.style.whiteSpace = 'pre';
          }
          button.appendChild(span);
        });
      });

      // 0f. Sticky scroll columns and line draw reveal
      const stickyTrack = document.querySelector(".about-header-sticky");
      const columns = document.querySelectorAll(".about-header-text");
      const line = document.querySelector(".line-wrap");
      if (stickyTrack && columns.length > 0) {
        // Set initial states
        gsap.set(columns, { opacity: 0.2 });
        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        }

        const trackTl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyTrack,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });

        // Progress 0% to 65%: Keep line and columns in initial state
        trackTl.to(columns, { opacity: 0.2, duration: 6.5 }, 0);
        if (line) {
          trackTl.to(line, { scaleX: 0, duration: 6.5 }, 0);
        }

        // Progress 65% to 100%: Line draws itself to 100% width
        if (line) {
          trackTl.to(line, { scaleX: 1, ease: "none", duration: 3.5 }, 6.5);
        }

        // Columns fade in one by one and stay visible as the line expands past them:
        // Progress 65% to 75%: Column 1 fades in
        trackTl.to(columns[0], { opacity: 1, duration: 1.0 }, 6.5);

        // Progress 75% to 85%: Column 2 fades in
        trackTl.to(columns[1], { opacity: 1, duration: 1.0 }, 7.5);

        // Progress 85% to 95%: Column 3 fades in
        trackTl.to(columns[2], { opacity: 1, duration: 1.0 }, 8.5);
      }

      // 0g. Line-by-line reveal animations for elements with [data-gsap^="par."]
      const parElements = document.querySelectorAll('[data-gsap^="par."]');
      parElements.forEach((el) => {
        gsap.set(el, { opacity: 0 });

        import('split-type').then(({ default: SplitType }) => {
          const split = new SplitType(el as HTMLElement, { types: 'lines' });
          const lines = split.lines;
          if (!split.lines || split.lines.length === 0) {
            // Fallback if split-type fails or doesn't find lines
            gsap.to(el, { opacity: 1, duration: 0.8 });
            return;
          }

          gsap.set(lines, { opacity: 0, y: 30 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.set(el, { opacity: 1 });
              gsap.to(lines, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
              });
            }
          });
        });
      });

      // 1. OSMO Flick Cards Slider
      const sliders = document.querySelectorAll('[data-flick-cards-init]');
      sliders.forEach(slider => {
        const list = slider.querySelector('[data-flick-cards-list]');
        if (!list) return;
        const cards = Array.from(list.querySelectorAll('[data-flick-cards-item]')) as HTMLElement[];
        const total = cards.length;
        if (total === 0) return;
        let activeIndex = 0;

        const sliderWidth = (slider as HTMLElement).offsetWidth;
        const threshold = 0.1;

        // Generate draggers inside each card
        const draggers: HTMLElement[] = [];
        cards.forEach(card => {
          // Remove existing dragger if any to avoid duplicates
          const existingDragger = card.querySelector('[data-flick-cards-dragger]');
          if (existingDragger) existingDragger.remove();

          const dragger = document.createElement('div');
          dragger.setAttribute('data-flick-cards-dragger', '');
          card.appendChild(dragger);
          draggers.push(dragger);
        });

        slider.setAttribute('data-flick-drag-status', 'grab');

        function getConfig(i: number, currentIndex: number) {
          let diff = i - currentIndex;
          if (diff > total / 2) diff -= total;
          else if (diff < -total / 2) diff += total;

          switch (diff) {
            case  0: return { x: 0,   y: 0,   rot: 0,  s: 1,   o: 1, z: 5 };
            case  1: return { x: 25,  y: 1,   rot: 10, s: 0.9, o: 1, z: 4 };
            case -1: return { x: -25, y: 1,   rot: -10,s: 0.9, o: 1, z: 4 };
            case  2: return { x: 45,  y: 5,   rot: 15, s: 0.8, o: 1, z: 3 };
            case -2: return { x: -45, y: 5,   rot: -15,s: 0.8, o: 1, z: 3 };
            default:
              const dir = diff > 0 ? 1 : -1;
              return { x: 55 * dir, y: 5, rot: 20 * dir, s: 0.6, o: 0, z: 2 };
          }
        }

        function renderCards(currentIndex: number) {
          cards.forEach((card, i) => {
            const cfg = getConfig(i, currentIndex);
            let status;

            if (cfg.x === 0)        status = 'active';
            else if (cfg.x === 25)  status = '2-after';
            else if (cfg.x === -25) status = '2-before';
            else if (cfg.x === 45)  status = '3-after';
            else if (cfg.x === -45) status = '3-before';
            else                    status = 'hidden';

            card.setAttribute('data-flick-cards-item-status', status);
            card.style.zIndex = cfg.z.toString();

            gsap.to(card, {
              duration: 0.6,
              ease: 'elastic.out(1.2, 1)',
              xPercent: cfg.x,
              yPercent: cfg.y,
              rotation: cfg.rot,
              scale: cfg.s,
              opacity: cfg.o
            });
          });
        }

        renderCards(activeIndex);

        if (total < 7) {
          console.log('Not minimum of 7 cards');
          return;
        }

        let pressClientX = 0;
        let pressClientY = 0;

        Draggable.create(draggers, {
          type: 'x',
          edgeResistance: 0.8,
          bounds: { minX: -sliderWidth / 2, maxX: sliderWidth / 2 },
          inertia: false,

          onPress(this: any) {
            pressClientX = this.pointerEvent.clientX;
            pressClientY = this.pointerEvent.clientY;
            slider.setAttribute('data-flick-drag-status', 'grabbing');
          },

          onDrag(this: any) {
            const rawProgress = this.x / sliderWidth;
            const progress = Math.min(1, Math.abs(rawProgress));
            const direction = rawProgress > 0 ? -1 : 1;
            const nextIndex = (activeIndex + direction + total) % total;

            cards.forEach((card, i) => {
              const from = getConfig(i, activeIndex);
              const to = getConfig(i, nextIndex);
              const mix = (prop: 'x' | 'y' | 'rot' | 's' | 'o') => from[prop] + (to[prop] - from[prop]) * progress;

              gsap.set(card, {
                xPercent: mix('x'),
                yPercent: mix('y'),
                rotation: mix('rot'),
                scale: mix('s'),
                opacity: mix('o')
              });
            });
          },

          onRelease(this: any) {
            slider.setAttribute('data-flick-drag-status', 'grab');

            const releaseClientX = this.pointerEvent.clientX;
            const releaseClientY = this.pointerEvent.clientY;
            const dragDistance = Math.hypot(releaseClientX - pressClientX, releaseClientY - pressClientY);

            const raw = this.x / sliderWidth;
            let shift = 0;
            if (raw > threshold) shift = -1;
            else if (raw < -threshold) shift = 1;

            if (shift !== 0) {
              activeIndex = (activeIndex + shift + total) % total;
              renderCards(activeIndex);
            }

            gsap.to(this.target, {
              x: 0,
              duration: 0.3,
              ease: 'power1.out'
            });

            if (dragDistance < 4) {
              this.target.style.pointerEvents = 'none';
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  const el = document.elementFromPoint(releaseClientX, releaseClientY);
                  if (el) {
                    const evt = new MouseEvent('click', {
                      view: window,
                      bubbles: true,
                      cancelable: true
                    });
                    el.dispatchEvent(evt);
                  }
                  this.target.style.pointerEvents = 'auto';
                });
              });
            }
          }
        });
      });

      // 2. MWG CERTIFIED CARDS
      const certifiedContainer = document.querySelector('.layout-component .layout-container') as HTMLElement;
      if (certifiedContainer) {
        const containerW = certifiedContainer.clientWidth;
        const cards = document.querySelectorAll('.layout-card') as NodeListOf<HTMLElement>;
        const cardsLength = cards.length;
        const cardContent = document.querySelectorAll('.layout-card');
        let currentPortion = 0;

        cards.forEach(card => {
          gsap.set(card, {
            xPercent: (Math.random() - 0.5) * 10,
            yPercent: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20,
          });
        });

        const resetPortion = (index: number) => {
          if (!cards[index]) return;
          gsap.to(cards[index], {
            xPercent: (Math.random() - 0.5) * 10,
            yPercent: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.75)',
          });
        };

        const newPortion = (i: number) => {
          if (!cards[i]) return;
          gsap.to(cards[i], {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            duration: 0.8,
            scale: 1.1,
            ease: 'elastic.out(1, 0.75)'
          });

          cardContent.forEach((content, index) => {
            if (index !== i) {
              gsap.to(content, {
                xPercent: 80 / (index - i),
                ease: 'elastic.out(1, 0.75)',
                duration: 0.8
              });
            } else {
              gsap.to(content, {
                xPercent: 0,
                ease: 'elastic.out(1, 0.75)',
                duration: 0.8
              });
            }
          });
        };

        certifiedContainer.addEventListener("mousemove", e => {
          const mouseX = e.clientX - certifiedContainer.getBoundingClientRect().left;
          const percentage = mouseX / containerW;
          const activePortion = Math.ceil(percentage * cardsLength);

          if (currentPortion !== activePortion && activePortion > 0 && activePortion <= cardsLength) {
            if (currentPortion !== 0) resetPortion(currentPortion - 1);
            currentPortion = activePortion;
            newPortion(currentPortion - 1);
          }
        });

        certifiedContainer.addEventListener("mouseleave", () => {
          resetPortion(currentPortion - 1);
          currentPortion = 0;

          gsap.to(cardContent, {
            xPercent: 0,
            ease: 'elastic.out(1, 0.75)',
            duration: 0.8
          });
        });
      }

      // 3. OSMO LOOPING WORDS
      const wordList = document.querySelector('[data-looping-words-list]') as HTMLElement;
      const edgeElement = document.querySelector('[data-looping-words-selector]') as HTMLElement;
      if (wordList && edgeElement) {
        const words = Array.from(wordList.children) as HTMLElement[];
        const totalWords = words.length;
        const wordHeight = 100 / totalWords;
        let currentIndex = 0;

        const updateEdgeWidth = () => {
          const centerIndex = (currentIndex + 1) % totalWords;
          const centerWord = words[centerIndex];
          if (!centerWord) return;
          const centerWordWidth = centerWord.getBoundingClientRect().width;
          const listWidth = wordList.getBoundingClientRect().width;
          const percentageWidth = (centerWordWidth / listWidth) * 100;

          gsap.to(edgeElement, {
            width: `${percentageWidth}%`,
            duration: 0.5,
            ease: 'expo.out',
          });
        };

        const moveWords = () => {
          currentIndex++;

          gsap.to(wordList, {
            yPercent: -wordHeight * currentIndex,
            duration: 1.2,
            ease: 'elastic.out(1, 0.85)',
            onStart: updateEdgeWidth,
            onComplete: function() {
              if (currentIndex >= totalWords - 3) {
                wordList.appendChild(wordList.children[0]);
                currentIndex--;
                gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
                words.push(words.shift()!);
              }
            }
          });
        };

        updateEdgeWidth();

        const loopingTimeline = gsap.timeline({ repeat: -1, delay: 1 })
          .call(moveWords)
          .to({}, { duration: 2 });
          
        return () => {
          loopingTimeline.kill();
        };
      }
    };

    let cleanupLoopingWords: (() => void) | undefined;
    initAnimations().then(cleanup => {
      cleanupLoopingWords = cleanup;
    });

    // 4. Process accordions click handlers (Discovery, Moodboarding, etc.)
    const processContainer = containerRef.current;
    if (processContainer) {
      const accordions = Array.from(processContainer.querySelectorAll('.section-process .process-list-item')) as HTMLElement[];
      
      import("gsap").then(({ gsap }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Stagger reveal on scroll for accordions
          gsap.set(accordions, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: '.section-process',
            start: 'top 80%',
            onEnter: () => {
              gsap.to(accordions, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            },
            onLeaveBack: () => {
              gsap.to(accordions, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.in',
                overwrite: 'auto'
              });
            }
          });
        });

        // Initialize and setup open/close accordion transitions
        const closeAccordion = (acc: HTMLElement) => {
          const bottom = acc.querySelector('.dropdown-bottom') as HTMLElement;
          const icon = acc.querySelector('.button-icon');
          (acc as any)._isOpen = false;
          gsap.to(bottom, {
            height: 0,
            duration: 0.4,
            ease: "power2.inOut"
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              duration: 0.4,
              ease: "power2.inOut"
            });
          }
        };

        const openAccordion = (acc: HTMLElement) => {
          const bottom = acc.querySelector('.dropdown-bottom') as HTMLElement;
          const icon = acc.querySelector('.button-icon');
          (acc as any)._isOpen = true;
          gsap.to(bottom, {
            height: 'auto',
            duration: 0.4,
            ease: "power2.out"
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 45,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        };

        accordions.forEach((accordion, idx) => {
          const top = accordion.querySelector('.dropdown-top');
          const bottom = accordion.querySelector('.dropdown-bottom') as HTMLElement;
          const icon = accordion.querySelector('.button-icon');
          if (!top || !bottom) return;

          // Set default state: first is open, others closed
          if (idx === 0) {
            (accordion as any)._isOpen = true;
            gsap.set(bottom, { height: 'auto' });
            if (icon) gsap.set(icon, { rotate: 45 });
          } else {
            (accordion as any)._isOpen = false;
            gsap.set(bottom, { height: 0 });
            if (icon) gsap.set(icon, { rotate: 0 });
          }

          const handleClick = () => {
            const isCurrentlyOpen = !!(accordion as any)._isOpen;
            if (isCurrentlyOpen) {
              closeAccordion(accordion);
            } else {
              // Close all other accordions
              accordions.forEach(otherAcc => {
                if (otherAcc !== accordion && (otherAcc as any)._isOpen) {
                  closeAccordion(otherAcc);
                }
              });
              openAccordion(accordion);
            }
          };

          top.addEventListener('click', handleClick);
          (accordion as any)._handleClick = handleClick;
          (accordion as any)._topEl = top;
        });
      });
    }

    return () => {
      if (cleanupLoopingWords) cleanupLoopingWords();
      
      // Cleanup click listeners
      if (processContainer) {
        const accordions = processContainer.querySelectorAll('.section-process .dropdown-accordion');
        accordions.forEach((accordion) => {
          const act = accordion as any;
          if (act._topEl && act._handleClick) {
            act._topEl.removeEventListener('click', act._handleClick);
          }
        });
      }
    };
  }, [mounted]);

  return (
    <main ref={containerRef} className="bg-background text-white min-h-screen font-sans selection:bg-[#7567EE] selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        {/* Render HTML blocks */}
        {mounted ? <div dangerouslySetInnerHTML={{ __html: HERO_ABOUT_HTML }} /> : <div />}

        {/* Checkered flags marquee */}
        <section data-gsap="marquee" className="section-check-marquee w-full overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes aboutMarqueeCheckers {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .animate-about-checkers {
              display: flex;
              width: max-content;
              animation: aboutMarqueeCheckers 25s linear infinite;
            }
          `}} />
          <div className="ticker-section w-full">
            <div className="ticker-component align-center w-full">
              <div className="ticker-main overflow-hidden flex flex-row">
                <div className="animate-about-checkers">
                  {Array.from({ length: 30 }).map((_, idx) => (
                    <div key={idx} className="square-ornament flex flex-row">
                      <div className="square" />
                      <div className="square is--black" />
                      <div className="square is--black" />
                      <div className="square" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {mounted ? <div dangerouslySetInnerHTML={{ __html: STACK_HTML }} /> : <div />}

        <SectionCrosses dark={false} />

        {mounted ? <div dangerouslySetInnerHTML={{ __html: CERTIFIED_HTML }} /> : <div />}

        {mounted ? <div dangerouslySetInnerHTML={{ __html: PROCESS_HTML }} /> : <div />}

        <SectionCrosses dark={true} />

        <Testimonials />

        <SectionCrosses dark={false} />

        <AboutEnhancements />

        <SectionCrosses dark={false} />

        <Faq />

        <PremiumFooter />
      </div>
    </main>
  );
}
