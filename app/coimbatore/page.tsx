import type { Metadata } from 'next'
import CoimbatoreClient from './CoimbatoreClient'

export const metadata: Metadata = {
	title: 'Coimbatore Services | TheCraftSync',
	description:
		'Easy-to-understand digital services for businesses in Coimbatore. We build websites, apps, automation, and AI tools that are simple to use and made to grow with you.',
	openGraph: {
		title: 'Coimbatore Services | TheCraftSync',
		description:
			'Easy-to-understand digital services for businesses in Coimbatore. We build websites, apps, automation, and AI tools that are simple to use and made to grow with you.',
		url: 'https://www.thecraftsync.com/coimbatore',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Coimbatore Services | TheCraftSync',
		description:
			'Easy-to-understand digital services for businesses in Coimbatore. We build websites, apps, automation, and AI tools.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/coimbatore',
	},
}

export default function CoimbatorePage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Coimbatore Services',
		description:
			'Easy-to-understand digital services for businesses in Coimbatore.',
		url: 'https://www.thecraftsync.com/coimbatore',
		mainEntity: {
			'@type': 'Organization',
			name: 'TheCraftSync',
			url: 'https://www.thecraftsync.com',
		},
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<CoimbatoreClient />
		</>
	)
}