import Link from "next/link"
import { Home, FileText, LogOut, Gift, LogIn, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { auth, signOut, signIn } from "@/auth"

export async function Footer() {
  const session = await auth()

  return (
    <footer>
      <div className="container flex text-background flex-col items-center justify-end gap-1 py-10 md:h-16 md:flex-row md:py-0">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        {session && (
          <>
            <Link href="/wrapped">
              <Button variant="ghost" size="sm">
                <Gift className="mr-2 h-4 w-4" />
                Your Wrapped
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="ghost" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Your Events
              </Button>
            </Link>
          </>
        )}
        <Link href="/privacy">
          <Button variant="ghost" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Privacy Policy
          </Button>
        </Link>
        {session ? (
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <Button variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/" })
            }}
          >
            <Button variant="ghost" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </form>
        )}
      </div>
    </footer>
  )
}
