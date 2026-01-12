'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blogs: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const blogPosts = [
    {
      id: 1,
      category: 'EXPERTISE, INSPIRATION',
      title: 'Digital transformation: AI trends shaping business in 2026',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
      bgColor: 'bg-black',
      textColor: 'text-white',
      roundedCorner: 'rounded-tl-[80px]' // top-left rounded
    },
    {
      id: 2,
      category: 'DEVELOPMENT, INNOVATION',
      title: 'Building scalable systems: A guide to modern software architecture',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
      bgColor: 'bg-black',
      textColor: 'text-white',
      roundedCorner: 'rounded-tr-[80px]' // top-right rounded
    },
    {
      id: 3,
      category: 'AI, AUTOMATION',
      title: 'How generative AI is revolutionizing custom software development',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      bgColor: 'bg-black',
      textColor: 'text-white',
      roundedCorner: 'rounded-tl-[80px]' // top-left rounded
    }
  ];

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Blog cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.blog-card');
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="flex justify-between items-center mb-16">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-light text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Latest articles
          </h2>
          <button className="px-8 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group">
            View our blog
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className={`blog-card ${post.bgColor} ${post.roundedCorner} overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <p 
                  className={`text-xs uppercase tracking-wider mb-4 ${post.textColor} opacity-60`}
                  style={{ fontFamily: 'var(--font-descriptive)' }}
                >
                  {post.category}
                </p>
                <h3 
                  className={`text-2xl font-medium ${post.textColor} leading-tight`}
                  style={{ fontFamily: 'var(--font-descriptive)' }}
                >
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;

