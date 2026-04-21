import { Metadata } from 'next';
import { getProjectBySlug } from '@/app/lib/projectsData';
import ProjectPageClient from './ProjectPageClient';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title.replace('\n', ' '),
    description: project.caseStudyTitle || project.shortDescription,
    alternates: {
      canonical: `https://www.thecraftsync.com/case-study/${slug}`,
    },
    openGraph: {
      title: project.title.replace('\n', ' '),
      description: project.caseStudyTitle || project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Project Not Found
          </h1>
          <Link 
            href="/projects"
            className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title.replace('\n', ' '),
    "description": project.shortDescription,
    "applicationCategory": project.tags[0] === 'AI' ? 'Artificial Intelligence' : 'Enterprise Development',
    "operatingSystem": "Web-based",
    "author": {
      "@type": "Organization",
      "name": "TheCraftSync"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPageClient project={project} />
    </>
  );
}
