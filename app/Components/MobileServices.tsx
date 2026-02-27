'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { servicesData, Service } from './servicesData';

const AccordionItem: React.FC<{ service: Service; index: number; isActive: boolean; toggleService: (id: number) => void }> = ({ service, index, isActive, toggleService }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      if (isActive) {
        gsap.to(wrapperRef.current, {
          height: contentRef.current.offsetHeight,
          duration: 0.5,
          ease: "power3.out"
        });
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });
      } else {
        gsap.to(wrapperRef.current, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isActive]);

  return (
    <div 
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
        isActive ? 'bg-zinc-900 border-zinc-700 shadow-xl shadow-black/50' : 'bg-black border-zinc-900 hover:border-zinc-800'
      }`}
    >
      {/* Accordion Header */}
      <button
        onClick={() => toggleService(service.id)}
        className="w-full flex items-center justify-between p-5 text-left select-none relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
            isActive ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-900 border-transparent text-zinc-500'
          }`}>
            <div className="w-6 h-6">
              {service.icon}
            </div>
          </div>
          <div>
            <h3 className={`font-bold transition-all duration-300 ${
              isActive ? 'text-white text-lg' : 'text-zinc-400 text-base'
            }`}>
              {service.name}
            </h3>
            <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-600 mt-1">
              {service.shortName}
            </p>
          </div>
        </div>
        <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-transform duration-500 ${
          isActive ? 'border-white text-white rotate-180 bg-white/10' : 'border-zinc-800 text-zinc-500 bg-zinc-900'
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Accordion Content Wrapper for GSAP Height Animation */}
      <div ref={wrapperRef} className="h-0 overflow-hidden">
        <div ref={contentRef} className="opacity-0 translate-y-[-10px]">
          <div className="p-5 pt-0 border-t border-zinc-800/50 mt-2">
            <div className="flex items-center justify-between mt-4 mb-4">
               <span className="text-4xl font-black text-zinc-800/30 select-none">
                {String(index + 1).padStart(2, '0')}
               </span>
               <div className="h-px flex-1 bg-linear-to-r from-zinc-800/50 to-transparent ml-4"></div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-sm mb-6">
              {service.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                Key Features
              </h4>
              {service.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="bg-black px-4 py-3.5 rounded-xl border border-zinc-800/80 flex items-start gap-4 shadow-inner shadow-white/5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span className="text-sm font-medium text-gray-300 leading-snug">
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            <Link 
              href="/services" 
              className="flex justify-center items-center gap-2 w-full bg-white text-black py-4 rounded-xl font-bold text-center hover:bg-zinc-200 transition-colors mt-8 text-sm group"
            >
              Explore Details
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileServices: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<number | null>(servicesData[0].id);

  const toggleService = (id: number) => {
    setActiveServiceId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full space-y-4">
      {servicesData.map((service, index) => (
        <AccordionItem 
          key={service.id}
          service={service}
          index={index}
          isActive={activeServiceId === service.id}
          toggleService={toggleService}
        />
      ))}
    </div>
  );
};

export default MobileServices;
