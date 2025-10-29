/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/styles/**/*.{css,scss}"
    ],
    theme: {
      extend: { 
        colors: {
          starbucks: {
            green: "#00704A",
            dark: "#0C7A52",
            accent: "#0EA371",
            red: "#D61F26",
            brown: "#2C1810",
            cream: "#F7F5E7",
          },
        },
        backgroundImage: {
        'hero': "url('/starbucks-banner.jpg')",
      },
    },
  },
    plugins: [],
  }