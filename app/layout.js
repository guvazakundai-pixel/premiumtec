import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PREMIUM TEC — Zimbabwe's Premium Digital Hardware Showroom",
  description: "Curated elite technology for creators, professionals, gamers, and power users. Located in Harare, Zimbabwe.",
  keywords: "laptops, gaming, hardware, Zimbabwe, Harare, tech, premium",
  openGraph: {
    title: "PREMIUM TEC — Zimbabwe's Premium Digital Hardware Showroom",
    description: "Curated elite technology for creators, professionals, gamers, and power users.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#121316] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
