'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
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

export default function ToolsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 60, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', stagger: 0.1 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.5 }
      );

      gsap.utils.toArray<HTMLElement>('.tool-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-20 overflow-hidden bg-white pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '50px 50px' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 style={heading} className="hero-title text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.95] mb-6">
            Software That Runs
            <br />
            <span className="font-bold">Your Business</span>
          </h1>
          <p className="hero-subtitle text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto">
            Purpose-built tools for CRM, scheduling, orders, bookings, and customer communication — each designed to eliminate the busywork.
          </p>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="px-4 sm:px-6 lg:px-20 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {toolsData.map((tool) => {
            const Icon = iconMap[tool.icon] ?? Users;
            const cardImage = tool.cardImage ?? tool.image;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="tool-card group relative"
              >
                <div className={`absolute -inset-6 rounded-[2rem] bg-linear-to-br ${tool.gradient} opacity-0 group-hover:opacity-70 blur-2xl transition-opacity duration-500 -z-10`} />
                <div className="relative flex flex-col h-full rounded-2xl border border-white/10 group-hover:border-white/15 overflow-hidden bg-neutral-950 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/50">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    {cardImage ? (
                      <>
                        <Image src={cardImage} alt={tool.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
                      </>
                    ) : (
                      <div className={`absolute inset-0 flex items-center justify-center bg-linear-to-br ${tool.gradient}`}>
                        <Icon className="w-12 h-12 text-white/40" strokeWidth={1.25} />
                      </div>
                    )}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-linear-to-br ${tool.gradient} flex items-center justify-center border border-white/15 backdrop-blur-md shadow-lg`}>
                      <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
                    </div>
                  </div>

                  <div className="relative flex-1 flex flex-col p-5 sm:p-6">
                    <h2 style={heading} className="text-lg sm:text-xl font-bold text-white mb-1.5 tracking-tight">{tool.name}</h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">{tool.tagline}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                        Explore
                      </span>
                      <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-20 bg-black text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-[130px]" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 style={heading} className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Need a Custom Tool?
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-light mb-10 leading-relaxed">
            If none of these fit exactly, we build bespoke internal tools and platforms too.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105">
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
