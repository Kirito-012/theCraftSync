import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  const images: string[] = [
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg',
    'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg'
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Epic text reveal animation
    if (textRef.current?.children) {
      Array.from(textRef.current.children).forEach((child, index) => {
        // Split effect
        tl.fromTo(child,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: 'top center',
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
          },
          index * 0.15
        );
      });
    }

    // Animated line
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5, ease: 'power4.out' },
      0.6
    );

    // Subtext animation
    tl.fromTo(subtextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      1
    );

    // Infinite scroll animations for columns
    const animateColumn = (
      ref: React.RefObject<HTMLDivElement | null>, 
      direction: 'up' | 'down', 
      duration: number
    ): void => {
      const element = ref.current;
      if (!element) return;
      
      const scrollHeight = element.scrollHeight / 4;
      
      gsap.fromTo(element, 
        {
          y: direction === 'down' ? 0 : -scrollHeight
        },
        {
          y: direction === 'down' ? -scrollHeight : 0,
          duration: duration,
          ease: 'none',
          repeat: -1,
        }
      );
    };

    // Start column animations immediately
    animateColumn(column1Ref, 'down', 20);
    animateColumn(column2Ref, 'up', 25);
    animateColumn(column3Ref, 'down', 22);

  }, []);

  const renderColumn = (): React.ReactElement[] => {
    return [...images, ...images, ...images, ...images].map((img: string, idx: number) => (
      <React.Fragment key={idx}>
        <div className="w-full aspect-[3/4] mb-4 overflow-hidden">
          <img 
            src={img} 
            alt={`Gallery ${idx}`}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="w-full aspect-[3/4] mb-4 bg-black"></div>
      </React.Fragment>
    ));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Side - 60% */}
      <div className="w-3/5 flex items-center justify-center px-12 lg:px-20 relative overflow-hidden">
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
          
          <div ref={lineRef} className="w-20 h-1 bg-black mb-8 origin-left"></div>
          
          <div ref={subtextRef}>
            <p className="text-xl lg:text-2xl text-black font-light tracking-wide leading-relaxed">
              Where creativity meets precision.<br/>
              <span className="font-semibold">Bold. Beautiful. Unforgettable.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - 40% */}
      <div className="w-2/5 flex gap-4 p-4 overflow-hidden bg-white">
        {/* Column 1 */}
        <div ref={column1Ref} className="flex-1 flex flex-col">
          {renderColumn()}
        </div>

        {/* Column 2 */}
        <div ref={column2Ref} className="flex-1 flex flex-col">
          {renderColumn()}
        </div>

        {/* Column 3 */}
        <div ref={column3Ref} className="flex-1 flex flex-col">
          {renderColumn()}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;