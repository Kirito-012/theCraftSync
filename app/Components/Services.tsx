'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileServices from './MobileServices';
import { servicesData, Service } from './servicesData';

gsap.registerPlugin(ScrollTrigger);



const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<Service>(servicesData[0]);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesListRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const handleServiceClick = (service: Service): void => {
    if (service.id === activeService.id) return;

    // Animate out
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveService(service);
      }
    });

    tl.to([descriptionRef.current, detailsRef.current], {
      opacity: 0,
      x: 20,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(iconRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: -15,
      duration: 0.3,
      ease: 'power2.in'
    }, 0);
  };

  // Initial scroll-triggered animations
  useEffect(() => {
    if (!hasAnimated.current) {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Service buttons stagger animation
      if (servicesListRef.current) {
        const buttons = servicesListRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: servicesListRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content area animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      hasAnimated.current = true;
    }
  }, []);

  useEffect(() => {
    // Animate in new content when service changes
    const tl = gsap.timeline();
    
    tl.fromTo([descriptionRef.current, detailsRef.current], 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 }
    )
    .fromTo(iconRef.current,
      { opacity: 0, scale: 0.8, rotation: 15 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
      0
    );
  }, [activeService]);

  return (
    <section className="w-full min-h-screen bg-black text-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight mb-4">
            What We Do
          </h2>
          <div className="w-24 h-1 bg-white"></div>
        </div>

        {/* 3 Column Layout (Desktop) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Service Names */}
          <div ref={servicesListRef} className="lg:col-span-3 space-y-3">
            {servicesData.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 group ${
                  activeService.id === service.id
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm lg:text-base tracking-wide">
                    {service.shortName}
                  </span>
                  <span className={`transition-transform duration-300 ${
                    activeService.id === service.id ? 'translate-x-1' : ''
                  }`}>
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Middle Column - Description & Details */}
          <div ref={contentRef} className="lg:col-span-5 space-y-8">
            <div ref={descriptionRef}>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                {activeService.name}
              </h3>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                {activeService.description}
              </p>
            </div>

            <div ref={detailsRef} className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {activeService.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-900 px-4 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-200">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Link 
                href="/services" 
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column - Icon/Visual */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div
              ref={iconRef}
              className="w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center relative"
            >
              {/* Animated background circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-800 animate-pulse"></div>
              
              {/* Icon */}
              <div className="relative z-10 w-32 h-32 lg:w-40 lg:h-40 text-white">
                {activeService.icon}
              </div>
              
              {/* Decorative rings */}
              <div className="absolute inset-8 rounded-full border border-zinc-700 opacity-30"></div>
              <div className="absolute inset-16 rounded-full border border-zinc-600 opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden mt-8">
          <MobileServices />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;