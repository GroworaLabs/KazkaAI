import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

export function getLocaleFromCookie(): Locale {
  try {
    return cookies().get("kazka_locale")?.value === "uk" ? "uk" : "en";
  } catch {
    return "en";
  }
}

export const pageMeta = {
  en: {
    siteName: "KazkaAI",
    titleTemplate: "%s | KazkaAI",
    ogLocale: "en_US",
    home: {
      title: "KazkaAI — Personalised Fairy Tales for Children",
      description: "Create a unique fairy tale where your child is the hero. Personalised stories in 10 seconds with AI.",
      keywords: ["children's stories", "personalised fairy tales", "AI stories", "KazkaAI"],
    },
    dashboard: {
      title: "My Stories",
      description: "Manage and read your personalised fairy tales on KazkaAI.",
    },
    signin: {
      title: "Sign In",
      description: "Sign in or create a free account on KazkaAI.",
    },
    verify: {
      title: "Check your email",
      description: "We sent you a magic sign-in link for KazkaAI.",
    },
    sharedStory: {
      title: (childName: string, theme: string) => `A Story for ${childName} about ${theme}`,
      description: (childName: string) => `A personalised fairy tale for ${childName} — created on KazkaAI`,
      notFound: "Story not found",
    },
  },
  uk: {
    siteName: "КазкоAI",
    titleTemplate: "%s | КазкоAI",
    ogLocale: "uk_UA",
    home: {
      title: "КазкоAI — Персональні казки для дітей",
      description: "Створіть унікальну казку, де ваша дитина — головний герой. Персональні казки за 10 секунд за допомогою ШІ.",
      keywords: ["казки для дітей", "персональні казки", "ШІ казки", "казки українською", "казкоAI"],
    },
    dashboard: {
      title: "Мої казки",
      description: "Керуйте та читайте ваші персональні казки на КазкоAI.",
    },
    signin: {
      title: "Увійти",
      description: "Увійдіть або зареєструйтесь безкоштовно на КазкоAI.",
    },
    verify: {
      title: "Перевірте пошту",
      description: "Ми надіслали вам посилання для входу до КазкоAI.",
    },
    sharedStory: {
      title: (childName: string, theme: string) => `Казка для ${childName} про ${theme}`,
      description: (childName: string) => `Персональна казка для ${childName} — створена на КазкоAI`,
      notFound: "Казку не знайдено",
    },
  },
};
