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

export interface Event {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  attendees: string[]
  type: string
}
