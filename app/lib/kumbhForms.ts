// Single source of truth for the Kumbh 2027 application forms.
// Used by the public form (UI + client validation), the API route
// (server validation + field whitelist) and the admin panel (labels).

export type KumbhType = 'institution' | 'volunteer' | 'media'

export type FieldType =
	| 'text'
	| 'email'
	| 'tel'
	| 'number'
	| 'url'
	| 'select'
	| 'textarea'
	| 'multicheck'
	| 'checkbox'

export interface KumbhField {
	name: string
	label: string
	type: FieldType
	required?: boolean
	placeholder?: string
	help?: string
	options?: string[]
	maxLength?: number
	minLength?: number
	/** number fields */
	min?: number
	max?: number
	/** how to treat the text: person names must look like names, links are one URL/@handle per line */
	kind?: 'name' | 'links'
	/** 'mobile' = Indian mobile / international, 'any' = also accepts landline-style 10 digit numbers */
	phoneMode?: 'mobile' | 'any'
	autoComplete?: string
	/** span both columns on desktop */
	full?: boolean
}

export interface KumbhFormConfig {
	type: KumbhType
	label: string
	short: string
	/** which field holds the headline name shown in admin lists */
	nameField: string
	emailField: string
	phoneField: string
	fields: KumbhField[]
}

export const TRACKS = [
	'Video Editing & Content Creation',
	'Digital Media & Creator Outreach',
	'Journalism, Reporting & Documentation',
	'Ground & Crowd Management Support',
	'Digital Technology & Data Support',
]

const AVAILABILITY = [
	'Full programme duration',
	'Peak weeks only',
	'Weekends and holidays',
	'Flexible, will confirm later',
]

