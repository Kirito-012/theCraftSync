'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import type { ServiceDetail } from '@/app/lib/servicesData';

type Props = {
  service: ServiceDetail;
  relatedServices: ServiceDetail[];
};

const heading = { fontFamily: 'var(--font-heading)' };

const processSteps = [
  {
    title: 'Discovery & Consultation',
    description:
      'We start with a deep dive into your business goals, challenges, and technical requirements. This ensures we align our solutions with your vision from day one.',
  },
  {
    title: 'Strategy & Planning',
    description:
      "Our team crafts a detailed roadmap, defining milestones, timelines, and deliverables. You'll have complete visibility into the project scope and execution plan.",
  },
  {
    title: 'Development & Iteration',
    description:
      'We build in sprints with continuous feedback loops. Regular check-ins ensure the solution evolves with your needs and maintains the highest quality standards.',
  },
  {
    title: 'Launch & Support',
    description:
      "After rigorous testing, we deploy your solution and provide ongoing support. Our partnership doesn't end at launch — we're here for the long term.",
  },
];

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'offerings', label: 'What We Offer' },
  { id: 'benefits', label: 'Why Choose Us' },
  { id: 'process', label: 'How It Works' },
  { id: 'faq', label: 'FAQ' },
];

export default function ServiceDetailClient({ service, relatedServices }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWordsRef = useRef<HTMLHeadingElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('overview');

  // Scroll-spy: highlight the sidebar link for whichever section is in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
        '.sd-hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.08, delay: 0.5 }
      );

      gsap.fromTo(
        '.sd-orb',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }
      );

      const heroImg = document.querySelector('.sd-hero-image img');
      if (heroImg) {
        gsap.fromTo(
          heroImg,
          { scale: 1.15 },
          {
            scale: 1.3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.sd-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.sd-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.sd-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: (i % 6) * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 94%',
              toggleActions: 'play none none reverse',
            },
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
      <main>
        <article aria-label={`${service.name} service`}>
          {/* Hero — unchanged */}
          <section className="sd-hero relative min-h-[90vh] flex items-center bg-black text-white overflow-hidden">
            <div className="sd-hero-image absolute inset-0">
              <Image src={service.image} alt={service.name} fill priority className="object-cover opacity-45" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/50" />
            <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-50 mix-blend-multiply`} />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[4rem_4rem]" />
            </div>
            <div className={`sd-orb absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-linear-to-br ${service.gradient} blur-[130px] opacity-50`} />
            <div className={`sd-orb absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-linear-to-tr ${service.gradient} blur-[130px] opacity-30`} />
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-white/15" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-white/15" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-28 pb-14 sm:py-32">
              <nav aria-label="Breadcrumb" className="sd-hero-sub mb-8 sm:mb-10">
                <ol className="flex items-center gap-2 text-xs sm:text-sm text-white/45 flex-wrap">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white font-medium" aria-current="page">{service.name}</li>
                </ol>
              </nav>

              <h1
                ref={heroWordsRef}
                style={heading}
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.98] tracking-tight mb-7 sm:mb-9 max-w-5xl"
              >
                {service.h1.split(' ').map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-3 sm:mr-4 pb-1 align-top">
                    <span className="inline-block">{word}</span>
                  </span>
                ))}
              </h1>

              <p className="sd-hero-sub text-lg sm:text-xl lg:text-2xl text-white/55 font-light leading-relaxed max-w-2xl mb-8 sm:mb-10">
                {service.tagline}
              </p>

              <div className="sd-hero-sub flex flex-wrap gap-2 mb-10 sm:mb-12">
                {service.expertiseTags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white/[0.04] border border-white/15 text-white/65 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="sd-hero-sub flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-full">
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-bold text-sm uppercase tracking-wider hover:border-white transition-all duration-300 rounded-full">
                  View Our Work
                </Link>
              </div>
            </div>
          </section>

          {/* Mobile section nav — horizontal scroll pills, sidebar takes over on lg */}
          <div className="lg:hidden sticky top-16 z-20 relative bg-white/95 backdrop-blur-sm border-b border-black/10">
            <nav aria-label="Section navigation" className="scrollbar-hide overflow-x-auto whitespace-nowrap px-4 py-3 flex gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors ${
                    activeSection === item.id ? 'bg-black text-white border-black' : 'border-black/15 text-black/60'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-white to-transparent" />
          </div>

          {/* Body — sticky sidebar nav + content column */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12 sm:py-20 lg:flex lg:gap-16">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:w-64 shrink-0">
              <div className="sticky top-28 space-y-8">
                <nav aria-label="Section navigation">
                  <ul className="space-y-1 border-l-2 border-black/10">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block pl-4 py-2 -ml-0.5 border-l-2 text-sm font-medium transition-colors ${
                            activeSection === item.id
                              ? 'border-black text-black font-bold'
                              : 'border-transparent text-black/45 hover:text-black/70'
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className={`rounded-2xl p-6 bg-linear-to-br ${service.gradient} border border-black/5`}>
                  <p style={heading} className="text-lg font-bold text-black mb-2 leading-snug">
                    Ready to start?
                  </p>
                  <p className="text-sm text-black/60 mb-5 leading-relaxed">
                    Tell us about your goals — we&apos;ll map out the approach.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-black border-b-2 border-black pb-0.5 hover:gap-3 transition-all"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content column */}
            <div className="flex-1 min-w-0">
              {/* Overview */}
              <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-32 pb-16 sm:pb-20 border-b border-black/10">
                <div className="sd-reveal flex items-center gap-3 mb-6">
                  <span className={`w-2 h-2 rounded-full bg-linear-to-br ${service.gradient.replaceAll('/20', '')}`} />
                  <h2 id="overview-heading" style={heading} className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
                    Overview
                  </h2>
                </div>
                <p className="sd-reveal text-xl sm:text-2xl text-black leading-snug font-light tracking-tight">
                  {service.intro}
                </p>
              </section>

              {/* What We Offer */}
              <section id="offerings" aria-labelledby="offerings-heading" className="scroll-mt-32 py-16 sm:py-20 border-b border-black/10">
                <h2 id="offerings-heading" style={heading} className="sd-reveal text-2xl sm:text-3xl font-bold text-black mb-8 sm:mb-10 tracking-tight">
                  What We Offer
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.offerings.map((offering, index) => (
                    <li key={offering.title} className="sd-card">
                      <article className="h-full p-5 sm:p-6 rounded-2xl bg-gray-50 border border-black/5 hover:border-black/20 transition-all duration-300">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-xs font-bold mb-3">
                          {index + 1}
                        </span>
                        <h3 style={heading} className="text-base sm:text-lg font-semibold text-black mb-2 tracking-tight">{offering.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{offering.description}</p>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Why Choose TheCraftSync */}
              <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-32 py-16 sm:py-20 border-b border-black/10">
                <h2 id="benefits-heading" style={heading} className="sd-reveal text-2xl sm:text-3xl font-bold text-black mb-8 sm:mb-10 tracking-tight">
                  Why Choose TheCraftSync
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="sd-card flex gap-3 items-start">
                      <span className={`shrink-0 mt-0.5 w-6 h-6 rounded-full bg-linear-to-br ${service.gradient} flex items-center justify-center border border-black/5`}>
                        <Check className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                      </span>
                      <span className="text-base text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Process */}
              <section id="process" aria-labelledby="process-heading" className="scroll-mt-32 py-16 sm:py-20 border-b border-black/10">
                <h2 id="process-heading" style={heading} className="sd-reveal text-2xl sm:text-3xl font-bold text-black mb-8 sm:mb-10 tracking-tight">
                  How Engagement Works
                </h2>
                <ol className="space-y-6">
                  {processSteps.map((step, index) => (
                    <li key={step.title} className="sd-card flex gap-5 items-start">
                      <span className="shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-black">{index + 1}</span>
                      </span>
                      <div className="flex-1 pt-1.5">
                        <h3 style={heading} className="text-base sm:text-lg font-bold text-black mb-1 tracking-tight">{step.title}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed font-light">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* FAQ */}
              <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-32 py-16 sm:py-20">
                <h2 id="faq-heading" style={heading} className="sd-reveal text-2xl sm:text-3xl font-bold text-black mb-8 sm:mb-10 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <dl className="space-y-2">
                  {service.faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    const questionId = `faq-question-${index}`;
                    const answerId = `faq-answer-${index}`;
                    return (
                      <div key={faq.question} className="sd-card border-b border-black/10">
                        <dt>
                          <button
                            id={questionId}
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full flex items-center justify-between gap-4 text-left py-4 sm:py-5 cursor-pointer"
                            aria-expanded={isOpen}
                            aria-controls={answerId}
                          >
                            <span className="text-sm sm:text-base font-bold text-black">{faq.question}</span>
                            <ChevronDown className={`shrink-0 w-4 h-4 text-black/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </dt>
                        <dd
                          id={answerId}
                          role="region"
                          aria-labelledby={questionId}
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <p className="text-sm text-gray-600 leading-relaxed pb-5">{faq.answer}</p>
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </section>
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <section aria-labelledby="related-heading" className="px-4 sm:px-6 lg:px-20 py-16 sm:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto">
                <h2 id="related-heading" style={heading} className="sd-reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-10 sm:mb-14 tracking-tight">
                  Related Services
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                  {relatedServices.map((related) => (
                    <li key={related.slug} className="sd-card">
                      <Link
                        href={`/services/${related.slug}`}
                        className="group relative block h-full p-7 sm:p-8 rounded-2xl bg-white border border-black/10 hover:border-black transition-all duration-300 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-linear-to-br ${related.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                        <div className="relative z-10">
                          <h3 style={heading} className="text-lg sm:text-xl font-semibold text-black mb-3 tracking-tight leading-snug">{related.name}</h3>
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-black/60 group-hover:text-black transition-colors">
                            Learn more
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* CTA */}
          <section aria-labelledby="cta-heading" className="relative sd-reveal px-4 sm:px-6 lg:px-20 py-20 sm:py-32 bg-black text-white text-center overflow-hidden">
            <div className="absolute inset-0 opacity-25">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-br ${service.gradient} rounded-full blur-[130px]`} />
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 id="cta-heading" style={heading} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Let&apos;s Build {service.name}
              </h2>
              <p className="text-base sm:text-xl text-gray-400 font-light mb-10 leading-relaxed">
                Tell us about your goals and we&apos;ll show you exactly how we&apos;d approach it.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
