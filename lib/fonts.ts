import { Inter, Poppins } from "next/font/google";

/** Primary typeface — body copy, UI, and general content */
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Secondary typeface — headings, display text, and emphasis */
export const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const fontVariables = `${fontInter.variable} ${fontPoppins.variable}`;
