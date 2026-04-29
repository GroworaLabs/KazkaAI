"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PricingTier } from "@/types";
import { Check } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";

export function PricingCard({ tier, index = 0 }: { tier: PricingTier; index?: number }) {
  const { data: session } = useSession();
  const { t } = useLocale();
  const router = useRouter();

  const handleCta = async () => {
    if (tier.plan === "FREE") { session ? router.push("/") : signIn(); return; }
  };

  const isPremium = tier.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "rounded-3xl p-8 flex flex-col border-2",
        isPremium
          ? "bg-primary border-primary text-white"
          : "bg-white border-border"
      )}
    >
      {isPremium && (
        <div className="inline-flex items-center gap-1.5 bg-sun text-[#1E1044] rounded-full px-3 py-1 text-xs font-heading font-800 mb-4 self-start">
          <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z"/>
          </svg>
          {t.pricingPage.mostPopular}
        </div>
      )}

      <h3 className={cn("font-heading font-900 text-2xl mb-1", isPremium ? "text-white" : "text-foreground")}>
        {tier.name}
      </h3>
      <p className={cn("text-sm mb-6", isPremium ? "text-white/60" : "text-muted-foreground")}>
        {tier.description}
      </p>

      <div className="flex items-baseline gap-1 mb-7">
        <span className={cn("font-heading font-900 text-5xl", isPremium ? "text-white" : "text-foreground")}>
          {tier.price}
        </span>
        {tier.period && (
          <span className={cn("text-sm", isPremium ? "text-white/50" : "text-muted-foreground")}>
            /{tier.period}
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0",
              isPremium ? "bg-white/20" : "bg-primary/10")}>
              <Check size={11} className={isPremium ? "text-white" : "text-primary"} />
            </div>
            <span className={isPremium ? "text-white/80" : "text-foreground/80"}>{f}</span>
          </li>
        ))}
      </ul>

      <Button size="lg" onClick={handleCta} disabled={isPremium}
        className={cn("w-full rounded-2xl font-heading font-800 text-base h-13",
          isPremium
            ? "bg-sun/50 text-[#1E1044]/50 cursor-not-allowed shadow-none"
            : "bg-primary hover:bg-primary-dark text-white"
        )}>
        {isPremium ? t.comingSoon : tier.cta}
      </Button>
    </motion.div>
  );
}
