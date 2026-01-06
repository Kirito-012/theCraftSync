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
		const initGsap = async () => {
			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			const ctx = gsap.context(() => {
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
				const teamCards = gsap.utils.toArray('.team-card')
				teamCards.forEach((card: any, index: number) => {
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
			return () => ctx.revert()
		}

		let cleanup: (() => void) | undefined
		initGsap().then((c) => (cleanup = c))

		return () => {
			if (cleanup) cleanup()
		}
	}, [])

	// Debounced scroll check for better performance
	const checkScrollPosition = () => {
		if (carouselRef.current) {
			const {scrollLeft, scrollWidth, clientWidth} = carouselRef.current
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
			checkScrollPosition()

			// Use passive event listeners for better scroll performance
			const scrollHandler = () => {
				requestAnimationFrame(checkScrollPosition)
			}

			carousel.addEventListener('scroll', scrollHandler, {passive: true})
			window.addEventListener('resize', checkScrollPosition, {passive: true})

			return () => {
				carousel.removeEventListener('scroll', scrollHandler)
				window.removeEventListener('resize', checkScrollPosition)
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
						We're more than just experts—we're collaborators, problem-solvers,
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
							src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_800,c_limit/v1767512117/photo-1573496359142-b8d87734a5a2_rnybpd.avif'
							alt='Nicola'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
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
						<div className='w-12 h-0.5 bg-teal-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
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
							src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_800,c_limit/v1767512117/photo-1507003211169-0a1dd7228f2d_gqjylf.avif'
							alt='Julian'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
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
							src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_800,c_limit/v1767512117/photo-1500648767791-00dcc994a43e_xeq0v4.avif'
							alt='Jonny'
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
							Jonny
						</h3>
						<span className='text-gray-600 font-descriptive uppercase text-xs tracking-[0.2em]'>
							Managing Director
						</span>
						<div className='w-12 h-0.5 bg-orange-500 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
					</div>
				</div>

				{/* Team Member 4 - Maja */}
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
							src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_800,c_limit/v1767512116/photo-1438761681033-6461ffad8d80_r1njiv.avif'
							alt='Maja'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
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
							src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_800,c_limit/v1767512116/photo-1544005313-94ddf0286df2_owbzep.avif'
							alt='Em'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
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
				<div
					className='team-card min-w-70 md:min-w-85 group flex flex-col gap-5 mt-8 opacity-0'
					style={{contain: 'layout style paint'}}>
					<div
						className='relative w-full aspect-3/4 overflow-hidden rounded-br-[5rem] rounded-tl-[5rem] shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border-4 border-transparent group-hover:border-indigo-500/30'
						style={{
							backfaceVisibility: 'hidden',
							transform: 'translate3d(0, 0, 0)',
						}}>
						<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>
						<div className='absolute top-4 left-4 w-16 h-1 bg-indigo-500 transform -translate-x-20 group-hover:translate-x-0 transition-transform duration-500 z-20'></div>
						<Image
							src='https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_800,c_limit/v1767512116/photo-1534528741775-53994a69daeb_tp2ir7.avif'
							alt='Piper'
							width={400}
							height={533}
							loading='lazy'
							quality={85}
							className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 grayscale group-hover:grayscale-0'
						/>
						<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
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
	)
}
