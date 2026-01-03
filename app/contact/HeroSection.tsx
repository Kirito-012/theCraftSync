import React, {useState} from 'react'
import './contact.css'
import {ArrowRight, Mail, MapPin, Phone} from 'lucide-react'

const HeroSection = () => {
	const [selectedServices, setSelectedServices] = useState<string[]>([])

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

	return (
		<div className='w-full flex flex-col lg:flex-row gap-6 h-full min-h-[85vh] max-w-[1800px] mx-auto'>
			{/* LEFT PANEL (35% -> 40% requested previously) */}
			<div className='w-full lg:w-[40%] bg-black text-white rounded-[32px] p-8 lg:p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/5'>
				{/* Background Aesthetics - Increased Opacity */}
				<div className='glow-blob w-[500px] h-[500px] bg-white/20 top-[-200px] left-[-200px] animate-float blur-[120px] rounded-full absolute pointer-events-none'></div>
				<div
					className='glow-blob w-[400px] h-[400px] bg-blue-900/30 bottom-[-100px] right-[-100px] animate-pulse-glow blur-[100px] rounded-full absolute pointer-events-none'
					style={{animationDelay: '2s'}}></div>

				{/* Content */}
				<div className='relative z-10 flex flex-col h-full justify-between'>
					<div>
						<div className='inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md'>
							<span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
							<span className='text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400'>
								Available for new projects
							</span>
						</div>

						<h1 className='text-3xl lg:text-4xl xl:text-6xl leading-[1.1] mb-6'>
							<span className='font-light text-zinc-300 block mb-2'>
								Let's build
							</span>
							<span className='font-bold text-4xl lg:text-5xl xl:text-6xl tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 block uppercase'>
								Exceptional
							</span>
							<span className='font-heading italic font-light text-zinc-500 text-2xl lg:text-3xl xl:text-4xl block mt-1'>
								digital products.
							</span>
						</h1>
						<p className='text-zinc-400 text-lg leading-relaxed max-w-md border-l border-zinc-800 pl-6 font-light'>
							We help ambitious brands and businesses define their future with
							design and technology.
						</p>
					</div>

					<div className='space-y-8'>
						<div className='flex items-center gap-5 text-gray-300 group cursor-pointer transition-all hover:translate-x-2 duration-300'>
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
						<div className='flex items-center gap-5 text-gray-300 group cursor-pointer transition-all hover:translate-x-2 duration-300'>
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
			<div className='w-full lg:w-[60%] bg-[#f4f4f5] rounded-[32px] p-10 xl:p-16 flex flex-col justify-center relative shadow-2xl'>
				<div className='max-w-2xl mx-auto w-full'>
					<div className='mb-12'>
						<h2 className='text-3xl font-bold text-zinc-900 mb-3'>
							Send us a message
						</h2>
						<p className='text-zinc-500'>
							Fill out the form below and we'll get back to you shortly.
						</p>
					</div>

					<form className='space-y-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<div className='group relative'>
								<input
									type='text'
									id='name'
									required
									className='peer w-full bg-transparent border-b border-zinc-300 py-4 text-zinc-900 text-xl placeholder-transparent focus:outline-none focus:border-zinc-900 transition-all'
									placeholder='Name'
								/>
								<label
									htmlFor='name'
									className='absolute left-0 -top-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-zinc-900 peer-focus:font-bold peer-focus:uppercase'>
									Your Name
								</label>
							</div>
							<div className='group relative'>
								<input
									type='email'
									id='email'
									required
									className='peer w-full bg-transparent border-b border-zinc-300 py-4 text-zinc-900 text-xl placeholder-transparent focus:outline-none focus:border-zinc-900 transition-all'
									placeholder='Email'
								/>
								<label
									htmlFor='email'
									className='absolute left-0 -top-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-zinc-900 peer-focus:font-bold peer-focus:uppercase'>
									Email Address
								</label>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<div className='group relative'>
								<input
									type='text'
									id='company'
									className='peer w-full bg-transparent border-b border-zinc-300 py-4 text-zinc-900 text-xl placeholder-transparent focus:outline-none focus:border-zinc-900 transition-all'
									placeholder='Company'
								/>
								<label
									htmlFor='company'
									className='absolute left-0 -top-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-zinc-900 peer-focus:font-bold peer-focus:uppercase'>
									Company (Optional)
								</label>
							</div>
							<div className='group relative'>
								<input
									type='text'
									id='budget'
									className='peer w-full bg-transparent border-b border-zinc-300 py-4 text-zinc-900 text-xl placeholder-transparent focus:outline-none focus:border-zinc-900 transition-all'
									placeholder='Budget'
								/>
								<label
									htmlFor='budget'
									className='absolute left-0 -top-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-zinc-900 peer-focus:font-bold peer-focus:uppercase'>
									Budget Range
								</label>
							</div>
						</div>

						{/* Services */}
						<div className='pt-6'>
							<label className='block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4'>
								I'm interested in...
							</label>
							<div className='flex flex-wrap gap-3'>
								{services.map((service, idx) => (
									<button
										key={idx}
										type='button'
										onClick={() => toggleService(service)}
										className={`px-6 py-3 rounded-full border transition-all duration-300 text-sm font-medium ${
											selectedServices.includes(service)
												? 'bg-zinc-900 text-white border-zinc-900 shadow-lg scale-105'
												: 'bg-white text-zinc-600 border-transparent hover:border-zinc-200 shadow-sm hover:shadow-md'
										}`}>
										{service}
									</button>
								))}
							</div>
						</div>

						{/* Message */}
						<div className='group relative pt-6'>
							<textarea
								id='message'
								rows={1}
								className='peer w-full bg-transparent border-b border-zinc-300 py-4 text-zinc-900 text-xl placeholder-transparent focus:outline-none focus:border-zinc-900 transition-all resize-none min-h-[60px]'
								placeholder='Message'
								onInput={(e) => {
									e.currentTarget.style.height = 'auto'
									e.currentTarget.style.height =
										e.currentTarget.scrollHeight + 'px'
								}}></textarea>
							<label
								htmlFor='message'
								className='absolute left-0 top-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-8 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-3 peer-focus:text-[10px] peer-focus:text-zinc-900 peer-focus:font-bold peer-focus:uppercase'>
								Tell us about your project
							</label>
						</div>

						<div className='pt-8 flex justify-end'>
							<button
								type='submit'
								className='group flex items-center gap-3 bg-zinc-900 text-white px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1'>
								<span className='text-sm'>Send Message</span>
								<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
