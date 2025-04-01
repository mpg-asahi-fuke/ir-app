// https://next-auth.js.org/configuration/initialization#route-handlers-app
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

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
  ]
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
