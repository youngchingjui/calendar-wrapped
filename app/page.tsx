import { CalendarWrappedComponent } from "@/components/calendar-wrapped";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const getCalendarData = async (userId: string) => {
  const session = await auth();
  const calendarId = "primary";
  const calendarData = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  return calendarData.json();
}

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Here, we should be logged into Google. Let's get calendar data

  const calendarData = await getCalendarData(session.user.id);
  console.log(calendarData);

  return (
    <>
      <CalendarWrappedComponent />
      <LogoutButton />
    </>
  );
}
