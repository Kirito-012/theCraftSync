'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutUsCTA() {
	const ctaRef = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)
	const subheadingRef = useRef<HTMLParagraphElement>(null)
	const buttonRef = useRef<HTMLDivElement>(null)
	const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
	const [isHovering, setIsHovering] = useState(false)
	const [currentWordIndex, setCurrentWordIndex] = useState(0)

	const rotatingWords = ['Elevate', 'Transform', 'Boost', 'Amplify']

	// Rotate words every 3 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	// Mouse tracking for magnetic effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (ctaRef.current) {
				const rect = ctaRef.current.getBoundingClientRect()
				const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
				const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
				setMousePosition({x, y})
			}
		}

		const section = ctaRef.current
		if (section) {
			section.addEventListener('mousemove', handleMouseMove)
			return () => section.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	// Scroll animations
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Heading animation
			gsap.fromTo(
				headingRef.current,
				{
					y: 80,
					opacity: 0,
					scale: 0.95,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1.6,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Subheading animation
			gsap.fromTo(
				subheadingRef.current,
				{
					y: 60,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 1.4,
					delay: 0.3,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Button animation
			gsap.fromTo(
				buttonRef.current,
				{
					y: 40,
					opacity: 0,
					scale: 0.9,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1.2,
					delay: 0.6,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Decorative lines animation
			gsap.fromTo(
				'.cta-line',
				{
					scaleX: 0,
					opacity: 0,
				},
				{
					scaleX: 1,
					opacity: 1,
					duration: 1.8,
					delay: 0.4,
					ease: 'power3.inOut',
					stagger: 0.2,
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)
		}, ctaRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={ctaRef}
			className='relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-32 px-6'>
			{/* Animated grid background */}
			<div
				className='absolute inset-0 opacity-[0.03]'
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
				}}></div>

			{/* Radial gradient spotlight */}
			<div
				className='absolute inset-0 opacity-40'
				style={{
					background: `radial-gradient(circle at ${
						50 + mousePosition.x * 10
					}% ${
						50 + mousePosition.y * 10
					}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
					transition: 'background 0.3s ease-out',
				}}></div>

			{/* Ambient glow orbs */}
			<div className='absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow'></div>
			<div
				className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow'
				style={{animationDelay: '2s'}}></div>

			{/* Floating decorative elements */}
			<div className='absolute top-20 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-float'></div>
			<div className='absolute bottom-32 left-1/3 w-3 h-3 bg-white/15 rounded-full animate-float-delayed'></div>
			<div className='absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float-slow'></div>

			{/* Main content */}
			<div className='relative z-10 max-w-5xl mx-auto text-center'>
				{/* Top decorative line */}
				<div className='flex items-center justify-center gap-4 mb-12'>
					<div className='cta-line h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center'></div>
					<span className='text-white/60 uppercase text-[9px] font-descriptive tracking-[0.5em] font-medium'>
						Let's Work Together
					</span>
					<div className='cta-line h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center'></div>
				</div>

				{/* Main heading */}
				<h2
					ref={headingRef}
					className='text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.1] tracking-tight mb-8 will-change-transform'>
					Ready to{' '}
					<span
						className='relative inline-block min-w-[280px] md:min-w-[350px] lg:min-w-[500px] h-[1.2em] align-bottom'
						style={{perspective: '1000px'}}>
						{rotatingWords.map((word, index) => {
							const isActive = index === currentWordIndex
							const isPrevious =
								index ===
								(currentWordIndex - 1 + rotatingWords.length) %
									rotatingWords.length

							return (
								<span
									key={word}
									className='absolute left-0 w-full transition-all duration-1000 ease-out'
									style={{
										transform: isActive
											? 'translateY(0%) rotateX(0deg) scale(1)'
											: isPrevious
											? 'translateY(-100%) rotateX(-90deg) scale(0.8)'
											: 'translateY(100%) rotateX(90deg) scale(0.8)',
										opacity: isActive ? 1 : 0,
										transformStyle: 'preserve-3d',
										filter: isActive ? 'blur(0px)' : 'blur(4px)',
									}}>
									{word.split('').map((char, charIndex) => (
										<span
											key={charIndex}
											className='inline-block transition-all duration-700'
											style={{
												transitionDelay: isActive
													? `${charIndex * 50}ms`
													: '0ms',
												transform: isActive
													? 'translateY(0px)'
													: 'translateY(20px)',
												opacity: isActive ? 1 : 0,
											}}>
											{char}
										</span>
									))}
								</span>
							)
						})}
					</span>
					<br />
					Your Brand?
				</h2>

				{/* Subheading */}
				<p
					ref={subheadingRef}
					className='text-white/70 font-descriptive text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16 will-change-transform'>
					Let's craft something extraordinary together. From strategy to
					execution, we're here to transform your vision into reality.
				</p>

				{/* CTA Button with magnetic effect */}
				<div
					ref={buttonRef}
					className='flex justify-center will-change-transform'>
					<a
						href='#contact'
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						className='group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-heading font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20'
						style={{
							transform: isHovering
								? `translate(${mousePosition.x * 5}px, ${
										mousePosition.y * 5
								  }px)`
								: 'translate(0, 0)',
							transition: 'transform 0.2s ease-out',
						}}>
						{/* Animated background gradient */}
						<div className='absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white bg-[length:200%_100%] animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

						{/* Button content */}
						<span className='relative z-10 transition-transform duration-300 group-hover:translate-x-[-4px]'>
							Start Your Project
						</span>

						{/* Arrow icon */}
						<svg
							className='relative z-10 w-6 h-6 transition-all duration-300 group-hover:translate-x-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2.5}
								d='M17 8l4 4m0 0l-4 4m4-4H3'
							/>
						</svg>

						{/* Shine effect */}
						<div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12'></div>
					</a>
				</div>

				{/* Bottom decorative elements */}
				<div className='mt-20 flex items-center justify-center gap-8'>
					<div className='flex items-center gap-3'>
						<div className='w-12 h-px bg-gradient-to-r from-transparent to-white/30'></div>
						<div className='w-2 h-2 bg-white/40 rounded-full animate-pulse'></div>
					</div>
					<span className='text-white/40 text-xs font-descriptive tracking-wider uppercase'>
						Trusted by 50+ Brands
					</span>
					<div className='flex items-center gap-3'>
						<div className='w-2 h-2 bg-white/40 rounded-full animate-pulse'></div>
						<div className='w-12 h-px bg-gradient-to-l from-transparent to-white/30'></div>
					</div>
				</div>
			</div>

			{/* Corner decorative elements */}
			<div className='absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10'></div>
			<div className='absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10'></div>
		</section>
	)
}
