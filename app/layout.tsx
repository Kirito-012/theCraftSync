import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from './Components/SmoothScroll';
import { LoadingProvider } from './lib/LoadingContext';
import AppWrapper from './Components/AppWrapper';

export const metadata: Metadata = {
	metadataBase: new URL('https://www.thecraftsync.com'),
	title: {
		default: 'TheCraftSync | Premier Custom Software & AI Development Agency',
		template: '%s | TheCraftSync',
	},
	description: 'TheCraftSync is a top-tier digital product agency. We specialize in custom software development, AI solutions, web applications, and scalable enterprise platforms designed to drive business growth and operational efficiency.',
	keywords: [
		'custom software development', 
		'AI software development company', 
		'enterprise software solutions', 
		'web application development', 
		'digital transformation agency', 
		'startup MVP development', 
		'tech consulting', 
		'TheCraftSync'
	],
	authors: [{ name: 'TheCraftSync', url: 'https://www.thecraftsync.com' }],
	creator: 'TheCraftSync',
	publisher: 'TheCraftSync',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
    icon: [
      { url: '/tcslogo.png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/tcslogo.png',
  },
	openGraph: {
		title: 'TheCraftSync | Premier Custom Software & AI Development Agency',
		description: 'TheCraftSync is a top-tier digital product agency. We specialize in custom software development, AI solutions, web applications, and scalable enterprise platforms.',
		url: 'https://www.thecraftsync.com',
		siteName: 'TheCraftSync',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'TheCraftSync - Custom Software & AI Development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TheCraftSync | Custom Software & AI Development Agency',
		description: 'TheCraftSync is a top-tier digital product agency. We specialize in custom software development and AI solutions to drive business growth.',
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
