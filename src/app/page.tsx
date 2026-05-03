"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryForm } from "@/components/StoryForm";
import { StoryDisplay } from "@/components/StoryDisplay";
import { PricingCard } from "@/components/PricingCard";
import { useStoryGenerator } from "@/hooks/useStoryGenerator";
import { useLocalStories } from "@/hooks/useLocalStories";
import { StoryInput } from "@/types";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight, Check } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { testimonials } from "@/lib/testimonials";
import { HeroBackground } from "@/components/HeroBackground";

function MoonIllustration() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-20 absolute top-8 right-8">
      <path d="M80 20 Q55 35 55 60 Q55 85 80 100 Q40 100 30 70 Q20 40 50 20 Q65 13 80 20Z" fill="white"/>
      <circle cx="45" cy="45" r="4" fill="white" opacity="0.5"/>
      <circle cx="70" cy="35" r="2.5" fill="white" opacity="0.4"/>
      <circle cx="38" cy="65" r="3" fill="white" opacity="0.3"/>
    </svg>
  );
}

export default function HomePage() {
  const { data: session } = useSession();
  const { locale, t } = useLocale();
  const h = t.home;
  const isPremium = !!session;
  const { status, content, error, cooldownSeconds, result, generate, reset } = useStoryGenerator();
  useLocalStories();
  const [currentInput, setCurrentInput] = useState<StoryInput | null>(null);
  const [showModal, setShowModal] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (input: StoryInput) => {
    setCurrentInput(input);
    await generate(input);
    setTimeout(() => storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleReset = () => {
    reset();
    setCurrentInput(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative bg-[#EDE9DC] px-4 sm:px-5 pt-10 sm:pt-16 pb-24 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 container mx-auto max-w-3xl">

          {/* Heading — centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-sun/20 text-[#9B6700] rounded-full px-4 py-1.5 text-xs font-heading font-800 mb-4 sm:mb-6 border border-sun/30">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z"/>
              </svg>
              {h.badge}
            </div>

            <h1 className="font-heading font-900 text-[2.4rem] sm:text-[4.5rem] leading-[1.05] text-foreground mb-3 sm:mb-4">
              {h.heroTitle1}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">{h.heroTitle2}</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#FFBE0B" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              {" "}{h.heroTitle3}
            </h1>

            <p className="text-foreground/60 text-base sm:text-lg leading-relaxed">{h.heroSub}</p>
          </motion.div>

          {/* Form card — full width of container */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="bg-white rounded-3xl border-2 border-border p-5 sm:p-10 shadow-xl shadow-primary/10"
          >
            <StoryForm
              onSubmit={handleSubmit}
              isLoading={status === "loading" || status === "streaming"}
              isLoggedIn={!!session}
              onLoginPrompt={() => setShowModal(true)}
            />
          </motion.div>

          <div ref={storyRef} className="mt-5">
            <StoryDisplay
              status={status} content={content} error={error} cooldownSeconds={cooldownSeconds} result={result}
              childName={currentInput?.childName} theme={currentInput?.theme}
              isPremium={isPremium} onReset={handleReset} onRegisterPrompt={() => setShowModal(true)}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#1E1044] px-5 py-20 relative overflow-hidden">
        <MoonIllustration />
        {[
          { cx: "8%", cy: "20%", r: 2.5, fill: "#FFBE0B", delay: 0 },
          { cx: "92%", cy: "30%", r: 2, fill: "#FF6B35", delay: 0.5 },
          { cx: "15%", cy: "75%", r: 1.8, fill: "#06B6D4", delay: 1 },
          { cx: "85%", cy: "70%", r: 2.5, fill: "#FFBE0B", delay: 0.8 },
          { cx: "50%", cy: "10%", r: 1.5, fill: "white", delay: 0.3 },
        ].map((s, i) => (
          <div key={i} className="absolute rounded-full animate-wiggle"
            style={{ left: s.cx, top: s.cy, width: s.r * 2, height: s.r * 2, background: s.fill, animationDelay: `${s.delay}s` }} />
        ))}

        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-white">{h.howItWorksTitle}</h2>
            <p className="text-white/50 mt-3 text-lg">{h.howItWorksSub}</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {h.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/8 rounded-3xl p-7 border border-white/10 hover:bg-white/12 transition-colors">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-900 text-xl mb-5 ${
                  i === 0 ? "bg-sun text-[#1E1044]" : i === 1 ? "bg-coral text-white" : "bg-teal text-white"
                }`}>
                  {i + 1}
                </div>
                <h3 className="font-heading font-800 text-lg text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY PREVIEW ── */}
      <section className="bg-[#FFFEF5] px-5 py-20">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-foreground">
              {locale === "uk"
                ? <>Ось як виглядає <span className="text-primary">результат</span></>
                : <>See what it <span className="text-primary">looks like</span></>
              }
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="blur-preview bg-white rounded-3xl border-2 border-border overflow-hidden shadow-xl shadow-primary/8">
              <div className="bg-primary px-7 py-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {["bg-sun", "bg-coral", "bg-teal"].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} opacity-80`} />
                  ))}
                </div>
                <span className="font-heading font-800 text-white/70 text-xs">{t.brandName}</span>
                <span className="font-heading font-800 text-white/40 text-xs">{locale === "uk" ? "стор. 1" : "p. 1"}</span>
              </div>
              <div className="p-7 sm:p-9">
                <h3 className="font-heading font-900 text-xl text-primary mb-0.5">{h.previewFor}</h3>
                <p className="text-xs text-muted-foreground font-heading font-700 uppercase tracking-widest mb-6">{h.previewTheme}</p>
                <div className="story-prose">{h.previewText}</div>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <Button size="lg" className="rounded-2xl bg-primary hover:bg-primary-dark text-white font-heading font-800 gap-2 px-8 h-13 shadow-lg"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}>
              {h.getForFree} <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-coral px-5 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/8 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/8 translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-white">{h.testimonialsSectionTitle}</h2>
            <p className="text-white/60 mt-3 text-lg">{h.storiesCreated}</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials[locale].map((testimonial, i) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/12 rounded-3xl p-6 border border-white/15 backdrop-blur-sm">
                <p className="text-white/85 text-sm leading-relaxed mb-5">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-800 ${testimonial.color}`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-heading font-800 text-sm text-white">{testimonial.name}</div>
                    <div className="text-xs text-white/50">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (disabled for MVP) ── */}
      {/* <section className="bg-[#FFFEF5] px-5 py-20" id="pricing">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-foreground">{h.pricingTitle}</h2>
            <p className="text-muted-foreground mt-3 text-lg">{h.pricingSubtitle}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {h.pricingTiers.map((tier, i) => <PricingCard key={tier.name} tier={tier} index={i} />)}
          </div>
        </div>
      </section> */}

      {/* ── FAQ ── */}
      <section className="bg-teal px-5 py-20">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-900 text-4xl sm:text-5xl text-white">{h.faqTitle}</h2>
          </motion.div>
          <div className="space-y-3">
            {h.faq.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white/12 rounded-2xl p-5 border border-white/15">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-800 text-sm text-white mb-1.5">{item.q}</h3>
                    <p className="text-sm text-white/65 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary px-5 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 25% 40%, #FFBE0B 0%, transparent 50%), radial-gradient(circle at 75% 60%, #FF6B35 0%, transparent 50%)" }} />
        <MoonIllustration />

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative z-10 container mx-auto max-w-lg text-center">
          <h2 className="font-heading font-900 text-4xl sm:text-5xl text-white leading-tight mb-5">{h.ctaTitle}</h2>
          <p className="text-white/55 mb-10 text-lg">{h.ctaSub}</p>
          <Button size="lg"
            className="bg-sun hover:bg-sun-dark text-[#1E1044] font-heading font-900 text-lg rounded-2xl px-10 h-14 shadow-lg gap-2"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}>
            {h.ctaButton}
            <ArrowRight size={20} />
          </Button>
        </motion.div>
      </section>

      {/* ── Register modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1E1044]/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border-2 border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
                <svg width="26" height="26" viewBox="0 0 20 20" fill="white">
                  <path d="M10 2 L12 8 L18 8 L13.5 11.5 L15.5 17.5 L10 14 L4.5 17.5 L6.5 11.5 L2 8 L8 8 Z"/>
                </svg>
              </div>
              <h2 className="font-heading font-900 text-2xl mb-2">{h.registerTitle}</h2>
              <p className="text-muted-foreground text-sm mb-7 leading-relaxed">{h.registerSub}</p>
              <Button size="lg" className="w-full mb-3 bg-primary hover:bg-primary-dark text-white rounded-2xl font-heading font-800 h-12"
                onClick={() => signIn("google")}>
                {h.registerGoogle}
              </Button>
              <Button variant="outline" size="lg" className="w-full rounded-2xl border-2 font-heading font-800 h-12"
                onClick={() => signIn()}>
                {h.registerEmail}
              </Button>
              <button className="mt-5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowModal(false)}>{h.registerClose}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
