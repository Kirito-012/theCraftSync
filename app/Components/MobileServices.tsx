'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { servicesData, Service } from './servicesData';

const MobileServices: React.FC = () => {
  const [activeService, setActiveService] = useState<Service>(servicesData[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (service: Service) => {
    if (service.id === activeService.id) return;
    
    // Animate out content
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          setActiveService(service);
          // Animate in new content
          gsap.fromTo(contentRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        }
      });
    } else {
      setActiveService(service);
    }
  };

  return (
    <div className="w-full">
      {/* Category Badges Grid */}
      <div 
        ref={badgesRef}
        className="w-full flex flex-wrap gap-3 pb-6"
      >
        {servicesData.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className={`
              px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border
              ${
                activeService.id === service.id
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }
            `}
          >
            {service.shortName}
          </button>
        ))}
      </div>

      {/* Service Content */}
      <div ref={contentRef} className="mt-4 space-y-6">
        {/* Service Header & Icon */}
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50">
           <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-white">
                <div className="w-8 h-8">
                  {activeService.icon}
                </div>
              </div>
              <span className="text-5xl font-black text-zinc-800/50 select-none">
                {String(activeService.id).padStart(2, '0')}
              </span>
           </div>
           
           <h3 className="text-2xl font-bold text-white mb-3">
             {activeService.name}
           </h3>
           
           <p className="text-zinc-400 leading-relaxed text-sm">
             {activeService.description}
           </p>
        </div>

        {/* Key Features Grid */}
        <div>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 pl-1">
            Key Features
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {activeService.details.map((detail, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 px-4 py-3 rounded-lg border border-zinc-800 flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="text-sm font-medium text-gray-200">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link 
          href="/services" 
          className="block w-full bg-white text-black py-4 rounded-xl font-bold text-center hover:bg-zinc-200 transition-colors mt-8"
        >
          Explore Details
        </Link>
      </div>
    </div>
  );
};

export default MobileServices;
