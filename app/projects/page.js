'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import './projects.css';

const projectsData = [
  {
    id: 1,
    name: 'ParadiseBliss',
    slug: 'ParadiseBliss',
    type: 'Wellness & Lifestyle',
    description: 'Creating a serene digital experience for mindful living and wellness.',
    bgImage: '/images/projects/paradise-bg.jpg',
    previewImage: '/images/projects/paradise-img.png',
    animationType: 'fadeSlideUp',
    layout: 'layout1' // Image left, title right, description top-left
  },
  {
    id: 2,
    name: 'Indiem',
    slug: 'Indiem',
    type: 'Creative Portfolio',
    description: 'A bold and artistic platform showcasing independent creative work.',
    bgImage: '/images/projects/indiem-bg.jpg',
    previewImage: '/images/projects/indiem-img.png',
    animationType: 'scaleRotate',
    layout: 'layout2' // Title center-left, image top-right, description bottom-right
  },
  {
    id: 3,
    name: 'Moment&Craft',
    slug: 'MomentCraft',
    type: 'Artisanal E-commerce',
    description: 'Handcrafted moments, beautifully curated for authentic experiences.',
    bgImage: '/images/projects/momentcraft-bg.jpg',
    previewImage: '/images/projects/momentcraft-preview.jpg',
    animationType: 'blurReveal',
    layout: 'layout3' // Title bottom-left, image bottom-right, description top-center
  },
  {
    id: 4,
    name: 'Ed Verse',
    slug: 'EdVerse',
    type: 'Educational Technology',
    description: 'Transforming education through interactive and engaging digital learning.',
    bgImage: '/images/projects/edverse-bg.jpg',
    previewImage: '/images/projects/edverse-preview.jpg',
    animationType: 'elasticBounce',
    layout: 'layout4' // Image bottom-left, title right, description top-left
  },
  {
    id: 5,
    name: 'Daxter',
    slug: 'Daxter',
    type: 'Tech Innovation',
    description: 'Cutting-edge solutions for the future of digital technology.',
    bgImage: '/images/projects/daxter-bg.jpg',
    previewImage: '/images/projects/daxter-preview.jpg',
    animationType: 'glitchEffect',
    layout: 'layout1' // Image left, title right, description top-left
  },
  {
    id: 6,
    name: 'Vesa',
    slug: 'Vesa',
    type: 'Minimalist Design',
    description: 'Sophisticated simplicity meets Scandinavian design excellence.',
    bgImage: '/images/projects/vesa-bg.jpg',
    previewImage: '/images/projects/vesa-preview.jpg',
    animationType: 'parallaxSlide',
    layout: 'layout2' // Title center-left, image top-right, description bottom-right
  },
  {
    id: 7,
    name: 'Osexifi',
    slug: 'Osexifi',
    type: 'Digital Innovation',
    description: 'Pioneering the next generation of digital experiences and solutions.',
    bgImage: '/images/projects/osexifi-bg.png',
    previewImage: '/images/projects/osexifi-img.png',
    animationType: 'blurReveal',
    layout: 'layout3' // Title bottom-left, image bottom-right, description top-center
  }
];

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const previewRef = useRef(null);
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const descRef = useRef(null);

  // Professional GSAP animations with proper timelines
  const animateLayout = (layout) => {
    // Kill any existing animations
    const refs = [contentRef.current, previewRef.current, titleRef.current, typeRef.current, descRef.current];
    gsap.killTweensOf(refs);
    
    // Reset all elements to visible state immediately (only if they exist)
    const validRefs = refs.filter(ref => ref !== null);
    if (validRefs.length > 0) {
      gsap.set(validRefs, {
        clearProps: 'all'
      });
    }
    
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 0.8
      },
      onComplete: () => {
        // Ensure everything is visible after animation (only if refs still exist)
        const currentRefs = [contentRef.current, previewRef.current, titleRef.current, typeRef.current, descRef.current].filter(ref => ref !== null);
        if (currentRefs.length > 0) {
          gsap.set(currentRefs, {
            clearProps: 'all'
          });
        }
      }
    });

    switch(layout) {
      case 'layout1':
        // Fade in from bottom (ParadiseBliss style)
        tl.from(typeRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6
        })
        .from(contentRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.out'
        }, '-=0.3')
        .from(previewRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.8
        }, '-=0.7');
        break;

      case 'layout2':
        // Fade in from left
        tl.from(typeRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.6
        })
        .from(contentRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.8
        }, '-=0.3')
        .from(previewRef.current, {
          clipPath: 'inset(0% 0% 0% 100%)',
          duration: 1,
          ease: 'power2.out'
        }, '-=0.5')
        .from(descRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.7
        }, '-=0.6');
        break;

      case 'layout3':
        // Fade in from top and bottom - reveal image from bottom to top
        tl.from(typeRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6
        })
        .from(contentRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8
        }, '-=0.3')
        .from(previewRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.out'
        }, '-=0.6');
        break;

      case 'layout4':
        // Fade in from right - reveal image from right to left
        tl.from(typeRef.current, {
          opacity: 0,
          x: 30,
          duration: 0.6
        })
        .from(contentRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.out'
        }, '-=0.3')
        .from(previewRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.9
        }, '-=0.5');
        break;

      default:
        // Default fade in
        tl.from([typeRef.current, contentRef.current, previewRef.current], {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8
        });
    }

    return tl;
  };

  const handleProjectHover = (project) => {
    setActiveProject(project);
    setIsHovering(true);
    
    // Animate background change
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (bgRef.current) {
          bgRef.current.style.backgroundImage = `url(${project.bgImage})`;
          gsap.to(bgRef.current, { opacity: 1, duration: 0.5 });
        }
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveProject(null);
    
    // Animate back to default background
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (bgRef.current) {
          bgRef.current.style.backgroundImage = `url(/images/projects/default-bg.jpg)`;
          gsap.to(bgRef.current, { opacity: 1, duration: 0.5 });
        }
      }
    });
  };

  useEffect(() => {
    if (isHovering && activeProject && contentRef.current && previewRef.current) {
      // Trigger animation based on layout
      animateLayout(activeProject.layout);
    }
  }, [activeProject?.id]);

  // Set default background on mount
  useEffect(() => {
    if (bgRef.current) {
      // Set default image background (will be hidden when video is shown)
      bgRef.current.style.backgroundImage = `url(/images/projects/default-bg.jpg)`;
    }
  }, []);

  // Render different layouts based on project
  const renderProjectLayout = () => {
    if (!activeProject) return null;

    const layouts = {
      // Layout 1: Image left, title right, description top-left (Upwork style)
      layout1: (
        <div className="relative w-full h-full">
          <div ref={typeRef} className="absolute top-16 left-0 max-w-md">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90 mb-8">
              {activeProject.description}
            </p>
          </div>
          
          <div ref={contentRef} className="absolute bottom-32 left-0">
            <div className="project-image-container bg-white/10 backdrop-blur-md rounded-2xl max-w-md">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <div ref={previewRef} className="absolute right-16 top-1/2 -translate-y-1/2">
            <h1 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name}
            </h1>
            <p className="project-type font-descriptive text-base text-white/70">
              {activeProject.type}
            </p>
          </div>
        </div>
      ),

      // Layout 2: Title center-left, image top-right, description bottom-right (Uber style)
      layout2: (
        <div className="relative w-full h-full">
          <div ref={typeRef} className="absolute top-16 left-0">
            <p className="project-description font-descriptive text-sm text-white/90">
              {activeProject.type}
            </p>
          </div>
          
          <div ref={contentRef} className="absolute top-1/2 -translate-y-1/2 left-0">
            <h1 className="project-title-large font-heading text-9xl font-black tracking-tight leading-none text-white">
              {activeProject.name}
            </h1>
          </div>
          
          <div ref={previewRef} className="absolute top-16 right-16">
            <div className="project-image-container-large bg-white/10 backdrop-blur-md rounded-2xl max-w-sm">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <div ref={descRef} className="absolute bottom-16 right-16 max-w-md">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">
              {activeProject.description}
            </p>
          </div>
        </div>
      ),

      // Layout 3: Title bottom-left, image bottom-right, description top-center (The Atlantic style)
      layout3: (
        <div className="relative w-full h-full">
          <div ref={typeRef} className="absolute top-16 left-1/2 -translate-x-1/2 max-w-md text-center">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">
              {activeProject.description}
            </p>
          </div>
          
          <div ref={contentRef} className="absolute bottom-32 left-16">
            <h1 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name}
            </h1>
            <p className="project-type font-descriptive text-base text-white/70">
              {activeProject.type}
            </p>
          </div>
          
          <div ref={previewRef} className="absolute bottom-32 right-16">
            <div className="project-image-container bg-white/10 backdrop-blur-md rounded-2xl max-w-md">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      ),

      // Layout 4: Image bottom-left, title right, description top-left (Ro style)
      layout4: (
        <div className="relative w-full h-full">
          <div ref={typeRef} className="absolute top-16 left-16 max-w-md">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">
              {activeProject.description}
            </p>
          </div>
          
          <div ref={contentRef} className="absolute bottom-32 left-16">
            <div className="project-image-container-large bg-white/10 backdrop-blur-md rounded-2xl max-w-sm">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <div ref={previewRef} className="absolute right-16 bottom-32">
            <h1 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name}
            </h1>
            <p className="project-type font-descriptive text-base text-white/70">
              {activeProject.type}
            </p>
          </div>
        </div>
      )
    };

    return layouts[activeProject.layout] || layouts.layout1;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {/* Video Background - Shows when not hovering */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isHovering ? 0 : 1 }}
        >
          <source src="https://www.pexels.com/download/video/25744121/" type="video/mp4" />
          <source src="/bg.webm" type="video/webm" />
          {/* Fallback to image if video doesn't load */}
        </video>
        
        {/* Image Background - Shows when hovering over projects */}
        <div 
          ref={bgRef}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ opacity: isHovering ? 1 : 0 }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Floating Navigation Buttons */}
      <nav 
        className="fixed left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3"
        onMouseLeave={handleMouseLeave}
      >
        {projectsData.map((project) => (
          <Link
            key={project.id}
            href={`#${project.slug}`}
            className={`
              font-heading text-base font-medium px-6 py-3 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              transition-all duration-300 relative overflow-hidden
              hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-white/10
              ${activeProject?.id === project.id 
                ? 'bg-white/20 scale-105 shadow-lg shadow-white/10' 
                : 'text-white/80'
              }
              text-white
            `}
            onMouseEnter={() => handleProjectHover(project)}
          >
            {project.name}
          </Link>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-5 flex-1 flex items-center justify-center p-16 pl-64">
        <div className="w-full h-full relative">
          {/* Default Content - Only show when NOT hovering */}
          {!isHovering && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white opacity-80">
              <h1 className="font-heading text-8xl font-black mb-4 tracking-tight leading-none">
                Our Work
              </h1>
              <p className="font-descriptive text-xl opacity-70">
                Hover over a project to explore our creative journey
              </p>
            </div>
          )}
          
          {/* Project Content - Only show when hovering */}
          {isHovering && activeProject && renderProjectLayout()}
        </div>
      </main>
    </div>
  );
}



