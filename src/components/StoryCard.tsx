"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { THEMES } from "@/types";
import { formatDate } from "@/lib/utils";
import { Download, Share2, ExternalLink } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface StoryCardProps {
  story: {
    id: string;
    childName: string;
    childAge: number;
    theme: string;
    content: string;
    shareToken: string;
    createdAt: string | Date;
  };
  index?: number;
}

const THEME_COLORS = [
  "bg-primary/10 text-primary",
  "bg-sun/15 text-[#9B6700]",
  "bg-coral/10 text-coral-dark",
  "bg-teal/10 text-teal-dark",
  "bg-berry/10 text-berry",
];

export function StoryCard({ story, index = 0 }: StoryCardProps) {
  const { locale, t } = useLocale();
  const themeObj = THEMES.find((th) => th.id === story.theme);
  const themeLabel = themeObj ? (locale === "uk" ? themeObj.label : themeObj.labelEn) : story.theme;
  const colorClass = THEME_COLORS[index % THEME_COLORS.length];

  const handleShare = () => {
    const url = `${window.location.origin}/story/${story.shareToken}`;
    const text = t.card.shareText(story.childName, themeLabel, url);
    if (navigator.share) {
      navigator.share({ text, url });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const handleDownloadPdf = () => {
    window.open(`/api/pdf?token=${story.shareToken}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="rounded-3xl bg-white border-2 border-border overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-200 flex flex-col"
    >
      <div className="h-1.5 bg-gradient-to-r from-primary via-coral to-sun" />

      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-heading font-900 text-base text-foreground mb-1.5">{story.childName}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-heading font-800 px-2.5 py-0.5 rounded-full ${colorClass}`}>
                {story.childAge} {locale === "uk" ? "р." : "y.o."}
              </span>
              <span className="text-xs font-heading font-700 text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                {themeLabel}
              </span>
            </div>
          </div>
          <Link
            href={`/story/${story.shareToken}`}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            target="_blank"
          >
            <ExternalLink size={15} />
          </Link>
        </div>

        <p className="text-sm text-foreground/60 leading-relaxed story-prose !text-sm !leading-relaxed line-clamp-3">
          {story.content.slice(0, 130).trimEnd()}…
        </p>
      </div>

      <div className="px-5 pb-5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-heading font-700">
          {formatDate(story.createdAt, locale)}
        </span>

        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/8 hover:text-primary"
            onClick={handleShare}
            title={t.card.shareTitle}
          >
            <Share2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-sun/10 hover:text-[#9B6700]"
            onClick={handleDownloadPdf}
            title={t.card.downloadPdf}
          >
            <Download size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
