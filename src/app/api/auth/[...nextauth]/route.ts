// https://next-auth.js.org/configuration/initialization#route-handlers-app
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";
import type { Account as NextAuthAccount } from "next-auth";

// NextAuth標準のAccount型を使用し、型の互換性を確保します
const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token
      }
      return token
    }
  }
}

// ハンドラーの生成とエクスポート
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
