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

export const metadata: Metadata = {
  title: "ACS | Accurate Cutting Systems",
  description: "The Perfect Cut Always. Heavy-duty, industrial-grade bandsaw machines engineered for high performance.",
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