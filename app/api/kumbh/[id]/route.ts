import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import connectDB from '@/app/config/database'
import KumbhApplication from '@/app/models/KumbhApplication'
import { isAuthenticated, isAdmin } from '@/app/utils/auth'
import { STATUSES } from '@/app/lib/kumbhForms'

type Ctx = { params: Promise<{ id: string }> }

async function guard(req: NextRequest, id: string) {
	const user = await isAuthenticated(req)
	if (!user || !isAdmin(user)) {
		return NextResponse.json({ success: false, message: 'Access denied! Admin privileges required.' }, { status: 403 })
	}
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 })
	}
	await connectDB()
	return null
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
	const { id } = await params
	const denied = await guard(req, id)
	if (denied) return denied
	try {
		const body = await req.json()
		const update: Record<string, unknown> = {}
		if (body.status !== undefined) {
			if (!(STATUSES as readonly string[]).includes(body.status)) {
				return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 })
			}
			update.status = body.status
		}
		if (body.adminNotes !== undefined) update.adminNotes = String(body.adminNotes).slice(0, 2000)

		const doc = await KumbhApplication.findByIdAndUpdate(id, update, { new: true }).lean()
		if (!doc) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
		return NextResponse.json({ success: true, data: doc })
	} catch (error) {
		console.error('Kumbh update error:', error)
		return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
	const { id } = await params
	const denied = await guard(req, id)
	if (denied) return denied
	try {
		const doc = await KumbhApplication.findByIdAndDelete(id)
		if (!doc) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Kumbh delete error:', error)
		return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 })
	}
}
