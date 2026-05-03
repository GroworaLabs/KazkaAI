import { NextRequest } from "next/server";
import { z } from "zod";
import { generateStoryStream } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PLAN_LIMITS } from "@/lib/limits";

const schema = z.object({
  childName: z.string().min(1).max(50),
  childAge: z.number().int().min(1).max(12),
  theme: z.string().min(1).max(100),
  locale: z.enum(["en", "uk"]).optional().default("en"),
  length: z.enum(["short", "standard", "long"]).optional().default("standard"),
  mood: z.enum(["bedtime", "adventure", "funny", "educational"]).optional().default("bedtime"),
  occasion: z.enum(["none", "birthday", "firstday", "darkfear", "newsibling"]).optional().default("none"),
  value: z.enum(["none", "courage", "kindness", "sharing", "honesty", "friendship"]).optional().default("none"),
  friendName: z.string().max(30).optional(),
});

// In-memory rate limiter for guests — 1 story per day per IP, no cooldown
const guestUsage = new Map<string, { count: number; resetAt: number }>();

function checkGuestLimit(ip: string): boolean {
  const now = Date.now();
  const entry = guestUsage.get(ip);

  if (!entry || now > entry.resetAt) {
    guestUsage.set(ip, { count: 1, resetAt: now + 86_400_000 });
    return false;
  }

  if (entry.count >= PLAN_LIMITS.GUEST.daily) return true;

  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Невірні дані форми" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const input = parsed.data;
    const session = await auth();

    if (!session?.user?.id) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
      if (checkGuestLimit(ip)) {
        return new Response(
          JSON.stringify({ error: "guest_limit" }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      const userId = session.user.id;
      // All logged-in users get PREMIUM limits until payments are enabled
      const limits = PLAN_LIMITS.PREMIUM;
      const now = new Date();

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { storiesUsedToday: true, dailyResetAt: true, lastGeneratedAt: true },
      });

      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 401 });
      }

      // Cooldown check
      if (user.lastGeneratedAt) {
        const msSinceLast = now.getTime() - user.lastGeneratedAt.getTime();
        if (msSinceLast < limits.cooldownMs) {
          const secondsLeft = Math.ceil((limits.cooldownMs - msSinceLast) / 1000);
          return new Response(
            JSON.stringify({ error: "cooldown", secondsLeft }),
            { status: 429, headers: { "Content-Type": "application/json" } }
          );
        }
      }

      // Reset daily counter if 24h window has passed
      const isNewDay = now.getTime() > user.dailyResetAt.getTime() + 86_400_000;
      const storiesUsedToday = isNewDay ? 0 : user.storiesUsedToday;

      // Daily limit check
      if (storiesUsedToday >= limits.daily) {
        return new Response(
          JSON.stringify({ error: "limit_reached" }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }

      // Update counters before generating
      await prisma.user.update({
        where: { id: userId },
        data: {
          storiesUsedToday: isNewDay ? 1 : { increment: 1 },
          ...(isNewDay && { dailyResetAt: now }),
          lastGeneratedAt: now,
        },
      });
    }

    // Stream from Gemini
    const stream = await generateStoryStream(input);

    let fullText = "";

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream.stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              fullText += text;
              controller.enqueue(new TextEncoder().encode(text));
            }
          }

          // Save story to DB
          const shareToken = crypto.randomUUID();
          const savedStory = await prisma.story.create({
            data: {
              userId: session?.user?.id ?? null,
              childName: input.childName,
              childAge: input.childAge,
              theme: input.theme,
              content: fullText,
              shareToken,
            },
          });

          // Send story metadata as final SSE-like JSON line
          const meta = JSON.stringify({
            __meta: true,
            storyId: savedStory.id,
            shareToken: savedStory.shareToken,
          });
          controller.enqueue(
            new TextEncoder().encode(`\n\n__META__${meta}`)
          );
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[generate] error:", err);
    return new Response(
      JSON.stringify({ error: "Сталася помилка. Спробуйте ще раз." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
