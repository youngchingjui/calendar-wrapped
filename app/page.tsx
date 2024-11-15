import { CalendarWrappedComponent } from "@/components/calendar-wrapped";
import { auth, signIn } from "@/auth";
import {
  BarChart2,
  Calendar,
  ChevronRight,
  Link,
  Lock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeatureCard from "@/components/FeatureCard";

const getCalendarData = async (userId: string) => {
  const session = await auth();
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
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  // If error, return null
  if (!calendarData.ok) {
    return null;
  }

  return calendarData.json();
};

export default async function Page() {
  const session = await auth();

  let calendarData = null;

  if (session) {
    calendarData = await getCalendarData(session.user.id);
  }

  return (
    <>
      {!session ? (
        <div className="flex flex-col min-h-screen">
          <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Calendar Wrapped</span>
            </div>
            {session ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Button variant="ghost">Sign In</Button>
            )}
          </div>
        </header>

        <main className="flex-grow">
          <section className="py-20 text-center">
            <h1 className="text-4xl font-bold mb-6">
              Discover Your Year in Events
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Calendar Wrapped gives you a fun, insightful summary of your year
              based on your Google Calendar events.
            </p>

            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/" });
                  }}
                >
                  <Button size="lg" className="w-full">
                    <span className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Sign in with Google Calendar
                    </span>
                  </Button>
                </form>
                <p className="mt-4 text-sm text-muted-foreground">
                  Sign in to see your Calendar Wrapped summary
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Key Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<BarChart2 className="h-10 w-10 text-primary" />}
                  title="Insightful Statistics"
                  description="Get a breakdown of your busiest months, top event categories, and more."
                />
                <FeatureCard
                  icon={<Users className="h-10 w-10 text-primary" />}
                  title="Meeting Partners"
                  description="Discover who you've met with most frequently throughout the year."
                />
                <FeatureCard
                  icon={<Lock className="h-10 w-10 text-primary" />}
                  title="Private & Secure"
                  description="Your calendar data is processed securely and never stored on our servers."
                />
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Wrap Your Year?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Sign in with your Google Calendar and get your personalized Year
                in Review in minutes.
              </p>
              {!session && (
                <Button size="lg">
                  {session ? (
                    <span className="flex items-center">
                      <span className="mr-2">Signing In...</span>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Sign in with Google Calendar
                    </span>
                  )}
                </Button>
              )}
            </div>
          </section>
        </main>

        <footer className="border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Calendar Wrapped</span>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Calendar Wrapped. All rights
              reserved.
            </p>
            </div>
          </footer>
        </div>
      ) : (
        <>
          {calendarData ? (
            <CalendarWrappedComponent calendarData={calendarData.items} />
      ) : (
        <div>
          Error fetching calendar data. Please sign out and sign back in.
        </div>
      )}
      </>
    )}
    </>
  );
}
