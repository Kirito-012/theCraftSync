'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis with GSAP ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tickCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickCallback);
    gsap.ticker.lagSmoothing(0);

    // Cleanup - must be in correct order
    return () => {
      // Remove ticker callback first
      gsap.ticker.remove(tickCallback);
      
      // Remove scroll listener from Lenis
      lenis.off('scroll', onScroll);
      
      // Destroy Lenis instance
      lenis.destroy();
      
      // Do NOT kill all ScrollTriggers globally here —
      // individual components manage their own contexts and cleanup.
      // Removing global kill prevents double-removal race conditions.
    };
  }, []);

  return <>{children}</>;
}
