// https://next-auth.js.org/configuration/initialization#route-handlers-app
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface Account {
  access_token: string;
  [key: string]: unknown;
}

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT & { accessToken?: string } }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
