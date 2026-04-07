import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#050505",
          deep: "#0A0A0A",
          surface: "#111111",
          border: "#1A1A1A",
        },
        gold: {
          DEFAULT: "#C9A84C",
          bright: "#C9A84C",
          muted: "#8B6914",
          light: "#F0D080",
        },
        white: {
          DEFAULT: "#FAFAFA",
        },
        gray: {
          light: "#A0A0A0",
          mid: "#555555",
        },
        error: "#FF4444",
        success: "#22C55E",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "serif"],
      },
      fontSize: {
        xs: "0.65rem",
        sm: "0.75rem",
        base: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.35rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
        "4xl": "3rem",
        display: "5rem",
        hero: "7rem",
      },
      maxWidth: {
        content: "1400px",
      },
      spacing: {
        gutter: "24px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxury-in": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-sweep": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        "gold-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-sweep": "line-sweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gold-pulse": "gold-pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)",
        "dark-gradient": "linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #111111 100%)",
        "radial-gold": "radial-gradient(circle at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
