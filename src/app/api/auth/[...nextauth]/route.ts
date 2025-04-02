// https://next-auth.js.org/configuration/initialization#route-handlers-app
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import type { NextAuthOptions } from "next-auth";

// NextAuthのSessionを拡張して独自のプロパティを追加
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// JWTトークンの型も拡張
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

// NextAuth標準のAccount型を使用し、型の互換性を確保します
const authOptions: NextAuthOptions = {
  // 認証のセキュリティを高めるために秘密鍵を設定
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
}

// ハンドラーの生成とエクスポート
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
