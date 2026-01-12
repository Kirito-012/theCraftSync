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
		description:
			'Explore how artificial intelligence is reshaping the landscape of modern web design, allowing for dynamic, personalized user experiences at scale.',
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
		description:
			'In an era of endless choices, discover the psychological triggers that turn casual browsers into devoted brand advocates.',
		image:
			'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'Sep 28, 2023',
	},
	{
		id: 3,
		title: 'Minimalism is Not Just About Less',
		category: 'Web Design',
		content: `
      <p>Minimalism in web design is often misunderstood as simply removing elements until there's nothing left. However, true minimalism is about intentionality—stripping away the non-essential to let the core message shine. It's a discipline of clarity, not just scarcity.</p>
      
      <h3>The Power of Whitespace</h3>
      <p>Whitespace (or negative space) is not empty space; it's an active design element. It dictates flow, creates hierarchy, and gives content room to breathe. By using whitespace effectively, we can guide the user's eye and reduce cognitive load, making the experience more enjoyable and effective.</p>
      
      <h3>Typography as Architecture</h3>
      <p>In a minimalist interface, typography takes center stage. Without heavy imagery or decoration to hide behind, the choice of typeface, weight, and scale becomes critical. Typography provides the structure and rhythm of the page, acting as the architectural backbone of the design.</p>
    `,
		description:
			"Unpacking the 'less is more' philosophy. Why spacing, typography, and intent matter more than decoration in premium design.",
		image:
			'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'Aug 15, 2023',
	},
	{
		id: 4,
		title: 'Scaling Client Success: A Framework',
		category: 'Client Success',
		content: `
      <p>Scaling a service business is a delicate balancing act. As you add more clients, the quality of service can easily slip. The key to sustainable growth is a robust client success framework that standardizes excellence without sacrificing personalization.</p>
      
      <h3>Onboarding: Setting the Stage</h3>
      <p>The first 30 days are critical. A structured onboarding process ensures that expectations are aligned, communication channels are established, and quick wins are identified. This sets the tone for the entire relationship and builds immediate trust.</p>
      
      <h3>Proactive vs. Reactive</h3>
      <p>Top-tier agencies don't just respond to requests; they anticipate needs. By using data and regular check-ins, you can identify opportunities and potential issues before they arise, positioning yourself as a strategic partner rather than just a vendor.</p>
    `,
		description:
			'A step-by-step guide to onboarding, managing, and retaining high-ticket clients without burning out your creative team.',
		image:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'Jul 22, 2023',
	},
	{
		id: 5,
		title: 'The Psychology of Color in UI/UX',
		category: 'Digital Strategy',
		content: `
      <p>Color is one of the most powerful tools in a designer's arsenal, yet it's often selected based on personal preference rather than psychological impact. Understanding how color influences emotion and behavior is essential for creating effective user interfaces.</p>
      
      <h3>Beyond Aesthetics</h3>
      <p>Different colors evoke different physiological and psychological responses. Blue conveys trust and stability, making it popular for financial institutions. Red creates urgency and excitement, useful for calls to action. By aligning your color palette with your brand's goals, you can subtly influence user behavior.</p>
      
      <h3>Accessibility Matters</h3>
      <p>While color psychology is important, accessibility is paramount. Ensuring sufficient contrast and providing alternative cues for color-blind users is not just a legal requirement but a moral one. Inclusive design expands your reach and demonstrates empathy for all users.</p>
    `,
		description:
			'How color palettes influence user decision-making and brand perception. Choosing the right tones for your digital identity.',
		image:
			'https://images.unsplash.com/photo-1558478551-1a378f63328e?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'Jun 10, 2023',
	},
	{
		id: 6,
		title: 'Optimizing for Speed: Next.js Best Practices',
		category: 'Development',
		content: `
      <p>In the digital age, speed is currency. A slow website not only frustrates users but also hurts your search engine rankings. Next.js offers a powerful suite of tools to optimize performance, but they must be used correctly to achieve maximum impact.</p>
      
      <h3>Server-Side Rendering (SSR) vs. Static Site Generation (SSG)</h3>
      <p>Understanding when to use SSR and SSG is fundamental. SSG is ideal for content that doesn't change often, providing lightning-fast load times. SSR is better for dynamic content that requires up-to-the-minute data. Hybrid approaches allow you to get the best of both worlds.</p>
      
      <h3>Image Optimization</h3>
      <p>Images are often the heaviest assets on a page. The Next.js Image component automatically handles resizing, lazy loading, and format serving (like WebP), significantly reducing bandwidth usage and improving Core Web Vitals scores without compromising visual quality.</p>
    `,
		description:
			'Technical deep dive into server-side rendering, image optimization, and code splitting for lightning-fast web applications.',
		image:
			'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1920&h=1080',
		date: 'May 05, 2023',
	},
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
				<div className='absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-linear-to-t from-black/90 via-black/50 to-transparent'>
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
			<div className='max-w-3xl mx-auto px-6 py-20 md:py-32'>
				<div
					ref={contentRef}
					className='opacity-0 font-descriptive text-base md:text-lg leading-8 text-zinc-700 space-y-8 [&>h3]:text-2xl md:[&>h3]:text-3xl [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-12 [&>h3]:mb-4'
					dangerouslySetInnerHTML={{__html: post.content}}
				/>
			</div>

			{/* More Insights Section */}
			<div className='w-full bg-white py-20 px-4 md:py-32 border-t border-gray-100'>
				<div className='max-w-[1400px] mx-auto'>
					<h3 className='font-heading text-4xl md:text-5xl font-bold text-black mb-16'>More Insights</h3>
					
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
							<Link
								key={relatedPost.id}
								href={`/blogs/${relatedPost.id}`}
								className='block h-full'>
								<article className='group flex flex-col h-full bg-white rounded-[32px_8px_32px_8px] overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5'>
									{/* Image Container */}
									<div className='relative w-full h-64 overflow-hidden bg-gray-200 shrink-0'>
										<img
											src={relatedPost.image}
											alt={relatedPost.title}
											className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
										/>
									</div>

									{/* Card Body */}
									<div className='p-8 flex-1 flex flex-col'>
										{/* Category */}
										<div className='mb-4'>
											<span className='text-[10px] font-bold tracking-widest text-[#888888] uppercase'>
												{relatedPost.category}
											</span>
										</div>

										{/* Headline */}
										<h2 className='font-heading text-2xl font-bold leading-[1.1] text-black mb-4 line-clamp-3 group-hover:text-amber-700 transition-colors'>
											{relatedPost.title}
										</h2>

										{/* Description */}
										<p className='font-descriptive text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1'>
											{relatedPost.description}
										</p>

										{/* Read More Link */}
										<div className='flex items-center gap-2 text-black text-xs font-bold tracking-wide uppercase transition-all duration-300 group-hover:opacity-70'>
											Read Article
											<div className='w-8 h-px bg-black/20' />
										</div>
									</div>
								</article>
							</Link>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}
