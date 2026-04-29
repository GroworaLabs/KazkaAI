"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GenerationStatus } from "@/types";
import { buildShareText, getShareUrl } from "@/lib/utils";
import { Copy, Download, Share2, RefreshCw, CheckCheck, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/contexts/LocaleContext";

interface StoryDisplayProps {
  status: GenerationStatus;
  content: string;
  error: string | null;
  result: { storyId: string | null; shareToken: string | null } | null;
  childName?: string;
  theme?: string;
  isPremium?: boolean;
  onReset: () => void;
  onRegisterPrompt?: () => void;
}

export function StoryDisplay({
  status, content, error, result, childName, theme,
  isPremium = false, onReset, onRegisterPrompt,
}: StoryDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

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
        className="rounded-3xl bg-white border-2 border-border p-8 text-center space-y-4 shadow-xl shadow-primary/8"
      >
        {(error === "limit_reached" || error === "guest_limit") ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-sun/15 flex items-center justify-center mx-auto">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="#FFBE0B">
                <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z"/>
              </svg>
            </div>
            <h3 className="font-heading font-900 text-2xl text-foreground">{t.display.limitTitle}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
              {error === "guest_limit" ? t.display.limitGuestMsg : t.display.limitUserMsg}
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button onClick={onRegisterPrompt} size="sm"
                className="bg-primary hover:bg-primary-dark text-white rounded-full font-heading font-800 gap-1.5">
                {t.display.register} <ArrowRight size={13} />
              </Button>
              <Button variant="outline" size="sm"
                className="rounded-full border-2 border-border font-heading font-800 hover:border-primary/40"
                onClick={onReset}>
                {t.display.tryAgain}
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-heading font-900 text-2xl">{t.display.errorGeneric}</h3>
            <p className="text-muted-foreground text-sm">{error === "unknown_error" ? "" : error}</p>
            <Button onClick={onReset} variant="outline" size="sm"
              className="gap-2 rounded-full border-2 font-heading font-800">
              <RefreshCw size={13} /> {t.display.tryAgain}
            </Button>
          </>
        )}
      </motion.div>
    );
  }

  if (status === "idle") return null;

  const storyTitle = childName ? t.display.storyFor(childName) : t.display.yourStory;

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
              {t.display.writing}
            </div>
          ) : (
            <span className="font-heading font-700 text-white/40 text-xs">{t.display.done}</span>
          )}
        </div>

        {/* Story header */}
        <div className="px-6 pt-5 pb-4">
          <h2 className="font-heading font-900 text-xl text-foreground">{storyTitle}</h2>
          {theme && (
            <p className="text-xs text-muted-foreground font-heading font-700 uppercase tracking-widest mt-0.5">
              {t.display.theme}: {theme}
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
                {copied ? t.display.copied : t.display.copy}
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}
                className="gap-1.5 text-xs rounded-full border-2 border-border font-heading font-800 hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                <Share2 size={12} /> {t.display.share}
              </Button>

              {result?.shareToken && isPremium && (
                <Button variant="outline" size="sm" onClick={handleDownloadPdf}
                  className="gap-1.5 text-xs rounded-full border-2 border-sun/40 text-[#9B6700] font-heading font-800 hover:bg-sun/10 hover:border-sun">
                  <Download size={12} /> {t.display.downloadPdf}
                </Button>
              )}

              <Button variant="ghost" size="sm" onClick={onReset}
                className="gap-1.5 text-xs ml-auto rounded-full font-heading font-800 text-muted-foreground hover:text-foreground hover:bg-primary/5">
                <RefreshCw size={12} /> {t.display.newStory}
              </Button>
            </motion.div>

            {!isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mx-6 mb-6 rounded-2xl bg-primary/6 border border-primary/15 p-4 flex items-center justify-between gap-4"
              >
                <p className="text-sm font-heading font-700 text-foreground/75 leading-snug">
                  {t.display.guestSaveDesc}
                </p>
                <Button size="sm" onClick={onRegisterPrompt}
                  className="shrink-0 bg-primary hover:bg-primary-dark text-white rounded-full font-heading font-800 gap-1.5 px-4">
                  {t.display.guestSaveCta} <ArrowRight size={12} />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
