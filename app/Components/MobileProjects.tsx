
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Paradise Bliss',
    category: 'Travel & Booking',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768692757/Screenshot_2026-01-18_045806_mndvkw.png',
    slug: 'paradise-bliss'
  },
  {
    id: 2,
    title: 'Indiem',
    category: 'Healthcare AI',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768693110/Screenshot_2026-01-18_050807_tha14s.png',
    slug: 'indiem'
  },
  {
    id: 3,
    title: 'Moment & CRAFT',
    category: 'AI E-commerce',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768686878/moment_dfai8p.jpg',
    slug: 'moment-craft'
  },
  {
    id: 4,
    title: 'Ed Verse',
    category: 'EdTech Platform',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696547/ed_sdn97j.jpg',
    slug: 'ed-verse'
  },
  {
    id: 5,
    title: 'PixelMark',
    category: 'AI Computer Vision',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768691126/pixelphone_uyqocr.jpg',
    slug: 'pixelmark'
  },
  {
    id: 6,
    title: 'Vevsa',
    category: 'B2B Marketing',
    image: '/images/projects/vevsa-preview.jpg',
    slug: 'vevsa'
  },
  {
    id: 7,
    title: 'Osexifi',
    category: 'Wellness E-commerce',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696994/Screenshot_2026-01-11_004711_mnxxc4.png',
    slug: 'osexifi'
  },
  {
    id: 8,
    title: 'WM',
    category: 'Health & Nutrition AI',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768686877/westmountain_gz86bk.jpg',
    slug: 'wm'
  }
];

const MobileProjects = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white pb-20 pt-24 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Our Work</h1>
        <p className="text-gray-400">Curated digital experiences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <Link href={`/case-study/${project.slug}`} key={project.id} className="block group">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 bg-zinc-900 border border-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{project.category}</p>
              <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileProjects;
