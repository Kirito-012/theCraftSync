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
    let lastIsLight: boolean | null = null;
    let lastColorCheck = 0;

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

    // Keeps the cursor's contrast color in sync with whatever is directly under it,
    // independent of mouseover firing — this is the reliable source of truth.
    const syncContrastColor = (isLight: boolean) => {
      if (currentState === 'badge' || isLight === lastIsLight) return;
      lastIsLight = isLight;
      const cursorColor = isLight ? '#000000' : '#ffffff';
      gsap.to(dot, { backgroundColor: cursorColor, duration: 0.15, overwrite: 'auto' });
      gsap.to(ring, {
        borderColor: cursorColor,
        backgroundColor:
          currentState === 'hover'
            ? isLight
              ? 'rgba(0, 0, 0, 0.08)'
              : 'rgba(255, 255, 255, 0.2)'
            : 'transparent',
        duration: 0.15,
        overwrite: 'auto',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      showCursor();

      // Update position setters
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);

      const now = performance.now();
      if (now - lastColorCheck > 80) {
        lastColorCheck = now;
        const elem = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        if (elem) syncContrastColor(isLightContext(elem));
      }

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

    // Tailwind v4 emits background-color as oklab()/oklch()/lab() strings (not rgb()),
    // so a regex over the raw string silently produces garbage numbers. Route every
    // color through a 1x1 canvas — the browser normalizes any valid CSS color to
    // plain sRGB bytes there, regardless of the color function used to author it.
    const colorProbeCanvas = document.createElement('canvas');
    colorProbeCanvas.width = 1;
    colorProbeCanvas.height = 1;
    const colorProbeCtx = colorProbeCanvas.getContext('2d', { willReadFrequently: true });

    const toRgba = (cssColor: string): [number, number, number, number] | null => {
      if (!colorProbeCtx) return null;
      colorProbeCtx.clearRect(0, 0, 1, 1);
      colorProbeCtx.fillStyle = '#000';
      colorProbeCtx.fillStyle = cssColor;
      colorProbeCtx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = colorProbeCtx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
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
          classList.contains('bg-neutral-950') ||
          classList.contains('bg-neutral-900') ||
          classList.contains('bg-zinc-950') ||
          classList.contains('bg-zinc-900') ||
          classList.contains('bg-zinc-800')
        ) {
          return false;
        }

        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;

        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const rgba = toRgba(bg);
          if (rgba) {
            const [r, g, b, alpha] = rgba;
            // A faint tint (e.g. bg-white/5 overlay cards) isn't a decisive
            // background on its own — keep walking up to the real container.
            if (alpha > 0.35) {
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

      const isLight = targetElem ? isLightContext(targetElem) : false;

      if (mode === 'badge') {
        text.innerText = badgeText;

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
        // Playful expand with spring bounce — explicit contrast color, no reliance on blend modes
        const cursorColor = isLight ? '#000000' : '#ffffff';
        gsap.to(dot, {
          scale: 1.6,
          opacity: 1,
          backgroundColor: cursorColor,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(ring, {
          width: 54,
          height: 54,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          backgroundColor: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.2)',
          borderColor: cursorColor,
          borderWidth: '2px',
          mixBlendMode: 'normal',
          boxShadow: 'none',
          duration: 0.25,
          ease: 'back.out(2.5)',
          overwrite: 'auto',
        });
        gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.08, overwrite: 'auto' });
      } else {
        // Default State - Spring back to clean liquid ring — explicit contrast color, no reliance on blend modes
        const cursorColor = isLight ? '#000000' : '#ffffff';
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          backgroundColor: cursorColor,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(ring, {
          width: 36,
          height: 36,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          backgroundColor: 'transparent',
          borderColor: cursorColor,
          borderWidth: '2px',
          mixBlendMode: 'normal',
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

      setCursorMode('default', '', target);
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

    // Establish an explicit baseline immediately — don't wait on the mix-blend-mode
    // trick (unreliable across layered/blurred/filtered sections) for initial contrast.
    gsap.set([dot, ring], { mixBlendMode: 'normal' });
    gsap.set(dot, { backgroundColor: '#000000' });
    gsap.set(ring, { borderColor: '#000000', backgroundColor: 'transparent' });

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
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-black pointer-events-none z-[999999] opacity-0 will-change-transform"
      />

      {/* Playful Trailing Ring / Kinetic Liquid Badge Container */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] border-2 border-black rounded-full pointer-events-none z-[999998] flex items-center justify-center opacity-0 will-change-transform origin-center"
      >
        <span
          ref={textRef}
          className="text-[10px] font-black tracking-widest uppercase opacity-0 scale-75 select-none pointer-events-none text-center px-1"
        />
      </div>
    </div>
  );
}
