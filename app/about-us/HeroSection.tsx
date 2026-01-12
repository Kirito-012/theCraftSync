'use client'

import {useEffect, useRef} from 'react'
import gsap from 'gsap'

export default function HeroSection() {
	const heroRef = useRef<HTMLDivElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let ctx: gsap.Context | null = null
		let isMounted = true

		const initGsap = async () => {
			if (!isMounted) return

			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			if (!isMounted || !heroRef.current) return

			ctx = gsap.context(() => {
				gsap.to(bgRef.current, {
					yPercent: 12,
					ease: 'none',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top top',
						end: 'bottom top',
						scrub: 1,
					},
				})

				gsap.fromTo('h1', 
					{ y: 50, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						delay: 0.2,
					}
				)
				gsap.fromTo('p', 
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						delay: 0.5,
					}
				)
			}, heroRef)
		}

		initGsap()

		return () => {
			isMounted = false
			if (ctx) ctx.revert()
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
							"url('https://res.cloudinary.com/duor8d5e3/image/upload/f_auto,q_auto,w_1920,c_limit/v1767509751/photo-1660496247667-3fb697c396af_yvgb2m.avif')",
						backgroundPosition: 'center center',
						transform: 'translate3d(0, 0, 0)',
						backfaceVisibility: 'hidden',
					}}
				/>
				<div className='absolute inset-0 bg-black/40 mix-blend-multiply'></div>
				<div className='absolute inset-0 bg-linear-to-t from-navy-dark/60 via-transparent to-transparent'></div>
			</div>

			{/* Content */}
			<div className='relative z-10 w-full max-w-7xl mx-auto text-left'>
				<h1 className='text-[3.5rem] leading-[1.1] sm:text-6xl md:text-[5rem] lg:text-[76px] mb-6 sm:mb-8 font-heading opacity-0'>
					<span className='font-normal block sm:inline'>Crafting</span>{' '}
					<span className='font-bold block sm:inline'>Dreams</span>
					<br className='hidden sm:block' />
					<span className='font-normal block sm:inline'>and</span>{' '}
					<span className='font-bold block sm:inline'>Syncing</span>{' '}
					<span className='font-normal block sm:inline'>Reality</span>
				</h1>
				<p className=' leading-[1.6] opacity-0 max-w-200 font-descriptive'>
					The Craft Sync is a digital marketing agency designed to provide
					integrated marketing partnerships for great brands.
				</p>
			</div>
		</section>
	)
}
