/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds ─────────────────────────────────────────
        bg: {
          primary:   "#09090B",
          secondary: "#111111",
          card:      "rgba(255,255,255,0.06)",
        },
        // ── Borders ─────────────────────────────────────────────
        border: {
          subtle: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.20)",
        },
        // ── Text ────────────────────────────────────────────────
        text: {
          primary:   "#FFFFFF",
          secondary: "#B3B3B3",
          muted:     "#6B7280",
        },
        // ── Brand / Accent ───────────────────────────────────────
        ibm: {
          blue:       "#0F62FE",
          "blue-dark": "#0043CE",
          "blue-light": "#4589FF",
        },
        // ── Semantic ─────────────────────────────────────────────
        success: "#24A148",
        danger:  "#DA1E28",
        warning: "#F1C21B",
      },

      // ── Typography ─────────────────────────────────────────────
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      // ── Spacing ────────────────────────────────────────────────
      spacing: {
        18:  "4.5rem",
        22:  "5.5rem",
        30:  "7.5rem",
        128: "32rem",
        144: "36rem",
      },

      // ── Border Radius ──────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ── Box Shadow ─────────────────────────────────────────────
      boxShadow: {
        "glass":       "0 4px 24px rgba(0, 0, 0, 0.40)",
        "glass-lg":    "0 8px 48px rgba(0, 0, 0, 0.60)",
        "ibm-glow":    "0 0 40px rgba(15, 98, 254, 0.20)",
        "ibm-glow-sm": "0 0 16px rgba(15, 98, 254, 0.15)",
      },

      // ── Backdrop Blur ──────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },

      // ── Keyframes & Animations ─────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(15, 98, 254, 0.15)" },
          "50%":      { boxShadow: "0 0 40px rgba(15, 98, 254, 0.40)" },
        },
      },
      animation: {
        "fade-in":    "fade-in 0.4s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
