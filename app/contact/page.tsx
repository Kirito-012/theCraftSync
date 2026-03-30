import React from 'react'
import HeroSection from './HeroSection'
import ContactInfoSection from './ContactInfoSection'
import WhatHappensNext from './WhatHappensNext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | TheCraftSync',
  description: 'Get in touch with TheCraftSync for custom software development, AI solutions, and digital transformation consulting. Let\'s build something great together.',
}

const ContactPage = () => {
	return (
		<>
			<HeroSection />
			<WhatHappensNext />
			<ContactInfoSection />
		</>
	)
}

export default ContactPage
