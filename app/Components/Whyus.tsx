'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const topics = [
    {
      id: 1,
      title: 'Expert Team',
      subtitle: '7+ Years Experience • Senior Engineers • Certified Specialists',
      description: 'Experienced professionals delivering reliable, production-ready systems.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      buttonText: 'Meet The Team'
    },
    {
      id: 2,
      title: 'Engineering-First',
      subtitle: 'Architecture-Led Builds • Code Quality Focus • Production Standards',
      description: 'Every solution is engineered for performance, stability, and scale.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      buttonText: 'Our Approach'
    },
    {
      id: 3,
      title: 'Strategy + Execution',
      subtitle: 'Practical Roadmaps • Build-Ready Plans • Hands-On Delivery',
      description: 'We recommend only what can be built, deployed, and supported.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      buttonText: 'View Process'
    },
    {
      id: 4,
      title: 'Built to Scale',
      subtitle: 'High-Performance Systems • Secure by Design • Future-Ready Architecture',
      description: 'Systems designed to grow with your business.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      buttonText: 'Learn More'
    },
    {
      id: 5,
      title: 'Clear Process',
      subtitle: 'Defined Milestones • Direct Communication • Full Transparency',
      description: 'You stay informed, aligned, and in control throughout the project.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      buttonText: 'Our Workflow'
    },
    {
      id: 6,
      title: 'Long-Term Partner',
      subtitle: 'Beyond One-Off Work • Continuous Improvement • Full IP Ownership',
      description: 'A dependable technology partner invested in your long-term success.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      buttonText: 'Start Partnership'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.main-heading', {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.main-description', {
        opacity: 0,
        y: 24,
        duration: 1,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>('.service-card');

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });

        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-zinc-50 text-black py-28 px-6 md:px-12 lg:px-24"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 h-full w-px bg-zinc-300" />
          <h2 className="main-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-8 leading-tight">
            Why Choose<br />The Craftsync?
          </h2>
          <p className="main-description text-zinc-600 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
            We don't just build technology — we engineer solutions that work in the real world. At The Craftsync, every project starts with understanding your business, not forcing a tool. Our approach combines strong engineering, strategic thinking, and execution discipline to deliver systems that scale, perform, and last.
          </p>
        </div>
      </div>

      {/* Content */}
    <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-14 lg:pt-[30vh]">

        {/* LEFT SIDEBAR (STICKY + CENTERED ON DESKTOP) */}
        <aside className="lg:col-span-4">
          <div
            className="
              space-y-6
              lg:sticky
              lg:top-1/2
              lg:-translate-y-1/2
            "
          >
            {topics.map((topic, index) => (
              <div
                key={topic.id}
                className={`pl-6 border-l transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-black opacity-100'
                    : 'border-zinc-300 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold tracking-widest">
                    0{index + 1}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeIndex === index ? 'bg-black' : 'bg-zinc-300'
                    }`}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                  {topic.title}
                </h3>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-8 space-y-28 mt-20 lg:mt-0">
          {topics.map((topic, index) => (
            <div key={topic.id} className="service-card">
              <div className="relative h-80 md:h-[26rem] overflow-hidden bg-zinc-900">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-6 right-6 w-14 h-14 bg-white flex items-center justify-center font-bold text-black">
                  0{index + 1}
                </div>
              </div>

              <div className="-mt-14 relative z-10 bg-white border border-zinc-200 p-8 md:p-10 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-black" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
                      Feature {index + 1}
                    </span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-semibold">
                    {topic.title}
                  </h4>

                  <div className="flex flex-wrap gap-3 text-sm md:text-base text-zinc-600">
                    {topic.subtitle.split('•').map((item, i) => (
                      <span key={i}>{item.trim()}</span>
                    ))}
                  </div>

                  <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
                    {topic.description}
                  </p>

                  <button className="inline-flex items-center gap-3 border border-black px-8 py-4 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition">
                    {topic.buttonText}
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
