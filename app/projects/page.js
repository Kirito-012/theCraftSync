'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import './projects.css';

const projectsData = [
  {
    id: 1,
    name: 'Paradise\nBliss',
    slug: 'paradise-bliss',
    type: 'Travel & Booking Platform',
    description: 'Comprehensive travel booking with customized vacation packages and spiritual pilgrimage tours across India.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768692689/kashmir_1_dbjxce.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768692757/Screenshot_2026-01-18_045806_mndvkw.png',
    animationType: 'fadeSlideUp',
    layout: 'layout1'
  },
  {
    id: 2,
    name: 'Indiem',
    slug: 'indiem',
    type: 'Healthcare AI Automation',
    description: 'AI-powered healthcare operations platform automating hospital claim documentation and patient records.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768691736/img_d1jg96.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768693110/Screenshot_2026-01-18_050807_tha14s.png',
    animationType: 'scaleRotate',
    layout: 'layout2'
  },
  {
    id: 3,
    name: 'Moment &\nCRAFT',
    slug: 'moment-craft',
    type: 'AI E-commerce Platform',
    description: 'Enterprise-grade design and commerce platform powered by generative AI for emotionally meaningful products.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768689267/moments2_eofyzs.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768686878/moment_dfai8p.jpg',
    animationType: 'blurReveal',
    layout: 'layout3'
  },
  {
    id: 4,
    name: 'Ed Verse',
    slug: 'ed-verse',
    type: 'EdTech Platform',
    description: 'Scalable digital learning ecosystem unifying live education, recorded content, and consultancy for 30k+ users.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696447/ed_xhrmi3.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696547/ed_sdn97j.jpg',
    animationType: 'elasticBounce',
    layout: 'layout4'
  },
  {
    id: 5,
    name: 'PixelMark',
    slug: 'pixelmark',
    type: 'AI Computer Vision',
    description: 'Intelligent image annotation platform bridging human selection and AI analysis for Computer Vision pipelines.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768689267/pixelmark_dmumca.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768691126/pixelphone_uyqocr.jpg',
    animationType: 'glitchEffect',
    layout: 'layout1'
  },
  {
    id: 6,
    name: 'Vevsa',
    slug: 'vevsa',
    type: 'B2B Marketing Platform',
    description: 'Enterprise marketing platform for industrial containers with pixel-perfect design optimized for all displays.',
    bgImage: '/images/projects/vevsa-bg.jpg',
    previewImage: '/images/projects/vevsa-preview.jpg',
    animationType: 'parallaxSlide',
    layout: 'layout2'
  },
  {
    id: 7,
    name: 'Osexifi',
    slug: 'osexifi',
    type: 'Wellness E-commerce',
    description: 'Comprehensive e-commerce ecosystem for wellness products integrated with nonprofit reproductive health mission.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696995/Screenshot_2026-01-18_061155_xpijks.png',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696994/Screenshot_2026-01-11_004711_mnxxc4.png',
    animationType: 'blurReveal',
    layout: 'layout3'
  },
  {
    id: 8,
    name: 'West\nMountains',
    slug: 'west-mountains',
    type: 'Health & Nutrition AI',
    description: 'Intelligent mobile nutrition platform delivering personalized calorie tracking and AI-driven meal planning.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696783/west_cdz3cc.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768686877/westmountain_gz86bk.jpg',
    animationType: 'fadeSlideUp',
    layout: 'layout4'
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

  // Preload all background images for smooth transitions
  useEffect(() => {
    projectsData.forEach(project => {
      const img = new Image();
      img.src = project.bgImage;
    });
  }, []);

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
        ease: 'power2.out',
        duration: 0.6,
        force3D: true  // GPU acceleration
      },
      onComplete: () => {
        // Ensure everything is visible after animation (only if refs still exist)
        const currentRefs = [contentRef.current, previewRef.current, titleRef.current, typeRef.current, descRef.current].filter(ref => ref !== null);
        if (currentRefs.length > 0) {
          gsap.set(currentRefs, {
            clearProps: 'transform,opacity'
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
    
    // Optimized background change - direct transition without nested animations
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = `url(${project.bgImage})`;
      gsap.to(bgRef.current, { 
        opacity: 1, 
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveProject(null);
    
    // Optimized background reset
    if (bgRef.current) {
      gsap.to(bgRef.current, { 
        opacity: 0, 
        duration: 0.3,
        ease: 'power2.in'
      });
    }
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
            <div className="project-image-container rounded-2xl w-[500px] h-[400px] overflow-hidden flex items-center justify-center">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
          
          <div ref={previewRef} className="absolute right-16 top-1/2 -translate-y-1/2">
            <h1 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
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
              {activeProject.name.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </h1>
          </div>
          
          <div ref={previewRef} className="absolute top-16 right-16">
            <div className="project-image-container-large rounded-2xl w-[450px] h-[350px] overflow-hidden flex items-center justify-center">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="max-w-full max-h-full object-contain rounded-lg"
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
              {activeProject.name.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </h1>
            <p className="project-type font-descriptive text-base text-white/70">
              {activeProject.type}
            </p>
          </div>
          
          <div ref={previewRef} className="absolute bottom-32 right-16">
            <div className="project-image-container rounded-2xl w-[500px] h-[400px] overflow-hidden flex items-center justify-center">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="max-w-full max-h-full object-contain rounded-lg"
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
            <div className="project-image-container-large rounded-2xl w-[450px] h-[350px] overflow-hidden flex items-center justify-center">
              <img 
                src={activeProject.previewImage} 
                alt={`${activeProject.name} preview`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
          
          <div ref={previewRef} className="absolute right-16 bottom-32">
            <h1 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
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
          <source src="https://res.cloudinary.com/din6jl7de/video/upload/v1768689496/videobg_xie9iq.mp4" type="video/mp4" />
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
            href={`/case-study/${project.slug}`}
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
            {project.name.replace('\n', ' ')}
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



