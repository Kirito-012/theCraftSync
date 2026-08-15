import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getRelatedServices, servicesData } from '@/app/lib/servicesData';
import ServiceDetailClient from './ServiceDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const url = `https://www.thecraftsync.com/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: 'TheCraftSync',
      type: 'website',
      images: [{ url: service.image, width: 800, height: 800, alt: service.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service);
  const url = `https://www.thecraftsync.com/services/${service.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    url,
    provider: {
      '@type': 'Organization',
      name: 'TheCraftSync',
      url: 'https://www.thecraftsync.com',
    },
    serviceType: service.name,
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.offerings.map((offering) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offering.title,
          description: offering.description,
        },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thecraftsync.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.thecraftsync.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServiceDetailClient service={service} relatedServices={relatedServices} />
    </>
  );
}
