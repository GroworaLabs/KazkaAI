"use client";

import { useState, useEffect } from "react";
import { StoryResult } from "@/types";

const STORAGE_KEY = "kazka_local_stories";
const MAX_STORED = 10;

export function useLocalStories() {
  const [stories, setStories] = useState<StoryResult[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStories(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const saveStory = (story: StoryResult) => {
    setStories((prev) => {
      const updated = [story, ...prev].slice(0, MAX_STORED);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // storage full — ignore
      }
      return updated;
    });
  };

  const clearStories = () => {
    setStories([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { stories, saveStory, clearStories };
}
