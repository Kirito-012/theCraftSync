import { Metadata } from 'next';
import { projectsData } from '../lib/projectsData';
import CaseStudyClient from './CaseStudyClient';

export const metadata: Metadata = {
  title: 'Case Studies | TheCraftSync Portfolio',
  description: 'Deep dive into our selected work. From AI-powered e-commerce to healthcare automation platforms, see how we build digital products that perform.',
};

export default function CaseStudyPage() {
  return <CaseStudyClient projectsData={projectsData} />;
}