import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FFA62B",
          amber: "#F97316",
          yellow: "#FACC15",
          sky: "#86C5FF",
          navy: "#2B4DB5",
          dark: "#1A1A2E",
          muted: "#6B7280",
          surface: "#F5F5F7",
          warm: "#FFF8EE",
        },
        sunflower: {
          light: "#D6D6D6",
          lemon: "#FFEE32",
          gold: "#FFD100",
          ink: "#202020",
          charcoal: "#333533",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      animation: {
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-1000px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
