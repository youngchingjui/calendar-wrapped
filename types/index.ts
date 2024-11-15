export interface MeetingPartner {
  email: string
  name: string
  count: number
}

export interface TopMeetingPartnersProps {
  partners?: MeetingPartner[]
}

export interface WrappedCardContentProps {
  calendarData: any;
}