export const KUMBH_FORMS: Record<KumbhType, KumbhFormConfig> = {
	institution: {
		type: 'institution',
		label: 'College / University',
		short: 'Institution',
		nameField: 'institutionName',
		emailField: 'email',
		phoneField: 'phone',
		fields: [
			{ name: 'institutionName', label: 'College / University name', type: 'text', required: true, minLength: 3, maxLength: 160, full: true, autoComplete: 'organization' },
			{ name: 'campusCity', label: 'Campus / City', type: 'text', required: true, maxLength: 120, autoComplete: 'address-level2' },
			{ name: 'departments', label: 'Department(s)', type: 'text', required: true, maxLength: 200, placeholder: 'e.g. Mass Communication, Computer Science' },
			{ name: 'principalName', label: 'Principal / Director', type: 'text', kind: 'name', maxLength: 120 },
			{ name: 'nodalOfficer', label: 'Nodal officer', type: 'text', kind: 'name', required: true, maxLength: 120, placeholder: 'Faculty / placement officer', autoComplete: 'name' },
			{ name: 'email', label: 'Official email', type: 'email', required: true, maxLength: 160, placeholder: 'placement@college.edu', autoComplete: 'email', help: 'Use your institution’s official address so we can verify the nomination.' },
			{ name: 'phone', label: 'Contact number', type: 'tel', required: true, phoneMode: 'any', maxLength: 20, placeholder: '98765 43210', autoComplete: 'tel' },
			{ name: 'studentCount', label: 'Number of students', type: 'number', required: true, min: 1, max: 5000, placeholder: 'e.g. 25' },
			{ name: 'studentYear', label: 'Course / year', type: 'text', maxLength: 120, placeholder: 'e.g. BJMC, 2nd and 3rd year' },
			{ name: 'categories', label: 'Preferred student categories', type: 'multicheck', required: true, options: TRACKS, full: true, help: 'Pick every track you would like to nominate students for.' },
			{ name: 'notes', label: 'Anything else we should know?', type: 'textarea', maxLength: 1000, full: true },
		],
	},
	volunteer: {
		type: 'volunteer',
		label: 'Student Volunteer',
		short: 'Volunteer',
		nameField: 'fullName',
		emailField: 'email',
		phoneField: 'phone',
		fields: [
			{ name: 'fullName', label: 'Full name', type: 'text', kind: 'name', required: true, maxLength: 120, autoComplete: 'name' },
			{ name: 'email', label: 'Email address', type: 'email', required: true, maxLength: 160, autoComplete: 'email' },
			{ name: 'phone', label: 'WhatsApp number', type: 'tel', required: true, phoneMode: 'mobile', maxLength: 20, placeholder: '98765 43210', autoComplete: 'tel' },
			{ name: 'city', label: 'Home city', type: 'text', required: true, maxLength: 120, autoComplete: 'address-level2' },
			{ name: 'college', label: 'College / University', type: 'text', required: true, minLength: 3, maxLength: 160 },
			{ name: 'course', label: 'Course & year', type: 'text', required: true, maxLength: 120, placeholder: 'e.g. BJMC, 2nd year' },
			{ name: 'track', label: 'Preferred track', type: 'select', required: true, options: TRACKS, full: true },
			{ name: 'skills', label: 'Skills & tools you use', type: 'textarea', required: true, minLength: 10, maxLength: 800, full: true, placeholder: 'Premiere Pro, DSLR, Hindi reporting, Python, crowd coordination…' },
			{ name: 'portfolio', label: 'Portfolio / CV / Drive link', type: 'url', maxLength: 300, full: true, placeholder: 'https://', help: 'A link to your work, LinkedIn or a shared CV.' },
			{ name: 'languages', label: 'Languages you speak', type: 'text', maxLength: 160, placeholder: 'Hindi, English, Garhwali…' },
			{ name: 'availability', label: 'Availability', type: 'select', required: true, options: AVAILABILITY },
			{ name: 'training', label: 'I agree to attend the orientation and training before deployment.', type: 'checkbox', required: true, full: true },
		],
	},
	media: {
		type: 'media',
		label: 'Media Partner',
		short: 'Media partner',
		nameField: 'organisation',
		emailField: 'email',
		phoneField: 'phone',
		fields: [
			{ name: 'organisation', label: 'Organisation / creator', type: 'text', required: true, maxLength: 160, autoComplete: 'organization' },
			{ name: 'creatorType', label: 'Partner type', type: 'select', required: true, options: ['News channel', 'Publisher / Newspaper', 'Journalist', 'Influencer / Creator', 'Digital media house', 'Other'] },
			{ name: 'contactPerson', label: 'Contact person', type: 'text', kind: 'name', required: true, maxLength: 120, autoComplete: 'name' },
			{ name: 'phone', label: 'Contact number', type: 'tel', required: true, phoneMode: 'mobile', maxLength: 20, placeholder: '98765 43210', autoComplete: 'tel' },
			{ name: 'email', label: 'Email address', type: 'email', required: true, maxLength: 160, full: true, autoComplete: 'email' },
			{ name: 'platformLinks', label: 'Website & social links', type: 'textarea', kind: 'links', required: true, maxLength: 600, full: true, placeholder: 'One link per line: website, YouTube, Instagram, X…', help: 'Full links (https://…) or an @handle, one per line.' },
			{ name: 'audience', label: 'Audience size', type: 'text', maxLength: 120, placeholder: 'e.g. 250K followers / 1.2M monthly readers' },
			{ name: 'audienceLanguage', label: 'Audience language(s)', type: 'text', maxLength: 120 },
			{ name: 'portfolio', label: 'Portfolio / past coverage link', type: 'url', maxLength: 300, full: true, placeholder: 'https://' },
			{ name: 'collabInterests', label: 'Collaboration interests', type: 'multicheck', required: true, full: true, options: ['Live coverage', 'Documentary / long-form', 'Short-form reels', 'Student-led reporting', 'Brand / sponsorship tie-up', 'Distribution & amplification'] },
			{ name: 'proposal', label: 'Your collaboration proposal', type: 'textarea', required: true, minLength: 30, maxLength: 1500, full: true, placeholder: 'Tell us what you would like to do with us at the Kumbh.' },
		],
	},
}

export const KUMBH_TYPES = Object.keys(KUMBH_FORMS) as KumbhType[]

export const STATUSES = ['new', 'contacted', 'shortlisted', 'rejected'] as const
export type KumbhStatus = (typeof STATUSES)[number]

// ───────────────────────── normalisation ─────────────────────────

const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

/** Trim, strip control characters, tidy whitespace; phones to +digits; emails lowercase. */
export function normalizeValue(f: KumbhField, v: unknown): unknown {
	if (f.type === 'checkbox') return v === true
	if (f.type === 'multicheck') return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []
	if (v === undefined || v === null) return ''
	let s = String(v).replace(CONTROL_RE, '')
	if (f.type === 'textarea') {
		s = s
			.split(/\r?\n/)
			.map((l) => l.replace(/[ \t]+/g, ' ').trim())
			.join('\n')
			.replace(/\n{3,}/g, '\n\n')
			.trim()
	} else {
		s = s.replace(/\s+/g, ' ').trim()
	}
	if (f.type === 'email') s = s.toLowerCase()
	if (f.type === 'tel') {
		const cleaned = s.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
		// canonical +91XXXXXXXXXX when it is a valid Indian number
		s = parseIndianPhone(cleaned, f.phoneMode || 'mobile') ?? cleaned
	}
	return s
}

export function normalizeKumbh(type: KumbhType, values: Record<string, unknown>) {
	const out: Record<string, unknown> = {}
	for (const f of KUMBH_FORMS[type].fields) out[f.name] = normalizeValue(f, values[f.name])
	return out
}

// ───────────────────────── validators ─────────────────────────

