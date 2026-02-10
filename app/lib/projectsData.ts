export type Project = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  image: string;
  year: string;
  overview: string;
  caseStudyTitle: string;
  whatWeBuilt: string[];
  impact: string[];
  expertise: string[];
};

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "moment-craft",
    title: "Moment &\nCraft",
    shortDescription: "Enterprise-grade design and commerce platform powered by generative AI. Unified design, personalization, and fulfillment for emotionally meaningful products.",
    tags: ["AI", "E-commerce", "Design System"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/moment_dfai8p.jpg",
    year: "2025",
    overview: "Moment & CRAFT is an enterprise-grade design and commerce platform powered by generative AI. We unified design, personalization, and fulfillment into one intelligent system that helps businesses sell emotionally meaningful products while reducing operational costs and boosting customer lifetime value",
    caseStudyTitle: "AI-Powered Personalization Commerce for Enterprise Print Businesses",
    whatWeBuilt: [
      "Intelligent Design Studio: Drag-and-drop interface with real-time preview and theme governance.",
      "AI Content Engine: OpenAI-powered message generation, tone adaptation, and creative assistance.",
      "Unified Commerce Flow: End-to-end ordering, fulfillment tracking, and customer history.",
      "Multi-Product Platform: Cards, photobooks, and expandable SKU architecture."
    ],
    impact: [
      "3x higher conversion through AI-guided personalization.",
      "35% increase in AOV via premium design upsells.",
      "60% faster design completion with AI content assistance."
    ],
    expertise: [
      "Full-stack development (design engine + backend commerce).",
      "AI/ML integration (OpenAI API for personalization intelligence).",
      "Enterprise scalability & brand governance systems.",
      "Conversion-optimized UX for complex personalization flows."
    ]
  },
  {
    id: 2,
    slug: "ed-verse",
    title: "Ed Verse",
    shortDescription: "Scalable digital learning ecosystem unifying live education, recorded content, and consultancy. Single-codebase architecture powering 30k+ users.",
    tags: ["EdTech", "Real-time", "Scalability"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768689267/pixelmark_dmumca.jpg",
    year: "2025",
    overview: "A scalable digital learning ecosystem that unifies live education, recorded content, and consultancy services into one powerful platform. Our single-codebase architecture powers web and mobile apps for 30k+ users, delivering high-performance, real-time learning experiences at scale.",
    caseStudyTitle: "Enterprise-Scale EdTech Platform: Cross-Platform Learning for 30000+ Users",
    whatWeBuilt: [
      "Live & On-Demand Learning Engine: Real-time class streaming with stored session library for flexible learning.",
      "Cross-Platform Apps from Single Codebase: Web, Android, and iOS applications built using Vue.js + Ionic framework.",
      "Dynamic Activity Calendar: Google Calendar-style scheduling system for classes, events, and learning milestones.",
      "Consultancy Integration: Expert services booking and delivery within the learning ecosystem.",
      "High-Concurrency Infrastructure: Backend optimized for 300,000+ users with stable performance."
    ],
    impact: [
      "3 platforms maintained with one engineering team.",
      "Reduced development costs by eliminating separate native app teams.",
      "High concurrency handling during live class sessions without performance degradation."
    ],
    expertise: [
      "Real-time streaming infrastructure (live video delivery with low latency).",
      "Performance engineering (optimized for heavy traffic and peak loads).",
      "Complex scheduling systems (interactive calendar with multi-event management)."
    ]
  },
  {
    id: 3,
    slug: "indiem",
    title: "indiem",
    shortDescription: "AI-powered healthcare operations platform automating hospital claim documentation and patient records. WhatsApp-like chat eliminates manual file processing.",
    tags: ["Healthcare", "AI", "Automation"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768691736/img_d1jg96.jpg",
    year: "2024",
    overview: "An AI-powered healthcare operations platform that automates hospital claim documentation and patient record management for India's healthcare sector. Using a WhatsApp-like chat interface, the system eliminates manual file processing through intelligent document classification and organization—deployable without replacing existing hospital software.",
    caseStudyTitle: "AI-Powered Healthcare Automation: Zero-Touch Claims & Patient Record Management",
    whatWeBuilt: [
      "Intelligent Document Processing: AI-powered classification and organization of medical claims and patient records.",
      "WhatsApp-Style Chat Interface: Intuitive, adoption-friendly platform requiring zero staff training.",
      "Automated File Management System: Zero manual organization through AI-driven document categorization.",
      "Non-Invasive Integration: Deployment without replacing existing hospital management systems.",
      "Hybrid SaaS Platform: Revenue-share operational model (7-10.5% on claim amounts)",
      "High-Volume Processing Engine: Built to handle hospital-scale document workflows with error reduction."
    ],
    impact: [
      "Hospital operations transformation eliminating manual document processing.",
      "AI-driven automation reducing claim workflow errors.",
      "Instant adoption through familiar chat-based interface.",
      "Zero integration requirement for immediate deployment.",
      "Performance-based pricing aligning platform success with hospital outcomes",
      "High-volume processing handling enterprise-scale healthcare documentation"
    ],
    expertise: [
      "Healthcare AI/ML development (medical document classification algorithms).",
      "Natural Language Processing (claim document parsing and data extraction).",
      "Conversational UI design (chat-based hospital workflow interface).",
      "Document automation systems (intelligent file organization and routing).",
      "Healthcare integration architecture (non-invasive deployment models).",
      "SaaS business model implementation (revenue-share operational framework)."
    ]
  },
  {
    id: 4,
    slug: "pixelmark",
    title: "PixelMark",
    shortDescription: "Intelligent image annotation platform bridging human selection and AI analysis. Interactive region selection for pixel-level extraction feeding Computer Vision pipelines.",
    tags: ["AI", "Computer Vision", "Data Pipeline"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768691126/pixelphone_uyqocr.jpg",
    year: "2024",
    overview: "An intelligent image annotation platform that bridges human selection and AI analysis. Users interactively select image regions for pixel-level extraction, feeding precise data into Computer Vision pipelines for object detection, classification, and pattern recognition—optimizing AI accuracy while reducing processing costs.",
    caseStudyTitle: "Human-Guided AI Vision: Interactive Annotation Platform for Intelligent Image Analysis",
    whatWeBuilt: [
      "Interactive Canvas Engine: Konva.js-powered selection tool for drawing, resizing, and manipulating image regions with real-time feedback.",
      "Pixel-Level Data Extraction: Precise capture of selected region data for high-accuracy AI analysis.",
      "Computer Vision Integration: Seamless pipeline connection for object detection, classification, and feature extraction.",
      "API-Driven Architecture: Scalable backend designed for AI/ML service integration and cloud deployment.",
      "Human-in-the-Loop Workflows: Guided annotation system for AI model training and validation."
    ],
    impact: [
      "75% faster annotation vs. traditional bounding-box tools.",
      "Pixel-perfect accuracy for medical, industrial, and security applications.",
      "Multi-use case deployment: Medical imaging, satellite analysis, quality control, and AI training."
    ],
    expertise: [
      "AI/ML API Integration (Computer Vision service connectivity).",
      "Image Processing Algorithms (pixel extraction and data transformation).",
      "Real-time Interactive UI Development (responsive canvas manipulation)."
    ]
  },
  {
    id: 5,
    slug: "vevsa",
    title: "Vevsa",
    shortDescription: "Enterprise marketing platform for industrial containers and storage solutions. Pixel-perfect design system optimized for mobile to ultra-HD displays.",
    tags: ["E-commerce", "Design System", "Performance"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768689266/vevsa_b0qeho.jpg",
    year: "2025",
    overview: "A visually rich, enterprise-grade marketing platform showcasing multi-purpose industrial containers—dustbins, storage, and utility solutions. Our pixel-perfect design system spans mobile to ultra-HD displays, with performance-optimized architecture and admin-managed content enabling sustainable, code-free updates.",
    caseStudyTitle: "Pixel-Perfect B2B Marketing Platform: Industrial Product Showcase at Scale",
    whatWeBuilt: [
      "Universal Responsive Design: Pixel-accurate layouts across all devices (360px mobile → 4K displays).",
      "Dynamic Product Showcase: Interactive galleries with smooth transitions for container product visualization.",
      "Admin-Driven CMS: Non-technical content management for products, galleries, and marketing copy.",
      "Code-Based Icon System: Scalable SVG/CSS icons eliminating image dependencies.",
      "High-Fidelity UI: Complex visual sections with intricate layouts and smooth interactions.",
      "B2B Marketing Engine: SEO-optimized architecture for industrial product discovery."
    ],
    impact: [
      "40% faster load times through performance optimization.",
      "Zero-code content updates via admin panel integration.",
      "Enterprise B2B presence for industrial product marketing."
    ],
    expertise: [
      "Advanced responsive architecture (fluid design system from mobile to 4K).",
      "Component-based development (modular, reusable UI patterns)",
      "Performance engineering (optimized rendering for complex visual sections)",
      "SVG/CSS graphics programming (code-based iconography)",
      "Headless CMS integration (admin panel data binding)",
      "Cross-browser compatibility (consistent experience across platforms)"
    ]
  },
  {
    id: 6,
    slug: "wm",
    title: "WM",
    shortDescription: "Intelligent mobile nutrition platform delivering personalized calorie tracking and diet recommendations. AI-driven meal planning with progress analytics.",
    tags: ["Health", "Mobile", "AI Analytics"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768686877/westmountain_gz86bk.jpg",
    year: "2025",
    overview: "An intelligent mobile nutrition platform that delivers personalized calorie tracking and diet recommendations based on user age, weight, and health goals. The app combines comprehensive food databases, AI-driven meal planning, and progress analytics to help users achieve sustainable health outcomes through data-driven nutrition management",
    caseStudyTitle: "AI-Driven Nutrition Platform: Personalized Diet Management & Calorie Tracking",
    whatWeBuilt: [
      "Intelligent Calorie Tracker: Real-time food logging with comprehensive nutritional database",
      "Personalized Diet Engine: Age, weight, and goal-based meal recommendations and nutrition plans",
      "Smart Food Recognition: Quick input system for tracking meals and calculating macros",
      "Progress Analytics Dashboard: Visual tracking of calories, nutrients, weight trends, and health milestones",
      "Adaptive Meal Planning: Dynamic diet suggestions that adjust based on user progress and preferences",
      "Cross-Platform Mobile App: Native iOS and Android applications with offline capabilities"
    ],
    impact: [
      "AI-powered recommendations adapting to user progress and preferences.",
      "Holistic health management combining diet, activity, and progress analytics.",
      "Real-time tracking of calories, macros, and nutritional goals."
    ],
    expertise: [
      "Mobile app development (native iOS/Android or cross-platform).",
      "AI/ML integration (personalized recommendation algorithms).",
      "Nutrition data architecture (comprehensive food database management).",
      "Real-time data synchronization (cloud-based user profile and progress tracking).",
      "Health & fitness UX design (motivation-focused interface patterns).",
      "Algorithm development (personalized calorie and macro calculations)."
    ]
  },
  {
    id: 7,
    slug: "osexifi",
    title: "Osexifi",
    shortDescription: "Comprehensive e-commerce and digital ecosystem for wellness products and charitable initiatives. Premium product sales integrated with nonprofit reproductive health mission.",
    tags: ["E-commerce", "Charity Tech", "Wellness"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768691520/Screenshot_2026-01-11_003726_d3qczy.png",
    year: "2024",
    overview: "A comprehensive e-commerce and a digital ecosystem serving Osexifi's wellness product line and 501(c)(3) charitable foundation, integrating premium wellness product sales with nonprofit reproductive health initiatives. The solution combines elegant product presentation, secure payment processing, and educational content—serving both commercial operations and the House of Osexifi Patronage charity's community health mission.",
    caseStudyTitle: "Holistic Wellness Platform: E-Commerce Innovation Meets Health Advocacy",
    whatWeBuilt: [
      "Premium E-Commerce Platform: Sophisticated product catalog with discreet checkout, secure payment integration, and age verification.",
      "Dual-Brand Architecture: Unified system serving commercial Osexifi products and House of Osexifi Patronage nonprofit.",
      "Educational Content Hub: Wellness resources, product guides, and reproductive health information.",
      "Donation Management System: Integrated 501(c)(3) contribution processing and donor engagement tools.",
      "Product Customization Engine: Interactive selection tools for personalized wellness solutions.",
      "Privacy-First Infrastructure: Enhanced security, discreet packaging integration, and data protection compliance."
    ],
    impact: [
      "Secure e-commerce with privacy-first checkout experience",
      "Modern wellness positioning combining technology with health advocacy",
      "Forbes recognition for founder Dr. Balkees Abderrahman (Under 30 honoree)"
    ],
    expertise: [
      "Sensitive product e-commerce (age verification, discreet UX, secure transactions)",
      "Payment gateway integration (PCI compliance, donation processing)",
      "Content management systems (educational resources, product information)",
      "Privacy & security implementation (HIPAA-aligned data protection)",
      "Brand identity development (sophisticated, clinical aesthetic)"
    ]
  },
  {
    id: 8,
    slug: "paradise-bliss",
    title: "Paradise\nBliss",
    shortDescription: "Comprehensive travel booking platform with customized vacation packages and pilgrimage tours. WhatsApp integration for instant customer engagement.",
    tags: ["Travel", "Booking", "Integration"],
    image: "https://res.cloudinary.com/din6jl7de/image/upload/v1768691523/Screenshot_2026-01-11_024619_h94ln6.png",
    year: "2025",
    overview: "A comprehensive travel booking platform for Paradise Bliss Tours, featuring customized vacation packages, spiritual pilgrimage tours, and destination showcases across India. The solution integrates WhatsApp inquiry modules for instant customer engagement, streamlining the journey from package discovery to booking confirmation.",
    caseStudyTitle: "Complete Travel Platform: From Discovery to Booking for Leisure & Spiritual Journeys",
    whatWeBuilt: [
      "Dynamic Destination Showcase: Interactive pages highlighting beaches, cities, adventure spots, and sacred pilgrimage sites.",
      "Package Management System: Customizable tour packages with detailed itineraries, pricing, and inclusions.",
      "Spiritual Tour Modules: Specialized sections for Char Dham Yatra, Jyotirlinga tours, and religious pilgrimages.",
      "Package Detail Pages: Rich content pages with galleries, day-wise itineraries, accommodation details, and booking information.",
      "WhatsApp Inquiry Integration: One-click inquiry module connecting travelers directly to tour consultants.",
      "Responsive Booking Experience: Mobile-optimized interface for on-the-go trip planning."
    ],
    impact: [
      "Streamlined booking process reducing inquiry-to-confirmation time",
      "Rich destination content driving organic search traffic",
      "End-to-end trip planning from discovery to hassle-free booking"
    ],
    expertise: [
      "Travel platform development (booking systems and itinerary management).",
      "Third-party API integration (WhatsApp Business API connectivity).",
      "Content-rich architecture (destination guides and tour information).",
      "Real-time communication systems (instant inquiry and response flows).",
      "Mobile-first responsive design (on-the-go booking optimization).",
      "SEO optimization (organic discovery for travel destinations)."
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map(project => project.slug);
}
