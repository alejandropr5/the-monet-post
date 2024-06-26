module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif:
        'var(--libre-baskerville), ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    extend: {
      fontFamily: {
        heading: "'League Spartan', sans-serif",
        content: "'Montserrat', sans-serif"
      },
      screens: {
        'phone': '520px',
        // => @media (min-width: 640px) { ... }
      }
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
