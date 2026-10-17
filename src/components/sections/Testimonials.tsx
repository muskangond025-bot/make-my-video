"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const testimonials = [
  {
    name: "Sanam Arora",
    role: "Founder",
    company: "NISAU UK",
    quote: "We could not have asked for a better videography and photography team.",
    subQuote: "We've done a phenomenal tour across eight cities in India. And I could not have asked for a better videography and photography team than Make My Vid. I'm going to keep reusing their services not just in India but also for our high-profile events in UK as well.",
    avatar: "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed813bd21e_logo50.jpg",
    photo: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png"
  },
  {
    name: "Akshay Dujodwala",
    role: "Founder",
    company: "Mangalam Brands & Campure",
    quote: "We're still using those videos four years later because they were so good and crisp.",
    subQuote: "I've known Rohan since 2021 and have worked with him on a number of projects together. Rohan made for us our Amazon product videos. We're still using those videos four years later because they were so good and crisp.",
    avatar: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8afca1dfc_logo29.jpg",
    photo: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png"
  },
  {
    name: "Siddharta",
    role: "Founder",
    company: "Pipal Tree",
    quote: "All these short films have been made with great sensitivity, shown all over the world.",
    subQuote: "He's been a person who has made some wonderful videos for us, mainly on sustainable development. All these short films have been made with great sensitivity. And we show it to people all over the world.",
    avatar: "https://storage.googleapis.com/mkv_imagesbackend/logos/675e8c40d1cbb_logo36.jpg",
    photo: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959876_13.png"
  },
  {
    name: "Amanda Martin",
    role: "Founder",
    company: "SignBee Academy, USA",
    quote: "Never been so impressed with an editor's work as much as I am with Make My Vid.",
    subQuote: "I have never been so impressed with an editor's work as much as I am with Make My Vid team. They are thorough, reliable, and consistent with all of the work that they complete.",
    avatar: "https://storage.googleapis.com/mkv_imagesbackend/logos/675ed8566fc19_logo53.jpg",
    photo: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png"
  }
];

