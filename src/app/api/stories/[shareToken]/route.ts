import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { shareToken: string } }
) {
  const story = await prisma.story.findUnique({
    where: { shareToken: params.shareToken },
    select: {
      id: true,
      childName: true,
      childAge: true,
      theme: true,
      content: true,
      shareToken: true,
      createdAt: true,
    },
  });

  if (!story) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }

  return NextResponse.json(story);
}
