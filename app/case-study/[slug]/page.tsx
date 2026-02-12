'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug } from '@/app/lib/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
      }

      // Animate each section
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        // Animate images
        const images = section.querySelectorAll('.section-image');
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { x: img.classList.contains('image-left') ? -80 : 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );

          // Parallax on scroll
          gsap.to(img.querySelector('img'), {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
        });

        // Animate content
        const contents = section.querySelectorAll('.section-content');
        contents.forEach((content) => {
          gsap.fromTo(
            content.querySelectorAll('.animate-item'),
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: content,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Project Not Found
          </h1>
          <Link 
            href="/case-study"
            className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
          >
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main ref={heroRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-4 flex-wrap">
            <span className="text-sm tracking-widest text-white/60 uppercase" style={{ fontFamily: 'var(--font-descriptive)' }}>
              {project.year}
            </span>
            <div className="w-12 h-px bg-white/30" />
            <div className="flex gap-2 flex-wrap justify-center">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {project.title.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </h1>

          <p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-descriptive)' }}
          >
            {project.caseStudyTitle}
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Overview Section - Image Left, Content Right */}
      <section ref={(el) => { sectionRefs.current[0] = el; }} className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Left */}
            <div className="section-image image-left relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={project.image}
                alt={`${project.title} overview`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={100}
              />
            </div>

            {/* Content Right */}
            <div className="section-content">
              <h2 
                className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Overview
              </h2>
              <p 
                className="animate-item text-lg md:text-xl text-neutral-700 leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-descriptive)' }}
              >
                {project.overview}
              </p>
              <div className="animate-item text-sm text-neutral-500 uppercase tracking-wider">
                Project Delivered in {project.year}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Built Section - Content Left, Image Right */}
      <section ref={(el) => { sectionRefs.current[1] = el; }} className="py-20 md:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Left */}
            <div className="section-content lg:order-1">
              <h2 
                className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                What We Built
              </h2>
              <div className="space-y-6">
                {project.whatWeBuilt.map((item, index) => {
                  const [title, description] = item.split(': ');
                  return (
                    <div key={index} className="animate-item">
                      <h3 
                        className="text-xl md:text-2xl font-bold mb-2 text-black"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {title}
                      </h3>
                      <p 
                        className="text-neutral-600 leading-relaxed"
                        style={{ fontFamily: 'var(--font-descriptive)' }}
                      >
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image Right */}
            <div className="section-image image-right relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-neutral-100 lg:order-2">
              <Image
                src={project.image}
                alt={`${project.title} features`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Full Width with Grid */}
      <section ref={(el) => { sectionRefs.current[2] = el; }} className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 tracking-tight text-center"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Impact & Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {project.impact.map((item, index) => (
              <div 
                key={index}
                className="animate-item group"
              >
                <div className="text-7xl md:text-8xl font-black mb-6 text-white/10 group-hover:text-white/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p 
                  className="text-lg md:text-xl text-white/90 leading-relaxed"
                  style={{ fontFamily: 'var(--font-descriptive)' }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Cool Grid Layout */}
      <section ref={(el) => { sectionRefs.current[3] = el; }} className="py-20 md:py-32 bg-neutral-950 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/60">Tech Stack</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Expertise Delivered
            </h2>
            <p 
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-descriptive)' }}
            >
              Technologies and methodologies we leveraged to create excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {project.expertise.map((skill, index) => (
              <div 
                key={index}
                className="animate-item group relative h-full"
              >
                {/* Card background */}
                <div className="relative h-full min-h-[140px] p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 backdrop-blur-sm overflow-hidden flex flex-col justify-between">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white mt-2 flex-shrink-0 transition-colors duration-300" />
                      <h3 
                        className="text-base md:text-lg font-semibold text-white leading-tight flex-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {skill}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Build Something Amazing?
          </h2>
          <p 
            className="text-xl md:text-2xl text-neutral-600 mb-12"
            style={{ fontFamily: 'var(--font-descriptive)' }}
          >
            Let&apos;s create your next digital masterpiece together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-black/90 transition-all hover:scale-105"
              style={{ fontFamily: 'var(--font-descriptive)' }}
            >
              Start a Project
            </Link>
            <Link
              href="/case-study"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-descriptive)' }}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
