import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = process.env.RESEND_FROM_EMAIL ?? "КазкоAI <hello@kazka.ai>";

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Ласкаво просимо до КазкоAI! 🦄",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="color: #534AB7;">Вітаємо, ${name || "друже"}! 🎉</h1>
        <p>Дякуємо, що приєднались до КазкоAI — місця, де народжуються персональні казки для ваших дітей.</p>
        <p>З безкоштовним акаунтом ви можете створювати <strong>1 казку щодня</strong>.</p>
        <p>Хочете безліч казок без обмежень? Перейдіть на <strong>Преміум</strong> за $3.99/місяць.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing"
           style="display:inline-block;background:#534AB7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
          Дізнатись про Преміум
        </a>
        <p style="margin-top:32px; color:#666; font-size:14px;">З любов'ю, команда КазкоAI 🌙</p>
      </div>
    `,
  });
}

export async function sendMagicLinkEmail(to: string, url: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Ваше магічне посилання для входу — КазкоAI",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="color: #534AB7;">Увійти до КазкоAI ✨</h1>
        <p>Натисніть кнопку нижче, щоб увійти. Посилання дійсне 10 хвилин.</p>
        <a href="${url}"
           style="display:inline-block;background:#534AB7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
          Увійти
        </a>
        <p style="margin-top:24px; color:#666; font-size:13px;">Якщо ви не запитували цього листа — просто проігноруйте його.</p>
      </div>
    `,
  });
}

export async function sendStoryShareEmail(
  to: string,
  childName: string,
  shareUrl: string
) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Казка для ${childName} готова! 🌙`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="color: #534AB7;">Казка для ${childName} 📖</h1>
        <p>Ваша персональна казка готова! Перейдіть за посиланням, щоб прочитати і поділитись нею.</p>
        <a href="${shareUrl}"
           style="display:inline-block;background:#534AB7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">
          Читати казку
        </a>
        <p style="margin-top:32px; color:#666; font-size:14px;">З любов'ю, команда КазкоAI 🌙</p>
      </div>
    `,
  });
}
