export type ToolDetail = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  overview: string;
  icon: string;
  gradient: string;
  // Drop a screenshot/mockup at public/assets/tools/<slug>.jpg (or .png) and
  // set this to `/assets/tools/<slug>.jpg` — every card, hero, and panel that
  // shows this tool will pick it up automatically. Leave unset to keep the
  // current icon-only look for that tool.
  image?: string;
  // Set true to keep the detail-page hero icon-only/abstract even when `image`
  // is set — the image still shows in the "Why Teams Choose" panel and card
  // thumbnails, just not as the hero background.
  hideImageInHero?: boolean;
  // Optional override used only by the /tools hub card thumbnail. Falls back
  // to `image` when unset — set this when you want a different shot on the
  // card than the one shown in the hero/panel.
  cardImage?: string;
  // Optional override used only by the "Why Teams Choose" panel on the detail
  // page. Falls back to `image` when unset.
  benefitsImage?: string;
  // Optional override used only by the detail-page hero background. Falls
  // back to `image` when unset.
  heroImage?: string;
  keyAdvantages: string[];
  coreCapabilities: string[];
  relatedSlugs: string[];
};

export const toolsData: ToolDetail[] = [
  {
    id: 1,
    slug: 'crm-sync',
    name: 'CRM Sync',
    tagline: 'Every lead, every customer, one system of truth.',
    metaTitle: 'CRM Sync — Customer Relationship Management Platform | TheCraftSync',
    metaDescription:
      'CRM Sync centralizes leads, pipelines, and customer relationships into one organized workspace — no more spreadsheets or disconnected tools.',
    keywords: [
      'CRM software',
      'customer relationship management platform',
      'lead management software',
      'sales pipeline software',
      'customer database software',
      'sales automation tool',
    ],
    overview:
      'CRM Sync is a centralized customer relationship management platform built to help businesses track leads, manage pipelines, and strengthen customer relationships without juggling spreadsheets or disconnected tools. It brings sales, support, and follow-ups into a single, organized workspace.',
    icon: 'Users',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    image: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090258/booking_rdjgh2.jpg',
    benefitsImage: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786698077/Screenshot_2026-08-14_143054_zekv1l.png',
    keyAdvantages: [
      'Eliminates lost leads and missed follow-ups with automated reminders',
      'Gives teams a real-time, single view of every customer interaction',
      'Reduces manual data entry through smart automation',
      'Scales from small teams to multi-branch enterprise operations',
      'Improves conversion rates with structured pipeline tracking',
    ],
    coreCapabilities: [
      'Lead capture, scoring, and pipeline management',
      'Contact and customer history tracking',
      'Task and follow-up automation',
      'Sales performance dashboards and reporting',
      'Team and role-based access control',
      'Integration with email, WhatsApp, and third-party tools',
    ],
    relatedSlugs: ['order-management-sync', 'whatsapp-automation-sync', 'booking-management-sync'],
  },
  {
    id: 2,
    slug: 'salon-sync',
    name: 'Salon Sync',
    tagline: 'Smarter scheduling. Happier clients. Better business.',
    metaTitle: 'Salon Sync — Salon & Spa Management Software | TheCraftSync',
    metaDescription:
      'Salon Sync is an all-in-one management platform for salons, spas, and wellness studios — appointment scheduling, staff management, and client relationships in one place.',
    keywords: [
      'salon management software',
      'spa booking software',
      'salon scheduling app',
      'salon POS software',
      'wellness studio management platform',
      'appointment booking software for salons',
    ],
    overview:
      'Salon Sync is an all-in-one management platform built specifically for salons, spas, and wellness studios. It simplifies appointment scheduling, staff management, and client relationships so business owners can focus on service quality instead of admin work.',
    icon: 'Scissors',
    gradient: 'from-rose-600/20 to-pink-600/20',
    image: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786110862/Screenshot_2026-08-07_192336_ucezvb.png',
    cardImage: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090259/salon_obxiiw.jpg',
    heroImage: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090259/salon_obxiiw.jpg',
    keyAdvantages: [
      'Cuts down no-shows with automated appointment reminders',
      'Improves staff utilization with clear scheduling visibility',
      'Builds client loyalty through personalized service history',
      'Reduces front-desk workload with self-service booking',
      'Provides owners with real-time revenue and performance insights',
    ],
    coreCapabilities: [
      'Online appointment booking and calendar management',
      'Staff scheduling and availability tracking',
      'Client profiles with service and preference history',
      'Billing, invoicing, and package/membership management',
      'Inventory tracking for salon products',
      'Automated SMS/WhatsApp appointment reminders',
    ],
    relatedSlugs: ['booking-management-sync', 'whatsapp-automation-sync', 'crm-sync'],
  },
  {
    id: 3,
    slug: 'order-management-sync',
    name: 'Order Management Sync',
    tagline: 'From order to delivery, fully in sync.',
    metaTitle: 'Order Management Sync — Order & Fulfillment Platform | TheCraftSync',
    metaDescription:
      'Order Management Sync centralizes order processing, inventory, and fulfillment into one streamlined workflow across every sales channel.',
    keywords: [
      'order management software',
      'order fulfillment platform',
      'inventory management software',
      'multichannel order management',
      'ecommerce order tracking software',
      'warehouse order processing software',
    ],
    overview:
      'Order Management Sync is a centralized system designed to help businesses process, track, and fulfill orders accurately and efficiently. It connects sales channels, inventory, and fulfillment into one streamlined workflow, reducing errors and delays across the order lifecycle.',
    icon: 'Package',
    gradient: 'from-amber-600/20 to-orange-600/20',
    image: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090559/tablesync_jo8kcz.jpg',
    cardImage: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090259/order_vkp7qc.jpg',
    heroImage: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090259/order_vkp7qc.jpg',
    keyAdvantages: [
      'Minimizes order errors with automated, rule-based processing',
      'Speeds up fulfillment with real-time inventory visibility',
      'Improves customer satisfaction with accurate order tracking',
      'Reduces manual coordination between sales and warehouse teams',
      'Scales easily across multiple sales channels and locations',
    ],
    coreCapabilities: [
      'Centralized order capture from multiple channels',
      'Real-time inventory sync and stock alerts',
      'Order status tracking and automated notifications',
      'Returns and refund management',
      'Vendor and supplier coordination',
      'Reporting on order volume, fulfillment time, and revenue',
    ],
    relatedSlugs: ['crm-sync', 'booking-management-sync', 'whatsapp-automation-sync'],
  },
  {
    id: 4,
    slug: 'booking-management-sync',
    name: 'Booking Management Sync',
    tagline: 'Seamless scheduling for services, spaces, and staff.',
    metaTitle: 'Booking Management Sync — Reservation & Scheduling Platform | TheCraftSync',
    metaDescription:
      'Booking Management Sync is a flexible reservation platform for appointments, bookings, and reserved time slots — with real-time availability and zero double-bookings.',
    keywords: [
      'booking management software',
      'reservation management system',
      'appointment scheduling software',
      'online booking system',
      'resource booking software',
      'staff scheduling software',
    ],
    overview:
      'Booking Management Sync is a flexible reservation platform built for businesses that run on appointments, bookings, or reserved time slots — from clinics and consultants to venues and rental services. It automates scheduling logistics so businesses never lose a booking to double-entry or manual errors.',
    icon: 'CalendarCheck',
    gradient: 'from-violet-600/20 to-indigo-600/20',
    image: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090259/retaurant_zdbstk.jpg',
    benefitsImage: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786702385/Screenshot_2026-08-14_154141_yqgxe9.png',
    keyAdvantages: [
      'Prevents double-bookings with real-time availability sync',
      'Reduces admin overhead through automated confirmations',
      'Improves customer experience with easy self-service booking',
      'Adapts to different business models (services, staff, or resources)',
      'Increases repeat bookings with automated follow-ups',
    ],
    coreCapabilities: [
      'Real-time availability and calendar management',
      'Multi-staff, multi-location, or multi-resource booking support',
      'Automated confirmations, reminders, and rescheduling',
      'Payment and deposit collection at time of booking',
      'Customer booking history and preferences',
      'Analytics on booking trends and utilization',
    ],
    relatedSlugs: ['salon-sync', 'crm-sync', 'whatsapp-automation-sync'],
  },
  {
    id: 5,
    slug: 'whatsapp-automation-sync',
    name: 'WhatsApp Automation Sync',
    tagline: 'Turn conversations into conversions, automatically.',
    metaTitle: 'WhatsApp Automation Sync — WhatsApp Business Automation | TheCraftSync',
    metaDescription:
      'WhatsApp Automation Sync automates customer communication, support, and marketing directly through WhatsApp with chatbots, broadcasts, and CRM integration.',
    keywords: [
      'WhatsApp automation software',
      'WhatsApp business API platform',
      'WhatsApp chatbot software',
      'WhatsApp marketing automation',
      'automated customer support WhatsApp',
      'WhatsApp broadcast messaging tool',
    ],
    overview:
      'WhatsApp Automation Sync enables businesses to automate customer communication, support, and marketing directly through WhatsApp — the channel customers already use daily. It combines automated responses with intelligent workflows to keep customers engaged without adding manual workload.',
    icon: 'MessageCircle',
    gradient: 'from-emerald-600/20 to-green-600/20',
    image: 'https://res.cloudinary.com/dhlvq35cc/image/upload/v1786090559/wp_saas_qgr1qp.jpg',
    keyAdvantages: [
      'Delivers instant responses, improving customer satisfaction',
      'Reduces support team workload through automated query handling',
      'Increases engagement using a channel with high open rates',
      'Enables 24/7 availability without additional staffing',
      'Drives repeat business through automated follow-ups and offers',
    ],
    coreCapabilities: [
      'Automated chatbot responses and FAQs',
      'Order updates, appointment reminders, and notifications',
      'Broadcast messaging and segmented campaigns',
      'Lead capture and CRM integration',
      'Multi-agent support handoff for complex queries',
      'Analytics on message delivery, response time, and engagement',
    ],
    relatedSlugs: ['crm-sync', 'order-management-sync', 'booking-management-sync'],
  },
];

export function getToolBySlug(slug: string): ToolDetail | undefined {
  return toolsData.find((tool) => tool.slug === slug);
}

export function getRelatedTools(tool: ToolDetail): ToolDetail[] {
  return tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDetail => Boolean(t));
}
