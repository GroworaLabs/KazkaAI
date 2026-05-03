"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GenerationStatus } from "@/types";
import { buildShareText, getShareUrl } from "@/lib/utils";
import { Copy, Download, Share2, RefreshCw, CheckCheck, Loader2, ArrowRight, BookOpen, Star, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";

interface StoryDisplayProps {
  status: GenerationStatus;
  content: string;
  error: string | null;
  cooldownSeconds?: number | null;
  result: { storyId: string | null; shareToken: string | null } | null;
  childName?: string;
  theme?: string;
  isLoggedIn?: boolean;
  isPremium?: boolean;
  onReset: () => void;
  onRegisterPrompt?: () => void;
}

export function StoryDisplay({
  status, content, error, cooldownSeconds, result, childName, theme,
  isLoggedIn = false, isPremium = false, onReset, onRegisterPrompt,
}: StoryDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { locale, t } = useLocale();
  const d = t.display;

  const onResetRef = useRef(onReset);
  useEffect(() => { onResetRef.current = onReset; }, [onReset]);

  useEffect(() => {
    if (error !== "cooldown") return;
    const secs = cooldownSeconds ?? 10;
    setCountdown(secs);
    const id = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setTimeout(() => onResetRef.current(), 400);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [error, cooldownSeconds]);

  const handleCopy = useCallback(() => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [content]);

  const handleShare = useCallback(() => {
    if (!result?.shareToken || !childName || !theme) return;
    const text = buildShareText(childName, theme, result.shareToken, locale);
    if (navigator.share) {
      navigator.share({ text, url: getShareUrl(result.shareToken) });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [result, childName, theme, locale]);

  const handleDownloadPdf = useCallback(() => {
    if (!result?.shareToken) return;
    window.open(`/api/pdf?token=${result.shareToken}`, "_blank");
  }, [result]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white border-2 border-border shadow-xl shadow-primary/8 overflow-hidden"
      >
        {error === "cooldown" ? (
          <div className="p-8 text-center space-y-4">
            {/* Countdown ring */}
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="#06B6D4" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - countdown / (cooldownSeconds ?? 10))}`}
                  style={{ transition: "stroke-dashoffset 0.9s linear" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-heading font-900 text-2xl text-teal-600">
                {countdown}
              </span>
            </div>
            <h3 className="font-heading font-900 text-xl text-foreground">{d.cooldownLabel}</h3>
            <p className="text-muted-foreground text-sm">{d.cooldownAutoReady}</p>
          </div>
        ) : error === "guest_limit" ? (
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="font-heading font-900 text-2xl text-foreground">{d.limitTitle}</h3>
              <p className="text-muted-foreground text-sm mt-1">{d.limitOptionsTitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Free option */}
              <div className="rounded-2xl border-2 border-border p-4 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen size={15} className="text-primary" />
                </div>
                <p className="font-heading font-800 text-sm">{d.limitFreeOption}</p>
                <p className="text-xs text-muted-foreground">{d.limitFreeOptionDesc}</p>
                <Button onClick={onRegisterPrompt} size="sm"
                  className="mt-auto bg-primary hover:bg-primary-dark text-white rounded-full font-heading font-800 gap-1 text-xs h-8">
                  {d.register} <ArrowRight size={11} />
                </Button>
              </div>
              {/* Premium option */}
              <div className="rounded-2xl border-2 border-sun/50 bg-sun/5 p-4 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-xl bg-sun/20 flex items-center justify-center">
                  <Star size={15} className="text-[#9B6700]" fill="currentColor" />
                </div>
                <p className="font-heading font-800 text-sm">{d.limitPremiumOption}</p>
                <p className="text-xs text-muted-foreground">{d.limitPremiumOptionDesc}</p>
                <div className="inline-flex items-center gap-1 text-xs font-heading font-700 text-[#9B6700]">
                  <FileDown size={11} /> {d.limitPdfBadge}
                </div>
                <Link href="/pricing" className="mt-auto">
                  <Button size="sm"
                    className="w-full bg-sun hover:bg-sun/80 text-[#1E1044] rounded-full font-heading font-800 gap-1 text-xs h-8">
                    {d.limitPremiumCta} <ArrowRight size={11} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : error === "limit_reached" ? (
          <div className="p-6 sm:p-8">
            <div className="text-center mb-5">
              <h3 className="font-heading font-900 text-2xl text-foreground">{d.limitTitle}</h3>
            </div>
            {isPremium ? (
              /* PREMIUM hit 30/day — simple message */
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">{d.limitUserMsg}</p>
                <Button onClick={onReset} variant="outline" size="sm"
                  className="rounded-full border-2 font-heading font-800">
                  {d.limitBackTomorrow}
                </Button>
              </div>
            ) : (
              /* FREE user — show upgrade card */
              <div className="rounded-2xl border-2 border-sun/50 bg-sun/5 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[#9B6700]" fill="currentColor" />
                  <p className="font-heading font-800 text-base">{d.limitPremiumOption} — $3.99/{locale === "uk" ? "місяць" : "month"}</p>
                </div>
                <ul className="space-y-1.5">
                  {[d.limitPremiumOptionDesc, d.limitPdfBadge].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-foreground/70">
                      <span className="w-4 h-4 rounded-full bg-sun/30 flex items-center justify-center shrink-0">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="#9B6700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {feat === d.limitPdfBadge
                        ? <span className="flex items-center gap-1"><FileDown size={12} className="text-[#9B6700]" />{feat}</span>
                        : feat}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 pt-1">
                  <Link href="/pricing" className="flex-1">
                    <Button size="sm"
                      className="w-full bg-sun hover:bg-sun/80 text-[#1E1044] rounded-full font-heading font-800 gap-1.5">
                      {d.limitPremiumCta} <ArrowRight size={13} />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={onReset}
                    className="rounded-full border-2 font-heading font-800 text-muted-foreground">
                    {d.limitBackTomorrow}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <h3 className="font-heading font-900 text-2xl">{d.errorGeneric}</h3>
            <p className="text-muted-foreground text-sm">{error === "unknown_error" ? "" : error}</p>
            <Button onClick={onReset} variant="outline" size="sm"
              className="gap-2 rounded-full border-2 font-heading font-800">
              <RefreshCw size={13} /> {d.tryAgain}
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  if (status === "idle") return null;

  const storyTitle = childName ? d.storyFor(childName) : d.yourStory;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="story"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-white border-2 border-border overflow-hidden shadow-xl shadow-primary/8"
      >
        {/* Book-page top bar */}
        <div className="bg-primary px-6 py-3.5 flex items-center justify-between">
          <div className="flex gap-1.5">
            {["bg-sun", "bg-coral", "bg-teal"].map((c, i) => (
              <div key={i} className={cn("w-2.5 h-2.5 rounded-full opacity-80", c)} />
            ))}
          </div>
          <span className="font-heading font-800 text-white/70 text-xs">{t.brandName}</span>
          {status === "streaming" ? (
            <div className="flex items-center gap-1.5 text-xs text-white/70 font-heading font-700">
              <Loader2 size={10} className="animate-spin" />
              {d.writing}
            </div>
          ) : (
            <span className="font-heading font-700 text-white/40 text-xs">{d.done}</span>
          )}
        </div>

        {/* Story header */}
        <div className="px-6 pt-5 pb-4">
          <h2 className="font-heading font-900 text-xl text-foreground">{storyTitle}</h2>
          {theme && (
            <p className="text-xs text-muted-foreground font-heading font-700 uppercase tracking-widest mt-0.5">
              {d.theme}: {theme}
            </p>
          )}
        </div>

        <div className="mx-6 h-px bg-border" />

        {/* Story text */}
        <div className="p-6 sm:p-8">
          {status === "loading" ? (
            <div className="space-y-3">
              {[100, 92, 96, 88, 94, 90, 72].map((w, i) => (
                <div key={i} className="shimmer h-4 rounded-full" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : (
            <div className="story-prose whitespace-pre-wrap">{content}</div>
          )}
        </div>

        {/* Actions */}
        {status === "done" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-6 pb-6 flex flex-wrap items-center gap-2"
            >
              <Button variant="outline" size="sm" onClick={handleCopy}
                className="gap-1.5 text-xs rounded-full border-2 border-border font-heading font-800 hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
                {copied ? d.copied : d.copy}
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}
                className="gap-1.5 text-xs rounded-full border-2 border-border font-heading font-800 hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                <Share2 size={12} /> {d.share}
              </Button>

              {result?.shareToken && isPremium && (
                <Button variant="outline" size="sm" onClick={handleDownloadPdf}
                  className="gap-1.5 text-xs rounded-full border-2 border-sun/40 text-[#9B6700] font-heading font-800 hover:bg-sun/10 hover:border-sun">
                  <Download size={12} /> {d.downloadPdf}
                </Button>
              )}

              {result?.shareToken && !isPremium && isLoggedIn && (
                <Link href="/pricing">
                  <Button variant="outline" size="sm"
                    className="gap-1.5 text-xs rounded-full border-2 border-sun/40 text-[#9B6700] font-heading font-800 hover:bg-sun/10 hover:border-sun">
                    <FileDown size={12} /> {d.pdfPremium}
                  </Button>
                </Link>
              )}

              <Button variant="ghost" size="sm" onClick={onReset}
                className="gap-1.5 text-xs ml-auto rounded-full font-heading font-800 text-muted-foreground hover:text-foreground hover:bg-primary/5">
                <RefreshCw size={12} /> {d.newStory}
              </Button>
            </motion.div>

            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mx-6 mb-6 rounded-2xl bg-primary/6 border border-primary/15 p-4 flex items-center justify-between gap-4"
              >
                <p className="text-sm font-heading font-700 text-foreground/75 leading-snug">
                  {d.guestSaveDesc}
                </p>
                <Button size="sm" onClick={onRegisterPrompt}
                  className="shrink-0 bg-primary hover:bg-primary-dark text-white rounded-full font-heading font-800 gap-1.5 px-4">
                  {d.guestSaveCta} <ArrowRight size={12} />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
