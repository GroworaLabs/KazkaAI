"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StoryCard } from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Plan } from "@/types";
import { PLAN_LIMITS } from "@/lib/limits";
import { Plus, Star, BookOpen } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface Story {
  id: string;
  childName: string;
  childAge: number;
  theme: string;
  content: string;
  shareToken: string;
  createdAt: string;
}

interface DashboardClientProps {
  stories: Story[];
  total: number;
  page: number;
  limit: number;
  user: {
    plan: Plan;
    storiesUsedToday: number;
    name?: string | null;
    email?: string | null;
  } | null;
  upgraded: boolean;
}

export function DashboardClient({ stories, total, page, limit, user, upgraded }: DashboardClientProps) {
  const { t } = useLocale();
  const d = t.dashboard;
  const totalPages = Math.ceil(total / limit);
  const isPremium = user !== null; // all logged-in users get premium until payments are enabled

  useEffect(() => {
    if (upgraded) {
      const el = document.getElementById("upgrade-banner");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [upgraded]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#1E1044] px-5 py-12">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/40 text-xs font-heading font-800 uppercase tracking-widest mb-1">
                {user?.name ?? user?.email ?? d.account}
              </p>
              <h1 className="font-heading font-900 text-3xl sm:text-4xl text-white mb-2">{d.title}</h1>
              <p className="text-white/50 text-sm">
                {total === 0 ? d.noStories : d.storiesCount(total)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-800 ${
                isPremium ? "bg-sun text-[#1E1044]" : "bg-white/10 text-white/60"
              }`}>
                {isPremium ? (
                  <><Star size={11} fill="currentColor" /> {d.premium}</>
                ) : (
                  <><BookOpen size={11} /> {d.free}</>
                )}
              </div>
              <p className="text-xs text-white/40 font-heading font-700">
                {d.storiesUsed(user?.storiesUsedToday ?? 0, PLAN_LIMITS.PREMIUM.daily)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-10">
        <div className="container mx-auto max-w-5xl">

          {upgraded && (
            <motion.div
              id="upgrade-banner"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-3xl bg-sun/15 border-2 border-sun/30 p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-sun flex items-center justify-center shrink-0">
                <Star size={18} className="text-[#1E1044]" fill="currentColor" />
              </div>
              <p className="font-heading font-800 text-sm text-foreground">{d.upgradeSuccess}</p>
            </motion.div>
          )}

          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-900 text-xl text-foreground">
              {stories.length > 0 ? d.allStories : ""}
            </h2>
            <div className="flex gap-3">
              <Link href="/">
                <Button size="sm"
                  className="gap-1.5 rounded-full bg-primary hover:bg-primary-dark text-white font-heading font-800 shadow-sm px-5">
                  <Plus size={15} />
                  {d.newStory}
                </Button>
              </Link>
            </div>
          </div>

          {stories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <BookOpen size={28} className="text-primary" />
              </div>
              <h3 className="font-heading font-900 text-xl mb-2">{d.emptyTitle}</h3>
              <p className="text-muted-foreground text-sm mb-7 max-w-xs mx-auto">{d.emptyDesc}</p>
              <Link href="/">
                <Button className="gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white font-heading font-800 px-6 h-12">
                  <Plus size={16} />
                  {d.createFirst}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {stories.map((story, i) => (
                  <StoryCard key={story.id} story={story} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              {page > 1 && (
                <Link href={`/dashboard?page=${page - 1}`}>
                  <Button variant="outline" size="sm"
                    className="rounded-full border-2 font-heading font-800">{d.prev}</Button>
                </Link>
              )}
              <span className="flex items-center text-sm text-muted-foreground font-heading font-700 px-3">
                {page} / {totalPages}
              </span>
              {page < totalPages && (
                <Link href={`/dashboard?page=${page + 1}`}>
                  <Button variant="outline" size="sm"
                    className="rounded-full border-2 font-heading font-800">{d.next}</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
