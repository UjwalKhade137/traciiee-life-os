/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#061f00",
        "primary-container": "#19350c",
        "on-primary": "#ffffff",
        "on-primary-container": "#7ea06b",
        "primary-fixed": "#c9edb2",
        "primary-fixed-dim": "#add198",
        "on-primary-fixed": "#062100",
        "on-primary-fixed-variant": "#314e22",
        "inverse-primary": "#add198",

        "secondary": "#3e6566",
        "secondary-container": "#bee7e8",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#42696a",
        "secondary-fixed": "#c1eaeb",
        "secondary-fixed-dim": "#a5cecf",
        "on-secondary-fixed": "#002021",
        "on-secondary-fixed-variant": "#254d4e",

        "tertiary": "#001d25",
        "tertiary-container": "#00343f",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#659fb1",
        "tertiary-fixed": "#b1ecff",
        "tertiary-fixed-dim": "#95cfe2",
        "on-tertiary-fixed": "#001f27",
        "on-tertiary-fixed-variant": "#014e5e",

        "background": "#fafaf3",
        "on-background": "#1a1c18",
        "surface": "#fafaf3",
        "on-surface": "#1a1c18",
        "surface-dim": "#dadad4",
        "surface-bright": "#fafaf3",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f4ed",
        "surface-container": "#eeeee7",
        "surface-container-high": "#e8e9e2",
        "surface-container-highest": "#e3e3dc",
        "surface-variant": "#e3e3dc",
        "on-surface-variant": "#43483e",
        "inverse-surface": "#2f312d",
        "inverse-on-surface": "#f1f1ea",
        "surface-tint": "#486638",

        "outline": "#74796d",
        "outline-variant": "#c3c8bb",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        "display-lg": ["'Libre Caslon Text'", "serif"],
        "headline-lg": ["'Libre Caslon Text'", "serif"],
        "headline-md": ["'Libre Caslon Text'", "serif"],
        "headline-sm": ["'Libre Caslon Text'", "serif"],
        "body-lg": ["'Hanken Grotesk'", "sans-serif"],
        "body-md": ["'Hanken Grotesk'", "sans-serif"],
        "body-sm": ["'Hanken Grotesk'", "sans-serif"],
        "label-caps": ["'Hanken Grotesk'", "sans-serif"],
        "label-data": ["'JetBrains Mono'", "monospace"],
      },
      spacing: {
        "base": "4px",
        "xs": "8px",
        "sm": "16px",
        "md": "24px",
        "lg": "32px",
        "xl": "48px",
        "container-margin": "20px",
        "card-gap": "16px"
      },
      boxShadow: {
        'organic': '0 4px 20px rgba(25, 53, 12, 0.08)',
        'organic-lg': '0 10px 30px rgba(25, 53, 12, 0.12)',
      }
    },
  },
  plugins: [],
}
