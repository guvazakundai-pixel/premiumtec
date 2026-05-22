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
  title: "Core Tech Systems — Premium Technology, Curated for You",
  description:
    "High-performance laptops, gaming setups, repairs, and premium accessories in Harare, Zimbabwe. Discover the best in tech.",
  keywords: "Core Tech Systems, premium laptops, gaming, tech repairs, Harare, Zimbabwe, technology store",
  openGraph: {
    title: "Core Tech Systems — Premium Technology, Curated for You",
    description:
      "High-performance laptops, gaming setups, repairs, and premium accessories in Harare, Zimbabwe.",
    type: "website",
    siteName: "Core Tech Systems",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#0A1224" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://coretechsystems.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Core Tech Systems",
              description: "Premium technology — laptops, gaming, repairs, and accessories in Harare, Zimbabwe.",
              url: "https://coretechsystems.vercel.app",
              telephone: "+263780579633",
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
              sameAs: ["https://threads.net/@coretechsystems_zw"],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A1224] text-[#F1F5F9] overflow-x-hidden font-sans noise-overlay">
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
