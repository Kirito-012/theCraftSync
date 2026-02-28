import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from './Components/SmoothScroll';
import { LoadingProvider } from './lib/LoadingContext';
import AppWrapper from './Components/AppWrapper';

export const metadata: Metadata = {
	metadataBase: new URL('https://www.thecraftsync.com'),
	title: {
		default: 'TheCraftSync | Custom Software, AI & Digital Product Development',
		template: '%s | TheCraftSync',
	},
	description: 'TheCraftSync is a premier digital agency specializing in custom software development, AI solutions, operational automation, and scalable enterprise platforms. We build digital experiences that matter.',
	keywords: ['custom software development', 'AI solutions', 'digital agency', 'enterprise software', 'machine learning', 'app development', 'startup MVP', 'tech consulting', 'TheCraftSync'],
	authors: [{ name: 'TheCraftSync' }],
	creator: 'TheCraftSync',
	icons: {
    icon: '/tcslogo.png',
    shortcut: '/tcslogo.png',
    apple: '/tcslogo.png',
  },
	openGraph: {
		title: 'TheCraftSync | Custom Software, AI & Digital Product Development',
		description: 'TheCraftSync is a premier digital agency specializing in custom software development, AI solutions, operational automation, and scalable enterprise platforms.',
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
		title: 'TheCraftSync | Custom Software, AI & Digital Product Development',
		description: 'TheCraftSync is a premier digital agency specializing in custom software development, AI solutions, operational automation, and scalable enterprise platforms.',
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
