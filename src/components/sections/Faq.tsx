"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const faqs = [
  {
    category: "Services",
    question: "What services does Make My Vid offer?",
    answer: "At Make My Vid, we provide a comprehensive suite of video production services tailored to meet the unique needs of personal and professional brands. Our expertise includes Corporate Video Production, Event Coverage, Social Documentaries & CSR videos, Product Explainer Videos, Social Media Content Creation, Remote Editing Services, and Custom Animation and Motion Graphics."
  },
  {
    category: "Clients",
    question: "How does Make My Vid cater to both MSMEs and large corporations?",
    answer: "At Make My Vid, we adopt a flexible and scalable approach. For MSMEs and startups, we provide cost-effective solutions focusing on high-impact storytelling, such as Wol3D's Shark Tank pitch. For large corporations like BPCL, CIPLA, and Aditya Birla Capital, we manage complex, multi-location shoots, multi-camera live telecasts, and enterprise-grade video assets."
  },
  {
    category: "Industries",
    question: "What industries does Make My Vid specialize in?",
    answer: "Our expertise spans Corporate and Financial Services (Aditya Birla Capital, Motilal Oswal), Healthcare and Pharmaceuticals (CIPLA), Energy and Infrastructure (BPCL), Smart Home & Tech (Baybot, Wol3D), E-commerce and Retail (Campure, Mangalam Brands), and Education (That Fig Tree, SignBee Academy)."
  },
  {
    category: "Uniqueness",
    question: "What makes Make My Vid unique compared to other video production agencies?",
    answer: "Our uniqueness lies in our customized end-to-end expertise, emotional storytelling, diverse industry track record, cutting-edge cinema equipment, and seamless remote editing collaboration for global clients across the USA, UK, Singapore, and Canada."
  },
  {
    category: "Quality",
    question: "How does Make My Vid ensure high-quality video production across different industries?",
    answer: "We employ industry-specific research, an experienced creative team of cinematographers and motion designers, professional Sony cinema cameras, gimbals, drones, and rigorous quality assurance reviews on Frame.io before final delivery."
  },
  {
    category: "Scale",
    question: "Can Make My Vid handle both large-scale projects and smaller campaigns?",
    answer: "Yes, our adaptable workflow allows us to scale up for nationwide multi-city event documentation at major conventions like India Energy Week, or scale down for agile social media reels, product demos, and quick-turnaround pitch decks."
  },
  {
    category: "Process",
    question: "What is the end-to-end process for creating a video with Make My Vid?",
    answer: "We follow a 6-stage workflow: 1) Initial Consultation & Creative Brief, 2) Concept Development & Scripting, 3) Pre-Production & Logistics, 4) Production with 4K gear, 5) Post-Production (color grading, sound design, motion graphics), and 6) Client Review & Platform Distribution."
  },
  {
    category: "Collaboration",
    question: "How does Make My Vid collaborate with clients during the production process?",
    answer: "We prioritize transparent planning with detailed schedules and storyboards, assign a dedicated project manager, hold virtual syncs on Zoom/Google Meet, and use Frame.io for real-time draft reviews and timestamped feedback."
  },
  {
    category: "Tools & Gear",
    question: "What equipment and software are used for video production and editing?",
    answer: "We utilize Sony A7S III cinema cameras, high-definition prime lenses, gimbals, 4K drones, wireless lavalier microphones, and industry-standard post-production software including Adobe Premiere Pro, After Effects, DaVinci Resolve, and Adobe Audition."
  },
  {
    category: "Remote Editing",
    question: "Does Make My Vid offer remote editing services for international clients?",
    answer: "Yes, we provide comprehensive remote editing for clients across the USA, UK, Canada, and Singapore. We leverage secure cloud storage (Google Drive, Dropbox, Frame.io) and accommodate different time zones to guarantee fast, seamless turnarounds."
  },
  {
    category: "Platforms",
    question: "How does Make My Vid create customized videos for different platforms?",
    answer: "We craft platform-native formats: vertical 9:16 reels for Instagram and TikTok, concise feature-highlight videos optimized for Amazon e-commerce, and high-bitrate 16:9 cinematic productions for YouTube, LinkedIn, and corporate presentations."
  },
  {
    category: "Motion Graphics",
    question: "How does Make My Vid ensure seamless integration of motion graphics?",
    answer: "We integrate custom kinetic typography, 2D/3D motion graphics, brand identity logos, and lower thirds into live footage using Adobe After Effects and Cinema 4D, strictly respecting client branding guidelines."
  },
  {
    category: "Drones & Tech",
    question: "Does Make My Vid offer advanced technologies like drone filming and timelapse?",
    answer: "Yes, our certified operators capture breathtaking 4K aerial drone footage, multi-day dynamic timelapse photography, high-speed slow-motion, and multi-camera live telecasts for large-scale expos and architectural projects."
  },
  {
    category: "Scripting",
    question: "Does Make My Vid assist with scriptwriting and voiceovers?",
    answer: "Absolutely. Our expert creative team writes engaging scripts tailored to your target demographic and coordinates professional voiceover artists across multiple languages, accents, and tones for commercials and explainer videos."
  },
  {
    category: "Turnaround",
    question: "What is the typical turnaround time for a video project?",
    answer: "Turnaround depends on scope: social media reels and remote edits are typically delivered in 2 to 4 days, while full-scale corporate AVs, event documentaries, or multi-city campaigns usually take 2 to 3 weeks."
  },
  {
    category: "Revisions",
    question: "How does Make My Vid handle revisions and client feedback?",
    answer: "We include structured revision rounds in all agreements. Using Frame.io, clients can leave frame-by-frame visual comments directly on the video player, ensuring adjustments are implemented quickly and accurately."
  },
  {
    category: "Coverage",
    question: "Which cities in India does Make My Vid cover for on-ground shoots?",
    answer: "We have active production crews and gear setups across Mumbai, Delhi NCR, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, and can deploy anywhere across India with minimal notice."
  },
  {
    category: "Get Started",
    question: "How do I get a quote or get started with Make My Vid?",
    answer: "You can click 'Get Quote' on our website or visit rohanjoshi.in/support to submit your project requirements. Our team will review your brief and schedule an initial discovery call within 24 hours."
  }
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLImageElement>(null);

  // Accordion Expand/Collapse Animations
  useEffect(() => {
    dropdownRefs.current.forEach((el, index) => {
      if (!el) return;
      const isOpen = openIndex === index;
      
      gsap.to(el, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: isOpen ? "power2.out" : "power2.inOut"
      });
      
      const iconEl = iconRefs.current[index];
      if (iconEl) {
        gsap.to(iconEl, {
          rotate: isOpen ? 45 : 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  }, [openIndex]);

  // Pupil Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!leftPanelRef.current || !pupilRef.current) return;
      
      const rect = leftPanelRef.current.getBoundingClientRect();
      
      // Calculate center coordinates of the eye graphic inside the panel
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      const angle = Math.atan2(dy, dx);
      // Constraint translation within a 22px radius
      const distance = Math.min(Math.hypot(dx, dy), 22); 
      
      const tx = distance * Math.cos(angle);
      const ty = distance * Math.sin(angle);
      
      gsap.to(pupilRef.current, {
        x: tx,
        y: ty,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="section-faq-wrap w-full relative bg-[#F3EBDD] bg-dots-pattern text-[#211747]">
      <div id="faq" className="section-faq w-full relative">
        <div className="padding-global">
          <div className="container-large">
            <div className="faq-padding">
              <div className="faq-inner flex flex-col lg:flex-row items-stretch">
                
                {/* Left Side: Interactive Eye Graphic */}
                <div ref={leftPanelRef} className="faq-left relative overflow-hidden flex-shrink-0 aspect-square lg:aspect-auto rounded-3xl border border-[#211747]/12 bg-[#ECE3D3]/40 shadow-sm">
                  
                  {/* Eye graphic frames */}
                  <div className="image-container is--faq">
                    <img 
                      src="/image-frame-main.svg" 
                      loading="lazy" 
                      alt="Eye Graphic Frame" 
                      className="vector-image opacity-70"
                    />
                    <div className="eye-wrapper">
                      <img 
                        src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077e9c777f1eed3224f_eye-new.svg" 
                        loading="lazy" 
                        alt="Eye Frame Shape" 
                        className="eye-vector"
                      />
                      <img 
                        ref={pupilRef}
                        src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077c922577248f41258_pupil.svg" 
                        loading="lazy" 
                        alt="Pupil Follower" 
                        className="pupil-vector"
                      />
                    </div>
                  </div>

                  {/* Grid background wrap */}
                  <div className="background-grid-wrapper">
                    <img 
                      src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c880774b52bc873ce2eb61_outer-grid-bigger.svg" 
                      loading="lazy" 
                      alt="Background Grid" 
                      className="background-grid-image opacity-15"
                    />
                  </div>

                </div>

                {/* Center Spine Element: Deep Indigo diamond with Lavender icon */}
                <div className="line-block flex flex-col items-center">
                  <div className="square-block is--faq !bg-[#211747] !text-[#B9A1F7] border border-[#B9A1F7]/30 shadow-md">
                    <div className="icon-embed-small w-embed">
                      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.7734 22.3427L41.9995 20.9997L33.7734 19.6573C27.9031 18.6985 23.3015 14.0964 22.3427 8.22612L20.9997 0L19.6567 8.22612C18.6985 14.0964 14.0964 18.6985 8.22612 19.6573L0 20.9997L8.22612 22.3427C14.0964 23.301 18.6985 27.9031 19.6567 33.7739L20.9997 42L22.3427 33.7739C23.3015 27.9031 27.9031 23.301 33.7734 22.3427Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="vertical-line !border-[#211747]/20">
                    <div className="text-size-xxsmall is--rotated text-[#6B6478] font-bold tracking-widest uppercase">
                      FREQUENTLY ASKED QUESTIONS
                    </div>
                  </div>
                </div>

                {/* Right Side: Accordion Questions list */}
                <div data-reveal-group="" className="faq-right flex flex-col">
                  
                  {/* Top Header details */}
                  <div className="faq-top">
                    <h2 className="heading-style-h2 is--larger text-[#211747] font-heading">QUESTIONS?</h2>
                    <p className="text-size-regular text-[#6B6478] mt-4 leading-relaxed font-sans">
                      Here are answers to frequently asked questions about Make My Vid's video production process, remote editing workflows, and technical capabilities.
                    </p>
                  </div>

                  {/* Dropdown accordion wrappers */}
                  <div className="dropdown-accordion-wrap flex flex-col mt-8">
                    {faqs.map((faq, index) => {
                      const isOpen = openIndex === index;
                      
                      return (
                        <div 
                          key={index} 
                          className="dropdown-accordion cursor-pointer border-b border-[#211747]/15 transition-colors duration-200"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          
                          {/* Accordion header click wrapper */}
                          <div className="dropdown-top flex justify-between items-center py-6">
                            <h3 className="heading-style-h3 text-[#211747] text-3xl font-heading uppercase">
                              {faq.category}
                            </h3>
                            <div className="max-width-medium flex-1 px-8 hidden md:block">
                              <p className="text-size-small text-[#6B6478] font-sans leading-tight">
                                {faq.question}
                              </p>
                            </div>
                            <div className="faq-icon flex-shrink-0">
                              <div 
                                ref={el => { iconRefs.current[index] = el; }}
                                className={`button-icon rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 border ${
                                  isOpen 
                                    ? "bg-[#D5FF3F] text-[#211747] border-[#D5FF3F] shadow-[0_0_14px_rgba(213,255,63,0.45)]" 
                                    : "bg-[#211747] text-[#F3EBDD] border-[#211747]/20 hover:bg-[#B9A1F7] hover:text-[#211747]"
                                }`}
                              >
                                <div className="icon-embed-small is--small w-embed">
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8229 10.9879V0.516113H13.2922V9.44325L9.4605 13.2749H0.453125V16.9661H10.8447L16.8229 10.9879Z" fill="currentColor"/>
                                    <path d="M13.1771 19.0121L13.1771 29.4839L16.7078 29.4839L16.7078 20.5568L20.5395 16.7251L29.5469 16.7251L29.5469 13.0339L19.1553 13.0339L13.1771 19.0121Z" fill="currentColor"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Accordion dropdown body */}
                          <div 
                            ref={el => { dropdownRefs.current[index] = el; }}
                            className="dropdown-bottom overflow-hidden h-0 opacity-0"
                          >
                            <div className="margin-top margin-medium pb-8 max-w-xl">
                              <p className="text-size-small text-[#211747] font-sans leading-relaxed md:hidden mb-4 font-semibold">
                                {faq.question}
                              </p>
                              <p className="text-size-tiny text-[#6B6478] font-sans leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkered flags marquee below section-faq in Deep Indigo & Warm Beige */}
      <section data-gsap="marquee" className="section-check-marquee w-full overflow-hidden border-y border-[#211747]/15 bg-[#F3EBDD]">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes faqMarqueeCheckers {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-faq-checkers {
            display: flex;
            width: max-content;
            animation: faqMarqueeCheckers 25s linear infinite;
          }
          .square-ornament .square {
            background-color: #F3EBDD !important;
          }
          .square-ornament .square.is--black {
            background-color: #211747 !important;
          }
        `}} />
        <div className="ticker-section w-full py-2">
          <div className="ticker-component align-center w-full">
            <div className="ticker-main overflow-hidden flex flex-row">
              <div className="animate-faq-checkers">
                {Array.from({ length: 30 }).map((_, idx) => (
                  <div key={idx} className="square-ornament flex flex-row border border-[#211747]/10">
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
    </div>
  );
};
