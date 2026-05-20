import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "./globals.css";

export const metadata = {
  title: "PremiumTec — Curated Premium Technology",
  description:
    "Discover the finest collection of flagship smartphones, premium laptops, and cutting-edge technology. Curated for those who demand excellence.",
  keywords: "PremiumTec, flagship phones, premium laptops, technology, premium electronics, curated tech",
  openGraph: {
    title: "PremiumTec — Curated Premium Technology",
    description:
      "Discover the finest collection of flagship smartphones, premium laptops, and cutting-edge technology. Curated for those who demand excellence.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#0B0F14" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0F14] text-[#F5F7FA] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