const EMAIL_RE = /^[a-z0-9._%+'-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u

export const FREE_MAIL = ['gmail.com', 'yahoo.com', 'yahoo.in', 'outlook.com', 'hotmail.com', 'live.com', 'rediffmail.com', 'icloud.com', 'proton.me', 'protonmail.com']

export function isFreeEmail(email: string) {
	const d = email.split('@')[1]?.toLowerCase()
	return !!d && FREE_MAIL.includes(d)
}

function validEmail(s: string) {
	return s.length <= 160 && EMAIL_RE.test(s) && !s.includes('..') && !s.startsWith('.') && !s.split('@')[0].endsWith('.')
}

/**
 * Indian numbers only. Accepts 98765 43210, 098765 43210, 91 98765 43210 and +91 98765 43210.
 * Returns the canonical +91XXXXXXXXXX form, or null when it is not a valid Indian number.
 * mode 'mobile': must be a mobile number (starts 6-9). mode 'any': a landline with STD code is fine too.
 */
export function parseIndianPhone(s: string, mode: 'mobile' | 'any'): string | null {
	const digits = s.replace(/\D/g, '')
	let local = digits
	if (s.startsWith('+')) {
		if (!(digits.startsWith('91') && digits.length === 12)) return null // other country codes are rejected
		local = digits.slice(2)
	} else if (digits.length === 12 && digits.startsWith('91')) {
		local = digits.slice(2)
	} else if (digits.length === 11 && digits.startsWith('0')) {
		local = digits.slice(1)
	}
	if (!/^\d{10}$/.test(local)) return null
	if (/^(\d)\1+$/.test(local)) return null // 9999999999, 6666666666 …
	const mobile = /^[6-9]/.test(local)
	const landline = /^[1-5]/.test(local)
	if (!(mobile || (mode === 'any' && landline))) return null
	return '+91' + local
}

function validUrl(s: string) {
	if (/\s/.test(s)) return false
	try {
		const u = new URL(s)
		return (u.protocol === 'https:' || u.protocol === 'http:') && u.hostname.includes('.') && !u.hostname.endsWith('.')
	} catch {
		return false
	}
}

export function validateField(f: KumbhField, raw: unknown): string {
	const v = normalizeValue(f, raw)

	if (f.type === 'checkbox') return f.required && v !== true ? 'Please confirm to continue' : ''
	if (f.type === 'multicheck') {
		const arr = v as string[]
		if (arr.length === 0) return f.required ? 'Select at least one option' : ''
		return arr.every((x) => f.options?.includes(x)) ? '' : 'Invalid selection'
	}

	const s = v as string
	if (s === '') return f.required ? (f.type === 'select' ? 'Please choose an option' : 'This field is required') : ''

	if (f.type === 'select') return f.options?.includes(s) ? '' : 'Please choose an option'

	if (f.maxLength && s.length > f.maxLength) return `Keep it under ${f.maxLength} characters`
	const min = f.minLength ?? (f.type === 'text' ? 2 : 0)
	if (min && s.length < min) return `Please enter at least ${min} characters`

	switch (f.type) {
		case 'email':
			return validEmail(s) ? '' : 'Enter a valid email address, e.g. name@college.edu'
		case 'tel':
			return parseIndianPhone(s, f.phoneMode || 'mobile')
				? ''
				: f.phoneMode === 'any'
					? 'Enter a valid Indian number: 10 digits, +91 optional'
					: 'Enter a valid Indian mobile number, e.g. 98765 43210'
		case 'url':
			return validUrl(s) ? '' : 'Enter a full link starting with https://'
		case 'number': {
			const n = Number(s)
			if (!/^\d+$/.test(s) || !Number.isInteger(n)) return 'Enter a whole number'
			if (f.min !== undefined && n < f.min) return `Minimum is ${f.min}`
			if (f.max !== undefined && n > f.max) return `Maximum is ${f.max}`
			return ''
		}
	}

	// text / textarea
	if (f.kind === 'name') return NAME_RE.test(s) && s.length >= 2 ? '' : 'Enter a valid name (letters only)'
	if (f.kind === 'links') {
		const lines = s.split('\n').map((l) => l.trim()).filter(Boolean)
		const ok = lines.length > 0 && lines.every((l) => validUrl(l) || /^@[\w.]{2,}$/.test(l))
		return ok ? '' : 'One full link (https://…) or @handle per line'
	}
	if (!/\p{L}/u.test(s)) return 'Please enter a valid value'
	return ''
}

/** Shared validator. Returns a map of field -> error message (empty = valid). */
export function validateKumbh(
	type: KumbhType,
	values: Record<string, unknown>
): Record<string, string> {
	const errors: Record<string, string> = {}
	for (const f of KUMBH_FORMS[type].fields) {
		const msg = validateField(f, values[f.name])
		if (msg) errors[f.name] = msg
	}
	return errors
}
