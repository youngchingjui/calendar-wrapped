import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken: string
    error?: "RefreshTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    expires_at: number
    refreshToken?: string
    error?: "RefreshTokenError"
  }
}
