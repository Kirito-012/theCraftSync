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
	alternates: {
		canonical: 'https://www.thecraftsync.com',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "TheCraftSync",
		"url": "https://www.thecraftsync.com",
		"logo": "https://www.thecraftsync.com/tcslogo.png",
		"foundingDate": "2022",
		"sameAs": [
			"https://www.linkedin.com/company/the-craftsync/",
			"https://www.instagram.com/thecraftsync?igsh=MTE3c2ozdzJyMmpqYQ=="
		],
		"description": "TheCraftSync is a premier technology studio specializing in custom software development, AI automation, and enterprise digital solutions."
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "TheCraftSync",
		"url": "https://www.thecraftsync.com",
		"potentialAction": {
			"@type": "SearchAction",
			"target": "https://www.thecraftsync.com/search?q={search_term_string}",
			"query-input": "required name=search_term_string"
		}
	};

	return (
		<html lang='en'>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://fonts.cdnfonts.com" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
				<link href="https://fonts.cdnfonts.com/css/agrandir" rel="stylesheet" />
			</head>
			<body className='antialiased'>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
				<LoadingProvider>
					<AppWrapper>
						<SmoothScroll>{children}</SmoothScroll>
					</AppWrapper>
				</LoadingProvider>
			</body>
		</html>
	)
}
