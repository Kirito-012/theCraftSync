'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import Image from 'next/image'

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
		let ctx: gsap.Context | null = null
		let isMounted = true

		const initGsap = async () => {
			if (!isMounted) return

			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			if (!isMounted || !whoWeAreRef.current) return

			ctx = gsap.context(() => {
				// Who We Are Section animations
				if (whoWeAreRef.current) {
					// Smooth parallax effect for image
					if (whoWeAreImageRef.current) {
						gsap.fromTo(
							whoWeAreImageRef.current,
							{
								yPercent: -10,
							},
							{
								yPercent: 10,
								ease: 'none',
								scrollTrigger: {
									trigger: whoWeAreRef.current,
									start: 'top bottom',
									end: 'bottom top',
									scrub: 1.2,
								},
							}
						)
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
											duration: 2,
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
											duration: 2,
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
											duration: 2,
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
		}

		initGsap()

		return () => {
			isMounted = false
			if (ctx) ctx.revert()
		}
	}, [])

	return (
		<section
			ref={whoWeAreRef}
			className='relative min-h-screen w-full bg-linear-to-br from-white via-gray-50/30 to-white flex items-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-0'>
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
				<span className='text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[20vw] font-heading font-black text-black/2 tracking-tighter leading-none whitespace-nowrap'>
					CRAFT
				</span>
			</div>

			{/* Enhanced floating decorative elements with glow - hidden on mobile */}
			<div className='hidden sm:block absolute top-20 right-1/4 w-3 h-3 bg-linear-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-float shadow-lg shadow-purple-200/30'></div>
			<div className='hidden sm:block absolute bottom-32 left-1/4 w-4 h-4 bg-linear-to-br from-blue-400/20 to-teal-400/20 rounded-full animate-float-delayed shadow-lg shadow-blue-200/30'></div>
			<div className='hidden md:block absolute top-1/3 right-1/3 w-2 h-2 bg-linear-to-br from-orange-400/20 to-yellow-400/20 rounded-full animate-float-slow shadow-lg shadow-orange-200/30'></div>
			<div className='hidden md:block absolute bottom-1/4 left-1/3 w-3.5 h-3.5 bg-linear-to-br from-green-400/20 to-emerald-400/20 rounded-full animate-float shadow-lg shadow-green-200/30'></div>

			<div className='w-full h-full flex items-center relative'>
				<div className='w-full max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 relative'>
					{/* Left Side - Images Gallery */}
					<div className='relative order-2 lg:order-1 h-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
						<div className='relative w-full max-w-xl'>
							{/* Main large image with premium treatment */}
							<div className='relative group/main mb-4 sm:mb-5 md:mb-6'>
								{/* Premium border frame with shadow */}
								<div className='absolute -inset-4 border-2 border-black/10 rounded-sm transition-all duration-700 group-hover/main:border-black/20 group-hover/main:shadow-2xl group-hover/main:shadow-black/10'></div>

								<div
									className='who-we-are-image-container relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden will-change-transform'
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
											src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_1200,c_limit/v1767509856/aboutus_n75dvh.jpg'
											alt='TheCraftSync team collaboration'
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
											className='w-full h-full object-cover object-center transition-transform duration-700 group-hover/main:scale-105'
										/>
									</div>
								</div>

								{/* Enhanced corner accent marks */}
								<div className='absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-black/80 transition-all duration-500 group-hover/main:w-12 group-hover/main:h-12 group-hover/main:-top-4 group-hover/main:-left-4 group-hover/main:border-black'></div>
								<div className='absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-black/80 transition-all duration-500 group-hover/main:w-12 group-hover/main:h-12 group-hover/main:-bottom-4 group-hover/main:-right-4 group-hover/main:border-black'></div>
							</div>

							{/* Secondary images grid with gentle magnetic snap scrolling */}
							<div className='grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 snap-x snap-proximity overflow-x-auto scrollbar-hide scroll-smooth'>
								{/* Image 2 */}
								<div className='relative group/img overflow-hidden h-20 sm:h-24 md:h-28 lg:h-32 border border-black/10 hover:border-black/20 transition-all duration-500 snap-center'>
									<div className='absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-all duration-500 z-10'></div>
									<Image
										src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_400,c_limit/v1767510655/photo-1522071820081-009f0129c71c_xqyihe.avif'
										alt='Team brainstorming'
										width={400}
										height={300}
										className='w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110'
									/>
								</div>

								{/* Image 3 */}
								<div className='relative group/img overflow-hidden h-20 sm:h-24 md:h-28 lg:h-32 border border-black/10 hover:border-black/20 transition-all duration-500 snap-center'>
									<div className='absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-all duration-500 z-10'></div>
									<Image
										src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_400,c_limit/v1767510656/photo-1531482615713-2afd69097998_xifvbc.avif'
										alt='Creative workspace'
										width={400}
										height={300}
										className='w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110'
									/>
								</div>

								{/* Image 4 */}
								<div className='relative group/img overflow-hidden h-20 sm:h-24 md:h-28 lg:h-32 border border-black/10 hover:border-black/20 transition-all duration-500 snap-center'>
									<div className='absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-all duration-500 z-10'></div>
									<Image
										src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_400,c_limit/v1767510655/photo-1552664730-d307ca884978_itez96.avif'
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
					<div className='relative order-1 lg:order-2 flex items-center h-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20'>
						<div className='flex gap-6 sm:gap-8 md:gap-10 w-full max-w-xl'>
							{/* Animated Vertical Line with gradient effect */}
							<div className='relative shrink-0 w-0.5'>
								<div
									ref={whoWeAreLineRef}
									className='absolute top-0 left-0 w-full h-full bg-linear-to-b from-black via-black/80 to-black/40 will-change-transform origin-top'></div>
							</div>

							{/* Content */}
							<div className='flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 py-2 sm:py-3 md:py-4'>
								{/* Small Heading */}
								<div className='who-we-are-small-heading will-change-transform flex items-center gap-3 sm:gap-4'>
									<div className='h-px w-8 sm:w-10 md:w-12 bg-black'></div>
									<span className='text-black uppercase text-[8px] sm:text-[9px] font-descriptive tracking-[0.3em] sm:tracking-[0.4em] font-medium'>
										Who we are
									</span>
								</div>

								{/* Main Heading */}
								<h2 className='who-we-are-main-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-black leading-[0.95] tracking-tight will-change-transform'>
									We are{' '}
									<span className='block mt-2 sm:mt-3 italic font-black relative group/title animate-shimmer'>
										TheCraftSync
										<span className='absolute -bottom-1 sm:-bottom-2 left-0 w-12 sm:w-16 md:w-20 h-0.75 bg-black transition-all duration-500 group-hover/title:w-full'></span>
										{/* Decorative quotes */}
										<span className='hidden sm:block absolute -left-6 sm:-left-8 -top-1 sm:-top-2 text-4xl sm:text-5xl md:text-6xl text-black/10 font-serif'>
											&quot;
										</span>
									</span>
								</h2>

								<div className='flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7'>
									<p className='who-we-are-paragraph text-gray-700 font-descriptive leading-[1.7] sm:leading-[1.8] md:leading-[1.9] text-[13px] sm:text-[14px] md:text-[15px] will-change-transform font-light'>
										A digital marketing agency built on authentic connection and
										strategic storytelling. We help brands find their voice and
										deliver measurable results through data-driven creativity.
									</p>
									<p className='who-we-are-paragraph text-gray-600 font-descriptive leading-[1.7] sm:leading-[1.8] md:leading-[1.9] text-[13px] sm:text-[14px] md:text-[15px] will-change-transform font-light'>
										We listen, create, and sync your vision with your audience&apos;s
										needs. From social media to comprehensive digital
										strategies, we&apos;re partners in your growth.
									</p>
								</div>

								{/* Premium stats card */}
								<div className='relative pt-6 sm:pt-8 md:pt-10 group/card'>
									{/* Outer glow effect */}
									<div className='absolute -inset-1 bg-linear-to-br from-black/5 via-transparent to-black/5 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500'></div>

									{/* Main border with gradient */}
									<div className='absolute inset-0 rounded-2xl overflow-hidden'>
										<div className='absolute inset-0 border-[1.5px] border-black/15 rounded-2xl'></div>
										<div className='absolute inset-0 bg-linear-to-br from-white via-gray-50/30 to-white rounded-2xl'></div>
									</div>

									{/* Premium corner accents */}
									<div className='absolute -top-1 -left-1 w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16 border-t-2 sm:border-t-[2.5px] border-l-2 sm:border-l-[2.5px] border-black/20 rounded-tl-xl transition-all duration-500 group-hover/card:w-14 sm:group-hover/card:w-16 md:group-hover/card:w-18 lg:group-hover/card:w-20 group-hover/card:h-14 sm:group-hover/card:h-16 md:group-hover/card:h-18 lg:group-hover/card:h-20 group-hover/card:border-black/30'></div>
									<div className='absolute -bottom-1 -right-1 w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16 border-b-2 sm:border-b-[2.5px] border-r-2 sm:border-r-[2.5px] border-black/20 rounded-br-xl transition-all duration-500 group-hover/card:w-14 sm:group-hover/card:w-16 md:group-hover/card:w-18 lg:group-hover/card:w-20 group-hover/card:h-14 sm:group-hover/card:h-16 md:group-hover/card:h-18 lg:group-hover/card:h-20 group-hover/card:border-black/30'></div>

									{/* Subtle top accent line */}
									<div className='absolute top-0 left-12 sm:left-16 md:left-20 right-12 sm:right-16 md:right-20 h-px bg-linear-to-r from-transparent via-black/10 to-transparent'></div>

									<div className='relative flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 who-we-are-stats px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 justify-between'>
										{/* Stat 1 - Brands */}
										<div className='flex flex-col items-center gap-2 sm:gap-3 group/stat cursor-default flex-1'>
											<span className='text-4xl sm:text-5xl md:text-6xl font-heading font-bold w-[2ch] text-black tracking-tighter leading-none transition-all duration-300 group-hover/stat:scale-110 tabular-nums block text-center'>
												{brandsCount}+
											</span>
											<span className='text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gray-500 font-descriptive font-medium transition-all duration-300 group-hover/stat:text-black group-hover/stat:tracking-[0.3em] sm:group-hover/stat:tracking-[0.4em]'>
												Brands
											</span>
										</div>

										{/* Divider 1 */}
										<div className='h-px sm:h-auto sm:w-px bg-linear-to-r sm:bg-linear-to-b from-transparent via-gray-300 to-transparent w-full sm:self-stretch'></div>

										{/* Stat 2 - Years */}
										<div className='flex flex-col items-center gap-2 sm:gap-3 group/stat cursor-default flex-1'>
											<span className='text-4xl sm:text-5xl md:text-6xl font-heading font-bold w-[2ch] text-black tracking-tighter leading-none transition-all duration-300 group-hover/stat:scale-110 tabular-nums block text-center'>
												{yearsCount}+
											</span>
											<span className='text-[10px] uppercase tracking-[0.35em] text-gray-500 font-descriptive font-medium transition-all duration-300 group-hover/stat:text-black group-hover/stat:tracking-[0.4em]'>
												Years
											</span>
										</div>

										{/* Divider 2 */}
										<div className='h-px sm:h-auto sm:w-px bg-linear-to-r sm:bg-linear-to-b from-transparent via-gray-300 to-transparent w-full sm:self-stretch'></div>

										{/* Stat 3 - Growth */}
										<div className='flex flex-col items-center gap-2 sm:gap-3 group/stat cursor-default flex-1'>
											<span className='text-4xl sm:text-5xl md:text-6xl font-heading font-bold w-[3.25ch] text-black tracking-tighter leading-none transition-all duration-300 group-hover/stat:scale-110 tabular-nums block text-center'>
												{growthCount}%
											</span>
											<span className='text-[10px] uppercase tracking-[0.35em] text-gray-500 font-descriptive font-medium transition-all duration-300 group-hover/stat:text-black group-hover/stat:tracking-[0.4em]'>
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
