'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Scissors, Package, CalendarCheck, MessageCircle, ArrowRight, type LucideIcon } from 'lucide-react';
import type { ToolDetail } from '@/app/lib/toolsData';

type Props = {
  tool: ToolDetail;
  relatedTools: ToolDetail[];
};

const iconMap: Record<string, LucideIcon> = {
  Users,
  Scissors,
  Package,
  CalendarCheck,
  MessageCircle,
};

const heading = { fontFamily: 'var(--font-heading)' };

export default function ToolDetailClient({ tool, relatedTools }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWordsRef = useRef<HTMLHeadingElement>(null);
  const Icon = iconMap[tool.icon] ?? Users;
  const panelImage = tool.benefitsImage ?? tool.image;
  const heroImage = tool.heroImage ?? tool.image;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = heroWordsRef.current?.querySelectorAll('span');
      if (words) {
        gsap.fromTo(
          words,
          { y: '110%' },
          { y: '0%', duration: 1.1, stagger: 0.06, ease: 'power4.out', delay: 0.15 }
        );
      }

      gsap.fromTo(
        '.td-hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.08, delay: 0.4 }
      );

      gsap.fromTo(
        '.td-orb',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }
      );

      gsap.utils.toArray<HTMLElement>('.td-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.td-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (i % 6) * 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Hero — shows the product screenshot when heroImage is set (unless hideImageInHero), otherwise stays icon-led/abstract */}
      <section className="td-hero relative min-h-[80vh] flex items-center bg-black text-white overflow-hidden">
        {heroImage && !tool.hideImageInHero && (
          <>
            <div className="absolute inset-0">
              <Image src={heroImage} alt={tool.name} fill priority className="object-cover opacity-40" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/85 to-black/60" />
            <div className={`absolute inset-0 bg-linear-to-br ${tool.gradient} opacity-50 mix-blend-multiply`} />
          </>
        )}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        </div>
        <div className={`td-orb absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-linear-to-br ${tool.gradient} blur-[130px] opacity-70`} />
        <div className={`td-orb absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-linear-to-tr ${tool.gradient} blur-[130px] opacity-40`} />
        <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-white/15" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-white/15" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-28 pb-14 sm:py-32">
          <nav aria-label="Breadcrumb" className="td-hero-sub mb-8 sm:mb-10">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-white/45 flex-wrap">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium" aria-current="page">{tool.name}</li>
            </ol>
          </nav>

          <div className={`td-hero-sub w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br ${tool.gradient} flex items-center justify-center mb-8 sm:mb-10 border border-white/10`}>
            <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={1.5} />
          </div>

          <h1
            ref={heroWordsRef}
            style={heading}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.98] tracking-tight mb-7 sm:mb-9 max-w-5xl"
          >
            {tool.name.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3 sm:mr-4 pb-1 align-top">
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="td-hero-sub text-lg sm:text-xl lg:text-2xl text-white/55 font-light leading-relaxed max-w-2xl mb-10 sm:mb-12">
            {tool.tagline}
          </p>

          <div className="td-hero-sub flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-full">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-bold text-sm uppercase tracking-wider hover:border-white transition-all duration-300 rounded-full">
              All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative px-4 sm:px-6 lg:px-20 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="td-reveal flex items-center gap-3 border-b border-black/10 pb-5 mb-10 sm:mb-14">
            <span className={`w-2 h-2 rounded-full bg-linear-to-br ${tool.gradient.replaceAll('/20', '')}`} />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">Overview</span>
          </div>
          <p className="td-reveal max-w-4xl text-xl sm:text-2xl lg:text-3xl text-black leading-snug font-light tracking-tight">
            {tool.overview}
          </p>
        </div>
      </section>

      {/* Core Capabilities — dark bento grid */}
      <section className="relative px-4 sm:px-6 lg:px-20 py-20 sm:py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        </div>
        <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-linear-to-br ${tool.gradient} blur-[140px] opacity-25`} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="td-reveal text-center mb-14 sm:mb-20">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/60">Features</span>
            </div>
            <h2 style={heading} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tool.coreCapabilities.map((capability, index) => (
              <div key={capability} className="td-card group relative h-full">
                <div className="relative h-full min-h-[140px] p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-500 hover:bg-white/10 backdrop-blur-sm overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-5 right-5 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <p className="relative z-10 text-sm sm:text-base text-white leading-relaxed pr-8 font-medium">{capability}</p>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="px-4 sm:px-6 lg:px-20 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className={`td-reveal order-2 lg:order-1 ${panelImage ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
              {panelImage ? (
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-50 border border-black/10">
                  <Image src={panelImage} alt={`${tool.name} — TheCraftSync`} fill className="object-contain" />
                </div>
              ) : (
                <div className="relative h-[280px] sm:h-[360px] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[3rem_3rem]" />
                  </div>
                  <div className={`absolute w-[280px] h-[280px] rounded-full bg-linear-to-br ${tool.gradient} blur-[80px] opacity-100`} />
                  <div className="relative z-10 text-center px-8">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br ${tool.gradient} flex items-center justify-center mx-auto mb-4 border border-white/10`}>
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm uppercase tracking-[0.25em] text-white/50">{tool.name}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10" />
                </div>
              )}
            </div>
            <div className={`order-1 lg:order-2 min-w-0 ${panelImage ? 'lg:col-span-5' : 'lg:col-span-7'}`}>
              <h2 style={heading} className="td-reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8 sm:mb-10 tracking-tight leading-tight break-words">
                Why Teams Choose {tool.name}
              </h2>
              <ul className="space-y-5">
                {tool.keyAdvantages.map((advantage) => (
                  <li key={advantage} className="td-reveal flex gap-4 items-start">
                    <span className="mt-2.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700 leading-relaxed">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-20 py-20 sm:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 style={heading} className="td-reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-14 sm:mb-16 tracking-tight">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {relatedTools.map((related) => {
                const RelatedIcon = iconMap[related.icon] ?? Users;
                return (
                  <Link
                    key={related.slug}
                    href={`/tools/${related.slug}`}
                    className="td-card group relative block p-7 sm:p-8 rounded-2xl bg-white border border-black/10 hover:border-black transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-linear-to-br ${related.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${related.gradient} flex items-center justify-center mb-5 border border-black/5`}>
                        <RelatedIcon className="w-5 h-5 text-black" strokeWidth={1.75} />
                      </div>
                      <h3 style={heading} className="text-lg sm:text-xl font-semibold text-black mb-2 tracking-tight leading-snug">{related.name}</h3>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-black/60 group-hover:text-black transition-colors">
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative td-reveal px-4 sm:px-6 lg:px-20 py-24 sm:py-40 bg-black text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-br ${tool.gradient} rounded-full blur-[130px]`} />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 style={heading} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Ready to Run on {tool.name}?
          </h2>
          <p className="text-base sm:text-xl text-gray-400 font-light mb-10 leading-relaxed">
            Tell us about your operations and we&apos;ll show you how {tool.name} fits in.
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
