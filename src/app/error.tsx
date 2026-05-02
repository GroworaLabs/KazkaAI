"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-background">
      <div className="w-16 h-16 rounded-3xl bg-coral/10 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h2 className="font-heading font-900 text-2xl text-foreground mb-3">{t.error.title}</h2>
      <p className="text-muted-foreground mb-8">{t.error.message}</p>
      <Button onClick={reset}
        className="rounded-2xl bg-primary hover:bg-primary-dark text-white font-heading font-800 px-6 h-11">
        {t.error.tryAgain}
      </Button>
    </div>
  );
}
