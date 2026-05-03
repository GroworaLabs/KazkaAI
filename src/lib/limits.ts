import { Plan } from "@/types";

export const PLAN_LIMITS = {
  GUEST:   { daily: 1,  cooldownMs: 60_000 },
  FREE:    { daily: 5,  cooldownMs: 30_000 },
  PREMIUM: { daily: 30, cooldownMs: 10_000 },
} as const;

export function limitsForPlan(plan: Plan | "GUEST"): { daily: number; cooldownMs: number } {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.FREE;
}
