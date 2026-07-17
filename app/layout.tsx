import type { Metadata } from "next";
// 1. Import both fonts from Google
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import GlobalSpotlight from "@/components/ui/globalspotlight";

// 2. Configure fonts with CSS variables
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const scriptFont = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata = {
  title: "Accurate Cutting Systems | Industrial Band Sawing Solutions",
  description: "Engineered for lower cutting costs — industrial band sawing machines by Accurate Cutting Systems Pvt Ltd. The Perfect Cut, Always.",
  openGraph: {
    title: "Accurate Cutting Systems",
    description: "Industrial Band Sawing Solutions — Engineered for Lower Cutting Costs.",
    url: "https://acs.co.in",
    siteName: "Accurate Cutting Systems",
    images: [
      {
        url: "https://acs.co.in/og_image.jpg", // add a 1200x630 image here
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 3. Inject BOTH font variables into the body className */}
      <body 
        className={`${inter.variable} ${scriptFont.variable} font-sans bg-brand-light text-brand-dark antialiased min-h-screen flex flex-col`}
      >
        <GlobalSpotlight />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}