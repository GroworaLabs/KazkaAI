import type { Metadata } from "next";
import { Inter, Lora, Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { auth } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "КазкоAI — Персональні казки для дітей",
    template: "%s | КазкоAI",
  },
  description:
    "Створіть унікальну казку, де ваша дитина — головний герой. Персональні казки українською мовою за 10 секунд за допомогою штучного інтелекту.",
  keywords: [
    "казки для дітей",
    "персональні казки",
    "ШІ казки",
    "казки українською",
    "казкоAI",
  ],
  authors: [{ name: "КазкоAI" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "КазкоAI",
    title: "КазкоAI — Персональні казки для дітей",
    description:
      "Створіть унікальну казку, де ваша дитина — головний герой. За 10 секунд.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "КазкоAI — Персональні казки для дітей",
    description: "Унікальні казки українською мовою, де ваша дитина — герой.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="uk" className={`${inter.variable} ${lora.variable} ${cormorant.variable} ${nunito.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers session={session}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
