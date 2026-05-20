import { Inter } from "next/font/google";
import "./globals.css";

/*
 * Typography: Inter — Geometric sans-serif
 * The stark, highly-legible nature of Inter at both ultra-thin (weight 100)
 * and heavy (weight 900) weights creates the brutalist contrast that defines
 * the nothing.tech design language.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "TechStore — Flagship Phones & Premium Laptops",
  description:
    "Curated collection of flagship mobile devices and premium laptops. Minimalist tech retail for the discerning user.",
  keywords: "TechStore, flagship phones, premium laptops, technology, retail",
  openGraph: {
    title: "TechStore — Flagship Phones & Premium Laptops",
    description:
      "Curated collection of flagship mobile devices and premium laptops. Minimalist tech retail for the discerning user.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
