import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";
import scrollbar from "tailwind-scrollbar";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [scrollbar, scrollbarHide],
} satisfies Config;
