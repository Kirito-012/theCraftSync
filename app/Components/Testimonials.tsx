import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Pause, Play } from 'lucide-react';

interface Testimonial {
  company: string;
  logo: string;
  quote: string;
  name: string;
  position: string;
  color: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [arrowSize, setArrowSize] = useState(28);

  const testimonials: Testimonial[] = [
    {
      company: 'Nexus',
      logo: 'NX',
      quote: 'TheCraftsync didn&apos;t just execute a brief — they built alongside us. From structure to storytelling, every decision felt like it was made with our long-term growth in mind.',
      name: 'Sarah Mitchell',
      position: 'CEO at Nexus Ventures',
      color: '#f5e6d3'
    },
    {
      company: 'Catalyst',
      logo: 'CT',
      quote: 'Working with TheCraftsync felt less like hiring an agency and more like adding an extension to our internal team. They asked the right questions, challenged assumptions, and built with intent.',
      name: 'Michael Chen',
      position: 'Head of Product at Catalyst',
      color: '#d4e8d4'
    },
    {
      company: 'Horizon',
      logo: 'HZ',
      quote: 'They think like builders, not service providers. Strategy, design, and execution were all aligned — which is rare. TheCraftsync cared about the outcome as much as we did.',
      name: 'Emily Rodriguez',
      position: 'Founder & CEO at Horizon Labs',
      color: '#fef3c7'
    },
    {
      company: 'Apex',
      logo: 'AX',
      quote: 'What stood out was ownership. TheCraftsync treated our brand as if it were their own — refining details, anticipating problems, and constantly thinking two steps ahead.',
      name: 'David Park',
      position: 'CTO at Apex Systems',
      color: '#dbeafe'
    },
    {
      company: 'Foundry',
      logo: 'FD',
      quote: 'We weren&apos;t looking for something flashy; we wanted something solid. TheCraftsync helped us build a digital foundation that actually supports where the business is going.',
      name: 'Rachel Green',
      position: 'VP of Operations at Foundry',
      color: '#fce7f3'
    },
    {
      company: 'Meridian',
      logo: 'MD',
      quote: 'They didn&apos;t just &apos;deliver a website.&apos; They helped us clarify our positioning, streamline communication, and create something that finally reflects who we are as a brand.',
      name: 'James Wilson',
      position: 'Marketing Director at Meridian',
      color: '#e0e7ff'
    },
    {
      company: 'Vertex',
      logo: 'VX',
      quote: 'TheCraftsync operates like a partner invested in the journey, not a project deadline. Their process is thoughtful, collaborative, and deeply strategic.',
      name: 'Lisa Anderson',
      position: 'Co-Founder at Vertex Digital',
      color: '#d1fae5'
    },
    {
      company: 'Summit',
      logo: 'SM',
      quote: 'What we built together feels intentional and future-ready. TheCraftsync brought structure to our ideas and turned them into a brand system we can actually scale.',
      name: 'Robert Taylor',
      position: 'CEO at Summit Group',
      color: '#fed7aa'
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    };

    // Calculate arrow size on client side only
    const calculateArrowSize = () => {
      setArrowSize(Math.max(24, Math.min(30, window.innerWidth / 40)));
    };

    calculateArrowSize();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', calculateArrowSize);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', calculateArrowSize);
    };
  }, [testimonials.length]);



  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStart);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset < 0) {
        handleNext();
      } else {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section 
      style={{ 
        backgroundColor: '#000000', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 5%',
        fontFamily: "'Montreal', sans-serif",
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1600px', 
          margin: '0 auto',
          width: '100%',
        }}
        className="testimonials-wrapper"
      >
        <div className="testimonials-grid">
          {/* Left Side - Heading */}
          <div className="testimonials-heading">
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: '400',
              color: 'var(--snow-white)',
              margin: 0,
              lineHeight: '1',
              letterSpacing: '-0.01em'
            }}>
              What our<br />clients say
            </h2>
          </div>

          {/* Right Side - Stacked Cards Container */}
          <div className="testimonials-cards-container">
            <div 
              className="testimonials-cards"
              style={{ 
                position: 'relative', 
                height: 'clamp(480px, 75vw, 680px)',
                minHeight: '480px'
              }}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                handleDragEnd();
                setIsHovering(false);
              }}
            >
              {testimonials.map((testimonial, index) => {
                const position = (index - currentIndex + testimonials.length) % testimonials.length;
                const isVisible = position < 3;
                
                if (!isVisible) return null;

                const zIndex = testimonials.length - position;
                const yOffset = -position * 16;
                const xOffset = -position * 16;

                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: `${yOffset}px`,
                      left: `${xOffset}px`,
                      width: 'clamp(320px, 55vw, 580px)',
                      transform: `translateX(${position === 0 && isDragging ? dragOffset : 0}px)`,
                      transition: isDragging ? 'none' : 'all 0.5s ease-out',
                      zIndex: zIndex,
                      cursor: position === 0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{
                      backgroundColor: testimonial.color,
                      borderRadius: '0 162px 0px 0px',
                      padding: 'clamp(2rem, 5vw, 4.5rem)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: position === 0 ? '0 30px 60px -15px rgba(15, 23, 42, 0.25)' : '0 20px 40px -10px rgba(15, 23, 42, 0.15)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      transition: 'box-shadow 0.3s ease'
                    }}>
                      {/* Company Logo */}
                      <div style={{
                        fontSize: 'clamp(2rem, 6vw, 3.2rem)',
                        fontWeight: '700',
                        color: 'var(--navy-dark)',
                        marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: '1'
                      }}>
                        {testimonial.logo}
                      </div>

                      {/* Quote */}
                      <p style={{
                        fontSize: 'clamp(1rem, 2.3vw, 1.4rem)',
                        lineHeight: '1.3',
                        color: 'var(--slate-blue)',
                        margin: '0 0 clamp(2rem, 4vw, 3.5rem) 0',
                        flex: 1,
                        fontWeight: '400'
                      }}>
                        &quot;{testimonial.quote}&quot;
                      </p>

                      {/* Bottom Section */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}>
                        {/* Author Info */}
                        <div>
                          <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            fontWeight: '600',
                            color: 'var(--navy-dark)',
                            margin: '0 0 0.5rem 0'
                          }}>
                            {testimonial.name}
                          </p>
                          <p style={{
                            fontSize: 'clamp(0.875rem, 1.8vw, 1.05rem)',
                            color: 'var(--slate-blue)',
                            margin: 0,
                            fontWeight: '400'
                          }}>
                            {testimonial.position}
                          </p>
                        </div>

                        {/* Buttons Container */}
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                          {/* View Project Button */}
                          <button style={{
                            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                            backgroundColor: 'transparent',
                            color: 'var(--teal-accent)',
                            border: '2px solid var(--teal-accent)',
                            borderRadius: '50px',
                            fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease',
                            fontFamily: "'Montreal', sans-serif",
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--teal-accent)';
                            e.currentTarget.style.color = 'var(--snow-white)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--teal-accent)';
                          }}>
                            View project
                            <ArrowRight size={18} />
                          </button>

                          {/* Auto-play Toggle */}
                          {position === 0 && (
                            <button
                              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                              style={{
                                width: 'clamp(44px, 9vw, 56px)',
                                height: 'clamp(44px, 9vw, 56px)',
                                borderRadius: '50%',
                                backgroundColor: 'transparent',
                                border: '2px solid var(--slate-blue)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                                opacity: 0.7
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.backgroundColor = 'var(--slate-blue)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0.7';
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                              title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                            >
                              {isAutoPlaying ? (
                                <Pause size={20} strokeWidth={2} color="var(--slate-blue)" />
                              ) : (
                                <Play size={20} strokeWidth={2} color="var(--slate-blue)" />
                              )}
                            </button>
                          )}

                          {/* Navigation Circle Arrow */}
                          {position === 0 && (
                            <button
                              onClick={handleNext}
                              style={{
                                width: 'clamp(48px, 10vw, 68px)',
                                height: 'clamp(48px, 10vw, 68px)',
                                borderRadius: '50%',
                                backgroundColor: 'transparent',
                                border: '2px solid var(--emerald-accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                flexShrink: 0
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--emerald-accent)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                                const icon = e.currentTarget.querySelector('svg');
                                if (icon) icon.style.stroke = 'var(--snow-white)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                                const icon = e.currentTarget.querySelector('svg');
                                if (icon) icon.style.stroke = 'var(--emerald-accent)';
                              }}
                              title="Next testimonial (or press →)"
                            >
                              <ChevronRight size={arrowSize} strokeWidth={2} color="var(--emerald-accent)" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Progress Indicators */}
              <div style={{
                position: 'absolute',
                bottom: '-3rem',
                left: '0',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
              }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      width: index === currentIndex ? '2.5rem' : '0.5rem',
                      height: '0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: index === currentIndex ? 'var(--emerald-accent)' : 'var(--alice-blue)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                    onMouseEnter={(e) => {
                      if (index !== currentIndex) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-blue)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentIndex) {
                        e.currentTarget.style.backgroundColor = 'var(--alice-blue)';
                      }
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :global(:root) {
          --navy-dark: #0f172a;
          --slate-blue: #475569;
          --snow-white: #ffffff;
          --alice-blue: #e2e8f0;
          --teal-accent: #14b8a6;
          --emerald-accent: #10b981;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        .testimonials-cards-container {
          display: flex;
          justify-content: flex-end;
        }

        .testimonials-cards {
          width: clamp(320px, 55vw, 580px);
        }

        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 45% 55%;
            gap: 0;
            align-items: center;
          }

          .testimonials-heading {
            justify-self: start;
          }

          .testimonials-cards-container {
            justify-content: flex-end;
            padding-right: 2rem;
          }

          .testimonials-cards {
            width: 580px;
          }
        }

        @media (max-width: 1023px) {
          .testimonials-heading {
            text-align: center;
          }

          .testimonials-cards-container {
            justify-content: center;
          }

          .testimonials-cards {
            width: clamp(320px, 80vw, 550px);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;