'use client';

import { useEffect, useRef } from 'react';
import { gsap, Power3 } from 'gsap';
import { projectsData, Project } from '../lib/projectsData';

export default function CaseStudiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fade‑in animation for each card on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.case-card');
    gsap.set(cards, { opacity: 0, y: 30 });
    const tl = gsap.timeline({ defaults: { ease: Power3.easeOut, duration: 0.6 } });
    cards.forEach((card, i) => {
      tl.to(card, { opacity: 1, y: 0 }, i * 0.15);
    });
    return () => tl.kill();
  }, []);

  return (
    <section className="bg-white text-black min-h-screen" ref={containerRef}>
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b">
        <h1 className="text-3xl font-bold">Case Studies</h1>
        <nav className="space-x-6">
          <a href="#" className="text-sm hover:underline">All</a>
          <a href="#" className="text-sm hover:underline">Design</a>
          <a href="#" className="text-sm hover:underline">Development</a>
        </nav>
      </header>

      {/* Projects */}
      <div className="space-y-0">
        {projectsData.slice(0, 2).map((project: Project) => (
          <article key={project.id} className="case-card">
            {/* Large Image */}
            <div className="w-full h-[60vh] overflow-hidden">
              <img 
                src={project.bgImage} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content Below Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-12">
              {/* Left: Title */}
              <div>
                <h2 className="text-4xl font-bold leading-tight">{project.name}</h2>
              </div>
              
              {/* Right: Category and Description */}
              <div className="space-y-4">
                <p className="text-sm text-gray-500 uppercase tracking-wider">{project.type}</p>
                <p className="text-base text-gray-700 leading-relaxed">{project.description}</p>
                <a 
                  href={`/projects/${project.slug}`} 
                  className="inline-block text-sm underline hover:opacity-70 mt-4"
                >
                  View Project →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
