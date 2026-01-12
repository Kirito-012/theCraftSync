export interface Project {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  bgImage: string;
  previewImage: string;
  animationType: string;
  layout: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'ParadiseBliss',
    slug: 'ParadiseBliss',
    type: 'Wellness & Lifestyle',
    description: 'Creating a serene digital experience for mindful living and wellness.',
    bgImage: '/images/projects/paradise-bg.jpg',
    previewImage: '/images/projects/paradise-img.png',
    animationType: 'fadeSlideUp',
    layout: 'layout1',
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
    layout: 'layout2',
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
    layout: 'layout3',
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
    layout: 'layout4',
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
    layout: 'layout1',
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
    layout: 'layout2',
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
    layout: 'layout3',
  },
];
