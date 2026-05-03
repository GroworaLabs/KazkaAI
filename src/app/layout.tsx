import type { Metadata } from "next";
import { Inter, Lora, Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { auth } from "@/lib/auth";
import { getLocaleFromCookie, pageMeta } from "@/lib/meta";

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

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromCookie();
  const m = pageMeta[locale];

  return {
    title: {
      default: m.home.title,
      template: m.titleTemplate,
    },
    description: m.home.description,
    keywords: m.home.keywords,
    authors: [{ name: m.siteName }],
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      url: process.env.NEXT_PUBLIC_APP_URL,
      siteName: m.siteName,
      title: m.home.title,
      description: m.home.description,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.home.title,
      description: m.home.description,
      images: ["/og-image.svg"],
    },
    icons: { icon: "/favicon.svg" },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const locale = getLocaleFromCookie();

  return (
    <html lang={locale} className={`${inter.variable} ${lora.variable} ${cormorant.variable} ${nunito.variable}`}>
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
