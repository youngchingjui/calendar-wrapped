'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from 'lucide-react'

// Mock data for 2024 calendar entries
const calendarData = [
  { date: '2024-01-15', event: 'Team Meeting', category: 'Work' },
  { date: '2024-02-14', event: 'Valentine\'s Day Dinner', category: 'Personal' },
  { date: '2024-03-20', event: 'Spring Equinox Hike', category: 'Leisure' },
  { date: '2024-04-01', event: 'April Fools\' Day Party', category: 'Social' },
  { date: '2024-05-12', event: 'Mother\'s Day Brunch', category: 'Family' },
  { date: '2024-06-21', event: 'Summer Solstice Beach Day', category: 'Leisure' },
  { date: '2024-07-04', event: 'Independence Day BBQ', category: 'Social' },
  { date: '2024-08-15', event: 'Annual Company Retreat', category: 'Work' },
  { date: '2024-09-22', event: 'Autumn Equinox Nature Walk', category: 'Leisure' },
  { date: '2024-10-31', event: 'Halloween Costume Party', category: 'Social' },
  { date: '2024-11-28', event: 'Thanksgiving Dinner', category: 'Family' },
  { date: '2024-12-25', event: 'Christmas Day Celebration', category: 'Family' },
  // Add more events as needed
]

// Helper function to calculate statistics
const calculateStats = (data) => {
  const categories = {}
  const months = Array(12).fill(0)
  let busyDay = { date: '', count: 0 }
  let currentStreak = 0
  let longestStreak = 0

  data.forEach(entry => {
    const date = new Date(entry.date)
    const month = date.getMonth()

    // Count events per category
    categories[entry.category] = (categories[entry.category] || 0) + 1

    // Count events per month
    months[month]++

    // Find busiest day
    if (months[month] > busyDay.count) {
      busyDay = { date: entry.date, count: months[month] }
    }

    // Calculate longest streak (simplified)
    currentStreak++
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak
    }
  })

  const topCategory = Object.entries(categories).sort((a, b) => (b[1] as number) - (a[1] as number))[0][0]
  const busiestMonth = months.indexOf(Math.max(...months))

  return {
    totalEvents: data.length,
    topCategory,
    busiestMonth: new Date(2024, busiestMonth).toLocaleString('default', { month: 'long' }),
    busyDay: new Date(busyDay.date).toLocaleDateString(),
    longestStreak
  }
}

export function CalendarWrappedComponent() {
  const [step, setStep] = useState(0)
  const stats = calculateStats(calendarData)

  const steps = [
    { title: "Your 2024 in Events", content: `You had a total of ${stats.totalEvents} events this year!` },
    { title: "Category Champion", content: `Your top category was "${stats.topCategory}"` },
    { title: "Busiest Time", content: `Your busiest month was ${stats.busiestMonth}` },
    { title: "Day of Days", content: `Your most eventful day was on ${stats.busyDay}` },
    { title: "Streak Master", content: `Your longest streak of consecutive days with events was ${stats.longestStreak} days!` },
    { title: "That's a Wrap!", content: "Thanks for an amazing 2024!" },
  ]

  const nextStep = () => setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">2024 Calendar Wrapped</h2>
            <Calendar className="text-primary" size={24} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-6"
            >
              <h3 className="text-xl font-semibold mb-2">{steps[step].title}</h3>
              <p className="text-muted-foreground">{steps[step].content}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-6">
            <Button onClick={prevStep} disabled={step === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={nextStep} disabled={step === steps.length - 1}>
              {step === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}