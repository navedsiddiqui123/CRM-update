export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["DM Sans",  "sans-serif"],
        display: ["Sora",     "sans-serif"],
      },
      colors: {
        ms: {
          blue:    "#0078D4",
          dark:    "#003A6C",
          navy:    "#001F3D",
          teal:    "#00B294",
          orange:  "#D83B01",
          amber:   "#C79B00",
          red:     "#A4262C",
          green:   "#107C10",
          purple:  "#6B52A0",
          lblue:   "#EBF3FB",
          surface: "#F8FAFC",
          border:  "#E1E8EF",
          muted:   "#5A6472",
        }
      }
    }
  },
  plugins: [],
}
