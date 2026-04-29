import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export const metadata = {
  title: "Мої казки",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: string; upgraded?: string };
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  const page = Math.max(1, Number(searchParams.page ?? "1"));
  const limit = 12;

  const [stories, total, user] = await Promise.all([
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
        content: true,
        shareToken: true,
        createdAt: true,
      },
    }),
    prisma.story.count({ where: { userId: session.user.id } }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, storiesUsedToday: true, name: true, email: true },
    }),
  ]);

  const storiesForClient = stories.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <DashboardClient
      stories={storiesForClient}
      total={total}
      page={page}
      limit={limit}
      user={user}
      upgraded={searchParams.upgraded === "1"}
    />
  );
}
