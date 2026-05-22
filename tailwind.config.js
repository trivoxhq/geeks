/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A70A9",
          foreground: "#ffffff",
          light: "#6B8FC4",
          dark: "#3A5A89",
        },
        secondary: {
          DEFAULT: "#8FABD4",
          foreground: "#000000",
          light: "#A8C0E0",
          dark: "#6F8FB8",
        },
        accent: {
          DEFAULT: "#4A70A9",
          foreground: "#ffffff",
        },
        black: "#000000",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        border: "var(--color-border)",
        surface: "var(--color-surface)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        site: "90rem", /* 1440px */
      },
      spacing: {
        site: "1.25rem", /* 20px global horizontal padding */
        section: "var(--space-section)",
        block: "var(--space-block)",
        element: "var(--space-element)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
      },
      transitionDuration: {
        DEFAULT: "var(--transition-duration)",
        fast: "var(--transition-duration-fast)",
        slow: "var(--transition-duration-slow)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--transition-ease)",
        in: "var(--transition-ease-in)",
        out: "var(--transition-ease-out)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
      },
    },
  },
  plugins: [],
};