const TestimonialQuote = ({ text }: { text: string; active?: boolean }) => {
  return (
    <div className="slider-text-large leading-[1.15]">
      <p className="m-0 font-heading text-2xl sm:text-3xl lg:text-4xl text-[#141416] dark:text-[#EAE3DB] uppercase tracking-tight font-bold">
        "{text}"
      </p>
    </div>
  );
};

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = testimonialsRef.current;
    if (!el) return;

    // Stagger reveal tagline, photo stack, quote content, and arrows
    const tagline = el.querySelector('.top-tagline');
    const photoStack = el.querySelector('.left-wrapper');
    const swiperContent = el.querySelector('.swiper.is-content');
    const arrows = el.querySelector('.arrows');

    const targets = [tagline, photoStack, swiperContent, arrows].filter(Boolean);

    gsap.set(targets, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          overwrite: "auto"
        });
      },
      onLeaveBack: () => {
        gsap.to(targets, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.in",
          overwrite: "auto"
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  // Arrow button hover scale and shift animations
  const handleArrowMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget.querySelector('.arrow-btn');
    if (btn) {
      gsap.to(btn, { scale: 1.15, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleArrowMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget.querySelector('.arrow-btn');
    if (btn) {
      gsap.to(btn, { scale: 1.0, duration: 0.3, ease: 'power2.out' });
    }
  };

  // Card mouse-move hover interactive physics (Tilt and shift)
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      rotateY: x * 0.08,
      rotateX: -y * 0.08,
      x: x * 0.12,
      y: y * 0.12,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handlePhotoMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)"
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (isMobile) {
    return (
      <section id="testimonials" className="section-testimonials-mobile w-full bg-[#211747] text-[#F3EBDD] py-16">
        <div className="padding-global">
          <div className="container-large">
            <div className="testimonials-inner">
              
              {/* Tagline */}
              <div className="top-tagline">
                <div className="text-size-regular text-[#B9A1F7] text-weight-medium">WHAT OTHERS</div>
                <div className="plus-icon w-embed text-[#B9A1F7]">
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5083 11.7651V0.197266H12.8586V9.46042L9.01862 12.8732H0.5V18.369H11.9317L18.5083 11.7651Z" fill="currentColor"/>
                    <path d="M14.4917 20.6294L14.4917 32.1973L20.1414 32.1973L20.1414 22.9341L23.9814 19.5214L32.5 19.5214L32.5 14.0255L21.0683 14.0255L14.4917 20.6294Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-size-regular text-[#F3EBDD] text-weight-medium">SAY ABOUT MAKE MY VID</div>
              </div>

              {/* Slider View */}
              <div className="testimonial-slider w-full mt-10">
                <div className="flex flex-col gap-8">
                  {testimonials.map((t, idx) => (
                    <div 
                      key={idx}
                      className="flex flex-col gap-6"
                      style={{ display: activeIndex === idx ? 'flex' : 'none' }}
                    >
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white p-4 relative flex items-center justify-center border border-[#B9A1F7]/25 shadow-xl">
                        <img src={t.photo} alt={t.name} className="w-full h-full object-contain rounded-xl" />
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <p className="text-2xl text-[#F3EBDD] font-heading uppercase leading-tight">
                          {t.quote}
                        </p>
                        <p className="text-[#F3EBDD]/70 text-sm leading-relaxed">
                          "{t.subQuote}"
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#B9A1F7]/30" />
                          <div className="flex flex-col">
                            <span className="text-[#F3EBDD] text-sm font-semibold uppercase">{t.name}</span>
                            <span className="text-[#B9A1F7] text-xs uppercase">{t.role} • {t.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Dot Indicators / Navigation */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex gap-2">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIndex(idx)}
                          className="w-2.5 h-2.5 rounded-full transition-colors"
                          style={{ backgroundColor: activeIndex === idx ? '#ffffff' : 'rgba(255,255,255,0.2)' }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button onClick={(e) => { e.preventDefault(); setActiveIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1); }} className="text-white text-sm uppercase">PREV</button>
                      <button onClick={(e) => { e.preventDefault(); setActiveIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1); }} className="text-white text-sm uppercase">NEXT</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Slider Split layout
  return (
    <div ref={testimonialsRef} id="testimonials" className="section-testimonials-wrap w-full relative py-12 md:py-20 overflow-visible">
      <section className="section-testimonials w-full relative overflow-visible">
        <div className="padding-global align-center">
          <div className="container-large align-center">
            <div data-reveal-group="" className="testimonials-inner !h-auto !min-h-[560px] !overflow-visible !py-4">
              
              {/* Top Tagline with High Contrast */}
              <div className="top-tagline flex items-center justify-center gap-3">
                <div className="text-size-regular text-[#7567EE] text-weight-bold">WHAT OTHERS</div>
                <div className="plus-icon w-embed text-[#7567EE]">
                  <svg width="24" height="24" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5083 11.7651V0.197266H12.8586V9.46042L9.01862 12.8732H0.5V18.369H11.9317L18.5083 11.7651Z" fill="currentColor"/>
                    <path d="M14.4917 20.6294L14.4917 32.1973L20.1414 32.1973L20.1414 22.9341L23.9814 19.5214L32.5 19.5214L32.5 14.0255L21.0683 14.0255L14.4917 20.6294Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-size-regular text-[#141416] dark:text-[#EAE3DB] text-weight-bold">SAY ABOUT MAKE MY VID</div>
              </div>

              {/* Main Testimonials Slider Frame */}
              <div className="testimonial-slider overflow-visible">
                <div className="slider_wrap overflow-visible">
                  
                  {/* Left Stacked photos */}
                  <div className="slider_left">
                    <div className="expertise-left">
                      <div 
                        className="left-wrapper is--testimonial"
                      >
                        
                        <div className="swiper is-photos w-dyn-list">
                          <div className="swiper-wrapper is-photos w-dyn-items">
                            {testimonials.map((t, idx) => {
                              const diff = (idx - activeIndex + testimonials.length) % testimonials.length;
                              let zIndex = 1;
                              let scale = 0.85;
                              let rotate = 0;
                              let tx = 0;
                              let ty = 0;
                              let opacity = 0;

                              if (diff === 0) {
                                zIndex = 5;
                                scale = 1;
                                rotate = 0;
                                opacity = 1;
                              } else if (diff === 1) {
                                zIndex = 4;
                                scale = 0.95;
                                rotate = 4;
                                tx = 10;
                                ty = 4;
                                opacity = 0.8;
                              } else if (diff === 2) {
                                zIndex = 3;
                                scale = 0.9;
                                rotate = -4;
                                tx = -10;
                                ty = 6;
                                opacity = 0.6;
                              }

                              return (
                                <div 
                                  key={idx}
                                  className="swiper-slide is-photos w-dyn-item flex items-center justify-center p-6"
                                  style={{
                                    zIndex,
                                    transform: `scale(${scale}) rotate(${rotate}deg) translate(${tx}px, ${ty}px)`,
                                    opacity,
                                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease',
                                    position: 'absolute',
                                    inset: '0%',
                                    borderRadius: '32px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    backgroundColor: '#ffffff'
                                  }}
                                >
                                  <img 
                                    src={t.photo} 
                                    alt={t.name} 
                                    className="w-full h-full object-contain rounded-2xl" 
                                    style={{ backgroundColor: '#ffffff' }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Dashed Outline Frame Corners */}
                        <div className="card-corners-wrapper">
                          <div className="corners">
                            <div className="frame-corner" />
                            <div className="frame-corner is--2" />
                            <div className="frame-corner is--3" />
                            <div className="frame-corner is--4" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Right Content Quote & Info */}
                  <div className="slider_right relative !overflow-visible !min-h-[460px] !pb-24">
                    <div className="swiper is-content w-dyn-list">
                      <div className="swiper-wrapper is-content w-dyn-items">
                        {testimonials.map((t, idx) => (
                          <div 
                            key={idx} 
                            className="swiper-slide is-content w-dyn-item"
                            style={{
                              opacity: activeIndex === idx ? 1 : 0,
                              visibility: activeIndex === idx ? 'visible' : 'hidden',
                              transform: activeIndex === idx ? 'translateX(0px)' : 'translateX(30px)',
                              transition: 'opacity 0.6s ease, transform 0.6s ease, visibility 0.6s',
                              position: activeIndex === idx ? 'relative' : 'absolute',
                              inset: activeIndex === idx ? 'auto' : '0% 0% 0% 0%'
                            }}
                          >
                            
                            {/* Animated Large Highlight Quote */}
                            <div className="slider-title">
                              <TestimonialQuote text={t.quote} active={activeIndex === idx} />
                            </div>

                            {/* Sub Quote description text */}
                            <div className="slider-info-middle mt-4">
                              <p className="text-size-regular text-[#4A4658] dark:text-[#EAE3DB]/80 leading-relaxed font-sans text-sm md:text-base">
                                "{t.subQuote}"
                              </p>
                            </div>

                            {/* Author info & avatar */}
                            <div className="testimonial-author-wrapper mt-6">
                              <div 
                                className="testimonial-author-image border border-[#7567EE]/30"
                                style={{ backgroundImage: `url(${t.avatar})` }}
                              />
                              <div className="blog-author-text">
                                <div className="text-size-small text-[#141416] dark:text-[#EAE3DB] font-bold text-style-allcaps">
                                  {t.name}
                                </div>
                                <div className="blog-date-wrapper flex items-center gap-2 mt-1">
                                  <div className="text-size-tiny text-[#7567EE] font-bold text-style-allcaps">
                                    {t.role}
                                  </div>
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#7567EE]" />
                                  <div className="text-size-tiny text-[#4A4658] dark:text-[#EAE3DB]/70 font-medium text-style-allcaps">
                                    {t.company}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Big Quote symbol indicator */}
                            <div className="quote-vector w-embed text-[#7567EE]/20">
                              <svg width="69" height="65" viewBox="0 0 69 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.6364 37.8443V0.197266H69V37.8443L62.1 64.1973H46.1045L52.6909 37.8443H37.6364ZM0 37.8443V0.197266H31.3636V37.8443L24.4636 64.1973H8.46818L15.0545 37.8443H0Z" fill="currentColor"/>
                              </svg>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation control arrows - Positioned safely above bottom border */}
                    <div className="arrows !absolute !bottom-2 !right-2 !z-50 !flex !items-center !gap-3 !p-1.5 !rounded-full !bg-[#E3DCDB] dark:!bg-[#1E1E24] !border !border-[#141416]/10 dark:!border-white/10 !shadow-md">
                      <a 
                        href="#" 
                        onClick={handlePrev} 
                        onMouseEnter={handleArrowMouseEnter}
                        onMouseLeave={handleArrowMouseLeave}
                        className="arrow is-left w-inline-block"
                        aria-label="Previous testimonial"
                      >
                        <div data-wf--button-arrow--direction="previous" className="arrow-btn">
                          <div className="arrow-icon w-variant-7134e1bf-4f83-3817-89f3-2de83b852b90 w-embed">
                            <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a 
                        href="#" 
                        onClick={handleNext} 
                        onMouseEnter={handleArrowMouseEnter}
                        onMouseLeave={handleArrowMouseLeave}
                        className="arrow is-right w-inline-block"
                        aria-label="Next testimonial"
                      >
                        <div data-wf--button-arrow--direction="next" className="arrow-btn">
                          <div className="arrow-icon w-embed">
                            <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
