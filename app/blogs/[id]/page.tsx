'use client'

import React, {useEffect, useRef} from 'react'
import {useParams} from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import {ArrowLeft} from 'lucide-react'

// Mock Data (Duplicated for prototype)
const BLOG_POSTS = [
	{
		id: 1,
		title: 'The Future of Digital agency: AI-Driven Design Systems',
		category: 'AI & Tech',
		content: `
      <p>In the rapidly evolving landscape of digital design, Artificial Intelligence is no longer just a buzzword—it's a fundamental shift in how we create, iterate, and optimize. The integration of AI into design systems is enabling agencies to move from static, manual workflows to dynamic, data-driven processes that scale effortlessly.</p>
      
      <h3>The Shift to Generative UI</h3>
      <p>Generative UI is allowing for personalized user experiences that adapt in real-time. Instead of designing a single interface for all users, AI systems can generate variations based on user behavior, preferences, and context. This level of personalization was previously impossible to achieve manually at scale.</p>
      
      <h3>Automating the Mundane</h3>
      <p>By automating repetitive tasks such as asset resizing, color correction, and layout adjustments, designers are freed up to focus on strategic thinking and creative problem-solving. This not only increases efficiency but also boosts team morale by removing the drudgery from the design process.</p>
      
      <p>As we look to the future, the role of the designer is evolving from a pixel-pusher to a system architect, guiding the AI to produce results that align with the brand's vision and goals.</p>
    `,
		image:
			'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'Oct 12, 2023',
	},
	{
		id: 2,
		title: 'Building Brand Loyalty in a Saturation Market',
		category: 'Brand Growth',
		content: `
      <p>In a marketplace crowded with noise, standing out requires more than just a loud voice—it requires a resonant one. Brand loyalty today isn't bought; it's earned through consistent, authentic interactions that build trust over time.</p>
      
      <h3>The Emotional Connection</h3>
      <p>Customers don't just buy products; they buy stories and values. Brands that can effectively communicate their "why" and connect with their audience on an emotional level are the ones that foster deep, lasting loyalty.</p>
      
      <h3>Consistency is Key</h3>
      <p>From your visual identity to your tone of voice, consistency builds recognition and trust. Every touchpoint is an opportunity to reinforce your brand promise. Inconsistency, on the other hand, breeds confusion and erodes trust.</p>
    `,
		image:
			'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'Sep 28, 2023',
	},
	// Fallback for other IDs
]

export default function BlogPost() {
	const params = useParams()
	const id = Number(params?.id)
	const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0] // Fallback to first post if not found

	const heroRef = useRef(null)
	const contentRef = useRef(null)

	useEffect(() => {
		const tl = gsap.timeline()

		tl.fromTo(
			heroRef.current,
			{y: 50, opacity: 0},
			{y: 0, opacity: 1, duration: 1.2, ease: 'power4.out'}
		).fromTo(
			contentRef.current,
			{y: 30, opacity: 0},
			{y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'},
			'-=0.6'
		)
	}, [])

	if (!post) return <div>Loading...</div>

	return (
		<main className='min-h-screen bg-[#f8fafc] w-full text-[#1a1a1a]'>
			{/* Navigation */}
			<div className='fixed bottom-8 right-8 md:bottom-auto md:right-auto md:top-8 md:left-8 z-50'>
				<Link
					href='/blogs'
					className='group flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 border border-black/5 shadow-sm text-sm font-bold tracking-wider font-descriptive text-gray-600'>
					<ArrowLeft
						size={18}
						className='group-hover:-translate-x-1 transition-transform'
					/>
					<span>BACK TO INSIGHTS</span>
				</Link>
			</div>

			{/* Hero Section */}
			<div className='relative w-full h-[60vh] md:h-[80vh] overflow-hidden'>
				<div className='absolute inset-0 bg-black/20 z-10' />
				<img
					ref={heroRef}
					src={post.image}
					alt={post.title}
					className='w-full h-full object-cover opacity-0'
				/>
				<div className='absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent'>
					<div className='max-w-[1400px] mx-auto'>
						<div className='mb-6 flex gap-4 items-center'>
							<span className='bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase'>
								{post.category}
							</span>
							<span className='text-gray-200 font-descriptive text-sm'>
								{post.date}
							</span>
						</div>
						<h1 className='font-heading text-4xl md:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tighter max-w-5xl text-white'>
							{post.title}
						</h1>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className='max-w-[1000px] mx-auto px-6 py-20 md:py-32'>
				<div
					ref={contentRef}
					className='opacity-0 font-descriptive text-lg md:text-xl leading-relaxed text-gray-600 space-y-8 [&>h3]:text-3xl [&>h3]:font-heading [&>h3]:text-black [&>h3]:mt-12 [&>h3]:mb-6 [&>p]:leading-loose'
					dangerouslySetInnerHTML={{__html: post.content}}
				/>
			</div>
		</main>
	)
}
