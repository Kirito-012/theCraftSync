import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Our Projects & Case Studies | TheCraftSync',
	description: 'Explore the portfolio and case studies of TheCraftSync. Discover how we have built scalable AI and custom software solutions for startups and enterprises.',
	openGraph: {
		title: 'Projects & Portfolio | TheCraftSync',
		description: 'Explore the portfolio and case studies of TheCraftSync. Discover how we have built scalable AI and custom software solutions for startups and enterprises.',
		url: 'https://www.thecraftsync.com/projects',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Projects & Portfolio | TheCraftSync',
		description: 'Explore the portfolio and case studies of TheCraftSync. Discover how we have built scalable AI and custom software solutions for startups and enterprises.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/projects',
	},
}

export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
