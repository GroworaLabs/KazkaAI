"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { type Locale } from "@/lib/i18n";

export function Navbar() {
  const { data: session, status } = useSession();
  const { locale, setLocale, t } = useLocale();

  const otherLocale: Locale = locale === "en" ? "uk" : "en";

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#1E1044]/8">
      <nav className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z" fill="white"/>
            </svg>
          </div>
          <span className="font-heading font-800 text-xl text-foreground">
            {locale === "uk" ? <>Казко<span className="text-primary">AI</span></> : <>Kazka<span className="text-primary">AI</span></>}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Language switcher */}
          <button
            onClick={() => setLocale(otherLocale)}
            className="h-8 px-3 rounded-full text-xs font-heading font-800 border-2 border-border hover:border-primary/40 hover:bg-primary/5 transition-colors text-foreground/60 hover:text-primary"
            title={otherLocale === "en" ? "Switch to English" : "Переключити на українську"}
          >
            {otherLocale === "en" ? "EN" : "UA"}
          </button>

          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
          ) : session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-full hover:bg-primary/8 hover:text-primary font-heading font-700">
                  <LayoutDashboard size={15} />
                  <span className="hidden sm:inline">{t.nav.myStories}</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2 ml-2 pl-3 border-l-2 border-border">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="h-8 w-8 rounded-full ring-2 ring-primary/20" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-heading font-800">
                    {(session.user?.name ?? "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })} className="h-8 w-8 rounded-full text-foreground/40 hover:text-coral hover:bg-coral/8">
                  <LogOut size={14} />
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* <Link href="/pricing">
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary/8 hover:text-primary font-heading font-700">
                  {t.nav.pricing}
                </Button>
              </Link> */}
              <Button size="sm" onClick={() => signIn()} className="rounded-full bg-primary hover:bg-primary-dark text-white font-heading font-800 px-5 shadow-sm">
                {t.nav.signIn}
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
