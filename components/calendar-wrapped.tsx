'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from 'lucide-react'
import { calculateStats } from '@/lib/utils'


export function CalendarWrappedComponent({ calendarData }: { calendarData: any[] }) {
  const [step, setStep] = useState(0)
  const stats = calculateStats(calendarData)

  const steps = [
    { title: "Your 2024 in Events", content: `You had a total of ${stats.totalEvents} events this year!` },
    { title: "Busiest Month", content: `Your busiest month was ${stats.busiestMonth}` },
    { title: "Busiest Day", content: `Your busiest day was ${stats.busiestDay}` },
    { title: "Your favorite online meeting platform", content: stats.mostPopularOnlineMeetingPlatform },
    // { title: "Category Champion", content: `Your top category was "${stats.topCategory}"` },
    // { title: "Busiest Time", content: `Your busiest month was ${stats.busiestMonth}` },
    { title: "Total Meeting Duration", content: `You had a total of ${stats.totalMeetingDuration} minutes of meetings this year!` },
    // { title: "Day of Days", content: `Your most eventful day was on ${stats.busyDay}` },
    // { title: "Streak Master", content: `Your longest streak of consecutive days with events was ${stats.longestStreak} days!` },
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