'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          
          if (isScrollingDown && currentScrollY > 100 && !isVisible && !isAnimating.current) {
            isAnimating.current = true;
            setIsVisible(true);
            gsap.fromTo(
              navRef.current,
              { y: -100, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                ease: 'power3.out',
                onComplete: () => {
                  isAnimating.current = false;
                }
              }
            );
          } 
          else if ((currentScrollY <= 100 || !isScrollingDown) && isVisible && !isAnimating.current) {
            isAnimating.current = true;
            gsap.to(navRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.4,
              ease: 'power3.in',
              onComplete: () => {
                setIsVisible(false);
                isAnimating.current = false;
              }
            });
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Page', href: '#page', hasDropdown: true },
    { name: 'About Us', href: '#about' },
    { name: 'Project', href: '#project' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '#blog' }
  ];

  return (
    <>
      {isVisible && (
        <nav
          ref={navRef}
          className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[80%] max-w-4xl"
        >
          <div className="bg-black backdrop-blur-md rounded-full px-6 md:px-8 py-4 shadow-2xl border border-amber-900/20">
            <div className="flex items-center justify-center gap-20">
              {/* Logo */}
              <Image
                src="/logo1.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-auto flex-shrink-0"
              />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center gap-1 group whitespace-nowrap"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </a>
                ))}
              </div>

              {/* Contact Button - Desktop */}
              <button className="hidden lg:flex items-center gap-2 border-2 border-gray-800 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white hover:text-black group">
                <span className="w-2 h-2 bg-white rounded-full transition-all duration-300 group-hover:bg-black"></span>
                Contact Us
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-amber-900/20">
                <div className="flex flex-col gap-3">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  
                  {/* Contact Button - Mobile */}
                  <button className="flex items-center justify-center gap-2 border border-white text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white hover:text-black group mt-2">
                    <span className="w-2 h-2 bg-white rounded-full transition-all duration-300 group-hover:bg-black"></span>
                    Contact Us
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}