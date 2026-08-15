'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Lenis keeps its own scroll offset independent of the browser's native
  // scroll restoration, so client-side route changes (e.g. clicking into a
  // service page from /services) left the new page visually scrolled to
  // wherever the previous page was, instead of opening at the top.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    // If Lenis already exists, don't create a new one
    if (lenisInstance) {
      return;
    }

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

    lenisInstance = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tickCallback = (time: number) => {
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    };

    gsap.ticker.add(tickCallback);
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      if (!lenisInstance) return;

      try {
        // Remove ticker callback first
        gsap.ticker.remove(tickCallback);
        
        // Remove scroll listener from Lenis
        lenisInstance.off('scroll', onScroll);
        
        // Destroy Lenis instance
        lenisInstance.destroy();
        lenisInstance = null;
      } catch (error) {
        console.error('Error cleaning up Lenis:', error);
        lenisInstance = null;
      }
    };
  }, []);

  return <>{children}</>;
}
