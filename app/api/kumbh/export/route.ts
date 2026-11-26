import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import connectDB from '@/app/config/database'
import KumbhApplication from '@/app/models/KumbhApplication'
import { isAuthenticated, isAdmin } from '@/app/utils/auth'
import { KUMBH_FORMS, KUMBH_TYPES, type KumbhType } from '@/app/lib/kumbhForms'

export const runtime = 'nodejs'

const TITLES: Record<KumbhType, string> = {
	institution: 'Institutions',
	volunteer: 'Volunteers',
	media: 'Media Partners',
}

// GET /api/kumbh/export?type=institution|volunteer|media  (admin only)
// One workbook per type, never combined.
export async function GET(req: NextRequest) {
	try {
		const user = await isAuthenticated(req)
		if (!user || !isAdmin(user)) {
			return NextResponse.json({ success: false, message: 'Access denied! Admin privileges required.' }, { status: 403 })
		}

		const type = new URL(req.url).searchParams.get('type') as KumbhType
		if (!KUMBH_TYPES.includes(type)) {
			return NextResponse.json({ success: false, message: 'Choose a type: institution, volunteer or media' }, { status: 400 })
		}

		await connectDB()
		const rows = await KumbhApplication.find({ type }).sort({ createdAt: -1 }).lean()
		const cfg = KUMBH_FORMS[type]

		const wb = new ExcelJS.Workbook()
		wb.creator = 'TheCraftSync'
		wb.created = new Date()
		const ws = wb.addWorksheet(TITLES[type], { views: [{ state: 'frozen', ySplit: 1 }] })

		// Columns: submitted info, then every field of this form (checkbox fields included), then admin columns
		const formCols = cfg.fields.map((f) => ({
			header: f.exportLabel ?? f.label,
			key: f.name,
			width: f.type === 'textarea' || f.type === 'multicheck' ? 48 : f.type === 'email' ? 30 : 24,
		}))
		ws.columns = [
			{ header: 'Submitted', key: '_submitted', width: 20 },
			{ header: 'Status', key: '_status', width: 14 },
			...formCols,
			{ header: 'Admin notes', key: '_notes', width: 36 },
			{ header: 'Reference', key: '_ref', width: 12 },
		]

		for (const r of rows) {
			const data = (r.data || {}) as Record<string, unknown>
			const row: Record<string, string | Date> = {
				_submitted: new Date(r.createdAt as Date),
				_status: String(r.status),
				_notes: String(r.adminNotes || ''),
				_ref: String(r._id).slice(-6).toUpperCase(),
			}
			for (const f of cfg.fields) {
				const v = data[f.name]
				// Everything is written as text, so Excel never evaluates user input as a formula
				row[f.name] = Array.isArray(v) ? v.join(', ') : v === true ? 'Yes' : v === undefined || v === null ? '' : String(v)
			}
			ws.addRow(row)
		}

		// Formatting
		const head = ws.getRow(1)
		head.font = { bold: true, color: { argb: 'FFFFFFFF' } }
		head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3A0F0B' } }
		head.alignment = { vertical: 'middle', wrapText: true }
		head.height = 30
		ws.getColumn('_submitted').numFmt = 'dd-mmm-yyyy hh:mm'
		ws.eachRow((row, i) => {
			if (i === 1) return
			row.alignment = { vertical: 'top', wrapText: true }
		})
		// Phone-like columns stay text (keeps +91 and leading digits intact)
		for (const f of cfg.fields) if (f.type === 'tel') ws.getColumn(f.name).numFmt = '@'
		if (rows.length) ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: ws.columnCount } }

		const buf = await wb.xlsx.writeBuffer()
		const stamp = new Date().toISOString().slice(0, 10)
		return new NextResponse(buf as ArrayBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': `attachment; filename="kumbh-2027-${TITLES[type].toLowerCase().replace(/\s+/g, '-')}-${stamp}.xlsx"`,
				'Cache-Control': 'no-store',
			},
		})
	} catch (error) {
		console.error('Kumbh export error:', error)
		return NextResponse.json({ success: false, message: 'Export failed' }, { status: 500 })
	}
}
