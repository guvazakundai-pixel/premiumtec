import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { CartProvider } from "@/app/context/CartContext";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Core Tech Systems — Enterprise Technology & Security Solutions",
  description:
    "Cybersecurity, cloud infrastructure, AI solutions, and custom software for businesses. Premium laptops, gaming, and tech repairs in Harare, Zimbabwe.",
  keywords: "Core Tech Systems, cybersecurity, cloud, AI, software development, enterprise IT, Harare, Zimbabwe",
  openGraph: {
    title: "Core Tech Systems — Enterprise Technology & Security Solutions",
    description:
      "Cybersecurity, cloud infrastructure, AI solutions, and custom software. Premium tech retail in Harare, Zimbabwe.",
    type: "website",
    siteName: "Core Tech Systems",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${syne.variable} ${dmSans.variable}`}>
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://coretechsystems.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Core Tech Systems",
              description: "Enterprise technology solutions — cybersecurity, cloud, AI, software, and premium tech retail.",
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
      <body className="min-h-full flex flex-col bg-white text-[#1D1D1F] overflow-x-hidden font-body">
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
