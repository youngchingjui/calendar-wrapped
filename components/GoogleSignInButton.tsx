"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

function GoogleSignInButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn("google")}
    >
      <Image
        src="/google-logo.svg"
        width={20}
        height={20}
        alt="Google logo"
        className="mr-2"
      />
      Sign in with Google
    </Button>
  );
}

export default GoogleSignInButton;
