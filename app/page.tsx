'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroSection from "./Components/herosection";
import ServicesSection from "./Components/Services";
import FAQSection from "./Components/Faq";
import TestimonialsSection from "./Components/newtestimonial";
import ProjectSection from "./Components/newourworks";
import Blogs from "./Components/Blogs";
import Clients from "./Components/Clients";
import SmoothScroll from "./Components/SmoothScroll";
import { useLoading } from "./lib/LoadingContext";

export default function Home() {
  const { isLoading } = useLoading();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(contentRef.current, 
        { 
          opacity: 0, 
          scale: 0.98,
          filter: 'blur(10px)'
        }, 
        { 
          opacity: 1, 
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5, 
          ease: 'power4.out',
          delay: 0.2
        }
      );
    }
  }, [isLoading]);

  return (
    <div 
      ref={contentRef} 
      style={{ opacity: isLoading ? 0 : 1 }}
      className="will-change-transform"
    >
      <SmoothScroll>
        <HeroSection startAnimation={!isLoading} />
        <ServicesSection />
        <ProjectSection />
        <TestimonialsSection />
        <Clients />
        <FAQSection />
        <Blogs />
      </SmoothScroll>
    </div>
  );
}
