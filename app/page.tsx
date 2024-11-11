import { CalendarWrappedComponent } from "@/components/calendar-wrapped";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const getCalendarData = async (userId: string) => {
  const session = await auth();
  const calendarId = "primary";
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59).toISOString();
  const calendarData = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${startOfYear}&timeMax=${endOfYear}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  // If error, return null
  if (!calendarData.ok) {
    return null;
  }

  return calendarData.json();
}

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const calendarData = await getCalendarData(session.user.id);



  return (
    <>
      {calendarData ? <CalendarWrappedComponent calendarData={calendarData.items} /> : <div>Error fetching calendar data. Please sign out and sign back in.</div>}
      <LogoutButton />
    </>
  );
}
