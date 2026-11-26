import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, MapPin, ChevronDown, Briefcase, Landmark, FolderOpen, Users } from 'lucide-react'
import './kumbh.css'
import Reveal from './Reveal'
import Mandala from './Mandala'
import HeroVideo from './HeroVideo'
import ApplySection from './ApplySection'

const CLD = 'https://res.cloudinary.com/dhlvq35cc/video/upload'
const CLD_ID = 'v1795680479/DJI_0539_3_uudnfd'
// Optimised: H.264, 1600px wide, auto-eco quality (original is 7 MB). Poster = first frame.
const HERO_VIDEO = process.env.NEXT_PUBLIC_KUMBH_HERO_VIDEO || `${CLD}/f_mp4,vc_h264,q_auto:eco,w_1600/${CLD_ID}.mp4`
const HERO_POSTER = `${CLD}/so_0,f_jpg,q_auto,w_1600/${CLD_ID}.jpg`

export const metadata: Metadata = {
	title: 'Kumbh 2027 Internship & Volunteer Programme, Haridwar',
	description:
		'Join the Kumbh 2027 programme in Haridwar. Internships and volunteer roles for college students, plus partnerships for institutions and media houses. Real field experience alongside officials and administration teams.',
	alternates: { canonical: 'https://www.thecraftsync.com/kumbh-2027' },
	openGraph: {
		title: 'Kumbh 2027 Internship & Volunteer Programme, Haridwar',
		description:
			'Real experience at the Kumbh. Apply as a college, a student volunteer or a media partner.',
		url: 'https://www.thecraftsync.com/kumbh-2027',
		images: [{ url: '/kumbh/haridwar-ghats.jpg', width: 1600, height: 1067 }],
	},
}

const TRACK_CARDS = [
	{
		n: '01',
		title: 'Video Editing & Content Creation',
		text: 'Cut reels, highlights and documentary pieces from the ghats, camps and ceremonies.',
		img: '/kumbh/aerial-boats.jpg',
		alt: 'Aerial view of colourful boats and a vast crowd at the Kumbh Mela',
		span: 'md:col-span-3',
		h: 'h-[200px] sm:h-[280px] md:h-[420px]',
	},
	{
		n: '02',
		title: 'Digital Media & Creator Outreach',
		text: 'Bring creators, pages and communities into the story and amplify what happens on the ground.',
		img: '/kumbh/garlanded-sadhu.jpg',
		alt: 'A sadhu adorned with marigold garlands at the Kumbh',
		span: 'md:col-span-3',
		h: 'h-[200px] sm:h-[280px] md:h-[420px]',
	},
	{
		n: '03',
		title: 'Journalism, Reporting & Documentation',
		text: 'Report, interview and document. Field notes, captions, daily briefs and press support.',
		img: '/kumbh/sadhu-camp.jpg',
		alt: 'Sadhus in saffron robes gathered at the Kumbh',
		span: 'md:col-span-2',
		h: 'h-[200px] sm:h-[280px] md:h-[320px]',
	},
	{
		n: '04',
		title: 'Ground & Crowd Management Support',
		text: 'Help pilgrims find their way, with information desks and queue coordination beside the administration.',
		img: '/kumbh/pilgrims-crowd.jpg',
		alt: 'A large gathering of pilgrims and sadhus at the mela',
		span: 'md:col-span-2',
		h: 'h-[200px] sm:h-[280px] md:h-[320px]',
	},
	{
		n: '05',
		title: 'Digital Technology & Data Support',
		text: 'Build the dashboards, registrations and helpdesk tools that keep things running behind the scenes.',
		img: '/kumbh/haridwar-ghats.jpg',
		alt: 'The ghats of Haridwar with the clock tower and pilgrims along the Ganga',
		span: 'md:col-span-2',
		h: 'h-[200px] sm:h-[280px] md:h-[320px]',
	},
]

const BENEFITS = [
	{
		t: 'Real field experience', icon: Briefcase,
		d: 'Work on live operations at one of the largest gatherings on Earth, not a classroom simulation.',
	},
	{
		t: 'Work alongside officials', icon: Landmark,
		d: 'Coordinate with government officials and administration teams on the ground.',
	},
	{
		t: 'Portfolio-ready work', icon: FolderOpen,
		d: 'Reels, reports, dashboards and documentation you can show to employers.',
	},
	{
		t: 'Mentors and network', icon: Users,
		d: 'Guidance from working professionals and contacts across media, institutions and tech.',
	},
]

const STEPS = [
	{ n: '1', t: 'Choose your path', d: 'College, student volunteer or media partner.' },
	{ n: '2', t: 'Send your application', d: 'A short form. Our team reviews every submission.' },
	{ n: '3', t: 'Get onboarded', d: 'Shortlisted applicants receive orientation and deployment details.' },
]

