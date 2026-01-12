import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  category: string;
}

const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', 
    title: 'Brand Identity', 
    category: 'Branding' 
  },
  { 
    id: 2, 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 
    title: 'Web Design', 
    category: 'Digital' 
  },
  { 
    id: 3, 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', 
    title: 'Marketing Campaign', 
    category: 'Strategy' 
  },
  { 
    id: 4, 
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', 
    title: 'Motion Graphics', 
    category: 'Design' 
  },
];

const ProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(cardsRef.current, {
        xPercent: 350,
        y: 0,
        scale: 0.75,
        rotate: 8,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%', // Extend scroll distance for dramatic effect
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const t = index * 0.6;

        tl.to(
          card,
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 2.6,
            ease: 'none',
            keyframes: [
              { y: -160, duration: 0.4 },
              { y: 0, duration: 0.45 },
              { y: -90, duration: 0.3 },
              { y: 0, duration: 0.35 },
              { y: -40, duration: 0.25 },
              { y: 0, duration: 0.3 },
            ],
          },
          t
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[var(--snow-white)] overflow-hidden"
      style={{ fontFamily: 'var(--font-descriptive)' }}
    >
      <div className="h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <h2 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase text-[var(--navy-dark)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
             What We’ve Built

            </h2>

            <h2 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase text-[var(--navy-dark)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              our <span className=" italic font-serif">creations</span>
            </h2>

            <p 
              className="mt-4 text-base sm:text-lg md:text-xl text-black max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-descriptive)' }}
            >
           Solutions that solve real problems
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {portfolioItems.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative rounded-xl overflow-hidden  shadow-2xl border  will-change-transform backdrop-blur-sm"
              >
                <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
                  {item.type === 'video' ? (
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-dark)]/70 via-[var(--navy-dark)]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-4 sm:p-6 text-[var(--snow-white)]">
                      <p className="text-xs sm:text-sm text-[var(--emerald-accent)] font-semibold mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--snow-white)]/40 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="text-center mt-10 text-sm text-black">
           Scroll through platforms crafted for clarity, performance, and growth.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;