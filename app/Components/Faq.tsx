'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does The Craftsync do?",
    answer: "The Craftsync is a custom software and AI development company that helps businesses build scalable digital solutions, including enterprise software, AI-powered systems, and platforms designed to support growth and operational efficiency."
  },
  {
    question: "Do you provide custom software development services?",
    answer: "Yes. We provide custom software development services that help businesses replace manual processes, streamline operations, and scale reliably as teams, users, and data grow."
  },
  {
    question: "What AI and machine learning solutions do you offer?",
    answer: "We offer AI & machine learning solutions such as generative AI integration, AI automation, computer vision, and analytics that help businesses improve efficiency, automate decisions, and scale operations intelligently."
  },
  {
    question: "How do digital solutions help businesses scale?",
    answer: "Digital solutions help businesses scale by automating repetitive work, improving data visibility, reducing operational bottlenecks, and enabling systems to handle increased users and complexity without breaking."
  },
  {
    question: "Do you work with startups or enterprises?",
    answer: "We work with growing startups and enterprise teams that need technology built to scale, supporting business expansion without constant rework or performance issues."
  },
  {
    question: "Will we own the source code and intellectual property?",
    answer: "Yes. Clients retain 100% ownership of the source code and intellectual property, giving them full control to scale, evolve, and extend their digital solutions independently."
  },
  {
    question: "How long does custom software development take?",
    answer: "Timelines depend on scope and complexity. Smaller systems may take a few weeks, while scalable enterprise software platforms typically require several months after discovery and planning."
  },
  {
    question: "Can you integrate with our existing tools and systems?",
    answer: "Yes. We specialize in API integrations and enterprise system connectivity, allowing businesses to scale without replacing existing tools or disrupting current operations."
  },
  {
    question: "Do you offer consulting before development starts?",
    answer: "Yes. Our technology consulting services help businesses plan scalable architecture, choose the right tech stack, and avoid costly rebuilds as they grow."
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Yes. We provide ongoing support and optimization to ensure your digital solutions continue to perform, scale, and adapt as business needs evolve."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!extraRef.current) return;

    if (isExpanded) {
      gsap.to(extraRef.current, {
        height: 'auto',
        duration: 0.8,
        ease: 'power3.inOut',
        onUpdate: () => ScrollTrigger.refresh(),
        onComplete: () => ScrollTrigger.refresh()
      });
      
      const extraItems = extraRef.current.querySelectorAll('.faq-item');
      gsap.fromTo(extraItems, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(extraRef.current, {
        height: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onUpdate: () => ScrollTrigger.refresh(),
        onComplete: () => ScrollTrigger.refresh()
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [openIndex]);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    // Heading animation
    if (headingRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, headingRef)
    }

    // FAQ items stagger animation
    if (listRef.current) {
      const container = listRef.current;
      if (!ctx) {
        ctx = gsap.context(() => {
          const items = container.querySelectorAll('.faq-item');
          gsap.fromTo(
            items,
            {
              opacity: 0,
              x: -50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }, container)
      } else {
        const items = container.querySelectorAll('.faq-item');
        gsap.fromTo(
          items,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, []);

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
        className="faq-wrapper"
      >
        {/* Heading on Top */}
        <div ref={headingRef} className="faq-heading" style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: '300',
            color: 'var(--snow-white)',
            margin: 0,
            lineHeight: '0.95',
            letterSpacing: '-0.02em'
          }}>
            FAQ&apos;s
          </h2>
        </div>

        {/* Accordion List Below */}
        <div ref={listRef} className="faq-list">
          {faqs.slice(0, 4).map((faq, index) => (
            <div 
              key={index}
              className="faq-item"
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '1.5rem',
                marginBottom: '1.5rem'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  textAlign: 'left',
                  gap: '1.5rem'
                }}
                aria-expanded={openIndex === index}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease'
                }}>
                  {openIndex === index ? (
                    <X size={28} strokeWidth={1.5} color="var(--snow-white)" />
                  ) : (
                    <Plus size={28} strokeWidth={1.5} color="var(--snow-white)" />
                  )}
                </div>
                <span style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: '400',
                  color: 'var(--snow-white)',
                  lineHeight: '1.4',
                  flex: 1
                }}>{faq.question}</span>
              </button>
              <div 
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease',
                  opacity: openIndex === index ? 1 : 0,
                  marginTop: openIndex === index ? '1.5rem' : '0'
                }}
              >
                <div style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                  lineHeight: '1.6',
                  color: 'var(--snow-white)',
                  backgroundColor: '#000000',
                  padding: openIndex === index ? '1rem 0 1rem 3.5rem' : '0',
                  transition: 'padding 0.4s ease'
                }}>{faq.answer}</div>
              </div>
            </div>
          ))}

          {/* Extra items for smooth height expansion */}
          <div ref={extraRef} style={{ height: 0, overflow: 'hidden' }}>
            {faqs.slice(4).map((faq, index) => {
              const actualIndex = index + 4;
              return (
                <div 
                  key={actualIndex}
                  className="faq-item"
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '1.5rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(actualIndex)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem 0',
                      textAlign: 'left',
                      gap: '1.5rem'
                    }}
                    aria-expanded={openIndex === actualIndex}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.3s ease'
                    }}>
                      {openIndex === actualIndex ? (
                        <X size={28} strokeWidth={1.5} color="var(--snow-white)" />
                      ) : (
                        <Plus size={28} strokeWidth={1.5} color="var(--snow-white)" />
                      )}
                    </div>
                    <span style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      fontWeight: '400',
                      color: 'var(--snow-white)',
                      lineHeight: '1.4',
                      flex: 1
                    }}>{faq.question}</span>
                  </button>
                  <div 
                    style={{
                      maxHeight: openIndex === actualIndex ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease',
                      opacity: openIndex === actualIndex ? 1 : 0,
                      marginTop: openIndex === actualIndex ? '1.5rem' : '0'
                    }}
                  >
                    <div style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                      lineHeight: '1.6',
                      color: 'var(--snow-white)',
                      backgroundColor: '#000000',
                      padding: openIndex === actualIndex ? '1rem 0 1rem 3.5rem' : '0',
                      transition: 'padding 0.4s ease'
                    }}>{faq.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        {faqs.length > 4 && (
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'var(--snow-white)',
                padding: '1.2rem 3rem',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em'
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = 'var(--snow-white)';
                btn.style.color = '#000000';
                btn.style.borderColor = 'var(--snow-white)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--snow-white)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              {isExpanded ? 'Show Less' : 'View All questions'}
            </button>
          </div>
        )}
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

        .faq-list {
          width: 100%;
        }

        .faq-item button:hover span {
          color: var(--emerald-accent);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .faq-heading {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
