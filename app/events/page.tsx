import { auth } from "@/auth"
import { getEventsForYear } from "@/lib/calendarApi"
import { EventList } from "@/components/event-list"
import { redirect } from "next/navigation"

export default async function EventsPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const events = await getEventsForYear(session.accessToken)

  if (!events) {
    return <div>No events found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Your Events</h1>
      <EventList events={events.items} />
    </div>
  )
}
