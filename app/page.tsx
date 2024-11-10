import { CalendarWrappedComponent } from "@/components/calendar-wrapped";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <CalendarWrappedComponent />
      <LogoutButton />
    </>
  );
}
