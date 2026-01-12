'use client'

import React, {useState, useEffect, useRef} from 'react'
import {Search, ChevronDown} from 'lucide-react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Link from 'next/link'
import AboutUsCTA from '../about-us/AboutUsCTA'

export default function BlogPage() {
	const [selectedCategory, setSelectedCategory] = useState('ALL')
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const headerRef = useRef<HTMLHeadingElement>(null)
	const searchRef = useRef<HTMLDivElement>(null)
	const categoriesRef = useRef<HTMLDivElement>(null)
	const gridRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)
		const tl = gsap.timeline()

		// Header Animation
		if (headerRef.current) {
			const headerChildren = headerRef.current.children
			tl.fromTo(
				headerChildren,
				{y: 100, opacity: 0},
				{
					y: 0,
					opacity: 1,
					stagger: 0.15,
					duration: 1.2,
					ease: 'power4.out',
				}
			)
		}

		// Search Bar & Actions
		if (searchRef.current) {
			tl.fromTo(
				searchRef.current,
				{y: 30, opacity: 0},
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
				},
				'-=0.6'
			)
		}

		// Categories & Text
		if (categoriesRef.current) {
			tl.fromTo(
				categoriesRef.current,
				{y: 30, opacity: 0},
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
				},
				'-=0.6'
			)
		}

		// Blog Grid Stagger with ScrollTrigger
		if (gridRef.current) {
			const cards = gridRef.current.children
			gsap.fromTo(
				cards,
				{y: 100, opacity: 0},
				{
					y: 0,
					opacity: 1,
					stagger: 0.1,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: gridRef.current,
						start: 'top 85%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}
	}, [])

	const categories = [
		'ALL',
		'AI & TECH',
		'DIGITAL STRATEGY',
		'WEB DESIGN',
		'BRAND GROWTH',
		'CLIENT SUCCESS',
		'GROWTH TACTICS',
	]

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category)
		setIsDropdownOpen(false)
	}

	return (
		<main className='min-h-screen bg-black w-full'>
			<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-12'>
				{/* Header Section */}
				<div className='flex flex-col gap-12 mb-16'>
					{/* Top - Headline */}
					<div className='w-full overflow-hidden py-4'>
						<h1
							ref={headerRef}
							className='font-heading text-6xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-white'>
							<div className='origin-bottom-left'>INSIGHTS</div>
							<div className='origin-bottom-left'>WORTH</div>
							<div className='origin-bottom-left'>SHARING</div>
						</h1>
					</div>

					{/* Bottom - Search & Description */}
					<div className='w-full flex flex-col gap-8'>
						{/* Search Bar & Actions */}
						<div
							ref={searchRef}
							className='flex flex-col sm:flex-row gap-4 w-full relative z-20 opacity-0'>
							{/* Input Field */}
							<div className='flex-1 relative group'>
								<div className='flex items-center bg-[#1c1c1c] rounded-full border border-[#333] shadow-sm p-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-white/10 hover:border-[#444] w-full'>
									<div className='pl-4 pr-3 text-zinc-400'>
										<Search size={20} />
									</div>
									<input
										type='text'
										placeholder='Search articles...'
										className='flex-1 bg-transparent border-none outline-none text-sm font-descriptive text-white placeholder:text-neutral-500 h-10 w-full'
									/>
								</div>
							</div>

							{/* Actions */}
							<div className='flex items-center gap-3 shrink-0 relative'>
								{/* Category Dropdown */}
								<div className='relative'>
									<button
										onClick={() => setIsDropdownOpen(!isDropdownOpen)}
										className='hidden sm:flex items-center gap-2 bg-[#1c1c1c] rounded-full border border-[#333] px-4 h-[54px] hover:border-[#444] transition-colors cursor-pointer select-none text-xs font-bold text-zinc-400 hover:text-white font-descriptive tracking-wide'>
										{selectedCategory}
										<ChevronDown
											size={14}
											className={`transition-transform duration-300 ${
												isDropdownOpen ? 'rotate-180' : ''
											}`}
										/>
									</button>

									{/* Dropdown Menu */}
									{isDropdownOpen && (
										<div className='absolute top-full mt-2 right-0 w-48 bg-[#1c1c1c] border border-[#333] rounded-xl shadow-xl overflow-hidden py-1 z-30 animate-in fade-in zoom-in-95 duration-200'>
											{categories.map((category) => (
												<button
													key={category}
													onClick={() => handleCategoryClick(category)}
													className={`w-full text-left px-4 py-3 text-xs font-bold font-descriptive hover:bg-[#2a2a2a] transition-colors ${
														selectedCategory === category
															? 'text-white bg-[#2a2a2a]'
															: 'text-zinc-400'
													}`}>
													{category}
												</button>
											))}
										</div>
									)}
								</div>

								{/* Search Button */}
								<button className='bg-white text-black px-8 h-[54px] rounded-full text-xs font-bold tracking-wider font-descriptive hover:bg-gray-200 transition-colors shadow-lg shadow-white/5'>
									SEARCH
								</button>
							</div>
						</div>

						<div
							ref={categoriesRef}
							className='flex flex-col md:flex-row gap-8 justify-between items-start opacity-0'>
							{/* Category Pills */}
							<div className='flex flex-wrap gap-2 flex-1'>
								{categories.map((category, index) => (
									<button
										key={index}
										onClick={() => setSelectedCategory(category)}
										className={`
											px-4 py-2 rounded-full text-[10px] font-bold tracking-widest font-descriptive transition-all duration-300
											${
												selectedCategory === category
													? 'bg-white text-black hover:bg-gray-200'
													: 'bg-[#1c1c1c] border border-[#333] text-zinc-400 hover:border-[#555] hover:text-white'
											}
										`}>
										{category}
									</button>
								))}
							</div>

							{/* Supporting Text */}
							<p className='font-descriptive text-[#888888] text-sm leading-relaxed max-w-xl md:text-right md:pl-8'>
								Discover practical ideas and proven strategies across marketing,
								technology, and business growth. From smart digital campaigns to
								modern web design and branding tips, our articles help you stay
								ahead with actionable advice that drives real results.
							</p>
						</div>
					</div>
				</div>

				{/* Blog Grid Section */}
				<div
					ref={gridRef}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{BLOG_POSTS.map((post) => (
						<Link
							key={post.id}
							href={`/blogs/${post.id}`}
							className='block h-full opacity-0'>
							<article className='group flex flex-col h-full bg-white rounded-[32px_8px_32px_8px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10'>
								{/* Image Container */}
								<div className='relative w-full h-64 overflow-hidden bg-gray-200 shrink-0'>
									<img
										src={post.image}
										alt={post.title}
										className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
									/>
								</div>

								{/* Card Body */}
								<div className='p-8 flex-1 flex flex-col'>
									{/* Category */}
									<div className='mb-4'>
										<span className='text-[10px] font-bold tracking-widest text-[#888888] uppercase'>
											{post.category}
										</span>
									</div>

									{/* Headline */}
									<h2 className='font-heading text-2xl font-bold leading-[1.1] text-black mb-4 line-clamp-3 group-hover:text-amber-700 transition-colors'>
										{post.title}
									</h2>

									{/* Description */}
									<p className='font-descriptive text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1'>
										{post.description}
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
			<AboutUsCTA />
		</main>
	)
}

// Mock Data
const BLOG_POSTS = [
	{
		id: 1,
		title: 'The Future of Digital agency: AI-Driven Design Systems',
		category: 'AI & Tech',
		description:
			'Explore how artificial intelligence is reshaping the landscape of modern web design, allowing for dynamic, personalized user experiences at scale.',
		image:
			'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
	},
	{
		id: 2,
		title: 'Building Brand Loyalty in a Saturation Market',
		category: 'Brand Growth',
		description:
			'In an era of endless choices, discover the psychological triggers that turn casual browsers into devoted brand advocates.',
		image:
			'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=600',
	},
	{
		id: 3,
		title: 'Minimalism is Not Just About Less',
		category: 'Web Design',
		description:
			"Unpacking the 'less is more' philosophy. Why spacing, typography, and intent matter more than decoration in premium design.",
		image:
			'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800&h=600',
	},
	{
		id: 4,
		title: 'Scaling Client Success: A Framework',
		category: 'Client Success',
		description:
			'A step-by-step guide to onboarding, managing, and retaining high-ticket clients without burning out your creative team.',
		image:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600',
	},
	{
		id: 5,
		title: 'The Psychology of Color in UI/UX',
		category: 'Digital Strategy',
		description:
			'How color palettes influence user decision-making and brand perception. Choosing the right tones for your digital identity.',
		image:
			'https://images.unsplash.com/photo-1558478551-1a378f63328e?auto=format&fit=crop&q=80&w=800&h=600',
	},
	{
		id: 6,
		title: 'Optimizing for Speed: Next.js Best Practices',
		category: 'Development',
		description:
			'Technical deep dive into server-side rendering, image optimization, and code splitting for lightning-fast web applications.',
		image:
			'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800&h=600',
	},
]
