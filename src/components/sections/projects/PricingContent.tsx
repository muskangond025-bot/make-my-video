"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export const PricingContent = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const [billingCycle, setBillingCycle] = useState<'yearly' | '3year'>('yearly');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    attendance: true,
    payroll: true,
    apps: true,
    documents: true,
    employee: true,
    meetings: true,
    admin: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Category Toggle handler
  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  // Pricing prices definition
  const plans = [
    {
      name: "Essential Plan",
      subtitle: "Only Web",
      badge: "Essential Plan",
      yearlyPrice: 70,
      threeYearPrice: 56,
      ctaLabel: "Get Started",
      featured: false
    },
    {
      name: "Professional Plan",
      subtitle: "Web • Android • iOS",
      badge: "Professional Plan",
      yearlyPrice: 120,
      threeYearPrice: 96,
      ctaLabel: "Get Started",
      featured: true
    },
    {
      name: "Enterprise Plan",
      subtitle: "Web • Android • iOS",
      badge: "Enterprise Plan",
      yearlyPrice: 250,
      threeYearPrice: 200,
      ctaLabel: "Get Started",
      featured: false
    }
  ];

  // Feature rows definition
  const featureGroups = [
    {
      id: "attendance",
      title: "Attendance Management",
      features: [
        { name: "AI-powered face recognition", essential: true, professional: true, enterprise: true },
        { name: "Selfie & location-based attendance", essential: false, professional: true, enterprise: true },
        { name: "Real-time GPS location tracking", essential: false, professional: false, enterprise: true },
        { name: "Geo-fencing with alerts", essential: false, professional: false, enterprise: true },
        { name: "Offline attendance tracking", essential: false, professional: true, enterprise: true },
        { name: "Real-time attendance sync", essential: true, professional: true, enterprise: true },
        { name: "Attendance reports & analytics", essential: true, professional: true, enterprise: true },
        { name: "Late mark / half-day calculation", essential: true, professional: true, enterprise: true }
      ]
    },
    {
      id: "payroll",
      title: "Payroll Management",
      features: [
        { name: "Complete payroll/salary management", essential: true, professional: true, enterprise: true },
        { name: "Automated pay slip generation", essential: true, professional: true, enterprise: true },
        { name: "Overtime calculation", essential: true, professional: true, enterprise: true },
        { name: "Statutory calculations (PF, ESI, PT, TDS)", essential: true, professional: true, enterprise: true }
      ]
    },
    {
      id: "apps",
      title: "Apps & Platforms",
      features: [
        { name: "iOS & Android admin app", essential: true, professional: true, enterprise: true },
        { name: "Employee self-service mobile app", essential: false, professional: true, enterprise: true },
        { name: "Web dashboard", essential: true, professional: true, enterprise: true }
      ]
    },
    {
      id: "documents",
      title: "Document & Asset Management",
      features: [
        { name: "Employee document storage", essential: true, professional: true, enterprise: true },
        { name: "Employee self-access to documents", essential: false, professional: true, enterprise: true },
        { name: "Assets management system", essential: true, professional: true, enterprise: true }
      ]
    },
    {
      id: "employee",
      title: "Employee Self-Service",
      features: [
        { name: "Task management", essential: false, professional: true, enterprise: true },
        { name: "Leave management & applications", essential: false, professional: true, enterprise: true },
        { name: "Attendance regularization", essential: false, professional: true, enterprise: true },
        { name: "Expense claims & reimbursements", essential: false, professional: true, enterprise: true },
        { name: "Ticket & grievance management", essential: false, professional: true, enterprise: true },
        { name: "Holiday calendar", essential: false, professional: true, enterprise: true },
        { name: "Employee directory", essential: false, professional: true, enterprise: true }
      ]
    },
    {
      id: "meetings",
      title: "Meeting & Client Management",
      features: [
        { name: "External meeting management", essential: false, professional: true, enterprise: true },
        { name: "Client meeting history", essential: false, professional: true, enterprise: true }
      ]
    },
    {
      id: "admin",
      title: "Admin & Reporting",
      features: [
        { name: "Multi-admin access control", essential: true, professional: true, enterprise: true },
        { name: "Smart notifications & alerts", essential: true, professional: true, enterprise: true },
        { name: "Company announcements", essential: false, professional: true, enterprise: true },
        { name: "Advanced reporting dashboard", essential: true, professional: true, enterprise: true },
        { name: "Export reports (PDF, Excel, CSV)", essential: true, professional: true, enterprise: true }
      ]
    }
  ];

  // Benefits definition
  const benefits = [
    {
      title: "Centralized Database",
      desc: "Single source of truth for all employee data with instant access and real-time updates.",
      icon: (
        <svg className="w-8 h-8 text-primary-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="5" rx="1" />
          <rect x="3" y="11" width="18" height="5" rx="1" />
          <rect x="3" y="19" width="18" height="5" rx="1" />
          <circle cx="6" cy="5.5" r="0.5" fill="currentColor" />
          <circle cx="6" cy="13.5" r="0.5" fill="currentColor" />
          <circle cx="6" cy="21.5" r="0.5" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Lightning Fast",
      desc: "Cloud-powered performance with instant sync across all devices and platforms.",
      icon: (
        <svg className="w-8 h-8 text-primary-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="none" />
        </svg>
      )
    },
    {
      title: "24/7 Support",
      desc: "Dedicated customer success team via call, WhatsApp, and email support.",
      icon: (
        <svg className="w-8 h-8 text-primary-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      )
    },
    {
      title: "Scalable Solution",
      desc: "Grows seamlessly from 10 to 10,000+ employees with unlimited scalability.",
      icon: (
        <svg className="w-8 h-8 text-primary-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      )
    }
  ];

  // GSAP Entrance Animations
  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Stagger reveal the benefit cards
      const benefitCards = containerRef.current?.querySelectorAll('.benefit-card');
      if (benefitCards) {
        gsap.fromTo(benefitCards,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '.section-benefits',
              start: 'top 85%',
            }
          }
        );
      }

      // Spotlight effect setup on benefit cards
      benefitCards?.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const c = card as HTMLElement;
          const rect = c.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          c.style.setProperty('--mouse-x', `${x}px`);
          c.style.setProperty('--mouse-y', `${y}px`);
        };
        card.addEventListener('mousemove', handleMouseMove as any);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pricing-content-wrapper w-full bg-background" style={{ color: isDark ? '#ffffff' : '#101010' }}>
      
      {/* 1. Compare Plans & Features Section */}
      <section className="section-compare-pricing py-24 border-t border-black/10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Subscription Models
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase leading-[0.9]" style={{ color: isDark ? '#ffffff' : '#101010' }}>
              Compare Plans & <span className="text-shadow-glow">Features</span>
            </h2>
            <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(16, 16, 16, 0.7)' }}>
              Find the perfect fit for your organization's needs. <br className="hidden md:inline" />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(16,16,16,0.5)' }}>(No Hidden Costs or Surprised Prices)</span>
            </p>

            {/* Yearly / 3-Years Toggle Switch */}
            <div className="pricing-toggle-wrapper mt-4 flex items-center justify-center p-1 border rounded-full" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(16,16,16,0.03)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,16,16,0.1)' }}>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-primary-red text-white shadow-lg shadow-[#0C329E]/20'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => setBillingCycle('3year')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-300 ${
                  billingCycle === '3year'
                    ? 'bg-primary-red text-white shadow-lg shadow-[#0C329E]/20'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                3 Years
                <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-black text-white">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid Overview for Desktop/Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {plans.map((plan, index) => {
              const currentPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.threeYearPrice;
              const hasDiscount = billingCycle === '3year';
              
              return (
                <div
                  key={index}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-500 ${
                    plan.featured 
                      ? (isDark ? 'ring-2 ring-primary-red bg-white/[0.04]' : 'ring-2 ring-primary-red bg-black/[0.02]')
                      : (isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.01] border-black/10')
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-red text-[10px] font-black tracking-widest text-white px-4 py-1.5 rounded-full uppercase shadow-lg shadow-black/20">
                      Most Popular
                    </span>
                  )}

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(16, 16, 16, 0.5)' }}>
                        {plan.badge}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight" style={{ color: isDark ? '#ffffff' : '#101010' }}>{plan.name}</h3>
                      <span className="text-xs" style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(16, 16, 16, 0.6)' }}>{plan.subtitle}</span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        {hasDiscount && (
                          <span className="text-lg font-bold line-through" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(16, 16, 16, 0.4)' }}>
                            ₹{plan.yearlyPrice}
                          </span>
                        )}
                        <span className="text-4xl md:text-5xl font-heading font-black text-primary-red">
                          ₹{currentPrice}
                        </span>
                        <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(16, 16, 16, 0.6)' }}>/employee/month</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase mt-2" style={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(16, 16, 16, 0.5)' }}>
                        {billingCycle === 'yearly' ? 'Billed Annually' : 'Billed Every 3 Years'}
                      </span>
                    </div>
                  </div>

                  <Link href="/support" className="mt-8">
                    <button
                      className={`w-full py-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                        plan.featured
                          ? 'bg-primary-red text-white hover:bg-primary-red/90 hover:scale-[1.02]'
                          : 'border hover:scale-[1.02] transition-all duration-300'
                      }`}
                      style={plan.featured ? {} : {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(16, 16, 16, 0.05)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 16, 16, 0.15)',
                        color: isDark ? '#ffffff' : '#101010'
                      }}
                    >
                      {plan.ctaLabel}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pricing Feature Matrix Table */}
          <div className="w-full overflow-x-auto rounded-2xl border shadow-2xl" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(16, 16, 16, 0.01)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16, 16, 16, 0.1)' }}>
            <table className="w-full border-collapse text-left min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,16,16,0.1)', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(16, 16, 16, 0.02)' }}>
                  <th className="py-6 px-6 text-sm font-bold tracking-wider uppercase w-[40%]" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(16,16,16,0.6)' }}>Features</th>
                  <th className="py-6 px-6 text-sm font-bold tracking-wider text-gray-600 uppercase text-center w-[20%]">Essential</th>
                  <th className="py-6 px-6 text-sm font-bold tracking-wider text-gray-600 uppercase text-center w-[20%]">Professional</th>
                  <th className="py-6 px-6 text-sm font-bold tracking-wider text-gray-600 uppercase text-center w-[20%]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureGroups.map((group) => {
                  const isExpanded = expandedCategories[group.id];
                  
                  return (
                    <React.Fragment key={group.id}>
                      {/* Header Category Row */}
                      <tr
                        onClick={() => toggleCategory(group.id)}
                        className="border-b transition-colors cursor-pointer select-none"
                        style={{
                          borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(16, 16, 16, 0.05)',
                          backgroundColor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(16, 16, 16, 0.01)'
                        }}
                      >
                        <td colSpan={4} className="py-4 px-6 text-xs font-bold tracking-widest text-primary-red uppercase">
                          <div className="flex justify-between items-center w-full">
                            <span>{group.title}</span>
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </td>
                      </tr>

                      {/* Feature rows in this category */}
                      {isExpanded && group.features.map((feature, idx) => (
                        <tr key={idx} className="border-b transition-colors" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(16,16,16,0.05)' }}>
                          <td className="py-4 px-6 text-sm" style={{ color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(16, 16, 16, 0.8)' }}>{feature.name}</td>
                          
                          {/* Essential Cell */}
                          <td className="py-4 px-6 text-center">
                            {feature.essential ? (
                              <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(16,16,16,0.3)' }} className="font-bold">—</span>
                            )}
                          </td>

                          {/* Professional Cell */}
                          <td className="py-4 px-6 text-center">
                            {feature.professional ? (
                              <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(16,16,16,0.3)' }} className="font-bold">—</span>
                            )}
                          </td>

                          {/* Enterprise Cell */}
                          <td className="py-4 px-6 text-center">
                            {feature.enterprise ? (
                              <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(16,16,16,0.3)' }} className="font-bold">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}

                {/* Direct CTA footer links inside table */}
                <tr style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(16, 16, 16, 0.01)' }}>
                  <td className="py-8 px-6"></td>
                  <td className="py-8 px-6 text-center">
                    <Link href="/support">
                      <button 
                        className="px-4 py-2 border rounded-lg text-xs font-bold uppercase transition-all duration-300"
                        style={{
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 16, 16, 0.15)',
                          color: isDark ? '#ffffff' : '#101010',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(16, 16, 16, 0.03)'
                        }}
                      >
                        Get Started
                      </button>
                    </Link>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <Link href="/support">
                      <button className="px-5 py-2.5 bg-primary-red hover:bg-primary-red/90 text-white rounded-lg text-xs font-bold uppercase shadow-lg shadow-black/20 transition-all duration-300">
                        Get Started
                      </button>
                    </Link>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <Link href="/support">
                      <button 
                        className="px-4 py-2 border rounded-lg text-xs font-bold uppercase transition-all duration-300"
                        style={{
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 16, 16, 0.15)',
                          color: isDark ? '#ffffff' : '#101010',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(16, 16, 16, 0.03)'
                        }}
                      >
                        Get Started
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 2. Why Choose HubSched? Section */}
      <section className="section-benefits py-24 border-t border-black/10 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Key Value Proposition
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase leading-[0.9]" style={{ color: isDark ? '#ffffff' : '#101010' }}>
              Why Choose <span className="text-shadow-glow">HubSched?</span>
            </h2>
            <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(16, 16, 16, 0.7)' }}>
              Built for modern businesses with comprehensive HRMS capabilities to automate workforce scale.
            </p>
          </div>

          {/* Grid Layout (spotlight effects) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="benefit-card group relative overflow-hidden rounded-2xl border p-8 flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(16, 16, 16, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 16, 16, 0.1)'
                }}
              >
                {/* Spotlight background */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(232,60,37,0.1), transparent 40%)`
                    }}
                  />
                </div>

                {/* Icon wrapper */}
                <div 
                  className="w-16 h-16 rounded-xl border flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(16, 16, 16, 0.03)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 16, 16, 0.1)'
                  }}
                >
                  {benefit.icon}
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="text-lg font-bold uppercase tracking-tight" style={{ color: isDark ? '#ffffff' : '#101010' }}>{benefit.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(16, 16, 16, 0.7)' }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Ready to Transform Your HR Management? CTA Section */}
      <section className="section-cta py-24 border-t border-black/10 relative bg-gradient-to-br from-[#121212] via-[#101010] to-[#151515]">
        {/* Checkered ornamental marquee divider at background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,60,37,0.03),transparent_40%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white uppercase leading-[0.95]">
            Ready to Transform Your <br />
            <span className="text-primary-red text-shadow-glow">HR Management?</span>
          </h2>
          
          <p className="text-gray-300 max-w-xl text-base md:text-lg leading-relaxed font-sans">
            Join thousands of organizations using HubSched to streamline workforce operations, tracking, and payroll. Start your path today.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Link href="/support">
              <button className="px-8 py-4 bg-primary-red hover:bg-primary-red/90 text-white rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-[#0C329E]/35 hover:scale-[1.02] transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                Book Free Demo
              </button>
            </Link>
            <a href="tel:+918482925926">
              <button className="px-8 py-4 border border-black/10 hover:border-black/20 bg-background/[0.02] text-white rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-background/[0.05] hover:scale-[1.02] transition-all duration-300">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Talk to Sales
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
