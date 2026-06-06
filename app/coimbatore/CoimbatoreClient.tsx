'use client'

import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
	ArrowRight,
	BadgeCheck,
	Bot,
	ChevronDown,
	Cloud,
	CalendarRange,
	Laptop,
	MessageCircle,
	Megaphone,
	Newspaper,
	Rocket,
	ShoppingBag,
	Sparkles,
    
	Workflow,
	Monitor,
	Smartphone,
	LifeBuoy,
	Cpu,
	Briefcase,
	Server,
	BarChart,
} from 'lucide-react'

type ServiceItem = {
	title: string
	description: string
	icon: ComponentType<{ className?: string }>
}

type StepItem = {
	title: string
	description: string
}

type FaqItem = {
	question: string
	answer: string
}

const services: ServiceItem[] = [
	{
		title: 'Simple websites',
		description:
			'Clean, fast websites that explain what you do without confusing your visitors.',
		icon: Monitor,
	},
	{
		title: 'Online stores',
		description:
			'Shops that make browsing, buying, and paying feel easy on any device.',
		icon: ShoppingBag,
	},
	{
		title: 'Business apps',
		description:
			'Custom tools for teams, customers, or dealers when spreadsheets are no longer enough.',
		icon: Laptop,
	},
	{
		title: 'AI and automation',
		description:
			'Smarter workflows that save time by handling repeat work in the background.',
		icon: Bot,
	},
	{
		title: 'Cloud and hosting',
		description:
			'Stable systems that stay online, scale smoothly, and are easier to maintain.',
		icon: Cloud,
	},
	{
		title: 'Support and updates',
		description:
			'We keep things running, fix issues, and help you improve the product over time.',
		icon: LifeBuoy,
	},
	{
		title: 'AI & Machine Learning Solutions',
		description:
			'AI features that help automate work, spot patterns, and make better decisions.',
		icon: Cpu,
	},
	{
		title: 'Enterprise Software Development',
		description:
			'Custom software for growing teams that need something secure, scalable, and built around real operations.',
		icon: Briefcase,
	},
	{
		title: 'Cloud Infrastructure & DevOps',
		description:
			'Cloud setup, deployments, and delivery systems that keep your product stable and easy to ship.',
		icon: Server,
	},
	{
		title: 'Cross-Platform Mobile Applications',
		description:
			'One app that works across iPhone, Android, and web so your users get a consistent experience.',
		icon: Smartphone,
	},
	{
		title: 'E-Commerce & Digital Commerce Platforms',
		description:
			'Commerce experiences built to help people browse, trust, and buy without friction.',
		icon: ShoppingBag,
	},
	{
		title: 'Microsoft Power Platform Solutions',
		description:
			'Low-code tools with Power Apps, Power Automate, and Power BI to simplify internal work.',
		icon: Workflow,
	},
	{
		title: 'Performance Engineering & SEO Optimization',
		description:
			'Faster pages, cleaner architecture, and search-ready builds that perform better for users and Google.',
		icon: Rocket,
	},
	{
		title: 'Technology Consulting',
		description:
			'Practical advice on what to build, what to fix, and how to avoid expensive rework.',
		icon: Sparkles,
	},
	{
		title: 'Social Media Management',
		description:
			'Content and posting help that keeps your brand visible and consistent across channels.',
		icon: MessageCircle,
	},
	{
		title: 'Digital Marketing Strategy',
		description:
			'Clear plans for getting more attention, more traffic, and more leads from the right audience.',
		icon: Megaphone,
	},
	{
		title: 'Content Marketing & Campaigns',
		description:
			'Useful content and campaign ideas that help people understand, trust, and remember your brand.',
		icon: Newspaper,
	},
	{
		title: 'Public Relations & Press Outreach',
		description:
			'PR support that helps you shape your story, reach media contacts, and stay visible in the right places.',
		icon: Megaphone,
	},
	{
		title: 'Brand Messaging & Reputation Support',
		description:
			'Help with the words, tone, and presence your brand uses online so it feels clear and trustworthy.',
		icon: Sparkles,
	},
	{
		title: 'Business Consulting',
		description:
			'Planning support for teams that want clearer systems, better workflow, and steady growth.',
		icon: CalendarRange,
	},
	{
		title: 'Business Analytics & Data Intelligence',
		description:
			'Dashboards and reporting that turn raw data into something your team can actually use.',
		icon: BarChart,
	},
]

