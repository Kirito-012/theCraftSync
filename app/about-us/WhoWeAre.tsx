'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import aboutus from '../assets/aboutus.jpg'

export default function WhoWeAre() {
	const whoWeAreRef = useRef<HTMLDivElement>(null)
	const whoWeAreImageRef = useRef<HTMLDivElement>(null)
	const whoWeAreLineRef = useRef<HTMLDivElement>(null)
	const [brandsCount, setBrandsCount] = useState(0)
	const [yearsCount, setYearsCount] = useState(0)
	const [growthCount, setGrowthCount] = useState(0)
	const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

	// Mouse parallax effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 20
			const y = (e.clientY / window.innerHeight - 0.5) * 20
			setMousePosition({x, y})
		}

		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	useEffect(() => {
		const initGsap = async () => {
			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			const ctx = gsap.context(() => {
				// Who We Are Section animations
				if (whoWeAreRef.current) {
					// Smooth parallax effect for image
					if (whoWeAreImageRef.current) {
						gsap.to(whoWeAreImageRef.current, {
							yPercent: 20,
							ease: 'none',
							scrollTrigger: {
								trigger: whoWeAreRef.current,
								start: 'top bottom',
								end: 'bottom top',
								scrub: 1.2,
							},
						})
					}

					// Buttery smooth vertical line animation
					if (whoWeAreLineRef.current) {
						gsap.fromTo(
							whoWeAreLineRef.current,
							{
								scaleY: 0,
								opacity: 0,
							},
							{
								scaleY: 1,
								opacity: 1,
								duration: 2,
								ease: 'power3.inOut',
								scrollTrigger: {
									trigger: whoWeAreRef.current,
									start: 'top 75%',
									toggleActions: 'play none none none',
								},
							}
						)
					}

					// Small heading smooth fade in
					gsap.fromTo(
						'.who-we-are-small-heading',
						{
							y: 40,
							opacity: 0,
						},
						{
							y: 0,
							opacity: 1,
							duration: 1.4,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: whoWeAreRef.current,
								start: 'top 70%',
								toggleActions: 'play none none none',
							},
						}
					)

					// Main heading smooth animation
					gsap.fromTo(
						'.who-we-are-main-heading',
						{
							y: 50,
							opacity: 0,
						},
						{
							y: 0,
							opacity: 1,
							duration: 1.6,
							ease: 'power3.out',
							delay: 0.2,
							scrollTrigger: {
								trigger: whoWeAreRef.current,
								start: 'top 70%',
								toggleActions: 'play none none none',
							},
						}
					)

					// Paragraphs buttery smooth stagger
					gsap.fromTo(
						'.who-we-are-paragraph',
						{
							y: 40,
							opacity: 0,
						},
						{
							y: 0,
							opacity: 1,
							duration: 1.4,
							stagger: 0.25,
							ease: 'power3.out',
							delay: 0.5,
							scrollTrigger: {
								trigger: whoWeAreRef.current,
								start: 'top 70%',
								toggleActions: 'play none none none',
							},
						}
					)

					// Image container smooth reveal
					gsap.fromTo(
						'.who-we-are-image-container',
						{
							scale: 0.92,
							opacity: 0,
						},
						{
							scale: 1,
							opacity: 1,
							duration: 1.8,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: whoWeAreRef.current,
								start: 'top 70%',
								toggleActions: 'play none none none',
							},
						}
					)

					// Stats section smooth fade in with counting animation
					gsap.fromTo(
						'.who-we-are-stats',
						{
							y: 30,
							opacity: 0,
						},
						{
							y: 0,
							opacity: 1,
							duration: 1.4,
							ease: 'power3.out',
							delay: 0.8,
							scrollTrigger: {
								trigger: whoWeAreRef.current,
								start: 'top 70%',
								toggleActions: 'play none none none',
								onEnter: () => {
									// Animate counting for brands
									gsap.to(
										{value: 0},
										{
											value: 50,
											duration: 3,
											ease: 'power2.out',
											onUpdate: function () {
												setBrandsCount(Math.round(this.targets()[0].value))
											},
										}
									)
									// Animate counting for years
									gsap.to(
										{value: 0},
										{
											value: 3,
											duration: 3,
											ease: 'power2.out',
											onUpdate: function () {
												setYearsCount(Math.round(this.targets()[0].value))
											},
										}
									)
									// Animate counting for growth
									gsap.to(
										{value: 0},
										{
											value: 100,
											duration: 3,
											ease: 'power2.out',
											onUpdate: function () {
												setGrowthCount(Math.round(this.targets()[0].value))
											},
										}
									)
								},
							},
						}
					)
				}
			}, whoWeAreRef)
			return () => ctx.revert()
		}

		let cleanup: (() => void) | undefined
		initGsap().then((c) => (cleanup = c))

		return () => {
			if (cleanup) cleanup()
		}
	}, [])

	return (
		<section
			ref={whoWeAreRef}
			className='relative h-screen w-full bg-linear-to-br from-white via-gray-50/30 to-white flex items-center overflow-hidden'>
			{/* Subtle grid pattern overlay */}
			<div
				className='absolute inset-0 opacity-[0.015]'
				style={{
					backgroundImage:
						'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
					backgroundSize: '50px 50px',
				}}></div>

			{/* Large decorative text background */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none'>
				<span className='text-[20vw] font-heading font-black text-black/2 tracking-tighter leading-none whitespace-nowrap'>
					CRAFT
				</span>
			</div>

			{/* Floating decorative elements */}
			<div className='absolute top-20 right-1/4 w-2 h-2 bg-black/10 rounded-full animate-float'></div>
			<div className='absolute bottom-32 left-1/4 w-3 h-3 bg-black/5 rounded-full animate-float-delayed'></div>
			<div className='absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-black/10 rounded-full animate-float-slow'></div>
			<div className='absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-black/5 rounded-full animate-float'></div>

			<div className='w-full h-full flex items-center relative'>
				<div className='w-full max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 relative'>
					{/* Left Side - Images Gallery */}
					<div className='relative order-2 lg:order-1 h-full flex items-center justify-center px-16 lg:px-20'>
						<div className='relative w-full max-w-xl'>
							{/* Main large image */}
							<div className='relative group/main mb-6'>
								{/* Premium border frame */}
								<div className='absolute -inset-4 border border-black/8 transition-all duration-700 group-hover/main:border-black/15'></div>

								<div
									className='who-we-are-image-container relative w-full h-96 overflow-hidden will-change-transform'
									style={{
										transform: `translate3d(${mousePosition.x * 0.5}px, ${
											mousePosition.y * 0.5
										}px, 0)`,
										transition: 'transform 0.3s ease-out',
									}}>
									{/* Subtle spotlight effect */}
									<div
										className='absolute inset-0 z-20 pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-500'
										style={{
											background: `radial-gradient(circle 300px at ${
												50 + mousePosition.x * 0.5
											}% ${
												50 + mousePosition.y * 0.5
											}%, rgba(255,255,255,0.15) 0%, transparent 100%)`,
										}}></div>

									{/* Animated overlay on hover */}
									<div className='absolute inset-0 bg-black/0 group-hover/main:bg-black/5 transition-all duration-700 z-10'></div>
									<div
										ref={whoWeAreImageRef}
										className='absolute inset-0 w-full h-full will-change-transform'>
										<Image
											src={aboutus}
											alt='TheCraftSync team collaboration'
											className='w-full h-full object-cover transition-transform duration-700 group-hover/main:scale-105'
										/>
									</div>
								</div>

								{/* Corner accent marks */}
								<div className='absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-black transition-all duration-500 group-hover/main:w-8 group-hover/main:h-8 group-hover/main:-top-3 group-hover/main:-left-3'></div>
								<div className='absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-black transition-all duration-500 group-hover/main:w-8 group-hover/main:h-8 group-hover/main:-bottom-3 group-hover/main:-right-3'></div>
							</div>

							{/* Secondary images grid with gentle magnetic snap scrolling */}
							<div className='grid grid-cols-3 gap-4 snap-x snap-proximity overflow-x-auto scrollbar-hide scroll-smooth'>
								{/* Image 2 */}
								<div className='relative group/img overflow-hidden h-32 border border-black/10 hover:border-black/20 transition-all duration-500 snap-center'>
									<div className='absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-all duration-500 z-10'></div>
									<Image
										src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop'
										alt='Team brainstorming'
										width={400}
										height={300}
										className='w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110'
									/>
								</div>

								{/* Image 3 */}
								<div className='relative group/img overflow-hidden h-32 border border-black/10 hover:border-black/20 transition-all duration-500 snap-center'>
									<div className='absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-all duration-500 z-10'></div>
									<Image
										src='https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop'
										alt='Creative workspace'
										width={400}
										height={300}
										className='w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110'
									/>
								</div>

								{/* Image 4 */}
								<div className='relative group/img overflow-hidden h-32 border border-black/10 hover:border-black/20 transition-all duration-500 snap-center'>
									<div className='absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-all duration-500 z-10'></div>
									<Image
										src='https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop'
										alt='Team meeting'
										width={400}
										height={300}
										className='w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110'
									/>
								</div>
							</div>

							{/* Decorative accent line */}
							<div className='absolute -right-8 top-1/2 -translate-y-1/2 w-px h-48 bg-linear-to-b from-transparent via-black/20 to-transparent'></div>
						</div>
					</div>

					{/* Right Side - Content */}
					<div className='relative order-1 lg:order-2 flex items-center h-full px-16 lg:px-20 py-20'>
						<div className='flex gap-10 w-full max-w-xl'>
							{/* Animated Vertical Line with gradient effect */}
							<div className='relative shrink-0 w-0.5'>
								<div
									ref={whoWeAreLineRef}
									className='absolute top-0 left-0 w-full h-full bg-linear-to-b from-black via-black/80 to-black/40 will-change-transform origin-top'></div>
							</div>

							{/* Content */}
							<div className='flex flex-col gap-14 py-4'>
								{/* Small Heading */}
								<div className='who-we-are-small-heading will-change-transform flex items-center gap-4'>
									<div className='h-px w-12 bg-black'></div>
									<span className='text-black uppercase text-[9px] font-descriptive tracking-[0.4em] font-medium'>
										Who we are
									</span>
								</div>

								{/* Main Heading */}
								<h2 className='who-we-are-main-heading text-6xl lg:text-7xl font-heading font-bold text-black leading-[0.95] tracking-tight will-change-transform'>
									We are{' '}
									<span className='block mt-3 italic font-black relative group/title animate-shimmer'>
										TheCraftSync
										<span className='absolute -bottom-2 left-0 w-20 h-0.75 bg-black transition-all duration-500 group-hover/title:w-full'></span>
										{/* Decorative quotes */}
										<span className='absolute -left-8 -top-2 text-6xl text-black/10 font-serif'>
											"
										</span>
									</span>
								</h2>

								<div className='flex flex-col gap-7'>
									<p className='who-we-are-paragraph text-gray-700 font-descriptive leading-[1.9] text-[15px] will-change-transform font-light'>
										A digital marketing agency built on authentic connection and
										strategic storytelling. We help brands find their voice and
										deliver measurable results through data-driven creativity.
									</p>
									<p className='who-we-are-paragraph text-gray-600 font-descriptive leading-[1.9] text-[15px] will-change-transform font-light'>
										We listen, create, and sync your vision with your audience's
										needs. From social media to comprehensive digital
										strategies, we're partners in your growth.
									</p>
								</div>

								{/* Stats with premium border wrapper */}
								<div className='relative pt-10'>
									{/* Animated gradient border */}
									<div className='absolute inset-0 bg-linear-to-r from-black/10 via-black/5 to-black/10 animate-gradient-x opacity-40'></div>
									<div className='absolute inset-0 bg-white m-px'></div>

									{/* Animated border corners */}
									<div className='absolute top-8 left-0 w-8 h-8 border-t border-l border-black/10 transition-all duration-300'></div>
									<div className='absolute bottom-0 right-0 w-8 h-8 border-b border-r border-black/10 transition-all duration-300'></div>

									<div className='relative flex gap-10 who-we-are-stats px-6 py-8'>
										<div className='flex flex-col gap-2 group/stat cursor-default'>
											<span className='text-5xl font-heading font-bold text-black tracking-tighter leading-none transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-black/80 tabular-nums'>
												{brandsCount}+
											</span>
											<span className='text-[9px] uppercase tracking-[0.25em] text-gray-400 font-descriptive font-normal mt-1 transition-all duration-300 group-hover/stat:text-black'>
												Brands
											</span>
										</div>
										<div className='w-px bg-gray-200 self-stretch'></div>
										<div className='flex flex-col gap-2 group/stat cursor-default'>
											<span className='text-5xl font-heading font-bold text-black tracking-tighter leading-none transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-black/80 tabular-nums'>
												{yearsCount}+
											</span>
											<span className='text-[9px] uppercase tracking-[0.25em] text-gray-400 font-descriptive font-normal mt-1 transition-all duration-300 group-hover/stat:text-black'>
												Years
											</span>
										</div>
										<div className='w-px bg-gray-200 self-stretch'></div>
										<div className='flex flex-col gap-2 group/stat cursor-default'>
											<span className='text-5xl font-heading font-bold text-black tracking-tighter leading-none transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-black/80 tabular-nums'>
												{growthCount}%
											</span>
											<span className='text-[9px] uppercase tracking-[0.25em] text-gray-400 font-descriptive font-normal mt-1 transition-all duration-300 group-hover/stat:text-black'>
												Growth
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
