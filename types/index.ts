export interface MeetingPartner {
  email: string
  name: string
  count: number
}

export interface TopMeetingPartnersProps {
  partners?: MeetingPartner[]
}

export interface WrappedCardContentProps {
  calendarData: any
}

export interface CalendarEvent {
  id: string
  summary?: string
  description?: string
  start: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  end: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  location?: string
  attendees?: Array<{
    email: string
    responseStatus?: string
    displayName?: string
  }>
  status?: string
  created?: string
  updated?: string
  organizer?: {
    email: string
    displayName?: string
    self?: boolean
  }
  eventType?: string
}

export interface CalendarResponse {
  items: CalendarEvent[]
  summary: string
  timeZone: string
}

export interface EventListProps {
  events: CalendarEvent[]
}
