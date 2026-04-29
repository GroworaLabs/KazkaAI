export type StoryLength = "short" | "standard" | "long";
export type StoryMood = "bedtime" | "adventure" | "funny" | "educational";
export type StoryOccasion = "none" | "birthday" | "firstday" | "darkfear" | "newsibling";
export type StoryValue = "none" | "courage" | "kindness" | "sharing" | "honesty" | "friendship";

export interface StoryInput {
  childName: string;
  childAge: number;
  theme: string;
  locale?: "en" | "uk";
  length?: StoryLength;
  mood?: StoryMood;
  occasion?: StoryOccasion;
  value?: StoryValue;
  friendName?: string;
}

export interface StoryResult {
  id?: string;
  childName: string;
  childAge: number;
  theme: string;
  content: string;
  shareToken?: string;
  createdAt?: string;
}

export type GenerationStatus = "idle" | "loading" | "streaming" | "done" | "error";

export type Plan = "FREE" | "PREMIUM";

export interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  plan: Plan;
  storiesUsedToday: number;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  plan: Plan;
}

export type Theme = {
  id: string;
  label: string;
  labelEn: string;
  emoji: string;
};

export const THEMES: Theme[] = [
  { id: "unicorn", label: "Єдиноріг", labelEn: "Unicorn", emoji: "🦄" },
  { id: "dragon", label: "Дракон", labelEn: "Dragon", emoji: "🐉" },
  { id: "space", label: "Космос", labelEn: "Space", emoji: "🚀" },
  { id: "cat", label: "Кіт", labelEn: "Cat", emoji: "🐱" },
  { id: "fairy", label: "Фея", labelEn: "Fairy", emoji: "🧚" },
  { id: "mermaid", label: "Русалка", labelEn: "Mermaid", emoji: "🧜" },
  { id: "knight", label: "Лицар", labelEn: "Knight", emoji: "⚔️" },
  { id: "princess", label: "Принцеса", labelEn: "Princess", emoji: "👸" },
  { id: "forest", label: "Чарівний ліс", labelEn: "Enchanted Forest", emoji: "🌳" },
  { id: "dinosaur", label: "Динозавр", labelEn: "Dinosaur", emoji: "🦕" },
  { id: "robot", label: "Робот", labelEn: "Robot", emoji: "🤖" },
  { id: "ocean", label: "Океан", labelEn: "Ocean", emoji: "🌊" },
];
