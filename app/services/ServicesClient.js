'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../Components/Footer';

const ServicesClient = ({ servicesData, serviceCategories, caseStudies }) => {
  const heroRef = useRef(null);
  const serviceCategoriesRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  
  const handleCategoryClick = (categoryId) => {
    setSelectedService(selectedService === categoryId ? null : categoryId);
    
    setTimeout(() => {
      const servicesSection = document.querySelector('.services-grid-section');
      if (servicesSection) {
        const offset = 100;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const displayedServices = selectedService 
    ? servicesData.filter(service => service.id === selectedService)
    : servicesData;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.hero-title',
      { opacity: 0, y: 80, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out', stagger: 0.15 }
    );

    heroTl.fromTo('.hero-subtitle',
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out', stagger: 0.08 },
      1
    );

    gsap.utils.toArray('.service-card').forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const image = card.querySelector('.service-image');
      if (image) {
        gsap.to(image, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      }

      const subServices = card.querySelectorAll('.sub-service-item');
      gsap.fromTo(subServices,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    const caseStudyCards = document.querySelectorAll('.case-study-card');
    if (caseStudyCards.length > 0) {
      gsap.fromTo('.case-study-card',
        { y: 40, scale: 0.98 },
        {
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.case-studies-section',
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-0 left-0 w-20 h-20 sm:w-40 sm:h-40 border-l-2 border-t-2 border-black opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-40 sm:h-40 border-r-2 border-b-2 border-black opacity-20"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
          <div className="hero-title mb-6 sm:mb-8">
            <div className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black leading-none tracking-tighter text-black opacity-10 select-none">11+</div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black -mt-10 sm:-mt-16 lg:-mt-24">Services</div>
          </div>
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
              <div className="hero-title text-black mb-2">COMPREHENSIVE</div>
              <div className="hero-title text-black mb-2">TECHNOLOGY</div>
              <div className="hero-title text-black relative inline-block">SOLUTIONS<div className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></div></div>
            </h1>
          </div>
          <div className="hero-subtitle mb-12 sm:mb-16">
            <p className="text-base sm:text-lg lg:text-xl text-black font-light tracking-wide leading-relaxed max-w-2xl mx-auto px-4">
              From AI-powered innovation to enterprise infrastructure,<br className="hidden sm:block"/>
              <span className="font-semibold">we deliver solutions that transform businesses.</span>
            </p>
          </div>
          <div ref={serviceCategoriesRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 max-w-4xl mx-auto px-2">
            {serviceCategories.map((category) => (
              <Link key={category.id} href="/contact" className={`hero-subtitle relative block overflow-hidden px-3 py-4 sm:px-4 sm:py-5 border transition-all duration-300 cursor-pointer group ${selectedService === category.id ? 'bg-black text-white border-black' : 'border-black/20 hover:bg-black hover:text-white'}`}>
                <div className="relative h-5 sm:h-6 flex items-center justify-center">
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full opacity-100 group-hover:opacity-0 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider">{category.name}</span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider">Connect Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="services-grid-section py-12 sm:py-20 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-40">
          {displayedServices.map((service, index) => (
            <div key={service.id} id={`service-${service.id}`} className="service-card relative scroll-mt-32">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-12 items-center relative z-10`}>
                <div className="w-full lg:w-1/2 group">
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[550px] overflow-hidden rounded-xl shadow-2xl">
                    <div className={`image-overlay absolute inset-0 bg-linear-to-br ${service.gradient} opacity-30 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-15`}></div>
                    <Image src={service.image} alt={service.title} fill className="service-image object-cover transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 rounded-xl border border-black/5"></div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="service-title text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight tracking-tighter">{service.title}</h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-10 leading-relaxed font-light">{service.description}</p>
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 sm:mb-6 opacity-50">What We Offer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {service.subServices.map((subService, idx) => (
                        <Link key={idx} href="/contact" className="sub-service-item block group/item py-2">
                          <div className="relative overflow-hidden">
                            <div className="flex items-center gap-2 sm:gap-3 transition-transform duration-300 group-hover/item:-translate-y-full">
                              <div className="w-1.5 h-1.5 bg-black rounded-full shrink-0"></div>
                              <span className="text-sm sm:text-base text-gray-800 font-medium">{subService}</span>
                            </div>
                            <div className="absolute inset-0 flex items-center gap-2 sm:gap-3 transition-transform duration-300 translate-y-full group-hover/item:translate-y-0">
                              <span className="text-sm sm:text-base text-black font-bold">Connect Now →</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tighter">HOW ENGAGEMENT WORKS</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">A streamlined process designed for clarity, collaboration, and exceptional results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">1</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">Discovery & Consultation</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">We start with a deep dive into your business goals, challenges, and technical requirements. This ensures we align our solutions with your vision from day one.</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">2</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">Strategy & Planning</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">Our team crafts a detailed roadmap, defining milestones, timelines, and deliverables. You&apos;ll have complete visibility into the project scope and execution plan.</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">3</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">Development & Iteration</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">We build in sprints with continuous feedback loops. Regular check-ins ensure the solution evolves with your needs and maintains the highest quality standards.</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">4</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">Launch & Support</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">After rigorous testing, we deploy your solution and provide ongoing support. Our partnership doesn&apos;t end at launch—we&apos;re here for the long term.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-16 sm:mt-20">
            <Link href="/contact" className="inline-block px-8 sm:px-10 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-900 transition-all duration-300 cursor-pointer">Start Your Project</Link>
          </div>
        </div>
      </section>

      <section className="case-studies-section relative py-20 sm:py-32 px-4 sm:px-6 lg:px-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white" style={{ fontFamily: 'var(--font-heading)' }}>Explore Our Work</h2>
            <Link href="/projects" className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group cursor-pointer">
              View Projects
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {caseStudies.map((study) => (
              <Link key={study.id} href={study.link || '/projects'} className={`case-study-card block bg-white ${study.roundedCorner} overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}>
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image src={study.image} alt={study.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-wider mb-3 sm:mb-4 text-black opacity-60" style={{ fontFamily: 'var(--font-descriptive)' }}>{study.category}</p>
                  <h3 className="text-xl sm:text-2xl font-medium text-black leading-tight" style={{ fontFamily: 'var(--font-descriptive)' }}>{study.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesClient;
