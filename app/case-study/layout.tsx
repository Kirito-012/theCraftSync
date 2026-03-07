import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Case Studies | Tailored Technology Solutions - TheCraftSync',
	description: 'Explore our detailed case studies showcasing how TheCraftSync helps businesses scale through custom AI, enterprise software, and cloud-native solutions.',
	openGraph: {
		title: 'Success Stories & Case Studies | TheCraftSync',
		description: 'Explore our detailed case studies showcasing how TheCraftSync helps businesses scale through custom AI, enterprise software, and cloud-native solutions.',
		url: 'https://www.thecraftsync.com/case-study',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Success Stories & Case Studies | TheCraftSync',
		description: 'Explore our detailed case studies showcasing how TheCraftSync helps businesses scale through custom AI, enterprise software, and cloud-native solutions.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/case-study',
	},
}

export default function CaseStudyLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
