import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from './Components/SmoothScroll';
import { LoadingProvider } from './lib/LoadingContext';
import AppWrapper from './Components/AppWrapper';

export const metadata: Metadata = {
	metadataBase: new URL('https://www.thecraftsync.com'),
	title: 'TheCraftSync',
	description: 'Digital Agency for all your crafting needs.Make your ideas come to life with our expert crafting services.',
	openGraph: {
		title: 'TheCraftSync | Digital Agency',
		description: 'Digital Agency for all your crafting needs. Make your ideas come to life with our expert crafting services.',
		url: 'https://www.thecraftsync.com',
		siteName: 'TheCraftSync',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'TheCraftSync Open Graph Image',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TheCraftSync | Digital Agency',
		description: 'Digital Agency for all your crafting needs. Make your ideas come to life with our expert crafting services.',
		images: ['/og-image.jpg'],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className='antialiased'>
				<LoadingProvider>
					<AppWrapper>
						<SmoothScroll>{children}</SmoothScroll>
					</AppWrapper>
				</LoadingProvider>
			</body>
		</html>
	)
}
