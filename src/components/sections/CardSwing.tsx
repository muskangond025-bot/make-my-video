"use client";
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const cardsData = [
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png",
    text: "Pan-India video shoots across 8+ major cities with high-end cinema cameras, full crew, and seamless local logistics.",
    tag: "MULTI-CITY PRODUCTION"
  },
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png",
    text: "Global remote editing with frame-accurate cloud reviews, multi-camera sync, color grading, and rapid turnaround.",
    tag: "REMOTE POST-PRODUCTION"
  },
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
    text: "Capturing authentic human impact, sustainability, and corporate stories from Dharavi slums to Karnataka farms.",
    tag: "CORPORATE AV & CSR"
  },
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png",
    text: "Capturing high-energy booths, delegate interviews, and live event atmospheres for leaders like BPCL and Welspun.",
    tag: "TRADE SHOWS & SUMMITS"
  },
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959841_11.png",
    text: "Broadcast multi-camera live telecasts across YouTube, Zoom, and hybrid screens with zero-latency broadcast quality.",
    tag: "LIVE TELECAST OF EVENTS"
  },
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1735391835_CH%2035%20(1).jpg",
    text: "Full-scale commercial visual campaigns for digital, broadcast, and Amazon e-commerce driving millions of views.",
    tag: "BRAND CAMPAIGNS"
  },
  {
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959997_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(2).png",
    text: "Engaging copywriting, concept storyboards, and multi-lingual voiceover casting to articulate your message powerfully.",
    tag: "SCRIPTING & VOICEOVERS"
  }
];

