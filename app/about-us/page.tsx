import type {Metadata} from 'next'
import './aboutus.css'
import HeroSection from './HeroSection'
import WhoWeAre from './WhoWeAre'
import OurTeam from './OurTeam'
import HowWeWork from './HowWeWork'
import AboutUsCTA from './AboutUsCTA'

export const metadata: Metadata = {
	title: 'About Us | TheCraftSync - Custom Software & AI Development',
	description: 'Learn about TheCraftSync, a custom software and AI development company. We build digital experiences, scalable enterprise software, and AI-powered systems that matter and drive business growth.',
	openGraph: {
		title: 'About TheCraftSync | Custom Software & AI Development',
		description: 'Learn about TheCraftSync, a custom software and AI development company. We build digital experiences, scalable enterprise software, and AI-powered systems that matter and drive business growth.',
		url: 'https://www.thecraftsync.com/about-us',
		siteName: 'TheCraftSync',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'About TheCraftSync | Custom Software & AI Development',
		description: 'Learn about TheCraftSync, a custom software and AI development company. We build digital experiences, scalable enterprise software, and AI-powered systems that matter and drive business growth.',
	},
	alternates: {
		canonical: 'https://www.thecraftsync.com/about-us',
	},
}

export default function AboutPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		"name": "About TheCraftSync",
		"description": "Learn about TheCraftSync, a custom software and AI development company specialize in enterprise solutions and automation.",
		"url": "https://www.thecraftsync.com/about-us",
		"mainEntity": {
			"@type": "Organization",
			"name": "TheCraftSync",
			"description": "TheCraftSync is a premier digital agency specializing in custom software development, AI solutions, and scalable enterprise platforms."
		}
	};

	return (
		<div className='relative w-full min-h-screen bg-navy-dark text-white overflow-x-hidden selection:bg-teal-accent selection:text-white'>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<HeroSection />
			<WhoWeAre />
			{/* <HowWeWork /> */}
			<OurTeam />
			<AboutUsCTA />
		</div>
	)
}
