'use client'

import React, {useState, useEffect, useRef} from 'react'
import './contact.css'
import {ArrowRight, Mail, MapPin, Check} from 'lucide-react'
import gsap from 'gsap'

const HeroSection = () => {
	const [selectedServices, setSelectedServices] = useState<string[]>([])

	// Refs for Animation
	const containerRef = useRef<HTMLDivElement>(null)
	const leftPanelRef = useRef<HTMLDivElement>(null)
	const rightPanelRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLFormElement>(null)

	// Text Refs
	const badgeRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const descRef = useRef<HTMLParagraphElement>(null)
	const contactItemsRef = useRef<HTMLDivElement>(null)

	const services = [
		'Web Development',
		'UI/UX Design',
		'Mobile Apps',
		'Branding',
		'SEO & Marketing',
	]

	const toggleService = (service: string) => {
		setSelectedServices((prev) =>
			prev.includes(service)
				? prev.filter((s) => s !== service)
				: [...prev, service]
		)
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({defaults: {ease: 'power3.out'}})

			// Initial State Setters (prevent FOUC)
			gsap.set([leftPanelRef.current, rightPanelRef.current], {
				opacity: 0,
				y: 50,
			})
			gsap.set([badgeRef.current, titleRef.current, descRef.current], {
				opacity: 0,
				y: 20,
			})
			gsap.set(contactItemsRef.current!.children, {opacity: 0, x: -20})

			// 1. Panels Entrance (Staggered)
			tl.to([leftPanelRef.current, rightPanelRef.current], {
				opacity: 1,
				y: 0,
				duration: 1.2,
				stagger: 0.2,
			})

			// 2. Left Panel Content Stagger
			tl.to(
				[badgeRef.current, titleRef.current, descRef.current],
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.15,
				},
				'-=0.8'
			)

			// 3. Contact Items Stagger
			tl.to(
				contactItemsRef.current!.children,
				{
					opacity: 1,
					x: 0,
					duration: 0.6,
					stagger: 0.1,
					clearProps: 'transform',
				},
				'-=0.6'
			)

			// 4. Right Panel (Form) Stagger
			// Targeting form children for a cascading effect
			if (formRef.current) {
				const formElements = formRef.current.children
				gsap.fromTo(
					formElements,
					{opacity: 0, y: 20},
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.1,
						ease: 'power2.out',
						delay: 0.5, // Start after panels appear
					}
				)
			}
		}, containerRef)

		return () => ctx.revert()
	}, [])

	return (
		<div
			ref={containerRef}
			className='w-full flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-screen lg:h-screen bg-grid max-w-[1800px] mx-auto pt-24 pb-4 sm:pb-6 px-4 sm:px-8 overflow-hidden'>
			{/* LEFT PANEL (35% -> 40% requested previously) */}
			<div
				ref={leftPanelRef}
				className='w-full lg:w-[40%] h-[80vh] lg:h-full bg-black text-white rounded-[24px] sm:rounded-[32px] p-6 pb-20 md:pb-24 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/5 opacity-0'>
				{/* Background Aesthetics - Increased Opacity */}
				<div className='glow-blob w-[500px] h-[500px] bg-white/20 top-[-200px] left-[-200px] animate-float blur-[120px] rounded-full absolute pointer-events-none'></div>
				<div
					className='glow-blob w-[400px] h-[400px] bg-blue-900/30 bottom-[-100px] right-[-100px] animate-pulse-glow blur-[100px] rounded-full absolute pointer-events-none'
					style={{animationDelay: '2s'}}></div>

				{/* Content */}
				<div className='relative z-10 flex flex-col h-full justify-between'>
					<div>
						<div
							ref={badgeRef}
							className='inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md opacity-0'>
							<span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
							<span className='text-[10px] font-bold tracking-widest uppercase text-zinc-400'>
								Available for new projects
							</span>
						</div>

						<h1
							ref={titleRef}
							className='text-2xl sm:text-3xl lg:text-4xl xl:text-6xl leading-[1.1] mb-4 sm:mb-6 opacity-0'>
							<span className='font-light text-zinc-300 block mb-1 sm:mb-2 text-xl sm:text-2xl md:text-4xl xl:text-5xl'>
								Let's build
							</span>
							<span className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 block uppercase'>
								Exceptional
							</span>
							<span className='font-heading italic font-light text-zinc-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl block mt-1'>
								digital products.
							</span>
						</h1>
						<p
							ref={descRef}
							className='text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md border-l border-zinc-800 pl-4 sm:pl-6 font-light opacity-0'>
							We help ambitious brands and businesses define their future with
							design and technology.
						</p>
					</div>

					<div
						ref={contactItemsRef}
						className='space-y-8'>
						<div className='flex items-center gap-5 text-gray-300 group cursor-pointer transition-all hover:translate-x-2 duration-300 opacity-0'>
							<div className='w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5'>
								<Mail className='w-5 h-5 text-zinc-400 group-hover:text-white transition-colors' />
							</div>
							<div>
								<p className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1'>
									Email us
								</p>
								<p className='font-medium text-lg text-white relative inline-block'>
									hello@thecraftsync.com
									<span className='absolute left-0 bottom-0 w-full h-px bg-zinc-700 group-hover:bg-white transition-colors duration-300'></span>
								</p>
							</div>
						</div>
						<div className='flex items-center gap-5 text-gray-300 group cursor-pointer transition-all hover:translate-x-2 duration-300 opacity-0'>
							<div className='w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5'>
								<MapPin className='w-5 h-5 text-zinc-400 group-hover:text-white transition-colors' />
							</div>
							<div>
								<p className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1'>
									Visit us
								</p>
								<p className='font-medium text-lg text-white relative inline-block'>
									Haridwar, Uttarakhand
									<span className='absolute left-0 bottom-0 w-full h-px bg-zinc-700 group-hover:bg-white transition-colors duration-300'></span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* RIGHT PANEL (60%) - Premium Light Theme */}
			<div
				ref={rightPanelRef}
				className='w-full lg:w-[60%] h-auto lg:h-full bg-zinc-50 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col relative shadow-2xl overflow-y-auto no-scrollbar opacity-0'>
				<div className='max-w-xl mx-auto w-full flex flex-col justify-center min-h-full py-8'>
					<div className='mb-10'>
						<h2 className='text-4xl font-black text-zinc-900 mb-4 tracking-tighter'>
							Let's Talk<span className='text-emerald-500'>.</span>
						</h2>
						<p className='text-zinc-600 text-md font-medium max-w-md'>
							Fill out the form below and we'll get back to you within 24 hours.
						</p>
					</div>

					<form
						ref={formRef}
						className='space-y-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
							<div className='group relative'>
								<label
									htmlFor='name'
									className='block text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Your Name
								</label>
								<input
									type='text'
									id='name'
									required
									className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300'
									placeholder='John Doe'
								/>
							</div>
							<div className='group relative'>
								<label
									htmlFor='email'
									className='block text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									required
									className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300'
									placeholder='john@example.com'
								/>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
							<div className='group relative'>
								<label
									htmlFor='company'
									className='block text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Company{' '}
									<span className='text-zinc-400 font-medium normal-case tracking-normal ml-1'>
										(Optional)
									</span>
								</label>
								<input
									type='text'
									id='company'
									className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300'
									placeholder='Acme Inc.'
								/>
							</div>
							<div className='group relative'>
								<label
									htmlFor='budget'
									className='block text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Budget Range
								</label>
								<input
									type='text'
									id='budget'
									className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300'
									placeholder='₹30k - ₹70k'
								/>
							</div>
						</div>

						{/* Services */}
						<div className='pt-1'>
							<label className='block text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-4'>
								I'm interested in...
							</label>
							<div className='flex flex-wrap gap-x-8 gap-y-4'>
								{services.map((service, idx) => (
									<button
										key={idx}
										type='button'
										onClick={() => toggleService(service)}
										className='group flex items-center gap-3 cursor-pointer'>
										<div
											className={`w-5 h-5 flex items-center justify-center border transition-all duration-200 ${
												selectedServices.includes(service)
													? 'bg-zinc-900 border-zinc-900 text-white'
													: 'bg-transparent border-zinc-300 group-hover:border-zinc-900'
											}`}>
											{selectedServices.includes(service) && (
												<Check className='w-3.5 h-3.5' />
											)}
										</div>
										<span
											className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
												selectedServices.includes(service)
													? 'text-zinc-900'
													: 'text-zinc-500 group-hover:text-zinc-900'
											}`}>
											{service}
										</span>
									</button>
								))}
							</div>
						</div>

						{/* Message */}
						<div className='group relative'>
							<label
								htmlFor='message'
								className='block text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-2'>
								Project Details
							</label>
							<textarea
								id='message'
								rows={1}
								className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300 resize-none min-h-[50px]'
								placeholder='Tell us about your project goals...'
								onInput={(e) => {
									e.currentTarget.style.height = 'auto'
									e.currentTarget.style.height =
										Math.max(50, e.currentTarget.scrollHeight) + 'px'
								}}></textarea>
						</div>

						<div className='pt-4 flex justify-end'>
							<button
								type='submit'
								className='group flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98]'>
								<div className='relative overflow-hidden'>
									<span className='block text-xs font-black uppercase tracking-[0.15em] transition-transform duration-300 group-hover:-translate-y-full'>
										Send Message
									</span>
									<span className='absolute inset-0 flex items-center justify-center text-xs font-black uppercase tracking-[0.15em] transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
										Send Message
									</span>
								</div>
								<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
