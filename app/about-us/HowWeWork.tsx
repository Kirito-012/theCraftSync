'use client'

import {useLayoutEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const slides = [
	{
		step: 1,
		title: 'Discovery',
		subtitle: 'Research',
		description:
			'We begin by deeply understanding your business goals, target audience, and market landscape. Through collaborative workshops and thorough research, we uncover insights that shape the foundation of your digital solution.',
		icon: '🔍',
	},
	{
		step: 2,
		title: 'Strategy',
		subtitle: 'Planning',
		description:
			'Armed with insights, we craft a comprehensive strategy tailored to your objectives. We define the project scope, create detailed roadmaps, and establish clear milestones to ensure seamless execution and measurable success.',
		icon: '📋',
	},
	{
		step: 3,
		title: 'Design',
		subtitle: 'Development',
		description:
			'Our creative team brings your vision to life with stunning designs and robust development. We focus on user experience, modern aesthetics, and cutting-edge technology to build solutions that captivate and perform.',
		icon: '🎨',
	},
	{
		step: 4,
		title: 'Launch',
		subtitle: 'Optimize',
		description:
			'We ensure a flawless launch with rigorous testing and quality assurance. Post-launch, we continuously monitor performance, gather user feedback, and optimize to drive growth and exceed expectations.',
		icon: '🚀',
	},
]

// Fixed positions for dots to avoid hydration mismatch
const dotPositions = [
	{left: 15, top: 20, delay: 0, duration: 8},
	{left: 85, top: 30, delay: 1, duration: 10},
	{left: 45, top: 10, delay: 2, duration: 9},
	{left: 70, top: 80, delay: 0.5, duration: 11},
	{left: 25, top: 60, delay: 1.5, duration: 8.5},
	{left: 90, top: 50, delay: 2.5, duration: 10.5},
	{left: 10, top: 70, delay: 3, duration: 9.5},
	{left: 60, top: 25, delay: 3.5, duration: 11.5},
	{left: 35, top: 85, delay: 4, duration: 8.8},
	{left: 80, top: 15, delay: 4.5, duration: 10.2},
	{left: 50, top: 45, delay: 0.8, duration: 9.2},
	{left: 20, top: 35, delay: 1.8, duration: 11.2},
	{left: 75, top: 65, delay: 2.8, duration: 8.7},
	{left: 40, top: 55, delay: 3.8, duration: 10.7},
	{left: 65, top: 90, delay: 4.8, duration: 9.7},
	{left: 30, top: 40, delay: 1.2, duration: 11.8},
	{left: 95, top: 75, delay: 2.2, duration: 8.9},
	{left: 55, top: 20, delay: 3.2, duration: 10.9},
	{left: 12, top: 50, delay: 4.2, duration: 9.9},
	{left: 88, top: 60, delay: 0.3, duration: 11.3},
]

export default function HowWeWork() {
	const containerRef = useRef<HTMLDivElement>(null)
	const slidesRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const container = containerRef.current
		const slidesContainer = slidesRef.current

		if (!container || !slidesContainer) return

		// Calculate total scroll distance
		const totalSlides = slides.length
		const viewportWidth = window.innerWidth

		// Create horizontal scroll animation
		const scrollTween = gsap.to(slidesContainer, {
			x: () => -(viewportWidth * (totalSlides - 1)),
			ease: 'none',
			scrollTrigger: {
				trigger: container,
				pin: true,
				scrub: 0.1,
				snap: {
					snapTo: 1 / (totalSlides - 1),
					duration: {min: 0.2, max: 0.4},
					ease: 'power3.inOut',
					delay: 0,
				},
				end: () => `+=${viewportWidth * (totalSlides - 1) * 1.2}`,
				anticipatePin: 1,
			},
		})

		return () => {
			scrollTween.scrollTrigger?.kill()
			scrollTween.kill()
		}
	}, [])

	return (
		<section
			ref={containerRef}
			className='relative w-full h-screen overflow-hidden bg-linear-to-br from-[#000000] via-[#000000] to-[#1b1b1b]'>
			{/* Section Title - Fixed at top */}
			<div className='absolute top-0 left-0 right-0 z-20 pt-16 pb-8 bg-linear-to-b from-black/90 via-black/50 to-transparent'>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='flex items-center gap-4 mb-2'>
						<div className='h-px w-16 bg-white/40'></div>
						<span className='text-white/60 uppercase text-[9px] font-descriptive tracking-[0.4em] font-medium'>
							Our Process
						</span>
					</div>
					<h2 className='text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight'>
						How We Work
					</h2>
				</div>
			</div>

			{/* Subtle grid pattern overlay */}
			<div
				className='absolute inset-0 opacity-[0.03]'
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
					backgroundSize: '50px 50px',
				}}></div>

			{/* Animated dot pattern */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				{dotPositions.map((dot, i) => (
					<div
						key={i}
						className='absolute w-1 h-1 bg-white/20 rounded-full animate-float'
						style={{
							left: `${dot.left}%`,
							top: `${dot.top}%`,
							animationDelay: `${dot.delay}s`,
							animationDuration: `${dot.duration}s`,
						}}></div>
				))}
			</div>

			{/* Radial gradient overlay for depth */}
			<div className='absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none'></div>

			{/* Slides container */}
			<div
				ref={slidesRef}
				className='flex h-full items-center'
				style={{width: `${slides.length * 100}vw`}}>
				{slides.map((slide, index) => (
					<div
						key={slide.step}
						className='flex items-center justify-center w-screen h-full px-[8vw] py-[8vh] relative'>
						{/* Slide-specific decorative elements */}
						<div className='absolute inset-0 pointer-events-none'>
							{/* Large decorative circles */}
							<div
								className='absolute w-96 h-96 rounded-full border border-white/5 -top-20 -right-20'
								style={{
									background:
										'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
								}}></div>
							<div
								className='absolute w-64 h-64 rounded-full border border-white/5 -bottom-10 -left-10'
								style={{
									background:
										'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
								}}></div>

							{/* Floating accent dots */}
							<div className='absolute top-1/4 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse'></div>
							<div
								className='absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse'
								style={{animationDelay: '1s'}}></div>
							<div
								className='absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-white/10 rounded-full animate-pulse'
								style={{animationDelay: '2s'}}></div>
						</div>

						<div className='max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>
							{/* Left side - Visual element */}
							<div className='relative order-2 lg:order-1'>
								<div className='relative group'>
									{/* Large icon circle */}
									<div className='relative w-80 h-80 mx-auto rounded-full bg-linear-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm'>
										{/* Icon */}
										<span className='text-[120px] transform transition-transform duration-500 group-hover:scale-110'>
											{slide.icon}
										</span>

										{/* Decorative circles */}
										<div className='absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-white/20 transition-all duration-500'></div>
										<div className='absolute bottom-12 left-12 w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-white/20 transition-all duration-500'></div>
									</div>

									{/* Step number - floating */}
									<div className='absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-2xl font-heading font-bold shadow-lg'>
										{slide.step}
									</div>
								</div>
							</div>

							{/* Right side - Content */}
							<div className='relative order-1 lg:order-2 space-y-6'>
								{/* Title */}
								<div>
									<h3 className='text-6xl md:text-7xl font-heading font-bold text-white leading-none tracking-tight mb-2'>
										{slide.title}
									</h3>
									<div className='flex items-center gap-3 mt-3'>
										<div className='h-0.5 w-12 bg-white/40'></div>
										<span className='text-lg font-heading text-white/60 tracking-wide'>
											{slide.subtitle}
										</span>
									</div>
								</div>

								{/* Description */}
								<p className='text-white/80 font-descriptive leading-[1.9] text-base md:text-lg font-light'>
									{slide.description}
								</p>

								{/* Progress dots */}
								<div className='flex gap-2 pt-4'>
									{slides.map((_, i) => (
										<div
											key={i}
											className={`h-1.5 rounded-full transition-all duration-300 ${
												i === index ? 'w-12 bg-white' : 'w-1.5 bg-white/30'
											}`}></div>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Scroll indicator */}
			<div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60'>
				<span className='text-xs tracking-widest text-white/60 uppercase font-descriptive'>
					Scroll
				</span>
				<div className='w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5'>
					<div className='w-1 h-2 bg-white/60 rounded-full animate-bounce' />
				</div>
			</div>
		</section>
	)
}
