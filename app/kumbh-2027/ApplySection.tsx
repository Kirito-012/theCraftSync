'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
	ArrowRight,
	Camera,
	Check,
	CircleAlert,
	GraduationCap,
	Landmark,
	Loader2,
	Minus,
	Plus,
} from 'lucide-react'
import {
	KUMBH_FORMS,
	KUMBH_TYPES,
	isFreeEmail,
	normalizeValue,
	validateKumbh,
	type KumbhField,
	type KumbhType,
} from '../lib/kumbhForms'

type Value = string | string[] | boolean
type Values = Record<string, Value>

// Presentation per audience: each form gets its own colour, image and voice.
const THEME: Record<
	KumbhType,
	{
		dark: boolean
		accent: string
		accentText: string
		icon: typeof Landmark
		kicker: string
		title: string
		blurb: string
		image: string
		imageAlt: string
		submit: string
		next: string[]
		groups: Record<string, string>
	}
> = {
	institution: {
		dark: true,
		accent: '#f7b733',
		accentText: '#2b160d',
		icon: Landmark,
		kicker: 'For colleges & universities',
		title: 'Nominate your students',
		blurb:
			'Register your institution and the departments you want to send. A nodal officer from your side becomes our single point of contact.',
		image: '/kumbh/har-ki-pauri.jpg',
		imageAlt: 'The ghats of Har Ki Pauri in Haridwar crowded with pilgrims',
		submit: 'Submit nomination',
		next: [
			'We review your nomination and call your nodal officer.',
			'Together we fix the number of students and tracks.',
			'Your students get orientation before they travel.',
		],
		groups: {
			institutionName: 'Institution',
			principalName: 'Point of contact',
			studentCount: 'Nomination',
		},
	},
	volunteer: {
		dark: false,
		accent: '#f26a2a',
		accentText: '#ffffff',
		icon: GraduationCap,
		kicker: 'For students',
		title: 'Volunteer at the Kumbh',
		blurb:
			'Tell us who you are, what you can do and which track fits you. Skills matter more than marks. Show us your work.',
		image: '/kumbh/sadhu-smile.jpg',
		imageAlt: 'A smiling sadhu at the Kumbh Mela',
		submit: 'Submit my application',
		next: [
			'Our team reviews your profile and portfolio.',
			'Shortlisted students are contacted on WhatsApp and email.',
			'Orientation and training happen before deployment.',
		],
		groups: {
			fullName: 'About you',
			college: 'Education',
			track: 'Where you fit',
			languages: 'Availability',
		},
	},
	media: {
		dark: false,
		accent: '#3fb6ad',
		accentText: '#06292b',
		icon: Camera,
		kicker: 'For news & creators',
		title: 'Propose a collaboration',
		blurb:
			'News channels, publishers, journalists, influencers and creators: share your platform and what you would like to build with us.',
		image: '/kumbh/boats-ganges.jpg',
		imageAlt: 'Boats gathered on the Ganga during the Kumbh',
		submit: 'Send proposal',
		next: [
			'We study your platform and proposal.',
			'A partnerships lead reaches out to discuss scope.',
			'Accreditation and access details are shared with confirmed partners.',
		],
		groups: {
			organisation: 'Who you are',
			platformLinks: 'Your platform',
			collabInterests: 'Your proposal',
		},
	},
}

function initial(type: KumbhType): Values {
	const v: Values = {}
	for (const f of KUMBH_FORMS[type].fields) {
		v[f.name] = f.type === 'multicheck' ? [] : f.type === 'checkbox' ? false : ''
	}
	return v
}

