import { EventList } from "@/components/event-list"

// This is a mock function to simulate fetching events from an API or database
async function getEvents() {
  // In a real application, this would be an API call or database query
  return [
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync",
      startDate: "2023-06-01T10:00:00Z",
      endDate: "2023-06-01T11:00:00Z",
      location: "Conference Room A",
      attendees: ["john@example.com", "jane@example.com"],
      type: "Meeting",
    },
    {
      id: "2",
      title: "Client Presentation",
      description: "Presenting new product features",
      startDate: "2023-06-02T14:00:00Z",
      endDate: "2023-06-02T15:30:00Z",
      location: "Client Office",
      attendees: ["john@example.com", "client@example.com"],
      type: "Presentation",
    },
    // Add more mock events here...
  ]
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Your Events</h1>
      <EventList events={events} />
    </div>
  )
}
