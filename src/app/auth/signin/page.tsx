"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await signIn("resend", { email, redirect: false });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30">
            <svg width="28" height="28" viewBox="0 0 20 20" fill="white">
              <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z"/>
            </svg>
          </div>
          <h1 className="font-heading font-900 text-2xl text-foreground mb-2">Увійти до КазкоAI</h1>
          <p className="text-muted-foreground text-sm">
            Зареєструйтесь або увійдіть, щоб зберігати казки
          </p>
        </div>

        <div className="rounded-3xl border-2 border-border bg-white p-7 space-y-4 shadow-xl shadow-primary/8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-teal/15 flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h2 className="font-heading font-900 text-lg mb-2">Перевірте пошту</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ми надіслали вам посилання для входу на{" "}
                <strong className="text-foreground">{email}</strong>.
                Перевірте папку &ldquo;Спам&rdquo; якщо не знайдете.
              </p>
            </div>
          ) : (
            <>
              <Button
                className="w-full gap-2.5 rounded-2xl border-2 border-border bg-white hover:bg-muted text-foreground font-heading font-800 h-12 shadow-sm"
                variant="outline"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Продовжити через Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-muted-foreground font-heading font-700">або через email</span>
                </div>
              </div>

              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-heading font-800 text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-2xl border-2 border-border focus:border-primary text-base"
                    required
                  />
                </div>
                <Button type="submit"
                  className="w-full h-12 rounded-2xl bg-primary hover:bg-primary-dark text-white font-heading font-800 shadow-sm"
                  disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                  Отримати посилання для входу
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Реєструючись, ви погоджуєтесь з{" "}
          <a href="/terms" className="underline hover:text-foreground transition-colors">умовами використання</a>{" "}
          та{" "}
          <a href="/privacy" className="underline hover:text-foreground transition-colors">політикою конфіденційності</a>.
        </p>
      </motion.div>
    </div>
  );
}
