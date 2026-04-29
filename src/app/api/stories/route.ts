import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = 12;

  const [stories, total] = await Promise.all([
    prisma.story.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        childName: true,
        childAge: true,
        theme: true,
        shareToken: true,
        createdAt: true,
        content: true,
      },
    }),
    prisma.story.count({ where: { userId: session.user.id } }),
  ]);

  return NextResponse.json({ stories, total, page, limit });
}
