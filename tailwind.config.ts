import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F3AE8",
          light: "#EEF2FF",
          dark: "#3828C5",
          foreground: "#ffffff",
        },
        sun: {
          DEFAULT: "#FFBE0B",
          light: "#FFF8DC",
          dark: "#E5A800",
        },
        coral: {
          DEFAULT: "#FF6B35",
          light: "#FFF3EE",
          dark: "#E55A26",
        },
        teal: {
          DEFAULT: "#06B6D4",
          dark: "#0891B2",
          light: "#ECFEFF",
        },
        berry: {
          DEFAULT: "#7C3AED",
          dark: "#6D28D9",
          light: "#F5F3FF",
        },
        gold: {
          DEFAULT: "#FFBE0B",
          light: "#FFF8DC",
          dark: "#E5A800",
          foreground: "#1E1B4B",
        },
        accent: {
          DEFAULT: "#FF6B35",
          light: "#FFF3EE",
          foreground: "#ffffff",
        },
        background: "#FFFEF5",
        foreground: "#1E1044",
        muted: {
          DEFAULT: "#F4F0FF",
          foreground: "#6B5FA0",
        },
        border: "#E8E2FF",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1E1044",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        ring: "#4F3AE8",
        input: "#E8E2FF",
        secondary: {
          DEFAULT: "#F4F0FF",
          foreground: "#1E1044",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1E1044",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-lora)", "serif"],
        heading: ["var(--font-nunito)", "var(--font-cormorant)", "sans-serif"],
        story: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontWeight: {
        "700": "700",
        "800": "800",
        "900": "900",
      },
      spacing: {
        "13": "3.25rem",
      },
      borderRadius: {
        lg: "14px",
        md: "10px",
        sm: "7px",
        "2xl": "22px",
        "3xl": "30px",
        "4xl": "40px",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(12px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "pop-in": "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        wiggle: "wiggle 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