export default function ApplySection() {
	const [type, setType] = useState<KumbhType>('volunteer')
	const [values, setValues] = useState<Values>(() => initial('volunteer'))
	const [touched, setTouched] = useState<Record<string, boolean>>({})
	const [attempted, setAttempted] = useState(false)
	const [serverErrors, setServerErrors] = useState<Record<string, string>>({})
	const [busy, setBusy] = useState(false)
	const [serverError, setServerError] = useState('')
	const [done, setDone] = useState<{ ref: string } | null>(null)
	const panelRef = useRef<HTMLDivElement>(null)

	const cfg = KUMBH_FORMS[type]
	const theme = THEME[type]
	const dark = theme.dark

	// Live validation: always computed, but only shown once a field was touched / submit attempted
	const live = useMemo(() => validateKumbh(type, values), [type, values])
	const shown = (name: string) =>
		touched[name] || attempted ? serverErrors[name] || live[name] || '' : ''
	const errorCount = Object.keys(live).length

	const reset = (t: KumbhType) => {
		setValues(initial(t))
		setTouched({})
		setAttempted(false)
		setServerErrors({})
		setServerError('')
	}

	const select = (t: KumbhType) => {
		if (t === type) return
		setType(t)
		reset(t)
		setDone(null)
	}

	// Deep links from the hero buttons: #apply-institution etc. (on load and when the hash changes)
	useEffect(() => {
		const sync = () => {
			const m = window.location.hash.match(/^#apply-(institution|volunteer|media)$/)
			if (!m) return
			const t = m[1] as KumbhType
			setType(t)
			reset(t)
			setDone(null)
		}
		sync()
		window.addEventListener('hashchange', sync)
		return () => window.removeEventListener('hashchange', sync)
	}, [])

	const set = (name: string, v: Value) => {
		setValues((p) => ({ ...p, [name]: v }))
		if (serverErrors[name]) setServerErrors((p) => ({ ...p, [name]: '' }))
	}
	const blur = (name: string) => setTouched((p) => (p[name] ? p : { ...p, [name]: true }))

	const focusField = (name: string) => {
		const el = document.getElementById(`kb-${name}`)
		if (!el) return
		el.scrollIntoView({ behavior: 'smooth', block: 'center' })
		const target = el.matches('input,select,textarea,button') ? el : el.querySelector<HTMLElement>('button,input')
		window.setTimeout(() => target?.focus({ preventScroll: true }), 350)
	}

	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (busy) return
		setServerError('')
		setAttempted(true)
		const first = cfg.fields.find((f) => live[f.name])
		if (first) {
			focusField(first.name)
			return
		}
		setBusy(true)
		try {
			const form = e.currentTarget as HTMLFormElement
			const website = (form.elements.namedItem('website') as HTMLInputElement | null)?.value || ''
			// Send normalised values (trimmed, tidy phone / lowercase email)
			const data: Record<string, unknown> = {}
			for (const f of cfg.fields) data[f.name] = normalizeValue(f, values[f.name])
			const res = await fetch('/api/kumbh', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type, data, website }),
			})
			const json = await res.json().catch(() => ({}))
			if (!res.ok || !json.success) {
				if (json.errors) {
					setServerErrors(json.errors)
					const f = cfg.fields.find((x) => json.errors[x.name])
					if (f) focusField(f.name)
				}
				setServerError(json.message || 'Could not submit. Please try again.')
				return
			}
			setDone({ ref: String(json.id || '').slice(-6).toUpperCase() })
			panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		} catch {
			setServerError('Network problem. Please check your connection and try again.')
		} finally {
			setBusy(false)
		}
	}

	// Split fields into sections; a new section starts at every field that has a heading
	const sections = useMemo(() => {
		const out: { title: string; fields: KumbhField[] }[] = []
		for (const f of cfg.fields) {
			const title = theme.groups[f.name]
			if (title || out.length === 0) out.push({ title: title || '', fields: [] })
			out[out.length - 1].fields.push(f)
		}
		return out
	}, [cfg, theme])

	const muted = dark ? 'text-[var(--cream)]/60' : 'text-[var(--brown)]/55'

	return (
		<section
			id='apply'
			className='relative scroll-mt-20 overflow-hidden bg-[var(--maroon-deep)] py-14 md:py-32'>
			{KUMBH_TYPES.map((t) => (
				<span key={t} id={`apply-${t}`} className='absolute top-0 h-px w-px' aria-hidden />
			))}
			<div className='pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#f28c1a_1px,transparent_1px)] [background-size:26px_26px]' />

			<div className='relative mx-auto max-w-6xl px-5 md:px-8'>
				<div className='mb-7 max-w-2xl md:mb-12'>
					<p className='mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--marigold)] md:mb-4'>
						Apply
					</p>
					<h2 className='font-heading text-3xl font-light leading-[1.05] text-[var(--cream)] sm:text-4xl md:text-6xl'>
						Apply for the internship.
					</h2>
					<p className='mt-5 hidden text-[15px] leading-relaxed text-[var(--cream)]/70 md:block'>
						Choose how you want to join. Each path has its own short form.
					</p>
				</div>

				{/* Audience selector */}
				<div role='tablist' aria-label='Application type' className='mb-5 grid grid-cols-3 gap-2 md:mb-8 md:gap-3'>
					{KUMBH_TYPES.map((t) => {
						const th = THEME[t]
						const on = t === type
						const Icon = th.icon
						return (
							<button
								key={t}
								role='tab'
								aria-selected={on}
								onClick={() => select(t)}
								style={{ ['--c' as string]: th.accent }}
								className={`group relative flex flex-col items-center overflow-hidden rounded-xl border px-2 py-3 text-center transition-all duration-300 md:block md:rounded-2xl md:p-6 md:text-left ${
									on
										? 'border-[var(--c)] bg-[var(--c)]/10'
										: 'border-white/10 bg-white/[0.03] hover:border-white/30'
								}`}>
								<span
									className='absolute inset-x-0 top-0 h-[3px] origin-left bg-[var(--c)] transition-transform duration-500'
									style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)' }}
								/>
								<div className='flex items-start justify-between'>
									<span className='flex h-9 w-9 items-center justify-center rounded-full border border-[var(--c)]/60 text-[var(--c)] md:h-11 md:w-11'>
										<Icon size={18} strokeWidth={1.6} />
									</span>
									<span
										className={`hidden h-6 w-6 items-center justify-center rounded-full border text-[var(--ink)] transition-all md:flex ${
											on ? 'border-[var(--c)] bg-[var(--c)] opacity-100' : 'border-white/25 opacity-60'
										}`}>
										{on && <Check size={14} strokeWidth={3} />}
									</span>
								</div>
								<p className='mt-5 hidden text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--c)] md:block'>
									{th.kicker}
								</p>
								<p className='mt-2 font-heading text-[13px] leading-tight text-[var(--cream)] md:mt-1 md:text-2xl'>
									<span className='md:hidden'>{KUMBH_FORMS[t].short}</span>
									<span className='hidden md:inline'>{KUMBH_FORMS[t].label}</span>
								</p>
							</button>
						)
					})}
				</div>

				{/* Form panel */}
				<div
					ref={panelRef}
					key={type}
					style={{ ['--accent' as string]: theme.accent }}
					className={`grid scroll-mt-24 overflow-hidden rounded-3xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] lg:grid-cols-[0.82fr_1.4fr] ${
						dark
							? 'kb-dark bg-[linear-gradient(160deg,#3a0f0b,#2a0b08_60%,#210806)] text-[var(--cream)] ring-1 ring-[var(--marigold)]/40'
							: 'bg-[var(--cream)] text-[var(--brown)]'
					}`}>
					{/* Side */}
					<aside className='relative hidden min-h-[260px] flex-col justify-end overflow-hidden p-7 text-[var(--cream)] lg:flex lg:min-h-full lg:justify-start lg:p-9'>
						<Image
							src={theme.image}
							alt={theme.imageAlt}
							fill
							sizes='(min-width:1024px) 34vw, 100vw'
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-linear-to-t from-[#1b0a05] via-[#1b0a05]/90 to-[#1b0a05]/70 lg:bg-linear-to-b lg:from-[#1b0a05]/90 lg:via-[#1b0a05]/70 lg:to-[#1b0a05]/35' />
						<div className='absolute inset-x-0 top-0 h-1.5' style={{ background: theme.accent }} />
						<div className='relative lg:sticky lg:top-24 lg:pt-4'>
							<p
								className='mb-3 text-[11px] font-bold uppercase tracking-[0.25em]'
								style={{ color: theme.accent }}>
								{theme.kicker}
							</p>
							<h3 className='font-heading text-3xl font-light leading-tight md:text-4xl'>{theme.title}</h3>
							<p className='mt-4 text-sm leading-relaxed text-[var(--cream)]/80'>{theme.blurb}</p>
							<ol className='mt-7 space-y-3 border-t border-white/15 pt-6'>
								{theme.next.map((s, i) => (
									<li key={s} className='flex gap-3 text-[13px] leading-snug text-[var(--cream)]/85'>
										<span
											className='mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold'
											style={{ background: theme.accent, color: theme.accentText }}>
											{i + 1}
										</span>
										{s}
									</li>
								))}
							</ol>
						</div>
					</aside>

					{/* Fields / success */}
					<div className='p-4 sm:p-6 md:p-10'>
						<div className='mb-5 flex items-center gap-3 lg:hidden'>
							<span className='h-9 w-1 rounded-full' style={{ background: theme.accent }} />
							<div>
								<p className='text-[10px] font-bold uppercase tracking-[0.22em]' style={{ color: theme.accent }}>
									{theme.kicker}
								</p>
								<p className='font-heading text-xl leading-tight'>{theme.title}</p>
							</div>
						</div>
						{done ? (
							<div className='flex h-full min-h-[420px] flex-col items-center justify-center text-center' role='status'>
								<span
									className='mb-6 flex h-16 w-16 items-center justify-center rounded-full'
									style={{ background: theme.accent, color: theme.accentText }}>
									<Check size={30} strokeWidth={2.5} />
								</span>
								<h3 className='font-heading text-3xl'>
									{dark ? 'Nomination received' : 'Application received'}
								</h3>
								<p className={`mt-3 max-w-md text-[15px] leading-relaxed ${dark ? 'text-[var(--cream)]/70' : 'text-[var(--brown)]/70'}`}>
									Thank you. Our team will review it and contact you on the email and number you
									provided. Please keep an eye on your inbox.
								</p>
								{done.ref && (
									<p className={`mt-6 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest ${dark ? 'border-white/20 text-[var(--cream)]/60' : 'border-[var(--brown)]/15 text-[var(--brown)]/60'}`}>
										REFERENCE · {done.ref}
									</p>
								)}
								<button
									onClick={() => {
										setDone(null)
										reset(type)
									}}
									className='mt-8 text-sm font-semibold underline underline-offset-4 hover:text-[var(--saffron)]'>
									Submit another {dark ? 'nomination' : 'application'}
								</button>
							</div>
						) : (
							<form onSubmit={submit} noValidate>
								{dark && (
									<div className='mb-7 hidden items-center gap-4 border-b border-[var(--marigold)]/25 pb-6 md:flex'>
										<span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--marigold)]/60 text-[var(--marigold)]'>
											<Landmark size={22} strokeWidth={1.5} />
										</span>
										<div>
											<p className='text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--marigold)]'>
												Institutional nomination
											</p>
											<p className='mt-0.5 font-heading text-xl'>Kumbh 2027 Internship Programme</p>
										</div>
									</div>
								)}

								<div className={dark ? 'space-y-5' : 'space-y-7'}>
									{sections.map((sec, si) => {
										const grid = (
											<div className='grid gap-x-5 gap-y-5 md:grid-cols-2'>
												{sec.fields.map((f) => (
													<FieldBlock
														key={f.name}
														f={f}
														value={values[f.name]}
														error={shown(f.name)}
														valid={!!touched[f.name] && !live[f.name]}
														onChange={(v) => set(f.name, v)}
														onBlur={() => blur(f.name)}
														accent={theme.accent}
														accentText={theme.accentText}
														dark={dark}
													/>
												))}
											</div>
										)
										return dark ? (
											<fieldset
												key={si}
												className='rounded-2xl border border-[var(--marigold)]/25 bg-white/[0.03] p-4 md:p-6'>
												<legend className='-ml-1 flex items-center gap-3 px-2'>
													<span className='font-heading text-sm tracking-[0.2em] text-[var(--marigold)]'>
														{String(si + 1).padStart(2, '0')}
													</span>
													<span className='font-heading text-lg'>{sec.title}</span>
												</legend>
												<div className='pt-3'>{grid}</div>
											</fieldset>
										) : (
											<div key={si}>
												{sec.title && (
													<div className='mb-5 flex items-center gap-3'>
														<span className='h-2 w-2 rotate-45' style={{ background: theme.accent }} />
														<h4 className='font-heading text-lg'>{sec.title}</h4>
														<span className='h-px flex-1 bg-[var(--brown)]/12' />
													</div>
												)}
												{grid}
											</div>
										)
									})}
								</div>

								{/* honeypot */}
								<div className='absolute -left-[9999px] h-0 w-0 overflow-hidden' aria-hidden>
									<label>
										Website
										<input type='text' name='website' tabIndex={-1} autoComplete='off' />
									</label>
								</div>

								{(serverError || (attempted && errorCount > 0)) && (
									<div
										role='alert'
										className={`mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
											dark
												? 'border-[#ff9b7e]/40 bg-[#ff9b7e]/10 text-[#ffb9a4]'
												: 'border-[var(--vermilion)]/30 bg-[var(--vermilion)]/10 text-[var(--vermilion)]'
										}`}>
										<CircleAlert size={18} className='mt-px shrink-0' />
										<span>
											{serverError ||
												`Please fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} marked below.`}
										</span>
									</div>
								)}

								<div className={`mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${dark ? 'border-white/10' : 'border-[var(--brown)]/10'}`}>
									<p className={`max-w-xs text-xs leading-relaxed ${muted}`}>
										Your details are used only to process this application and are shared only with
										the Kumbh 2027 programme team.
									</p>
									<button
										type='submit'
										disabled={busy}
										style={{ background: theme.accent, color: theme.accentText }}
										className='inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:brightness-95 hover:shadow-lg disabled:opacity-60'>
										{busy ? (
											<>
												<Loader2 size={16} className='animate-spin' /> Sending
											</>
										) : (
											<>
												{theme.submit} <ArrowRight size={16} />
											</>
										)}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

function FieldBlock({
	f,
	value,
	error,
	valid,
	onChange,
	onBlur,
	accent,
	accentText,
	dark,
}: {
	f: KumbhField
	value: Value
	error: string
	valid: boolean
	onChange: (v: Value) => void
	onBlur: () => void
	accent: string
	accentText: string
	dark: boolean
}) {
	const id = `kb-${f.name}`
	const errId = `${id}-err`
	const helpId = `${id}-help`
	const span = f.full || f.type === 'textarea' || f.type === 'multicheck' || f.type === 'checkbox' ? 'md:col-span-2' : ''
	const errColor = dark ? 'text-[var(--err)]' : 'text-[var(--vermilion)]'
	const text = typeof value === 'string' ? value : ''

	const aria = {
		'aria-invalid': !!error,
		'aria-required': f.required || undefined,
		'aria-describedby': error ? errId : f.help ? helpId : undefined,
	}

	const labelEl = (
		<label
			htmlFor={id}
			className={`mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] ${dark ? 'text-[var(--cream)]/75' : 'text-[var(--brown)]/75'}`}>
			{f.label}
			{f.required && f.type !== 'checkbox' && <span className={errColor}> *</span>}
		</label>
	)

	const errorEl = error && (
		<p id={errId} role='alert' className={`mt-1.5 text-xs font-medium ${errColor}`}>
			{error}
		</p>
	)

	if (f.type === 'checkbox') {
		return (
			<div className={span}>
				<label
					htmlFor={id}
					className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
						error ? (dark ? 'border-[var(--err)]' : 'border-[var(--vermilion)]') : dark ? 'border-white/15 bg-white/5' : 'border-[var(--brown)]/15 bg-white/60'
					}`}>
					<input
						id={id}
						type='checkbox'
						checked={value === true}
						onChange={(e) => onChange(e.target.checked)}
						onBlur={onBlur}
						className='mt-0.5 h-4 w-4 shrink-0'
						style={{ accentColor: accent }}
						{...aria}
					/>
					<span className='text-sm leading-snug'>{f.label}</span>
				</label>
				{errorEl}
			</div>
		)
	}

	let control: React.ReactNode
	if (f.type === 'select') {
		control = (
			<select
				id={id}
				value={text}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				className='kb-field kb-select'
				{...aria}>
				<option value=''>Select…</option>
				{f.options?.map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</select>
		)
	} else if (f.type === 'textarea') {
		control = (
			<>
				<textarea
					id={id}
					rows={4}
					value={text}
					placeholder={f.placeholder}
					maxLength={f.maxLength}
					onChange={(e) => onChange(e.target.value)}
					onBlur={onBlur}
					className='kb-field resize-y'
					{...aria}
				/>
				{f.maxLength && (
					<p className={`mt-1 text-right text-[11px] ${dark ? 'text-[var(--cream)]/40' : 'text-[var(--brown)]/40'}`}>
						{text.length}/{f.maxLength}
					</p>
				)}
			</>
		)
	} else if (f.type === 'multicheck') {
		const arr = (value as string[]) || []
		const toggle = (o: string) => onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o])
		control = dark ? (
			// Institution: roomy selectable tiles
			<div id={id} role='group' aria-label={f.label} aria-describedby={aria['aria-describedby']} className='grid gap-2.5 sm:grid-cols-2'>
				{f.options?.map((o, i) => {
					const on = arr.includes(o)
					return (
						<button
							type='button'
							key={o}
							aria-pressed={on}
							onClick={() => {
								toggle(o)
								onBlur()
							}}
							style={on ? { borderColor: accent, background: 'rgba(247,183,51,0.12)' } : undefined}
							className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[13.5px] leading-snug transition-colors ${
								on ? 'text-[var(--cream)]' : 'border-white/15 bg-white/[0.04] text-[var(--cream)]/80 hover:border-white/40'
							} ${i === (f.options?.length || 0) - 1 && (f.options?.length || 0) % 2 === 1 ? 'sm:col-span-2' : ''}`}>
							<span
								className='flex h-5 w-5 shrink-0 items-center justify-center rounded border'
								style={on ? { background: accent, borderColor: accent, color: accentText } : { borderColor: 'rgba(251,241,222,0.35)' }}>
								{on && <Check size={13} strokeWidth={3} />}
							</span>
							{o}
						</button>
					)
				})}
			</div>
		) : (
			<div id={id} className='flex flex-wrap gap-2' role='group' aria-label={f.label} aria-describedby={aria['aria-describedby']}>
				{f.options?.map((o) => {
					const on = arr.includes(o)
					return (
						<button
							type='button'
							key={o}
							aria-pressed={on}
							onClick={() => {
								toggle(o)
								onBlur()
							}}
							style={on ? { background: accent, borderColor: accent, color: accentText } : undefined}
							className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
								on ? '' : 'border-[var(--brown)]/20 bg-white/70 text-[var(--brown)]/80 hover:border-[var(--brown)]/50'
							}`}>
							{on && <Check size={13} strokeWidth={3} />}
							{o}
						</button>
					)
				})}
			</div>
		)
	} else if (f.type === 'number') {
		const n = Number(text) || 0
		const step = (d: number) => {
			const next = Math.min(f.max ?? Infinity, Math.max(f.min ?? 0, n + d))
			onChange(String(next))
			onBlur()
		}
		const btn = `flex h-[2.95rem] w-11 shrink-0 items-center justify-center rounded-lg border transition-colors ${
			dark ? 'border-white/20 text-[var(--cream)] hover:border-[var(--marigold)] hover:text-[var(--marigold)]' : 'border-[var(--brown)]/20 text-[var(--brown)] hover:border-[var(--brown)]/60'
		}`
		control = (
			<div className='flex items-stretch gap-2'>
				<button type='button' aria-label='Decrease' onClick={() => step(-1)} className={btn}>
					<Minus size={16} />
				</button>
				<input
					id={id}
					type='number'
					inputMode='numeric'
					min={f.min}
					max={f.max}
					value={text}
					placeholder={f.placeholder}
					onChange={(e) => onChange(e.target.value)}
					onBlur={onBlur}
					className='kb-field text-center'
					{...aria}
				/>
				<button type='button' aria-label='Increase' onClick={() => step(1)} className={btn}>
					<Plus size={16} />
				</button>
			</div>
		)
	} else {
		control = (
			<div className='relative'>
				<input
					id={id}
					type={f.type}
					inputMode={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined}
					autoComplete={f.autoComplete}
					autoCapitalize={f.type === 'email' || f.type === 'url' ? 'none' : undefined}
					spellCheck={f.type === 'text' && f.kind !== 'name' ? undefined : false}
					value={text}
					placeholder={f.placeholder}
					maxLength={f.maxLength}
					onChange={(e) => onChange(e.target.value)}
					onBlur={onBlur}
					className='kb-field'
					style={{
						...(valid && text ? { paddingRight: '2.5rem' } : null),
						...(f.type === 'tel' ? { paddingLeft: '3.6rem' } : null),
					}}
					{...aria}
				/>
				{f.type === 'tel' && (
					<span
						aria-hidden
						className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 border-r pr-2.5 text-[0.95rem] font-semibold ${
							dark ? 'border-white/20 text-[var(--cream)]/80' : 'border-[var(--brown)]/20 text-[var(--brown)]/70'
						}`}>
						+91
					</span>
				)}
				{valid && text && !error && (
					<Check
						size={16}
						strokeWidth={2.6}
						className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2'
						style={{ color: dark ? '#7ddf9d' : '#2e9e5b' }}
					/>
				)}
			</div>
		)
	}

	const softHint =
		f.type === 'email' && dark && !error && valid && isFreeEmail(text)
			? 'This looks like a personal address. An official institution email helps us verify faster.'
			: ''

	return (
		<div className={span}>
			{labelEl}
			{control}
			{f.help && !error && !softHint && (
				<p id={helpId} className={`mt-1.5 text-xs ${dark ? 'text-[var(--cream)]/50' : 'text-[var(--brown)]/55'}`}>
					{f.help}
				</p>
			)}
			{softHint && <p className='mt-1.5 text-xs text-[var(--marigold)]'>{softHint}</p>}
			{errorEl}
		</div>
	)
}
