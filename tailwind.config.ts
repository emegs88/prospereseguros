import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        /* Identidade Prospere */
        prospere: {
          blue: "#0047BA", // azul elétrico primário
          glow: "#1E5FD9", // azul brilho/realce
          navy: "#0A2540", // azul institucional escuro (Sobre/rodapé)
          gold: "#C8A24B", // dourado dos selos ("23 anos")
          black: "#000000",
          white: "#FFFFFF",
          ink: "#0A0E1A", // preto azulado para fundos
          slate: "#111726",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0047BA",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#111726",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#1E5FD9",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-condensed)", "Oswald", "Impact", "sans-serif"],
        condensed: ["var(--font-condensed)", "Oswald", "Impact", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(30,95,217,0.4), 0 8px 40px -8px rgba(0,71,186,0.55)",
        card: "0 4px 24px -6px rgba(0,0,0,0.12)",
      },
      backgroundImage: {
        "grid-prospere":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
