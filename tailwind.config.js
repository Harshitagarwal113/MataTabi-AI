/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#212121',
        accent: '#10a37f',
        background: '#171717',
        sidebar: '#000000',
        card: '#212121',
        textMain: '#ececec',
        textMuted: '#b4b4b4',
        borderLight: '#4d4d4f',
        success: '#10a37f',
        warning: '#f59e0b',
        error: '#ef4444',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