export const CardSwing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinHeightRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinHeightRef.current || !pinRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      setTimeout(() => {
        const cardsContainer = cardsContainerRef.current;
        const pinHeight = pinHeightRef.current;
        const pinEl = pinRef.current;
        if (!cardsContainer || !pinHeight || !pinEl) return;

        const cards = cardsContainer.querySelectorAll<HTMLElement>('.scroll-card');
        if (cards.length === 0) return;

        const calcDistance = () => {
          const scrollWidth = cardsContainer.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, scrollWidth - viewportWidth + 120);
        };

        // 1. Horizontal scroll tween pinned directly for exact scroll distance
        const scrollTween = gsap.to(cardsContainer, {
          x: () => -calcDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            start: 'top top',
            end: () => `+=${calcDistance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          }
        });

        // 2. The Signature 3D Card Swing Animation (playful rotation, float, and tilt)
        cards.forEach((card, index) => {
          const randX = ((index % 3) + 1) * 20;
          const randY = ((index % 2) + 1) * 14;
          const randRot = ((index % 4) - 2) * 10;
          const rotationVal = randRot === 0 ? 10 : randRot;

          gsap.fromTo(
            card,
            {
              rotation: rotationVal,
              xPercent: randX * (index % 2 === 0 ? 1 : -1),
              yPercent: randY * (index % 2 === 0 ? 1 : -1),
            },
            {
              rotation: -rotationVal,
              xPercent: -randX * (index % 2 === 0 ? 1 : -1),
              yPercent: -randY * (index % 2 === 0 ? 1 : -1),
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 120%',
                end: 'right -20%',
                scrub: 0.4,
              }
            }
          );
        });

        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="section-expertise-two w-full bg-[#EAE3DB] dark:bg-[#141416] bg-dots-pattern relative select-none overflow-hidden">
      {/* FULL-WIDTH STICKY PIN CONTAINER - Spans 100vw, NO clipping margins! */}
      <div ref={pinHeightRef} className="card-pin-height w-full relative">
        <div ref={pinRef} className="card-container w-full flex flex-col justify-between py-6">

          {/* Centered Tagline & Header wrapper - Pinned together with cards */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 z-20">
            <div className="title-top-wrap w-full flex flex-col items-center pt-2 pb-2 text-center gap-3">
              <div className="top-tagline flex items-center justify-center gap-4 text-xs font-sans tracking-widest font-semibold uppercase">
                <span className="text-[#141416] dark:text-[#EAE3DB] font-bold">MAKE MY VID</span>
                <div className="plus-icon text-[#7567EE] w-6 h-6 flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5083 11.7651V0.197266H12.8586V9.46042L9.01862 12.8732H0.5V18.369H11.9317L18.5083 11.7651Z" fill="currentColor" />
                    <path d="M14.4917 20.6294L14.4917 32.1973L20.1414 32.1973L20.1414 22.9341L23.9814 19.5214L32.5 19.5214L32.5 14.0255L21.0683 14.0255L14.4917 20.6294Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[#7567EE] font-semibold">PRODUCTION CAPABILITIES</span>
              </div>
              <p className="text-[#4A4658] dark:text-[#EAE3DB]/75 font-sans text-sm md:text-base max-w-[700px] leading-relaxed">
                Discover our comprehensive video production capabilities designed to elevate brands, empower creators, and captivate audiences worldwide.
              </p>
            </div>
          </div>

          {/* Background Ornaments (Circles and Dots) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gradient-final.svg"
            alt=""
            className="hero-bg-dots pointer-events-none select-none"
            style={{ opacity: 0.15, display: "block" }}
          />

          {/* Concentric Circle Backdrops - Forced flex layout to avoid media query display overrides */}
          <div className="hero-bg is--hero !flex pointer-events-none select-none">
            <div className="circle-1" style={{ borderColor: 'rgba(20,20,22,0.06)' }}></div>
            <div className="circle-2" style={{ borderColor: 'rgba(20,20,22,0.06)' }}></div>
            <div className="circle-3" style={{ borderColor: 'rgba(20,20,22,0.06)' }}></div>
            <div className="circle-4" style={{ borderColor: 'rgba(20,20,22,0.06)' }}></div>
            <div className="circle-5" style={{ borderColor: 'rgba(20,20,22,0.06)' }}></div>
          </div>

          {/* Horizontal slider cards track - Total Width */}
          <div
            ref={cardsContainerRef}
            className="cards my-auto"
          >
            {cardsData.map((data, i) => (
              <div key={i} className="scroll-card flex-shrink-0">

                {/* Image wrapper */}
                <div className="scroll-card-image-wrapper spacer-medium">
                  <img
                    src={data.image}
                    alt={data.tag}
                    className="scroll-card-image"
                    loading="eager"
                  />
                </div>

                {/* Card Content details */}
                <div className="scroll-card-inner-wrapper">
                  <p className="text-size-tiny text-color-secondary text-style-wrap">
                    {data.text}
                  </p>
                  <div className="section-tagline is--full">
                    <div className="text-size-large text-weight-bold text-color-white is--title">
                      {data.tag}
                    </div>
                    <div className="icon-embed-medium w-embed">
                      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.667969 22.833C0.667969 16.8656 3.0385 11.1427 7.25807 6.92311C11.4776 2.70354 17.2006 0.333008 23.168 0.333008C29.1353 0.333008 34.8583 2.70354 39.0779 6.92311C43.2974 11.1427 45.668 16.8656 45.668 22.833C45.668 28.8004 43.2974 34.5233 39.0779 38.7429C34.8583 42.9625 29.1353 45.333 23.168 45.333C17.2006 45.333 11.4776 42.9625 7.25807 38.7429C3.0385 34.5233 0.667969 28.8004 0.667969 22.833ZM21.7617 3.36207C19.8773 3.93582 18.007 5.66832 16.4545 8.57926C15.9433 9.54716 15.5034 10.5511 15.1383 11.583H21.7617V3.36207ZM12.1711 11.583C12.6403 10.0892 13.2428 8.6406 13.9711 7.25457C14.4606 6.3369 15.022 5.45947 15.6502 4.63051C12.1659 6.07633 9.16794 8.48873 7.01016 11.583H12.1711ZM10.5342 21.4268C10.6186 18.9602 10.9223 16.5949 11.4117 14.3955H5.37609C4.32998 16.6044 3.70432 18.9888 3.53109 21.4268H10.5342ZM14.3002 14.3955C13.747 16.7012 13.4285 19.0569 13.3495 21.4268H21.7617V14.3955H14.3002ZM24.5742 14.3955V21.4268H32.9836C32.9056 19.057 32.588 16.7013 32.0358 14.3955H24.5742ZM13.3523 24.2393C13.4304 26.609 13.7479 28.9647 14.3002 31.2705H21.7617V24.2393H13.3523ZM24.5742 24.2393V31.2705H32.0358C32.5617 29.1189 32.8964 26.748 32.9864 24.2393H24.5742ZM15.1383 34.083C15.5283 35.1705 15.967 36.1718 16.4545 37.0868C18.007 39.9977 19.8802 41.7274 21.7617 42.3039V34.083H15.1383ZM15.6502 41.0355C15.022 40.2065 14.4606 39.3291 13.9711 38.4114C13.2428 37.0254 12.6403 35.5768 12.1711 34.083H7.01016C9.16445 37.1805 12.1634 39.5938 15.6502 41.0355ZM11.4117 31.2705C10.9039 28.9587 10.6101 26.605 10.5342 24.2393H3.53109C3.70547 26.7424 4.34953 29.1133 5.37609 31.2705H11.4117ZM30.6858 41.0355C34.1725 39.5938 37.1715 37.1805 39.3258 34.083H34.1648C33.6956 35.5768 33.0932 37.0254 32.3648 38.4114C31.8753 39.3291 31.3139 40.2065 30.6858 41.0355ZM24.5742 34.083V42.3039C26.4586 41.7302 28.3289 39.9977 29.8814 37.0868C30.3689 36.1736 30.8077 35.1724 31.1977 34.083H24.5742ZM34.9242 31.2705H40.9598C41.9864 29.1133 42.6305 26.7424 42.8048 24.2393H35.8017C35.7258 26.605 35.4321 28.9587 34.9242 31.2705ZM42.8048 21.4268C42.6316 18.9888 42.006 16.6044 40.9598 14.3955H34.9242C35.4136 16.5949 35.7173 18.9602 35.8017 21.4268H42.8048ZM32.3648 7.25457C33.0595 8.55957 33.6642 10.0108 34.1648 11.583H39.3258C37.1715 8.48548 34.1725 6.07222 30.6858 4.63051C31.2989 5.42926 31.8614 6.31238 32.3648 7.25457ZM31.1977 11.583C30.8326 10.5511 30.3926 9.54716 29.8814 8.57926C28.3289 5.66832 26.4586 3.93863 24.5742 3.36207V11.583H31.1977Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
