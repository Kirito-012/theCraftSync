// components/ProjectsShowcase.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../lib/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      projectRefs.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 90,
            opacity: 0,
            scale: 0.94
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-neutral-950 py-28 md:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-950 via-neutral-900/30 to-neutral-950 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-24 md:mb-36 text-center">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Selected Work
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-descriptive)' }}
          >
            A collection of purposeful digital experiences crafted with attention to detail
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {projectsData.map((project, index) => (
            <Link
              key={project.id}
              href={`/case-study/${project.slug}`}
              className="group relative block"
              ref={(el) => { projectRefs.current[index] = el as HTMLDivElement | null; }}
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden rounded-[var(--radius)] bg-neutral-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[850ms] ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  quality={82}
                  priority={index < 2}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-70 group-hover:opacity-82 transition-opacity duration-500" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-7 sm:p-9 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-4">
                    <time
                      className="text-sm tracking-wider text-white/75"
                      style={{ fontFamily: 'var(--font-descriptive)' }}
                    >
                      {project.year}
                    </time>

                    <span
                      className="text-xs font-medium uppercase tracking-widest text-white/50"
                      style={{ fontFamily: 'var(--font-descriptive)' }}
                    >
                      {String(project.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {project.title.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </h2>

                  <p
                    className="text-base md:text-lg text-white/85 max-w-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600 ease-out"
                    style={{ fontFamily: 'var(--font-descriptive)' }}
                  >
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/85 border border-white/10"
                        style={{ fontFamily: 'var(--font-descriptive)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}