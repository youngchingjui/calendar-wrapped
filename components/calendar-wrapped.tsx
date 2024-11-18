"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { calculateStats } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import TopMeetingPartners from "./cards/TopMeetingPartners"

export function CalendarWrappedComponent({
  calendarData,
}: {
  calendarData: any[]
}) {
  const [step, setStep] = useState(0)
  const stats = calculateStats(calendarData)

  const steps = [
    {
      title: "Your 2024 in Events",
      content: `You had a total of ${stats.totalEvents} events this year!`,
    },
    {
      title: "Busiest Month",
      content: `Your busiest month was ${stats.busiestMonth}`,
    },
    {
      title: "Busiest Day",
      content: `Your busiest day was ${stats.busiestDay}`,
    },
    {
      title: "Your favorite online meeting platform",
      content: stats.mostPopularOnlineMeetingPlatform,
    },
    {
      title: "Total Meeting Duration",
      content: `You had a total of ${stats.totalMeetingDuration} minutes of meetings this year!`,
    },
    {
      title: "Remember that most banging event?",
      content: (
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <p className="mb-2">Event with the most attendees</p>
            <h3 className="text-xl font-semibold">
              {stats.mostAttendeesEvent.event.summary}
            </h3>
            <p className="text-sm text-muted-foreground">
              {stats.mostAttendeesEvent.attendees.length} attendees
            </p>
          </div>
          <div className="w-1/2">
            <ScrollArea className="h-[150px] w-full rounded-md border p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Attendees
              </h4>
              {stats.mostAttendeesEvent.attendees.map((attendee, index) => (
                <div
                  key={index}
                  className="text-sm"
                  style={{
                    opacity: 1 - index * 0.1,
                    display: index < 15 ? "block" : "none",
                  }}
                >
                  {attendee.displayName ? attendee.displayName : attendee.email}
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      ),
    },
    {
      title: "Top Meeting Partners",
      content: <TopMeetingPartners partners={stats.topAttendees} />,
    },
    { title: "That's a Wrap!", content: "Thanks for an amazing 2024!" },
  ]

  const nextStep = () =>
    setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">
              2024 Calendar Wrapped
            </h2>
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
              <h3 className="text-xl font-semibold mb-2">
                {steps[step].title}
              </h3>
              <p className="text-muted-foreground">{steps[step].content}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-6">
            <Button onClick={prevStep} disabled={step === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={nextStep} disabled={step === steps.length - 1}>
              {step === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
