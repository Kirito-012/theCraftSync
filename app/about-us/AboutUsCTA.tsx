'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutUsCTA() {
	const ctaRef = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)
	const buttonRef = useRef<HTMLDivElement>(null)
	const [isHovering, setIsHovering] = useState(false)
	const [buttonMousePos, setButtonMousePos] = useState({x: 0, y: 0})
	const [currentWordIndex, setCurrentWordIndex] = useState(0)

	const rotatingWords = ['Elevate', 'Transform', 'Boost', 'Amplify']

	// Rotate words every 3 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	// Mouse tracking only for button hover effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isHovering || !buttonRef.current) return

			const rect = buttonRef.current.getBoundingClientRect()
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
			setButtonMousePos({x, y})
		}

		if (isHovering) {
			window.addEventListener('mousemove', handleMouseMove, {passive: true})
			return () => window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [isHovering])

	// Optimized scroll animations
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Heading animation - optimized for smoothness
			gsap.fromTo(
				headingRef.current,
				{
					y: 60,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Button animation - snappier
			gsap.fromTo(
				buttonRef.current,
				{
					y: 40,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 1,
					delay: 0.3,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Decorative lines animation - faster
			gsap.fromTo(
				'.cta-line',
				{
					scaleX: 0,
					opacity: 0,
				},
				{
					scaleX: 1,
					opacity: 1,
					duration: 1.2,
					delay: 0.15,
					ease: 'power3.out',
					stagger: 0.1,
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
			className='relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-16 px-4 sm:py-20 sm:px-6 md:py-24 lg:py-32 xl:py-32'
			style={{contain: 'layout style paint'}}>
			{/* Animated grid background - responsive sizing */}
			<div
				className='absolute inset-0 opacity-30'
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
					backgroundSize: 'clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)',
					willChange: 'auto',
				}}></div>

			{/* Ambient glow orbs - optimized */}
			<div
				className='absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-purple-500/3 rounded-full blur-2xl animate-pulse-glow pointer-events-none'
				style={{willChange: 'opacity'}}></div>
			<div
				className='absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-500/3 rounded-full blur-2xl animate-pulse-glow pointer-events-none'
				style={{animationDelay: '2s', willChange: 'opacity'}}></div>

			{/* Floating decorative elements - hidden on small mobile */}
			<div className='block absolute top-20 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-float pointer-events-none'></div>
			<div className='block absolute bottom-32 left-1/3 w-3 h-3 bg-white/15 rounded-full animate-float-delayed pointer-events-none'></div>
			<div className='block absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float-slow pointer-events-none'></div>

			{/* Main content */}
			<div className='relative z-10 w-full max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center'>
				{/* Top decorative line */}
				<div className='flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 lg:mb-16'>
					<div className='cta-line h-px w-12 sm:w-16 md:w-20 lg:w-24 bg-linear-to-r from-transparent via-white/40 to-transparent origin-center'></div>
					<span className='text-white/60 uppercase text-[7px] sm:text-[8px] md:text-[9px] font-descriptive tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] font-medium whitespace-nowrap'>
						Let&apos;s Work Together
					</span>
					<div className='cta-line h-px w-12 sm:w-16 md:w-20 lg:w-24 bg-linear-to-r from-transparent via-white/40 to-transparent origin-center'></div>
				</div>

				{/* Main heading - fully responsive */}
				<h2
					ref={headingRef}
					className='text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.06] lg:text-7xl lg:leading-[1.05] xl:text-8xl 2xl:text-[115px] font-heading font-bold text-white tracking-tight mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-2 flex flex-col sm:block items-center'
					style={{transform: 'translate3d(0, 0, 0)'}}>
					<span className='inline-flex items-baseline justify-center flex-wrap gap-x-3 sm:gap-x-4 md:gap-x-5'>
						<span>Ready to</span>
						<span
							className='relative inline-block align-baseline whitespace-nowrap min-w-[3ch] text-center sm:text-left'
							style={{perspective: '1000px'}}>
							{/* Phantom element to establish baseline and height */}
							<span
								className='opacity-0 pointer-events-none select-none relative'
								aria-hidden='true'>
								Transform
							</span>

							{rotatingWords.map((word, index) => {
								const isActive = index === currentWordIndex
								const isPrevious =
									index ===
									(currentWordIndex - 1 + rotatingWords.length) %
										rotatingWords.length

								return (
									<span
										key={word}
										className='absolute left-0 top-0 w-full transition-all duration-1000 ease-out flex justify-center sm:justify-start'
										style={{
											transform: isActive
												? 'translateY(0%) rotateX(0deg) scale(1)'
												: isPrevious
												? 'translateY(-100%) rotateX(-90deg) scale(0.8)'
												: 'translateY(100%) rotateX(90deg) scale(0.8)',
											opacity: isActive ? 1 : 0,
											transformStyle: 'preserve-3d',
											filter: isActive ? 'blur(0px)' : 'blur(4px)',
											willChange: isActive ? 'transform, opacity' : 'auto',
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
					</span>
					<span className='block mt-2 sm:mt-0'>Your Brand?</span>
				</h2>

				{/* CTA Button - Fully responsive with touch optimization */}
				<div
					ref={buttonRef}
					className='flex justify-center'
					style={{transform: 'translate3d(0, 0, 0)'}}>
					<a
						href='/contact'
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						className='group relative inline-flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 lg:px-12 lg:py-7 xl:px-14 xl:py-8 bg-white text-black font-heading font-semibold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide rounded-full overflow-hidden transition-all duration-700 ease-out shadow-lg shadow-white/20 hover:shadow-2xl hover:shadow-white/40 active:scale-95 touch-manipulation'
						style={{
							transform: isHovering
								? `translate(${buttonMousePos.x * 6}px, ${
										buttonMousePos.y * 6
								  }px) translateY(-6px)`
								: 'translate(0, 0) translateY(0px)',
							transition:
								'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease-out',
							backfaceVisibility: 'hidden',
							willChange: isHovering ? 'transform' : 'auto',
						}}>
						{/* Outer premium glow */}
						<div className='absolute -inset-1 rounded-full bg-linear-to-r from-white/40 via-white/60 to-white/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out'></div>

						{/* Subtle gradient overlay on hover */}
						<div className='absolute inset-0 rounded-full bg-linear-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out'></div>

						{/* Border accent */}
						<div className='absolute inset-0 rounded-full ring-2 ring-black/5 group-hover:ring-black/10 transition-all duration-500 ease-out'></div>

						{/* Button content - responsive text */}
						<span className='relative z-10 transition-all duration-500 ease-out group-hover:tracking-wider whitespace-nowrap'>
							<span className='hidden sm:inline'>Start Your Project</span>
							<span className='inline sm:hidden'>Get Started</span>
						</span>

						{/* Premium arrow icon - responsive sizing */}
						<div className='relative z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/5 group-hover:bg-black flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-45 shrink-0'>
							<svg
								className='w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-black group-hover:text-white transition-all duration-500 ease-out group-hover:scale-110'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2.5}
									d='M7 17L17 7M17 7H7M17 7V17'
								/>
							</svg>
						</div>

						{/* Elegant shimmer effect */}
						<div className='absolute inset-0 rounded-full overflow-hidden'>
							<div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out bg-linear-to-r from-transparent via-black/5 to-transparent'></div>
						</div>

						{/* Bottom lift shadow */}
						<div className='absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-white/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out'></div>
					</a>
				</div>

				{/* Bottom decorative elements - responsive */}
				<div className='mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 opacity-60'>
					<div className='hidden sm:flex items-center gap-2 md:gap-3'>
						<div className='w-8 md:w-10 lg:w-12 h-px bg-linear-to-r from-transparent to-white/30'></div>
						<div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40 rounded-full animate-pulse'></div>
					</div>
					<span className='text-white/40 text-[10px] sm:text-xs font-descriptive tracking-wider uppercase text-center'>
						Trusted by 50+ Brands
					</span>
					<div className='hidden sm:flex items-center gap-2 md:gap-3'>
						<div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40 rounded-full animate-pulse'></div>
						<div className='w-8 md:w-10 lg:w-12 h-px bg-linear-to-l from-transparent to-white/30'></div>
					</div>
				</div>
			</div>

			{/* Corner decorative elements - responsive sizing */}
			<div className='absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 border-t-2 border-l-2 border-white/10 pointer-events-none'></div>
			<div className='absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 border-b-2 border-r-2 border-white/10 pointer-events-none'></div>
		</section>
	)
}
