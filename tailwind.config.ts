import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      fontFamily: {
        primary: ["var(--font-manrope)"],
      },
      colors: {
        primary: "#615efc",
        primaryHover: "#f3f4f6",
        secondary: "#f97316",
        purple: "#978df8",
        blue: "rgb(44 143 255)",
        yellow: "#FEE272",
        graySlate: "#9394a1",
        grayDark: "#212126",
        grayDarkest: "#131316",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
  // plugins: [require("tailwindcss-animate")],
};

export default withUt(config);
