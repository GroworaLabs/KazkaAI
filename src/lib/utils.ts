import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function getShareUrl(shareToken: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}/story/${shareToken}`;
}

export function buildShareText(
  childName: string,
  theme: string,
  shareToken: string,
  locale = "en"
): string {
  const url = getShareUrl(shareToken);
  if (locale === "uk") {
    return `Я щойно створила казку для ${childName} про ${theme}! Спробуй і для своєї дитини: ${url}`;
  }
  return `I just created a story for ${childName} about ${theme}! Try it for your child: ${url}`;
}

export function getThemeLabel(themeId: string): string {
  const map: Record<string, string> = {
    unicorn: "єдинорога",
    dragon: "дракона",
    space: "космос",
    cat: "кота",
    fairy: "фею",
    mermaid: "русалку",
    knight: "лицаря",
    princess: "принцесу",
    forest: "чарівний ліс",
    dinosaur: "динозавра",
    robot: "робота",
    ocean: "океан",
  };
  return map[themeId] ?? themeId;
}
