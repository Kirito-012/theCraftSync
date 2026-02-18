
'use client'

import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, addDays, isBefore, startOfToday } from 'date-fns'
import { X, Calendar as CalendarIcon, Clock, CheckCircle, ChevronLeft, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-day-picker/style.css'

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 'date' | 'time' | 'details' | 'success'

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
]

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('date')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setStep('time')
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep('details')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          ...formData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule meeting')
      }

      setStep('success')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetModal = () => {
    setStep('date')
    setSelectedDate(undefined)
    setSelectedTime(null)
    setFormData({ name: '', email: '' })
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Schedule a Call</h2>
              <button
                onClick={resetModal}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              {step === 'date' && (
                <div className="flex flex-col items-center">
                  <p className="text-zinc-400 mb-4">Select a date for our meeting</p>
                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => isBefore(date, startOfToday()) || date.getDay() === 0 || date.getDay() === 6}
                      classNames={{
                        selected: 'bg-emerald-500 text-white hover:bg-emerald-600',
                        today: 'text-emerald-500 font-bold',
                        caption_label: 'text-white group-hover:text-white',
                        caption: 'text-white',
                        day: 'text-white hover:bg-zinc-800 rounded-lg transition-colors duration-200'
                      }}
                      styles={{
                        head_cell: { color: '#71717a' }, // zinc-500
                        nav_button: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
              )}

              {step === 'time' && (
                <div>
                  <button
                    onClick={() => setStep('date')}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white mb-4 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Date
                  </button>
                  <p className="text-white font-medium mb-4">
                    Available times for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all text-sm font-medium"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'details' && (
                <div>
                  <button
                    onClick={() => setStep('time')}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white mb-4 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Time
                  </button>
                  <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 mb-6">
                    <div className="flex items-center gap-2 text-emerald-500 mb-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{selectedTime}</span>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Scheduling...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </form>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Meeting Scheduled!</h3>
                  <p className="text-zinc-400 mb-6">
                    We've sent a confirmation email to {formData.email}.<br />
                    The event has been added to the calendar.
                  </p>
                  <button
                    onClick={resetModal}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ScheduleModal
