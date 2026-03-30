'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import MobileProjects from '../Components/MobileProjects';

const ProjectsClient = ({ projectsData }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const contentRef = useRef(null);
  const previewRef = useRef(null);
  const titleRef = useRef(null);
  const typeRef = useRef(null);
  const descRef = useRef(null);

  // Preload background images
  useEffect(() => {
    projectsData.forEach(project => {
      const img = new window.Image();
      img.src = project.bgImage;
    });
  }, [projectsData]);

  const animateLayout = (layout) => {
    const refs = [contentRef.current, previewRef.current, titleRef.current, typeRef.current, descRef.current];
    const validRefs = refs.filter(ref => ref !== null);
    
    if (validRefs.length === 0) return;

    gsap.set(validRefs, { opacity: 0, visibility: 'visible' });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.6 },
    });

    switch(layout) {
      case 'layout1':
        tl.fromTo(typeRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0 })
          .fromTo(previewRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.4')
          .fromTo(contentRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, '-=0.4');
        break;

      case 'layout2':
        tl.fromTo(previewRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })
          .fromTo(typeRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0 }, '-=0.4')
          .fromTo(contentRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1 }, '-=0.5');
        break;

      case 'layout3':
        tl.fromTo(typeRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0 })
          .fromTo(previewRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
          .fromTo(contentRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.5');
        break;

      case 'layout4':
        tl.fromTo(contentRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.8 })
          .fromTo(typeRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, '-=0.5')
          .fromTo(previewRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0 }, '-=0.5');
        break;

      default:
        tl.fromTo(validRefs, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1 });
    }
  };

  const handleProjectHover = (project) => {
    if (activeProject?.id === project.id) return;
    setActiveProject(project);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveProject(null);
  };

  useLayoutEffect(() => {
    if (isHovering && activeProject) {
      const ctx = gsap.context(() => {
        animateLayout(activeProject.layout);
      });
      return () => ctx.revert();
    }
  }, [activeProject, isHovering]);

  const renderProjectLayout = () => {
    if (!activeProject) return null;

    const layouts = {
      layout1: (
        <div className="w-full h-full relative">
          <div ref={typeRef} className="absolute top-16 right-[500px] max-w-md pr-12 text-right">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">
              {activeProject.description}
            </p>
          </div>
          <div ref={contentRef} className="absolute bottom-16 right-0">
            <div className="project-image-container relative rounded-2xl w-[500px] h-[400px] overflow-hidden flex items-center justify-center">
              <Image src={activeProject.previewImage} alt={`${activeProject.name} preview`} fill className="object-contain p-4" />
            </div>
          </div>
          <div ref={previewRef} className="absolute top-1/2 -translate-y-1/2 right-[520px] text-right">
            <h2 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </h2>
            <p className="project-type font-descriptive text-base text-white/70">{activeProject.type}</p>
          </div>
        </div>
      ),
      layout2: (
        <div className="w-full h-full relative">
          <div ref={typeRef} className="absolute top-16 right-0 text-right">
            <p className="project-description font-descriptive text-sm text-white/90">{activeProject.type}</p>
          </div>
          <div ref={contentRef} className="absolute top-1/2 -translate-y-1/2 right-[450px] pr-12 text-right">
            <h2 className="project-title-large font-heading text-9xl font-black tracking-tight leading-none text-white">
              {activeProject.name.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </h2>
          </div>
          <div ref={previewRef} className="absolute top-1/2 -translate-y-1/2 right-0">
            <div className="project-image-container-large relative rounded-2xl w-[450px] h-[350px] overflow-hidden flex items-center justify-center">
              <Image src={activeProject.previewImage} alt={`${activeProject.name} preview`} fill className="object-contain p-2" />
            </div>
          </div>
          <div ref={descRef} className="absolute bottom-16 right-0 max-w-md text-right">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">{activeProject.description}</p>
          </div>
        </div>
      ),
      layout3: (
        <div className="w-full h-full relative">
          <div ref={typeRef} className="absolute top-16 right-0 max-w-md text-right">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">{activeProject.description}</p>
          </div>
          <div ref={contentRef} className="absolute bottom-16 right-[520px] text-right">
            <h2 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </h2>
            <p className="project-type font-descriptive text-base text-white/70">{activeProject.type}</p>
          </div>
          <div ref={previewRef} className="absolute bottom-16 right-0">
            <div className="project-image-container relative rounded-2xl w-[500px] h-[400px] overflow-hidden flex items-center justify-center">
              <Image src={activeProject.previewImage} alt={`${activeProject.name} preview`} fill className="object-contain p-4" />
            </div>
          </div>
        </div>
      ),
      layout4: (
        <div className="w-full h-full relative">
          <div ref={typeRef} className="absolute top-16 right-0 max-w-md text-right">
            <p className="project-description font-descriptive text-sm leading-relaxed text-white/90">{activeProject.description}</p>
          </div>
          <div ref={contentRef} className="absolute bottom-16 right-[450px] pr-12 text-right">
            <div className="project-image-container-large relative rounded-2xl w-[450px] h-[350px] overflow-hidden flex items-center justify-center">
              <Image src={activeProject.previewImage} alt={`${activeProject.name} preview`} fill className="object-contain p-4" />
            </div>
          </div>
          <div ref={previewRef} className="absolute right-0 bottom-16 text-right">
            <h2 className="project-title font-heading text-8xl font-black tracking-tight leading-none text-white mb-4">
              {activeProject.name.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </h2>
            <p className="project-type font-descriptive text-base text-white/70">{activeProject.type}</p>
          </div>
        </div>
      ),
    };

    return layouts[activeProject.layout] || layouts.layout1;
  };

  return (
    <>
      <div className="block lg:hidden">
        <MobileProjects />
      </div>

      <div className="hidden lg:flex relative min-h-screen w-full overflow-hidden">
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
          <video autoPlay loop muted playsInline poster="https://res.cloudinary.com/din6jl7de/video/upload/v1768689496/videobg_xie9iq.jpg" 
             className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
             style={{ 
               opacity: isHovering ? 0.3 : 1,
               filter: isHovering ? 'blur(10px) grayscale(50%)' : 'none',
               transition: 'opacity 0.8s ease-in-out, filter 0.8s ease-in-out'
             }}
          >
            <source src="https://res.cloudinary.com/din6jl7de/video/upload/f_auto,q_auto,vc_auto/v1768689496/videobg_xie9iq.mp4" type="video/mp4" />
          </video>
          {projectsData.map((project) => (
            <div key={project.id} className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-[opacity,transform]"
              style={{ 
                backgroundImage: `url(${project.bgImage})`,
                opacity: activeProject?.id === project.id ? 1 : 0,
                transform: activeProject?.id === project.id ? 'scale(1)' : 'scale(1.05)',
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: activeProject?.id === project.id ? 5 : 1
              }}
            />
          ))}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-black/80 via-black/40 to-black/20 z-10" />
        </div>

        <nav className="sticky left-0 top-0 h-screen w-[400px] z-30 flex flex-col items-start justify-center pl-12 gap-4 pointer-events-none" onMouseLeave={handleMouseLeave}>
          <div className="pointer-events-auto flex flex-col gap-4">
          {projectsData.map((project) => (
            <Link key={project.id} href={`/case-study/${project.slug}`}
              className={`font-heading text-sm font-bold px-8 py-4 rounded-full w-64 bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-400 relative overflow-hidden hover:bg-white/10 hover:border-white/30 ${activeProject?.id === project.id ? 'bg-white/20 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-white/60'} text-white group`}
              onMouseEnter={() => handleProjectHover(project)}
            >
              {project.name.replace('\n', ' ')}
            </Link>
          ))}
          </div>
        </nav>

        <main className="relative z-5 flex-1 flex flex-col items-center justify-center pl-[400px] pr-20 py-20 min-h-screen">
          <div className="w-full max-w-7xl relative flex items-center justify-center min-h-[70vh]">
            {!isHovering && (
              <div className="text-center text-white opacity-80">
                <h1 className="font-heading text-8xl font-black mb-4 tracking-tight leading-none">Our Work</h1>
                <p className="font-descriptive text-xl opacity-70">Hover over a project to explore our creative journey</p>
              </div>
            )}
            {isHovering && activeProject && (
              <div key={activeProject.id} className="w-full h-full flex items-center justify-center">
                {renderProjectLayout()}
              </div>
            )}
          </div>
        </main>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "TheCraftSync Projects - Our Work",
        "description": "Explore our creative journey and the platforms we've built.",
        "thumbnailUrl": "https://res.cloudinary.com/din6jl7de/video/upload/v1768689496/videobg_xie9iq.jpg",
        "uploadDate": "2024-03-01T08:00:00+08:00",
        "duration": "PT0M30S",
        "contentUrl": "https://res.cloudinary.com/din6jl7de/video/upload/f_auto,q_auto,vc_auto/v1768689496/videobg_xie9iq.mp4",
        "embedUrl": "https://www.thecraftsync.com/projects"
      })}} />
    </>
  );
};

export default ProjectsClient;
