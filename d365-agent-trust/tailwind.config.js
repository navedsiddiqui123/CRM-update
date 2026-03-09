export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      colors: {
        ms: {
          blue:    "#0078D4",
          dark:    "#003A6C",
          navy:    "#001F3D",
          teal:    "#00B294",
          orange:  "#D83B01",
          amber:   "#FFB900",
          red:     "#A4262C",
          green:   "#107C10",
          lblue:   "#EBF3FB",
          border:  "#E1E8EF",
          surface: "#F8FAFC",
          muted:   "#5A6472",
        }
      }
    }
  }
}
