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
			className='relative w-full h-screen overflow-hidden bg-linear-to-br from-[#0a0a0a] via-[#000000] to-[#1a1a1a]'>
			{/* Section Title - Fixed at top with glassmorphism */}
			<div className='absolute top-0 left-0 right-0 z-20 pt-16 pb-8'>
				<div className='max-w-7xl mx-auto px-6'>
					<div className='flex items-center gap-4 mb-3'>
						<div className='h-px w-20 bg-gradient-to-r from-white/60 to-white/20'></div>
						<span className='text-white/70 uppercase text-[9px] font-descriptive tracking-[0.4em] font-medium'>
							Our Process
						</span>
					</div>
					<h2 className='text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight drop-shadow-2xl'>
						How We Work
					</h2>
				</div>
			</div>

			{/* Enhanced grid pattern overlay */}
			<div
				className='absolute inset-0 opacity-[0.04]'
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
					backgroundSize: '60px 60px',
				}}></div>

			{/* Ambient light effects */}
			<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl'></div>
			<div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl'></div>

			{/* Enhanced radial gradient overlay */}
			<div className='absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none'></div>

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
						<div className='absolute inset-0 pointer-events-none'></div>

						<div className='max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10'>
							{/* Left side - Enhanced Visual element */}
							<div className='relative order-2 lg:order-1'>
								<div className='relative group'>
									{/* Premium icon circle with glassmorphism */}
									<div className='relative w-80 h-80 mx-auto rounded-full glass flex items-center justify-center overflow-hidden group-hover:shadow-2xl group-hover:shadow-white/10 transition-all duration-700'>
										{/* Animated gradient background */}
										<div className='absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

										{/* Icon with enhanced shadow */}
										<span className='relative z-10 text-[120px] transform transition-all duration-700 group-hover:scale-110 drop-shadow-2xl'>
											{slide.icon}
										</span>

										{/* Rotating ring effect */}
										<div className='absolute inset-0 rounded-full border-t-2 border-white/10 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000'></div>
									</div>

									{/* Premium step number badge */}
									<div className='absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-white to-gray-100 text-black flex items-center justify-center text-3xl font-heading font-bold shadow-2xl ring-4 ring-white/20 group-hover:scale-110 transition-transform duration-500'>
										{slide.step}
									</div>
								</div>
							</div>

							{/* Right side - Enhanced Content card */}
							<div className='relative order-1 lg:order-2'>
								{/* Premium content card */}
								<div className='rounded-3xl p-8 space-y-6 transition-all duration-700 group/card'>
									{/* Title with gradient accent */}
									<div>
										<h3 className='text-6xl md:text-7xl font-heading font-bold text-white leading-none tracking-tight mb-3 drop-shadow-lg'>
											{slide.title}
										</h3>
										<div className='flex items-center gap-3 mt-4'>
											<div className='h-1 w-16 bg-gradient-to-r from-white/60 to-white/20 rounded-full'></div>
											<span className='text-lg font-heading text-white/70 tracking-wide'>
												{slide.subtitle}
											</span>
										</div>
									</div>

									{/* Enhanced description */}
									<p className='text-white/85 font-descriptive leading-[2] text-base md:text-lg font-light'>
										{slide.description}
									</p>

									{/* Premium progress dots */}
									<div className='flex gap-3 pt-6'>
										{slides.map((_, i) => (
											<div
												key={i}
												className={`h-2 rounded-full transition-all duration-500 ${
													i === index
														? 'w-16 bg-gradient-to-r from-white to-white/80 shadow-lg shadow-white/20'
														: 'w-2 bg-white/30 hover:bg-white/50'
												}`}></div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Enhanced scroll indicator */}
			<div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300'>
				<span className='text-xs tracking-widest text-white/70 uppercase font-descriptive'>
					Scroll
				</span>
				<div className='w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2 hover:border-white/60 transition-colors duration-300'>
					<div className='w-1.5 h-3 bg-white/70 rounded-full animate-bounce' />
				</div>
			</div>
		</section>
	)
}
