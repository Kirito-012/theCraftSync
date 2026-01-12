'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo5.png';
import logo6 from '../assets/logo6.png';
import logo7 from '../assets/logo7.png';
import logo8 from '../assets/logo8.png';
import logo9 from '../assets/logo9.png';
import logo10 from '../assets/logo10.png';
import logo11 from '../assets/logo11.svg';
import logo12 from '../assets/logo12.png';

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const logos = [
    { src: logo1, alt: 'Client 1' },
    { src: logo2, alt: 'Client 2' },
    { src: logo3, alt: 'Client 3' },
    { src: logo4, alt: 'Client 4' },
    { src: logo5, alt: 'Client 5' },
    { src: logo6, alt: 'Client 6' },
    { src: logo7, alt: 'Client 7' },
    { src: logo8, alt: 'Client 8' },
    { src: logo9, alt: 'Client 9' },
    { src: logo10, alt: 'Client 10' },
    { src: logo11, alt: 'Client 11' },
    { src: logo12, alt: 'Client 12' },
  ];

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll('span');
      gsap.fromTo(
        spans,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Logo grid stagger animation
    if (gridRef.current) {
      const logoItems = gridRef.current.querySelectorAll('.logo-item');
      gsap.fromTo(
        logoItems,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="bg-black text-white py-20 px-5 min-h-screen flex items-center justify-center md:py-20 sm:py-10">
      <div className="max-w-7xl w-full mx-auto">
        {/* Title */}
        <h2 ref={titleRef} className="text-center mb-20 font-light leading-tight md:mb-16 sm:mb-10">
          <span className="block text-5xl md:text-7xl lg:text-8xl tracking-widest mb-2 sm:text-4xl">
            OUR
          </span>
          <span className="block text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider sm:text-5xl">
            PARTNERS
          </span>
        </h2>
        
        {/* Logos Grid */}
        <div ref={gridRef} className="flex flex-wrap items-center justify-center gap-y-1 md:gap-y-0 sm:gap-y-2">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`logo-item flex items-center justify-center transition-all duration-300 ease-in-out ${
                index === 2 
                  ? 'w-1/2 md:w-1/4 max-w-[120px] md:max-w-[150px] lg:max-w-[180px] h-16 md:h-20 lg:h-24 p-3 md:p-4' 
                  : 'w-1/2 md:w-1/4 max-w-[200px] md:max-w-[280px] lg:max-w-[350px] h-24 md:h-32 lg:h-40 p-4 md:p-6'
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={300}
                height={150}
                className="w-full object-contain h-full brightness-0 invert"
               
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

