"use client";

import { useState, useCallback, useRef } from "react";
import { StoryInput, GenerationStatus } from "@/types";

interface GeneratorResult {
  storyId: string | null;
  shareToken: string | null;
}

export function useStoryGenerator() {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number | null>(null);
  const [result, setResult] = useState<GeneratorResult | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (input: StoryInput) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStatus("loading");
    setContent("");
    setError(null);
    setCooldownSeconds(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const errorCode = data.error ?? "unknown";

        if (errorCode === "limit_reached" || errorCode === "guest_limit" || errorCode === "cooldown") {
          setError(errorCode);
          if (errorCode === "cooldown" && data.secondsLeft) {
            setCooldownSeconds(data.secondsLeft);
          }
        } else {
          setError(data.message ?? "unknown_error");
        }
        setStatus("error");
        return;
      }

      if (!res.body) throw new Error("No response body");

      setStatus("streaming");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const metaIdx = buffer.indexOf("\n\n__META__");
        if (metaIdx !== -1) {
          const textPart = buffer.slice(0, metaIdx);
          const metaStr = buffer.slice(metaIdx + "\n\n__META__".length);
          setContent(textPart);
          try {
            const meta = JSON.parse(metaStr);
            setResult({ storyId: meta.storyId, shareToken: meta.shareToken });
          } catch {
            // meta parse failed — non-critical
          }
          break;
        }

        setContent(buffer);
      }

      setStatus("done");
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("unknown_error");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
    setContent("");
    setError(null);
    setCooldownSeconds(null);
    setResult(null);
  }, []);

  return { status, content, error, cooldownSeconds, result, generate, reset };
}
