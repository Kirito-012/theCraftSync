'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Scissors, Package, CalendarCheck, MessageCircle, ArrowRight, type LucideIcon } from 'lucide-react';
import { toolsData } from '../lib/toolsData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Users,
  Scissors,
  Package,
  CalendarCheck,
  MessageCircle,
};

const heading = { fontFamily: 'var(--font-heading)' };

const ToolsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.tool-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-24 md:py-32 px-6 lg:px-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-4">Our Product Suite</p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter text-black mb-4">
              Tools Built to Run
              <br />
              <span className="font-bold">Your Business</span>
            </h2>
            <div className="w-24 h-1 bg-black" />
          </div>
          <Link
            href="/tools"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 border-2 border-black/15 text-black font-bold text-sm uppercase tracking-wider rounded-full hover:border-black transition-all duration-300 group shrink-0"
          >
            View All Tools
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {toolsData.map((tool, index) => {
            const Icon = iconMap[tool.icon] ?? Users;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="tool-card group relative flex flex-col justify-between p-7 sm:p-8 min-h-[280px] rounded-2xl border border-black/10 hover:border-black/30 bg-white transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${tool.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="absolute top-5 right-6 text-5xl font-black text-black/[0.04] group-hover:text-black/[0.06] transition-colors duration-500 select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${tool.gradient} flex items-center justify-center mb-6 border border-black/5`}>
                    <Icon className="w-6 h-6 text-black" strokeWidth={1.75} />
                  </div>
                  <h3 style={heading} className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">
                    {tool.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{tool.tagline}</p>
                </div>

                <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black/60 group-hover:text-black transition-colors">
                  Explore Tool
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}

          <Link
            href="/tools"
            className="tool-card group relative flex flex-col items-start justify-center gap-4 p-7 sm:p-8 min-h-[280px] rounded-2xl bg-black text-white overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[2.5rem_2.5rem]" />
            </div>
            <div className="relative z-10">
              <p style={heading} className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                See the Full Suite
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                Five purpose-built tools, one connected ecosystem for your operations.
              </p>
            </div>
            <span className="relative z-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
              View All Tools
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
