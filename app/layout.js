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
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { CartProvider } from "@/app/context/CartContext";

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
    siteName: "PremiumTec",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#0B0F14" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://premiumtec.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "PremiumTec",
              description: "Curated premium technology — flagship phones and premium laptops in Zimbabwe.",
              url: "https://premiumtec.vercel.app",
              telephone: "+263775685616",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Corner Speke & Mbuya Nehanda, Sirus Mall, 1st Floor",
                addressLocality: "Harare",
                addressCountry: "ZW",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:30",
                closes: "17:00",
              },
              sameAs: ["https://threads.net/@premiumtec_inv"],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0F14] text-[#F5F7FA] overflow-x-hidden font-sans">
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
