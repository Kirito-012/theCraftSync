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
}

export default function AboutPage() {
	return (
		<div className='relative w-full min-h-screen bg-navy-dark text-white overflow-x-hidden selection:bg-teal-accent selection:text-white'>
			<HeroSection />
			<WhoWeAre />
			{/* <HowWeWork /> */}
			<OurTeam />
			<AboutUsCTA />
		</div>
	)
}
