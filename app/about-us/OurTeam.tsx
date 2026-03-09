'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import arrowLeft from '../assets/arrow-left.png'
import arrowRight from '../assets/arrow-right.png'

export default function OurTeam() {
	const carouselRef = useRef<HTMLDivElement>(null)
	const teamSectionRef = useRef<HTMLDivElement>(null)
	const teamSubheadingRef = useRef<HTMLDivElement>(null)
	const teamHeaderRef = useRef<HTMLDivElement>(null)
	const teamDescRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(true)

	useEffect(() => {
		let ctx: gsap.Context | null = null
		let isMounted = true

		const initGsap = async () => {
			if (!isMounted) return

			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			if (!isMounted || !teamSectionRef.current) return

			ctx = gsap.context(() => {
				// Smooth team subheading animation
				if (teamSubheadingRef.current) {
					gsap.fromTo(
						teamSubheadingRef.current,
						{y: 40, opacity: 0},
						{
							y: 0,
							opacity: 1,
							duration: 1.4,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: teamSectionRef.current,
								start: 'top 75%',
								toggleActions: 'play none none none',
							},
						}
					)
				}

				// Smooth team section header animation
				if (teamHeaderRef.current) {
					gsap.fromTo(
						teamHeaderRef.current,
						{y: 80, opacity: 0},
						{
							y: 0,
							opacity: 1,
							duration: 1.2,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: teamSectionRef.current,
								start: 'top 75%',
								toggleActions: 'play none none none',
							},
						}
					)
				}

				// Smooth team description animation
				if (teamDescRef.current) {
					gsap.fromTo(
						teamDescRef.current,
						{y: 60, opacity: 0},
						{
							y: 0,
							opacity: 1,
							duration: 1,
							ease: 'power3.out',
							delay: 0.2,
							scrollTrigger: {
								trigger: teamSectionRef.current,
								start: 'top 75%',
								toggleActions: 'play none none none',
							},
						}
					)
				}

				// Optimized team cards animation
				const teamCards = gsap.utils.toArray('.team-card') as Element[]
				teamCards.forEach((card, index) => {
					gsap.fromTo(
						card,
						{y: 80, opacity: 0, scale: 0.95},
						{
							y: 0,
							opacity: 1,
							scale: 1,
							duration: 1,
							ease: 'power3.out',
							delay: 0.2 + index * 0.08,
							scrollTrigger: {
								trigger: teamSectionRef.current,
								start: 'top 75%',
								toggleActions: 'play none none none',
							},
						}
					)
				})
			}, teamSectionRef)
		}

		initGsap()

		return () => {
			isMounted = false
			if (ctx) ctx.revert()
		}
	}, [])

	// Cached dimensions to avoid forced reflows
	const dimensionsRef = useRef({ scrollWidth: 0, clientWidth: 0 })

	const checkScrollPosition = () => {
		if (carouselRef.current) {
			const { scrollLeft } = carouselRef.current
			const { scrollWidth, clientWidth } = dimensionsRef.current
			setCanScrollLeft(scrollLeft > 0)
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
		}
	}

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			// Get the first two team cards to calculate width and gap
			const cards = carouselRef.current.querySelectorAll('.team-card')
			if (cards.length < 2) return

			const firstCard = cards[0] as HTMLElement
			const secondCard = cards[1] as HTMLElement

			// Calculate the actual card width using offsetWidth
			const cardWidth = firstCard.offsetWidth

			// Calculate gap from actual positions
			const firstCardRect = firstCard.getBoundingClientRect()
			const secondCardRect = secondCard.getBoundingClientRect()
			const gap = secondCardRect.left - firstCardRect.right

			const scrollAmount = cardWidth + gap

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
			// Initialize and update dimensions using ResizeObserver
			// This avoids layout thrashing by reading geometric properties only when they change
			const resizeObserver = new ResizeObserver(entries => {
				for (const entry of entries) {
					dimensionsRef.current = {
						scrollWidth: carousel.scrollWidth,
						clientWidth: carousel.clientWidth
					}
					checkScrollPosition()
				}
			})

			resizeObserver.observe(carousel)
			checkScrollPosition()

			// Use passive event listeners for better scroll performance
			const scrollHandler = () => {
				requestAnimationFrame(checkScrollPosition)
			}

			carousel.addEventListener('scroll', scrollHandler, {passive: true})

			return () => {
				resizeObserver.disconnect()
				carousel.removeEventListener('scroll', scrollHandler)
			}
		}
	}, [])

	return (
		<section
			ref={teamSectionRef}
			className='team-section relative w-full bg-linear-to-br from-gray-50 via-white to-gray-100 py-24 overflow-hidden'>
			{/* Decorative Elements */}
			<div className='absolute top-20 right-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl'></div>
			<div className='absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl'></div>

			<div className='w-full max-w-350 mx-auto px-6 md:px-12 lg:px-24 mb-16 flex flex-col md:flex-row justify-between items-start gap-10'>
				<div
					ref={teamHeaderRef}
					className='relative space-y-6 opacity-0'>
					{/* Small subheading to match other sections */}
					<div
						ref={teamSubheadingRef}
						className='flex items-center gap-4'>
						<div className='h-px w-12 bg-black'></div>
						<span className='text-black uppercase text-[9px] font-descriptive tracking-[0.4em] font-medium'>
							Meet The Crew
						</span>
					</div>

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
					className='md:max-w-md space-y-4 opacity-0'>
					<p className='text-gray-800 font-descriptive leading-relaxed text-lg'>
						We&apos;re more than just experts—we&apos;re collaborators, problem-solvers,
						and creators. Meet the people who make big things happen behind the
						scenes.
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
					className={`absolute left-0 top-1/2 cursor-pointer -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-100 ${
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
					className={`absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-100 ${
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

			{/* Team Carousel - Optimized for smooth scrolling */}
			<div
				ref={carouselRef}
				className='flex gap-8 overflow-x-auto pl-6 md:pl-12 lg:pl-24 pr-12 pb-12 scrollbar-none custom-scrollbar cursor-grab active:cursor-grabbing'
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
					contain: 'layout style paint',
					transform: 'translate3d(0, 0, 0)',
					WebkitOverflowScrolling: 'touch',
				}}>
				{/* Team Member 1 - Nicola */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-tl-[5rem] rounded-br-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-300 border-4 border-transparent group-hover:border-teal-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'></div>
						<div className='absolute top-4 right-4 w-16 h-1 bg-teal-500 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-300 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1772992384/manik_ueooni.jpg'
							alt='Manik'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								Architect of vision and strategy, Manik leads theCraftSync with an unwavering commitment to bridging the gap between imaginative design and technical excellence.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-teal-600 transition-colors duration-300'>
							Manik
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							CEO
						</span>
						<div className='w-12 h-0.5 bg-teal-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
					</div>
				</div>



				{/* Team Member 3 - Jonny */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-t-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-orange-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute bottom-4 right-4 w-1 h-16 bg-orange-500 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1772991413/lakshay_m6dnnh.png'
							alt='Lakshay'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								Leading the vision and strategy for innovative solutions
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-orange-600 transition-colors duration-300'>
							Lakshay
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							Managing Director
						</span>
						<div className='w-12 h-0.5 bg-orange-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>
				{/* Team Member 2 - Julian */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-12 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-purple-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute top-4 left-4 w-16 h-1 bg-purple-500 transform -translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1773078771/kartikeya_rvhugz.jpg'
							alt='Kartikeya'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								A precision-driven engineer and problem-solver, Arpit excels in architecting robust digital systems that translate complex business needs into seamless, high-performance software solutions.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-purple-600 transition-colors duration-300'>
							Kartikeya
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							 Solution Architect
						</span>
						<div className='w-12 h-0.5 bg-purple-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>

								{/* Team Member 8 - Rachit Sharma */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-br-[5rem] rounded-tl-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-emerald-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute bottom-4 right-4 w-16 h-1 bg-emerald-500 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1773078771/rachit_hwuw3m.jpg'
							alt='Rachit'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								Orchestrating complex technology stacks, Rachit steers coding standards and architectural decisions to deliver highly resilient and scalable engineering ecosystems.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-emerald-600 transition-colors duration-300'>
							Rachit
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							Tech Lead
						</span>
						<div className='w-12 h-0.5 bg-emerald-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>
								{/* Team Member 7 - Avish */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-16 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-bl-[5rem] rounded-tr-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-red-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute top-4 right-4 w-1 h-16 bg-red-500 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1773078771/avish_nwrwl5.jpg'
							alt='Avish'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								Our digital guardian, Avish implements cutting-edge security architectures protecting system integrity from evolving cyber threats while ensuring robust compliance.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-red-600 transition-colors duration-300'>
							Avish
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							Cyber Security
						</span>
						<div className='w-12 h-0.5 bg-red-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>
				{/* Team Member 4 - Aryan */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-16 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-b-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-blue-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute bottom-4 left-4 w-1 h-16 bg-blue-500 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1772993245/aryan_uzsoco.png'
							alt='Aryan'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								A versatile software engineer, Aryan builds scalable infrastructures and elegant solutions, mastering both frontend and backend technologies to translate ideas into high-performance applications.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-blue-600 transition-colors duration-300'>
							Aryan
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							Software Engineer
						</span>
						<div className='w-12 h-0.5 bg-blue-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>

				{/* Team Member 5 - Em */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-bl-[5rem] rounded-tr-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-pink-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute top-4 right-4 w-16 h-1 bg-pink-500 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1772991409/akshat_fswdhq.jpg'
							alt='Akshat'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								Driven by technical curiosity, Akshat architects robust software systems with a relentless focus on clean code, testability, and building future-proof features that scale.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-pink-600 transition-colors duration-300'>
							Akshat
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							Software Engineer
						</span>
						<div className='w-12 h-0.5 bg-pink-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>

				{/* Team Member 6 - Himanshu Rawat */}
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-12 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-t-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-yellow-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute bottom-4 left-4 w-16 h-1 bg-yellow-500 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/dhlvq35cc/image/upload/f_auto,q_auto,w_800,c_limit/v1773078771/himanshu_m2nyf9.jpg'
							alt='Himanshu'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<p className='text-white text-sm leading-relaxed'>
								With a keen eye for aesthetics and seamless interactions, Himanshu designs intuitive user experiences that captivate audiences and elevate digital products.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-1 px-2'>
						<h3 className='text-black text-3xl font-bold font-heading group-hover:text-yellow-600 transition-colors duration-300'>
							Himanshu
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							UI/UX
						</span>
						<div className='w-12 h-0.5 bg-yellow-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>





			</div>
		</section>
	)
}
