import { Metadata } from "next";
import Link from "next/link";

import { Calendar } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to access your Calendar Wrapped",
};

export default async function LoginPage() {

  // If logged in already, redirect to homepage
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Calendar className="mr-2 h-6 w-6" /> Calendar Wrapped
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This app has revolutionized how I view my year in events.
              It's like Spotify Wrapped, but for my life!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to Calendar Wrapped
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in with Google to connect your calendar and see your year in
              review
            </p>
          </div>
          <GoogleSignInButton />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
