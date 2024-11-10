import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "@/auth";

function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="w-full" type="submit">
        <Image
          src="/google-logo.svg"
          width={20}
          height={20}
          alt="Google logo"
          className="mr-2"
        />
        Sign in with Google
      </Button>
    </form>
  );
}

export default GoogleSignInButton;
