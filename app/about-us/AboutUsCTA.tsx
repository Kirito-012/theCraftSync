'use client'

import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutUsCTA() {
	const ctaRef = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)
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

	// Optimized mouse tracking with requestAnimationFrame
	useEffect(() => {
		let rafId: number
		const handleMouseMove = (e: MouseEvent) => {
			if (rafId) cancelAnimationFrame(rafId)

			rafId = requestAnimationFrame(() => {
				if (ctaRef.current) {
					const rect = ctaRef.current.getBoundingClientRect()
					const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
					const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
					setMousePosition({x, y})
				}
			})
		}

		const section = ctaRef.current
		if (section) {
			section.addEventListener('mousemove', handleMouseMove, {passive: true})
			return () => {
				section.removeEventListener('mousemove', handleMouseMove)
				if (rafId) cancelAnimationFrame(rafId)
			}
		}
	}, [])

	// Optimized scroll animations
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Heading animation - smoother and more impactful
			gsap.fromTo(
				headingRef.current,
				{
					y: 100,
					opacity: 0,
					scale: 0.9,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1.8,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 70%',
						toggleActions: 'play none none none',
					},
				}
			)

			// Button animation - delayed for emphasis
			gsap.fromTo(
				buttonRef.current,
				{
					y: 60,
					opacity: 0,
					scale: 0.85,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 1.4,
					delay: 0.4,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 70%',
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
					duration: 1.6,
					delay: 0.2,
					ease: 'power3.inOut',
					stagger: 0.15,
					scrollTrigger: {
						trigger: ctaRef.current,
						start: 'top 70%',
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
			className='relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-32 px-6'
			style={{contain: 'layout style paint'}}>
			{/* Animated grid background */}
			<div
				className='absolute inset-0 opacity-[0.03]'
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
					willChange: 'auto',
				}}></div>

			{/* Radial gradient spotlight - optimized */}
			<div
				className='absolute inset-0 opacity-40 pointer-events-none'
				style={{
					background: `radial-gradient(circle at ${
						50 + mousePosition.x * 10
					}% ${
						50 + mousePosition.y * 10
					}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
					transition: 'background 0.3s ease-out',
				}}></div>

			{/* Ambient glow orbs */}
			<div className='absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none'></div>
			<div
				className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none'
				style={{animationDelay: '2s'}}></div>

			{/* Floating decorative elements */}
			<div className='absolute top-20 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-float pointer-events-none'></div>
			<div className='absolute bottom-32 left-1/3 w-3 h-3 bg-white/15 rounded-full animate-float-delayed pointer-events-none'></div>
			<div className='absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float-slow pointer-events-none'></div>

			{/* Main content */}
			<div className='relative z-10 max-w-6xl mx-auto text-center'>
				{/* Top decorative line */}
				<div className='flex items-center justify-center gap-4 mb-16'>
					<div className='cta-line h-px w-24 bg-linear-to-r from-transparent via-white/40 to-transparent origin-center'></div>
					<span className='text-white/60 uppercase text-[9px] font-descriptive tracking-[0.5em] font-medium'>
						Let's Work Together
					</span>
					<div className='cta-line h-px w-24 bg-linear-to-r from-transparent via-white/40 to-transparent origin-center'></div>
				</div>

				{/* Main heading - larger and more prominent */}
				<h2
					ref={headingRef}
					className='text-7xl md:text-8xl lg:text-[115px] font-heading font-bold text-white leading-[1.05] tracking-tight mb-24'
					style={{transform: 'translate3d(0, 0, 0)'}}>
					Ready to{' '}
					<span
						className='relative inline-block align-baseline whitespace-nowrap'
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
									className='absolute left-0 top-0 w-full transition-all duration-1000 ease-out'
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
					<br />
					Your Brand?
				</h2>

				{/* CTA Button - Premium white design */}
				<div
					ref={buttonRef}
					className='flex justify-center'
					style={{transform: 'translate3d(0, 0, 0)'}}>
					<a
						href='#contact'
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						className='group relative inline-flex items-center gap-6 px-14 py-8 bg-white text-black font-heading font-semibold text-xl tracking-wide rounded-full overflow-hidden transition-all duration-700 ease-out shadow-lg shadow-white/20 hover:shadow-2xl hover:shadow-white/40'
						style={{
							transform: isHovering
								? `translate(${mousePosition.x * 6}px, ${
										mousePosition.y * 6
								  }px) translateY(-6px)`
								: 'translate(0, 0) translateY(0px)',
							transition:
								'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease-out',
							backfaceVisibility: 'hidden',
							willChange: 'transform',
						}}>
						{/* Outer premium glow */}
						<div className='absolute -inset-1 rounded-full bg-linear-to-r from-white/40 via-white/60 to-white/40 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out'></div>

						{/* Subtle gradient overlay on hover */}
						<div className='absolute inset-0 rounded-full bg-linear-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out'></div>

						{/* Border accent */}
						<div className='absolute inset-0 rounded-full ring-2 ring-black/5 group-hover:ring-black/10 transition-all duration-500 ease-out'></div>

						{/* Button content */}
						<span className='relative z-10 transition-all duration-500 ease-out group-hover:tracking-wider'>
							Start Your Project
						</span>

						{/* Premium arrow icon */}
						<div className='relative z-10 w-10 h-10 rounded-full bg-black/5 group-hover:bg-black flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-45'>
							<svg
								className='w-5 h-5 text-black group-hover:text-white transition-all duration-500 ease-out group-hover:scale-110'
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

				{/* Bottom decorative elements */}
				<div className='mt-24 flex items-center justify-center gap-8 opacity-60'>
					<div className='flex items-center gap-3'>
						<div className='w-12 h-px bg-linear-to-r from-transparent to-white/30'></div>
						<div className='w-2 h-2 bg-white/40 rounded-full animate-pulse'></div>
					</div>
					<span className='text-white/40 text-xs font-descriptive tracking-wider uppercase'>
						Trusted by 50+ Brands
					</span>
					<div className='flex items-center gap-3'>
						<div className='w-2 h-2 bg-white/40 rounded-full animate-pulse'></div>
						<div className='w-12 h-px bg-linear-to-l from-transparent to-white/30'></div>
					</div>
				</div>
			</div>

			{/* Corner decorative elements */}
			<div className='absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10 pointer-events-none'></div>
			<div className='absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10 pointer-events-none'></div>
		</section>
	)
}
