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
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80'
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    const animations: gsap.core.Tween[] = [];

    // Epic text reveal animation
    if (textRef.current?.children) {
      Array.from(textRef.current.children).forEach((child, index) => {
        // Split effect
        const anim = tl.fromTo(child,
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
        animations.push(anim);
      });
    }

    // Animated line
    const lineAnim = tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5, ease: 'power4.out' },
      0.6
    );
    if (lineAnim) animations.push(lineAnim);

    // Subtext animation
    const subtextAnim = tl.fromTo(subtextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      1
    );
    if (subtextAnim) animations.push(subtextAnim);

    // Infinite scroll animations for columns
    const animateColumn = (
      ref: React.RefObject<HTMLDivElement | null>, 
      direction: 'up' | 'down', 
      duration: number
    ): void => {
      const element = ref.current;
      if (!element) return;
      
      // Get half the scroll height since we duplicate the images
      const scrollHeight = element.scrollHeight / 2;
      
      const anim = gsap.fromTo(element, 
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
      animations.push(anim);
    };

    // Start column animations immediately
    animateColumn(column1Ref, 'down', 20);
    animateColumn(column2Ref, 'up', 25);
    animateColumn(column3Ref, 'down', 22);

    return () => {
      // Kill all animations on unmount
      animations.forEach(anim => {
        if (anim) anim.kill();
      });
      tl.kill();
    };
  }, []);

  const renderColumn = (): React.ReactElement[] => {
    // Duplicate images twice for seamless infinite scroll
    const doubledImages = [...images, ...images];
    const elements: React.ReactElement[] = [];
    
    doubledImages.forEach((img: string, idx: number) => {
      // Add image
      elements.push(
        <div 
          key={`img-${idx}`} 
          className="w-full mb-4 overflow-hidden rounded-md"
          style={{ height: '20rem', minHeight: '20rem' }}
        >
          <img 
            src={img} 
            alt={`Gallery ${idx}`}
            className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
          />
        </div>
      );
      
      // Add black block after each image
      elements.push(
        <div 
          key={`block-${idx}`} 
          className="w-full mb-4 rounded-md bg-black"
          style={{ height: '20rem', minHeight: '20rem' }}
        />
      );
    });
    
    return elements;
  };

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
          
          <div ref={lineRef} className="w-20 h-1 bg-black mb-8 origin-left"></div>
          
          <div ref={subtextRef}>
            <p className="text-xl lg:text-2xl text-black font-light tracking-wide leading-relaxed">
              Where creativity meets precision.<br/>
              <span className="font-semibold">Bold. Beautiful. Unforgettable.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - 50% */}
      <div className="w-1/2 p-4 overflow-hidden bg-black">
        {/* Wrapper for all 3 columns with white background */}
        <div className="flex gap-2 h-full bg-white ">
          {/* Column 1 */}
          <div className="flex-1 bg-black overflow-hidden">
            <div ref={column1Ref} className="flex flex-col">
              {renderColumn()}
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex-1 bg-black overflow-hidden">
            <div ref={column2Ref} className="flex flex-col">
              {renderColumn()}
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 bg-black overflow-hidden">
            <div ref={column3Ref} className="flex flex-col">
              {renderColumn()}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;