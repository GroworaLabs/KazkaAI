import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { prisma } from "@/lib/prisma";
import { sendMagicLinkEmail } from "@/lib/resend";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_FROM_EMAIL ?? "КазкоAI <hello@kazka.ai>",
      async sendVerificationRequest({ identifier: email, url, request }) {
        const cookieHeader = request?.headers?.get("cookie") ?? "";
        const match = cookieHeader.match(/kazka_locale=([^;]+)/);
        const locale = match?.[1] === "uk" ? "uk" : "en";
        await sendMagicLinkEmail(email, url, locale);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id! },
          select: { plan: true },
        });
        token.plan = (dbUser?.plan as "FREE" | "PREMIUM") ?? "FREE";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.plan = token.plan ?? "FREE";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
});
