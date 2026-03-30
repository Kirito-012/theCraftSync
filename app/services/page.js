import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'Our Services | TheCraftSync - AI, Enterprise & Cloud Solutions',
  description: 'Comprehensive technology solutions from TheCraftSync. We specialize in AI & Machine Learning, Enterprise Development, Cloud Infrastructure, and Digital Transformation.',
};

const servicesData = [
  {
    id: 1,
    title: "AI & Machine Learning Solutions",
    description: "Production-ready AI systems built to automate workflows, enable intelligent decision-making, and integrate seamlessly into existing platforms.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    gradient: "from-blue-600/20 to-purple-600/20",
    subServices: [
      "Generative AI Integration",
      "Computer Vision Solutions",
      "AI-Powered Personalization Engines",
      "AI Consulting & Strategy",
      "Intelligent Process Automation"
    ]
  },
  {
    id: 2,
    title: "Enterprise Software Development",
    description: "Scalable, secure enterprise software engineered to support complex business logic, high user loads, and long-term growth.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    gradient: "from-indigo-600/20 to-blue-600/20",
    subServices: [
      "Custom Enterprise Applications",
      "SaaS Platform Development",
      "Legacy System Modernization",
      "Scalable Backend Architecture",
      "Enterprise System Integration",
      "Secure & Compliant Software Systems"
    ]
  },
  {
    id: 3,
    title: "Cloud Infrastructure & DevOps",
    description: "Scalable cloud infrastructure and DevOps workflows that improve deployment speed, system stability, and operational efficiency.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    gradient: "from-cyan-600/20 to-blue-600/20",
    subServices: [
      "Cloud Migration & Modernization",
      "AWS, Azure & Google Cloud Solutions",
      "Serverless Architecture Development",
      "Container Orchestration (Kubernetes, Docker)",
      "CI/CD Pipeline Implementation",
      "Infrastructure as Code (IaC)",
      "Cloud Security & Compliance"
    ]
  },
  {
    id: 4,
    title: "Cross-Platform Mobile Applications",
    description: "High-performance mobile apps for iOS, Android, and web — built from a single scalable codebase.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    gradient: "from-violet-600/20 to-purple-600/20",
    subServices: [
      "Cross-Platform App Development",
      "Native iOS & Android Applications",
      "Progressive Web Applications (PWA)",
      "Mobile Backend & API Services",
      "App Performance & Optimization",
      "App Security & Compliance"
    ]
  },
  {
    id: 5,
    title: "E-Commerce & Digital Commerce Platforms",
    description: "Custom digital commerce platforms designed for performance, personalization, and conversion at scale.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    gradient: "from-emerald-600/20 to-teal-600/20",
    subServices: [
      "Custom E-Commerce Development",
      "Headless Commerce Architecture",
      "Personalization & Recommendation Systems",
      "Payment Gateway Integration",
      "Order Management & Fulfillment Systems",
      "Performance Optimization for Commerce"
    ]
  },
  {
    id: 6,
    title: "Microsoft Power Platform Solutions",
    description: "Rapid, structured solutions using Power Apps, Power Automate, and Power BI to streamline internal workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    gradient: "from-orange-600/20 to-red-600/20",
    subServices: [
      "Power Apps Development",
      "Power Automate Workflow Automation",
      "Power BI Reporting & Dashboards",
      "Enterprise Low-Code Solutions",
      "System Integration with Power Platform",
      "Governance & Security Configuration"
    ]
  },
  {
    id: 7,
    title: "Performance Engineering & SEO Optimization",
    description: "Performance-first development and technical SEO to ensure fast, scalable, and search-ready platforms.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    gradient: "from-pink-600/20 to-rose-600/20",
    subServices: [
      "Application Performance Optimization",
      "Core Web Vitals Optimization",
      "Technical SEO Audits",
      "Scalability & Load Engineering",
      "Search-Ready Architecture Design",
      "Monitoring & Performance Analytics"
    ]
  },
  {
    id: 8,
    title: "Technology Consulting",
    description: "Strategic technology and architecture consulting backed by real engineering execution.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    gradient: "from-slate-600/20 to-gray-600/20",
    subServices: [
      "Technology Architecture Assessment",
      "System & Platform Modernization Strategy",
      "AI & Automation Readiness Consulting",
      "Scalability & Performance Strategy",
      "Cloud & Infrastructure Planning",
      "CTO-Level Technical Advisory"
    ]
  },
  {
    id: 9,
    title: "Social Media Management",
    description: "Purpose-driven social media strategy focused on brand positioning and long-term visibility.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    subServices: [
      "Brand Positioning & Narrative Strategy",
      "Content Strategy & Planning",
      "Platform-Specific Growth Strategy",
      "B2B & LinkedIn Thought Leadership",
      "Community Building & Engagement",
      "Performance Tracking & Insights",
      "Ad Manager"
    ]
  },
  {
    id: 10,
    title: "Business Consulting",
    description: "Strategic business consulting focused on clarity, systems, and sustainable growth — backed by execution-ready thinking.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    gradient: "from-amber-600/20 to-yellow-600/20",
    subServices: [
      "Process Optimization",
      "Growth Strategy",
      "Digital Transformation",
      "Workflow Design",
      "Market Analysis",
      "Leadership Advisory"
    ]
  },
  {
    id: 11,
    title: "Business Analytics & Data Intelligence",
    description: "Harnessing the power of data to reveal insights, predict trends, and drive strategic business growth through advanced analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    gradient: "from-blue-700/20 to-teal-600/20",
    subServices: [
      "Power BI Implementation",
      "Custom Dashboards & Visualization",
      "Predictive Data Modeling",
      "Business Intelligence Strategy",
      "Data Warehouse Solutions",
      "Automated Reporting Systems"
    ]
  }
];

const serviceCategories = [
  { id: 1, name: 'AI & Machine Learning' },
  { id: 2, name: 'Enterprise Software' },
  { id: 3, name: 'Cloud & DevOps' },
  { id: 4, name: 'Mobile Apps' },
  { id: 5, name: 'E-Commerce' },
  { id: 6, name: 'Power Platform' },
  { id: 7, name: 'Performance & SEO' },
  { id: 8, name: 'Tech Consulting' },
  { id: 9, name: 'Social Media' },
  { id: 10, name: 'Business Strategy' },
  { id: 11, name: 'Business Analytics' }
];

const caseStudies = [
  {
    id: 1,
    category: 'E-COMMERCE, CHARITY',
    title: 'Osexifi',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768691520/Screenshot_2026-01-11_003726_d3qczy.png',
    roundedCorner: 'rounded-tl-[80px]',
    link: '/case-study/osexifi'
  },
  {
    id: 2,
    category: 'AI, COMPUTER VISION',
    title: 'PixelMark',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768691126/pixelphone_uyqocr.jpg',
    roundedCorner: 'rounded-tr-[80px]',
    link: '/case-study/pixelmark'
  },
  {
    id: 3,
    category: 'AI E-COMMERCE',
    title: 'Moment & CRAFT',
    image: 'https://res.cloudinary.com/din6jl7de/image/upload/v1768686878/moment_dfai8p.jpg',
    roundedCorner: 'rounded-tl-[80px]',
    link: '/case-study/moment-craft'
  }
];

export default function ServicesPage() {
  return (
    <ServicesClient 
      servicesData={servicesData}
      serviceCategories={serviceCategories}
      caseStudies={caseStudies}
    />
  );
}
