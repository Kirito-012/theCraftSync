'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Blogs: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs`);
        const json = await res.json();
        if (json.success) {
          setBlogPosts(json.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Only animate if there are items to animate
    let ctx: gsap.Context;
    if (blogPosts.length > 0) {
      ctx = gsap.context(() => {
        // Header animation
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // Blog cards stagger animation
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.blog-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, [blogPosts]);

  return (
    <section className="w-full bg-white py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 mb-12 md:mb-16">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-light text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Latest articles
          </h2>
          <Link href="/blogs" className="px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer">
            View our blog
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => {
            const roundedCorner = index === 1 ? 'rounded-tr-[80px]' : 'rounded-tl-[80px]';
            return (
              <Link
                key={post._id}
                href={`/blogs/${post.slug || post._id}`}
                className={`blog-card bg-black flex flex-col h-full ${roundedCorner} overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
              >
                {/* Image Section */}
                <div className="relative h-60 md:h-64 lg:h-72 overflow-hidden bg-gray-900 border-b border-white/10 shrink-0">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <p 
                    className="text-[10px] md:text-xs uppercase tracking-wider mb-3 md:mb-4 text-white opacity-60 line-clamp-1"
                    style={{ fontFamily: 'var(--font-descriptive)' }}
                  >
                    {post.category?.name || 'Uncategorized'}
                  </p>
                  <h3 
                    className="text-xl md:text-2xl font-medium text-white leading-tight line-clamp-3 mb-0"
                    style={{ fontFamily: 'var(--font-descriptive)' }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blogs;

