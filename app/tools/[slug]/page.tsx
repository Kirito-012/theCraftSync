import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolBySlug, getRelatedTools, toolsData } from '@/app/lib/toolsData';
import ToolDetailClient from './ToolDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  const url = `https://www.thecraftsync.com/tools/${tool.slug}`;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      siteName: 'TheCraftSync',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);
  const url = `https://www.thecraftsync.com/tools/${tool.slug}`;

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.metaDescription,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    author: {
      '@type': 'Organization',
      name: 'TheCraftSync',
      url: 'https://www.thecraftsync.com',
    },
    featureList: tool.coreCapabilities,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thecraftsync.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.thecraftsync.com/tools' },
      { '@type': 'ListItem', position: 3, name: tool.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ToolDetailClient tool={tool} relatedTools={relatedTools} />
    </>
  );
}
