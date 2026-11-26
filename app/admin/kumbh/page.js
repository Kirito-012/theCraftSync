"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { KUMBH_FORMS, STATUSES } from '@/app/lib/kumbhForms'

const API = process.env.NEXT_PUBLIC_API_URL || ''

const TYPE_TABS = [
    { key: '', label: 'All' },
    { key: 'institution', label: 'Institutions' },
    { key: 'volunteer', label: 'Volunteers' },
    { key: 'media', label: 'Media partners' },
]

const STATUS_STYLE = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    shortlisted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
}

const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
})

const fmtValue = (v) => (Array.isArray(v) ? v.join(', ') : v === true ? 'Yes' : String(v ?? ''))

// Quote for CSV and neutralise spreadsheet formulas (cells starting with = + - @ are prefixed with ')
const csvCell = (v) => {
    let s = String(v ?? '')
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
    return `"${s.replace(/"/g, '""')}"`
}

export default function KumbhApplications() {
    const [items, setItems] = useState([])
    const [counts, setCounts] = useState({ institution: 0, volunteer: 0, media: 0 })
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)
    const [notes, setNotes] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (type) params.set('type', type)
            if (status) params.set('status', status)
            if (query) params.set('search', query)
            const res = await fetch(`${API}/api/kumbh?${params}`, { headers: authHeaders() })
            const json = await res.json()
            if (json.success) {
                setItems(json.data)
                setCounts(json.counts)
            } else {
                toast.error(json.message || 'Failed to load applications')
            }
        } catch {
            toast.error('Failed to load applications')
        } finally {
            setLoading(false)
        }
    }, [type, status, query])

    useEffect(() => {
        load()
    }, [load])

    useEffect(() => {
        const t = setTimeout(() => setQuery(search.trim()), 350)
        return () => clearTimeout(t)
    }, [search])

    const patch = async (id, body) => {
        try {
            const res = await fetch(`${API}/api/kumbh/${id}`, {
                method: 'PATCH',
                headers: authHeaders(),
                body: JSON.stringify(body),
            })
            const json = await res.json()
            if (!json.success) throw new Error(json.message)
            setItems((p) => p.map((i) => (i._id === id ? json.data : i)))
            setSelected((s) => (s && s._id === id ? json.data : s))
            toast.success('Updated')
        } catch (e) {
            toast.error(e.message || 'Update failed')
        }
    }

    const remove = async (id) => {
        if (!window.confirm('Delete this application permanently? This cannot be undone.')) return
        try {
            const res = await fetch(`${API}/api/kumbh/${id}`, { method: 'DELETE', headers: authHeaders() })
            const json = await res.json()
            if (!json.success) throw new Error(json.message)
            setItems((p) => p.filter((i) => i._id !== id))
            setSelected(null)
            toast.success('Deleted')
            load()
        } catch (e) {
            toast.error(e.message || 'Delete failed')
        }
    }

    const exportCsv = () => {
        if (!items.length) return toast.info('Nothing to export')
        // Union of all field names across the current list, labelled from config
        const cols = []
        const seen = new Set()
        for (const it of items) {
            for (const f of KUMBH_FORMS[it.type].fields) {
                const k = `${it.type}:${f.name}`
                if (!seen.has(k)) {
                    seen.add(k)
                    cols.push({ k, type: it.type, name: f.name, label: `${KUMBH_FORMS[it.type].short} – ${f.label}` })
                }
            }
        }
        const head = ['Submitted', 'Type', 'Status', 'Admin notes', ...cols.map((c) => c.label)]
        const rows = items.map((it) => [
            new Date(it.createdAt).toLocaleString(),
            KUMBH_FORMS[it.type].label,
            it.status,
            it.adminNotes,
            ...cols.map((c) => (c.type === it.type ? fmtValue(it.data?.[c.name]) : '')),
        ])
        const csv = [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\n')
        const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `kumbh-2027-applications-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const total = counts.institution + counts.volunteer + counts.media

    return (
        <div>
            <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-slate-800'>Kumbh 2027 Applications</h1>
                    <p className='mt-1 text-slate-500'>Institutions, student volunteers and media partners from /kumbh-2027</p>
                </div>
                <button
                    onClick={exportCsv}
                    className='rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700'>
                    Export CSV
                </button>
            </div>

            {/* Counters */}
            <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
                {[
                    ['Total', total, 'text-slate-800'],
                    ['Institutions', counts.institution, 'text-amber-600'],
                    ['Volunteers', counts.volunteer, 'text-orange-600'],
                    ['Media partners', counts.media, 'text-teal-600'],
                ].map(([l, n, c]) => (
                    <div key={l} className='rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200'>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>{l}</p>
                        <p className={`mt-1 text-3xl font-bold ${c}`}>{n}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className='mb-4 flex flex-wrap items-center gap-3'>
                <div className='flex rounded-lg bg-white p-1 shadow-sm ring-1 ring-slate-200'>
                    {TYPE_TABS.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setType(t.key)}
                            className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition ${
                                type === t.key ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}>
                            {t.label}
                        </button>
                    ))}
                </div>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='rounded-lg border-0 bg-white px-3 py-2.5 text-sm shadow-sm ring-1 ring-slate-200'>
                    <option value=''>All statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                        </option>
                    ))}
                </select>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search name, email or phone…'
                    className='min-w-[240px] flex-1 rounded-lg border-0 bg-white px-3.5 py-2.5 text-sm shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            {/* Table */}
            <div className='overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200'>
                <table className='w-full text-left text-sm'>
                    <thead className='bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
                        <tr>
                            <th className='px-4 py-3'>Applicant</th>
                            <th className='px-4 py-3'>Type</th>
                            <th className='hidden px-4 py-3 md:table-cell'>Contact</th>
                            <th className='px-4 py-3'>Status</th>
                            <th className='hidden px-4 py-3 lg:table-cell'>Submitted</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-100'>
                        {loading && (
                            <tr>
                                <td colSpan={5} className='px-4 py-12 text-center text-slate-400'>
                                    Loading…
                                </td>
                            </tr>
                        )}
                        {!loading && items.length === 0 && (
                            <tr>
                                <td colSpan={5} className='px-4 py-12 text-center text-slate-400'>
                                    No applications found.
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            items.map((it) => (
                                <tr
                                    key={it._id}
                                    onClick={() => {
                                        setSelected(it)
                                        setNotes(it.adminNotes || '')
                                    }}
                                    className='cursor-pointer transition hover:bg-slate-50'>
                                    <td className='px-4 py-3 font-medium text-slate-800'>{it.name}</td>
                                    <td className='px-4 py-3 text-slate-600'>{KUMBH_FORMS[it.type].short}</td>
                                    <td className='hidden px-4 py-3 text-slate-500 md:table-cell'>
                                        <div>{it.email}</div>
                                        <div className='text-xs'>{it.phone}</div>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[it.status]}`}>
                                            {it.status}
                                        </span>
                                    </td>
                                    <td className='hidden px-4 py-3 text-slate-500 lg:table-cell'>
                                        {new Date(it.createdAt).toLocaleDateString(undefined, {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Detail drawer */}
            {selected && (
                <div className='fixed inset-0 z-50 flex justify-end bg-black/40' onClick={() => setSelected(null)}>
                    <div
                        className='h-full w-full max-w-xl overflow-y-auto bg-white p-7 shadow-2xl'
                        onClick={(e) => e.stopPropagation()}>
                        <div className='mb-6 flex items-start justify-between gap-4'>
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                    {KUMBH_FORMS[selected.type].label}
                                </p>
                                <h2 className='mt-1 text-2xl font-bold text-slate-800'>{selected.name}</h2>
                                <p className='mt-1 text-xs text-slate-400'>
                                    Submitted {new Date(selected.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className='rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                                aria-label='Close'>
                                ✕
                            </button>
                        </div>

                        <div className='mb-6 flex flex-wrap items-center gap-3'>
                            <select
                                value={selected.status}
                                onChange={(e) => patch(selected._id, { status: e.target.value })}
                                className='rounded-lg border-0 bg-slate-50 px-3 py-2 text-sm font-medium ring-1 ring-slate-200'>
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                        {s[0].toUpperCase() + s.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <a
                                href={`mailto:${selected.email}`}
                                className='rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100'>
                                Email
                            </a>
                            <a
                                href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`}
                                target='_blank'
                                rel='noreferrer'
                                className='rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100'>
                                WhatsApp
                            </a>
                        </div>

                        <dl className='divide-y divide-slate-100 rounded-xl ring-1 ring-slate-200'>
                            {KUMBH_FORMS[selected.type].fields.map((f) => {
                                const v = selected.data?.[f.name]
                                if (v === undefined || v === '') return null
                                const isLink = f.type === 'url'
                                return (
                                    <div key={f.name} className='grid grid-cols-[38%_1fr] gap-3 px-4 py-3'>
                                        <dt className='text-xs font-semibold uppercase tracking-wide text-slate-400'>{f.label}</dt>
                                        <dd className='whitespace-pre-wrap break-words text-sm text-slate-800'>
                                            {isLink ? (
                                                <a href={v} target='_blank' rel='noreferrer' className='text-blue-600 underline'>
                                                    {v}
                                                </a>
                                            ) : (
                                                fmtValue(v)
                                            )}
                                        </dd>
                                    </div>
                                )
                            })}
                        </dl>

                        <div className='mt-6'>
                            <label className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                Internal notes
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                className='w-full rounded-lg border-0 bg-slate-50 p-3 text-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Call notes, follow-ups…'
                            />
                            <button
                                onClick={() => patch(selected._id, { adminNotes: notes })}
                                className='mt-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700'>
                                Save notes
                            </button>
                        </div>

                        <button
                            onClick={() => remove(selected._id)}
                            className='mt-8 text-sm font-medium text-red-600 hover:text-red-700'>
                            Delete application
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
