'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Split text into letters for staggered reveal
      const letters = textRef.current?.querySelectorAll('.letter');
      
      // Initial states
      gsap.set(letters || [], { y: 100, opacity: 0 });
      gsap.set(progressRef.current, { opacity: 0, y: 20 });

      // Build timeline
      tl.to(letters || [], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      })
      .to(progressRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.5");

      // Animate progress
      const count = { val: 0 };
      tl.to(count, {
        val: 100,
        duration: 2.5,
        ease: 'none',
        onUpdate: () => {
          setPercentage(Math.floor(count.val));
        },
      }, "-=0.3");

      tl.to(progressBarRef.current, {
        width: '100%',
        duration: 2.5,
        ease: 'none',
      }, "<");

      // Wait a bit at 100%
      tl.to({}, { duration: 0.5 });

      // Exit animations
      tl.to([textRef.current, progressRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in',
      });

      // Panel reveal animation
      const panels = panelsRef.current?.querySelectorAll('.reveal-panel');
      if (panels) {
        tl.to(panels, {
          height: 0,
          duration: 1.2,
          stagger: {
            amount: 0.2,
            from: "center"
          },
          ease: 'expo.inOut',
          onStart: () => {
            document.body.style.overflow = 'auto';
            onComplete();
          }
        }, "-=0.2");
      }

      tl.set(loaderRef.current, { display: 'none' });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  const name = "THECRAFTSYNC";

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Panels for Reveal */}
      <div ref={panelsRef} className="absolute inset-0 flex flex-col z-0">
        <div className="reveal-panel relative h-1/2 w-full bg-[#0a0a0a]" />
        <div className="reveal-panel relative h-1/2 w-full bg-[#0a0a0a]" />
      </div>

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Name Reveal */}
        <div ref={textRef} className="mb-12 flex overflow-hidden">
          {name.split("").map((char, idx) => (
            <span 
              key={idx} 
              className="letter inline-block text-5xl md:text-8xl font-black tracking-tighter text-white"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Progress Section */}
        <div ref={progressRef} className="w-64 md:w-80">
          <div className="mb-3 flex justify-between items-end">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">System Ready</span>
            <span className="text-2xl font-light text-white tabular-nums">{percentage}%</span>
          </div>
          <div className="h-px w-full bg-white/10 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-white"
            />
          </div>
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </div>
  );
};

export default Loader;
