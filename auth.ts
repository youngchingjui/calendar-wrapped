import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        scope: "openid email profile https://www.googleapis.com/auth/calendar.events.readonly",
        prompt: "consent",
        access_type: "offline",
      },
    },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {

      // Initial sign in
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expires_at: account.expires_at
        }
      } else if (Date.now() < (token.expires_at as number) * 1000) {
        // Subsequent logins, but the 'access_token' is still valid
        console.log('access token is still valid');
        return token;
      } else {
        if (!token.refresh_token) throw new TypeError("No refresh token present");

        try {
          // The 'token_endpoint' can be found in the provider's documentation. Or if they support OIDC,
          // at their '/.well-known/openid-configuration' endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          console.log('refreshing access token');
          const response = await fetch("https://oauth2.googleapis.com/token ", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) {
            throw new Error("Failed to refresh access token");
          }

          const newTokens = tokensOrError as {
            access_token: string;
            refresh_token?: string;
            expires_in: number;
          };

          token.accessToken = newTokens.access_token;
          token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in)

          // Some providers only issue refresh tokens once, so preserve if we did not get a new one
          if (newTokens.refresh_token) {
            token.refresh_token = newTokens.refresh_token
          }

          return token
        } catch (error) {
          console.error("Error refreshing access token", error);
          token.error = "RefreshTokenError"
          return token
        }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.error = token.error as "RefreshTokenError" | undefined;
      return session;
    },
  },
});
