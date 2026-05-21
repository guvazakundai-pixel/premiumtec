import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext";

export const metadata = {
  title: "PremiumTec — Premium Digital Systems",
  description:
    "We design and engineer modern websites, applications, and digital experiences that help brands stand out.",
  keywords: "PremiumTec, digital agency, web development, UI/UX design, Zimbabwe, premium technology",
  openGraph: {
    title: "PremiumTec — Premium Digital Systems",
    description:
      "We design and engineer modern websites, applications, and digital experiences that help brands stand out.",
    type: "website",
    siteName: "PremiumTec",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://premiumtec.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PremiumTec",
              description: "We design and engineer modern websites, applications, and digital experiences.",
              url: "https://premiumtec.vercel.app",
              foundingDate: "2024",
              founder: { "@type": "Person", name: "Kundai Guvaza" },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden font-sans">
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
