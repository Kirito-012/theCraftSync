'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: '01',
    name: 'Balkees Abderrehman',
    role: 'Forbes Under 30',
    company: 'Business Owner',
    quote: "The team did a fantastic job bringing my vision to life. They built a seamless, user-friendly web app with excellent UI/UX design.",
    color: 'border-emerald-500/20'
  },
  {
    id: '02',
    name: 'FPO Connect',
    role: 'CTO',
    company: 'Tech Consultant',
    quote: "Innovative solutions with excellent technical expertise. Great communication and timely delivery every time.",
    color: 'border-blue-500/20'
  },
  {
    id: '03',
    name: 'Paradise Bliss Tours',
    role: 'Operations Manager',
    company: 'Travel Agency',
    quote: "Amazing support from day one! Quality work at reasonable pricing. They exceeded our expectations completely.",
    color: 'border-purple-500/20'
  },
  {
    id: '04',
    name: 'Meucart',
    role: 'Founder',
    company: 'Business Owner',
    quote: "Outstanding digital marketing services with excellent ROI. The team feels like true business partners.",
    color: 'border-amber-500/20'
  }
];

const NewTestimonial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Automatic cycling and progress logic
  useEffect(() => {
    const duration = 6000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((idx) => (idx + 1) % testimonials.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Handle manual interaction
  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0); // Reset progress on manual click
  };

  // GSAP Animation for smooth expansion
  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = i === activeIndex;
      
      gsap.to(el, {
        height: isActive ? 'auto' : 0,
        opacity: isActive ? 1 : 0,
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
    });
  }, [activeIndex]);

  return (
    <section className="bg-black py-24 md:py-32 px-6 lg:px-20 overflow-hidden" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-20 space-y-4">
          <span className="text-zinc-500 text-xs uppercase tracking-[0.4em] font-medium">Professional Testimonials</span>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
            Elevating <span className="italic text-zinc-500 text-6xl">Trust.</span>
          </h2>
        </div>

        {/* Testimonial Cards Container */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[500px]">
          {testimonials.map((t, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div
                key={t.id}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                onClick={() => handleCardClick(index)}
                className={`
                  relative rounded-4xl overflow-hidden cursor-pointer
                  border border-zinc-800 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
                  p-8 lg:p-10 flex flex-col justify-between group
                  ${isActive ? 'lg:flex-[3.5] bg-zinc-900/40 border-zinc-700 shadow-2xl' : 'lg:flex-1 bg-transparent opacity-40'}
                `}
                style={{ willChange: 'flex-grow' }}
              >
                {/* Progress Bar (Only for active) */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-zinc-800">
                    <div 
                      className="h-full bg-white transition-all duration-75 linear" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                {/* ID Number */}
                <div className="absolute top-8 right-10 pointer-events-none">
                  <span className={`text-6xl font-black italic tracking-tighter transition-all duration-700 ${isActive ? 'text-zinc-600 opacity-30 scale-110' : 'text-zinc-800 opacity-10'}`}>
                    {t.id}
                  </span>
                </div>

                {/* Top: Icon */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-white text-black rotate-12 scale-110' : 'bg-zinc-800 text-zinc-600'}`}>
                    <Quote className="w-6 h-6" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative z-10 mt-12 lg:mt-0">
                  <div className="space-y-1 mb-2">
                    <h3 className={`text-xl md:text-3xl font-bold tracking-tight transition-colors duration-700 ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                      {t.name}
                    </h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                      {t.role}
                    </p>
                  </div>

                  {/* Expanded Quote */}
                  <div
                    ref={(el) => { if (el) textRefs.current[index] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <p className="text-zinc-300 text-lg md:text-xl leading-relaxed pt-8 border-t border-zinc-800 mt-8 font-light italic">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className={`w-12 h-px ${t.color.replace('border-', 'bg-')}`}></div>
                      <span className="text-zinc-400 font-bold text-sm tracking-widest uppercase">
                        {t.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Dots */}
        <div className="mt-16 flex justify-center items-center gap-3">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-700 ${i === activeIndex ? 'w-12 bg-white' : 'w-3 bg-zinc-800'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewTestimonial;
