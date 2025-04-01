// https://next-auth.js.org/configuration/initialization#route-handlers-app
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// ハンドラーの生成とエクスポート
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
