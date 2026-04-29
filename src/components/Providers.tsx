"use client";

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { LocaleProvider } from "@/contexts/LocaleContext";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <LocaleProvider>{children}</LocaleProvider>
    </SessionProvider>
  );
}
