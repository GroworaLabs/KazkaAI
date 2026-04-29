import Anthropic from "@anthropic-ai/sdk";
import { StoryInput } from "@/types";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPTS: Record<string, string> = {
  uk: `Ти — майстер дитячих казок. Пишеш виключно українською мовою.
Казки добрі, з простою мораллю, без страшних чи жорстоких сцен.
Мова казки жива, тепла, з м'яким гумором — підходить для читання перед сном.
Ніколи не додавай заголовок. Повертай лише чистий текст казки.`,
  en: `You are a master children's story writer. You write exclusively in English.
Stories are kind, with a simple moral, no scary or violent scenes.
The language is lively, warm, with gentle humour — suitable for bedtime reading.
Never add a title. Return only the pure story text.`,
};

export function buildStoryPrompt(input: StoryInput): string {
  const { childName, childAge, theme, locale = "en" } = input;

  if (locale === "uk") {
    const ageContext =
      childAge <= 3 ? "дуже проста, короткі речення"
      : childAge <= 6 ? "проста, з яскравими образами"
      : childAge <= 9 ? "захоплива, з невеликою пригодою"
      : "цікава, з характером героя";

    return `Напиши казку на ніч для дитини на ім'я ${childName}, ${childAge} ${ageSuffix(childAge)}.
Головна тема / головний персонаж: ${theme}.
Дитина ${childName} — головний герой і здійснює щось хоробре або добре.
Стиль: ${ageContext}.
Довжина: 220–280 слів.
Структура: вступ → пригода → щаслива розв'язка → мораль (одне речення в кінці).
Повертай лише текст казки без заголовку.`;
  }

  const ageContext =
    childAge <= 3 ? "very simple, short sentences"
    : childAge <= 6 ? "simple, with vivid imagery"
    : childAge <= 9 ? "engaging, with a small adventure"
    : "interesting, with character development";

  return `Write a bedtime story for a child named ${childName}, ${childAge} ${childAge === 1 ? "year" : "years"} old.
Main theme / main character: ${theme}.
${childName} is the hero and does something brave or kind.
Style: ${ageContext}.
Length: 220–280 words.
Structure: opening → adventure → happy resolution → moral (one sentence at the end).
Return only the story text without a title.`;
}

function ageSuffix(age: number): string {
  if (age === 1) return "рік";
  if (age >= 2 && age <= 4) return "роки";
  return "років";
}

export async function generateStoryStream(input: StoryInput) {
  return anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPTS[input.locale ?? "en"] ?? SYSTEM_PROMPTS.en,
    messages: [
      {
        role: "user",
        content: buildStoryPrompt(input),
      },
    ],
  });
}

export async function generateStory(input: StoryInput): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPTS[input.locale ?? "en"] ?? SYSTEM_PROMPTS.en,
    messages: [
      {
        role: "user",
        content: buildStoryPrompt(input),
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type");
  return block.text;
}
