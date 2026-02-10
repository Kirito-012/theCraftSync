'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Footer from '../Components/Footer';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const heroRef = useRef(null);
  const serviceCategoriesRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  
  const servicesData = [
    {
      id: 1,
      title: "AI & Machine Learning Solutions",
      description: "Production-ready AI systems built to automate workflows, enable intelligent decision-making, and integrate seamlessly into existing platforms.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      gradient: "from-blue-600/20 to-purple-600/20",
      subServices: [
        "Generative AI Integration",
        "Computer Vision Solutions",
        "AI-Powered Personalization Engines",
        "AI Consulting & Strategy",
        "Intelligent Process Automation"
      ]
    },
    {
      id: 2,
      title: "Enterprise Software Development",
      description: "Scalable, secure enterprise software engineered to support complex business logic, high user loads, and long-term growth.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      gradient: "from-indigo-600/20 to-blue-600/20",
      subServices: [
        "Custom Enterprise Applications",
        "SaaS Platform Development",
        "Legacy System Modernization",
        "Scalable Backend Architecture",
        "Enterprise System Integration",
        "Secure & Compliant Software Systems"
      ]
    },
    {
      id: 3,
      title: "Cloud Infrastructure & DevOps",
      description: "Scalable cloud infrastructure and DevOps workflows that improve deployment speed, system stability, and operational efficiency.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      gradient: "from-cyan-600/20 to-blue-600/20",
      subServices: [
        "Cloud Migration & Modernization",
        "AWS, Azure & Google Cloud Solutions",
        "Serverless Architecture Development",
        "Container Orchestration (Kubernetes, Docker)",
        "CI/CD Pipeline Implementation",
        "Infrastructure as Code (IaC)",
        "Cloud Security & Compliance"
      ]
    },
    {
      id: 4,
      title: "Cross-Platform Mobile Applications",
      description: "High-performance mobile apps for iOS, Android, and web — built from a single scalable codebase.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      gradient: "from-violet-600/20 to-purple-600/20",
      subServices: [
        "Cross-Platform App Development",
        "Native iOS & Android Applications",
        "Progressive Web Applications (PWA)",
        "Mobile Backend & API Services",
        "App Performance & Optimization",
        "App Security & Compliance"
      ]
    },
    {
      id: 5,
      title: "E-Commerce & Digital Commerce Platforms",
      description: "Custom digital commerce platforms designed for performance, personalization, and conversion at scale.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      gradient: "from-emerald-600/20 to-teal-600/20",
      subServices: [
        "Custom E-Commerce Development",
        "Headless Commerce Architecture",
        "Personalization & Recommendation Systems",
        "Payment Gateway Integration",
        "Order Management & Fulfillment Systems",
        "Performance Optimization for Commerce"
      ]
    },
    {
      id: 6,
      title: "Microsoft Power Platform Solutions",
      description: "Rapid, structured solutions using Power Apps, Power Automate, and Power BI to streamline internal workflows.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      gradient: "from-orange-600/20 to-red-600/20",
      subServices: [
        "Power Apps Development",
        "Power Automate Workflow Automation",
        "Power BI Reporting & Dashboards",
        "Enterprise Low-Code Solutions",
        "System Integration with Power Platform",
        "Governance & Security Configuration"
      ]
    },
    {
      id: 7,
      title: "Performance Engineering & SEO Optimization",
      description: "Performance-first development and technical SEO to ensure fast, scalable, and search-ready platforms.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      gradient: "from-pink-600/20 to-rose-600/20",
      subServices: [
        "Application Performance Optimization",
        "Core Web Vitals Optimization",
        "Technical SEO Audits",
        "Scalability & Load Engineering",
        "Search-Ready Architecture Design",
        "Monitoring & Performance Analytics"
      ]
    },
    {
      id: 8,
      title: "Technology Consulting",
      description: "Strategic technology and architecture consulting backed by real engineering execution.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      gradient: "from-slate-600/20 to-gray-600/20",
      subServices: [
        "Technology Architecture Assessment",
        "System & Platform Modernization Strategy",
        "AI & Automation Readiness Consulting",
        "Scalability & Performance Strategy",
        "Cloud & Infrastructure Planning",
        "CTO-Level Technical Advisory"
      ]
    },
    {
      id: 9,
      title: "Social Media Management",
      description: "Purpose-driven social media strategy focused on brand positioning and long-term visibility.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      gradient: "from-fuchsia-600/20 to-pink-600/20",
      subServices: [
        "Brand Positioning & Narrative Strategy",
        "Content Strategy & Planning",
        "Platform-Specific Growth Strategy",
        "B2B & LinkedIn Thought Leadership",
        "Community Building & Engagement",
        "Performance Tracking & Insights",
        "Ad Manager"
      ]
    },
    {
      id: 10,
      title: "Business Consulting",
      description: "Strategic business consulting focused on clarity, systems, and sustainable growth — backed by execution-ready thinking.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      gradient: "from-amber-600/20 to-yellow-600/20",
      subServices: [
        "Process Optimization",
        "Growth Strategy",
        "Digital Transformation",
        "Workflow Design",
        "Market Analysis",
        "Leadership Advisory"
      ]
    }
  ];

  const serviceCategories = [
    { id: 1, name: 'AI & Machine Learning' },
    { id: 2, name: 'Enterprise Software' },
    { id: 3, name: 'Cloud & DevOps' },
    { id: 4, name: 'Mobile Apps' },
    { id: 5, name: 'E-Commerce' },
    { id: 6, name: 'Power Platform' },
    { id: 7, name: 'Performance & SEO' },
    { id: 8, name: 'Tech Consulting' },
    { id: 9, name: 'Social Media' },
    { id: 10, name: 'Business Strategy' }
  ];

  const caseStudies = [
    {
      id: 1,
      category: 'AI, AUTOMATION',
      title: 'AI-Powered Customer Service Platform for Enterprise',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      roundedCorner: 'rounded-tl-[80px]'
    },
    {
      id: 2,
      category: 'E-COMMERCE, CLOUD',
      title: 'Scalable E-Commerce Platform Handling 1M+ Daily Transactions',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      roundedCorner: 'rounded-tr-[80px]'
    },
    {
      id: 3,
      category: 'MOBILE, INNOVATION',
      title: 'Cross-Platform Mobile App with Real-Time Sync',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      roundedCorner: 'rounded-tl-[80px]'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedService(selectedService === categoryId ? null : categoryId);
    
    // Scroll to services section on mobile after a short delay
    setTimeout(() => {
      const servicesSection = document.querySelector('.services-grid-section');
      if (servicesSection) {
        const offset = 100; // Offset from top
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
    // Hero section animation - smooth and minimal
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('.hero-title',
      { 
        opacity: 0, 
        y: 80, 
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.6, 
        ease: 'power3.out', 
        stagger: 0.15 
      }
    );

    heroTl.fromTo('.hero-subtitle',
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out', stagger: 0.08 },
      1
    );

    // Enhanced service cards scroll animations
    gsap.utils.toArray('.service-card').forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(10px)'
        },
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

      // Image parallax
      const image = card.querySelector('.service-image');
      const imageOverlay = card.querySelector('.image-overlay');
      
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

      if (imageOverlay) {
        gsap.to(imageOverlay, {
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      // Sub-services animation
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

    // Case studies section animation
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
      {/* Unique Centered Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 overflow-hidden bg-white">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 sm:w-40 sm:h-40 border-l-2 border-t-2 border-black opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-40 sm:h-40 border-r-2 border-b-2 border-black opacity-20"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
          {/* Large number display */}
          <div className="hero-title mb-6 sm:mb-8">
            <div className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black leading-none tracking-tighter text-black opacity-10 select-none">
              10+
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black -mt-10 sm:-mt-16 lg:-mt-24">
              Services
            </div>
          </div>
          
          {/* Main heading */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
              <div className="hero-title text-black mb-2">COMPREHENSIVE</div>
              <div className="hero-title text-black mb-2">TECHNOLOGY</div>
              <div className="hero-title text-black relative inline-block">
                SOLUTIONS
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></div>
              </div>
            </h1>
          </div>
          
          {/* Description */}
          <div className="hero-subtitle mb-12 sm:mb-16">
            <p className="text-base sm:text-lg lg:text-xl text-black font-light tracking-wide leading-relaxed max-w-2xl mx-auto px-4">
              From AI-powered innovation to enterprise infrastructure,<br className="hidden sm:block"/>
              <span className="font-semibold">we deliver solutions that transform businesses.</span>
            </p>
          </div>
          
          {/* Service categories grid */}
          <div ref={serviceCategoriesRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 max-w-4xl mx-auto px-2">
            {serviceCategories.map((category) => (
              <Link
                key={category.id}
                href="/contact"
                className={`hero-subtitle relative block overflow-hidden px-3 py-4 sm:px-4 sm:py-5 border transition-all duration-300 cursor-pointer group ${
                  selectedService === category.id 
                    ? 'bg-black text-white border-black' 
                    : 'border-black/20 hover:bg-black hover:text-white'
                }`}
              >
                <div className="relative h-5 sm:h-6 flex items-center justify-center">
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full opacity-100 group-hover:opacity-0 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider">
                    {category.name}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider">
                    Connect Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section py-12 sm:py-20 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-40">
          {displayedServices.map((service, index) => (
            <div key={service.id} className="service-card relative">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-12 items-center relative z-10`}>
                {/* Image Section */}
                <div className="w-full lg:w-1/2 group">
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[550px] overflow-hidden rounded-xl shadow-2xl">
                    {/* Gradient overlay */}
                    <div className={`image-overlay absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-15`}></div>
                    
                    {/* Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Border */}
                    <div className="absolute inset-0 rounded-xl border border-black/5"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2">
                  <h2 className="service-title text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight tracking-tighter">
                    {service.title}
                  </h2>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-10 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Sub-services */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4 sm:mb-6 opacity-50">
                      What We Offer
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {service.subServices.map((subService, idx) => (
                        <Link
                          key={idx}
                          href="/contact"
                          className="sub-service-item relative block overflow-hidden group/item py-2"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 transition-transform duration-300 group-hover/item:-translate-y-full">
                            <div className="w-1.5 h-1.5 bg-black rounded-full text-black"></div>
                            <span className="text-sm sm:text-base text-gray-800 font-medium">
                              {subService}
                            </span>
                          </div>
                          
                          <div className="absolute inset-0 flex items-center gap-2 sm:gap-3 transition-transform duration-300 translate-y-full group-hover/item:translate-y-0">
                            <span className="text-sm sm:text-base text-black font-bold">
                              Connect Now →
                            </span>
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

      {/* How Engagement Works Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-20 bg-gray-50 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tighter">
              HOW ENGAGEMENT WORKS
            </h2>
            <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
              A streamlined process designed for clarity, collaboration, and exceptional results.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Step 1 */}
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">1</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">
                    Discovery & Consultation
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    We start with a deep dive into your business goals, challenges, and technical requirements. This ensures we align our solutions with your vision from day one.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">2</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">
                    Strategy & Planning
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Our team crafts a detailed roadmap, defining milestones, timelines, and deliverables. You'll have complete visibility into the project scope and execution plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">3</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">
                    Development & Iteration
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    We build in sprints with continuous feedback loops. Regular check-ins ensure the solution evolves with your needs and maintains the highest quality standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl font-black">4</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 tracking-tight">
                    Launch & Support
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    After rigorous testing, we deploy your solution and provide ongoing support. Our partnership doesn't end at launch—we're here for the long term.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 sm:mt-20">
            <button className="px-8 sm:px-10 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-900 transition-all duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies CTA Section */}
      <section className="case-studies-section relative py-20 sm:py-32 px-4 sm:px-6 lg:px-20 bg-black text-white overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Explore Our Work
            </h2>
            <button className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group">
              View Case Studies
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className={`case-study-card bg-white ${study.roundedCorner} overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  <p 
                    className="text-xs uppercase tracking-wider mb-3 sm:mb-4 text-black opacity-60"
                    style={{ fontFamily: 'var(--font-descriptive)' }}
                  >
                    {study.category}
                  </p>
                  <h3 
                    className="text-xl sm:text-2xl font-medium text-black leading-tight"
                    style={{ fontFamily: 'var(--font-descriptive)' }}
                  >
                    {study.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
