import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D71149",
        primaryDark: "#B30E3E",
        accent: "#F5F5F5",
        text: "#1F2937",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
} satisfies Config;
