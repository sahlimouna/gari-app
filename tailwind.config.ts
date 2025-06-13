import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      // Breakpoints spécifiques mobile
      mobile: { max: "767px" },
      tablet: { min: "768px", max: "1023px" },
      desktop: { min: "1024px" },
      // Breakpoints pour PWA
      "mobile-s": { max: "320px" },
      "mobile-m": { min: "321px", max: "375px" },
      "mobile-l": { min: "376px", max: "425px" },
      "mobile-xl": { min: "426px", max: "767px" },
      // Breakpoints pour orientations
      landscape: { raw: "(orientation: landscape)" },
      portrait: { raw: "(orientation: portrait)" },
      // Breakpoints pour densité d'écran
      retina: { raw: "(-webkit-min-device-pixel-ratio: 2)" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      height: {
        "screen-mobile": "calc(var(--vh, 1vh) * 100)",
        "screen-safe": "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
      },
      minHeight: {
        "screen-mobile": "calc(var(--vh, 1vh) * 100)",
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      maxWidth: {
        mobile: "480px",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "pulse-slow": "pulse-slow 2s infinite",
        shimmer: "shimmer 2s infinite",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "21/9": "21 / 9",
        "1/1": "1 / 1",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        mobile: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "mobile-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "mobile-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Plugin pour les safe areas et optimisations mobile
    ({ addUtilities, addComponents, theme }: any) => {
      const newUtilities = {
        // Safe areas
        ".safe-area-inset-top": {
          paddingTop: "env(safe-area-inset-top)",
        },
        ".safe-area-inset-bottom": {
          paddingBottom: "env(safe-area-inset-bottom)",
        },
        ".safe-area-inset-left": {
          paddingLeft: "env(safe-area-inset-left)",
        },
        ".safe-area-inset-right": {
          paddingRight: "env(safe-area-inset-right)",
        },
        ".safe-area-inset": {
          padding:
            "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
        },

        // Optimisations tactiles
        ".touch-optimized": {
          minHeight: "44px",
          minWidth: "44px",
          touchAction: "manipulation",
        },

        // Hauteur viewport mobile
        ".h-screen-mobile": {
          height: "calc(var(--vh, 1vh) * 100)",
        },
        ".min-h-screen-mobile": {
          minHeight: "calc(var(--vh, 1vh) * 100)",
        },

        // Masquer les scrollbars
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        // Optimisations de performance
        ".gpu-accelerated": {
          transform: "translateZ(0)",
          willChange: "transform",
        },

        // Prévenir la sélection
        ".no-select": {
          "-webkit-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none",
        },

        // Scroll amélioré
        ".scroll-smooth-mobile": {
          scrollBehavior: "smooth",
          "-webkit-overflow-scrolling": "touch",
        },

        // Line clamp
        ".line-clamp-1": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
        },
        ".line-clamp-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
        },
        ".line-clamp-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3",
        },

        // Skeleton loading
        ".skeleton": {
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        },

        // RTL support
        ".rtl-flip": {
          transform: "scaleX(-1)",
        },
        ".rtl-text-right": {
          textAlign: "right",
        },
      }

      const newComponents = {
        // Container mobile optimisé
        ".mobile-container": {
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "0 1rem",
          "@media (min-width: 1024px)": {
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          },
        },

        // Boutons optimisés mobile
        ".btn-mobile": {
          minHeight: "44px",
          minWidth: "44px",
          padding: "0.75rem 1rem",
          fontSize: "1rem",
          fontWeight: "500",
          borderRadius: "0.75rem",
          touchAction: "manipulation",
          transition: "all 0.2s ease",
          "&:active": {
            transform: "scale(0.95)",
          },
        },

        // Cards optimisées mobile
        ".card-mobile": {
          borderRadius: "1rem",
          padding: "1rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    },
  ],
} satisfies Config

export default config
