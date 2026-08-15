import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Our Tools - Business Automation Software Suite',
	description: 'Explore TheCraftSync\'s product suite — CRM Sync, Salon Sync, Order Management Sync, Booking Management Sync, and WhatsApp Automation Sync. Purpose-built software for running your operations.',
	openGraph: {
		title: 'Our Tools | TheCraftSync',
		description: 'Purpose-built business automation software — CRM, salon management, order management, booking, and WhatsApp automation.',
		url: 'https://www.thecraftsync.com/tools',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Our Tools | TheCraftSync',
		description: 'Purpose-built business automation software — CRM, salon management, order management, booking, and WhatsApp automation.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/tools',
	},
}

export default function ToolsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
