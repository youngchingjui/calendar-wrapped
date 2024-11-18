import { signOut } from "@/auth"
import { Button } from "./ui/button"

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button
        variant="outline"
        type="submit"
        className="fixed bottom-4 right-4 px-4 py-2 rounded shadow"
      >
        Logout
      </Button>
    </form>
  )
}
