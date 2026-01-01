'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import arrowLeft from '../assets/arrow-left.png'
import arrowRight from '../assets/arrow-right.png'
import aboutus from '../assets/aboutus.jpg'

export default function AboutContent() {
	const heroRef = useRef<HTMLDivElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)
	const carouselRef = useRef<HTMLDivElement>(null)
	const teamSectionRef = useRef<HTMLDivElement>(null)
	const teamHeaderRef = useRef<HTMLDivElement>(null)
	const teamDescRef = useRef<HTMLDivElement>(null)
	const whoWeAreRef = useRef<HTMLDivElement>(null)
	const whoWeAreImageRef = useRef<HTMLDivElement>(null)
	const whoWeAreLineRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(true)
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
				gsap.to(bgRef.current, {
					yPercent: 20,
					ease: 'none',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top top',
						end: 'bottom top',
						scrub: 4,
					},
				})

				gsap.from('h1', {
					y: 50,
					opacity: 0,
					duration: 1,
					ease: 'power3.out',
					delay: 0.2,
				})
				gsap.from('p', {
					y: 30,
					opacity: 0,
					duration: 1,
					ease: 'power3.out',
					delay: 0.5,
				})

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

				// Smooth team section header animation
				if (teamHeaderRef.current) {
					gsap.from(teamHeaderRef.current, {
						y: 80,
						opacity: 0,
						duration: 1.2,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: teamSectionRef.current,
							start: 'top 75%',
							toggleActions: 'play none none none',
						},
					})
				}

				// Smooth team description animation
				if (teamDescRef.current) {
					gsap.from(teamDescRef.current, {
						y: 60,
						opacity: 0,
						duration: 1,
						ease: 'power3.out',
						delay: 0.2,
						scrollTrigger: {
							trigger: teamSectionRef.current,
							start: 'top 75%',
							toggleActions: 'play none none none',
						},
					})
				}

				// Enhanced smooth team cards animation with better stagger
				const teamCards = gsap.utils.toArray('.team-card')
				teamCards.forEach((card: any, index: number) => {
					gsap.from(card, {
						y: 120,
						opacity: 0,
						scale: 0.9,
						rotation: 2,
						duration: 1.4,
						ease: 'power4.out',
						delay: 0.3 + index * 0.12,
						scrollTrigger: {
							trigger: teamSectionRef.current,
							start: 'top 70%',
							toggleActions: 'play none none none',
						},
					})
				})
			}, heroRef)
			return () => ctx.revert()
		}

		let cleanup: (() => void) | undefined
		initGsap().then((c) => (cleanup = c))

		return () => {
			if (cleanup) cleanup()
		}
	}, [])

	const checkScrollPosition = () => {
		if (carouselRef.current) {
			const {scrollLeft, scrollWidth, clientWidth} = carouselRef.current
			setCanScrollLeft(scrollLeft > 0)
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
		}
	}

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const scrollAmount = 400
			const newScrollLeft =
				direction === 'left'
					? carouselRef.current.scrollLeft - scrollAmount
					: carouselRef.current.scrollLeft + scrollAmount

			carouselRef.current.scrollTo({
				left: newScrollLeft,
				behavior: 'smooth',
			})
		}
	}

	useEffect(() => {
		const carousel = carouselRef.current
		if (carousel) {
			checkScrollPosition()
			carousel.addEventListener('scroll', checkScrollPosition)
			window.addEventListener('resize', checkScrollPosition)

			return () => {
				carousel.removeEventListener('scroll', checkScrollPosition)
				window.removeEventListener('resize', checkScrollPosition)
			}
		}
	}, [])

	return (
		<div
			ref={heroRef}
			className='relative w-full min-h-screen bg-navy-dark text-white overflow-x-hidden selection:bg-teal-accent selection:text-white'>
			{/* Hero Section */}
			<section className='relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-32'>
				{/* Background Image with Overlay */}
				<div className='absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden'>
					<div
						ref={bgRef}
						className='absolute top-[-10%] left-0 w-full h-[120%] bg-cover bg-center bg-no-repeat will-change-transform'
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1660496247667-3fb697c396af?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
							backgroundPosition: 'center center',
						}}
					/>
					<div className='absolute inset-0 bg-black/40 mix-blend-multiply'></div>
					<div className='absolute inset-0 bg-linear-to-t from-navy-dark/60 via-transparent to-transparent'></div>
				</div>

				{/* Content */}
				<div className='relative z-10 w-full max-w-7xl mx-auto text-left'>
					<h1 className='text-5xl md:text-6xl lg:text-[76px] mb-8 font-heading'>
						<span className='font-normal'>Crafting</span>{' '}
						<span className='font-bold'>Dreams</span>
						<br />
						<span className='font-normal'>and</span>{' '}
						<span className='font-bold'>Syncing</span>{' '}
						<span className='font-normal'>Reality</span>
					</h1>
					<p className=' leading-[1.6] opacity-100 max-w-200 font-descriptive'>
						The Craft Sync is a digital marketing agency designed to provide
						integrated marketing partnerships for great brands.
					</p>
				</div>
			</section>

			{/* WHO WE ARE Section */}
			<section
				ref={whoWeAreRef}
				className='relative min-h-screen w-full bg-linear-to-br from-white via-gray-50/30 to-white flex items-center overflow-hidden'>
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
					<span className='text-[20vw] font-heading font-black text-black/[0.02] tracking-tighter leading-none whitespace-nowrap'>
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
						{/* Left Side - Image */}
						<div className='relative order-2 lg:order-1 h-screen flex items-center justify-center px-16 lg:px-20'>
							<div className='relative group'>
								{/* Premium border frame with hover effect */}
								<div className='absolute -inset-6 border border-black/8 transition-all duration-700 group-hover:border-black/15'></div>
								<div className='absolute -inset-3 border border-black/5 transition-all duration-700 group-hover:border-black/10'></div>

								<div
									className='who-we-are-image-container relative w-100 h-100 overflow-hidden will-change-transform'
									style={{
										transform: `translate3d(${mousePosition.x * 0.5}px, ${
											mousePosition.y * 0.5
										}px, 0)`,
										transition: 'transform 0.3s ease-out',
									}}>
									{/* Subtle spotlight effect */}
									<div
										className='absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500'
										style={{
											background: `radial-gradient(circle 300px at ${
												50 + mousePosition.x * 0.5
											}% ${
												50 + mousePosition.y * 0.5
											}%, rgba(255,255,255,0.15) 0%, transparent 100%)`,
										}}></div>

									{/* Animated overlay on hover */}
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700 z-10'></div>
									<div
										ref={whoWeAreImageRef}
										className='absolute inset-0 w-full h-full will-change-transform'>
										<Image
											// src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop'
											src={aboutus}
											alt='TheCraftSync team collaboration'
											className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
										/>
									</div>
								</div>

								{/* Corner accent marks with animation */}
								<div className='absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-black transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:-top-5 group-hover:-left-5'></div>
								<div className='absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-black transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:-bottom-5 group-hover:-right-5'></div>
							</div>
						</div>

						{/* Right Side - Content */}
						<div className='relative order-1 lg:order-2 flex items-center h-screen px-16 lg:px-20 py-20'>
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
											A digital marketing agency built on authentic connection
											and strategic storytelling. We help brands find their
											voice and deliver measurable results through data-driven
											creativity.
										</p>
										<p className='who-we-are-paragraph text-gray-600 font-descriptive leading-[1.9] text-[15px] will-change-transform font-light'>
											We listen, create, and sync your vision with your
											audience's needs. From social media to comprehensive
											digital strategies, we're partners in your growth.
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

			{/* HOW WE WORK Section */}

			{/* OUR TEAM Section */}
			<section
				ref={teamSectionRef}
				className='team-section relative w-full bg-linear-to-br from-gray-50 via-white to-gray-100 py-24 overflow-hidden'>
				{/* Decorative Elements */}
				<div className='absolute top-20 right-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl'></div>
				<div className='absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl'></div>

				<div className='w-full max-w-350 mx-auto px-6 md:px-12 lg:px-24 mb-16 flex flex-col md:flex-row justify-between items-start gap-10'>
					<div
						ref={teamHeaderRef}
						className='relative'>
						<h2 className='text-black text-[12vw] md:text-[8vw] lg:text-[130px] leading-[0.85] font-bold font-heading uppercase tracking-tighter'>
							Our
							<br />
							<span className='relative inline-block'>
								Team
								<span className='absolute -bottom-2 left-0 w-1/2 h-3 bg-teal-500/20'></span>
							</span>
						</h2>
					</div>
					<div
						ref={teamDescRef}
						className='md:max-w-md space-y-4'>
						<p className='text-gray-800 font-descriptive leading-relaxed text-lg'>
							We're more than just experts—we're collaborators, problem-solvers,
							and creators. Meet the people who make big things happen behind
							the scenes.
						</p>
						<div className='flex gap-2'>
							<div className='w-12 h-1 bg-teal-500'></div>
							<div className='w-8 h-1 bg-purple-500'></div>
							<div className='w-6 h-1 bg-orange-500'></div>
						</div>
					</div>
				</div>

				{/* Navigation Arrows */}
				<div className='relative w-full max-w-350 mx-auto px-6 md:px-12 lg:px-24'>
					<button
						onClick={() => scrollCarousel('left')}
						disabled={!canScrollLeft}
						className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-100 ${
							canScrollLeft
								? 'opacity-100 hover:scale-110 hover:border-teal-500'
								: 'opacity-30 cursor-not-allowed'
						}`}
						aria-label='Scroll left'>
						<Image
							src={arrowLeft}
							alt='Previous'
							className={`w-6 h-6 transition-all duration-300 ${
								canScrollLeft
									? 'group-hover:scale-125 group-hover:-translate-x-0.5'
									: ''
							}`}
						/>
					</button>

					<button
						onClick={() => scrollCarousel('right')}
						disabled={!canScrollRight}
						className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-100 ${
							canScrollRight
								? 'opacity-100 hover:scale-110 hover:border-teal-500'
								: 'opacity-30 cursor-not-allowed'
						}`}
						aria-label='Scroll right'>
						<Image
							src={arrowRight}
							alt='Next'
							className={`w-6 h-6 transition-all duration-300 ${
								canScrollRight
									? 'group-hover:scale-125 group-hover:translate-x-0.5'
									: ''
							}`}
						/>
					</button>
				</div>

				{/* Team Carousel */}
				<div
					ref={carouselRef}
					className='flex gap-8 overflow-x-auto pl-6 md:pl-12 lg:pl-24 pr-12 pb-12 scrollbar-none custom-scrollbar cursor-grab active:cursor-grabbing'
					style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
					{/* Team Member 1 - Nicola */}
					<div className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 will-change-transform'>
						<div className='relative w-full aspect-3/4 overflow-hidden rounded-tl-[5rem] rounded-br-[5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-4 border-transparent group-hover:border-teal-500/30 backface-hidden'>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
							<div className='absolute top-4 right-4 w-16 h-1 bg-teal-500 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
							<img
								src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2776&auto=format&fit=crop'
								alt='Nicola'
								className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
							/>
							<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
								<p className='text-white text-sm leading-relaxed'>
									Digital Designer specializing in modern web experiences
								</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 px-2'>
							<h3 className='text-black text-3xl font-bold font-heading group-hover:text-teal-600 transition-colors duration-300'>
								Nicola
							</h3>
							<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
								Digital Designer
							</span>
							<div className='w-12 h-0.5 bg-teal-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
						</div>
					</div>

					{/* Team Member 2 - Julian */}
					<div className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-12 will-change-transform'>
						<div className='relative w-full aspect-3/4 overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-4 border-transparent group-hover:border-purple-500/30'>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
							<div className='absolute top-4 left-4 w-16 h-1 bg-purple-500 transform -translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
							<img
								src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop'
								alt='Julian'
								className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
							/>
							<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
								<p className='text-white text-sm leading-relaxed'>
									Creative designer with a passion for visual storytelling
								</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 px-2'>
							<h3 className='text-black text-3xl font-bold font-heading group-hover:text-purple-600 transition-colors duration-300'>
								Julian
							</h3>
							<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
								Designer
							</span>
							<div className='w-12 h-0.5 bg-purple-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
						</div>
					</div>

					{/* Team Member 3 - Jonny */}
					<div className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 will-change-transform'>
						<div className='relative w-full aspect-3/4 overflow-hidden rounded-t-[5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-4 border-transparent group-hover:border-orange-500/30'>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
							<div className='absolute bottom-4 right-4 w-1 h-16 bg-orange-500 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-20'></div>
							<img
								src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop'
								alt='Jonny'
								className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
							/>
							<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
								<p className='text-white text-sm leading-relaxed'>
									Leading the vision and strategy for innovative solutions
								</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 px-2'>
							<h3 className='text-black text-3xl font-bold font-heading group-hover:text-orange-600 transition-colors duration-300'>
								Jonny
							</h3>
							<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
								Managing Director
							</span>
							<div className='w-12 h-0.5 bg-orange-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
						</div>
					</div>

					{/* Team Member 4 - Maja */}
					<div className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-16 will-change-transform'>
						<div className='relative w-full aspect-3/4 overflow-hidden rounded-b-[5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-4 border-transparent group-hover:border-blue-500/30'>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
							<div className='absolute bottom-4 left-4 w-1 h-16 bg-blue-500 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-20'></div>
							<img
								src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop'
								alt='Maja'
								className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
							/>
							<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
								<p className='text-white text-sm leading-relaxed'>
									Orchestrating seamless project delivery and team coordination
								</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 px-2'>
							<h3 className='text-black text-3xl font-bold font-heading group-hover:text-blue-600 transition-colors duration-300'>
								Maja
							</h3>
							<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
								Head of Projects
							</span>
							<div className='w-12 h-0.5 bg-blue-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
						</div>
					</div>

					{/* Team Member 5 - Em */}
					<div className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 will-change-transform'>
						<div className='relative w-full aspect-3/4 overflow-hidden rounded-bl-[5rem] rounded-tr-[5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-4 border-transparent group-hover:border-pink-500/30'>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
							<div className='absolute top-4 right-4 w-16 h-1 bg-pink-500 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
							<img
								src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop'
								alt='Em'
								className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
							/>
							<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
								<p className='text-white text-sm leading-relaxed'>
									Ensuring excellence in every project milestone
								</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 px-2'>
							<h3 className='text-black text-3xl font-bold font-heading group-hover:text-pink-600 transition-colors duration-300'>
								Em
							</h3>
							<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
								Project Manager
							</span>
							<div className='w-12 h-0.5 bg-pink-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
						</div>
					</div>

					{/* Team Member 6 - Piper */}
					<div className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-8 will-change-transform'>
						<div className='relative w-full aspect-3/4 overflow-hidden rounded-br-[5rem] rounded-tl-[5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-4 border-transparent group-hover:border-indigo-500/30'>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
							<div className='absolute top-4 left-4 w-16 h-1 bg-indigo-500 transform -translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
							<img
								src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop'
								alt='Piper'
								className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0'
							/>
							<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
								<p className='text-white text-sm leading-relaxed'>
									Driving creative vision and brand innovation
								</p>
							</div>
						</div>
						<div className='flex flex-col gap-1 px-2'>
							<h3 className='text-black text-3xl font-bold font-heading group-hover:text-indigo-600 transition-colors duration-300'>
								Piper
							</h3>
							<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
								Creative Director
							</span>
							<div className='w-12 h-0.5 bg-indigo-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

