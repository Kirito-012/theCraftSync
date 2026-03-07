import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Contact Us | TheCraftSync - Technology Consulting & Support',
	description: 'Get in touch with TheCraftSync for custom software development, AI solutions, or enterprise system integrations. We are ready to help your business scale.',
	openGraph: {
		title: 'Contact TheCraftSync | Let\'s Build Your Digital Solution',
		description: 'Get in touch with TheCraftSync for custom software development, AI solutions, or enterprise system integrations. We are ready to help your business scale.',
		url: 'https://www.thecraftsync.com/contact',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Contact TheCraftSync | Let\'s Build Your Digital Solution',
		description: 'Get in touch with TheCraftSync for custom software development, AI solutions, or enterprise system integrations. We are ready to help your business scale.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/contact',
	},
}

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
