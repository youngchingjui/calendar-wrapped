import { auth, signIn } from "@/auth";
import { BarChart2, Calendar, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeatureCard from "@/components/FeatureCard";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      <main className="flex-grow">
        <section className="min-h-[90vh] flex flex-col justify-center items-center py-20 text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Discover Your Year in Events
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-white">
            Calendar Wrapped gives you a fun, insightful summary of your year
            based on your Google Calendar events.
          </p>

          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/wrapped" });
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

        <section className="min-h-[90vh] flex flex-col justify-center items-center py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-primary">
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

        <section className="min-h-[90vh] flex flex-col justify-center items-center py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Wrap Your Year?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-white">
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
    </div>
  );
}
