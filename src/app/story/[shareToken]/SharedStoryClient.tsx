"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate, buildShareText } from "@/lib/utils";
import { Copy, Download, Share2, CheckCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface StoryData {
  id: string;
  childName: string;
  childAge: number;
  theme: string;
  content: string;
  shareToken: string;
  createdAt: string;
  themeEmoji: string;
  themeLabel: string;
}

export function SharedStoryClient({ story }: { story: StoryData }) {
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const handleCopy = () => {
    navigator.clipboard.writeText(story.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    const text = buildShareText(story.childName, story.themeLabel, story.shareToken, locale);
    const url = `${window.location.origin}/story/${story.shareToken}`;
    if (navigator.share) {
      navigator.share({ text, url });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownloadPdf = () => {
    window.open(`/api/pdf?token=${story.shareToken}`, "_blank");
  };

  const storyTitle = locale === "uk"
    ? `Казка для ${story.childName}`
    : `A Story for ${story.childName}`;
  const backLabel = locale === "uk" ? "На головну" : "Home";
  const ctaLabel = locale === "uk"
    ? "Хочете таку саму казку для своєї дитини?"
    : "Want a personalised story for your child?";
  const ctaButton = locale === "uk" ? "Створити безкоштовно" : "Create for free";
  const ageLabel = locale === "uk" ? `${story.childAge} р.` : `${story.childAge} y.o.`;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#1E1044] px-5 py-10">
        <div className="container mx-auto max-w-2xl">
          <Link href="/">
            <Button variant="ghost" size="sm"
              className="gap-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full font-heading font-800 mb-6 -ml-2">
              <ArrowLeft size={15} />
              {backLabel}
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-heading font-800 text-white/40 uppercase tracking-widest">{story.themeLabel}</span>
            <span className="text-white/20">·</span>
            <span className="text-xs font-heading font-700 text-white/40">{ageLabel}</span>
            <span className="text-white/20">·</span>
            <span className="text-xs font-heading font-700 text-white/40">{formatDate(story.createdAt, locale)}</span>
          </div>
          <h1 className="font-heading font-900 text-3xl sm:text-4xl text-white">{storyTitle}</h1>
        </div>
      </div>

      <div className="px-5 py-10">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white border-2 border-border overflow-hidden shadow-xl shadow-primary/8"
          >
            <div className="bg-primary px-6 py-3.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                {["bg-sun", "bg-coral", "bg-teal"].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full opacity-80 ${c}`} />
                ))}
              </div>
              <span className="font-heading font-800 text-white/70 text-xs">{t.brandName}</span>
              <span className="font-heading font-700 text-white/40 text-xs">{locale === "uk" ? "стор. 1" : "p. 1"}</span>
            </div>

            <div className="p-7 sm:p-10">
              <div className="story-prose whitespace-pre-wrap">{story.content}</div>
            </div>

            <div className="px-7 pb-7 flex flex-wrap gap-2.5">
              <Button variant="outline" size="sm" onClick={handleCopy}
                className="gap-1.5 text-xs rounded-full border-2 font-heading font-800 hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
                {copied ? t.display.copied : t.display.copy}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}
                className="gap-1.5 text-xs rounded-full border-2 font-heading font-800 hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                <Share2 size={12} />
                {t.display.share}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPdf}
                className="gap-1.5 text-xs rounded-full border-2 border-sun/40 text-[#9B6700] font-heading font-800 hover:bg-sun/10 hover:border-sun">
                <Download size={12} />
                PDF
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-3xl bg-primary px-8 py-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #FFBE0B 0%, transparent 60%)" }} />
            <p className="font-heading font-800 text-white/70 text-sm mb-3 relative z-10">{ctaLabel}</p>
            <Link href="/">
              <Button
                className="bg-sun hover:bg-sun-dark text-[#1E1044] font-heading font-800 rounded-2xl px-7 h-11 gap-2 shadow-md relative z-10">
                {ctaButton}
                <ArrowRight size={15} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
