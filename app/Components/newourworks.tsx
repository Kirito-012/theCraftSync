'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Paradise Bliss",
    category: "Travel & Booking Platform",
    description: "Comprehensive travel booking with customized vacation packages and spiritual pilgrimage tours across India.",
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768692757/Screenshot_2026-01-18_045806_mndvkw.png",
    link: "/case-study/paradise-bliss"
  },
  {
    title: "Indiem",
    category: "Healthcare AI Automation",
    description: "AI-powered healthcare operations platform automating hospital claim documentation and patient records.",
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768693110/Screenshot_2026-01-18_050807_tha14s.png",
    link: "/case-study/indiem"
  },
  {
    title: "Moment & CRAFT",
    category: "AI E-commerce Platform",
    description: "Enterprise-grade design and commerce platform powered by generative AI for emotionally meaningful products.",
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768686878/moment_dfai8p.jpg",
    link: "/case-study/moment-craft"
  },
  {
    title: "Osexifi",
    category: "Wellness E-commerce",
    description: "Comprehensive e-commerce ecosystem for wellness products integrated with nonprofit reproductive health mission.",
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768696994/Screenshot_2026-01-11_004711_mnxxc4.png",
    link: "/case-study/osexifi"
  }
];

const NewOurWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        const title = row.querySelector('.project-title');
        const number = row.querySelector('.project-number');
        const imgContainer = row.querySelector('.image-container');
        const arrow = row.querySelector('.arrow-container');

        // Initial states to prevent flicker and ensure visibility if GSAP fails
        gsap.set([title, number, imgContainer, arrow], { opacity: 0, y: 30 });
        if (number) gsap.set(number, { x: -20, y: 0 });
        if (arrow) gsap.set(arrow, { x: -30, y: 0 });

        gsap.to([title, number, imgContainer, arrow], {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs uppercase tracking-[0.4em] font-medium">Selected Portfolio</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-zinc-900 tracking-tighter">
              Our <span className="font-bold">Work</span>
            </h2>
          </div>
          
          <Link href="/projects" className="group flex items-center gap-3 text-zinc-900 font-medium py-2">
            <span className="relative text-base tracking-tight overflow-hidden pb-1 inline-block">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">View all cases</span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 whitespace-nowrap">Explore more</span>
            </span>
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-500 group-hover:bg-zinc-900 group-hover:text-white shrink-0">
              <MoveRight className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-45" />
            </div>
          </Link>
        </div>
        
        <div className="w-full h-px bg-zinc-900/10 mb-12 md:mb-20" />

        {/* Projects List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <Link 
              key={index}
              href={project.link}
              ref={(el) => { if (el) rowsRef.current[index] = el; }}
              className="group py-12 md:py-20 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 border-b border-black/5 last:border-0 relative"
            >
              {/* Index Number */}
              <div className="project-number absolute top-12 left-0 hidden xl:block text-zinc-200 text-6xl font-black italic tracking-tighter transition-opacity duration-300 pointer-events-none">
                0{index + 1}
              </div>

              {/* Left Side: Project Info */}
              <div className="w-full lg:w-[30%] space-y-4 relative z-20">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 block mb-2">{project.category}</span>
                <h3 className="project-title text-3xl md:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:pl-4">
                  {project.title}
                </h3>
                <p className="text-zinc-500 font-light leading-relaxed max-w-sm text-sm md:text-base pr-8">
                  {project.description}
                </p>
              </div>

              {/* Middle: Project Image */}
              <div className="image-container w-full lg:w-[50%] aspect-video bg-zinc-50 overflow-hidden relative rounded-sm shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent z-10 transition-colors duration-700" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  loading="lazy"
                />
              </div>

              {/* Right Side: Stylized Arrow Icon */}
              <div className="arrow-container hidden lg:flex w-[10%] justify-end relative">
                <div className="transform transition-all duration-700 group-hover:translate-x-4 group-hover:-translate-y-4">
                  <svg 
                    width="60" 
                    height="60" 
                    viewBox="0 0 100 100" 
                    fill="none" 
                    className="stroke-zinc-900 opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <path d="M20 80L80 20M80 20H40M80 20V60" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                  {/* Magnetic look underline */}
                  <div className="w-20 h-px bg-zinc-900 absolute -bottom-2 -left-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewOurWorks;
