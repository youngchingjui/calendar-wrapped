import { CalendarResponse } from "@/types"

export async function fetchCalendarEvents(
  accessToken: string,
  timeMin: string,
  timeMax: string,
  calendarId: string = "primary"
): Promise<CalendarResponse | null> {
  const calendarData = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&timeMax=${timeMax}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!calendarData.ok) {
    return null
  }

  return calendarData.json()
}

export const getEventsForYear = async (
  accessToken: string
): Promise<CalendarResponse | null> => {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()
  const endOfYear = new Date(
    now.getFullYear(),
    11,
    31,
    23,
    59,
    59
  ).toISOString()

  return fetchCalendarEvents(accessToken, startOfYear, endOfYear)
}
