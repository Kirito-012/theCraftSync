'use client'

import React, {useState, useEffect, useRef} from 'react'
import './contact.css'
import {ArrowRight, Mail, MapPin, Check, Plus} from 'lucide-react'
import gsap from 'gsap'
import { servicesData } from '../Components/servicesData'

const HeroSection = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		company: '',
		budget: '',
		message: ''
	})
	const [selectedServices, setSelectedServices] = useState<string[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [showAllServices, setShowAllServices] = useState(false)

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

	const services = servicesData.map((service) => service.shortName)

	const toggleService = (service: string) => {
		setSelectedServices((prev) =>
			prev.includes(service)
				? prev.filter((s) => s !== service)
				: [...prev, service]
		)
	}

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {}
		
		if (!formData.name.trim()) newErrors.name = 'Name is required'
		else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters'
		
		if (!formData.email.trim()) newErrors.email = 'Email is required'
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address'
		
		if (!formData.message.trim()) newErrors.message = 'Project details are required'
		else if (formData.message.length < 10) newErrors.message = 'Please provide more details (min 10 chars)'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target
		setFormData(prev => ({ ...prev, [id]: value }))
		// Clear error when user starts typing
		if (errors[id]) {
			setErrors(prev => ({ ...prev, [id]: '' }))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!validateForm()) return

		setIsSubmitting(true)
		setSubmitStatus('idle')

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					services: selectedServices
				}),
			})

			if (response.ok) {
				setSubmitStatus('success')
				setFormData({
					name: '',
					email: '',
					company: '',
					budget: '',
					message: ''
				})
				setSelectedServices([])
				// Reset message height
				const messageEl = document.getElementById('message') as HTMLTextAreaElement
				if (messageEl) messageEl.style.height = 'auto'
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
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
			className='w-full flex flex-col lg:flex-row gap-3 sm:gap-4 min-h-[calc(100vh-2rem)] bg-grid max-w-[1800px] mx-auto pt-16 pb-2 px-3 sm:px-6 overflow-x-hidden'>
			{/* LEFT PANEL (40%) - INFO */}
			<div
				ref={leftPanelRef}
				className='w-full lg:w-[40%] bg-black text-white rounded-[20px] p-5 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/5 opacity-0'>
				{/* Background Aesthetics - Increased Opacity */}
				<div className='glow-blob w-[500px] h-[500px] bg-white/20 top-[-200px] left-[-200px] animate-float blur-[120px] rounded-full absolute pointer-events-none'></div>

				{/* Content */}
				<div className='relative z-10 flex flex-col h-full justify-between gap-12 lg:gap-0'>
					<div>
						<div
							ref={badgeRef}
							className='inline-flex items-center gap-2 px-3 py-1.5 mb-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-md opacity-0'>
							<span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
							<span className='text-[10px] font-bold tracking-widest uppercase text-zinc-400'>
								Available for new projects
							</span>
						</div>

						<h1
							ref={titleRef}
							className='text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3 opacity-0'>
							<span className='font-light text-zinc-300 block mb-1 text-xl lg:text-3xl'>
								Let&apos;s build
							</span>
							<span className='font-bold text-3xl lg:text-5xl tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 block uppercase'>
								Exceptional
							</span>
							<span className='font-heading italic font-light text-zinc-500 text-xl lg:text-3xl block mt-1'>
								digital products.
							</span>
						</h1>
						<p
							ref={descRef}
							className='text-zinc-400 text-sm lg:text-lg leading-relaxed max-w-md border-l border-zinc-800 pl-4 sm:pl-6 font-light opacity-0'>
							We help ambitious brands and businesses define their future with
							design and technology.
						</p>
					</div>

					<div
						ref={contactItemsRef}
						className='space-y-4'>
						<div className='flex items-center gap-5 text-gray-300 group cursor-pointer transition-all hover:translate-x-2 duration-300 opacity-0'>
							<div className='w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5'>
								<Mail className='w-5 h-5 text-zinc-400 group-hover:text-white transition-colors' />
							</div>
							<div>
								<p className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1'>
									Email us
								</p>
								<p className='font-medium text-lg text-white relative inline-block'>
									connect@thecraftsync.com
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

			{/* RIGHT PANEL (60%) - FORM */}
			<div
				ref={rightPanelRef}
				className='w-full lg:w-[60%] bg-zinc-50 rounded-[20px] p-5 sm:p-6 lg:p-10 flex flex-col relative shadow-2xl opacity-0'>
				<div className='max-w-xl mx-auto w-full flex flex-col justify-center min-h-full py-2'>
					<div className='mb-6'>
						<h2 className='text-3xl font-black text-zinc-900 mb-2 tracking-tighter'>
							Let&apos;s Talk<span className='text-emerald-500'>.</span>
						</h2>
						<p className='text-zinc-600 text-sm font-medium max-w-md'>
							Fill out the form below and we&apos;ll get back to you within 24 hours.
						</p>
					</div>

					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className='space-y-4 lg:space-y-5'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 lg:gap-y-5'>
							<div className='group relative'>
								<label
									htmlFor='name'
									className='block text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Your Name
								</label>
								<input
									type='text'
									id='name'
									value={formData.name}
									onChange={handleChange}
									className={`w-full bg-transparent border-b-2 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors duration-300 ${errors.name ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'}`}
									placeholder='John Doe'
								/>
								{errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
							</div>
							<div className='group relative'>
								<label
									htmlFor='email'
									className='block text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									value={formData.email}
									onChange={handleChange}
									className={`w-full bg-transparent border-b-2 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'}`}
									placeholder='john@example.com'
								/>
								{errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5'>
							<div className='group relative'>
								<label
									htmlFor='company'
									className='block text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Company{' '}
									<span className='text-zinc-400 font-medium normal-case tracking-normal ml-1'>
										(Optional)
									</span>
								</label>
								<input
									type='text'
									id='company'
									value={formData.company}
									onChange={handleChange}
									className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300'
									placeholder='Acme Inc.'
								/>
							</div>
							<div className='group relative'>
								<label
									htmlFor='budget'
									className='block text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2'>
									Budget Range
								</label>
								<input
									type='text'
									id='budget'
									value={formData.budget}
									onChange={handleChange}
									className='w-full bg-transparent border-b-2 border-zinc-200 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300'
									placeholder='₹30k - ₹70k'
								/>
							</div>
						</div>

						{/* Services */}
						<div className='pt-0 lg:pt-1'>
							<label className='block text-xs font-bold text-zinc-900 uppercase tracking-widest mb-3'>
								I&apos;m interested in...
							</label>
							<div className='flex flex-wrap gap-x-4 gap-y-2'>
								{(showAllServices ? services : services.slice(0, 3)).map((service, idx) => (
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
								
								{services.length > 3 && (
									<button
										type='button'
										onClick={() => setShowAllServices(!showAllServices)}
										className='group flex items-center gap-2 cursor-pointer py-1'
									>
										<div className='w-5 h-5 flex items-center justify-center rounded-full bg-zinc-100 group-hover:bg-zinc-200 transition-colors'>
											<Plus 
												className={`w-3 h-3 text-zinc-600 transition-transform duration-300 ${showAllServices ? 'rotate-45' : ''}`} 
											/>
										</div>
										<span className='text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors'>
											{showAllServices ? 'Less' : 'More...'}
										</span>
									</button>
								)}
							</div>
						</div>

						{/* Message */}
						<div className='group relative'>
							<label
								htmlFor='message'
								className='block text-xs font-bold text-zinc-900 uppercase tracking-widest mb-2'>
								Project Details
							</label>
							<textarea
								id='message'
								rows={1}
								value={formData.message}
								onChange={handleChange}
								className={`w-full bg-transparent border-b-2 py-2 text-lg font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-colors duration-300 resize-none min-h-[60px] ${errors.message ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'}`}
								placeholder='Tell us about your project goals...'
								onInput={(e) => {
									e.currentTarget.style.height = 'auto'
									e.currentTarget.style.height =
										Math.max(60, e.currentTarget.scrollHeight) + 'px'
								}}></textarea>
								{errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
						</div>

						<div className='pt-4 flex justify-end gap-4 items-center'>
							{submitStatus === 'success' && (
								<p className='text-emerald-600 font-bold text-sm animate-pulse'>
									Message sent!
								</p>
							)}
							{submitStatus === 'error' && (
								<p className='text-red-500 font-bold text-sm'>
									Error. Try again.
								</p>
							)}
							<button
								type='submit'
								disabled={isSubmitting}
								className='group flex items-center cursor-pointer justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-700 text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98]'>
								{isSubmitting ? (
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
								) : (
									<>
										<div className='relative overflow-hidden'>
											<span className='block text-xs font-black uppercase tracking-[0.15em] transition-transform duration-300 group-hover:-translate-y-full'>
												Send Message
											</span>
											<span className='absolute inset-0 flex items-center justify-center text-xs font-black uppercase tracking-[0.15em] transition-transform duration-300 translate-y-full group-hover:translate-y-0'>
												Send Message
											</span>
										</div>
										<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
