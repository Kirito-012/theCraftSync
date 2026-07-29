'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const lastPos = useRef({ x: 0, y: 0 });
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Touch screen, mobile & tablet check - disable custom cursor on screen width <= 1024px or touch devices
    if (
      typeof window === 'undefined' ||
      window.innerWidth <= 1024 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 1024px)').matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    // High performance GSAP quickTo setters with 3D GPU acceleration
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.01, ease: 'none', force3D: true });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.01, ease: 'none', force3D: true });

    // Snappy trailing ring follow
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.08, ease: 'power2.out', force3D: true });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.08, ease: 'power2.out', force3D: true });

    let isVisible = false;
    let currentState: 'default' | 'hover' | 'badge' = 'default';
    let currentBadgeText = '';

    const showCursor = () => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.15, overwrite: 'auto' });
      }
    };

    const hideCursor = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    const handleMouseMove = (e: MouseEvent) => {
      showCursor();

      // Update position setters
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);

      // Playful Kinetic Velocity Deformation (Liquid Jelly Stretch)
      if (currentState === 'default') {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.min(distance, 80);

        if (speed > 4) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const stretchX = 1 + (speed * 0.006);
          const stretchY = Math.max(0.7, 1 - (speed * 0.004));

          gsap.to(ring, {
            rotation: angle,
            scaleX: stretchX,
            scaleY: stretchY,
            duration: 0.1,
            ease: 'power1.out',
            overwrite: 'auto',
          });

          if (idleTimer.current) clearTimeout(idleTimer.current);
          idleTimer.current = setTimeout(() => {
            gsap.to(ring, {
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.4,
              ease: 'elastic.out(1.2, 0.4)',
              overwrite: 'auto',
            });
          }, 60);
        }
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    // Background brightness detector
    const isLightContext = (target: HTMLElement): boolean => {
      let curr: HTMLElement | null = target;
      while (curr && curr !== document.documentElement) {
        const classList = curr.classList;
        if (
          classList.contains('bg-white') ||
          classList.contains('bg-snow-white') ||
          classList.contains('bg-zinc-50') ||
          classList.contains('bg-gray-50') ||
          classList.contains('bg-gray-100')
        ) {
          return true;
        }
        if (
          classList.contains('bg-black') ||
          classList.contains('bg-zinc-950') ||
          classList.contains('bg-zinc-900') ||
          classList.contains('bg-zinc-800')
        ) {
          return false;
        }

        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;

        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const parts = bg.match(/\d+/g);
          if (parts && parts.length >= 3) {
            const alpha = parts.length >= 4 ? parseFloat(parts[3]) : 1;
            if (alpha > 0.05) {
              const r = parseInt(parts[0], 10);
              const g = parseInt(parts[1], 10);
              const b = parseInt(parts[2], 10);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              return brightness > 150;
            }
          }
        }
        curr = curr.parentElement;
      }
      return false;
    };

    // Fast GSAP mode switches with playful spring physics
    const setCursorMode = (mode: 'default' | 'hover' | 'badge', badgeText = '', targetElem?: HTMLElement) => {
      if (currentState === mode && currentBadgeText === badgeText) return;
      currentState = mode;
      currentBadgeText = badgeText;

      if (mode === 'badge') {
        text.innerText = badgeText;
        const isLight = targetElem ? isLightContext(targetElem) : false;

        const badgeBg = isLight ? '#000000' : '#ffffff';
        const badgeTextColor = isLight ? '#ffffff' : '#000000';

        text.style.color = badgeTextColor;

        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.12, ease: 'power2.out', overwrite: 'auto' });

        // Playful spring pop with rotation tilt
        gsap.fromTo(
          ring,
          { rotation: -12, scale: 0.5 },
          {
            width: 78,
            height: 78,
            rotation: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            backgroundColor: badgeBg,
            borderColor: isLight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            borderWidth: '1px',
            mixBlendMode: 'normal',
            boxShadow: isLight ? '0 14px 40px rgba(0,0,0,0.45)' : '0 14px 40px rgba(255,255,255,0.45)',
            duration: 0.35,
            ease: 'back.out(2.2)',
            overwrite: 'auto',
          }
        );

        gsap.fromTo(
          text,
          { opacity: 0, scale: 0.5, rotation: -8 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.25, ease: 'back.out(2)', overwrite: 'auto' }
        );
      } else if (mode === 'hover') {
        // Playful expand with spring bounce
        gsap.to(dot, { scale: 1.6, opacity: 1, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(ring, {
          width: 54,
          height: 54,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: '#ffffff',
          borderWidth: '2px',
          mixBlendMode: 'difference',
          boxShadow: 'none',
          duration: 0.25,
          ease: 'back.out(2.5)',
          overwrite: 'auto',
        });
        gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.08, overwrite: 'auto' });
      } else {
        // Default State - Spring back to clean liquid ring
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(ring, {
          width: 36,
          height: 36,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          backgroundColor: 'transparent',
          borderColor: '#ffffff',
          borderWidth: '2px',
          mixBlendMode: 'difference',
          boxShadow: 'none',
          duration: 0.25,
          ease: 'elastic.out(1.2, 0.4)',
          overwrite: 'auto',
        });
        gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.08, overwrite: 'auto' });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const badgeElem = target.closest('[data-cursor-text]') as HTMLElement | null;
      if (badgeElem) {
        const txt = badgeElem.getAttribute('data-cursor-text') || '';
        setCursorMode('badge', txt, badgeElem);
        return;
      }

      const interactiveElem = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      if (interactiveElem) {
        setCursorMode('hover', '', interactiveElem as HTMLElement);
        return;
      }

      setCursorMode('default');
    };

    // Playful Elastic Bounce on Click
    const handleMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.75, duration: 0.1, ease: 'power2.out', overwrite: 'auto' });
    };

    const handleMouseUp = () => {
      gsap.to([dot, ring], {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1.4, 0.3)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', hideCursor, { passive: true });
    document.body.addEventListener('mouseenter', showCursor, { passive: true });

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', hideCursor);
      document.body.removeEventListener('mouseenter', showCursor);
    };
  }, []);

  return (
    <div className="custom-cursor-wrapper pointer-events-none fixed inset-0 z-[999999] overflow-hidden hidden lg:block">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-white mix-blend-difference pointer-events-none z-[999999] opacity-0 will-change-transform"
      />

      {/* Playful Trailing Ring / Kinetic Liquid Badge Container */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] border-2 border-white rounded-full mix-blend-difference pointer-events-none z-[999998] flex items-center justify-center opacity-0 will-change-transform origin-center"
      >
        <span
          ref={textRef}
          className="text-[10px] font-black tracking-widest uppercase opacity-0 scale-75 select-none pointer-events-none text-center px-1"
        />
      </div>
    </div>
  );
}
