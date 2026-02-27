'use client';
import React from 'react';
import { Code, Megaphone, TrendingUp, MapPin, Bot, Plug, Sparkles, BarChart3, Monitor } from 'lucide-react';

export interface Service {
  id: number;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export const servicesData: Service[] = [
  {
    id: 1,
    name: 'AI Development & Automation',
    shortName: 'AI Development',
    description: 'End-to-end AI solutions — from custom chatbots and intelligent automation to generative AI integration for your business.',
    icon: <Bot className="w-full h-full" />,
    details: ['Custom Chatbots', 'Workflow Automation', 'Natural Language Processing', 'AI-Powered Solutions']
  },
  {
    id: 10,
    name: 'Web & Mobile Development',
    shortName: 'Development',
    description: 'Crafting bespoke web and mobile applications tailored to your unique business needs with scalable architecture.',
    icon: <Monitor className="w-full h-full" />,
    details: ['React & Next.js', 'Mobile Apps', 'Custom Solutions', 'Scalable Architecture']
  },
  {
    id: 8,
    name: 'Generative AI Consulting',
    shortName: 'Consulting',
    description: 'Strategic guidance on implementing cutting-edge AI solutions for your business.',
    icon: <Sparkles className="w-full h-full" />,
    details: ['AI Strategy', 'Implementation', 'Training & Support', 'Future-proofing']
  },
  {
    id: 2,
    name: 'Social Media Management',
    shortName: 'Social Media',
    description: 'Building your brand presence across all major social platforms with engaging content.',
    icon: <Megaphone className="w-full h-full" />,
    details: ['Content Strategy', 'Community Growth', 'Brand Voice', 'Analytics & Insights']
  },
  {
    id: 3,
    name: 'Performance Marketing',
    shortName: 'Marketing',
    description: 'Data-driven campaigns that deliver measurable results and maximize your ROI.',
    icon: <TrendingUp className="w-full h-full" />,
    details: ['Paid Advertising', 'Conversion Optimization', 'Analytics', 'A/B Testing']
  },
  {
    id: 4,
    name: 'GMB & SEO',
    shortName: 'SEO',
    description: 'Dominate local search results and improve your online visibility organically.',
    icon: <MapPin className="w-full h-full" />,
    details: ['Local SEO', 'Google My Business', 'Keyword Research', 'Answer Engine Optimization(AEO)']
  },
  {
    id: 7,
    name: 'API Integration',
    shortName: 'APIs',
    description: 'Seamlessly connect your systems and third-party services for unified operations.',
    icon: <Plug className="w-full h-full" />,
    details: ['Custom APIs', 'Third-party Integration', 'Data Sync', 'Secure Connections']
  },
  {
    id: 9,
    name: 'Business Analytics',
    shortName: 'Business Analytics',
    description: 'Transforming raw data into actionable insights with professional visualization and reporting.',
    icon: <BarChart3 className="w-full h-full" />,
    details: ['Power BI', 'Data Visualization', 'Performance Tracking', 'Strategic Reporting']
  },
];
