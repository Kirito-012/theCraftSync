import mongoose from 'mongoose'

const kumbhApplicationSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['institution', 'volunteer', 'media'],
			required: true,
			index: true,
		},
		// Denormalised so the admin list can search/sort without digging into `data`
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		phone: { type: String, required: true, trim: true },
		data: { type: mongoose.Schema.Types.Mixed, default: {} },
		status: {
			type: String,
			enum: ['new', 'contacted', 'shortlisted', 'rejected'],
			default: 'new',
			index: true,
		},
		adminNotes: { type: String, default: '', trim: true },
		ip: { type: String, default: '' },
	},
	{ timestamps: true }
)

kumbhApplicationSchema.index({ createdAt: -1 })

const KumbhApplication =
	mongoose.models.KumbhApplication ||
	mongoose.model('KumbhApplication', kumbhApplicationSchema)

export default KumbhApplication
