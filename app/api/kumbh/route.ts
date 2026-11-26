import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import connectDB from '@/app/config/database'
import KumbhApplication from '@/app/models/KumbhApplication'
import { isAuthenticated, isAdmin } from '@/app/utils/auth'
import {
	KUMBH_FORMS,
	KUMBH_TYPES,
	STATUSES,
	normalizeKumbh,
	validateKumbh,
	type KumbhType,
} from '@/app/lib/kumbhForms'

const resend = new Resend(process.env.RESEND_API_KEY)

// Best-effort in-memory throttle (per server instance): 6 submissions / 10 min / IP
const hits = new Map<string, number[]>()
function throttled(ip: string) {
	const now = Date.now()
	const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
	recent.push(now)
	hits.set(ip, recent)
	return recent.length > 6
}

const esc = (s: unknown) =>
	String(s ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')

// Public: submit an application
export async function POST(req: NextRequest) {
	try {
		// Reject oversized payloads before parsing (the largest form is well under 20 KB)
		if (Number(req.headers.get('content-length') || 0) > 20_000) {
			return NextResponse.json({ success: false, message: 'Submission too large' }, { status: 413 })
		}
		const body = await req.json().catch(() => null)
		if (!body || typeof body !== 'object') {
			return NextResponse.json({ success: false, message: 'Invalid submission' }, { status: 400 })
		}
		const type = body?.type as KumbhType

		// Honeypot: bots fill the hidden field. Pretend success.
		if (body?.website) return NextResponse.json({ success: true })

		if (!KUMBH_TYPES.includes(type)) {
			return NextResponse.json({ success: false, message: 'Invalid application type' }, { status: 400 })
		}

		const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
		if (throttled(ip)) {
			return NextResponse.json(
				{ success: false, message: 'Too many submissions. Please try again in a few minutes.' },
				{ status: 429 }
			)
		}

		if (!body?.data || typeof body.data !== 'object' || Array.isArray(body.data)) {
			return NextResponse.json({ success: false, message: 'Invalid submission' }, { status: 400 })
		}

		// Normalise first (trim, strip control chars, tidy phone/email), then validate.
		// Only fields defined for this form are kept; everything else is dropped.
		const cfg = KUMBH_FORMS[type]
		const clean = normalizeKumbh(type, body.data as Record<string, unknown>)
		const errors = validateKumbh(type, clean)
		if (Object.keys(errors).length) {
			return NextResponse.json({ success: false, message: 'Please check the highlighted fields', errors }, { status: 400 })
		}
		const data: Record<string, unknown> = {}
		for (const f of cfg.fields) {
			const v = clean[f.name]
			if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) continue
			data[f.name] = v
		}

		await connectDB()

		// Same email applying again for the same programme within 24h: treat as a duplicate
		const dup = await KumbhApplication.findOne({
			type,
			email: String(data[cfg.emailField]).toLowerCase(),
			createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		}).lean()
		if (dup) {
			return NextResponse.json(
				{ success: false, message: 'We already received an application from this email. Our team will be in touch.' },
				{ status: 409 }
			)
		}

		const doc = await KumbhApplication.create({
			type,
			name: String(data[cfg.nameField]),
			email: String(data[cfg.emailField]),
			phone: String(data[cfg.phoneField]),
			data,
			ip,
		})

		// Notify the team. Failure here must not fail the application.
		try {
			const rows = cfg.fields
				.filter((f) => data[f.name] !== undefined)
				.map((f) => {
					const v = data[f.name]
					const shown = Array.isArray(v) ? v.join(', ') : v === true ? 'Yes' : v
					return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#777;font-size:12px;width:38%;vertical-align:top">${esc(f.label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;white-space:pre-wrap">${esc(shown)}</td></tr>`
				})
				.join('')
			await resend.emails.send({
				from: 'TheCraftSync Kumbh <onboarding@resend.dev>',
				to: ['manikbansal@thecraftsync.com'],
				replyTo: String(data[cfg.emailField]),
				subject: `Kumbh 2027 – new ${cfg.short.toLowerCase()} application: ${data[cfg.nameField]}`,
				html: `<div style="font-family:Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto"><h2 style="margin:0 0 4px">New ${esc(cfg.label)} application</h2><p style="color:#777;margin:0 0 16px">Kumbh 2027 programme · view it in the admin panel under Kumbh 2027</p><table style="width:100%;border-collapse:collapse">${rows}</table></div>`,
			})
		} catch (mailErr) {
			console.error('Kumbh notification email failed:', mailErr)
		}

		return NextResponse.json({ success: true, id: doc._id }, { status: 201 })
	} catch (error) {
		console.error('Kumbh application error:', error)
		return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
	}
}

// Admin: list applications
export async function GET(req: NextRequest) {
	try {
		const user = await isAuthenticated(req)
		if (!user || !isAdmin(user)) {
			return NextResponse.json({ success: false, message: 'Access denied! Admin privileges required.' }, { status: 403 })
		}
		await connectDB()

		const { searchParams } = new URL(req.url)
		const type = searchParams.get('type')
		const status = searchParams.get('status')
		const search = searchParams.get('search')?.trim()

		const query: Record<string, unknown> = {}
		if (type && KUMBH_TYPES.includes(type as KumbhType)) query.type = type
		if (status && (STATUSES as readonly string[]).includes(status)) query.status = status
		if (search) {
			const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
			query.$or = [{ name: rx }, { email: rx }, { phone: rx }]
		}

		const [items, counts] = await Promise.all([
			KumbhApplication.find(query).sort({ createdAt: -1 }).limit(1000).lean(),
			KumbhApplication.aggregate([{ $group: { _id: '$type', n: { $sum: 1 } } }]),
		])

		const countMap: Record<string, number> = { institution: 0, volunteer: 0, media: 0 }
		for (const c of counts) countMap[c._id] = c.n

		return NextResponse.json({ success: true, data: items, counts: countMap })
	} catch (error) {
		console.error('Kumbh list error:', error)
		return NextResponse.json({ success: false, message: 'Failed to fetch applications' }, { status: 500 })
	}
}
