import {Colors} from "./src/styles/colors";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: Colors.primary,
      white: Colors.white,
      black: Colors.black,
      "text-primary": Colors["text-primary"],
      "table-background-primary": Colors["table-background-primary"],
      error: Colors.error,
      focus: Colors.focus
    },
    extend: {

    },
  },
  plugins: [],
};
