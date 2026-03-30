import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Our Projects | TheCraftSync - Custom Software & AI Portfolio',
  description: 'Explore the portfolio of TheCraftSync. We build digital products that resonate and scale, from AI platforms to enterprise healthcare automation.',
};

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
    layout: 'layout4'
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
    layout: 'layout4'
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
    layout: 'layout4'
  },
  {
    id: 6,
    name: 'Vevsa',
    slug: 'vevsa',
    type: 'B2B Marketing Platform',
    description: 'Enterprise marketing platform for industrial containers with pixel-perfect design optimized for all displays.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1771059375/img_qnbtu2.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1771059401/Screenshot_2026-02-14_141726_arqata.png',
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
    name: 'WM',
    slug: 'wm',
    type: 'Health & Nutrition AI',
    description: 'Intelligent mobile nutrition platform delivering personalized calorie tracking and AI-driven meal planning.',
    bgImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768696783/west_cdz3cc.jpg',
    previewImage: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768686877/westmountain_gz86bk.jpg',
    animationType: 'fadeSlideUp',
    layout: 'layout4'
  }
];

export default function ProjectsPage() {
  return <ProjectsClient projectsData={projectsData} />;
}
