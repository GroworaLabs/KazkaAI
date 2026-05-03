import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { THEMES } from "@/types";
import type { Metadata } from "next";
import { SharedStoryClient } from "./SharedStoryClient";
import { getLocaleFromCookie, pageMeta } from "@/lib/meta";

interface Props {
  params: { shareToken: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await prisma.story.findUnique({
    where: { shareToken: params.shareToken },
    select: { childName: true, theme: true },
  });

  const locale = getLocaleFromCookie();
  const m = pageMeta[locale].sharedStory;
  const themeObj = THEMES.find((t) => t.id === story?.theme);
  const themeLabel = locale === "uk"
    ? (themeObj?.label ?? story?.theme ?? "")
    : (themeObj?.labelEn ?? story?.theme ?? "");

  if (!story) return { title: m.notFound };

  return {
    title: m.title(story.childName, themeLabel),
    description: m.description(story.childName),
  };
}

export default async function SharedStoryPage({ params }: Props) {
  const story = await prisma.story.findUnique({
    where: { shareToken: params.shareToken },
  });

  if (!story) notFound();

  const themeObj = THEMES.find((t) => t.id === story.theme);

  return (
    <SharedStoryClient
      story={{
        ...story,
        createdAt: story.createdAt.toISOString(),
        themeEmoji: themeObj?.emoji ?? "📖",
        themeLabel: themeObj?.label ?? story.theme,
      }}
    />
  );
}
