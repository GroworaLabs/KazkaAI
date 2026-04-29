"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export function Footer() {
  const { t } = useLocale();
  const f = t.footer;

  return (
    <footer className="bg-[#1E1044] text-white">
      <div className="container mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z" fill="white"/>
                </svg>
              </div>
              <span className="font-heading font-800 text-lg">{t.brandName}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">{f.tagline}</p>
          </div>

          {[
            { title: f.product, links: [{ label: f.links.home, href: "/" }, /* { label: f.links.pricing, href: "/pricing" }, */ { label: f.links.myStories, href: "/dashboard" }] },
            { title: f.support, links: [{ label: f.links.contact, href: "mailto:hello@kazka.ai" }] },
            { title: f.legal, links: [{ label: f.links.privacy, href: "/privacy" }, { label: f.links.terms, href: "/terms" }] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="font-heading font-800 text-xs uppercase tracking-widest text-white/40 mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/55 hover:text-sun transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} {t.brandName}. {f.rights}</p>
          <p className="text-xs text-white/30">{f.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
