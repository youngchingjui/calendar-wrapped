export const getCalendarData = async (accessToken: string) => {
  const calendarId = "primary";
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();
  const endOfYear = new Date(
    now.getFullYear(),
    11,
    31,
    23,
    59,
    59
  ).toISOString();

  const calendarData = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${startOfYear}&timeMax=${endOfYear}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // If error, return null
  if (!calendarData.ok) {
    return null;
  }

  return calendarData.json();
};