'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null); // Ref for direct text update
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Split text into letters for staggered reveal
      const letters = textRef.current?.querySelectorAll('.letter');
      
      // Initial states
      if (letters) gsap.set(letters, { y: 100, opacity: 0 });
      if (progressWrapperRef.current) gsap.set(progressWrapperRef.current, { opacity: 0, y: 20 });
      if (panelsRef.current) gsap.set(panelsRef.current, { scaleY: 1 }); // Ensure full height initially

      // Build timeline
      tl.to(letters || [], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
      })
      .to(progressWrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.5");

      // Animate progress with direct DOM update (No React State Re-renders)
      const count = { val: 0 };
      tl.to(count, {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${Math.floor(count.val)}%`;
          }
        },
      }, "-=0.3");

      tl.to(progressBarRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      }, "<");

      // Wait a bit at 100%
      tl.to({}, { duration: 0.3 });

      // Exit animations
      tl.to([textRef.current, progressWrapperRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      });

      // Panel reveal animation using scaleY for performance (GPU accelerated)
      const panels = panelsRef.current?.querySelectorAll('.reveal-panel');
      if (panels) {
        tl.to(panels, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.inOut',
          onStart: () => {
            // Signal completion slightly before animation ends for smoother transition
             if (loaderRef.current) loaderRef.current.style.pointerEvents = 'none';
          },
          onComplete: () => {
             document.body.style.overflow = 'auto';
             onComplete();
          }
        }, "-=0.2");
      } else {
         document.body.style.overflow = 'auto';
         onComplete();
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-transparent pointer-events-auto"
    >
      {/* Background Panels for Reveal */}
      <div ref={panelsRef} className="absolute inset-0 flex flex-col z-0 h-full w-full">
         {/* Single panel using scaleY is more performant than multiple height animations */}
        <div className="reveal-panel w-full h-full bg-black origin-top will-change-transform" />
      </div>

      {/* Cinematic Grain Overlay - Reduced opacity for performance */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Name Reveal */}
        <div ref={textRef} className="mb-12 flex overflow-hidden">
          {name.split("").map((char, idx) => (
            <span 
              key={idx} 
              className="letter inline-block text-2xl md:text-8xl font-black tracking-tighter text-white will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Progress Section */}
        <div ref={progressWrapperRef} className="w-64 md:w-80 will-change-transform">
          <div className="mb-3 flex justify-between items-end">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">System Ready</span>
            {/* Direct reference for updates */}
            <span ref={progressTextRef} className="text-2xl font-light text-white tabular-nums">0%</span>
          </div>
          <div className="h-px w-full bg-white/10 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-white will-change-transform"
            />
          </div>
        </div>
      </div>
      
      {/* Subtle background glow - simplified */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/5 blur-[80px] rounded-full pointer-events-none z-0" />
    </div>
  );
};

export default Loader;
