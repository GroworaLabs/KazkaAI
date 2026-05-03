import { Resend } from "resend";
import type { Locale } from "@/lib/i18n";

export const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = process.env.RESEND_FROM_EMAIL ?? "КазкоAI <hello@kazka.ai>";

function safeLocale(locale?: string): Locale {
  return locale === "uk" ? "uk" : "en";
}

const emailCopy = {
  en: {
    welcome: {
      subject: "Welcome to KazkaAI! 🦄",
      heading: (name: string) => `Welcome, ${name || "friend"}! 🎉`,
      body1: "Thank you for joining KazkaAI — where personalised fairy tales for your children come to life.",
      body2: "With a free account you can create <strong>1 story per day</strong>.",
      body3: "Want unlimited stories? Upgrade to <strong>Premium</strong> for $3.99/month.",
      cta: "Learn about Premium",
      footer: "With love, the KazkaAI team 🌙",
    },
    magicLink: {
      subject: "Your magic sign-in link — KazkaAI",
      heading: "Sign in to KazkaAI ✨",
      body: "Click the button below to sign in. The link is valid for 10 minutes.",
      cta: "Sign In",
      ignore: "If you didn't request this email — just ignore it.",
    },
    storyShare: {
      subject: (name: string) => `The story for ${name} is ready! 🌙`,
      heading: (name: string) => `Story for ${name} 📖`,
      body: "Your personalised story is ready! Follow the link to read and share it.",
      cta: "Read the story",
      footer: "With love, the KazkaAI team 🌙",
    },
  },
  uk: {
    welcome: {
      subject: "Ласкаво просимо до КазкоAI! 🦄",
      heading: (name: string) => `Вітаємо, ${name || "друже"}! 🎉`,
      body1: "Дякуємо, що приєднались до КазкоAI — місця, де народжуються персональні казки для ваших дітей.",
      body2: "З безкоштовним акаунтом ви можете створювати <strong>1 казку щодня</strong>.",
      body3: "Хочете безліч казок без обмежень? Перейдіть на <strong>Преміум</strong> за $3.99/місяць.",
      cta: "Дізнатись про Преміум",
      footer: "З любов'ю, команда КазкоAI 🌙",
    },
    magicLink: {
      subject: "Ваше магічне посилання для входу — КазкоAI",
      heading: "Увійти до КазкоAI ✨",
      body: "Натисніть кнопку нижче, щоб увійти. Посилання дійсне 10 хвилин.",
      cta: "Увійти",
      ignore: "Якщо ви не запитували цього листа — просто проігноруйте його.",
    },
    storyShare: {
      subject: (name: string) => `Казка для ${name} готова! 🌙`,
      heading: (name: string) => `Казка для ${name} 📖`,
      body: "Ваша персональна казка готова! Перейдіть за посиланням, щоб прочитати і поділитись нею.",
      cta: "Читати казку",
      footer: "З любов'ю, команда КазкоAI 🌙",
    },
  },
};

export async function sendWelcomeEmail(to: string, name: string, locale?: string) {
  const c = emailCopy[safeLocale(locale)].welcome;
  await resend.emails.send({
    from: FROM,
    to,
    subject: c.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="color: #534AB7;">${c.heading(name)}</h1>
        <p>${c.body1}</p>
        <p>${c.body2}</p>
        <p>${c.body3}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing"
           style="display:inline-block;background:#534AB7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
          ${c.cta}
        </a>
        <p style="margin-top:32px; color:#666; font-size:14px;">${c.footer}</p>
      </div>
    `,
  });
}

export async function sendMagicLinkEmail(to: string, url: string, locale?: string) {
  const c = emailCopy[safeLocale(locale)].magicLink;
  await resend.emails.send({
    from: FROM,
    to,
    subject: c.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="color: #534AB7;">${c.heading}</h1>
        <p>${c.body}</p>
        <a href="${url}"
           style="display:inline-block;background:#534AB7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
          ${c.cta}
        </a>
        <p style="margin-top:24px; color:#666; font-size:13px;">${c.ignore}</p>
      </div>
    `,
  });
}

export async function sendStoryShareEmail(
  to: string,
  childName: string,
  shareUrl: string,
  locale?: string
) {
  const c = emailCopy[safeLocale(locale)].storyShare;
  await resend.emails.send({
    from: FROM,
    to,
    subject: c.subject(childName),
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="color: #534AB7;">${c.heading(childName)}</h1>
        <p>${c.body}</p>
        <a href="${shareUrl}"
           style="display:inline-block;background:#534AB7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
          ${c.cta}
        </a>
        <p style="margin-top:32px; color:#666; font-size:14px;">${c.footer}</p>
      </div>
    `,
  });
}