const steps: StepItem[] = [
	{
		title: '1. Tell us what you need',
		description:
			'Share the problem in plain words. You do not need to know the technical terms.',
	},
	{
		title: '2. We map the simplest path',
		description:
			'We turn the idea into a clear plan, timeline, and cost before any build starts.',
	},
	{
		title: '3. We build and guide you',
		description:
			'You get a polished product, regular updates, and help after launch too.',
	},
]

const reasons = [
	'We explain things in simple language.',
	'We design for real users, not just for show.',
	'We build with speed, clarity, and future growth in mind.',
	'We are used to helping businesses that want a reliable partner.',
]

const faqs: FaqItem[] = [
	{
		question: 'Do I need to know tech terms before starting?',
		answer:
			'No. You can describe your business goal in simple language and we will handle the technical side.',
	},
	{
		question: 'Can you work with small local businesses?',
		answer:
			'Yes. We work with startups, local businesses, and growing teams that want something useful and easy to manage.',
	},
	{
		question: 'What if I only need a website first?',
		answer:
			'That is fine. We can start small with a website and add more features later when you are ready.',
	},
	{
		question: 'Will the page work on mobile phones?',
		answer:
			'Yes. Everything we build is designed to look good and work smoothly on phones, tablets, and desktops.',
	},
]

const sectionVariants = {
	hidden: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7 },
	},
}

const staggerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.08,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const backgroundVariants = {
	float: {
		y: [0, -14, 0],
		x: [0, 10, 0],
		transition: { duration: 8, repeat: Infinity },
	},
}

