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
        olive: {
          DEFAULT: "#353A20",
          light: "#474B2F",
          muted: "#55574A",
          soft: "#A19C7F",
        },
        ivory: {
          DEFAULT: "#F5F0E8",
          light: "#FBF8F2",
          dark: "#E6DECF",
        },
        ink: {
          DEFAULT: "#4B3B47",
          light: "#6E5B6A",
          dark: "#2E2230",
        },
        blossom: {
          DEFAULT: "#C9798A",
          light: "#F0B8C4",
          dark: "#A85E6E",
        },
        petal: {
          DEFAULT: "#FDE8EE",
          light: "#FFF0F5",
          dark: "#F5CDD7",
        },
        cream: {
          DEFAULT: "#FFFBF5",
          light: "#FFFFFF",
          dark: "#F0E8D8",
        },
        sage: {
          DEFAULT: "#87A878",
          light: "#B5CCA9",
          dark: "#5E7B52",
        },
      },
      fontFamily: {
        script: ["var(--font-pinyon)", "cursive"],
        caps: ["var(--font-cinzel)", "serif"],
        rounded: ["var(--font-fredoka)", "sans-serif"],
        typewriter: ["var(--font-typewriter)", "monospace"],
        display: ["var(--font-playfair)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        "float-petal": {
          "0%": {
            transform: "translateY(-10vh) translateX(0px) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.8" },
          "100%": {
            transform: "translateY(110vh) translateX(70px) rotate(720deg)",
            opacity: "0",
          },
        },
        "float-petal-left": {
          "0%": {
            transform: "translateY(-10vh) translateX(0px) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.7" },
          "100%": {
            transform: "translateY(110vh) translateX(-55px) rotate(-540deg)",
            opacity: "0",
          },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.5)", opacity: "0" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "float-petal": "float-petal linear infinite",
        "float-petal-left": "float-petal-left linear infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        shimmer: "shimmer 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
        "spin-slow": "spin-slow 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
