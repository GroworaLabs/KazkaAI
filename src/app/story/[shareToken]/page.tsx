import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { THEMES } from "@/types";
import type { Metadata } from "next";
import { SharedStoryClient } from "./SharedStoryClient";

interface Props {
  params: { shareToken: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await prisma.story.findUnique({
    where: { shareToken: params.shareToken },
    select: { childName: true, theme: true },
  });

  if (!story) return { title: "Казку не знайдено" };

  const themeLabel =
    THEMES.find((t) => t.id === story.theme)?.label ?? story.theme;

  return {
    title: `Казка для ${story.childName} про ${themeLabel}`,
    description: `Персональна казка для ${story.childName} — створена на КазкоAI`,
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
