import type { Metadata } from "next";
import { Playfair_Display, Inter, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ui/ChatWidget";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Vitesse | Venice Simplon-Orient-Express",
  description: "A next-generation journey through the golden age of travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cinzel.variable} ${montserrat.variable} ${inter.variable} antialiased bg-vsoe-midnight text-vsoe-cream overflow-x-hidden cursor-none`}
      >
        <Preloader />
        <CustomCursor />
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
