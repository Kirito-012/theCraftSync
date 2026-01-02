import type {Metadata} from 'next'
import './aboutus.css'
import HeroSection from './HeroSection'
import WhoWeAre from './WhoWeAre'
import OurTeam from './OurTeam'
import HowWeWork from './HowWeWork'

export const metadata: Metadata = {
	title: 'About Us - TheCraftSync',
	description: 'We build digital experiences that matter.',
}

export default function AboutPage() {
	return (
		<div className='relative w-full min-h-screen bg-navy-dark text-white overflow-x-hidden selection:bg-teal-accent selection:text-white'>
			<HeroSection />
			<WhoWeAre />
			<HowWeWork />
			<OurTeam />
		</div>
	)
}
