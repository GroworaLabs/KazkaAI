"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  THEMES,
  type StoryInput,
  type StoryLength,
  type StoryMood,
  type StoryOccasion,
  type StoryValue,
} from "@/types";
import { cn } from "@/lib/utils";
import { Loader2, Lock, Sparkles } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useState } from "react";

type FormData = {
  childName: string;
  childAge: number;
  theme: string;
};

interface StoryFormProps {
  onSubmit: (i: StoryInput) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  onLoginPrompt: () => void;
}

const LENGTHS: StoryLength[] = ["short", "standard", "long"];
const MOODS: StoryMood[] = ["bedtime", "adventure", "funny", "educational"];
const OCCASIONS: StoryOccasion[] = ["none", "birthday", "firstday", "darkfear", "newsibling"];
const VALUES: StoryValue[] = ["none", "courage", "kindness", "sharing", "honesty", "friendship"];

export function StoryForm({ onSubmit, isLoading, isLoggedIn, onLoginPrompt }: StoryFormProps) {
  const { locale, t } = useLocale();
  const f = t.form;

  const [length, setLength] = useState<StoryLength>("standard");
  const [mood, setMood] = useState<StoryMood>("bedtime");
  const [occasion, setOccasion] = useState<StoryOccasion>("none");
  const [value, setValue2] = useState<StoryValue>("none");
  const [friendName, setFriendName] = useState("");

  const schema = z.object({
    childName: z.string().min(1, f.childNameError).max(50),
    childAge: z.number({ invalid_type_error: f.ageError }).int().min(1).max(12),
    theme: z.string().min(1, f.themeError),
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { childAge: 5, theme: "" },
  });

  const selectedTheme = watch("theme");
  const age = watch("childAge");

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      ...data, locale, length, mood, occasion, value,
      friendName: friendName.trim() || undefined,
    });
  };

  const themeLabel = (theme: typeof THEMES[0]) => locale === "uk" ? theme.label : theme.labelEn;

  const Chip = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <motion.button
      type="button"
      whileTap={isLoggedIn ? { scale: 0.93 } : {}}
      onClick={isLoggedIn ? onClick : onLoginPrompt}
      className={cn(
        "relative rounded-xl border-2 py-1.5 px-3 text-xs font-heading font-800 transition-all whitespace-nowrap",
        isLoggedIn
          ? active
            ? "border-primary bg-primary text-white shadow-sm"
            : "border-border bg-background text-foreground/70 hover:border-primary/50 hover:bg-primary/5"
          : "border-border bg-background text-foreground/30 cursor-pointer select-none"
      )}
    >
      {label}
      {!isLoggedIn && (
        <span className="absolute -top-1.5 -right-1.5 bg-sun rounded-full p-0.5">
          <Lock size={8} className="text-[#1E1044]" />
        </span>
      )}
    </motion.button>
  );

  const OptionRow = ({
    label,
    hint,
    children,
  }: {
    label: string;
    hint?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <div>
        <span className="text-xs font-heading font-800 text-foreground/70">{label}</span>
        {hint && <span className="text-xs text-muted-foreground font-heading font-600 ml-1.5">— {hint}</span>}
      </div>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Base fields */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="childName" className="font-heading font-800 text-sm text-foreground">
            {f.childName}
          </Label>
          <Input id="childName" placeholder={f.childNamePlaceholder}
            className="h-12 rounded-2xl border-2 border-border focus:border-primary bg-background text-base"
            {...register("childName")} />
          {errors.childName && <p className="text-xs text-destructive">{errors.childName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="childAge" className="font-heading font-800 text-sm text-foreground">{f.age}</Label>
          <div className="flex items-center gap-2">
            <Input id="childAge" type="number" min={1} max={12}
              className="h-12 rounded-2xl border-2 border-border focus:border-primary w-20 text-base bg-background"
              {...register("childAge", { valueAsNumber: true })} />
            <span className="text-sm text-muted-foreground font-heading font-700">{f.ageSuffix(age)}</span>
          </div>
          {errors.childAge && <p className="text-xs text-destructive">{errors.childAge.message}</p>}
        </div>
      </div>

      {/* Theme */}
      <div className="space-y-2.5">
        <Label className="font-heading font-800 text-sm text-foreground">{f.theme}</Label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {THEMES.map((theme) => (
            <motion.button key={theme.id} type="button" whileTap={{ scale: 0.93 }}
              onClick={() => setValue("theme", theme.id, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 py-2.5 px-1 font-heading font-800 transition-all flex flex-col items-center justify-center gap-1 min-h-[72px]",
                selectedTheme === theme.id
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-border bg-background text-foreground/70 hover:border-primary/50 hover:bg-primary/5"
              )}>
              <span className="text-[22px] leading-none">{theme.emoji}</span>
              <span className="text-[11px] leading-tight text-center">{themeLabel(theme)}</span>
            </motion.button>
          ))}
        </div>
        {errors.theme && <p className="text-xs text-destructive">{errors.theme.message}</p>}
      </div>

      {/* Premium options */}
      <div className={cn(
        "rounded-2xl border-2 p-5 space-y-5",
        isLoggedIn ? "border-primary/20 bg-primary/3" : "border-border bg-muted/40"
      )}>
        <div className="flex items-center gap-2">
          <Sparkles size={13} className={isLoggedIn ? "text-primary" : "text-muted-foreground"} />
          <span className={cn(
            "text-xs font-heading font-800 uppercase tracking-widest",
            isLoggedIn ? "text-primary" : "text-muted-foreground"
          )}>
            {f.premiumOptions}
          </span>
          {!isLoggedIn && (
            <button type="button" onClick={onLoginPrompt}
              className="ml-auto text-xs font-heading font-700 text-primary hover:underline">
              {f.premiumLockHint}
            </button>
          )}
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <OptionRow label={f.length}>
            {LENGTHS.map((l) => (
              <Chip key={l} label={f.lengths[l]} active={length === l} onClick={() => setLength(l)} />
            ))}
          </OptionRow>

          <OptionRow label={f.mood}>
            {MOODS.map((m) => (
              <Chip key={m} label={f.moods[m]} active={mood === m} onClick={() => setMood(m)} />
            ))}
          </OptionRow>

          <OptionRow label={f.occasion} hint={f.occasionHint}>
            {OCCASIONS.map((o) => (
              <Chip key={o} label={f.occasions[o]} active={occasion === o} onClick={() => setOccasion(o)} />
            ))}
          </OptionRow>

          <OptionRow label={f.value} hint={f.valueHint}>
            {VALUES.map((v) => (
              <Chip key={v} label={f.values[v]} active={value === v} onClick={() => setValue2(v)} />
            ))}
          </OptionRow>
        </div>

        {/* Friend name */}
        <div className="space-y-1.5">
          <div>
            <span className="text-xs font-heading font-800 text-foreground/70">{f.friendName}</span>
            <span className="text-xs text-muted-foreground font-heading font-600 ml-1.5">— {f.friendNameHint}</span>
          </div>
          <div className="relative">
            <Input
              placeholder={f.friendNamePlaceholder}
              value={isLoggedIn ? friendName : ""}
              onChange={(e) => isLoggedIn && setFriendName(e.target.value)}
              onClick={!isLoggedIn ? onLoginPrompt : undefined}
              maxLength={30}
              className={cn(
                "h-10 rounded-xl border-2 text-sm bg-background",
                isLoggedIn
                  ? "border-border focus:border-primary"
                  : "border-border text-foreground/30 cursor-pointer"
              )}
            />
            {!isLoggedIn && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <Lock size={12} className="text-muted-foreground" />
              </span>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isLoading}
        className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-dark text-white font-heading font-800 text-lg shadow-lg gap-3 mt-1">
        {isLoading ? (
          <><Loader2 size={20} className="animate-spin" /> {f.generating}</>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 4l5 5-10 10H5v-5L15 4z"/>
            </svg>
            {f.generate}
          </>
        )}
      </Button>
    </form>
  );
}
