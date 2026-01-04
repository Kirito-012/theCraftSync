'use client'

import React, {useState, useEffect, useRef} from 'react'
import {Phone, Search, Handshake, ArrowRight} from 'lucide-react'
import gsap from 'gsap'

const steps = [
	{
		id: '01',
		icon: Phone,
		title: 'Intro Call',
		subtitle: 'The Basics',
		description:
			'A quick 15-minute sync to hear your story, understand your vision, and see if we match.',
		bgGradient: 'from-zinc-900 to-zinc-950',
		lineColor: 'bg-emerald-500',
	},
	{
		id: '02',
		icon: Search,
		title: 'Discovery',
		subtitle: 'Deep Dive',
		description:
			'We dig into your goals, audience, and scope. We plan the roadmap before a single pixel is placed.',
		bgGradient: 'from-zinc-900 to-zinc-950',
		lineColor: 'bg-blue-500',
	},
	{
		id: '03',
		icon: Handshake,
		title: 'Partnership',
		subtitle: 'The Launch',
		description:
			'Scope, budget, and timeline aligned. We kick off the project and build something exceptional together.',
		bgGradient: 'from-zinc-900 to-zinc-950',
		lineColor: 'bg-purple-500',
	},
]

const WhatHappensNext = () => {
	const [activeStep, setActiveStep] = useState<number>(0)

	// Animation Refs
	const containerRef = useRef<HTMLDivElement>(null)
	const badgeRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const descRef = useRef<HTMLParagraphElement>(null)
	const stepsRef = useRef<(HTMLDivElement | null)[]>([])
	const textRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const initGsap = async () => {
			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			const ctx = gsap.context(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 75%', // Trigger slightly earlier for better flow
					},
				})

				// Initial States
				gsap.set([badgeRef.current, titleRef.current, descRef.current], {
					opacity: 0,
					y: 30,
				})
				gsap.set(stepsRef.current, {opacity: 0, y: 60})

				// 1. Header Sequence (Cascading)
				tl.to([badgeRef.current, titleRef.current, descRef.current], {
					opacity: 1,
					y: 0,
					duration: 1,
					stagger: 0.15,
					ease: 'power4.out',
				})

				// 2. Steps Sequence (Slide Up)
				tl.to(
					stepsRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 1.2, // Slightly slower for elegance
						stagger: 0.15,
						ease: 'power4.out',
						clearProps: 'transform', // Important to clear transform so hover effects work cleanly
					},
					'-=0.5'
				) // Overlap slightly with header animation
			}, containerRef)

			return () => ctx.revert()
		}

		initGsap()
	}, [])

	const handleStepChange = (index: number) => {
		if (activeStep === index) return
		setActiveStep(index)

		// Animate Accordion Content
		// We keep this interaction super snappy
		const activeContent = textRefs.current[index]
		const otherContents = textRefs.current.filter((_, i) => i !== index)

		if (activeContent) {
			gsap.to(activeContent, {
				height: 'auto',
				opacity: 1,
				duration: 0.6,
				ease: 'power3.out', // Smooth ease
			})
		}

		otherContents.forEach((content) => {
			if (content) {
				gsap.to(content, {
					height: 0,
					opacity: 0,
					duration: 0.4,
					ease: 'power3.out',
				})
			}
		})
	}

	return (
		<section
			className='w-full bg-black py-20 px-4 sm:px-8 overflow-hidden'
			ref={containerRef}>
			<div className='max-w-[1600px] mx-auto'>
				<div className='mb-24 flex flex-col items-center text-center'>
					<div
						ref={badgeRef}
						className='flex items-center gap-2 mb-8 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm opacity-0'>
						<span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
						<span className='text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400'>
							The Process
						</span>
					</div>

					<h2
						ref={titleRef}
						className='text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] opacity-0'>
						What happens <br className='hidden md:block' />
						<span className='text-zinc-500 font-serif italic'>next?</span>
					</h2>

					<p
						ref={descRef}
						className='text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl opacity-0'>
						We believe in a transparent and collaborative process. Here is a
						breakdown of how we go from initial contact to a signed partnership.
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]'>
					{steps.map((step, index) => {
						const isActive = activeStep === index
						return (
							<div
								key={step.id}
								ref={(el) => {
									stepsRef.current[index] = el
								}}
								onMouseEnter={() => handleStepChange(index)}
								onClick={() => handleStepChange(index)}
								className={`
									relative rounded-3xl overflow-hidden cursor-pointer 
									border border-zinc-800 transition-[flex-grow,flex-basis,background-color] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
									p-8 lg:p-10 group flex flex-col justify-between
									${
										isActive
											? 'lg:flex-3 bg-zinc-900 border-zinc-700'
											: 'lg:flex-1 bg-zinc-950 hover:bg-zinc-900'
									}
								`}
								style={{willChange: 'flex-grow, flex-basis'}}>
								{/* Top Content */}
								<div className='relative z-10 flex justify-between items-start'>
									<div className='flex flex-col'>
										<span
											className={`text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-800 transition-opacity duration-500 ${
												isActive ? 'opacity-100' : 'opacity-40'
											}`}>
											{step.id}
										</span>
										<span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mt-2'>
											Step
										</span>
									</div>
									<div
										className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 transform ${
											isActive
												? 'bg-white text-black -rotate-45'
												: 'bg-transparent text-white group-hover:bg-white/10'
										}`}>
										<ArrowRight className='w-5 h-5' />
									</div>
								</div>

								{/* Bottom Content */}
								<div className='relative z-10 mt-12 lg:mt-0'>
									<div className='flex items-center gap-3 mb-2'>
										<step.icon
											className={`w-6 h-6 transition-colors duration-300 ${
												isActive ? 'text-white' : 'text-zinc-500'
											}`}
										/>
										<h3 className='text-xl md:text-3xl font-bold text-white tracking-tight'>
											{step.title}
										</h3>
									</div>

									<div
										ref={(el) => {
											textRefs.current[index] = el
										}}
										className='overflow-hidden'
										style={{
											height: isActive ? 'auto' : 0,
											opacity: isActive ? 1 : 0,
										}}>
										<p className='text-zinc-400 text-lg leading-relaxed pt-4 font-light border-t border-zinc-800 mt-4'>
											{step.description}
										</p>
										<div className='mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white'>
											<span className={`w-8 h-[2px] ${step.lineColor}`}></span>
											{step.subtitle}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default WhatHappensNext
