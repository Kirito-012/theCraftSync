import type {Metadata} from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
	title: 'About Us - TheCraftSync',
	description: 'We build digital experiences that matter.',
}

export default function AboutPage() {
	return <AboutContent />
}