export default function ServicesClient() {
	const [openFaq, setOpenFaq] = useState<number | null>(0)
	const [isMobile, setIsMobile] = useState(false)
	const [showAllServices, setShowAllServices] = useState(false)
	const reduceMotion = useReducedMotion()
	const VISIBLE_COUNT = 6

	useEffect(() => {
		const media = window.matchMedia('(max-width: 639px)')

		const updateIsMobile = () => {
			setIsMobile(media.matches)
		}

		updateIsMobile()
		media.addEventListener('change', updateIsMobile)

		return () => {
			media.removeEventListener('change', updateIsMobile)
		}
	}, [])

	return (
		<main className='relative overflow-hidden bg-[#050505] text-white'>
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className='hidden sm:block absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/6 blur-3xl' />
				<div className='hidden sm:block absolute right-0 top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl' />
				<motion.div
					aria-hidden='true'
					className='hidden sm:block absolute left-8 top-24 h-24 w-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-md'
					variants={reduceMotion ? undefined : backgroundVariants}
					animate={reduceMotion ? undefined : 'float'}
				/>
				<motion.div
					aria-hidden='true'
					className='hidden sm:block absolute bottom-32 right-10 h-20 w-20 rounded-full border border-white/10 bg-white/6 backdrop-blur-md'
					variants={reduceMotion ? undefined : backgroundVariants}
					animate={reduceMotion ? undefined : 'float'}
					style={{ animationDelay: '1.4s' }}
				/>
			</div>

			<section className='relative mx-auto flex mt-12 sm:mt-16 lg:mt-20 min-h-[92vh] w-full max-w-7xl flex-col justify-center px-6 py-0 sm:px-10 lg:px-12'>
				{/* Background image + black overlay (optimized Cloudinary) */}
				{/* Full-bleed background: spans the viewport width while content stays centered */}
				<div aria-hidden='true' className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen z-0'>
					<div
						className='absolute inset-0 bg-cover bg-center'
						style={{
							backgroundImage:
								"url('https://res.cloudinary.com/din6jl7de/image/upload/f_auto,q_auto,dpr_auto,w_1600/v1780729499/hector-j-rivas-1FxMET2U5dU-unsplash_y7neyn.jpg')",
						}}
					/>
					<div className='absolute inset-0 bg-black/60' />
				</div>
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className='max-w-3xl relative z-20'
					>
					<h1 className='font-heading text-4xl font-bold leading-tight tracking-tighter text-white sm:text-7xl lg:text-8xl sm:leading-[1.02]'>
						Simple digital help for growing businesses.
					</h1>
					<p className='mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg'>
						If you need a website, app, automation, or AI help, we make the process easy to understand.
						No jargon. No guesswork. Just a clear plan and a clean result.
					</p>
					<div className='mt-10 flex flex-col gap-4 sm:flex-row'>
						<Link
							href='/contact'
							className='group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold tracking-wide text-black transition-transform duration-300 hover:-translate-y-0.5'
						>
							Talk to us
							<ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
						</Link>
						<Link
							href='#services'
							className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10'
						>
							See what we do
						</Link>
					</div>
				</motion.div>

                
			</section>

			<section id='services' className='relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12'>
				{isMobile ? (
					<div>
						<div className='max-w-2xl'>
							<p className='text-xs font-bold uppercase tracking-[0.35em] text-zinc-400'>What we can help with</p>
							<h2 className='mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-5xl'>
								Everything we offer, from websites to marketing and PR.
							</h2>
							<p className='mt-4 text-base leading-7 text-zinc-300'>
								We keep the language simple and the work practical. This is the full service range, including digital marketing and public relations, without the jargon.
							</p>
						</div>

						<div className='mt-10 grid gap-4 sm:grid-cols-2'>
							{(isMobile && !showAllServices ? services.slice(0, VISIBLE_COUNT) : services).map((service) => {
								const Icon = service.icon

								return (
									<article
										key={service.title}
										className='group rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-md'
									>
										<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white'>
											<Icon className='h-5 w-5' />
										</div>
										<h3 className='mt-5 font-heading text-2xl font-bold tracking-tight'>{service.title}</h3>
										<p className='mt-3 text-sm leading-7 text-zinc-300'>{service.description}</p>
									</article>
								)
							})}
						</div>

						{isMobile && services.length > VISIBLE_COUNT ? (
							<div className='mt-6 flex justify-center'>
								<button
									type='button'
									onClick={() => setShowAllServices((s) => !s)}
									className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10'
								>
									{showAllServices ? 'Show less' : `View ${services.length - VISIBLE_COUNT} more`}
								</button>
							</div>
						) : null}
					</div>
				) : (
					<motion.div
						variants={staggerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.2 }}
					>
						<motion.div variants={sectionVariants} className='max-w-2xl'>
							<p className='text-xs font-bold uppercase tracking-[0.35em] text-zinc-400'>What we can help with</p>
							<h2 className='mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-5xl'>
								Everything we offer, from websites to marketing and PR.
							</h2>
							<p className='mt-4 text-base leading-7 text-zinc-300'>
								We keep the language simple and the work practical. This is the full service range, including digital marketing and public relations, without the jargon.
							</p>
						</motion.div>

						<div className='mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
							{services.map((service) => {
								const Icon = service.icon

								return (
									<motion.article
										key={service.title}
										variants={itemVariants}
										className='group rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1'
									>
										<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black'>
											<Icon className='h-5 w-5' />
										</div>
										<h3 className='mt-5 font-heading text-2xl font-bold tracking-tight'>{service.title}</h3>
										<p className='mt-3 text-sm leading-7 text-zinc-300'>{service.description}</p>
									</motion.article>
								)
							})}
						</div>
					</motion.div>
				)}
			</section>

			<section className='relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12'>
				<div className='grid gap-6 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] lg:items-start'>
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, x: -24 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.7 }}
						className='rounded-4xl border border-white/10 bg-linear-to-br from-white/8 to-white/4 p-6 sm:p-8 backdrop-blur-md'
					>
						<p className='text-xs font-bold uppercase tracking-[0.35em] text-zinc-400'>How it works</p>
						<h2 className='mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-5xl'>
							A simple process that does not waste your time.
						</h2>
						<div className='mt-8 space-y-4'>
							{steps.map((step) => (
								<div key={step.title} className='rounded-2xl border border-white/10 bg-black/30 p-5'>
									<h3 className='font-heading text-xl font-bold'>{step.title}</h3>
									<p className='mt-2 text-sm leading-7 text-zinc-300'>{step.description}</p>
								</div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={reduceMotion ? false : { opacity: 0, x: 24 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.7, delay: 0.1 }}
						className='rounded-4xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8'
					>
						<div className='flex items-center gap-3 text-zinc-300'>
							<Rocket className='h-5 w-5' />
							<span className='text-xs font-bold uppercase tracking-[0.35em]'>Why people choose us</span>
						</div>
						<h2 className='mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-5xl'>
							Less confusion. More progress.
						</h2>
						<p className='mt-4 text-base leading-7 text-zinc-300'>
							This page is for people who want good digital work without having to learn the technical side first.
						</p>
						<ul className='mt-8 space-y-4'>
							{reasons.map((reason) => (
								<li key={reason} className='flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-zinc-200'>
									<BadgeCheck className='mt-0.5 h-4 w-4 shrink-0 text-zinc-300' />
									<span>{reason}</span>
								</li>
							))}
						</ul>
						<div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
								<p className='text-xs font-bold uppercase tracking-[0.3em] text-zinc-400'>Best for</p>
								<p className='mt-2 text-sm leading-7 text-white'>
									Businesses that want a clean, reliable digital presence.
								</p>
							</div>
							<div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
								<p className='text-xs font-bold uppercase tracking-[0.3em] text-zinc-400'>Location</p>
								<p className='mt-2 text-sm leading-7 text-white'>
									Local and nearby teams.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className='relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12'>
				<motion.div
					variants={staggerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.2 }}
					className='rounded-4xl border border-white/10 bg-white/4 p-8 backdrop-blur-md sm:p-10'
				>
					<motion.div variants={sectionVariants} className='max-w-2xl'>
						<p className='text-xs font-bold uppercase tracking-[0.35em] text-zinc-400'>Common questions</p>
						<h2 className='mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-5xl'>
							Quick answers in plain language.
						</h2>
					</motion.div>

					<div className='mt-8 space-y-3'>
						{faqs.map((faq, index) => {
							const isOpen = openFaq === index

							return (
								<div key={faq.question} className='rounded-2xl border border-white/10 bg-black/40'>
									<button
										type='button'
										onClick={() => setOpenFaq(isOpen ? null : index)}
										className='flex w-full items-center justify-between gap-4 px-5 py-5 text-left'
										aria-expanded={isOpen}
									>
										<span className='font-heading text-lg font-bold tracking-tight sm:text-xl'>{faq.question}</span>
										<ChevronDown className={`h-5 w-5 shrink-0 text-zinc-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
									</button>
									<AnimatePresence initial={false}>
										{isOpen ? (
											<motion.div
												key='faq-answer'
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: 'auto', opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.35 }}
												className='overflow-hidden'
											>
												<p className='px-5 pb-5 text-sm leading-7 text-zinc-300'>{faq.answer}</p>
											</motion.div>
										) : null}
									</AnimatePresence>
								</div>
							)
						})}
					</div>
				</motion.div>
			</section>

			<section className='relative mx-auto w-full max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-12'>
				<div className='rounded-4xl border border-white/10 bg-linear-to-br from-white/8 via-white/5 to-white/4 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-12'>
					<div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
						<div>
							<p className='text-xs font-bold uppercase tracking-[0.35em] text-zinc-400'>Ready when you are</p>
							<h2 className='mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-5xl'>
								Let’s make your next digital project easier.
							</h2>
							<p className='mt-4 max-w-2xl text-base leading-7 text-zinc-300'>
								If you want a page, app, or system that feels modern and is simple for your team to use, we can help you plan it clearly.
							</p>
						</div>
						<div className='flex flex-col gap-4 sm:flex-row lg:justify-end'>
							<Link
								href='/contact'
								className='inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold tracking-wide text-black transition-transform duration-300 hover:-translate-y-0.5'
							>
								Start a project
								<ArrowRight className='h-4 w-4' />
							</Link>
							<Link
								href='/services'
								className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/20 px-6 py-3.5 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10'
							>
								Explore services
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}