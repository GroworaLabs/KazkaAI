"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

export default function NotFound() {
  const { t } = useLocale();
  const nf = t.notFound;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-background">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <svg width="36" height="36" viewBox="0 0 20 20" fill="none">
          <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z"
            fill="#4F3AE8" opacity="0.3"/>
        </svg>
      </div>
      <h1 className="font-heading font-900 text-3xl text-foreground mb-3">{nf.title}</h1>
      <p className="text-muted-foreground mb-8 max-w-xs">{nf.message}</p>
      <Link href="/">
        <Button className="rounded-2xl bg-primary hover:bg-primary-dark text-white font-heading font-800 px-6 h-11">
          {nf.backHome}
        </Button>
      </Link>
    </div>
  );
}
