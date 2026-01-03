'use client'

import {useEffect, useRef} from 'react'
import gsap from 'gsap'

export default function HeroSection() {
	const heroRef = useRef<HTMLDivElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

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
			}, heroRef)
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
			ref={heroRef}
			className='relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-24 sm:pt-20 pb-20 sm:pb-32'>
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
				<h1 className='text-[3.5rem] leading-[1.1] sm:text-6xl md:text-[5rem] lg:text-[76px] mb-6 sm:mb-8 font-heading'>
					<span className='font-normal block sm:inline'>Crafting</span>{' '}
					<span className='font-bold block sm:inline'>Dreams</span>
					<br className='hidden sm:block' />
					<span className='font-normal block sm:inline'>and</span>{' '}
					<span className='font-bold block sm:inline'>Syncing</span>{' '}
					<span className='font-normal block sm:inline'>Reality</span>
				</h1>
				<p className=' leading-[1.6] opacity-100 max-w-200 font-descriptive'>
					The Craft Sync is a digital marketing agency designed to provide
					integrated marketing partnerships for great brands.
				</p>
			</div>
		</section>
	)
}
