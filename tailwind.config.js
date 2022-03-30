module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    boxShadow: {
      'portfolio': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}