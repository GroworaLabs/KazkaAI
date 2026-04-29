import Groq from "groq-sdk";
import { StoryInput, StoryLength, StoryMood, StoryOccasion, StoryValue } from "@/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

function ageSuffixUk(age: number): string {
  if (age === 1) return "рік";
  if (age >= 2 && age <= 4) return "роки";
  return "років";
}

const WORD_COUNTS: Record<StoryLength, string> = {
  short: "120–160",
  standard: "220–280",
  long: "380–450",
};

const MOOD_UK: Record<StoryMood, string> = {
  bedtime: "спокійна, заспокійлива, підходить для читання перед сном",
  adventure: "захоплива, динамічна, з пригодами і несподіванками",
  funny: "весела, з гумором і смішними ситуаціями",
  educational: "повчальна, дитина природно дізнається щось нове",
};

const MOOD_EN: Record<StoryMood, string> = {
  bedtime: "calm and soothing, perfect for winding down before sleep",
  adventure: "exciting and dynamic, full of surprises and action",
  funny: "humorous and playful, with funny situations that make kids laugh",
  educational: "gently informative, the child naturally learns something new",
};

const OCCASION_UK: Record<StoryOccasion, string | null> = {
  none: null,
  birthday: "Сьогодні у головного героя день народження — це особливий день і казка це відображає",
  firstday: "Головний герой вперше йде до дитячого садка або школи і трохи хвилюється, але виявляється що це чудово",
  darkfear: "Головний герой боїться темряви, і ця казка м'яко допомагає подолати цей страх",
  newsibling: "У сім'ї головного героя з'явився молодший братик або сестричка — казка про те як це здорово",
};

const OCCASION_EN: Record<StoryOccasion, string | null> = {
  none: null,
  birthday: "Today is the hero's birthday — this is a special day and the story reflects that",
  firstday: "The hero is going to kindergarten or school for the first time, a little nervous, but discovers it's wonderful",
  darkfear: "The hero is afraid of the dark, and this story gently helps overcome that fear",
  newsibling: "A new baby brother or sister has arrived in the family — a story about how wonderful that is",
};

const VALUE_UK: Record<StoryValue, string | null> = {
  none: null,
  courage: "сміливість — герой долає страх і робить щось, на що раніше не наважувався",
  kindness: "доброта — невеликий добрий вчинок змінює все навколо",
  sharing: "вміння ділитись — герой розуміє що разом краще ніж поодинці",
  honesty: "чесність — герой визнає помилку і це робить його сильнішим",
  friendship: "справжня дружба — герой підтримує когось у важкий момент",
};

const VALUE_EN: Record<StoryValue, string | null> = {
  none: null,
  courage: "courage — the hero overcomes fear and does something they never dared before",
  kindness: "kindness — a small kind act changes everything around",
  sharing: "sharing — the hero realises that together is better than alone",
  honesty: "honesty — the hero admits a mistake and becomes stronger for it",
  friendship: "true friendship — the hero supports someone in a difficult moment",
};

export function buildStoryPrompt(input: StoryInput): string {
  const {
    childName, childAge, theme, locale = "en",
    length = "standard", mood = "bedtime",
    occasion = "none", value = "none", friendName,
  } = input;
  const wordCount = WORD_COUNTS[length];

  if (locale === "uk") {
    const ageContext =
      childAge <= 3 ? "дуже проста, короткі речення"
      : childAge <= 6 ? "проста, з яскравими образами"
      : childAge <= 9 ? "захоплива, з невеликою пригодою"
      : "цікава, з характером героя";

    const lines = [
      `Напиши казку для дитини на ім'я ${childName}, ${childAge} ${ageSuffixUk(childAge)}.`,
      `Головна тема / головний персонаж: ${theme}.`,
      `${childName} — головний герой.`,
      friendName ? `У казці також є друг на ім'я ${friendName}, який грає важливу роль у сюжеті.` : "",
      OCCASION_UK[occasion] ? `Контекст: ${OCCASION_UK[occasion]}.` : "",
      VALUE_UK[value] ? `Головна цінність яку несе казка: ${VALUE_UK[value]}.` : "",
      `Складність мови: ${ageContext}.`,
      `Атмосфера: ${MOOD_UK[mood]}.`,
      `Довжина: ${wordCount} слів.`,
      `Структура: вступ → пригода → розв'язка → мораль (одне речення в кінці).`,
      `Повертай лише текст казки без заголовку.`,
    ].filter(Boolean);

    return lines.join("\n");
  }

  const ageContext =
    childAge <= 3 ? "very simple, short sentences"
    : childAge <= 6 ? "simple, with vivid imagery"
    : childAge <= 9 ? "engaging, with a small adventure"
    : "interesting, with character development";

  const lines = [
    `Write a story for a child named ${childName}, ${childAge} ${childAge === 1 ? "year" : "years"} old.`,
    `Main theme / main character: ${theme}.`,
    `${childName} is the hero.`,
    friendName ? `A friend named ${friendName} also appears and plays an important role in the story.` : "",
    OCCASION_EN[occasion] ? `Context: ${OCCASION_EN[occasion]}.` : "",
    VALUE_EN[value] ? `Core value the story should convey: ${VALUE_EN[value]}.` : "",
    `Language complexity: ${ageContext}.`,
    `Atmosphere: ${MOOD_EN[mood]}.`,
    `Length: ${wordCount} words.`,
    `Structure: opening → adventure → resolution → moral (one sentence at the end).`,
    `Return only the story text without a title.`,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function generateStoryStream(input: StoryInput) {
  const locale = input.locale ?? "en";
  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPTS[locale] ?? SYSTEM_PROMPTS.en },
      { role: "user", content: buildStoryPrompt(input) },
    ],
    stream: true,
    max_tokens: 600,
  });

  return { stream };
}

export async function generateStory(input: StoryInput): Promise<string> {
  const locale = input.locale ?? "en";
  const result = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPTS[locale] ?? SYSTEM_PROMPTS.en },
      { role: "user", content: buildStoryPrompt(input) },
    ],
    max_tokens: 600,
  });

  return result.choices[0]?.message?.content ?? "";
}
