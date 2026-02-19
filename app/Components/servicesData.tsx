'use client';
import React from 'react';
import { Code, Megaphone, TrendingUp, MapPin, Bot, Zap, Plug, Sparkles } from 'lucide-react';

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
    name: 'Custom Web & App Development',
    shortName: 'AI Development',
    description: 'Crafting bespoke digital solutions tailored to your unique business needs.',
    icon: <Code className="w-full h-full" />,
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
    id: 6,
    name: 'System Automation',
    shortName: 'Automation',
    description: 'Streamline operations and eliminate repetitive tasks with smart automation solutions.',
    icon: <Zap className="w-full h-full" />,
    details: ['Workflow Automation', 'Process Optimization', 'Integration', 'Efficiency Boost']
  },
      {
    id: 5,
    name: 'AI Implementation & Chatbots',
    shortName: 'Chatbots',
    description: 'Intelligent conversational AI that engages customers 24/7 with human-like interactions.',
    icon: <Bot className="w-full h-full" />,
    details: ['Custom Chatbots', 'Natural Language', 'Multi-platform', 'Learning Systems']
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
    details: ['Local SEO', 'Google My Business', 'Keyword Research', 'Technical SEO']
  },


  {
    id: 7,
    name: 'API Integration',
    shortName: 'APIs',
    description: 'Seamlessly connect your systems and third-party services for unified operations.',
    icon: <Plug className="w-full h-full" />,
    details: ['Custom APIs', 'Third-party Integration', 'Data Sync', 'Secure Connections']
  },

];
