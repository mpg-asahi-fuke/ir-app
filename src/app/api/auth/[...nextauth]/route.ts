// https://next-auth.js.org/configuration/initialization#route-handlers-app
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }: { session: any; token: any; user: any }) {
      session.accessToken = token.accessToken
      return session
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
