import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Our Services | TheCraftSync - Custom Software, AI & Performance Engineering',
	description: 'Explore the wide range of services offered by TheCraftSync, including AI & Machine Learning, Enterprise Software Development, Cloud Infrastructure, and Technical SEO Optimization.',
	openGraph: {
		title: 'Professional Services | TheCraftSync',
		description: 'Explore the wide range of services offered by TheCraftSync, including AI & Machine Learning, Enterprise Software Development, Cloud Infrastructure, and Technical SEO Optimization.',
		url: 'https://www.thecraftsync.com/services',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Professional Services | TheCraftSync',
		description: 'Explore the wide range of services offered by TheCraftSync, including AI & Machine Learning, Enterprise Software Development, Cloud Infrastructure, and Technical SEO Optimization.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/services',
	},
}

export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
