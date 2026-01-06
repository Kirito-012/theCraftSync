'use client'

import React, {useEffect, useRef} from 'react'
import {
	Mail,
	MapPin,
	Linkedin,
	Twitter,
	Instagram,
	ArrowUpRight,
	Calendar,
} from 'lucide-react'
import gsap from 'gsap'

const ContactInfoSection = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	// Animation Refs
	const emailBlockRef = useRef<HTMLDivElement>(null)
	const locationBlockRef = useRef<HTMLDivElement>(null)
	const inquiryBlockRef = useRef<HTMLDivElement>(null)
	const socialsRef = useRef<HTMLDivElement>(null)
	const rightCardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const initGsap = async () => {
			const {ScrollTrigger} = await import('gsap/ScrollTrigger')
			gsap.registerPlugin(ScrollTrigger)

			const ctx = gsap.context(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 75%',
					},
				})

				// Set Initial States
				const leftElements = [
					emailBlockRef.current,
					locationBlockRef.current,
					inquiryBlockRef.current,
					socialsRef.current,
				]

				gsap.set(leftElements, {opacity: 0, y: 30})
				gsap.set(rightCardRef.current, {opacity: 0, y: 50})

				// 1. Left Column Stagger
				tl.to(leftElements, {
					opacity: 1,
					y: 0,
					duration: 1,
					stagger: 0.15,
					ease: 'power4.out',
				})

				// 2. Right Card Entrance
				tl.to(
					rightCardRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 1.2,
						ease: 'power4.out',
						clearProps: 'transform', // Important for hover scale effects
					},
					'-=0.8'
				)
			}, containerRef)

			return () => ctx.revert()
		}

		initGsap()
	}, [])

	return (
		<section
			className='w-full bg-black py-24 px-4 sm:px-8 overflow-hidden relative'
			ref={containerRef}>
			{/* Divider Line */}
			<div className='absolute top-0 left-0 w-full h-px bg-zinc-900'></div>

			<div className='max-w-[1600px] mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start'>
					{/* LEFT COLUMN: Contact Details */}
					<div className='flex flex-col gap-16'>
						<div ref={emailBlockRef}>
							<span className='text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 block'>
								Get in Touch
							</span>
							<a
								href='mailto:hello@thecraftsync.com'
								className='group block'>
								<h3 className='text-4xl md:text-6xl font-black text-white tracking-tighter transition-colors duration-300'>
									hello@
									<br />
									thecraftsync.com
								</h3>
								<div className='h-px w-0 group-hover:w-full bg-white mt-2 transition-all duration-500'></div>
							</a>
						</div>

						<div className='space-y-8'>
							<div
								ref={locationBlockRef}
								className='flex items-start gap-4'>
								<div className='w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50 shrink-0 text-zinc-400'>
									<MapPin className='w-4 h-4' />
								</div>
								<div>
									<p className='text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1'>
										Location
									</p>
									<p className='text-xl text-white font-medium'>
										Haridwar, Uttarakhand
									</p>
									<p className='text-zinc-500 font-light mt-1'>
										Available for remote partnerships worldwide.
									</p>
								</div>
							</div>

							<div
								ref={inquiryBlockRef}
								className='flex items-start gap-4'>
								<div className='w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50 shrink-0 text-zinc-400'>
									<Mail className='w-4 h-4' />
								</div>
								<div>
									<p className='text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1'>
										Inquiries
									</p>
									<p className='text-zinc-400 font-light'>
										For new business, press, and general inquiries.
									</p>
								</div>
							</div>
						</div>

						<div
							ref={socialsRef}
							className='flex gap-4'>
							{[
								{icon: Linkedin, href: '#'},
								{icon: Twitter, href: '#'},
								{icon: Instagram, href: '#'},
							].map((social, idx) => (
								<a
									key={idx}
									href={social.href}
									className='w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 group'>
									<social.icon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
								</a>
							))}
						</div>
					</div>

					{/* RIGHT COLUMN: Schedule Call */}
					<div
						ref={rightCardRef}
						className='relative group'>
						<div className='absolute inset-0 bg-linear-to-br from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] rounded-full pointer-events-none'></div>

						<div className='relative bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 md:p-12 overflow-hidden hover:border-zinc-700 transition-colors duration-500'>
							<div className='flex justify-between items-start mb-12'>
								<div>
									<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6'>
										<span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
										<span className='text-[10px] font-bold uppercase tracking-widest text-emerald-400'>
											Priority Access
										</span>
									</div>
									<h3 className='text-3xl md:text-4xl font-bold text-white mb-2'>
										Skip the email tag?
									</h3>
									<p className='text-zinc-400 font-light'>
										Book a 15-min intro call directly with our founders.
									</p>
								</div>
								<div className='hidden md:flex w-14 h-14 rounded-2xl bg-zinc-900 items-center justify-center border border-zinc-800'>
									<Calendar className='w-6 h-6 text-white' />
								</div>
							</div>

							<button className='w-full group/btn relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-500/10 active:scale-[0.98]'>
								<div className='relative z-10 flex items-center justify-center gap-2 h-5 overflow-hidden'>
									<div className='flex flex-col items-center gap-3 transition-transform duration-300 group-hover/btn:-translate-y-[calc(100%+12px)]'>
										<div className='flex items-center gap-2'>
											<span className='text-zinc-950 font-black uppercase tracking-widest text-sm'>
												Schedule Meeting
											</span>
											<ArrowUpRight className='w-4 h-4 text-zinc-950' />
										</div>
										<div className='flex items-center gap-2 absolute top-full mt-3'>
											<span className='text-zinc-950 font-black uppercase tracking-widest text-sm'>
												Book Intro Call
											</span>
											<ArrowUpRight className='w-4 h-4 text-zinc-950 rotate-45' />
										</div>
									</div>
								</div>
							</button>

							<div className='mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500 font-medium uppercase tracking-wider'>
								<span>15 Minute Duration</span>
								<span>Google Meet</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactInfoSection
