import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Blogs | Engineering & AI Insights - TheCraftSync',
	description: 'Read the latest insights from TheCraftSync team on software engineering, AI, digital transformation, and business growth strategies.',
	openGraph: {
		title: 'TheCraftSync Blog | Engineering & AI Insights',
		description: 'Read the latest insights from TheCraftSync team on software engineering, AI, digital transformation, and business growth strategies.',
		url: 'https://www.thecraftsync.com/blogs',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TheCraftSync Blog | Engineering & AI Insights',
		description: 'Read the latest insights from TheCraftSync team on software engineering, AI, digital transformation, and business growth strategies.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/blogs',
	},
}

export default function BlogsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
