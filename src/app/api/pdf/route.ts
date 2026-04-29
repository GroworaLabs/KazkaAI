import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import path from "path";

Font.register({
  family: "PTSerif",
  src: path.join(process.cwd(), "public", "fonts", "PTSerif-Regular.ttf"),
});

const BORDER_MARGIN = 30;
const PAGE_PADDING = 58;
const FOOTER_HEIGHT = 36;

const styles = StyleSheet.create({
  page: {
    fontFamily: "PTSerif",
    backgroundColor: "#FAFAF8",
    paddingTop: PAGE_PADDING,
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: PAGE_PADDING + FOOTER_HEIGHT,
  },
  border: {
    position: "absolute",
    top: BORDER_MARGIN,
    left: BORDER_MARGIN,
    right: BORDER_MARGIN,
    bottom: BORDER_MARGIN,
    border: "2.5pt solid #534AB7",
    borderRadius: 8,
  },
  footer: {
    position: "absolute",
    bottom: BORDER_MARGIN + 10,
    left: 0,
    right: 0,
    fontSize: 9,
    color: "#999",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "#534AB7",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    borderBottom: "1pt solid #EEEDFE",
    marginBottom: 18,
  },
  body: {
    fontSize: 13,
    lineHeight: 1.85,
    color: "#1a1a1a",
  },
});

function StoryDocument({
  childName,
  theme,
  content,
}: {
  childName: string;
  theme: string;
  content: string;
}) {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      // Border repeats on every page
      React.createElement(View, { fixed: true, style: styles.border }),
      // Footer with page number repeats on every page
      React.createElement(Text, {
        fixed: true,
        style: styles.footer,
        render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
          totalPages > 1
            ? `Створено на КазкоAI • kazka.ai  |  ${pageNumber} / ${totalPages}`
            : "Створено на КазкоAI • kazka.ai",
      }),
      // Content flows naturally across pages
      React.createElement(Text, { style: styles.title }, `Казка для ${childName}`),
      React.createElement(Text, { style: styles.subtitle }, `Тема: ${theme}`),
      React.createElement(View, { style: styles.divider }),
      React.createElement(Text, { style: styles.body }, content)
    )
  );
}

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const { searchParams } = new URL(req.url);
  const shareToken = searchParams.get("token");

  if (!shareToken) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const story = await prisma.story.findUnique({
    where: { shareToken },
  });

  if (!story) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }

  const buffer = await renderToBuffer(
    React.createElement(StoryDocument, {
      childName: story.childName,
      theme: story.theme,
      content: story.content,
    })
  );

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="kazka.pdf"; filename*=UTF-8''${encodeURIComponent(`kazka-${story.childName}`)}.pdf`,
    },
  });
}
