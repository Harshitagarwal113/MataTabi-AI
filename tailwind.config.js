/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#18181b',
        accent: '#0ea5e9',
        background: '#09090b',
        card: '#18181b',
        textMain: '#fafafa',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      }
    },
  },
  plugins: [],
}
