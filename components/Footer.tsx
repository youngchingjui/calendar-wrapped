import Link from "next/link";
import { Home, FileText, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

export async function Footer() {
  const session = await auth();

  return (
    <footer>
      <div className="container flex text-background flex-col items-center justify-end gap-1 py-10 md:h-16 md:flex-row md:py-0">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/privacy">
          <Button variant="ghost" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Privacy Policy
          </Button>
        </Link>
        {session && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
            Logout
            </Button>
          </form>
        )}
      </div>
    </footer>
  );
}
