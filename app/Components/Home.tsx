import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Accordion Data
  const slices = [
    {
      id: 1,
      title: "App",
      image: "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Data-driven insights"
    },
    {
      id: 2,
      title: "Design",
      image: "/design.jpg",
      desc: "Visual storytelling"
    },
    {
      id: 3,
      title: "Web",
      image: "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Robust engineering"
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    const animations: gsap.core.Tween[] = [];

    // Rotating Badge Animation
    if (badgeRef.current) {
      const rotAnim = gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });
      animations.push(rotAnim);

      // Fade in badge
      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }

    // Text reveal
    if (textRef.current?.children) {
      Array.from(textRef.current.children).forEach((child, index) => {
        tl.fromTo(child,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' },
          0.2 + (index * 0.15)
        );
      });
    }

    // Subtext
    if (subtextRef.current) {
      tl.fromTo(subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        0.8
      );
    }

    // Button
    if (btnRef.current) {
      tl.fromTo(btnRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        1.0
      );
    }

    return () => {
      animations.forEach(anim => anim.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Side - 50% */}
      <div className="w-1/2 flex items-center justify-center px-12 lg:px-20 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="max-w-2xl relative z-10">
          <div ref={textRef} className="mb-8">
            <h1 className="text-7xl lg:text-8xl xl:text-8xl font-black leading-none tracking-tighter">
              <div className="mb-3 text-black">EXCEPTIONAL</div>
              <div className="mb-3 text-black">DIGITAL</div>
              <div className="text-black relative inline-block">
                EXPERIENCES
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-black"></div>
              </div>
            </h1>
          </div>

          <h1 ref={textRef} className="font-heading mb-6 sm:mb-10 text-4xl sm:text-5xl lg:text-5xl xl:text-7xl font-black leading-[0.9] sm:leading-[0.85] tracking-tighter text-black w-full relative z-20">
            <div className="overflow-visible"><div className="block whitespace-nowrap">EXCEPTIONAL</div></div>
            <div className="overflow-visible"><div className="block italic text-zinc-400 font-light whitespace-nowrap">DIGITAL</div></div>
            <div className="overflow-visible"><div className="block whitespace-nowrap">EXPERIENCES</div></div>
          </h1>

          <div ref={subtextRef} className="max-w-md mb-8 sm:mb-12">
            <p className="font-descriptive text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
              We exist to bridge the gap between imagination and reality.
              <span className="block mt-2 text-black">Precision. Passion. Perfection.</span>
            </p>
          </div>

          <button ref={btnRef} className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-black text-white overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <span className="relative z-10 font-descriptive font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-4">
              Start Project
              <span className="block h-[1px] w-6 sm:w-8 bg-white/50 group-hover:w-12 transition-all duration-300"></span>
            </span>
            <div className="absolute inset-0 bg-zinc-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          </button>
        </div>
      </div>

      {/* Right Side: Interactive Accordion Gallery (Desktop) / Horizontal Snap Scroll (Mobile) */}
      <div className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-screen relative flex bg-zinc-900 border-t lg:border-t-0 border-zinc-200 lg:flex-row flex-row overflow-x-auto snap-x snap-mandatory lg:overflow-hidden scrollbar-hide">
        {slices.map((slice) => (
          <div
            key={slice.id}
            className="group relative lg:flex-1 min-w-[85vw] sm:min-w-[60vw] lg:min-w-0 h-full lg:h-full lg:min-h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hover:flex-[2.5] hover:flex-grow overflow-hidden border-r lg:border-r-0 lg:border-l border-zinc-500/20 snap-center"
          >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full transform scale-100 group-hover:scale-110 transition-transform duration-1000">
              <img
                src={slice.image}
                alt={slice.title}
                className="w-full h-full object-cover opacity-100 sm:opacity-60 lg:opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale-0 sm:grayscale lg:grayscale group-hover:grayscale-0"
              />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end items-start lg:items-center">
              <div className="relative z-10 transform lg:rotate-[-90deg] lg:group-hover:rotate-0 transition-all duration-500 lg:origin-bottom-left lg:absolute lg:bottom-12 lg:left-8 whitespace-nowrap">
                <h3 className="text-white font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tighter uppercase mb-1 sm:mb-2">
                  {slice.title}
                </h3>
                <p className="font-descriptive text-zinc-300 text-xs sm:text-sm tracking-widest uppercase opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-0 sm:translate-y-4 lg:group-hover:translate-y-0">
                  {slice.desc}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default HeroSection;