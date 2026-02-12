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
	// Animation Refs
	const containerRef = useRef<HTMLDivElement>(null)
	const badgeRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const descRef = useRef<HTMLParagraphElement>(null)
	const stepsRef = useRef<(HTMLDivElement | null)[]>([])
	const lineRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let ctx: gsap.Context | undefined

		const initGsap = async () => {
			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			if (!containerRef.current) return

			ctx = gsap.context(() => {
				// 1. Header Entrance
				gsap.fromTo([badgeRef.current, titleRef.current, descRef.current], 
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						stagger: 0.15,
						ease: 'power4.out',
						scrollTrigger: {
							trigger: containerRef.current,
							start: 'top 80%',
						}
					}
				)

				// 2. Vertical Line Animation
				if (lineRef.current) {
					gsap.fromTo(lineRef.current,
						{ scaleY: 0 },
						{
							scaleY: 1,
							ease: 'none',
							scrollTrigger: {
								trigger: '.steps-container',
								start: 'top 60%',
								end: 'bottom 60%',
								scrub: 0.5,
							}
						}
					)
				}

				// 3. Staggered Step Reveals
				stepsRef.current.forEach((step, i) => {
					if (!step) return
					
					const content = step.querySelector('.step-content')
					const indicator = step.querySelector('.step-indicator')
					const num = step.querySelector('.step-num')

					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: step,
							start: 'top 70%',
							toggleActions: 'play none none reverse'
						}
					})

					tl.fromTo(indicator, 
						{ scale: 0, opacity: 0 },
						{ scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
					)
					.fromTo(num,
						{ x: -20, opacity: 0 },
						{ x: 0, opacity: 1, duration: 0.6 },
						'-=0.4'
					)
					.fromTo(content,
						{ x: 30, opacity: 0 },
						{ x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
						'-=0.4'
					)
				})
			}, containerRef)
		}

		initGsap()

		return () => {
			if (ctx) ctx.revert()
		}
	}, [])

	return (
		<section
			className='w-full bg-black py-24 md:py-40 px-6 sm:px-12 overflow-hidden'
			ref={containerRef}>
			<div className='max-w-7xl mx-auto'>
				{/* Original Header */}
				<div className='mb-32 flex flex-col items-start'>
					<div
						ref={badgeRef}
						className='flex items-center gap-2 mb-8 border border-white/10 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md'>
						<span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]'></span>
						<span className='text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400'>
							The Process
						</span>
					</div>

					<h2
						ref={titleRef}
						className='text-6xl md:text-8xl lg:text-9xl font-heading font-medium text-white tracking-tight mb-8 leading-[0.85]'>
						What happens <br />
						<span className='text-zinc-600 italic font-light'>next?</span>
					</h2>

					<p
						ref={descRef}
						className='text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl'>
						We believe in a transparent and collaborative process. Here is a
						breakdown of how we go from initial contact to a signed partnership.
					</p>
				</div>

				<div className='steps-container relative'>
					{/* Animated Progress Line */}
					<div className='absolute left-[20px] top-0 bottom-0 w-px bg-zinc-800' />
					<div 
						ref={lineRef}
						className='absolute left-[20px] top-0 bottom-0 w-px bg-white origin-top shadow-[0_0_15px_rgba(255,255,255,0.3)] z-1' 
					/>

					<div className='flex flex-col space-y-32'>
						{steps.map((step, index) => (
							<div
								key={step.id}
								ref={(el) => {
									stepsRef.current[index] = el
								}}
								className='relative flex items-start group'
							>
								{/* Step Indicator Node - Perfectly centered on line (20px) */}
								<div className='step-indicator absolute left-0 top-0 w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center z-10 transition-colors duration-500 group-hover:border-white shadow-2xl'>
									<div className='w-2 h-2 rounded-full bg-white' />
								</div>

								{/* Step Number */}
								<div className='step-num absolute left-14 top-0 pointer-events-none'>
									<span className='text-8xl md:text-[10rem] font-bold text-zinc-900/40 tracking-tighter transition-all duration-700 group-hover:text-zinc-800/60 group-hover:translate-x-4'>
										{step.id}
									</span>
								</div>

								{/* Content Card */}
								<div className='step-content w-full ml-12 md:ml-24 pt-4 md:pt-8'>
									<div className='max-w-xl p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40 hover:border-white/10 group-hover:-translate-y-2 relative overflow-hidden'>
										{/* Border Accent */}
										<div className={`absolute top-0 left-0 w-full h-[2px] ${step.lineColor} opacity-50 group-hover:opacity-100 transition-opacity`} />
										
										<div className='flex items-center gap-4 mb-6'>
											<div className='p-3 rounded-2xl bg-white/5 text-white group-hover:scale-110 transition-transform'>
												<step.icon className='w-6 h-6' />
											</div>
											<div>
												<h3 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>
													{step.title}
												</h3>
												<span className='text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500'>
													{step.subtitle}
												</span>
											</div>
										</div>

										<p className='text-zinc-400 text-lg leading-relaxed font-light'>
											{step.description}
										</p>

										<div className='mt-8 flex items-center gap-2 group/btn cursor-pointer'>
											<span className='text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover/btn:text-white transition-colors'>Learn the details</span>
											<ArrowRight className='w-4 h-4 text-zinc-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all' />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default WhatHappensNext
