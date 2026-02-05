'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  startAnimation?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial state
      gsap.set([paraRef.current, buttonsRef.current], {
        y: 60,
        opacity: 0,
      });
      gsap.set(headingRef.current, { opacity: 1 });
      const spans = headingRef.current?.querySelectorAll('span');
      if (spans) gsap.set(spans, { y: '105%' });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(videoRef.current, { scale: 1.1, filter: 'blur(10px)' });

      // Entrance sequence
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 1.5,
      })
      .to(videoRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.5,
      }, 0)
      .to(headingRef.current?.querySelectorAll('span') || [], {
        y: '0%',
        stagger: 0.15,
        duration: 1.5,
        ease: 'power4.out',
      }, 0.3)
      .to(paraRef.current, {
        y: 0,
        opacity: 0.7,
        duration: 1.2,
      }, 0.8)
      .to(buttonsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      }, 1.0);

      // Subtle parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(videoRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
      >
        <source 
          src="/bg2.mp4" 
          type="video/mp4" 
        />
      </video>

      <div 
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/20 to-black"
      />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto pt-20 px-6 lg:px-20 text-center md:text-left flex flex-col items-center md:items-start max-w-7xl">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[9rem] font-light text-white leading-[0.9] tracking-tight mb-8"
        >
          <div className="overflow-hidden pb-4 -mb-4">
            <span className="inline-block">Building</span>
          </div>
          <div className="overflow-hidden pb-4 -mb-4">
            <span className="inline-block font-bold">Experiences</span>
          </div>
          <div className="overflow-hidden pb-4 mt-1 -mb-4">
            <span className="inline-block">to Perform</span>
          </div>
        </h1>

        <p 
          ref={paraRef}
          className="text-base md:text-lg lg:text-xl text-white/60 max-w-lg lg:max-w-xl mb-10 leading-relaxed font-normal"
        >
          Strategic design meeting technical precision. We build digital products that resonate and scale.
        </p>

        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* View Works Button */}
          <button className="group relative px-8 py-3.5 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:bg-transparent hover:text-white border border-white text-sm lg:text-base cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              View Works
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Contact Us Button */}
          <button className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-black text-sm lg:text-base cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