export default function Kumbh2027Page() {
	return (
		<main className='kumbh'>
			{/* ───────────── HERO ───────────── */}
			<section className='relative flex min-h-[100svh] items-end overflow-hidden bg-black'>
				<div className='absolute inset-0'>
					<div className='absolute inset-y-0 right-0 w-full overflow-hidden'>
						<Image
							src={HERO_POSTER}
							alt=''
							fill
							priority
							sizes='100vw'
							className='kb-drift object-cover object-center'
						/>
					</div>
					<HeroVideo src={HERO_VIDEO} poster={HERO_POSTER} />
					<div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.12)_55%,#140b07)] lg:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.15)_55%,#140b07)]' />
					<div className='absolute inset-0 hidden bg-linear-to-r from-[var(--ink)]/85 via-[var(--ink)]/35 to-transparent lg:block' />
				</div>

				<div className='relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 md:px-8 md:pb-24'>
					<h1 className='max-w-4xl font-heading text-[2.7rem] font-light leading-[1.02] tracking-tight text-[var(--cream)] sm:text-6xl md:text-7xl lg:text-[5.6rem]'>
						Intern at the Kumbh 2027,{' '}
						<em className='font-light not-italic text-[var(--saffron)]'>Haridwar.</em>
					</h1>
					<p className='mt-7 max-w-xl text-[15px] leading-relaxed text-[var(--cream)]/80 md:text-lg'>
						Hands-on internships for college students, working alongside officials and administration
						teams at one of the largest gatherings in the world.
					</p>

					<div className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center'>
						<a
							href='#apply'
							className='group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--saffron)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--ink)] transition-all hover:bg-[var(--marigold)] hover:shadow-[0_10px_40px_-8px_rgba(242,140,26,0.7)]'>
							Apply for the internship
							<ArrowRight size={16} className='transition-transform group-hover:translate-x-1' />
						</a>
						<a
							href='#tracks'
							className='inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--cream)] transition-colors hover:border-[var(--marigold)] hover:text-[var(--marigold)]'>
							See internship roles
						</a>
					</div>

				</div>

				<ChevronDown
					className='absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/40 md:block'
					size={22}
				/>
			</section>

			{/* ───────────── BENEFITS ───────────── */}
			<section className='relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#7a2214_0%,#3a0f0b_52%,#260805_100%)] py-20 md:py-32'>
				<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[var(--marigold)] to-transparent' />
				<div className='absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[var(--marigold)]/60 to-transparent' />
				<Mandala className='pointer-events-none absolute -bottom-56 -left-56 h-[680px] w-[680px] text-[var(--saffron)] opacity-[0.12]' />
				<Mandala className='pointer-events-none absolute -right-64 -top-64 h-[620px] w-[620px] text-[var(--marigold)] opacity-[0.1]' />

				<div className='relative mx-auto max-w-6xl px-5 md:px-8'>
					<Reveal className='mx-auto mb-10 max-w-4xl text-center md:mb-14'>
						<p className='mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--marigold)]/50 bg-[var(--marigold)]/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--marigold)] md:text-xs'>
							<span className='h-1.5 w-1.5 rounded-full bg-[var(--marigold)]' />
							Internship opportunity
						</p>
						<h2 className='font-heading text-[2.6rem] font-light leading-[1.02] text-[var(--cream)] sm:text-6xl md:text-7xl lg:text-[5.4rem]'>
							A{' '}
							<span className='bg-linear-to-r from-[var(--saffron)] to-[var(--marigold)] bg-clip-text font-normal text-transparent'>
								rare
							</span>{' '}
							internship opportunity.
						</h2>
						<p className='mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--cream)]/70 md:text-lg'>
							What you take home from Haridwar.
						</p>
					</Reveal>

					{/* Banner */}
					<Reveal className='relative'>
						<div className='relative h-[240px] overflow-hidden rounded-[1.75rem] sm:h-[320px] md:h-[400px] md:rounded-[2.25rem]'>
							<Image
								src='/kumbh/har-ki-pauri.jpg'
								alt='Pilgrims along the ghats of Har Ki Pauri in Haridwar'
								fill
								sizes='(min-width:1152px) 1100px, 100vw'
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-[var(--maroon-deep)] via-[var(--maroon-deep)]/30 to-transparent' />
							<div className='absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[var(--marigold)]/40' />
							<div className='absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/45 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--marigold)] backdrop-blur-sm md:left-7 md:top-7'>
								<MapPin size={13} /> Haridwar · Kumbh 2027
							</div>
						</div>
					</Reveal>

					{/* Four equal cards, overlapping the banner */}
					<ol className='relative z-10 -mt-14 grid gap-4 px-2 sm:grid-cols-2 sm:px-4 md:-mt-20 md:px-8 lg:grid-cols-4'>
						{BENEFITS.map((b, i) => {
							const Icon = b.icon
							return (
								<Reveal
									as='li'
									key={b.t}
									delay={i * 80}
									className='group flex flex-col rounded-3xl border border-[var(--marigold)]/35 bg-[#2c0c08]/95 p-6 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--marigold)] hover:bg-[#3a110b]'>
									<div className='flex items-center justify-between'>
										<span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[var(--marigold)] to-[var(--saffron)] text-[var(--ink)] transition-transform duration-300 group-hover:scale-110'>
											<Icon size={22} strokeWidth={1.8} />
										</span>
										<span className='font-heading text-3xl font-light leading-none text-[var(--cream)]/25'>
											{String(i + 1).padStart(2, '0')}
										</span>
									</div>
									<h3 className='mt-6 font-heading text-xl leading-snug text-[var(--cream)] md:text-[1.35rem]'>
										{b.t}
									</h3>
									<p className='mt-3 text-[14.5px] leading-relaxed text-[var(--cream)]/70'>{b.d}</p>
								</Reveal>
							)
						})}
					</ol>

					{/* Call to action */}
					<Reveal className='mt-12 flex flex-col items-center gap-4 text-center md:mt-16'>
						<a
							href='#apply'
							className='group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--saffron)] px-9 py-4 text-sm font-bold uppercase tracking-wider text-[var(--ink)] transition-all hover:bg-[var(--marigold)] hover:shadow-[0_10px_40px_-8px_rgba(242,140,26,0.7)]'>
							Apply for the internship
							<ArrowRight size={16} className='transition-transform group-hover:translate-x-1' />
						</a>
						<p className='text-xs uppercase tracking-[0.2em] text-[var(--cream)]/50'>
							Colleges · Student volunteers · Media partners
						</p>
					</Reveal>
				</div>
			</section>

			{/* ───────────── TRACKS ───────────── */}
			<section id='tracks' className='relative scroll-mt-16 bg-[var(--ink)] py-24 md:py-32'>
				<div className='mx-auto max-w-6xl px-5 md:px-8'>
					<Reveal className='mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end'>
						<div className='max-w-2xl'>
							<p className='mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--marigold)]'>
								Internship roles
							</p>
							<h2 className='font-heading text-4xl font-light leading-[1.05] md:text-6xl'>
								Choose your internship track.
							</h2>
						</div>
						
					</Reveal>

					<div className='grid gap-3 md:grid-cols-6 md:gap-4'>
						{TRACK_CARDS.map((c, i) => (
							<Reveal key={c.n} delay={(i % 3) * 80} className={c.span}>
								<article className={`group relative overflow-hidden rounded-3xl ${c.h}`}>
									<Image
										src={c.img}
										alt={c.alt}
										fill
										sizes='(min-width:768px) 50vw, 100vw'
										className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]'
									/>
									<div className='absolute inset-0 bg-linear-to-t from-[#140b07] via-[#140b07]/55 to-transparent' />
									<div className='absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-[var(--saffron)]/70' />
									<div className='absolute inset-x-0 bottom-0 p-4 md:p-7'>
										<span className='font-heading text-xs tracking-[0.2em] text-[var(--saffron)] md:text-sm'>
											{c.n}
										</span>
										<h3 className='mt-1 font-heading text-lg leading-tight text-[var(--cream)] md:mt-2 md:text-2xl'>
											{c.title}
										</h3>
										<p className='mt-1.5 line-clamp-2 max-w-md text-[12.5px] leading-snug text-[var(--cream)]/75 md:mt-2 md:line-clamp-none md:text-[13.5px] md:leading-relaxed'>
											{c.text}
										</p>
									</div>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ───────────── HOW IT WORKS ───────────── */}
			<section className='relative bg-[var(--cream)] py-24 text-[var(--brown)] md:py-28'>
				<div className='mx-auto max-w-6xl px-5 md:px-8'>
					<Reveal className='mb-14'>
						<p className='mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--vermilion)]'>
							How to apply
						</p>
						<h2 className='font-heading text-4xl font-light leading-[1.05] md:text-6xl'>
							Apply in three steps.
						</h2>
					</Reveal>
					<div className='relative grid gap-10 md:grid-cols-3'>
						<div className='absolute left-0 right-0 top-[27px] hidden border-t border-dashed border-[var(--saffron)]/60 md:block' />
						{STEPS.map((s, i) => (
							<Reveal key={s.n} delay={i * 100} className='relative'>
								<span className='relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--saffron)] font-heading text-xl text-[var(--ink)] ring-8 ring-[var(--cream)]'>
									{s.n}
								</span>
								<h3 className='mt-6 font-heading text-2xl'>{s.t}</h3>
								<p className='mt-2 max-w-xs text-[15px] leading-relaxed text-[var(--brown)]/70'>{s.d}</p>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ───────────── APPLY ───────────── */}
			<ApplySection />
		</main>
	)
}
